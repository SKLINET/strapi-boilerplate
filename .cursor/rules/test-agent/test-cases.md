# Test Cases - Generators and Examples

Test case definitions and generators for different agents.

---

## Test Case Categories

All agents should be tested across these categories:

### A) Happy Path (Valid Inputs)
Inputs that should be accepted without modification or warnings.

### B) Auto-fix Cases
Inputs that require automatic correction (case conversion, special characters, etc.).

### C) Warning Cases
Inputs that should trigger warnings but may be accepted after confirmation.

### D) Edge Cases
Extreme or unusual inputs (empty, very long, unicode, etc.).

### E) Duplicates
Inputs that conflict with existing components.

---

## Block Creator Agent Tests

### A) Happy Path

| ID | Input | Expected Output | Description |
|----|-------|----------------|-------------|
| A1 | `book` | ACCEPT `book-block` | Single word |
| A2 | `hero-banner` | ACCEPT `hero-banner-block` | Multi-word with hyphens |
| A3 | `contact-form` | ACCEPT `contact-form-block` | Multi-word |
| A4 | `step1` | ACCEPT `step1-block` | With number |
| A5 | `user-profile` | ACCEPT `user-profile-block` | Common pattern |

### B) Auto-fix Cases

| ID | Input | Expected Output | Fix Applied | Description |
|----|-------|----------------|-------------|-------------|
| B1 | `HeroBanner` | AUTO-FIX `hero-banner-block` | PascalCase → kebab-case | PascalCase conversion |
| B2 | `contactForm` | AUTO-FIX `contact-form-block` | camelCase → kebab-case | camelCase conversion |
| B3 | `hero_banner` | AUTO-FIX `hero-banner-block` | Underscores → hyphens | Underscore replacement |
| B4 | `hero banner` | AUTO-FIX `hero-banner-block` | Spaces → hyphens | Space replacement |
| B5 | `HERO` | AUTO-FIX `hero-block` | Uppercase → lowercase | Case normalization |
| B6 | `hero!` | AUTO-FIX `hero-block` | Remove special chars | Special character removal |
| B7 | `hero--banner` | AUTO-FIX `hero-banner-block` | Multiple hyphens → single | Hyphen normalization |

### C) Warning Cases

| ID | Input | Expected Output | Warning Reason |
|----|-------|----------------|----------------|
| C1 | `books` | WARN `book-block` | Plural → suggest singular |
| C2 | `heroes` | WARN `hero-block` | Plural (-es) → suggest singular |
| C3 | `galleries` | WARN `gallery-block` | Plural (-ies) → suggest singular |
| C4 | `kniha` | WARN "use English" | Czech word with diacritics |
| C5 | `clanek` | WARN "use English" | Czech word without diacritics |

### D) Edge Cases

| ID | Input | Expected Output | Description |
|----|-------|----------------|-------------|
| D1 | `` (empty) | STOP "Name cannot be empty" | Empty input |
| D2 | `---` | STOP "Name cannot be empty" | Only hyphens (empty after fix) |
| D3 | `very-long-block-name-that-goes-on-and-on` | ACCEPT | Very long name |
| D4 | `кнопка` (Cyrillic) | STOP "Invalid characters" | Unicode characters |
| D5 | `hero-block` | AUTO-FIX `hero-block` | Already has -block suffix |

### E) Duplicates

**Pre-condition:** Scan `cms/src/components/block/` for existing blocks.

Assume existing blocks: `hero-block`, `contact-form-block`, `testimonial-block`

| ID | Input | Expected Output | Description |
|----|-------|----------------|-------------|
| E1 | `hero` | STOP "Block 'hero-block' already exists" | Direct duplicate |
| E2 | `Hero` | AUTO-FIX `hero` → STOP | Duplicate after fix |
| E3 | `hero-block` | STOP "Block 'hero-block' already exists" | Exact match with suffix |

---

## Complementary Creator Agent Tests

### A) Happy Path

| ID | Input | Expected Output | Description |
|----|-------|----------------|-------------|
| A1 | `author` | ACCEPT `author` | Single word |
| A2 | `testimonial` | ACCEPT `testimonial` | Single word |
| A3 | `gallery` | ACCEPT `gallery` | Single word |
| A4 | `image-gallery` | ACCEPT `image-gallery` | Multi-word |
| A5 | `step1` | ACCEPT `step1` | With number |

### B) Auto-fix Cases

| ID | Input | Expected Output | Fix Applied | Description |
|----|-------|----------------|-------------|-------------|
| B1 | `ImageGallery` | AUTO-FIX `image-gallery` | PascalCase → kebab-case | PascalCase conversion |
| B2 | `socialShare` | AUTO-FIX `social-share` | camelCase → kebab-case | camelCase conversion |
| B3 | `image_gallery` | AUTO-FIX `image-gallery` | Underscores → hyphens | Underscore replacement |
| B4 | `image gallery` | AUTO-FIX `image-gallery` | Spaces → hyphens | Space replacement |
| B5 | `AUTHOR` | AUTO-FIX `author` | Uppercase → lowercase | Case normalization |
| B6 | `author!` | AUTO-FIX `author` | Remove special chars | Special character removal |
| B7 | `galerie` | WARN (Czech) OR AUTO-FIX | Czech word detection | Czech without diacritics |

**Note on B7:** `galerie` is valid after diacritic removal, but it's a Czech word. Czech detection should take precedence.

### C) Warning Cases

| ID | Input | Expected Output | Warning Reason |
|----|-------|----------------|----------------|
| C1 | `authors` | WARN `author` | Plural → suggest singular |
| C2 | `galleries` | WARN `gallery` | Plural (-ies) → suggest singular |
| C3 | `images` | WARN `image` | Plural → suggest singular |
| C4 | `autor` | WARN "use English" | Czech word |
| C5 | `tlačítko` | WARN "use English" | Czech word with diacritics |

### D) Edge Cases

| ID | Input | Expected Output | Description |
|----|-------|----------------|-------------|
| D1 | `` (empty) | STOP "Name cannot be empty" | Empty input |
| D2 | `---` | STOP "Name cannot be empty" | Only hyphens (empty after fix) |
| D3 | `very-long-name-for-component` | ACCEPT | Very long name |
| D4 | `кнопка` (Cyrillic) | STOP "Invalid characters" | Unicode characters |

### E) Duplicates

**Pre-condition:** Scan `cms/src/components/complementary/` for existing components.

Assume existing: `button`, `ecomail`, `mailchimp`, `send-email`, `video`

| ID | Input | Expected Output | Description |
|----|-------|----------------|-------------|
| E1 | `button` | STOP "Component 'button' already exists" | Direct duplicate |
| E2 | `Button` | AUTO-FIX `button` → STOP | Duplicate after fix |
| E3 | `video` | STOP "Component 'video' already exists" | Exact match |

### F) DisplayName Validation

| ID | ComponentName | DisplayName Input | Expected Output | Description |
|----|---------------|-------------------|----------------|-------------|
| F1 | `author` | `` (empty) | STOP "displayName required" | Empty displayName |
| F2 | `author` | `"Autor"` | ACCEPT | Valid Czech displayName |
| F3 | `author` | `"Author"` | ACCEPT | Valid English displayName |
| F4 | `image-gallery` | `"Image Gallery"` | ACCEPT | Multi-word displayName |

### G) Icon Validation

| ID | Icon Input | Expected Output | Description |
|----|-----------|----------------|-------------|
| G1 | `` (empty/skip) | ACCEPT | Icon is optional |
| G2 | `"picture"` | ACCEPT | Valid icon |
| G3 | `"video"` | ACCEPT | Valid icon |
| G4 | `"unknown-xyz"` | ACCEPT | Unknown icon (Strapi validates) |

---

## Test Case Generators

### Random Valid Names Generator

```javascript
const validNames = [
    // Single words
    'book', 'car', 'user', 'product', 'service', 'team', 'member',
    'article', 'post', 'comment', 'review', 'order', 'item', 'author',
    'testimonial', 'gallery', 'video', 'image', 'quote', 'badge',

    // Multi-word
    'hero-banner', 'contact-form', 'price-list', 'user-profile',
    'product-card', 'feature-list', 'testimonial-slider', 'image-gallery',
    'social-share', 'author-card', 'video-player', 'rating-stars',

    // With numbers
    'step1', 'phase2', 'level3', 'tier1-pricing', 'tier2', 'section3'
];

function getRandomValidName() {
    return validNames[Math.floor(Math.random() * validNames.length)];
}
```

### PascalCase Variants Generator

```javascript
function toPascalCaseVariants(kebabName) {
    // hero-banner → ["HeroBanner", "heroBanner", "HEROBANNER", "Hero_Banner"]
    const parts = kebabName.split('-');

    return [
        // PascalCase
        parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(''),
        // camelCase
        parts.map((p, i) => i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)).join(''),
        // UPPERCASE
        kebabName.toUpperCase(),
        // Underscore variants
        parts.join('_'),
        parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('_'),
    ];
}

// Example usage:
toPascalCaseVariants('hero-banner')
// → ['HeroBanner', 'heroBanner', 'HERO-BANNER', 'hero_banner', 'Hero_Banner']
```

### Plural Tests Generator

```javascript
const pluralTests = [
    { input: 'books', singular: 'book' },
    { input: 'cars', singular: 'car' },
    { input: 'users', singular: 'user' },
    { input: 'products', singular: 'product' },
    { input: 'services', singular: 'service' },
    { input: 'stories', singular: 'story' },
    { input: 'categories', singular: 'category' },
    { input: 'galleries', singular: 'gallery' },
    { input: 'boxes', singular: 'box' },
    { input: 'classes', singular: 'class' },
    { input: 'heroes', singular: 'hero' },
    { input: 'authors', singular: 'author' },
    { input: 'testimonials', singular: 'testimonial' },
    { input: 'images', singular: 'image' },
    { input: 'videos', singular: 'video' },
];
```

### Czech Words Generator

```javascript
const czechWords = [
    // With diacritics
    { czech: 'kniha', english: 'book' },
    { czech: 'článek', english: 'article' },
    { czech: 'tlačítko', english: 'button' },
    { czech: 'služba', english: 'service' },
    { czech: 'tým', english: 'team' },
    { czech: 'člen', english: 'member' },
    { czech: 'výrobek', english: 'product' },
    { czech: 'stránka', english: 'page' },
    { czech: 'formulář', english: 'form' },

    // Without diacritics (harder to detect)
    { czech: 'clanek', english: 'article' },
    { czech: 'sluzba', english: 'service' },
    { czech: 'vyrobek', english: 'product' },
    { czech: 'stranka', english: 'page' },
    { czech: 'formular', english: 'form' },
    { czech: 'galerie', english: 'gallery' },
    { czech: 'kategorie', english: 'category' },
    { czech: 'obrazek', english: 'image' },
    { czech: 'stitek', english: 'tag' },
    { czech: 'tlacitko', english: 'button' },
];
```

### Edge Cases Generator

```javascript
const edgeCases = [
    // Empty/whitespace
    { input: '', expected: 'STOP', reason: 'Empty input' },
    { input: '   ', expected: 'STOP', reason: 'Only whitespace' },
    { input: '---', expected: 'STOP', reason: 'Only hyphens (empty after fix)' },
    { input: '___', expected: 'STOP', reason: 'Only underscores (empty after fix)' },

    // Very long
    { input: 'very-long-block-name-that-goes-on-and-on-and-never-ends', expected: 'ACCEPT', reason: 'Very long name' },

    // Unicode characters
    { input: 'кнопка', expected: 'STOP', reason: 'Cyrillic characters' },
    { input: 'ボタン', expected: 'STOP', reason: 'Japanese characters' },
    { input: '按钮', expected: 'STOP', reason: 'Chinese characters' },

    // Special characters
    { input: '!!!', expected: 'STOP', reason: 'Only special chars (empty after fix)' },
    { input: 'test@#$%', expected: 'AUTO-FIX', reason: 'Special chars removed' },

    // Numbers
    { input: '123', expected: 'ACCEPT', reason: 'Only numbers' },
    { input: '3d-model', expected: 'WARN', reason: 'Starts with number' },
];
```

---

## Example Test Run

### Block Creator - Test #1

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 Test #1: Happy Path - jednoslovný název
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Simuluji vstup: "book"
Očekávané chování: Přijmout, vytvořit "book-block"

Aplikuji pravidla...
- detectCzech("book") = false
- detectPlural("book") = false
- autoFix("book") = "book"
- addSuffix("book") = "book-block"
- checkExists("book-block") = false

Výstup: ACCEPT "book-block"
Očekávání: ACCEPT "book-block"

✅ PASS | Test #1 | "book" → "book-block" | Happy Path
```

### Complementary Creator - Test #4

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 Test #4: Duplicita - existující component
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Simuluji vstup: "button"
Očekávané chování: STOP - component již existuje

Aplikuji pravidla...
- detectCzech("button") = false
- detectPlural("button") = false
- autoFix("button") = "button"
- checkExists("button") = true ❌
  Nalezen: cms/src/components/complementary/button.json

Výstup: STOP "Component 'button' already exists"
Očekávání: STOP s upozorněním na existující component

✅ PASS | Test #4 | "button" → STOP (duplicate) | Duplicate detection
```

---

## Adding Custom Test Cases

To add new test cases for an agent:

1. **Identify the category** (Happy Path, Auto-fix, Warning, Edge case, Duplicate)
2. **Define input and expected output**
3. **Add to appropriate table** above
4. **Update test generator** if new pattern is introduced

Example:

```markdown
### F) New Category

| ID | Input | Expected Output | Description |
|----|-------|----------------|-------------|
| F1 | `new-input` | ACCEPT `new-output` | New test case |
```
