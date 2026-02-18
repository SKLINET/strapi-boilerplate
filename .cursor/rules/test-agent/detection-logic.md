# Detection Logic - Implementation Details

Implementation details for validation and transformation algorithms used in testing.

---

## Overview

Test Agent simulates agent behavior by implementing the same validation logic. This file documents the expected behavior of each detection function.

---

## Core Detection Functions

### 1. detectCzech(input)

Detects if input is a Czech word (with or without diacritics).

**Implementation:**

```javascript
function detectCzech(input) {
    // Czech dictionary (with and without diacritics)
    const czechDictionary = [
        // With diacritics
        'kniha', 'článek', 'tlačítko', 'služba', 'tým', 'člen',
        'výrobek', 'stránka', 'formulář', 'galerie', 'kategorie',
        'obrázek', 'štítek', 'příspěvek', 'zpráva', 'odkaz',

        // Without diacritics (important for detection)
        'clanek', 'tlacitko', 'sluzba', 'tym', 'clen', 'vyrobek',
        'stranka', 'formular', 'galerie', 'kategorie', 'obrazek',
        'stitek', 'prispevek', 'zprava', 'odkaz',

        // Common false positives to handle
        'autor',  // Czech for 'author'
        'video',  // Same in both languages (but context matters)
    ];

    return czechDictionary.includes(input.toLowerCase());
}
```

**Test Cases:**

| Input | Expected Result | Reason |
|-------|----------------|--------|
| `kniha` | `true` | Czech word with diacritics |
| `clanek` | `true` | Czech word without diacritics |
| `autor` | `true` | Czech word (same spelling) |
| `button` | `false` | English word |
| `author` | `false` | English word |

**Edge Cases:**

- `galerie` → Should be `true` (Czech word, even though valid after diacritic removal)
- `video` → Context dependent (both Czech and English)

**Recommendations:**

1. Maintain a comprehensive dictionary of Czech words
2. Include both forms (with and without diacritics)
3. Update dictionary when new false negatives are found
4. Consider word frequency to handle ambiguous cases

---

### 2. detectPlural(input)

Detects if input is in plural form (English grammar rules).

**Implementation:**

```javascript
function detectPlural(input) {
    const word = input.toLowerCase();

    // Irregular plurals
    const irregularPlurals = [
        'children', 'people', 'men', 'women', 'teeth', 'feet',
        'mice', 'geese', 'oxen', 'sheep', 'deer', 'fish'
    ];

    if (irregularPlurals.includes(word)) {
        return true;
    }

    // Pattern-based detection
    const pluralPatterns = [
        { regex: /ies$/, singular: (w) => w.slice(0, -3) + 'y' },      // stories → story
        { regex: /ves$/, singular: (w) => w.slice(0, -3) + 'f' },      // knives → knife
        { regex: /oes$/, singular: (w) => w.slice(0, -2) },            // heroes → hero
        { regex: /ses$/, singular: (w) => w.slice(0, -1) },            // classes → class
        { regex: /xes$/, singular: (w) => w.slice(0, -2) },            // boxes → box
        { regex: /ches$/, singular: (w) => w.slice(0, -2) },           // watches → watch
        { regex: /shes$/, singular: (w) => w.slice(0, -2) },           // dishes → dish
        { regex: /s$/, singular: (w) => w.slice(0, -1) },              // books → book
    ];

    // Exceptions (words ending in 's' that are not plural)
    const exceptions = ['class', 'bus', 'glass', 'gas', 'boss', 'mass', 'pass'];
    if (exceptions.includes(word)) {
        return false;
    }

    // Check patterns in order
    for (const pattern of pluralPatterns) {
        if (pattern.regex.test(word)) {
            return true;
        }
    }

    return false;
}

function suggestSingular(pluralWord) {
    // Apply reverse transformations
    const word = pluralWord.toLowerCase();

    // Irregular plurals mapping
    const irregularMap = {
        'children': 'child',
        'people': 'person',
        'men': 'man',
        'women': 'woman',
        // ... etc
    };

    if (irregularMap[word]) {
        return irregularMap[word];
    }

    // Pattern-based conversion
    if (word.endsWith('ies')) return word.slice(0, -3) + 'y';
    if (word.endsWith('ves')) return word.slice(0, -3) + 'f';
    if (word.endsWith('oes')) return word.slice(0, -2);
    if (word.endsWith('ses')) return word.slice(0, -1);
    if (word.endsWith('xes')) return word.slice(0, -2);
    if (word.endsWith('ches')) return word.slice(0, -2);
    if (word.endsWith('shes')) return word.slice(0, -2);
    if (word.endsWith('s')) return word.slice(0, -1);

    return word; // fallback
}
```

**Test Cases:**

| Input | Is Plural? | Suggested Singular |
|-------|-----------|-------------------|
| `books` | `true` | `book` |
| `stories` | `true` | `story` |
| `categories` | `true` | `category` |
| `boxes` | `true` | `box` |
| `heroes` | `true` | `hero` |
| `class` | `false` | N/A |
| `bus` | `false` | N/A |
| `book` | `false` | N/A |

**Edge Cases:**

- `class` → NOT plural (exception)
- `glasses` → Plural (not in exception list)
- `gas` → NOT plural (exception)
- `gases` → Plural

---

### 3. autoFix(input)

Automatically fixes common formatting issues.

**Implementation:**

```javascript
function autoFix(input) {
    return input
        // PascalCase/camelCase → kebab-case
        .replace(/([a-z])([A-Z])/g, '$1-$2')

        // Convert underscores and spaces to hyphens
        .replace(/[_\s]+/g, '-')

        // Convert to lowercase
        .toLowerCase()

        // Remove diacritics (é → e, ř → r, etc.)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

        // Remove special characters (keep only a-z, 0-9, -)
        .replace(/[^a-z0-9-]/g, '')

        // Replace multiple consecutive hyphens with single hyphen
        .replace(/-+/g, '-')

        // Trim leading/trailing hyphens
        .replace(/^-|-$/g, '');
}
```

**Test Cases:**

| Input | Output | Fix Applied |
|-------|--------|------------|
| `HeroBanner` | `hero-banner` | PascalCase → kebab-case |
| `heroBanner` | `hero-banner` | camelCase → kebab-case |
| `hero_banner` | `hero-banner` | Underscores → hyphens |
| `hero banner` | `hero-banner` | Spaces → hyphens |
| `HERO` | `hero` | Uppercase → lowercase |
| `héro` | `hero` | Diacritics removed |
| `hero!` | `hero` | Special chars removed |
| `hero--banner` | `hero-banner` | Multiple hyphens → single |
| `-hero-` | `hero` | Trim leading/trailing hyphens |

**Edge Cases:**

| Input | Output | Reason |
|-------|--------|--------|
| `---` | `` (empty) | Only hyphens → empty after fix |
| `!!!` | `` (empty) | Only special chars → empty after fix |
| `кнопка` | `` (empty) | Cyrillic → empty after fix |
| `123test` | `123test` | Numbers preserved |

**Important Note:**

After `autoFix()`, always check if the result is empty. If empty, should STOP with error "Name cannot be empty".

---

### 4. checkExists(name, type)

Checks if a component with the given name already exists.

**Implementation:**

```javascript
function checkExists(name, type = 'block') {
    const basePath = type === 'block'
        ? 'cms/src/components/block/'
        : 'cms/src/components/complementary/';

    // For blocks, name already includes '-block' suffix
    // For complementary, name is as-is

    const filePath = `${basePath}${name}.json`;

    // Check if file exists
    return fileExists(filePath);
}
```

**Test Cases (Block):**

Assume existing: `hero-block.json`, `contact-form-block.json`

| Input | Check For | Exists? |
|-------|-----------|---------|
| `hero` | `hero-block.json` | `true` |
| `book` | `book-block.json` | `false` |
| `hero-block` | `hero-block-block.json` | `false` (different file) |

**Test Cases (Complementary):**

Assume existing: `button.json`, `video.json`, `send-email.json`

| Input | Check For | Exists? |
|-------|-----------|---------|
| `button` | `button.json` | `true` |
| `author` | `author.json` | `false` |
| `video` | `video.json` | `true` |

**Important:**

- Duplicate check must run **AFTER** auto-fix
- Example flow: `VIDEO` → auto-fix → `video` → check exists → STOP if exists

---

### 5. startsWithNumber(input)

Checks if input starts with a number.

**Implementation:**

```javascript
function startsWithNumber(input) {
    return /^[0-9]/.test(input);
}
```

**Test Cases:**

| Input | Starts With Number? | Action |
|-------|-------------------|--------|
| `3d-model` | `true` | WARN "avoid starting with number" |
| `2factor` | `true` | WARN |
| `step1` | `false` | ACCEPT (number not at start) |
| `book` | `false` | ACCEPT |

---

### 6. containsOnlyInvalidChars(input)

Checks if input contains only invalid characters (after auto-fix would be empty).

**Implementation:**

```javascript
function containsOnlyInvalidChars(input) {
    const fixed = autoFix(input);
    return fixed === '';
}
```

**Test Cases:**

| Input | After autoFix | Only Invalid? |
|-------|--------------|--------------|
| `---` | `` (empty) | `true` |
| `!!!` | `` (empty) | `true` |
| `   ` | `` (empty) | `true` |
| `кнопка` | `` (empty) | `true` |
| `hero!` | `hero` | `false` |

---

## Validation Order (Critical!)

The order of validation matters. Here's the correct sequence:

```javascript
function validateComponentName(input, existingComponents, type = 'block') {
    // 1. Check if empty
    if (!input || input.trim() === '') {
        return { action: 'STOP', reason: 'Name cannot be empty' };
    }

    // 2. Apply auto-fix
    const fixed = autoFix(input);

    // 3. Check if empty after fix
    if (fixed === '') {
        return { action: 'STOP', reason: 'Name cannot be empty after removing invalid characters' };
    }

    // 4. Check Czech (before accepting)
    if (detectCzech(fixed)) {
        return { action: 'WARN', reason: 'Czech word detected', suggestion: 'use English name' };
    }

    // 5. Check plural (before accepting)
    if (detectPlural(fixed)) {
        const singular = suggestSingular(fixed);
        return { action: 'WARN', reason: 'Plural detected', suggestion: singular };
    }

    // 6. Check starts with number
    if (startsWithNumber(fixed)) {
        return { action: 'WARN', reason: 'Starts with number', suggestion: 'avoid starting with number' };
    }

    // 7. Add suffix (for blocks only)
    const finalName = type === 'block' ? `${fixed}-block` : fixed;

    // 8. Check duplicates (MUST be last!)
    if (checkExists(finalName, existingComponents)) {
        return { action: 'STOP', reason: `Component '${finalName}' already exists` };
    }

    // 9. Accept
    const hasAutoFix = input !== fixed;
    return {
        action: hasAutoFix ? 'AUTO-FIX' : 'ACCEPT',
        name: finalName,
        original: input,
        fixed: fixed
    };
}
```

**Why Order Matters:**

1. Empty check first (no point processing empty input)
2. Auto-fix early (all other checks work on cleaned input)
3. Czech/Plural checks before duplicate (inform user of issues)
4. Suffix addition before duplicate check (check final name)
5. **Duplicate check LAST** (must check final processed name)

---

## Common Pitfalls

### Pitfall 1: Duplicate Check Before Auto-fix

**Wrong:**
```javascript
// ❌ Check duplicate on original input
if (checkExists(input)) { /* STOP */ }
const fixed = autoFix(input);
```

**Problem:** `VIDEO` would not detect duplicate with existing `video.json`

**Correct:**
```javascript
// ✅ Check duplicate on fixed input
const fixed = autoFix(input);
if (checkExists(fixed)) { /* STOP */ }
```

### Pitfall 2: Not Checking Empty After Fix

**Wrong:**
```javascript
const fixed = autoFix(input);
// Continue without checking if empty
```

**Problem:** Input `---` becomes empty after fix, causing errors later

**Correct:**
```javascript
const fixed = autoFix(input);
if (fixed === '') {
    return { action: 'STOP', reason: 'Empty after fix' };
}
```

### Pitfall 3: Czech Detection After Auto-fix Only

**Wrong:**
```javascript
const fixed = autoFix(input); // výrobek → vyrobek
if (detectCzech(fixed)) { /* only checks 'vyrobek' */ }
```

**Problem:** Czech words with diacritics are normalized, dictionary must include normalized forms

**Correct:**
```javascript
// Dictionary includes both 'výrobek' and 'vyrobek'
const czechDictionary = ['výrobek', 'vyrobek', ...];
```

---

## Adding New Detection Rules

To add a new validation rule:

1. **Define detection function**
   ```javascript
   function detectNewRule(input) {
       // implementation
   }
   ```

2. **Add test cases** in `test-cases.md`

3. **Insert in validation order** at appropriate position

4. **Update documentation** with examples and edge cases

5. **Test with Test Agent** to verify behavior
