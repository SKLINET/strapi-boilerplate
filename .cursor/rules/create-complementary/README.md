# Create Complementary Component Agent

This agent helps you create new complementary components in the Strapi boilerplate.

## What are Complementary Components?

**Complementary components** are reusable sub-components that are nested within blocks or content types. They don't render directly on pages - instead, they're used as building blocks for other components.

### Examples:
- **button** - Used in menus, blocks, templates for CTA links
- **video** - Used in VideoBlock for video content
- **send-email** - Used in FormBlock for email configuration
- **author** - Could be used in ArticleBlock for author info
- **testimonial** - Could be used in TestimonialBlock

### When to create a Complementary Component?

✅ **Create a complementary component when:**
- The component will be reused in multiple blocks or content types
- The component represents a logical data grouping (e.g., author info, social links)
- The component needs to be edited separately in the CMS
- The component is not a standalone block

❌ **Don't create a complementary component when:**
- The component only appears in one place
- The data is simple enough to be inline fields
- You need a standalone block that editors can add to pages

## File Structure

```
.cursor/rules/create-complementary/
├── create-complementary.mdc    # Main agent rules
├── file-templates.md            # TypeScript/GraphQL templates
├── cms-reference.md             # CMS field type definitions
├── graphql-reference.md         # GraphQL fragment examples
└── README.md                    # This file
```

## Usage

### Trigger Phrases (Czech):
- "vytvoř complementary"
- "přidej complementary"
- "nový complementary"
- "create complementary"

### Step-by-Step Process

1. **Agent asks for component name**
   - Example: `author`, `testimonial`, `image-gallery`
   - Auto-fixes formatting (PascalCase → kebab-case, spaces → hyphens)
   - Validates no duplicates exist
   - **Auto-generates English displayName** (kebab-case → PascalCase)
     - `donate-amount` → `DonateAmount`
     - `image-gallery` → `ImageGallery`

2. **Agent asks for icon (optional)**
   - Choose from available icons or skip

3. **Agent asks where it will be used**
   - Informational only - helps with context

4. **Agent asks if it needs app context**
   - Yes: For components with page relations or global data
   - No: For standalone data components

5. **Agent shows summary and asks for confirmation**

6. **After confirmation, agent creates:**
   - CMS schema: `cms/src/components/complementary/{name}.json`
   - TypeScript type: `frontend/src/types/{name}.ts`
   - Transformer with list helper: `frontend/src/utils/strapi/get{Name}Type.ts`
     - `get{Name}Type()` - Transform single item
     - `get{Name}TypeList()` - Transform array (for repeatable components)
   - GraphQL fragment in `frontend/src/relay/app.ts`

7. **Agent shows TODO list** with next steps

## What Gets Created

### 1. CMS Schema
**Location:** `cms/src/components/complementary/{componentNameKebab}.json`

Empty schema ready for fields to be added in CMS Content-Type Builder.

### 2. TypeScript Type Interface
**Location:** `frontend/src/types/{componentNameCamel}.ts`

Type interface for TypeScript type safety.

### 3. Transformer Utility
**Location:** `frontend/src/utils/strapi/get{ComponentName}Type.ts`

Function that transforms GraphQL fragment data to TypeScript interface.

### 4. GraphQL Fragment
**Location:** `frontend/src/relay/app.ts` (updated)

Fragment definition for GraphQL queries.

## After Creation TODO

1. **Restart CMS**
   ```bash
   cd cms && npm run develop
   ```

2. **Add fields in Strapi Content-Type Builder**
   - Go to Components → complementary → {Your Component}
   - Add fields (text, media, relations, etc.)
   - Save

3. **Refresh GraphQL schema**
   ```bash
   cd frontend && npm run graphql-codegen
   ```

4. **Update GraphQL fragment**
   - Edit `frontend/src/relay/app.ts`
   - Add fields to your fragment
   - See `graphql-reference.md` for examples

5. **Run Relay compiler**
   ```bash
   cd frontend && npm run relay
   ```

6. **Use in blocks or content types**
   - Add component field in CMS
   - Reference in block/content type schema
   - Use transformer in block component

## Example: Creating a Testimonial Component

### Input
```
Name: testimonial
Display Name: Reference
Icon: quote
Usage: in TestimonialBlock
Needs app: No
```

### Created Files

**CMS Schema:** `cms/src/components/complementary/testimonial.json`
```json
{
  "collectionName": "components_complementary_testimonials",
  "info": {
    "displayName": "Reference",
    "icon": "quote"
  },
  "options": {},
  "attributes": {}
}
```

**Type:** `frontend/src/types/testimonial.ts`
```typescript
export interface ITestimonial {
    id: string;
}
```

**Transformer:** `frontend/src/utils/strapi/getTestimonialType.ts`
```typescript
import { appTestimonialFragment$data } from '../../relay/__generated__/appTestimonialFragment.graphql';
import { ITestimonial } from '../../types/testimonial';

type Fragment = Omit<appTestimonialFragment$data, ' $fragmentType'>;

export const getTestimonialType = (e: Fragment | null | undefined): ITestimonial | null => {
    if (!e) return null;
    const { id } = e;
    return { id };
};
```

**Fragment in relay/app.ts:**
```typescript
graphql`
    fragment appTestimonialFragment on ComponentComplementaryTestimonial {
        id
    }
`;
```

### After Adding Fields

**Updated CMS Schema** (manually in CMS):
- `quote` (Text, required)
- `authorName` (String, required)
- `authorRole` (String)
- `authorPhoto` (Media - Image)
- `rating` (Integer)

**Updated Fragment:**
```typescript
graphql`
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
`;
```

**Updated Type:**
```typescript
export interface ITestimonial {
    id: string;
    quote: string;
    authorName: string;
    authorRole: string | null;
    authorPhoto: IImage | null;
    rating: number | null;
}
```

**Updated Transformer:**
```typescript
export const getTestimonialType = (e: Fragment | null | undefined): ITestimonial | null => {
    if (!e) return null;
    const { id, quote, authorName, authorRole, authorPhoto, rating } = e;
    return {
        id,
        quote,
        authorName,
        authorRole: authorRole || null,
        authorPhoto: getImageType(authorPhoto?.data),
        rating: rating || null,
    };
};
```

### Using in a Block

**Add to block CMS schema:**
```json
{
  "attributes": {
    "testimonials": {
      "type": "component",
      "component": "complementary.testimonial",
      "repeatable": true
    }
  }
}
```

**Add to block GraphQL fragment:**
```typescript
graphql`
    fragment TestimonialBlock_content on ComponentBlockTestimonialBlock {
        id
        testimonials {
            ...appTestimonialFragment @relay(mask: false)
        }
    }
`;
```

**Use in block component:**
```typescript
import { getTestimonialType } from '../../../utils/strapi/getTestimonialType';

const TestimonialBlock = ({ blocksData }: TestimonialBlockProps) => {
    const testimonials = blocksData.testimonials
        ?.map(t => getTestimonialType(t))
        .filter(Boolean) as ITestimonial[];

    return (
        <div>
            {testimonials.map(testimonial => (
                <div key={testimonial.id}>
                    <p>{testimonial.quote}</p>
                    <p>{testimonial.authorName} - {testimonial.authorRole}</p>
                </div>
            ))}
        </div>
    );
};
```

## Tips

1. **Keep names simple and descriptive** - `author`, not `article-author-info`
2. **One responsibility** - Each component should have a single, clear purpose
3. **Reusability** - Design for reuse across multiple blocks
4. **Optional fields** - Most fields should be optional for flexibility
5. **App context** - Only use when you need page relations or global data
6. **Nested components** - You can nest complementary components within each other
7. **List helpers included** - Every transformer automatically includes a list helper for handling arrays
   - Use `get{Name}Type()` for single items
   - Use `get{Name}TypeList()` for repeatable components

## Reference Files

- **cms-reference.md** - All available CMS field types with examples
- **graphql-reference.md** - GraphQL fragment patterns and examples
- **file-templates.md** - Complete code templates

## Existing Complementary Components

Study these for patterns:

- **button** - With app context (page relation)
- **video** - Without app context (media handling)
- **send-email** - Simple configuration component
- **mailchimp/ecomail** - Integration configurations

## Troubleshooting

**Fragment not found after running relay:**
- Make sure you ran `npm run graphql-codegen` first
- Check that fields in fragment match CMS schema exactly
- Restart CMS if you added new fields

**Type errors in transformer:**
- Run `npm run relay` to regenerate types
- Check import paths for fragment types

**Component not appearing in CMS:**
- Restart CMS: `cd cms && npm run develop`
- Check schema file is valid JSON
- Look for errors in CMS console
