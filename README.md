# Kiesboek frontend

React- en TypeScript-frontend gebouwd met Vite.

## Lokaal ontwikkelen

```sh
npm ci
npm run dev
```

De frontend verwacht voor normale handmatige ontwikkeling een backend op `http://localhost:3000`.

## Kwaliteitscontroles

| Controle | Commando | Doel |
| --- | --- | --- |
| Lint | `npm run lint` | Oxlint controleert de broncode met regels voor correctness, verdachte patronen en performance. De configuratie staat in `.oxlintrc.json`. |
| Unit-tests | `npm run test:run` | Bestaande servicetests controleren API-aanroepen, responses en foutafhandeling. Er zijn voor deze kwaliteitsinrichting geen nieuwe unit-tests toegevoegd. |
| End-to-endtests | `npm run test:e2e` | Playwright controleert de studentreis van inloggen tot zoeken en toevoegen aan de leeslijst, plus de redirect voor niet-ingelogde bezoekers. API-verzoeken worden gemockt voor snelle, herhaalbare tests zonder backend of testaccounts. |
| Productiebuild | `npm run build` | TypeScript-controle en Vite-productiebundel signaleren integratie- en compileerfouten. |

Deze verdeling richt de meeste testinspanning op de flows met direct gebruikersbelang: authenticatie, toegang tot afgeschermde pagina's en het vinden en bewaren van boeken. Unit-tests blijven geschikt voor kleine serviceregels en API-contracten. Alle broncode wordt gelint, omdat consistente statische controle breed helpt en weinig onderhoud vraagt.

Playwright-configuratie staat in `playwright.config.ts`; tests staan in `e2e/`. De unit-testconfiguratie staat in `vite.config.ts`.

## Continuous integration

GitHub Actions voert linting, de bestaande unit-tests, de productiebuild en de browsertests uit bij iedere push en pull request. De workflow staat in `.github/workflows/ci.yml` en installeert Chromium op de runner. De browsertests gebruiken gemockte backendantwoorden en hebben geen secrets of externe testomgeving nodig.
