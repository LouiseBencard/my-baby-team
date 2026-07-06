# Melo — session-handoff

**Til den næste chat (Sonnet):** Læs denne fil først. Den fortæller dig hvad
der er sket i tidligere sessions, hvor alt ligger, og hvad der mangler.
Når du har læst den, skal du være lige så orienteret som den foregående chat.

Senest opdateret: 31. maj 2026.

---

## 1. Hvad er Melo

iOS-app (Capacitor) til gravide og nye forældre. Bygget med React + TypeScript
+ Vite, styling med Tailwind + CSS custom properties, Supabase som backend
(EU-region), i18n på dansk og engelsk. Domæne: `meloparents.com`.

**Brand i én sætning:** *"The calm hand that walks alongside every new
family — for two parents."*

To-parent-design er kerne-positioneringen. Mor får én farvepalet (clay), far
en anden (sage). Ikke reklamefinansieret, ingen mørke mønstre.

---

## 2. Kode-stack og workflow

Læs også `CLAUDE.md` i roden — den indeholder build-flowet og tekniske krav.
Kort version:

- **Kør lokalt:** `npm run dev` → `localhost:5173`. Hot reload.
- **Build til iOS:** `npm run build && npx cap sync ios` → commit
  inklusive `ios/App/App/public/` → push trigger Xcode Cloud.
- **i18n:** alle UI-strenge i `src/i18n/locales/da.json` + `en.json` — begge
  filer skal opdateres samtidig.
- **Designsystem:** moss (`#264236`) er brand-primær. Se
  `docs/visual-identity.md` for fuld palette.

---

## 3. Hvad er der lavet i de foregående sessions

### Kode-fixes (alle committed klar, kører i appen)

| Fix | Filer | Beskrivelse |
|---|---|---|
| **A** | `src/pages/OnboardingPage.tsx` | Onboarding-kladde gemmes løbende i localStorage så intet går tabt ved app-lukning |
| **B** | `src/context/AuthContext.tsx`, `src/pages/AuthPage.tsx`, ny `ResetPasswordPage.tsx`, `src/App.tsx`, `da.json`, `en.json` | Glemt-adgangskode-flow via Supabase |
| **C** | `src/App.tsx`, `src/pages/OnboardingPage.tsx` | Ren login-adgang fra onboarding (`/login`-route, ingen hard reload) |
| **Fase-overgang** | `src/context/FamilyContext.tsx` | `effectivePhase` udregnes fra dato (eneste sandhed) i stedet for `profile.phase` |
| **Vaccinationer + D-vitamin** | `src/lib/phaseData.ts`, `src/pages/TjeklistePage.tsx` | Rettet til danske anbefalinger (3/5/12 mdr, D-vitamin fra 2-ugers alderen) |
| **GDPR RLS** | `supabase/migrations/20260530_rls_hardening.sql`, `src/context/FamilyContext.tsx` | Lukker GDPR-hul i invite-code-politik via `lookup_invite` RPC. SQL skal stadig køres i Supabase Dashboard! |
| **Far-baby-dashboard** | `src/lib/farBabyContent.ts`, ny `src/pages/DashboardBabyFar.tsx`, `src/pages/Dashboard.tsx` | Ny dedikeret far-oplevelse efter fødslen med kettlebell-vægt, støt-mor-tips, vagter (fodermetode-bevidst), aktiviteter, missioner. Med EN-mirror i samme fil. |
| **Designpolering** | `src/components/SplashScreen.tsx`, `index.html` | Splash brand-tokeniseret. `lang="da"`, `theme-color`, Lovable-OG-rester fjernet. |
| **Engelsk indhold** | ny `src/lib/pregnancyContent.en.ts` | Fuld engelsk version af uge 5-40 + trimester-indhold. `getWeekContent(week, "en")` |

### Dokumenter (alle i `docs/`)

- **`feature-audit.md`** — strukturel kortlægning af appen, far-side-fundet
- **`faglig-gennemgang.md`** — AI-gennemgang af sundhedsindhold, verificeret mod SST/SSI/Sundhed.dk
- **`uge-indhold-faglig-godkendelse.md`** — sign-off-dokument klar til en rigtig jordemoder (eksternt)
- **`gdpr-rls-audit.md`** — Supabase RLS-audit med to fundne fejl
- **`betalingsmodel-brainstorm.md`** — freemium + familie-abonnement-anbefaling
- **`app-store-launch.md`** — App Privacy-svar, screenshot-specs, tjekliste
- **`business-plan-en.md`** — 12-sektions investor-grade plan (har `[PLACEHOLDER]`s)
- **`marbella-pitch-package.md`** — opsummering af pitch-materialer
- **`visual-identity.md`** — komplet identitetspakke: logo, farver (mor/far-split), typografi, motiver, voice
- **`far-baby-implementering.md`** — hvad der blev bygget til far-dashboardet
- **`design-polering.md`** — designaudit og polish-backlog

### Brand-assets (i `brand/`)

Logo-mærker i fem farvevarianter (figures, moss, cream, clay, sage) plus den
fulde app-ikon. Bruges direkte i UI, web, deck, marketing.

### Pitch-materialer (i `pitch/`)

- **`Melo-pitch-deck.pptx`** — 14 slides, branded, klar til Marbella
- `build_deck.py`, `extract_mark.py` — scripts hvis decket skal regenereres

### Skills bygget i tidligere sessions

Pakket som `.skill`-filer og præsenteret i chat. Skal være installeret i
Cowork — tjek i Cowork's skills-menu eller via `/list-skills`-prompt:

- **`/melo-design`** — design- og UX-gennemgang mod jeres designsystem
- **`/melo-feature`** — feature-spec i Melos mønstre
- **`/melo-indhold`** — app-indhold med faglig tyngde og indbygget sikkerhed
- **`/melo-tekster`** — i18n-skill der holder da.json og en.json synkroniseret

Hvis de ikke er installerede, så sig til den nye chat: *"Find Melo-skills i
forrige chat — de skal installeres."*

---

## 4. Hvad er åbent / launch-blockers

### Kræver et menneske (Louise)

- [ ] **Jordemoder/sundhedsplejerske skal signe `uge-indhold-faglig-godkendelse.md`** — den vigtigste eksterne afhængighed
- [ ] **Apply RLS-migrationen** i Supabase Dashboard → SQL Editor. *Vigtigt:* push koden først, så SQL'en, ellers breaker "tilslut jer"-flowet i nogle minutter.
- [ ] **Test på rigtig iOS-enhed** før App Store-submission
- [ ] **Privatlivspolitik på meloparents.com/privacy** — skal være en *fungerende* URL (Apple klikker på den)
- [ ] **Tag rigtige screenshots** fra iOS-simulator (se `docs/app-store-launch.md` for specs)
- [ ] **Udfyld placeholders** i pitch deck (€[AMOUNT] på slide 13, team-bio på slide 12) og business plan
- [ ] **CVR-nummer** i `src/pages/PrivacyPage.tsx`
- [ ] **Jurist-review** af privatlivspolitik

### Kan stadig kodes (acceptable v1 backlog)

- Migrér de duplikerede uge-data fra `DashboardPregnantFar`, `DashboardPregnant`, `BarnPage`, `WeekUnlockModal` til `pregnancyContent.ts`. Vent til jordemoderen har signed off — så undgår vi at lave det to gange.
- Engelsk i18n for legacy inline content i samme komponenter
- Bidirektional partner-link (når en bruger joiner via invite, opdateres begge profiler)
- Dark mode-toggle i indstillinger
- Slet `src/pages/Index.tsx` (Lovable-scaffold-rest)

---

## 5. Sådan kommer den nye chat hurtigt op i fart

**Kort version til Louise** (kopier denne tekst til den nye chat):

> Læs `docs/SESSION-HANDOFF.md` først — det indeholder hele konteksten fra
> tidligere sessions. Derefter er vi klar til at fortsætte. Jeg har
> `meloparents.com` som domæne, `npm run dev` kører sideløbende i min
> browser, og jeg skifter til Sonnet 4.6 til kodearbejdet.

**Kort version til den nye chat:**

Læs disse filer i rækkefølge:
1. `docs/SESSION-HANDOFF.md` (denne fil) — overblikket
2. `CLAUDE.md` i roden — build-workflow og tekniske krav
3. `docs/visual-identity.md` — brand
4. `docs/feature-audit.md` — appens struktur
5. Den specifikke `docs/`-fil til det område Louise vil arbejde på

Derefter er du opdateret. Brug `/melo-design`, `/melo-feature`,
`/melo-indhold`, `/melo-tekster`-skillene aktivt — de er præcis-byggede til
det her projekt.

---

## 6. Hvad chatten *ikke* tager med sig automatisk

For ærlighedens skyld:

- Selve samtale-historikken (alle de små beslutninger og rationaler) — er
  IKKE tilgængelig for den nye chat. Kun filerne er.
- Den nye chat kan ikke "se" denne chat. Den læser filer, men har ingen
  hukommelse af de spørgsmål du har stillet undervejs.
- Hvis der er små nuancer fra denne chat du ikke vil miste — fx en
  bestemt formulering du kunne lide, eller en idé der ikke blev kodet — så
  skriv dem ind i denne fil under et `## Noter`-afsnit, før du lukker.

Den vigtigste regel: **alt der lever som en fil, lever videre. Alt der
kun lever i samtalen, går tabt.**
