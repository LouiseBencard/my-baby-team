# Melo — kritisk persona-test (fire vinkler)

Fire kritiske brugertest-agenter spillede hver en persona og gennemgik den
faktiske kode. Rå rapporter nedenfor. Synteser og prioriteret handleplan står
til sidst.

Dato: 21. juli 2026.

---

## Det gennemgående mønster (vigtigst)

**Appens bedste indhold er skrevet — men ikke koblet på de skærme, brugerne
faktisk ser.** Tre af fire personaer landede uafhængigt på samme konklusion:

- **Gravid mor:** `pregnancyContent.ts` kalder sig "single source of truth"
  (følger SST), men `DashboardPregnant` og `PregnancyWeekPage` importerer den
  ikke — de bruger egne lokale funktioner. Mindst fire konkurrerende
  uge-indholdskilder findes, og de er allerede drevet fra hinanden.
- **Partner (gravid):** Detaljeret uge-for-uge `partnerFocus` +
  `partnerHelpTips` (uge 5–40) findes i `pregnancyContent.ts`, men
  `DashboardPregnantFar` bruger en egen 5-spandet version med hardcoded navn
  "Louise". `content.actions` beregnes og renderes aldrig.
  `PregnancyWeekDetail` (eneste komponent der viser partner-ugesyn) er dødt kode.
- **Far (nyfødt):** `farBabyContent.ts` (788 linjer, dansk+engelsk,
  aldersopdelt "tag barnet så mor kan…"-indhold) importeres INGEN steder.
  `DadDailyMissions` + `DadInsightCard` importeres aldrig. Dashboardet viser
  kun fun facts (`VidsteDuCard`).

Konsekvens: I betaler vedligeholdelsesprisen for indhold, brugerne aldrig ser —
og appen føles tyndere, end den faktisk er. De fleste af disse fixes er "tænd
for eksisterende kode", ikke skriveprojekter.

---

## Trust-bugs (hurtige, men skadelige)

- **Tilfældig dag-tæller:** `DashboardPregnant` bruger `Math.random()` +
  `new Date().getDay()` til "uge X+Y" — så tælleren hopper efter ugedag, ikke
  efter reel graviditetsdag. En gravid kender sit uge+dag-tal; når det hopper,
  mister hun tilliden på skærm ét.
- **Hardcoded "Louise":** `DashboardPregnantFar` linje ~12 har et hardcoded
  navn i stedet for `morName` — alle andre par ser en fremmed kvindes navn.
- **Søvn-mål modsiger sig selv:** dashboardets `QuickLog` sætter søvnmål til
  8 t (grøn bjælke ved 8), men `SovnPage` siger 16 t for 0–1 mdr. To skærme
  modsiger hinanden, og den udmattede mor får at vide at 8 t "er nok".
- **Flaske-only logger 0 ml:** et tryk logger straks `handleBottle(0)` uden
  mængde-input — hele pointen med flaskelogning forsvinder.
- **Skråsikre/tvivlsomme fakta:** "Baby er nu levedygtig" (uge 24, kategorisk),
  "100 neuroner i minuttet" (uge 7), "25 liter blod i døgnet" — den nuancerede,
  korrekte version findes i `pregnancyContent.ts`, men vises ikke.
- **Død "Vores kilder →"-knap** i `PregnancyWeekPage` (ingen onClick).

---

## Sikkerhedshuller

- **Ingen "hvornår ringer jeg"-vej for den gravide:** `trimesterContent.redFlags`
  (svangerskabsforgiftning, nedsat liv, vandafgang, galdestase) er skrevet, men
  vises ingen steder. Ingen jordemoder-/1813-genvej på dashboardet.
- **Ingen krise-eskalering for moren:** vælger hun "Svært" i check-in mange dage
  i træk, sker der intet. Ingen EPDS, intet nødnummer, ingen fødselsdepressions-
  eskalering synligt.
- **Mastitis ikke flagget** som rødt flag (feber + rødt ømt bryst = læge nu).

---

## MELO-chat

- Chatten får ikke `currentWeek` med i konteksten — kan ikke give uge-præcise
  graviditetssvar. Alle hurtig-prompts er baby/nyfødt-spørgsmål; ingen
  graviditets-prompts.
- System-prompten ligger i en Supabase edge function uden for repoet og kunne
  ikke verificeres — bør ikke være en black box for et sundhedsprodukt.

---

## Tone- og design-beslutninger (kræver Louises stillingtagen)

- **Kettlebell/gym-tonen til far** er relentless — hud-mod-hud, sang og bæring
  reduceres alt til træningsmetaforer. Rammer nogle fædre, kan virke nedladende
  på andre.
- **Konfetti ved hver amning/ble** (8+ gange i døgnet) kan føles barnligt og
  larmende for en øm mor kl. 03.
- **Dashboard-clutter:** baby-dashboardet har 15+ kort; "ét vigtigt budskab"
  (WhatMattersNow) drukner.
- **Fremskridtsbjælker mod mål** (amning 5/8) kan presse en skyldsplaget mor.
- **Sololforælder/fraværende partner:** appen nudger konstant om partner-kærlighed
  og date-aftener — kan virke fremmedgørende hvis man er alene.

---

## Afhænger af at Supabase-sync er live

- Partner ser ikke mors faktiske symptomer/humør — `PartnerHandoff` er
  device-lokal indtil sync virker ("shared via Supabase eventually").

---

# Rå rapporter

## 1) Gravid kvinde (uge 20)

Se fuld rapport i chat-loggen fra denne session. Nøglepunkter integreret ovenfor.
Kernecitat: *"Jeg spørger appen 'må jeg drikke kaffe / spise sushi / tage en
Panodil?', og den kan ikke svare — samtidig med at min uge+dag-tæller hopper
vilkårligt og to skærme modsiger hinanden."*

## 2) Ny mor (baby 5 uger)

Kernecitat: *"Et roligt 'lige nu'-skærmbillede: 'Sidste amning: for 2t 10m siden
(venstre). 5 våde bleer i dag — helt normalt. Hvil dig, du gør det godt.' Ét
kort. Byggeklodserne findes allerede — de er bare begravet under femten andre
kort og et par faktuelle fejl."*

## 3) Partner til gravid (uge 24)

Kernecitat: *"Fundamentet til ægte to-forældre-design er der — ve-tælleren,
far-chatten, samarbejds-mekanikken og et fuldt uge-for-uge far-indholdsbibliotek.
Men mit vigtigste vindue, dashboardet, er koblet fra det hele."*

## 4) Far til nyfødt (baby 4 uger)

Kernecitat: *"Tænd for `farBabyContent.ts` og gør ét kort til mit anker øverst:
dagens 2-3 konkrete ting jeg kan tage fra mor NU, tilpasset alder OG fodermetode.
Indholdet findes allerede. Det er ikke et skrive-projekt. Det er tre imports."*
