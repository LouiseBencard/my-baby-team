# Melo — launch-readiness (opdateret 21. juli 2026)

Status efter denne sessions arbejde. Erstatter den løse tjekliste i
SESSION-HANDOFF §4 for det praktiske launch-overblik.

Tre kolonner: **Gjort** ✅ · **Kræver Louise** 🧍 · **Kan Claude gøre** 🤖

---

## 1. Kode & produkt

| Punkt | Status | Ejer |
|---|---|---|
| Onboarding gemmer kladde løbende | ✅ | — |
| Lokale notifikationer (uge, D-vitamin, vaccination, appreciation, søvn) | ✅ | — |
| Notifikations- og privatlivs-toggles i Indstillinger | ✅ | — |
| First-party analytics på hele engagement-tragten | ✅ | — |
| Lovable-rester fjernet, søvn-animation ryddet op | ✅ | — |
| i18n på dashboards + Sammen-side | ✅ | — |
| Privatlivspolitik opdateret med analytics-oplysning | ✅ (skal pushes) | — |
| Test på rigtig iOS-enhed via TestFlight | 🔲 | 🧍 |
| Engelsk oversættelse af store indholds-arrays (uge-data, far-tips) | Backlog v1.1 | 🤖 (efter jordemoder-sign-off) |

## 2. Backend & compliance

| Punkt | Status | Ejer |
|---|---|---|
| `20260720_analytics_events.sql` kørt i Supabase | 🔲 | 🧍 |
| `20260530_rls_hardening.sql` kørt i Supabase (GDPR-hul) | 🔲 | 🧍 |
| Jordemoder/sundhedsplejerske signer indholdet | 🔲 **(kritisk sti)** | 🧍 |
| CVR-nummer i PrivacyPage + App Store | 🔲 | 🧍 |
| Jurist-review af privatlivspolitik (behandler helbredsdata, art. 9) | 🔲 | 🧍 |
| Privatlivspolitik live på meloparents.com/privacy (fungerende URL) | 🔲 | 🧍 (Claude kan levere HTML) |
| Support-side på meloparents.com/support | 🔲 | 🧍 (Claude kan levere HTML) |

## 3. App Store Connect

| Punkt | Status | Ejer |
|---|---|---|
| App Store-tekster (navn, beskrivelse, keywords) | ✅ færdigskrevet i `appstore/appstore-texts.md` | — |
| Privatlivs-afsnit skærpet med differentiering | ✅ | — |
| Screenshots (3-5, to-forældre-historien først) | 🔲 | 🧍 (Claude kan lave mockup-specs) |
| App Privacy "nutrition label"-svar | delvist i `app-store-launch.md` | 🧍 (skal opdateres med analytics — se note) |
| Opret app i App Store Connect + upload via Xcode | 🔲 | 🧍 |

---

## Vigtige noter

**App Privacy-label skal opdateres.** Nu hvor appen indsamler anonym
brugsstatistik (analytics_events), skal Apples App Privacy-svar afspejle det:
kategori "Usage Data" → "Analytics", **ikke** knyttet til identitet, **ikke**
brugt til sporing på tværs af apps. Det matcher privatlivspolitikkens nye
afsnit. Vigtigt at få rigtigt — forkerte svar er en hyppig afvisningsgrund.

**ASO-beslutning (undertitel).** Nuværende undertitel er "Søvn, amning og
babytracker" (de tre mest søgte feature-termer). GTM-planen foreslår i stedet
at eje partner-vinklen ingen konkurrent har: fx "Uge for uge · også til far".
Det er et reelt valg mellem søgevolumen og differentiering — din beslutning.
Man kan A/B-teste det efter launch.

**Rækkefølge på Supabase-migrationer:** push koden FØRST (er gjort i dag), kør
derefter SQL'en. `analytics_events` kan køres når som helst; `rls_hardening`
bør køres snart (den lukker et GDPR-hul i invite-flowet).

---

## Korteste vej til submission (kritisk sti)

1. **Jordemoder-sign-off** — blokerer både launch og marketing-fortællingen. Start i dag.
2. **Kør de to SQL-migrationer** i Supabase.
3. **Privatlivspolitik + support live** på meloparents.com (Claude kan levere HTML).
4. **CVR** ind i PrivacyPage + App Store Connect.
5. **Screenshots** fra simulator (Claude kan lave specs/mockups).
6. **TestFlight-test** på din iPhone.
7. **Upload + submit** via Xcode/App Store Connect.

Punkt 3 og 5 kan Claude klargøre nu, hvis du vil.
