# Far-siden efter fødslen — audit, spec og implementering

## 1. Hvad vi allerede havde

Et **stærkt fundament** vi blot ikke samlede til en dedikeret far-baby-skærm:

- **`VidsteDuCard`** — roterende "vidste du?"-fakta med masculint sprog
  (kettlebell, CrossFit, achievement unlocked, "4–6 timer brudt søvn ≈ 0,1 ‰
  alkohol"). Allerede aldersbevidst.
- **`DadDailyMissions`** — tre daglige missioner, fx "Tag morgenen — lad
  {mor} sove ekstra", "Tag alle bleskift i dag", "Sig noget rart til
  {mor}". Tjekbar, sorteres efter dag, vises kun en delmængde ad gangen.
- **`DadInsightCard`** — daglig kort indsigt, fx "{barn} vejer ca. {x} kg —
  perfekt til bicep curls under bæring".
- **`AppreciationCard`** — fuldt anerkendelses-flow: send tekst til partner,
  se historik fra hende, og en "date night-dream"-mekanik hvor I begge kan
  vælge en aftens-form. Allerede rolle-aware (clay til mor, sage til far).
- **`TakenTaskCard`** — viser når mor har taget en af fars opgaver, med
  ❤️🥹😮-reaktion og konfetti. **Tag-opgaver-mekanikken er allerede solid.**
- **`NeedsCard`** — luft, lur, brus, mad, alenetid, kram. Begge ser
  hinandens behov i realtid.
- **`TaskList`** (636 linjer) — fuld task-fordeling med take-mekanik.

Det vi **manglede** var ikke komponenter, men:

1. Et dedikeret far-dashboard i baby-fasen (`DashboardBabyFar`), så far får
   en oplevelse der ligner kvaliteten i `DashboardPregnantFar`.
2. Aldersbevidst indhold der er målrettet far: kettlebell-sammenligninger,
   støt-mor-tips, vagt-forslag der afhænger af fodermetode, og workout-
   framede aktiviteter.

## 2. Hvad er bygget nu

### `src/lib/farBabyContent.ts` — nyt indholds-lag

Aldersbevidst indhold i 5 buckets: 0–4, 4–12, 12–26, 26–52, 52+ uger.
Hver bucket indeholder:

- **`weightCompare`** — dynamisk kettlebell-sammenligning der bruger babys
  aktuelle vægt-estimat plus en workout-frame, fx *"Bæring 20 min = grip
  strength + core stabilitet"*.
- **`facts`** — korte fakta-bidder med masculint tone-of-voice.
- **`morSupport`** — tre kategorier: `physical` (hendes krop nu), `practical`
  (konkrete handlinger du tager uden at spørge), `emotional` (anerkendelse,
  forståelse, ord). Én af hver vælges som "dagens støt-mor-tip".
- **`shiftSuggestions`** — vagter og bleskift forgrenet på fodermetode
  (`amning` / `flaske` / `begge`), så rådene er konkrete og ikke "hvis
  hun ammer".
- **`activities`** — fem aktiviteter pr. bucket, hver med en `benefit` for
  baby og en valgfri `workout`-vinkel.
- **`reminders`** — korte one-liners af typen *"Sørg for at mor har vand
  og snacks i armslængde — hun er låst når hun ammer"*. Roteres som dagens
  påmindelse.

Plus hjælpefunktioner: `getFarBabyContent(ageWeeks)`,
`formatWeightCompare(template, ageWeeks)`, `pickReminderOfDay()`,
`pickMorSupportOfDay()`, `pickShiftSuggestions(content, feedingMethod)`.

### `src/pages/DashboardBabyFar.tsx` — ny dashboard-side

Lagdelt struktur med 13 sektioner, der bygger ovenpå det eksisterende:

```
A. Header (hilsen + barnets alder + fase-label)
B. TakenTaskCard           ← eksisterende — anerkendelse for taget opgave
C. Hero card               ← NY — kettlebell-vægt + workout-frame
D. Dagens påmindelse       ← NY — roterende reminder
E. Forstå hvad mor oplever ← NY — fysisk / praktisk / emotionel
F. Vagter & bleskift       ← NY — fodermetode-bevidst
G. DadDailyMissions        ← eksisterende
H. Aktiviteter med baby    ← NY — workout-frame
I. NattenKort + NeedsCard + TaskList   ← alle eksisterende
J. AppreciationCard        ← eksisterende
K. VidsteDuCard            ← eksisterende
L. Hurtige redskaber       ← link-grid
M. Disclaimer
```

**Tag-opgaver + anerkendelse er bevaret intakt:** `TakenTaskCard` står øverst
(så far ser med det samme, hvis mor har taget noget), `TaskList` har stadig
hele take-mekanikken, og `AppreciationCard` håndterer både at sende og
modtage anerkendelse.

### `src/pages/Dashboard.tsx` — opdateret routing

Forgrener nu også på rolle i baby-fasen:

```ts
return profile.role === "far" ? <DashboardBabyFar /> : <DashboardBaby />;
```

## 3. Sådan ser du det live

I din terminal:

```bash
cd ~/Documents/my-baby-team
npm run dev
```

Åbn `localhost:5173`. For at lande på den nye far-dashboard skal profilen i
localStorage have `role: "far"` og `phase: "newborn"` eller `"baby"`. Den
nemmeste vej er at gå gennem onboarding på ny og vælge "Medforælder / partner"
+ "Barnet er født".

## 4. Mulige udvidelser (post-launch)

Det vi *ikke* har bygget i denne runde, men som er naturlige skridt:

- **Far-onboarding der spørger om hans hverdag** (job-tider, hjemmegrænser),
  så støt-mor-tips og missioner kan tilpasses hans realitet — ikke kun
  babys alder.
- **Push-notifikationer fra reminders** — fx kl. 19 hver dag, eller før
  hun typisk amer.
- **Track-far-pointer** — antal nætter taget, antal bleskift, antal
  anerkendelser sendt. Risiko: gamification kan komme til at føles som
  konkurrence frem for samarbejde. Skal designes varsomt.
- **Indhold på engelsk** — det nye `farBabyContent.ts` er kun dansk for nu,
  i konsistens med `DashboardPregnantFar`. Når i18n trækkes igennem skal
  også dette indhold med.
- **Sundhedsfaglig gennemgang** — støt-mor-tips og vagter berører
  postpartum-fysiologi. Bør tjekkes af jordemoder/sundhedsplejerske sammen
  med det øvrige indhold.

## 5. Commit-flow

Når du har testet:

```bash
git add src/lib/farBabyContent.ts src/pages/DashboardBabyFar.tsx \
  src/pages/Dashboard.tsx docs/far-baby-implementering.md \
  ios/App/App/public/
git commit -m "Far-dashboard i baby-fasen + aldersbevidst far-indhold"
```
