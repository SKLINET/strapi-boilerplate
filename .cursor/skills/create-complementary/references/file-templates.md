# File Templates for Complementary Component Creation

## CMS Schema Template

**File:** `cms/src/components/complementary/{componentNameKebab}.json`

### Without Icon
```json
{
  "collectionName": "components_complementary_{componentNameKebab}s",
  "info": {
    "displayName": "{displayName}",
    "description": ""
  },
  "options": {},
  "attributes": {}
}
```

### With Icon
```json
{
  "collectionName": "components_complementary_{componentNameKebab}s",
  "info": {
    "displayName": "{displayName}",
    "icon": "{icon}",
    "description": ""
  },
  "options": {},
  "attributes": {}
}
```

---

## TypeScript Type Interface Template

**File:** `frontend/src/types/{componentNameCamel}.ts`

```typescript
export interface I{componentNamePascal} {
    id: string;
    // TODO: Add fields after adding them in CMS
}
```

**Example with fields:**
```typescript
// For a component with title and description fields
export interface I{componentNamePascal} {
    id: string;
    title: string;
    description: string | null;
}
```

---

## Transformer Utility Template (Without App Context)

**File:** `frontend/src/utils/strapi/{transformerName}.ts`

```typescript
import { {fragmentName}$data } from '../../relay/__generated__/{fragmentName}.graphql';
import { I{componentNamePascal} } from '../../types/{componentNameCamel}';

type Fragment = Omit<{fragmentName}$data, ' $fragmentType'>;

export const {transformerName} = (e: Fragment | null | undefined): I{componentNamePascal} | null => {
    if (!e) return null;

    const { id /* TODO: destructure fields */ } = e;

    return {
        id: id,
        // TODO: map fields
    };
};

export const {transformerName}List = (
    e: ReadonlyArray<Fragment | null | undefined> | null | undefined,
): I{componentNamePascal}[] => {
    const data: I{componentNamePascal}[] = [];

    e?.forEach((k) => {
        const el = {transformerName}(k);

        if (!el) return;

        data.push(el);
    });

    return data;
};
```

**Complete example (Video):**
```typescript
import { appVideoFragment$data } from '../../relay/__generated__/appVideoFragment.graphql';
import { IVideo } from '../../types/video';
import { getImageType } from './getImageType';
import { getUploadedVideoType } from './getUploadedVideoType';

type Fragment = Omit<appVideoFragment$data, ' $fragmentType'>;

export const getVideoType = (e: Fragment | null | undefined): IVideo | null => {
    if (!e) return null;

    const { id, uploadedVideo, externalVideo, optionalImage } = e;

    return {
        id: id,
        uploadedVideo: getUploadedVideoType(uploadedVideo),
        externalVideo: externalVideo || null,
        image: getImageType(optionalImage),
    };
};

export const getVideoTypeList = (
    e: ReadonlyArray<Fragment | null | undefined> | null | undefined,
): IVideo[] => {
    const data: IVideo[] = [];

    e?.forEach((k) => {
        const el = getVideoType(k);

        if (!el) return;

        data.push(el);
    });

    return data;
};
```

---

## Transformer Utility Template (With App Context)

**File:** `frontend/src/utils/strapi/{transformerName}.ts`

```typescript
import { {fragmentName}$data } from '../../relay/__generated__/{fragmentName}.graphql';
import { I{componentNamePascal} } from '../../types/{componentNameCamel}';
import { IApp } from '../../types/base/app';

type Fragment = Omit<{fragmentName}$data, ' $fragmentType'>;

export const {transformerName} = (e: Fragment | null | undefined, app: IApp): I{componentNamePascal} | null => {
    if (!e) return null;

    const { id /* TODO: destructure fields */ } = e;

    return {
        id: id,
        // TODO: map fields (can use app.locale, app.pages, etc.)
    };
};

export const {transformerName}List = (
    e: ReadonlyArray<Fragment | null | undefined> | null | undefined,
    app: IApp,
): I{componentNamePascal}[] => {
    const data: I{componentNamePascal}[] = [];

    e?.forEach((k) => {
        const el = {transformerName}(k, app);

        if (!el) return;

        data.push(el);
    });

    return data;
};
```

**Complete example (Button):**
```typescript
import { IButton } from '../../types/button';
import { getPageType } from './getPageType';
import { appButtonFragment$data } from '../../relay/__generated__/appButtonFragment.graphql';
import { IApp } from '../../types/base/app';

type Fragment = Omit<appButtonFragment$data, ' $fragmentType'>;

export const getButtonType = (e: Fragment | null | undefined, app: IApp): IButton | null => {
    if (!e) return null;

    const { id, label, page, linkExternal, openInNewTab, anchor } = e;

    const _page = getPageType(page, app);

    const href = _page?.href || linkExternal;

    if (!href && !anchor) return null;

    return {
        id: id,
        label: label,
        href: href || null,
        openInNewTab: openInNewTab || false,
        anchor: anchor || null,
    };
};

export const getButtonListType = (
    e: ReadonlyArray<Fragment | null | undefined> | null | undefined,
    app: IApp,
): IButton[] => {
    const data: IButton[] = [];

    e?.forEach((k) => {
        const el = getButtonType(k, app);

        if (!el) return;

        data.push(el);
    });

    return data;
};
```

---

## GraphQL Fragment Template

**Location:** Add to `frontend/src/relay/app.ts` in alphabetical order with other complementary fragments

```typescript
graphql`
    fragment {fragmentName} on {typeName} {
        id
        # TODO: Add fields after adding them in CMS
    }
`;
```

**Example with fields:**
```typescript
graphql`
    fragment appImageGalleryFragment on ComponentComplementaryImageGallery {
        id
        title
        images {
            ...appImageFragment @relay(mask: false)
        }
    }
`;
```

---

## Variable Reference

| Variable | Example | Description |
|----------|---------|-------------|
| `{componentNameKebab}` | `image-gallery` | CMS schema name |
| `{componentNamePascal}` | `ImageGallery` | TypeScript type name |
| `{componentNameCamel}` | `imageGallery` | Type file name |
| `{fragmentName}` | `appImageGalleryFragment` | GraphQL fragment name |
| `{typeName}` | `ComponentComplementaryImageGallery` | GraphQL typename |
| `{transformerName}` | `getImageGalleryType` | Transformer function name |
| `{transformerName}List` | `getImageGalleryTypeList` | List transformer function (for arrays) |
| `{displayName}` | `ImageGallery` | Auto-generated English name (PascalCase) shown in CMS |
| `{icon}` | `picture` | Strapi icon name (optional) |

---

## Usage in Blocks

### Step 1: Add component to block schema in CMS
```json
{
  "attributes": {
    "myComponent": {
      "type": "component",
      "component": "complementary.image-gallery"
    }
  }
}
```

### Step 2: Add to block GraphQL fragment
```typescript
graphql`
    fragment MyBlock_content on ComponentBlockMyBlock {
        id
        myComponent {
            ...appImageGalleryFragment @relay(mask: false)
        }
    }
`;
```

### Step 3: Use in block component
```typescript
import { getImageGalleryType } from '../../../utils/strapi/getImageGalleryType';

const MyBlock = ({ blocksData, app }: MyBlockProps) => {
    const gallery = getImageGalleryType(blocksData.myComponent);

    if (!gallery) return null;

    return (
        <div>
            <h2>{gallery.title}</h2>
            {/* Render gallery */}
        </div>
    );
};
```

### For components needing app context:
```typescript
import { getMyComponentType } from '../../../utils/strapi/getMyComponentType';

const MyBlock = ({ blocksData, app }: MyBlockProps) => {
    const component = getMyComponentType(blocksData.myComponent, app);
    // ...
};
```

---

## Usage with Repeatable Components (Arrays)

### Step 1: Add repeatable component to block schema in CMS
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

### Step 2: Add to block GraphQL fragment
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

### Step 3: Use list transformer in block component

**Without app context:**
```typescript
import { getTestimonialTypeList } from '../../../utils/strapi/getTestimonialType';

const TestimonialBlock = ({ blocksData }: TestimonialBlockProps) => {
    const testimonials = getTestimonialTypeList(blocksData.testimonials);

    return (
        <div>
            {testimonials.map(testimonial => (
                <div key={testimonial.id}>
                    <p>{testimonial.quote}</p>
                    <p>{testimonial.authorName}</p>
                </div>
            ))}
        </div>
    );
};
```

**With app context:**
```typescript
import { getIconCardTypeList } from '../../../utils/strapi/getIconCardType';

const IconCardsBlock = ({ blocksData, app }: IconCardsBlockProps) => {
    const cards = getIconCardTypeList(blocksData.cards, app);

    return (
        <div>
            {cards.map(card => (
                <div key={card.id}>
                    <h3>{card.title}</h3>
                    {card.primaryButton && (
                        <a href={card.primaryButton.href}>
                            {card.primaryButton.label}
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};
```

### Benefits of List Helper Function

1. **Consistent null handling** - Filters out null/undefined items automatically
2. **Type safety** - Returns properly typed array
3. **DRY principle** - Reusable across the codebase
4. **Clean code** - One function call instead of map + filter logic
