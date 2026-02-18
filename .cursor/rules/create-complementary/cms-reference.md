# CMS Field Types Reference for Complementary Components

Field definitions for Strapi CMS complementary component schema (`cms/src/components/complementary/*.json`).

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
  "required": false,
  "allowedTypes": ["images"]
}
```

## Media (multiple images)

```json
"images": {
  "type": "media",
  "multiple": true,
  "required": false,
  "allowedTypes": ["images"]
}
```

## Media (video)

```json
"uploadedVideo": {
  "type": "media",
  "multiple": false,
  "required": false,
  "allowedTypes": ["videos"]
}
```

## Number

```json
"count": {
  "type": "integer",
  "default": 0
}
```

## Decimal

```json
"price": {
  "type": "decimal"
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

## Email

```json
"email": {
  "type": "email"
}
```

## URL

```json
"linkExternal": {
  "type": "string"
}
```

## Date

```json
"publishDate": {
  "type": "date"
}
```

## DateTime

```json
"publishedAt": {
  "type": "datetime"
}
```

## Time

```json
"openingTime": {
  "type": "time"
}
```

## Relation (Page)

```json
"page": {
  "type": "relation",
  "relation": "oneToOne",
  "target": "api::page.page"
}
```

## Relation (Article)

```json
"article": {
  "type": "relation",
  "relation": "oneToOne",
  "target": "api::article.article"
}
```

## Custom Field (External Video)

```json
"externalVideo": {
  "type": "customField",
  "customField": "plugin::video-field.video"
}
```

## JSON

```json
"metadata": {
  "type": "json"
}
```

## Nested Component

```json
"button": {
  "type": "component",
  "component": "complementary.button",
  "repeatable": false
}
```

## Repeatable Component

```json
"items": {
  "type": "component",
  "component": "complementary.text-item",
  "repeatable": true
}
```

---

## Real-World Examples

### Video Component
```json
{
  "collectionName": "components_complementary_videos",
  "info": {
    "displayName": "Video"
  },
  "options": {},
  "attributes": {
    "uploadedVideo": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["videos"]
    },
    "externalVideo": {
      "type": "customField",
      "customField": "plugin::video-field.video"
    },
    "optionalImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    }
  }
}
```

### Button Component
```json
{
  "collectionName": "components_complementary_buttons",
  "info": {
    "displayName": "Button",
    "icon": "bold"
  },
  "options": {},
  "attributes": {
    "label": {
      "type": "string",
      "required": true
    },
    "page": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "api::page.page"
    },
    "linkExternal": {
      "type": "string"
    },
    "openInNewTab": {
      "type": "boolean",
      "default": false
    },
    "anchor": {
      "type": "string"
    }
  }
}
```

### Send Email Component
```json
{
  "collectionName": "components_complementary_send_emails",
  "info": {
    "displayName": "Send Email"
  },
  "options": {},
  "attributes": {
    "emailTo": {
      "type": "string",
      "required": true
    },
    "emailSubject": {
      "type": "string"
    },
    "emailReplyTo": {
      "type": "string"
    }
  }
}
```

---

## Important Notes

1. **Keep it simple** - Complementary components should be reusable and focused
2. Use `"required": true` sparingly - usually only for the most essential field
3. Component names use dot notation: `"complementary.button"`
4. Use `"repeatable": true` for lists of nested components
5. After adding fields, restart CMS: `cd cms && npm run develop`
6. For relations, you need app context in the transformer function
7. Avoid circular dependencies - complementary components shouldn't reference blocks

## Common Patterns

### Media with Fallback
```json
"uploadedImage": {
  "type": "media",
  "multiple": false,
  "allowedTypes": ["images"]
},
"externalImageUrl": {
  "type": "string"
}
```

### Link (Internal or External)
```json
"page": {
  "type": "relation",
  "relation": "oneToOne",
  "target": "api::page.page"
},
"linkExternal": {
  "type": "string"
},
"anchor": {
  "type": "string"
}
```

### Toggle with Value
```json
"isEnabled": {
  "type": "boolean",
  "default": false
},
"value": {
  "type": "string"
}
```
