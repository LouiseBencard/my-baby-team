# Melo — faglig gennemgang af graviditets- og forældreindhold

Gennemgang af appens sundhedsindhold holdt op mod WHO, Sundhedsstyrelsen og
standard-embryologi, lavet med `melo-indhold`-skillen.

**Vigtig ramme:** Dette er en grundig *først-gennemgang* — den **erstatter ikke**
et sign-off fra en dansk jordemoder eller sundhedsplejerske. Særligt punkterne i
afsnit A (det danske svangre-/børneprogram) og C11 (levedygtighed) skal
verificeres af en fagperson. Listen er struktureret, så det kan gå hurtigt.

## Opdatering — verificeret mod officielle kilder

Følgende er siden hentet og bekræftet mod Sundhedsstyrelsen, Statens Serum
Institut og Sundhed.dk, og rettet i koden:

- **Børnevaccinationsprogrammet** (`phaseData.ts` · `getHealthSuggestions`):
  Rettet til DiTeKiPolHib ved 3, 5 og 12 måneder + MFR ved 15 måneder.
  Lægeundersøgelser: 5 uger, 5 mdr og 12 mdr.
- **D-vitamin til spædbarn** (`TjeklistePage` · `phaseData.ts`): Rettet fra
  "fra dag 1" til "10 µg dagligt fra 2-ugers alderen og til 4 år".
- **Folsyre 400 µg/dag** (planlægning → uge 12), **D-vitamin 10 µg/dag** (hele
  graviditeten), **jern 40–50 mg/dag** (fra uge 10), **koffein max 200 mg/dag**:
  alle bekræftet korrekte.
- Det øvrige (GBS, OGTT, 36-ugers scanning, jordemodersamtaler) er fortsat
  åbent for en jordemoder, fordi praksis kan variere regionalt.

---

## Det, der er fagligt i orden — kan stå som det er

- **Fostervægte** uge 8–40 (1 g → 3400 g) matcher standard-vækstkurver godt.
- **Fosterlængder** matcher (isse-sæde tidligt, isse-hæl fra uge 20).
- **Folsyre 400 µg/dag**, **D-vitamin 10 µg/dag**, **jern fra uge 10** — alle
  korrekte mod Sundhedsstyrelsens anbefalinger.
- **Alkohol:** "ingen mængde er sikker" — korrekt og velformuleret.
- **Mad der frarådes:** lever/leverpostej (A-vitamin), rå fisk, upasteuriseret
  ost, rå æg — korrekt mod Fødevarestyrelsen.
- **Fødselsdepression-kort** (RaadGuidesPage): 2-ugers markør + henvis til læge —
  god, ansvarlig håndtering.
- **Parforholds- og mental load-indhold** er solidt, moderne og ikke-dømmende.
- Disclaimers findes på frugt-siden og far-dashboardet.

---

## A. Skal verificeres af fagperson før launch — dansk care-pathway

Disse punkter er sandsynligvis forkerte for dansk kontekst. De er konkrete og
checkbare mod Sundhedsstyrelsens *Anbefalinger for svangreomsorgen* og
*Vejledning om forebyggende sundhedsydelser til børn*.

1. **Vaccinations- og undersøgelsesplan** (`lib/phaseData.ts`,
   `getHealthSuggestions`). Appen skriver "2-måneders undersøgelse + første
   vaccination", "5-måneders + anden", "8–10-måneders + tredje". Det danske
   børneprogram er: børnevaccinationer ved **3, 5 og 12 måneder**, og
   lægeundersøgelser ved 5 uger, 5 måneder og 12 måneder. → Ret til det danske
   skema.
2. **GBS-test** (uge 36 + uge 37, `phaseData.ts`). Danmark screener **ikke**
   universelt for gruppe B-streptokokker — tilgangen er risikobaseret. → Fjern
   som standardpunkt eller omformuler til "ved risikofaktorer".
3. **GDM-blodprøve uge 28** anført som standard for alle. I DK er
   sukkerbelastning (OGTT) risikobaseret. → Omformuler til "tilbydes ved
   risikofaktorer".
4. **36-ugers scanning** anført som standard. Ikke universel i alle regioner.
   → Verificér.
5. **Jordemodersamtaler** — antallet og ugerne i `pregnancyAppointments`
   varierer regionalt. → Hold op mod det aktuelle svangreomsorg-program.

## B. Faktuelle unøjagtigheder og formuleringer

6. **D-vitamin til spædbarn** står som "fra dag 1" (`TjeklistePage`).
   Sundhedsstyrelsen anbefaler D-vitamindråber fra **2-ugers alderen**. → Ret.
7. **Uge 37** (`BarnPage`): "Baby er FULDGÅREN" — stavefejl, skal være
   *fuldbåren*. Og "kan klare sig uden medicinsk hjælp fra nu af" er en
   overstatement — uge 37 er "early term". → Blødgør formuleringen.
8. **Jern "27 mg/dag"** (uge 18, `BarnPage`) blander den amerikanske RDA med den
   danske tilskudsanbefaling (40–50 mg). → Ensret til dansk anbefaling.
9. **Foster-terminologi:** `BarnPage` uge 8 siger "officielt et foster", mens
   `phaseData` uge 9 siger det samme om uge 9. → Vælg ét tidspunkt.
10. **Manglende kostpunkter** fra dansk officiel vejledning: koffeingrænse
    (~200 mg/dag ≈ 2 kopper kaffe), lakrids-advarsel, og at store rovfisk (tun,
    sværdfisk m.fl.) skal begrænses pga. kviksølv. → Overvej at tilføje.

## C. Framing og sikkerhed

11. **Levedygtighed uge 24** er formuleret kategorisk ("Levedygtighed nået").
    Levedygtighed er glidende, ikke en dato. For en forælder i en præterm-
    situation betyder ordvalget meget. → Blødgør, og lad en fagperson se det.
12. **"Tigerspring" / Wonder Weeks** (`developmentalLeaps`) præsenteres som fast
    videnskab med eksakte uger. Modellen er populær, men videnskabeligt
    omdiskuteret. → Frame som "en populær model" og betон, at børn er
    forskellige. Selve de opmuntrende tekster kan blive.
13. **Røde flag mangler i uge-indholdet.** De ugentlige tekster fortæller ikke
    konsekvent, hvornår man skal kontakte jordemoder/læge (blødning, nedsat liv,
    stærke smerter, feber). Chatten ser ud til at have flag-logik — godt — men
    uge-siderne bør også have det. → Tilføj en fast "kontakt din jordemoder
    hvis…"-linje pr. trimester.
14. **Måle-skift uge 18 → 20** (14,2 cm → 25 cm) skyldes skift fra isse-sæde- til
    isse-hæl-mål. Uforklaret virker springet alarmerende. → Tilføj en kort note.

## D. Struktur — vigtigste anbefaling

15. **Uge-indholdet er duplikeret i mindst fem filer** — `phaseData.ts`,
    `PregnancyWeekPage.tsx`, `DashboardPregnant.tsx`, `DashboardPregnantFar.tsx`,
    `BarnPage.tsx` og `WeekUnlockModal.tsx` — hver med sin egen kopi af "hvad
    sker der i uge X", og de er allerede begyndt at drive fra hinanden (fx
    hjerteslag-tal). → **Saml alt uge-indhold i én kilde** (`phaseData.ts`). Så
    kan en fagperson godkende det **ét sted**, og det kan ikke komme ud af sync.
    Dette bør gøres før den faglige sign-off — ellers godkender man fem steder.
16. **"Animationerne" er YouTube-deeplinks** (`BarnPage` åbner en YouTube-søgning
    på foster i uge X), ikke kontrollerede assets. Man kan ikke garantere "100%
    korrekt" indhold, man linker til på YouTube — og brugeren forlader appen.
    → Overvej egne illustrationer eller licenseret indhold på sigt.

---

## Anbefalet rækkefølge

1. Konsolidér uge-indholdet til én kilde (punkt 15) — gør resten muligt.
2. Ret de konkrete fejl i afsnit A og B.
3. Justér framing i afsnit C.
4. Send det konsoliderede indhold til en jordemoder/sundhedsplejerske for
   sign-off. Uden et fagligt sign-off bør appen ikke markedsføres som
   sundhedsvejledning.
