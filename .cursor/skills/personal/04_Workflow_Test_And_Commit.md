# 04 Workflow: Test & Commit

**Description:** Mandated post-coding checklist for AI agents to ensure code correctness before finalizing a task.

## 1. Safety and Compilation Checks
Before telling the user "I'm done" or asking for a code review on a new feature, you MUST simulate or perform these checks:

1. **Relay Compilation:** Have you added or changed GraphQL fragments? If so, did you run `npm run relay` so TypeScript doesn't fail?
2. **Linting and Types:** The company uses strict TypeScript and `eslint`. Do not leave `any` types unless absolutely necessary. Run `npm run lint` if possible.
3. **Build Check:** For major changes, suggest to the user to try `npm run build` to ensure the Next.js production build passes without static generation errors.

## 2. Testing Component Logic
- **React Hook Form:** If you built a form, did you use `getSystemResource('key', app?.systemResources)` for validation error labels? Never hardcode "This field is required".
- **Responsive UI:** Did you style for `mobile-landscape`, `tablet`, and `desktop` breakpoints using row-based `@apply` classes in SCSS, without using arbitrary pixels?

## 3. Strapi Schema Sync
- If your frontend task requires new CMS fields, list the exact fields the user needs to create in the Strapi admin panel OR provide the updated `schema.json` if configuring components via code.

## 4. Commit Messages
- If the user asks you to commit, use conventional commit format:
  `feat(domain): description`
  `fix(domain): description`
- Example: `feat(blocks): add author complementary component and update relay fragment`
- Example: `fix(style): use rem units for hero banner margins in tailwind config`
