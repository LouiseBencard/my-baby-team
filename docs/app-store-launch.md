# Melo — App Store launch-tjekliste

Alt det praktiske rundt om selve uploaden, samlet ét sted. Tre dele:

1. Review af de eksisterende butikstekster (med 4 konkrete polish-forslag).
2. Apple **App Privacy** ("nutrition label") — eksakt hvad du skal svare i App
   Store Connect baseret på de faktiske data-flows i Melo.
3. Screenshots — formater, indhold pr. billede, og hvordan du tager dem.
4. Submission-tjekliste.

---

## 1. Review af `appstore/appstore-texts.md`

Udkastet er solidt. Fire ting jeg vil polere før upload:

**A. Kategori-valg er risikabelt.** Apple er strammet til omkring "Medical"-
kategorien — apps der ikke har en medicinsk udstyrs-godkendelse eller en
verificeret klinisk leverandør bliver oftest afvist eller flyttet. Sikre valg
for Melo er **Health & Fitness** (primær) + **Lifestyle** (sekundær). Hvis
Medical alligevel skal forsøges, så vær klar med en faglig sign-off og en
forklarende note ved review.

**B. Det engelske navn `"Melo: Baby & Family Tracker"` lyder generisk** og
spejler ikke det varme brand. Overvej `"Melo — for new parents"` (22 tegn) for
den engelske lokalisering. Det danske kan godt være SEO-tungere, det engelske
har plads til at være mere brand-bærende.

**C. Privacy Policy URL og Support URL** står som `https://meloparents.com/...`.
De skal være rigtige, fungerende URL'er ved review — Apple klikker faktisk på
dem. Sørg for at `meloparents.com/privacy` virker og viser samme indhold som
`/privacy`-ruten i appen.

**D. Beskrivelsen sælger "MELO Chat" med tre modes** (normal / "er det
normalt?" / ventil). Tjek at de tre modes faktisk er klar i v1 — Apple
afviser apps, hvor butikstekster lover noget, der ikke kan findes ved review.

---

## 2. App Privacy — eksakte svar til App Store Connect

App Store Connect spørger til **hver datatype**: bliver den samlet? bruges
den til tracking? linkes den til brugeren? og hvad bruges den til?

Baseret på Melos faktiske data-flows (Supabase EU, ingen tredjeparts-
analyse, ingen reklame-cookies, ingen tredjeparts-sælg, ingen tracking-SDK'er):

### Data Used to Track You
**Ingen.** Vi tracker dig ikke på tværs af apps eller websteder.

### Data Linked to You

| Apple-kategori | Hvad det dækker i Melo | Formål |
|---|---|---|
| **Contact Info → Email Address** | Din e-mail til kontoen | App Functionality |
| **User Content → Other User Content** | Profil, partnernavn, barnets navn, dagbogs­tekster, beskeder, anerkendelser, øjeblikke, daglige check-ins | App Functionality |
| **Health & Fitness → Health** | Terminsdato, fødselsdato, fødselstype, komplikationer, ernærings­metode, amning/bleskift/søvn-logninger | App Functionality |
| **Identifiers → User ID** | Auth-bruger-ID, family-ID, invitations­kode | App Functionality |
| **Diagnostics → Crash Data** | Automatiske fejl­logs ved crash | App Functionality |

For **alle** ovenstående: kun "App Functionality" som formål. Ingen er "Used
for Tracking", "Third-Party Advertising", "Developer's Advertising or
Marketing" eller "Analytics".

### Data Not Collected

- Precise Location, Coarse Location
- Financial Info
- Search History, Browsing History
- Sensitive Info ud over det der er nævnt under Health
- Contacts (kontaktlisten)
- Photos eller Videos (med mindre I tilføjer en upload-feature senere)
- Audio Data, Gameplay Content, Customer Support, Other User Content udover ovenstående

Når du udfylder det i App Store Connect, så markér ovenstående felter præcist —
Apple holder dig op på det, og forkert udfyldning er en hyppig årsag til
afvisning.

### Privacy Practices — supplerende felt

> "We do not sell user data. We do not show ads. All data is stored in the EU
> (Supabase Frankfurt) and protected by Row Level Security so families never
> see each other's data. The AI chat sends anonymized messages to Anthropic
> and is not used to train models."

---

## 3. Screenshots

### Krævede formater (iPhone)

Apple kræver mindst ét sæt screenshots pr. device-størrelse jeres app
understøtter:

- **6.7" iPhone (Pro Max, Plus)** — 1290 × 2796 px, portrait
- **6.5" iPhone (XS Max-æra)** — 1242 × 2688 px, portrait *(valgfri hvis 6.7"
  uploades — Apple skalerer)*
- **5.5" iPhone (8 Plus)** — 1242 × 2208 px, portrait *(valgfri)*

Plus separat for iPad hvis appen understøtter det. Capacitor-builds er
universal, så Apple vil bede om mindst ét iPad-sæt — typisk **12.9" iPad Pro**
2048 × 2732 px.

Tag som minimum **6.7" iPhone**. Resten kan I springe over.

### Hvor mange?

Apple tillader 1–10 pr. størrelse. **Brug 6.** Færre virker tomt; flere
udvander historien.

### Hvad de seks billeder bør vise

Mockups ligger allerede i `appstore/screenshots/` som HTML. Det de viser er
det rigtige indhold — men de skal genskabes som *rigtige* device-screenshots
(skærmbilleder fra simulatoren eller en rigtig telefon).

Rækkefølge og fokus:

1. **Dashboard (hjemmeskærm)** — viser straks "appen forstår min hverdag".
   Header: *"Sammen gennem det første år"*.
2. **Søvn-tracker live** — det mest visuelt distinkte feature. Header:
   *"Tids­tag søvn med ét tryk"*.
3. **Partner-anerkendelse + tag-en-opgave** — fanger den unikke
   sam­arbejds­mekanik. Header: *"Tag en opgave, send en anerkendelse"*.
4. **Uge-for-uge graviditet** — vis et rigtigt uge-kort (fx uge 22 med
   papaya). Header: *"Uge 22 — baby kan høre din stemme"*.
5. **MELO-chat** — viser AI-værdien. Header: *"Spørg om alt — vi svarer
   roligt"*.
6. **Far/medforælder-side** — det nye, differentierede. Header: *"En app
   der også er bygget til far"*.

Hver screenshot bør have **en kort header-tekst i top** (max 5 ord, Fraunces,
mørk grøn) der forklarer hvad man ser. Apple anbefaler det stærkt — uden tekst
mister man konteksten i deres galleri.

### Sådan tager du dem teknisk

På din Mac med Xcode:

```bash
# Åbn projektet i Xcode
open ios/App/App.xcworkspace

# I Xcode:
#  1. Vælg simulator "iPhone 16 Pro Max" (6.7")
#  2. Run (⌘R)
#  3. Naviger til den skærm du vil tage
#  4. ⌘S i simulatoren — gemmer på skrivebordet i den rigtige PNG-størrelse
```

Mountede simulatorer gemmer i 1290 × 2796 — præcis App Stores krav. Ingen
skalering nødvendig.

### Tip til at få de bedste skærmbilleder

- Brug en realistisk men anonymiseret profil — fx mor "Sofie", far "Mikkel",
  barn "Alma". Aldrig rigtige brugernavne.
- Fyld med plausibel data — dagbogen skal have et par dage med søvn og
  amninger, ikke være tom.
- Vis status-bar-tid som **9:41** (Apples standard).
- Slå "demo-mode" til hvis I har én — ellers manuelt seed via lokalt
  testdata.

---

## 4. Pre-submission tjekliste

Inden du trykker "Submit for Review":

- [ ] **Tekniske krav**
  - [ ] iOS deployment target er 16.0 (matchet i CLAUDE.md)
  - [ ] App-ikonet er 1024 × 1024 PNG uden alpha-kanal
  - [ ] Splash-skærm matcher brandet (rettet i denne uge ✓)
  - [ ] `lang="da"` i `index.html` (rettet ✓)
  - [ ] Open Graph-billede peger ikke på lovable.dev (rettet ✓)

- [ ] **Indhold og sign-off**
  - [ ] Faglig sign-off på `uge-indhold-faglig-godkendelse.md` fra jordemoder
        eller sundhedsplejerske
  - [ ] Privatlivspolitik er gennemgået af jurist
  - [ ] Privacy URL fungerer udenfor appen (ikke kun på `/privacy` i SPA'en —
        skal være tilgængelig fra Apples reviewer)
  - [ ] Support URL fungerer
  - [ ] CVR-nummer er udfyldt i `PrivacyPage` (placeholder `[indsæt CVR-nummer]`
        står der nu)

- [ ] **App Store Connect**
  - [ ] App Privacy udfyldt præcist som beskrevet ovenfor
  - [ ] Kategori valgt (anbefaling: Health & Fitness primær, Lifestyle
        sekundær — se review-note A)
  - [ ] Age rating udfyldt (4+ er forsvarligt — ingen voksent indhold)
  - [ ] Screenshots uploadet til mindst 6.7" iPhone
  - [ ] Beskrivelse, subtitle, promotional text, keywords for både DA og EN
  - [ ] "What's New" udfyldt
  - [ ] Test-build kørt gennem TestFlight med mindst 2-3 eksterne testere

- [ ] **Sikkerhed**
  - [ ] RLS-migration (`supabase/migrations/20260530_rls_hardening.sql`)
        kørt i Supabase Dashboard
  - [ ] `.env` indeholder kun publishable key (ingen service-role)
  - [ ] Fix C (login fra onboarding) testet på rigtig enhed
  - [ ] Fase-overgangs-fixen testet med en dato i fortiden

- [ ] **Review-fælder**
  - [ ] Apple kan teste hele app-flowet uden at oprette en falsk konto med
        gravid-data — overvej en demo-/test-konto med pre-seeded data og
        skriv login i App Review Information
  - [ ] App Review Information indeholder kontakt­e-mail og telefon
  - [ ] Ingen referencer til "AI" som "advisor" eller "doctor" — kald det
        "vejledning" eller "guide"

---

## 5. Efter godkendelse

- TestFlight til en lille gruppe i en uge før offentlig launch
- Forbered et svar på de første dages anmeldelser (godt og dårligt)
- Hav en "krisekanal" til alvorlige fejl (push-notifikation eller in-app
  besked) klar
- Mål: ikke 5 stjerner — mål er at folk bliver med uger 2 og 3
