# Melo — fagekspert-gennemgang (fire vinkler)

Fire fageksperter (sundhedsplejerske, jordemoder, parterapeut, baby-tech-CEO)
gennemgik den faktiske kode. Dato: 21. juli 2026.

---

## Det alle er enige om (konvergensen)

1. **SIKKERHED er det største hul (sundhedsplejerske + jordemoder, uafhængigt):**
   Graviditets-chatten har akut-triage (1813/112, faresignaler) — **baby-chatten
   har INGEN.** Den mest sårbare fase (nyfødt: feber, gulsot, dehydrering,
   vejrtrækning, forældres desperation) er den mindst beskyttede. Dette er det
   vigtigste at rette før launch.
2. **Faktuelle sundhedsfejl** (sundhedsplejerske): vaccinationsprogrammet er
   forkert flere steder.
3. **Indhold skrevet, men ikke vist + trust-bugs** (alle fire) — bekræfter
   persona-kritikken.
4. **Par-laget er den eneste ægte moat, men er underbygget** (parterapeut + CEO).
5. **For bredt fokus** (CEO): skær sprawl, bevis partner-aktivering, B2B nu.

---

## 1) Sundhedsplejerske — kritiske fund

**Faresignaler for babyen mangler næsten helt.** Ingen vejledning om hvornår man
kontakter sundhedsplejerske/læge/1813/112 for barnet: spædbarnsfeber (≥38 °C
under 3 mdr = akut), gulsot, dehydrering/for få våde bleer, vejrtrækningsbesvær,
slap baby, navleinfektion. Graviditetsdelen har modellen — baby-fasen mangler den.

**Vaccinationsprogrammet er faktuelt forkert (skal rettes):**
- `JordemoderCard.tsx` skriver "2-måneders undersøgelse + første vaccination"
  (skal være **3 mdr**) og "8–10-måneders undersøgelse + tredje vaccination"
  (skal være **12 mdr**; 8–10-mdr-undersøgelsen findes ikke).
- `TjeklistePage.tsx` (a5) skriver **"MFR 1 ved 5 mdr"** — forkert. MFR gives ved
  **15 mdr**; ved 5 mdr gives 2. DiTeKiPolHib + pneumokok.
- Tjeklisten (a4) nævner "4 mdr lægetjek" — findes ikke (SST: 5 uger, 5 mdr, 12 mdr).
- **Pneumokok-vaccinen nævnes slet ikke.**
- (Korrekt kilde findes allerede i `phaseData.ts` `getHealthSuggestions` — 3/5/12
  + MFR 15. De tre kilder skal samles og de forkerte rettes.)

**Trivsel/vægt uden sikkerhedsnet:** `BabyMeasurements.tsx` skriver "flot! 💚" ved
enhver vægtøgning, flagger IKKE vægttab eller manglende genvinding af fødselsvægt
— kan falsk berolige.

**Mangler også:** mastitis ved navn (rødt/varmt bryst + feber), sikker
flaske-tilberedning, "får barnet nok"-tegn, fødselsdepressions-screening (EPDS) +
eskalering ved alvorlige tanker (mor OG far — paternel PPD ~1/10), rumdeling i
sikker søvn, motoriske rød-flag ("nævn for sundhedsplejersken hvis...").

---

## 2) Jordemoder — chat-gennemgang

**Vigtigst: baby-chatten (`ChatBaby.tsx`) har ingen akut-triage** — spejl
`PregnancyChatPage.tsx` (linje 82–97): `URGENT_KEYWORDS_BABY` + `TRIAGE_RESPONSE_BABY`
(1813/112). Prioritér: spædbarnsfeber, slaphed, vejrtrækning/blå læber,
dehydrering, fald/slag, blod i afføring/opkast, forældres tanker om at skade sig
selv/barnet.

**Prompts er ikke aldersopdelte:** `getQuickPrompts` bruger ikke `babyAgeWeeks`
(findes i context, linje 232). Graviditetschatten gør det rigtigt pr. uge.

**Amme-antagelser ekskluderer flaske-forældre** ("nok mælk" → "nok at spise").
Mangler fysiske "er det normalt"-banaliteter (prutter, gylp, bumser, tænder) og
alt 6–12-mdr-indhold.

### Foreslåede spørgsmålssæt (klar til brug)

**GRAVID 1. tri:** "Er det normalt at have så meget kvalme?" · "Hvad må jeg ikke
spise?" · "Må jeg drikke kaffe?" · "Jeg bløder lidt — er det normalt?" · "Hvornår
er første scanning?" — *Far:* "Hvordan hjælper jeg med kvalme og træthed?" ·
"Hvad sker der med baby lige nu?"

**GRAVID 2. tri:** "Hvornår mærker jeg spark?" · "Øvelser mod lændesmerter?" ·
"Hvad skal jeg vide om misdannelsesscanningen?" · "Må jeg dyrke motion?" —
*Far:* "Hvad skal vi planlægge nu?"

**GRAVID 3. tri:** "Veer eller øveveer?" · "Hvornår tager jeg på fødegangen?" ·
"Hvad skal i hospitalstasken?" · "Baby bevæger sig mindre — hvad gør jeg?"
*(triage)* · "Bange for fødslen?" — *Far:* "Hvad er min rolle under fødslen?" ·
"Hvordan støtter jeg hende bedst under veerne?"

**NYFØDT 0–6 uger:** "Får [barn] nok at spise?" · "Amning gør ondt — hvad gør
jeg?" · "Hvor meget skal en nyfødt sove?" · "Er det normalt at [barn] gylper?" ·
"Hvordan passer jeg navlestumpen?" · "Er min blødning normal?" · "Er det baby
blues?" — *Far:* "Hvordan skifter jeg ble og bader en nyfødt?" · "Hvad gør jeg
når [barn] ikke vil stoppe med at græde?" · "Hvordan aflaster jeg hende om natten?"

**"Er det normalt?" (fysisk):** "…prutter og bøvser så meget?" · "…nyser og
hikker?" · "…små bumser i ansigtet?" · "…sennepsgul løs afføring?"

**BABY 6 uger–6 mdr:** "Hvorfor græder [barn] 17–20 hver dag?" · "Hvornår sover
de igennem?" · "Er det søvnregression?" · "Må jeg drikke kaffe/vin når jeg
ammer?" · "Hvornår er de første vaccinationer?" · "Er det tænder?" · "[Barn] vil
kun sove på mig."

**BABY 6–12 mdr:** "Hvordan starter jeg med skemad?" · "Hvilke madvarer skal jeg
passe på (allergi, honning, salt)?" · "[Barn] afviser mad — normalt?" ·
"Adskillelsesangst — hvad gør jeg?" · "Hvornår kommer tænder, og hvordan lindrer
jeg?" · "[Barn] kravler ikke endnu — bekymret?" · "Hvordan barnesikrer jeg?"

**De 3 vigtigste chat-rettelser:** (1) byg akut-triage ind i baby-chatten,
(2) gør prompts aldersopdelte, (3) luk indholdshuller + gør amme-sprog inkluderende.

---

## 3) Parterapeut — samarbejde

**Grundspænding: appen vil både være relationsrum OG regnskab.** Scorekeeping
(opgavetal pr. forælder, "3M·2F") flytter parret fra "vi" til "mig vs. dig" —
en robust prædiktor for utilfredshed.

**"Mental load"-kortet måler ikke mental load** (`SammenBaby.tsx` 133–183) — det
tæller kun opgaver. Det at huske/planlægge/bære ansvaret (den usynlige byrde)
måles slet ikke. Risiko: den der bærer alt, kan se ud til at "lave mindre".

**`imbalanceHint` (175–181) navngiver den med flest opgaver** — kan opleves som
at appen tager parti, og bygger på det fejlbehæftede opgavetal.

**Intet check-in om PARRET eller HINANDEN — kun om barnet.** Største strukturelle
hul: relationen har ingen puls. Intimitet/sex efter fødsel næsten fraværende.

**Stærkt:** Ventil-rummet, "Formuler det til din partner" (ikke-voldelig
kommunikation), "Tag den" + hjerte-reaktion, Dagens Spørgsmål (reveal),
fri-tekst-anerkendelse.

**Den ene ting:** skift tyngdepunkt fra individuel opgave-scoretavle til fælles
**relationspuls** — ugentligt par-check-in om "os" og "hinanden", ikke barnet.
Infrastrukturen findes i `DagensSpørgsmål` + `PartnerHandoff`.

Konkret: mål ansvarsområder (hvem *ejer* aftaler/indkøb/kontakt) ikke afkrydsninger;
giv kredit for at planlægge; fjern navngivning i imbalanceHint (brug "vi"-sprog);
lad brugeren redigere formuler-beskeden; giv ventilrummet en blid udgang;
tilføj par-check-in + repair-ritual + postpartum-intimitet.

---

## 4) Baby-tech-CEO — forretning

**Verdikt:** stærkt produkt-instinkt + ægte tom position, men DK-only
consumer-freemium til 299 kr/år kan strukturelt ikke returnere en fond. Satser
kun hvis de smalner ind til **par-kilen + B2B** og beviser partner-aktivering med
tal.

**Kritiske svagheder:** markedet for lille til consumer-freemium alene
(~86–180 t.kr ARR finansierer ikke teamet); feature-sprawl (36 pages, 90+
komponenter); trust-bugs er dødelige i et tillidsprodukt; "real-time
collaboration" er overclaim (koden er async pull-sync); sundhedsindhold + AI-chat
uden fuld klinisk sign-off = juridisk/App Store-risiko.

**Moat:** en positionerings-kile med 12–18 mdr forspring, ikke forsvarlig IP.
Preglife kan tilføje en far-fane inden for 12 mdr hvis kilen beviser konvertering.
Det eneste potentielt forsvarlige: **par-laget koblet til data** → "vi beskytter
jeres parforhold gennem det hårdeste år" som B2B/forsikrings-finansierbar påstand.

**6-mdr-prioritering:**
- **BYG:** wire indhold + dræb trust-bugs; instrumentér og optimér partner-aktivering;
  start B2B-piloter NU (kommune + pension); lancér ét betalt kursus.
- **DROP:** Babynavne, Shop, Frugt-side, Leg, redundante chat-sider,
  ønskeliste/affiliate (affiliate modsiger privatlivsbrandet); Norden/EU-ekspansion
  fra decket indtil DK-økonomi er bevist; "real-time"-claimet.
- **DOBBELT-NED:** par-laget (mental load, tag-en-opgave, appreciation, Ventil +
  formuler-til-partner) — det eneste ikke-parity, emotionelt uafviselige element.

**Den ene ting der afgør succes:** kan par-kilen drive målbart højere
aktivering/retention end en mor-only app OG monetiseres ud over 299-kr-sub
(B2B/forsikring)? Hvis ja: rigtig virksomhed med en moat. Hvis nej: en pænere
dansk graviditetsapp.

---

## Prioriteret handleplan (på tværs)

**P0 — sikkerhed (før launch):**
- Byg akut-triage ind i baby-chatten (1813/112 + faresignaler), spejlet fra
  graviditets-chatten.
- Et "kontakt hvem hvornår"-kort til baby-fasen (feber/gulsot/dehydrering/vejrtrækning).

**P1 — faktuelle fejl (hurtige, skadelige):**
- Ret vaccinationsprogrammet alle tre steder + tilføj pneumokok; saml til én kilde.
- Fjern ubetinget "flot!" i BabyMeasurements; flag vægttab/manglende genvinding.

**P2 — tænd for indhold + trust-bugs (dette er delvist gjort):**
- Deterministisk uge-tæller, mors navn, alders-korrekt søvn-mål, flaske-ml — RETTET,
  afventer build/push.
- Wire resten af det skrevne far/partner-indhold.

**P3 — par-laget (moat):**
- Ugentligt par-check-in om "os"; mål ansvar ikke afkrydsninger; afdramatisér
  regnskabet; byg formuler-broen færdig.

**P4 — chat-forbedringer:**
- Aldersopdelte prompts; inkluderende amme-sprog; de foreslåede spørgsmålssæt ovenfor.

**P5 — strategi (CEO):**
- Skær sprawl; instrumentér partner-aktivering; start B2B-piloter; ét betalt kursus.
