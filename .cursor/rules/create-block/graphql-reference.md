# GraphQL Fragment Reference

Add these to your block's GraphQL fragment after adding fields in CMS.

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

# Anchor (for page links)
anchor
```

## Media/Image

```graphql
image {
    data {
        ...appImageFragment @relay(mask: false)
    }
}
```

## Richtext (TinyMCE)

```graphql
content
```

## Button Component

```graphql
button {
    ...appButtonFragment @relay(mask: false)
}

# Optional button
optionalButton {
    ...appButtonFragment @relay(mask: false)
}
```

## Video Component

```graphql
video {
    ...appVideoFragment @relay(mask: false)
}
```

## Media Component (image or video)

```graphql
media {
    ...appMediaFragment @relay(mask: false)
}
```

## Background Component

```graphql
background {
    ...appBackgroundFragment @relay(mask: false)
}
```

## Text Item (repeatable)

```graphql
items {
    ...appTextItemFragment @relay(mask: false)
}

# Or with different name
optionalReasons {
    ...appTextItemFragment @relay(mask: false)
}
```

## Complete Example

```graphql
fragment HeroBannerBlock_content on ComponentBlockHeroBannerBlock {
    id
    title
    description
    anchor
    optionalButton {
        ...appButtonFragment @relay(mask: false)
    }
    optionalReasons {
        ...appTextItemFragment @relay(mask: false)
    }
    background {
        ...appBackgroundFragment @relay(mask: false)
    }
    video {
        ...appVideoFragment @relay(mask: false)
    }
}
```

## Important Rules

1. Always use `@relay(mask: false)` for fragments
2. Field names must match exactly what's defined in CMS
3. Run `npm run relay` after updating fragments
4. TypeScript types are generated in `__generated__/` folder
