# Create Block Rules

This folder contains rules for the Block Creator Agent.

## Files

| File | Description |
|------|-------------|
| `create-block.mdc` | Main agent rules - step-by-step flow |
| `file-templates.md` | TypeScript/SCSS templates for generated files |
| `graphql-reference.md` | GraphQL fragment examples |
| `cms-reference.md` | CMS field type definitions |

## Usage

Trigger the agent with:
- "create block"
- "add block"
- "new block"

## Quick Reference

### Files Created

```
cms/src/components/block/{block-name}.json          # CMS schema
cms/src/api/page/content-types/page/schema.json     # Updated dynamic zone
frontend/src/app/blocks/{BlockName}/{BlockName}.tsx # Block wrapper
frontend/src/app/components/blocks/{Name}/{Name}.tsx # UI component
frontend/src/app/components/blocks/{Name}/{Name}.module.scss # Styles
frontend/src/app/blocks/server.ts                   # Updated (import, fragment, export)
frontend/src/app/blocks/client.ts                   # Updated (switch case)
```

### Name Conversion

| Input | Kebab | Pascal | Component | GraphQL Type |
|-------|-------|--------|-----------|--------------|
| `book` | `book-block` | `BookBlock` | `Book` | `ComponentBlockBookBlock` |
| `hero-banner` | `hero-banner-block` | `HeroBannerBlock` | `HeroBanner` | `ComponentBlockHeroBannerBlock` |
