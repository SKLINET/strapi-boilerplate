# Audit Reports

Tato složka obsahuje audit reporty pro jednotlivé komponenty a celkový projekt.

## Struktura

- `[ComponentName].md` - Audit report pro konkrétní komponentu (např. `Error.md`, `Button.md`)
- `project-overview.md` - Celkový audit projektu
- `README.md` - Tento soubor

## Konvence pojmenování

- Pro komponenty: `[ComponentName].md` (např. `Error.md`)
- Pro celkový audit: `project-overview.md`
- Názvy jsou v PascalCase podle názvu komponenty

## Kdy vytvářet audit report

Audit report by měl být vytvořen:

- Při auditu nové komponenty
- Při revizi existující komponenty
- Při celkovém auditu projektu
- Při řešení problémů nebo refaktoringu

## Template

Použijte template z `.cursor/rules/audit.mdc` pro vytvoření nového audit reportu.
