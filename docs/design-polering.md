# Melo — designpolering før launch

Designaudit og polering lavet med `melo-design`-skillen. Hovedformål: at appen
ser **færdig og professionel** ud — ikke nybygget. Auditten kiggede systematisk
efter hardkodede farver, inkonsistente knap-radier, leftovers fra
projekt-scaffolden og det helt nære: hvad ser brugeren *først*.

---

## Det gode at vide først

Designsystemet i `src/index.css` er **solidt bygget**. Fuld token-suite
(`--moss`, `--sage`, `--clay`, `--cream`, `--warm-white` osv.), `.dark`-tema
defineret, hjælperklasser (`.card-soft`, `.btn-primary`, `.label-upper`,
`.title-feature`, `.section-fade-in`) konsistent navngivet. Typografien er på
plads: Fraunces til overskrifter, Inter til alt funktionelt. CTA-knapper bruger
korrekt `rounded-full` i de hovedflows, jeg gennemgik. Det er ikke et
oprydningsprojekt — det er finpudsning.

---

## Rettet i denne runde

**1. Splash-skærmen (`components/SplashScreen.tsx`).** Den brugte en hex-
gradient (`#dff2d4 → #c4e2b0`) som ikke matchede moss/sage-paletten. Det første
brugeren ser, lignede en anden app end resten. Rettet til:
`linear-gradient(145deg, hsl(var(--cream)), hsl(var(--sage-light)))` —
brand-aligneret, og box-shadow tokeniseret til `hsl(var(--moss) / 0.18)`.

**2. `index.html` — to rigtige launch-fejl.**

- `<html lang="en">` rettet til `lang="da"`. Appen er primært dansk, så
  skærmlæsere og browseroversættelse skal ikke tro andet.
- Open Graph-billederne pegede på `lovable.dev/opengraph-image-p98pqg.png`
  — Lovables eget brandbillede fra projekt-scaffolden. Rettet til
  `/app-icon.png` (jeres egen ikon). Når nogen deler app-linket i iMessage,
  Slack eller Facebook, viste det Lovables logo. Det er den slags, der
  afslører, at appen er bygget på en platform.
- `<meta name="twitter:site" content="@Lovable">` fjernet (samme grund).
- `theme-color` (`#264236`, moss) tilføjet — iOS Safari og Android Chrome
  bruger den til at farve adresselinjen, så browseren matcher appen.

---

## Auditeret og fundet i orden

- **44 hex-farver på tværs af koden.** Ved gennemgang viste det sig at være
  legitime: confetti-partikelfarver (skal være literal for at confetti-
  biblioteket kan rendere dem), barneafføringsfarve-swatches (skal vise
  faktiske farver), og hero-gradient-kort i `BarnPage` og `PregnancyWeekPage`
  (designede mørke kort, der er tematisk pr. uge). De er ikke et problem.
- **Inline `hsl(…)`-værdier** bruger gennemgående `var(--token)`-formen —
  altså bygger på designsystemet frem for at omgå det.
- **CTA-knapper** i de gennemgåede hovedflows (`OnboardingPage`, `AuthPage`,
  `ResetPasswordPage`, `MerePage`) bruger `rounded-full` korrekt. Kort
  bruger `rounded-xl` / `rounded-2xl`. Konsistensen er der.
- **`MeloWordmark`** bruger jeres eget logo-PNG; `MeloIcon` SVG bruger
  korrekt CSS-variabel for farve. Ren.
- **`BottomNav`** og **`AppLayout`** bruger gennemgående tokens og safe-area-
  insets. Ren.

---

## Tilbage til polering (anbefalet før eller lige efter launch)

1. **Dødt scaffold:** `src/pages/Index.tsx` er en Lovable-placeholder ("PLACE-
   HOLDER: Replace this entire return statement"). Den er ikke registreret i
   routingen, men ligger der stadig. Slet filen helt.
2. **Ægte Open Graph-billede:** `/app-icon.png` er ok for nu, men den
   anbefalede sociale-deling-standard er 1200×630 landskab med logo + tagline.
   Det er en designopgave (Canva eller Figma — 15 minutter).
3. **Privatlivspolitik:** `PrivacyPage.tsx` (45 linjer) eksisterer. Inden
   App Store-launch skal indholdet være færdig-skrevet og tilgængeligt fra
   en stabil URL. Apple kræver det.
4. **Dark mode:** `.dark`-temaet er defineret i `src/index.css`, men jeg fandt
   ikke en bruger-styring til at slå det til. Hvis det skal kunne vælges,
   er der arbejde i `IndstillingerPage`. Hvis det skal følge systemet
   automatisk, er det få linjer JS. Hvis dark mode IKKE skal med i v1, er
   det fint — men temaet bør så stå klart som "v1.1".
5. **Hero-gradient-kort duplikeret.** De seks dark gradients (`#0a1a12 →
   #0f2318` osv.) findes både i `BarnPage` og `PregnancyWeekPage`. Samme
   indhold-duplikering-mønster som ugedata-konsolideringen. Når
   `pregnancyContent.ts` migreres til komponenterne, kan hero-paletten
   flyttes med.
6. **App Store-screenshots og butikstekster.** Der ligger en `appstore/`-
   mappe — indholdet bør gennemgås for at sikre, at det viser de
   designpolerede skærme og bruger den nye brand-aligned splash.

---

## Hvor du ser ændringerne live

Kør i din Terminal:

```bash
cd ~/Documents/my-baby-team
npm run dev
```

Åbn `localhost:5173` og genindlæs — den nye splash-gradient er det første,
du ser, og `theme-color` slår igennem på adresselinjen (særligt synligt på
mobil/iOS).
