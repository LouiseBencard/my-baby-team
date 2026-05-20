# Onboarding Redesign — Spec

**Dato:** 2026-05-20  
**Status:** Godkendt design, afventer implementering

---

## Baggrund

Det nuværende onboarding-flow har 10 trin og spørger om LMP/fødselsdato *inden* det ved hvem brugeren er. Rollen (den gravide / medforælder / alene) burde komme først — den bestemmer alt efterfølgende indhold. Sensitive spørgsmål (fødselstype, amning, barsel) fjernes fra onboarding og stilles kontekstuelt inde i appen.

**Mål:** Reducer drop-off, vis app-værdi fra første sekund, personaliser fra start.

---

## Det nye flow — 6 screens

### Screen 1 — Splash + rolle (kombineret)

**Design:** Mørk baggrund (gradient `#264236 → #1a2e24`). Melo-logo øverst (serif, hvid). Tagline: *"Lavet med kærlighed og søvnmangel"* (diskret, uppercase). Tre rolle-knapper under logoet.

| Rolle | Emoji | Label |
|-------|-------|-------|
| Den gravide | 🤱 | Den gravide |
| Medforælder | 🤝 | Medforælder |
| Alene forælder | 💪 | Alene |

Hjælpetekst under knapperne: *"Vælg din rolle — vi tilpasser resten"*

**Logik:** Valget gemmes i onboarding-state og brancher flowet (screen 5 springes over for alene-forældre).

---

### Screen 2 — Termin / fødselsdato

**Spørgsmål:** "Hvornår regner I med at møde jeres barn?"  
**Undertekst:** "Eller hvornår blev barnet født?"  
**Input:** Datovælger (iOS native date picker)

**Logik bagved (skjult for bruger):**
- Hvis dato er i fremtiden → LMP beregnes automatisk (termin - 280 dage)
- Hvis dato er i fortiden → behandles som fødselsdato
- Bruges til ugevisning i dashboard og kontekstsensitiv content

---

### Screen 3 — Dit navn

**Spørgsmål:** "Hvad hedder du?"  
**Placeholder:** "F.eks. Sofie"  
**Krav:** Obligatorisk. Appen tiltaler brugeren personligt fra dashboard ("Godmorgen, Sofie").

---

### Screen 4 — Barnets navn

**Spørgsmål:** "Hvad hedder jeres barn?"  
**Undertekst:** "Valgfrit — vi bruger 'Baby' ellers."  
**Placeholder:** "F.eks. Alma"  
**Krav:** Valgfrit. Hvis tomt → appen bruger "Baby" i alle visninger.

**Rationale:** Personalisering har stor emotionel effekt. "Alma sov i 2 timer" rammer anderledes end "Baby sov i 2 timer".

---

### Screen 5 — Medforælders navn

**Spørgsmål:** "Hvad hedder din medforælder?"  
**Undertekst:** "Valgfrit — kan tilføjes senere under indstillinger."  
**Placeholder:** "F.eks. Mikkel"  
**Krav:** Valgfrit.

**Logik:** Springes **automatisk over** hvis brugeren valgte "Alene" på screen 1.

---

### Screen 6 — Opret konto

**Headline:** "Næsten der!"  
**Primær:** Apple Sign In (hvid knap, iOS-standard)  
**Fallback:** "Brug e-mail i stedet" (outline-knap)

**Logik:** Auth sker *efter* al personalisering er indsamlet, så dataen kan knyttes til kontoen ved oprettelse.

---

## Hvad vi har fjernet fra onboarding

Følgende spørgsmål er slettet fra onboarding og stilles i stedet kontekstuelt inde i appen:

| Spørgsmål | Hvornår det stilles i stedet |
|-----------|------------------------------|
| Fødselstype (naturlig / kejsersnit) | Første gang recovery-relateret indhold vises |
| Amning / flaske | Første gang amningslogning tilgås |
| Barsel (hvem har / hvornår) | Første gang barselsplanning-sektionen åbnes |

Dette sparer 3 trin og fjerner den medicinske tone fra første møde med Melo.

---

## Data-model under onboarding

Onboarding-state gemmes midlertidigt (localStorage eller React state) og skrives til Supabase ved account creation (screen 6):

```ts
interface OnboardingState {
  role: "pregnant" | "coparent" | "solo";
  dueOrBirthDate: string; // ISO date string
  userName: string;
  babyName?: string;
  coparentName?: string;
}
```

Felterne mappe til eksisterende `profiles`-tabel i Supabase (eller nyt `onboarding_data` felt).

---

## Navigationsskift

| Fra | Til |
|-----|-----|
| `OnboardingPage.tsx` (én stor komponent) | Separate screen-komponenter eller step-baseret wizard i én fil |

Anbefaling: **Step-wizard i én fil** (`OnboardingPage.tsx`) med `currentStep: number` og en `steps`-array. Enklere end separate routes og lettere at animere.

---

## Animationer (nice-to-have)

- Slide-transition mellem steps (Framer Motion eller CSS transition)
- Rolle-knapper: lille scale-animation ved valg
- Ikke blokerende for implementering — kan tilføjes efterfølgende

---

## Scope

**Inkluderet:**
- Redesign af `OnboardingPage.tsx`
- Branching-logik baseret på rolle
- Apple Sign In integration (primær) + email fallback
- Data-persistering til Supabase ved account creation

**Ikke inkluderet (deferred):**
- Kontekstuelle prompts inde i appen for de fjernede spørgsmål
- Partner-invite flow (medforælder inviterer via link)
- A/B-test infrastruktur
