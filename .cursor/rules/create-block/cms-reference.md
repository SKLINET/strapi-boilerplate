# CMS Field Types Reference

Field definitions for Strapi CMS schema (`cms/src/components/block/*.json`).

## String

```json
"title": {
  "type": "string",
  "required": true
}
```

## Text (multiline)

```json
"description": {
  "type": "text"
}
```

## Richtext (TinyMCE)

```json
"content": {
  "type": "customField",
  "customField": "plugin::tinymce.tinymce"
}
```

## Media (single image)

```json
"image": {
  "type": "media",
  "multiple": false,
  "allowedTypes": ["images"]
}
```

## Media (multiple images)

```json
"images": {
  "type": "media",
  "multiple": true,
  "allowedTypes": ["images"]
}
```

## Number

```json
"count": {
  "type": "integer",
  "default": 0
}
```

## Boolean

```json
"isActive": {
  "type": "boolean",
  "default": false
}
```

## Enumeration

```json
"theme": {
  "type": "enumeration",
  "enum": ["light", "dark", "primary"]
}
```

## Button Component

```json
"button": {
  "type": "component",
  "component": "complementary.button",
  "repeatable": false
}
```

## Video Component

```json
"video": {
  "type": "component",
  "component": "complementary.video",
  "repeatable": false
}
```

## Media Component (image or video)

```json
"media": {
  "type": "component",
  "component": "complementary.media",
  "repeatable": false
}
```

## Background Component

```json
"background": {
  "type": "component",
  "component": "complementary.background",
  "repeatable": false
}
```

## Text Item (repeatable list)

```json
"items": {
  "type": "component",
  "component": "complementary.text-item",
  "repeatable": true
}
```

## Anchor (for page navigation)

```json
"anchor": {
  "type": "string"
}
```

## Important Notes

1. Use `"required": true` only for essential fields (usually just title)
2. Component names use dot notation: `"complementary.button"`
3. Use `"repeatable": true` for lists of components
4. After adding fields, restart CMS: `cd cms && npm run develop`
