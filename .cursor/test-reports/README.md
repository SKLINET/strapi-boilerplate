# Test Reports

Tato složka obsahuje automaticky generované reporty z testování agentů.

## Struktura

```
test-reports/
├── README.md                           # Tento soubor
├── block-creator-2024-01-30.md         # Report pro Block Creator Agent
├── audit-agent-2024-01-30.md           # Report pro Audit Agent
└── full-test-2024-01-30.md             # Kompletní test všech agentů
```

## Formát názvů souborů

`{agent-name}-{YYYY-MM-DD}.md`

## Jak spustit testy

```
# Test konkrétního agenta
"otestuj create block"
"otestuj audit agent"

# Rychlý test (smoke test)
"rychlý test create block"

# Kompletní test všech agentů
"otestuj všechny agenty"

# Test s vlastními vstupy
"testuj create block s: kniha, books, HeroBanner"
```

## Výsledky testů

| Ikona | Význam |
|-------|--------|
| ✅ | Test prošel |
| ❌ | Test selhal |
| ⚠️ | Test prošel s varováním |
| ⏭️ | Test přeskočen |

## Metriky

- **Pass Rate**: Procento úspěšných testů
- **Coverage**: Pokrytí pravidel testy
- **Severity**: Závažnost nalezených problémů
