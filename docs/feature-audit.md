# Melo — feature-audit

Status før launch næste uge. Dette er en *strukturel* audit (sider, komponenter,
routing, færdiggrad) — ikke en linje-for-linje QA. Funktionelle fejl skal stadig
findes ved test på rigtig enhed.

Symboler: ✅ færdigt · 🟡 halvfærdigt / skal poleres · 🔴 mangler eller usikkert

---

## Overordnet vurdering

Melo er **substantielt bygget** — ca. 35 sider, ca. 37 komponenter, rigtige
contexts (Family, Diary, Auth), Supabase-synkronisering, i18n på dansk og
engelsk. Det er ikke en prototype; det er en næsten-færdig app. Launch i næste
uge er realistisk, *hvis* vi fokuserer på de rigtige huller frem for at bygge
nyt.

Appen er bygget op om to spor — graviditet og baby — og forgrener konsekvent på
**fase** (pregnant/newborn/baby) og delvist på **rolle** (mor/far).

---

## Vigtigste fund: far-oplevelsen

Her er virkeligheden faktisk omvendt af, hvad vi troede.

**Graviditets-far er den rige, dedikerede oplevelse.** `DashboardPregnantFar`
(424 linjer) har uge-for-uge partner-indhold: "Forstå hvad [mor] oplever nu",
"Sådan hjælper du", "Det gør du nu" med praktiske partner-handlinger, egne
opgaver, og veer-timer fra uge 36. Det er genuint differentieret og godt lavet.

**Baby-far er den tynde oplevelse.** 🟡 Der findes *ingen* `DashboardBabyFar` —
både mor og far får samme `DashboardBaby`. Den skifter farver efter rolle
(clay for mor, grøn for far) og viser ét ekstra kort til far (`VidsteDuCard`),
men det er grundlæggende det samme dashboard. **Efter fødslen er far altså ikke
reelt differentieret.**

→ Skal far-oplevelsen efter fødslen give far lyst til at åbne appen, er det her,
arbejdet ligger — ikke i graviditeten. Enten en rigtig `DashboardBabyFar` eller
en dyb rolle-forgrening i `DashboardBaby`.

---

## Status per område

### Onboarding & login
🟡 Bygget og fungerer. 8–11 trin, fase-/rolle-bevidst. Nyligt rettet: kladden
gemmes nu løbende (fix A), og glemt-adgangskode er tilføjet (fix B). **Udestående:
fix C** (ren login-adgang fra onboarding — erstat hard reload-hacket) og en
mulig **fase-overgangs-bug** (se launch-blockers).

### Dashboards
✅ Graviditet mor (`DashboardPregnant`, 446 l.) · ✅ Graviditet far
(`DashboardPregnantFar`, 424 l.) · 🟡 Baby (`DashboardBaby`, 411 l.) — fælles for
begge roller, se fundet ovenfor.

### Graviditetsspor
✅ Stærkt udbygget: ugevisning (`PregnancyWeekPage` 666 l.), kalender/scanninger,
fødselsplan (`BirthPlanPage` 427 l.), veer-timer (`ContractionTimerPage` 360 l.),
gravid-dagbog, frugt-størrelser, check-in. Indholdet (uge-tekster) er bygget —
**men den faglige korrekthed er endnu ikke verificeret** (separat arbejdsspor).

### Babyspor
✅ Stort udbygget: `BarnPage` (1114 l. — appens største side), søvntracker
(`SovnPage` 990 l.) med live-tracking, dagbog (`DagbogPage` 696 l.), QuickLog,
udviklingskort, milepæls-tidslinje.

### Samarbejde & parforhold
✅ Overraskende rigt allerede: `TaskList` (636 l.), `CommandCenter` (553 l.),
`AppreciationCard` (anerkendelse), `PartnerHandoff`, `TeamStreak`, `NærværTips`,
`DagensSpørgsmål`, `UgensRecap`, `NeedsCard` (behovsdeling mor/far efter
arbejdstid). Meget af det, du efterspurgte — task management, mental load,
anerkendelse, kommunikation — har allerede et fundament. Det skal **reviewes og
poleres**, ikke bygges fra bunden.

### Chat / MELO AI
🟡 Bygget: `PregnancyChatPage` (495 l.) og `ChatBaby` (505 l.). Funktion og
kvalitet af AI-svar bør testes — og chat-svar er sundhedsindhold, så de hører
under den faglige gennemgang.

### Indhold
🟡 Uge-data, råd & guides, babynavne, udviklingsfaser er bygget. Bemærk: en del
fagligt indhold ligger **hardkodet i komponenterne** (fx `getWeekContent` i
`DashboardPregnantFar`), ikke samlet i `lib/phaseData.ts`. Det gør en faglig
gennemgang mere spredt — vi skal lede flere steder.

### Sekundære sider
✅ Indstillinger, ønskeliste, leg, privatliv, invitér partner. 🟡 `ShopPage`
(97 l.) er lille — afhænger af, hvad betalingsmodellen ender med.

---

## Launch-blockers — skal håndteres før launch

1. **Faglig korrekthed.** Alt sundhedsindhold (uger, kost, råd, chat) skal
   gennemgås mod WHO/Sundhedsstyrelsen — og helst signeres af en fagperson.
2. **Data & privatliv (GDPR).** Verificér at Supabase Row Level Security
   forhindrer, at én familie kan se en andens data. Helbredsdata om gravide er
   særligt følsomme personoplysninger.
3. **Fase-overgang.** Afklar/test: flyttes en bruger automatisk fra `pregnant`
   til `newborn`, når terminen passerer? Hvis ikke, sidder en nybagt forælder
   fast i graviditets-appen. Potentiel reel bug.
4. **Fix C** — ren login-adgang fra onboarding (hard reload-hacket).
5. **Designpolering** — typografi, farver, runding, luft, så appen ser 100%
   færdig ud.
6. **App Store-klargøring** — screenshots, butikstekster, privatlivspolitik,
   Apples App Privacy-label, aldersvurdering.
7. **Test på rigtig iOS-enhed** — denne audit fanger ikke runtime-fejl.

## Bør stages — vigtigt, men blokerer ikke launch

- **Baby-far-differentiering** — den reelle far-gevinst ligger her; kan launches
  som god v1 og forbedres.
- **Betalingsmodel** — appen virker uden; kan besluttes parallelt.
- **Animationer / uge-videoer** — assets kan ikke produceres her; data-mapping
  kan auditeres.
- **Onboarding-frafald (fix D)** — flyt evt. konto-oprettelsen tidligere.

---

## Anbefalet rækkefølge resten af ugen

1. Faglig indholdsgennemgang (størst risiko, længst leveringstid).
2. Designpolering (parallelt — rører ikke samme filer).
3. Launch-blockers: GDPR/RLS, fase-overgang, fix C.
4. App Store-klargøring.
5. Baby-far-differentiering, hvis tiden er der — ellers v1 + plan efter launch.
6. Betalingsmodel besluttes parallelt; behøver ikke være live på dag 1.
