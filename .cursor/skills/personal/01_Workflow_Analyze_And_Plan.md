# 01 Workflow: Analyze & Plan

**Description:** Pre-flight checklist for all AI tasks. Defines how you must analyze the environment before writing code.

## 1. Context Discovery (MANDATORY)
Before starting any coding task, you MUST read the following to understand the current project:
1. `package.json`: Check versions of Next.js (is it 15 or 16?), React, Tailwind, Relay, and Strapi.
2. `tailwind.config.ts`: Review the established design tokens (colors, breakpoints, spacing).
3. `AGENTS.md` / `.cursor/rules`: If these files exist, they represent the absolute source of truth. Read them.

## 2. Version Adherence vs. Modernization
**Rule of Thumb:** Match the environment, but offer modernization if appropriate.
- If the project is in Next.js 15, DO NOT forcefully write Next.js 16/17 specific features (e.g., new Server Components paradigms that break compatibility) without asking.
- **Always ask:** *"Projekt běží na verzi X. Budeme dodržovat stávající styl, nebo to postupně přepisujeme na nový standard (např. Next 16)?"*
- Never assume the user wants you to upgrade their dependencies automatically.

## 3. Planning & Architecture
- When asked to create a new component, check existing folders in `src/app/components/` (primitives, molecules, organisms, blocks).
- Look for duplicate or similar components before creating a new one from scratch. If a `Button` exists, use it. Do not rebuild it.
- Outline your plan and ask the user for confirmation. If it involves the backend (Strapi), ensure the schema changes are communicated.

## 4. MCP (Model Context Protocol) Proactivity
As an AI Agent, you MUST proactively leverage external MCP servers. Rather than guessing context or assuming the user will spoon-feed you, ask if they have a relevant MCP connected based on the technologies you discover:
- **ASK FIRST (Contextual):** Based on the task and stack, explicitly ask the user if they have the corresponding MCP connected.
- **UI/Design Tasks:** If asked to build a new component, ask: *"Máš připojený Figma MCP? Můžeš mi dát Node ID pro extrakci přesných barev a fontů?"*
- **CMS/Backend (e.g., Strapi):** If you see Strapi in the `package.json` or you need backend data, ask: *"Máš připojený Strapi MCP nebo Database MCP? Můžu si přes něj načíst aktuální schéma Content Types?"*
- **General Databases / APIs:** If the project uses Postgres, Redis, etc., ask if an MCP is available to query the live schema before you start writing raw SQL or types blindly.

*Rule: Let the context drive your MCP requests. If you see a technology in the stack that could benefit from an MCP, PROACTIVELY ask the user if it's connected.*
