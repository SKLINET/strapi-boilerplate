# Detection Logic - Implementation Details

Implementation details for validation and workflow simulation used by Test Agent.

---

## Overview

Test Agent simulates tested skill behavior. This file documents:
- shared name validation logic
- duplicate priority rules
- starts-with-number behavior
- flow/state checks for `create-block` and `create-complementary`

---

## Core Name Detection Functions

### 1. detectCzech(input)

Detects if input is likely a Czech word (with or without diacritics).

```javascript
function detectCzech(input) {
    const czechDictionary = [
        'kniha', 'clanek', 'cl\u00e1nek', 'tlacitko', 'tla\u010d\u00edtko',
        'sluzba', 'slu\u017eba', 'tym', 't\u00fdm', 'clen', '\u010dlen',
        'vyrobek', 'v\u00fdrobek', 'stranka', 'str\u00e1nka',
        'formular', 'formul\u00e1\u0159', 'galerie', 'kategorie',
        'obrazek', 'obr\u00e1zek', 'stitek', '\u0161t\u00edtek',
        'prispevek', 'p\u0159\u00edsp\u011bvek', 'zprava', 'zpr\u00e1va',
        'odkaz', 'autor', 'video'
    ];

    return czechDictionary.includes((input || '').toLowerCase());
}
```

### 2. detectPlural(input)

Detects if input is in plural form (English-oriented heuristic).

```javascript
function detectPlural(input) {
    const word = (input || '').toLowerCase();

    const irregularPlurals = [
        'children', 'people', 'men', 'women', 'teeth', 'feet',
        'mice', 'geese', 'oxen', 'sheep', 'deer', 'fish'
    ];

    if (irregularPlurals.includes(word)) return true;

    const exceptions = ['class', 'bus', 'glass', 'gas', 'boss', 'mass', 'pass'];
    if (exceptions.includes(word)) return false;

    return /ies$|ves$|oes$|ses$|xes$|ches$|shes$|s$/.test(word);
}

function suggestSingular(word) {
    const value = (word || '').toLowerCase();

    const irregularMap = {
        children: 'child',
        people: 'person',
        men: 'man',
        women: 'woman',
        teeth: 'tooth',
        feet: 'foot',
        mice: 'mouse',
        geese: 'goose',
    };

    if (irregularMap[value]) return irregularMap[value];
    if (value.endsWith('ies')) return value.slice(0, -3) + 'y';
    if (value.endsWith('ves')) return value.slice(0, -3) + 'f';
    if (value.endsWith('oes')) return value.slice(0, -2);
    if (value.endsWith('ses')) return value.slice(0, -1);
    if (value.endsWith('xes')) return value.slice(0, -2);
    if (value.endsWith('ches')) return value.slice(0, -2);
    if (value.endsWith('shes')) return value.slice(0, -2);
    if (value.endsWith('s')) return value.slice(0, -1);

    return value;
}
```

### 3. autoFix(input)

Normalizes common formatting issues.

```javascript
function autoFix(input) {
    return (input || '')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[_\s]+/g, '-')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}
```

### 4. startsWithNumber(input)

```javascript
function startsWithNumber(input) {
    return /^[0-9]/.test((input || '').trim());
}
```

**Rule decision:** For both `create-block` and `create-complementary`, name starting with number is a stop condition.

### 5. checkExists(finalName, type, existingNames)

```javascript
function checkExists(finalName, type, existingNames) {
    // `finalName` must already be final form:
    // block -> "{name}-block", complementary -> "{name}"
    return existingNames.has(finalName);
}
```

**Source paths for scanning existing names:**
- block: `cms/src/components/block/*.json`
- complementary: `cms/src/components/complementary/*.json`

---

## Validation Order (Critical)

Order must match tested skill expectations.

```javascript
function validateName(input, type, existingNames) {
    // 1. Empty input
    if (!input || input.trim() === '') {
        return { action: 'STOP', reason: 'Name cannot be empty' };
    }

    // 2. Auto-fix
    const fixed = autoFix(input);

    // 3. Empty after auto-fix
    if (fixed === '') {
        return { action: 'STOP', reason: 'Name cannot be empty' };
    }

    // 4. Starts-with-number -> STOP
    if (startsWithNumber(fixed)) {
        return { action: 'STOP', reason: 'Name cannot start with number' };
    }

    // 5. Build final name
    const finalName = type === 'block' ? `${fixed}-block` : fixed;

    // 6. Duplicate check (highest priority among post-fix checks)
    if (checkExists(finalName, type, existingNames)) {
        return { action: 'STOP', reason: `Component '${finalName}' already exists` };
    }

    // 7. Czech warning
    if (detectCzech(fixed)) {
        return {
            action: 'WARN',
            reason: 'Czech word detected',
            suggestion: 'Use English name',
            finalName,
        };
    }

    // 8. Plural warning
    if (detectPlural(fixed)) {
        const singular = suggestSingular(fixed);
        return {
            action: 'WARN',
            reason: 'Plural detected',
            suggestion: type === 'block' ? `${singular}-block` : singular,
            finalName,
        };
    }

    // 9. Accept or auto-fix
    const changed = input !== fixed;
    return {
        action: changed ? 'AUTO-FIX' : 'ACCEPT',
        original: input,
        fixed,
        finalName,
    };
}
```

### Why this order

1. Empty checks first.
2. Auto-fix early so all later checks use normalized form.
3. Starts-with-number is a hard reject.
4. Duplicate check before warning branches to enforce highest-priority uniqueness.
5. Language/grammar warnings only when the candidate is not already blocked.

---

## Workflow Simulation Rules

### A) validateBlockWorkflow(state)

Checks conversation and branch behavior for `create-block`.

```javascript
function validateBlockWorkflow(state) {
    // state:
    // {
    //   askedQuestions: [...],
    //   answers: { name, displayName, icon, location, getStaticProps, confirm },
    //   plannedFileUpdates: [...]
    // }

    assertAsksOneQuestionAtATime(state.askedQuestions);
    assertRequiredQuestionOrder(state.answers, [
        'name',
        'displayName',
        'icon',
        'location',
        'getStaticProps',
        'confirm',
    ]);

    if (state.answers.confirm !== 'Yes') {
        assertNoWrites(state.plannedFileUpdates);
        return;
    }

    assertContains(state.plannedFileUpdates, 'frontend/src/app/blocks/client.ts');
    assertContainsByPredicate(state.plannedFileUpdates, (p) => p.includes('getBlockType'));

    if (state.answers.location === 'page (blocks)') {
        assertContains(state.plannedFileUpdates, 'cms/src/api/page/content-types/page/schema.json');
        assertNotContains(state.plannedFileUpdates, 'cms/src/api/template/content-types/template/schema.json');
    }

    if (state.answers.location === 'template (content)') {
        assertContains(state.plannedFileUpdates, 'cms/src/api/template/content-types/template/schema.json');
        assertContains(state.plannedFileUpdates, 'frontend/src/app/blocks/TemplateBlock/TemplateBlock.ts');
    }

    if (state.answers.location === 'page+template') {
        assertContains(state.plannedFileUpdates, 'cms/src/api/page/content-types/page/schema.json');
        assertContains(state.plannedFileUpdates, 'cms/src/api/template/content-types/template/schema.json');
        assertContains(state.plannedFileUpdates, 'frontend/src/app/blocks/TemplateBlock/TemplateBlock.ts');
    }

    if (state.answers.getStaticProps === 'Yes') {
        assertUsesGetStaticPropsWrapperTemplate(state);
    } else {
        assertUsesSimpleWrapperTemplate(state);
    }
}
```

### B) validateComplementaryWorkflow(state)

Checks conversation and branch behavior for `create-complementary`.

```javascript
function validateComplementaryWorkflow(state) {
    // state:
    // {
    //   askedQuestions: [...],
    //   parsedFields: [...],
    //   fieldConfigs: [...],
    //   answers: { icon, needsAppContext, confirm },
    //   plannedFileUpdates: [...]
    // }

    assertAsksOneQuestionAtATime(state.askedQuestions);

    for (const field of state.fieldConfigs) {
        assertAsked(field, 'type');
        assertAsked(field, 'required');

        if (field.type === 'enumeration') assertAsked(field, 'enumValues');
        if (field.type === 'media') assertAsked(field, 'allowedTypes');
        if (field.type === 'relation') assertAsked(field, 'relationTarget');
        if (field.type === 'component') {
            assertAsked(field, 'componentRef');
            assertAsked(field, 'repeatable');
        }
        if (field.type === 'number') assertAsked(field, 'numberKind');
    }

    if (state.answers.confirm !== 'Yes') {
        assertNoWrites(state.plannedFileUpdates);
        return;
    }

    assertContains(state.plannedFileUpdates, 'frontend/src/relay/app.ts');
    assertContainsByPredicate(state.plannedFileUpdates, (p) => p.includes('/src/types/'));
    assertContainsByPredicate(state.plannedFileUpdates, (p) => p.includes('/src/utils/strapi/get'));

    if (state.answers.needsAppContext === 'Yes') {
        assertTransformerUsesAppContext(state);
    } else {
        assertTransformerWithoutAppContext(state);
    }

    if (state.answers.icon === '(none)') {
        assertCmsSchemaOmitsIcon(state);
    }
}
```

---

## Common Pitfalls

### Pitfall 1: Duplicate check after warning branches

**Wrong:** plural/Czech warning returned before duplicate check.

**Why bad:** duplicate collision is hard stop and should not be hidden by warning path.

### Pitfall 2: Number-start treated as warning only

**Wrong:** return WARN for `3d-model`.

**Correct:** STOP and ask for different name.

### Pitfall 3: Confirmation ignored

**Wrong:** files planned/created even after summary answer `No`.

**Correct:** no create/update actions before explicit `Yes`.

### Pitfall 4: Block location branch not enforced

**Wrong:** always updates only page schema.

**Correct:** update schema files strictly by selected location.

---

## Adding New Rules

When extending test logic:
1. Add detection/workflow function
2. Add test cases in `test-cases.md`
3. Insert check in correct validation/flow order
4. Update this document with examples
