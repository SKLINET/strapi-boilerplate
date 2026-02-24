# GraphQL Fragment Reference for Complementary Components

Add these fields to your complementary component's GraphQL fragment in `frontend/src/relay/app.ts` after adding fields in CMS.

## Simple Fields

```graphql
# String
title

# Text
description

# Number
count

# Boolean
isActive

# Email
email

# URL/Link
linkExternal

# Anchor (for page links)
anchor
```

## Media/Image

```graphql
# Single image
image {
    data {
        ...appImageFragment @relay(mask: false)
    }
}

# Multiple images
images {
    data {
        ...appImageFragment @relay(mask: false)
    }
}

# Optional image
optionalImage {
    data {
        ...appImageFragment @relay(mask: false)
    }
}
```

## Video

```graphql
# Uploaded video
uploadedVideo {
    data {
        ...appUploadedVideoFragment @relay(mask: false)
    }
}

# External video (YouTube, Vimeo)
externalVideo
```

## Richtext (TinyMCE)

```graphql
content
```

## Relations

```graphql
# Page relation
page {
    data {
        id
        attributes {
            url
            title
        }
    }
}

# Article relation
article {
    data {
        id
        attributes {
            title
            slug
        }
    }
}
```

## Nested Components

```graphql
# Single nested component
button {
    ...appButtonFragment @relay(mask: false)
}

# Optional nested component
optionalButton {
    ...appButtonFragment @relay(mask: false)
}

# Repeatable nested component
items {
    ...appTextItemFragment @relay(mask: false)
}
```

## Dates

```graphql
# Date
publishDate

# DateTime
publishedAt

# Time
openingTime
```

## Enumerations

```graphql
theme
```

## JSON

```graphql
metadata
```

---

## Real-World Examples

### Video Component Fragment
```graphql
fragment appVideoFragment on ComponentComplementaryVideo {
    id
    uploadedVideo {
        data {
            ...appUploadedVideoFragment @relay(mask: false)
        }
    }
    externalVideo
    optionalImage {
        data {
            ...appImageFragment @relay(mask: false)
        }
    }
}
```

### Button Component Fragment
```graphql
fragment appButtonFragment on ComponentComplementaryButton {
    id
    label
    page {
        data {
            id
            attributes {
                url
                title
            }
        }
    }
    linkExternal
    openInNewTab
    anchor
}
```

### Send Email Component Fragment
```graphql
fragment appSendEmailFragment on ComponentComplementarySendEmail {
    id
    emailTo
    emailSubject
    emailReplyTo
}
```

### Image Gallery Component Fragment (Example)
```graphql
fragment appImageGalleryFragment on ComponentComplementaryImageGallery {
    id
    title
    images {
        data {
            ...appImageFragment @relay(mask: false)
        }
    }
}
```

### Author Component Fragment (Example)
```graphql
fragment appAuthorFragment on ComponentComplementaryAuthor {
    id
    name
    bio
    photo {
        data {
            ...appImageFragment @relay(mask: false)
        }
    }
    socialLinks {
        ...appSocialLinkFragment @relay(mask: false)
    }
}
```

---

## Complete Example: Testimonial Component

### CMS Schema
```json
{
  "collectionName": "components_complementary_testimonials",
  "info": {
    "displayName": "Testimonial",
    "icon": "quote"
  },
  "options": {},
  "attributes": {
    "quote": {
      "type": "text",
      "required": true
    },
    "authorName": {
      "type": "string",
      "required": true
    },
    "authorRole": {
      "type": "string"
    },
    "authorPhoto": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "rating": {
      "type": "integer"
    }
  }
}
```

### GraphQL Fragment
```graphql
fragment appTestimonialFragment on ComponentComplementaryTestimonial {
    id
    quote
    authorName
    authorRole
    authorPhoto {
        data {
            ...appImageFragment @relay(mask: false)
        }
    }
    rating
}
```

---

## Important Rules

1. **Always use `@relay(mask: false)` for fragments** - Required for proper type generation
2. **Field names must match exactly** what's defined in CMS
3. **Run commands in order:**
   - Add fields in CMS
   - `npm run graphql-codegen` (generates schema)
   - Update fragment in `relay/app.ts`
   - `npm run relay` (generates TypeScript types)
4. **TypeScript types are auto-generated** in `relay/__generated__/{fragmentName}.graphql.ts`
5. **Fragment naming convention:** `app{ComponentName}Fragment`
6. **GraphQL typename:** `ComponentComplementary{ComponentName}` (PascalCase)

---

## Available App Fragments (for nesting)

These fragments are already defined and can be used in your complementary components:

```graphql
...appImageFragment @relay(mask: false)
...appUploadedVideoFragment @relay(mask: false)
...appVideoFragment @relay(mask: false)
...appButtonFragment @relay(mask: false)
...appSendEmailFragment @relay(mask: false)
...appBuiltFormFragment @relay(mask: false)
...appIconFragment @relay(mask: false)
# Add your new fragments to this list
```

---

## Tips

1. **Keep fragments focused** - Only include fields you'll actually use
2. **Use optional fields** - Don't require fields unless absolutely necessary
3. **Nested fragments** - Reuse existing fragments for nested components
4. **Media fields** - Always wrap in `data { ... }` structure
5. **Testing** - Test fragment in GraphQL Playground at `http://localhost:1337/graphql`
