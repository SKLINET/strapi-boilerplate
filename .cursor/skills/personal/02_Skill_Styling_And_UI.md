# 02 Skill: Styling & UI Component Creation

**Description:** Rules for an AI agent on how to write Next.js React components and apply Tailwind/SCSS styling.

## 1. UI Architecture (Atomic Design)
When instructed to create a component, you MUST place it in the correct category under `src/app/components/`:
- `primitives/`: Basic atoms (Buttons, Text, Inputs).
- `molecules/`: Simple combinations without complex logic.
- `organisms/`: Complex combinations (Forms, Navigation).
- `blocks/`: High-level sections mapped to the CMS (Hero, PageContent).

**Rule:** Default to Server Components for UI. Only add `'use client'` if `onClick`, hooks (`useState`), or `clsx` dynamic bindings require it.

## 2. Strict Styling Rules (Tailwind + SCSS)

### 2.1 NEVER use arbitrary Pixel values (`px`)
- **PROHIBITED:** `h-[32px]`, `w-[50px]`, `text-[16px]`.
- **PROHIBITED:** `p-[2rem]`, `m-[1.5rem]`.
- **MANDATORY:** You must use Tailwind spacing classes (`p-4`, `m-6`, `h-13`) or defined font sizes (`text-16`). All spatial measurements in the company are based in `rem`.

### 2.2 Updating the Token System
- If a specific `rem` value is required by the design but missing from Tailwind, **do not use arbitrary values `[]`**.
- Instead, open `tailwind.config.ts` and add the new `rem` spacing/sizing value to the correct `extend` block, then use the new class.

### 2.3 Row-Based Responsive Breakpoints
- Do not use inline ternary logic like `isMobile ? 'text-12' : 'text-16'`.
- Use the predefined Tailwind breakpoints: `mobile-landscape:`, `tablet:`, `tablet-landscape:`, `desktop:`, `large-desktop:`, `fullhd:`.
- **CRITICAL RULE:** Do NOT use SCSS mixin media queries (e.g. `@include from-tablet-landscape { ... }`). You must write them inline using the Tailwind prefix.

```scss
// CORRECT
.title {
    @apply max-w-full tablet-landscape:max-w-77.5;
}

// INCORRECT (Never do this)
.title {
    @apply max-w-full;
    @include from-tablet-landscape {
        @apply max-w-77.5;
    }
}
```

### 2.4 SCSS Modules
- If a component has complex hover states or heavily nested modifiers, create a `Component.module.scss`.
- **MANDATORY:** You must use `@apply` within the SCSS file rather than writing raw CSS properties. 

```scss
// CORRECT
.wrapper {
    @apply flex items-center justify-between p-4 bg-white;
    
    @apply tablet:p-6;
    @apply desktop:p-8;
}

// INCORRECT
.wrapper {
    display: flex;
    padding: 2rem;
}
```

## 3. Class Concatenation
- Always use the `clsx` package to join classes conditionally.
- If you need a utility class conditionally, **use `clsx`**.
```tsx
import { clsx } from 'clsx';
// Good
<div className={clsx(styles.wrapper, isActive && styles.active)}>
```

## 4. Tailwind Theme Configuration (`tailwind.config.ts` & JS configs)
When adding Custom Box Shadows or Colors to Tailwind theme configurations:
- **Rule:** Never use trailing CSS semicolons inside JavaScript/TypeScript strings.
- This causes build failures.
  - **Bad:** `'course-card': '0px 0px 32px 0px #E2EEFA;'`
  - **Good:** `'course-card': '0px 0px 32px 0px #E2EEFA'`

## 5. Next.js Image & Cloudinary Placeholders
When integrating images loaded from Strapi via Cloudinary:
- **Rule:** If generating a base64 blur placeholder (`useBlurDataUrl`), be careful with PNG and WebP files bearing transparency.
- Do **not** use `fl_lossy` transformations for general avatars/logos without checking, as it often strips transparency and replaces it with a black background. Use `fl_preserve_transparency` when applicable to maintain alpha channels.
