# Test Cases - Generators and Examples

Test case definitions and generators for `create-block` and `create-complementary`.

---

## Scope

This reference currently supports exactly two tested skills:
- `create-block`
- `create-complementary`

---

## Shared Name Validation Categories

Apply to both agents unless explicitly overridden by skill rules:

### A) Name Happy Path
Valid names accepted without warnings.

### B) Name Auto-fix Cases
Inputs requiring normalization (case conversion, spacing, symbols).

### C) Name Warning/Stop Cases
Inputs that should trigger warning or stop.

### D) Name Duplicates
Inputs colliding with existing components after auto-fix/final-name transformation.

### E) Conversation/Confirmation Flow
Question sequence behavior and "confirm before create" gating.

---

## Block Creator Tests

**Pre-condition:** Scan `cms/src/components/block/`.

Assume existing blocks:
- `hero-block`
- `contact-form-block`
- `video-block`

### A) Name Happy Path

| ID | Input | Expected Output | Description |
|----|-------|----------------|-------------|
| A1 | `book` | ACCEPT `book-block` | Single word |
| A2 | `hero-banner` | ACCEPT `hero-banner-block` | Multi-word |
| A3 | `step1` | ACCEPT `step1-block` | Number not at start |
| A4 | `faq-item` | ACCEPT `faq-item-block` | Common pattern |

### B) Name Auto-fix

| ID | Input | Expected Output | Fix Applied |
|----|-------|----------------|------------|
| B1 | `HeroBanner` | AUTO-FIX `hero-banner-block` | PascalCase -> kebab-case |
| B2 | `heroBanner` | AUTO-FIX `hero-banner-block` | camelCase -> kebab-case |
| B3 | `hero_banner` | AUTO-FIX `hero-banner-block` | underscores -> hyphens |
| B4 | `hero banner` | AUTO-FIX `hero-banner-block` | spaces -> hyphens |
| B5 | `HERO` | AUTO-FIX `hero-block` then STOP duplicate | uppercase + duplicate collision |
| B6 | `h\u00e9ro` | AUTO-FIX `hero-block` then STOP duplicate | diacritics removed + duplicate collision |
| B7 | `hero!` | AUTO-FIX `hero-block` then STOP duplicate | special chars removed + duplicate collision |

### C) Name Warning/Stop

| ID | Input | Expected Output | Reason |
|----|-------|----------------|--------|
| C1 | `books` | WARN suggest `book-block` | plural form |
| C2 | `kniha` | WARN "use English" | Czech word |
| C3 | `3d-model` | STOP "name cannot start with number" | starts with number |
| C4 | `` (empty) | STOP "name cannot be empty" | empty input |
| C5 | `---` | STOP "name cannot be empty" | empty after auto-fix |
| C6 | `\u043a\u043d\u043e\u043f\u043a\u0430` | STOP "name cannot be empty" | non-latin removed by auto-fix |

### D) Name Duplicates (Priority)

| ID | Input | Expected Output | Description |
|----|-------|----------------|-------------|
| D1 | `hero` | STOP duplicate `hero-block` | direct duplicate |
| D2 | `Hero` | AUTO-FIX then STOP duplicate `hero-block` | duplicate after auto-fix |
| D3 | `hero-block` | STOP duplicate `hero-block` | explicit suffix duplicate |
| D4 | `video` | STOP duplicate `video-block` | duplicate must win even if word is linguistically ambiguous |

### E) Conversation/Confirmation Flow

| ID | Simulated Dialogue | Expected Output |
|----|--------------------|----------------|
| E1 | User gives name; agent asks displayName immediately (without asking icon/location/getStaticProps yet) | PASS only if exactly one question at a time |
| E2 | User answers all questions then `No` on summary confirmation | No file creation/update actions listed as executed |
| E3 | User answers all questions then `Yes` | File create/update plan returned |
| E4 | Empty displayName answer | Agent asks again and does not continue to icon step |

### F) Location Routing

| ID | Location Choice | Expected File Updates |
|----|-----------------|----------------------|
| F1 | `page (blocks)` | Update `cms/src/api/page/content-types/page/schema.json` only |
| F2 | `template (content)` | Update `cms/src/api/template/content-types/template/schema.json` and `frontend/src/app/blocks/TemplateBlock/TemplateBlock.ts` |
| F3 | `page + template` | Update both schema files + `TemplateBlock.ts` |

### G) Critical File Updates

| ID | Scenario | Expected Output |
|----|----------|----------------|
| G1 | Standard block creation | `frontend/src/app/blocks/client.ts` switch case added |
| G2 | Standard block creation | `getBlockType` mapping case added |
| G3 | Standard block creation | `frontend/src/app/blocks/server.ts` import+fragment+registry updated |
| G4 | Template location selected | `TemplateBlock_content` fragment spread added |

### H) DisplayName/Icon

| ID | Input | Expected Output |
|----|-------|----------------|
| H1 | DisplayName `Hlavni banner` | Accept and echo displayName |
| H2 | DisplayName empty | Ask for non-empty displayName |
| H3 | Icon `layout` | Accept icon |
| H4 | Icon invalid value | Ask user to choose valid icon |

### I) getStaticProps Branch

| ID | Choice | Expected Output |
|----|--------|----------------|
| I1 | `Yes` | Use wrapper template with `getStaticProps` branch |
| I2 | `No` | Use wrapper template without `getStaticProps` branch |

---

## Complementary Creator Tests

**Pre-condition:** Scan `cms/src/components/complementary/`.

Assume existing complementary components:
- `button`
- `video`
- `send-email`

### A) Name Happy Path

| ID | Input | Expected Output | Description |
|----|-------|----------------|-------------|
| A1 | `donation-form` | ACCEPT `donation-form` | kebab-case valid |
| A2 | `author` | ACCEPT `author` | single word |
| A3 | `step1-widget` | ACCEPT `step1-widget` | number not at start |

### B) Name Auto-fix

| ID | Input | Expected Output | Fix Applied |
|----|-------|----------------|------------|
| B1 | `DonationForm` | AUTO-FIX `donation-form` | PascalCase -> kebab-case |
| B2 | `donation_form` | AUTO-FIX `donation-form` | underscores -> hyphens |
| B3 | `DONATION` | AUTO-FIX `donation` | uppercase -> lowercase |
| B4 | `donation!` | AUTO-FIX `donation` | special chars removed |

### C) Name Warning/Stop

| ID | Input | Expected Output | Reason |
|----|-------|----------------|--------|
| C1 | `testimonials` | WARN suggest singular `testimonial` | plural form |
| C2 | `autor` | WARN "use English" | Czech word |
| C3 | `2fa-widget` | STOP "name cannot start with number" | starts with number |
| C4 | `` (empty) | STOP "name cannot be empty" | empty input |

### D) Name Duplicates (Priority)

| ID | Input | Expected Output | Description |
|----|-------|----------------|-------------|
| D1 | `video` | STOP duplicate `video` | direct duplicate |
| D2 | `Video` | AUTO-FIX then STOP duplicate `video` | duplicate after auto-fix |
| D3 | `send email` | AUTO-FIX then STOP duplicate `send-email` | duplicate after spacing fix |

### E) Conversation/Confirmation Flow

| ID | Simulated Dialogue | Expected Output |
|----|--------------------|----------------|
| E1 | Agent asks two questions at once for a field | FAIL (must ask one at a time) |
| E2 | User says `No` at summary confirmation | No files created/updated |
| E3 | User says `Yes` at summary confirmation | Files planned/created |

### F) Field Parsing and Iterative Questions

| ID | Input | Expected Output |
|----|-------|----------------|
| F1 | `title, description, amount, button` | Fields parsed in order and iterated one-by-one |
| F2 | `title: string, description: text` | Types parsed where provided; only missing details asked |
| F3 | `label (required), link (optional)` | Requirement hints recognized |
| F4 | Natural language (`author name, short bio, profile image`) | Usable field names extracted and confirmed |

### G) Type-Specific Follow-Ups

| ID | Field Type | Expected Follow-Up |
|----|------------|-------------------|
| G1 | `enumeration` | asks enum values |
| G2 | `media` | asks allowed media types |
| G3 | `relation` | asks target content type |
| G4 | `component` | offers existing complementary components + asks repeatable |
| G5 | `number` | asks integer vs decimal |

### H) App Context and Output Branch

| ID | Choice | Expected Output |
|----|--------|----------------|
| H1 | Needs app context = `Yes` | Transformer template with app parameter |
| H2 | Needs app context = `No` | Transformer template without app parameter |
| H3 | No fields defined | CMS `attributes: {}` |

### I) DisplayName/Icon

| ID | Input | Expected Output |
|----|-------|----------------|
| I1 | Name `donate-amount` | Auto displayName `DonateAmount` |
| I2 | Icon skipped | Schema omits `info.icon` |
| I3 | Icon `gift` | Schema includes `info.icon: "gift"` |

---

## Test Case Generators

### Random Valid Name Generator

```javascript
const validNames = [
    'book', 'hero-banner', 'author-card', 'donation-form', 'menu-item',
    'contact-form', 'feature-list', 'image-gallery', 'send-email', 'step1'
];

function getRandomValidName() {
    return validNames[Math.floor(Math.random() * validNames.length)];
}
```

### Variant Generator

```javascript
function toCommonVariants(kebabName) {
    const parts = kebabName.split('-');

    return [
        parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(''),
        parts.map((p, i) => (i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1))).join(''),
        parts.join('_'),
        kebabName.toUpperCase(),
        parts.join(' '),
    ];
}
```

### Flow Case Builder

```javascript
function buildConfirmationCase(agent, confirmation) {
    return {
        agent,
        answers: {
            name: 'book',
            displayName: 'Knihy',
            icon: 'book',
            location: 'page (blocks)',
            getStaticProps: 'No',
            confirm: confirmation,
        },
        expectedCreatesFiles: confirmation === 'Yes',
    };
}
```

---

## Adding Custom Test Cases

1. Pick tested agent (`create-block` or `create-complementary`)
2. Pick category from this document
3. Define input/flow and exact expected behavior
4. Add to table with stable ID
5. Update detection/workflow logic if new rule type was introduced
