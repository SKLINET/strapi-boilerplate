# File Templates for Block Creation

## Block Wrapper Template

**File:** `frontend/src/app/blocks/{blockNamePascal}/{blockNamePascal}.tsx`

```typescript
import React, { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { graphql } from 'relay-runtime';
import { {blockNamePascal}_content$data } from './__generated__/{blockNamePascal}_content.graphql';
import { IApp } from '../../../types/base/app';

const {componentName} = dynamic(() => import('../../components/blocks/{componentName}/{componentName}').then((mod) => mod.{componentName}));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface {blockNamePascal}StaticProps {}

export interface {blockNamePascal}Content extends Omit<{blockNamePascal}_content$data, ' $fragmentType'> {
    __typename: '{typeName}';
}

export interface {blockNamePascal}Props extends {blockNamePascal}StaticProps {
    blocksData: Omit<{blockNamePascal}Content, ' $fragmentType'>;
    app: IApp;
    className?: string;
}

graphql`
    fragment {blockNamePascal}_content on {typeName} {
        id
    }
`;

const {blockNamePascal} = (props: {blockNamePascal}Props): ReactElement => <{componentName} {...props} />;

export default {blockNamePascal};
```

---

## Block Wrapper with getStaticProps Template

```typescript
import React, { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { graphql } from 'relay-runtime';
import { {blockNamePascal}_content$data } from './__generated__/{blockNamePascal}_content.graphql';
import { IApp } from '../../../types/base/app';
import { StaticBlockContext } from '../../../types/base/block';

const {componentName} = dynamic(() => import('../../components/blocks/{componentName}/{componentName}').then((mod) => mod.{componentName}));

export interface {blockNamePascal}StaticProps {
    // TODO: Define static props type
}

export interface {blockNamePascal}Content extends Omit<{blockNamePascal}_content$data, ' $fragmentType'> {
    __typename: '{typeName}';
}

export interface {blockNamePascal}Props extends {blockNamePascal}StaticProps {
    blocksData: Omit<{blockNamePascal}Content, ' $fragmentType'>;
    app: IApp;
    className?: string;
}

graphql`
    fragment {blockNamePascal}_content on {typeName} {
        id
    }
`;

const {blockNamePascal} = (props: {blockNamePascal}Props): ReactElement => <{componentName} {...props} />;

if (typeof window === 'undefined') {
    {blockNamePascal}.getStaticProps = async ({
        locale,
        providers,
        context: { params, preview: previewValue },
        block,
    }: StaticBlockContext): Promise<{blockNamePascal}StaticProps> => {
        const preview = previewValue || false;
        // TODO: Implement data fetching
        return {};
    };
}

export default {blockNamePascal};
```

---

## UI Component Template

**File:** `frontend/src/app/components/blocks/{componentName}/{componentName}.tsx`

```typescript
import React, { ReactElement } from 'react';
import styles from './{componentName}.module.scss';
import { {blockNamePascal}Props } from '../../../blocks/{blockNamePascal}/{blockNamePascal}';
import { FadeIn } from '../../base/FadeIn/FadeIn';

const {componentName} = ({ blocksData, app }: {blockNamePascal}Props): ReactElement => {
    return (
        <FadeIn className={styles.wrapper}>
            <div />
        </FadeIn>
    );
};

export { {componentName} };
```

---

## SCSS Template

**File:** `frontend/src/app/components/blocks/{componentName}/{componentName}.module.scss`

```scss
.wrapper {
    //
}
```

---

## CMS Schema Template

**File:** `cms/src/components/block/{blockNameKebab}.json`

```json
{
  "collectionName": "components_block_{blockNameUnderscore}s",
  "info": {
    "displayName": "{displayName}",
    "icon": "{icon}"
  },
  "options": {},
  "attributes": {}
}
```

---

## Variable Reference

| Variable | Example | Description |
|----------|---------|-------------|
| `{blockNameKebab}` | `hero-banner-block` | CMS schema name (kebab-case) |
| `{blockNameUnderscore}` | `hero_banner_block` | Same as blockNameKebab but with `_` instead of `-` (for collectionName) |
| `{blockNamePascal}` | `HeroBannerBlock` | Block folder and file name |
| `{componentName}` | `HeroBanner` | UI component name (without "Block") |
| `{typeName}` | `ComponentBlockHeroBannerBlock` | GraphQL typename |
| `{displayName}` | `Hlavní banner` | Czech name shown in CMS |
| `{icon}` | `crown` | Strapi icon name |
