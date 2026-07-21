# Melo — go-to-market- og marketingplan (Danmark)

*Juli 2026. Bygger på markedsanalyse-2026.md og betalingsmodel-brainstorm.md.
Beslutninger truffet: freemium + familieabonnement, Danmark først.*

---

## 1. Strategien i tre linjer

1. **Lancér gratis, konvertér senere.** Fuld app gratis i 3-4 måneder →
   brugerbase, reviews og data om hvor værdien opleves → derefter paywall.
2. **Partner-invitationen er vækstmotoren.** Hver aktiveret gravid
   rekrutterer selv bruger nr. 2. Optimer det flow hårdere end noget
   akkvisitionsbudget.
3. **Troværdighed før rækkevidde.** Jordemoder-sign-off, privatlivsløfte og
   dansk faglighed er budskabet — ikke "endnu en graviditetsapp".

---

## 2. Launch-tidslinje

### Fase 0 — Klargøring (nu → ca. 4 uger)

Launch-blockers (fra SESSION-HANDOFF §4): jordemoder-sign-off,
RLS-migration i Supabase, privatlivspolitik live på meloparents.com/privacy,
iOS-enhedstest, screenshots, CVR i PrivacyPage, jurist-review.
Parallelt: produkt-polish-backloggen (onboarding, notifikationer,
animationer) og ASO-pakken (§5).

### Fase 1 — Soft launch (måned 1-2)

- App Store DK, **helt gratis**, ingen paywall.
- 30-50 beta-familier rekrutteret via netværk, mødregrupper på Facebook og
  TestFlight → reviews fra dag 1.
- Mål: **500 downloads, 40 % partner-invite-rate, 25 % uge-4-retention.**
  Disse tre tal afgør alt efterfølgende. Kræver at analytics er på plads
  FØR launch (event-tracking på invite-flow, feature-brug, churn-punkter).

### Fase 2 — Offentlig launch (måned 3-4)

- PR-fremstød (§6), content-motor kører, jordemoder-endossering aktiv i
  App Store-tekster ("Indhold gennemgået af dansk jordemoder").
- Paywall introduceres **kun for nye brugere** — eksisterende brugere
  beholder alt frit i 12 mdr som "founding families" (goodwill + reviews,
  og off-brand at tage noget fra folk).
- Mål: 5.000 downloads akkumuleret, 4-6 % premium-konvertering på nye.

### Fase 3 — Skalering (måned 5-12)

- B2B-piloter: én kommune (sundhedspleje-supplement) + én pensions-/
  forsikringsspiller (PFA/Pensiondanmark familie-pakke). Lang salgscyklus —
  start samtalerne i fase 1.
- Affiliate på ønskelisten (Babysam m.fl.) som bonus-stream.
- Engelsk version + evt. NO/SE når DK-motoren kører.
- Mål år 1: **10.000 downloads, 600+ betalende familier, én B2B-aftale
  underskrevet.**

---

## 3. Prissætning (besluttet model: freemium + familieabo)

| Tier | Pris | Indhold |
|---|---|---|
| **Melo Gratis** | 0 kr | Uge-for-uge (kerne), dagbog, søvn-/amme-tracker, partner-sync, tjeklister, MELO-chat med dagsgrænse |
| **Melo Familie** | **39 kr/mdr eller 299 kr/år** — én pris, begge forældre | Fuldt uge-indhold + deep-dives, ubegrænset chat, fødselsplan-eksport (PDF), udvidede far-missioner, vagtplan/task-avanceret, dagbogs-eksport (fotobog-klar), kommende kurser inkluderet første år |
| **Graviditetsbundle** | 499 kr engangs (24 mdr) | Alt i Familie — til dem der hader abonnementer |

Principper: årsprisen er ankeret (25 kr/mdr — "en kop kaffe i kvartalet").
Paywall-grænsen lægges så gratis-versionen føles gavmild — det er
partner-sync og kerne-tryghed der driver viralitet, så de skal ALDRIG bag
paywall. Ingen dark patterns: tydelig pris, ét tryk at opsige, ingen
skjulte trials. Det er både brand og marketing ("abonnementet din
svigermor kan forstå").

Teknisk: StoreKit 2 via RevenueCat (Capacitor-plugin findes) — hurtigste
vej til familiedelt entitlement på tværs af to konti.

---

## 4. Retention-design (uden dark patterns)

Retention er vigtigere end akkvisition i denne kategori — appen har en
naturlig livscyklus på ~2,5 år (gravid → 2-års fødselsdag), og målet er at
fylde den, ikke forlænge den kunstigt.

- **Ugentligt ritual:** ny uge = nyt indhold søndag aften ("uge 24 er klar
  til jer begge"). Kategoriens stærkeste naturlige hook — brug den.
- **Partner-loopet:** far får sin egen notifikation med SIT indhold. To
  brugere med hver sin grund til at åbne appen = dobbelt retention-overflade.
- **Faseovergange som re-aktivering:** termin nærmer sig → fødselsplan og
  ve-tæller frem. Fødsel → hele appen skifter til nyfødt-mode. De øjeblikke
  hvor andre apps mister brugeren, er Melos stærkeste kort.
- **Milepæle, ikke streaks:** fejr barnets/parrets fremskridt ("I har delt
  12 uger sammen i Melo"), aldrig skyld ("du har ikke logget i 3 dage" er
  forbudt).
- **Appreciation-featuren** (findes allerede) er retention-guld for
  SammenPage — påskøn hinanden ugentligt, lav digest-notifikation.

Notifikations-principper (til produkt-sporet): max 3-4/uge pr. bruger som
standard, alle med reel nytteværdi, granulær opt-out. Kategorier:
uge-indhold · partner-aktivitet ("Louise skrev i dagbogen") · fase-kritiske
(D-vitamin-start, vaccinationsdatoer) · appreciation-digest.

---

## 5. ASO (App Store-optimering)

- **Titel:** "Melo — Gravid & Baby for jer begge" (nøgleord: gravid, baby,
  partner-vinklen i selve titlen).
- **Subtitle:** "Uge for uge · også til far" — ingen konkurrent ejer
  "til far/partner" på dansk. Det keyword-felt er tomt.
- **Nøgleord:** gravid, graviditet, uge for uge, termin, baby, nyfødt, far,
  partner, fødsel, veer, amning, søvn, forældre.
- **Screenshots** (specs i app-store-launch.md): fortæl to-forældre-historien
  i de første 3 billeder — 1: mor-dashboard, 2: far-dashboard ("Din app.
  Hans app. Jeres barn."), 3: privatlivsløftet, 4-6: features.
- **Reviews:** in-app prompt KUN efter positive øjeblikke (afsluttet uge,
  gennemført milepæl) — aldrig efter en fejl, aldrig i nyfødt-kaosset
  (uge 0-6 efter fødsel = fredet zone).

---

## 6. Kanalstrategi (prioriteret, lavt budget)

1. **Partner-invite (ejet, gratis):** optimer flowet til under 60 sekunder
   fra invitation til fars første "wow". Målet er invite-rate > 50 %.
2. **Instagram + TikTok (organisk):** to spor — (a) varmt, genkendeligt
   par-indhold ("ting din partner ikke forstår om uge 28"), (b)
   privatlivs-vinklen ("hvorfor din graviditetsapp kender din termin før
   din mor gør"). Far-indholdet er del-bart: mødre tagger fædre = gratis
   distribution ind i det sekundære segment.
3. **Facebook-mødregrupper + Min Mave-forum:** vær til stede som afsender,
   ikke som spam — svar fagligt, nævn appen når relevant. Terminsgruppe-
   kulturen ("Juli 2026-mødre") er DK's stærkeste organiske kanal.
4. **PR ved offentlig launch:** vinkel til forældre-/livsstilsmedier
   (Vores Børn, ALT.dk, politiken familieliv): *"Dansk app gør op med at
   graviditetsapps sælger dine data — og glemmer far."* To historier i én.
   Jordemoder-endosseringen gør historien troværdig.
5. **Jordemoder-/sundhedsplejerske-kanalen:** når sign-off er i hus —
   fysiske kort/QR i konsultationer, oplæg i Jordemoderforeningens netværk.
   Langsomt men den mest tillidsfulde kanal overhovedet.
6. **Betalt (først fase 3):** små Meta-kampagner mod nygravide (interesse-
   targeting, IKKE data-køb — det ville modsige hele brandet). Test med
   5-10.000 kr, skaler kun ved CAC < 25 kr/install.

---

## 7. KPI-dashboard (følges ugentligt fra soft launch)

| KPI | Fase 1-mål | Fase 3-mål |
|---|---|---|
| Downloads (akk.) | 500 | 10.000 |
| Partner-invite-rate | 40 % | 55 % |
| Uge 4-retention | 25 % | 35 % |
| Premium-konvertering (nye) | — | 5-6 % |
| App Store-rating | 4,5+ | 4,6+ |
| CAC (betalt) | — | < 25 kr |
| B2B-pipeline | 3 samtaler | 1 aftale |

---

## 8. Næste skridt (ejerskab)

**Louise:** jordemoder-sign-off (kritisk sti for både launch OG marketing) ·
RLS-SQL i Supabase Dashboard · privacy-URL live · CVR · iOS-enhedstest ·
beslutning om beta-rekruttering i eget netværk.

**Claude (kommende sessioner):** produkt-polish-backlog · analytics/event-
tracking implementeres FØR soft launch · paywall/RevenueCat-integration
(fase 2-klar men bygget tidligt) · ASO-tekster og screenshot-mockups ·
content-kalender for Instagram (første 4 uger) · PR-pressemeddelelse ·
opdatering af pitch deck med disse analyser.
