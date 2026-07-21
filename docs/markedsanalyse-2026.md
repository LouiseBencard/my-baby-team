# Melo — markeds-, konkurrent- og målgruppeanalyse

*Udarbejdet juli 2026. Kilder er angivet nederst. Tal fra markedsrapporter er
indikatorer med stor spredning mellem analytikere — brug dem som
størrelsesordener, ikke facit.*

---

## 1. Markedet

### Globalt

Graviditets- og baby-app-markedet vokser stabilt. De mest citerede estimater
ligger i spændet **0,7–2,9 mia. USD (2025/2026)** med årlige vækstrater på
**9–18 % (CAGR)** frem mod 2030-2035. Spredningen skyldes forskellige
markedsdefinitioner (kun trackere vs. hele parenting-kategorien), men
retningen er entydig: markedet vokser, drevet af smartphone-penetration,
digitalisering af sundhed og AI-baserede funktioner.

To strukturelle skift er vigtigere end tallene:

**Privatliv er blevet kategoriens største slagmark.** Flo indgik FTC-forlig
i 2021 for at have delt graviditetsdata med Facebook og Google, betalte sig
ud af et gruppesøgsmål i juli 2025, og i august 2025 blev Meta kendt
ansvarlig af en jury for uautoriseret brug af menstruations- og
graviditetsdata. BabyCenter har været genstand for en Senats-undersøgelse,
og What to Expect kritiseres vedvarende for annonce-tyngde. Gravide er en af
de mest ad-targetede forbrugergrupper overhovedet — og bevidstheden om det
er eksploderet. **Melos ingen-annoncer + EU-hostet Supabase + GDPR-hærdet
RLS er ikke compliance-hygiejne; det er produktets skarpeste
differentiering.**

**Partneren er stadig en eftertanke.** Selv i 2026 er "dad-apps" enten
selvstændige nicheapps (Dads Journey, Father's Playbook, Daddy Up) eller
bolt-on-features i mor-centrerede apps. Analyser af feltet bemærker
eksplicit, at fædre-rettede oplevelser ser den stærkeste adoption, netop
fordi udbuddet er tyndt. Ingen af de store spillere har ægte
to-forældre-arkitektur, hvor begge forældre har hver sin fuldt designede
oplevelse, der er synkroniseret om det samme barn. Det har Melo. Positionen
er valideret og fortsat åben.

### Danmark (launch-marked)

- **59.443 fødsler i 2025** — en stigning på ~2.400 fra 2024, efter flere
  års fald. Fertiliteten steg fra 1,47 til 1,51.
- Årlig tilgang af nye "graviditets-husstande": **~58-60.000**. Med to
  forældre i flertallet af familier er den adresserbare personkreds
  **~110-115.000 nye forældre om året**.
- Melos fase-kontinuum (gravid → nyfødt → baby op til ~2 år) betyder at det
  aktive marked på ethvert tidspunkt er ca. tre årgange: **~170-180.000
  familier**.
- Dansk særtræk: næsten alle gravide følger det offentlige svangreomsorgs-
  forløb (jordemoder, sundhedsplejerske). Tillid til det offentlige system
  er høj — apps der *flugter* med SST-anbefalinger og taler samme sprog som
  sundhedsplejersken har en troværdighedsgenvej, som globale apps ikke kan
  kopiere.

**Realistisk regnestykke (konservativt):** Hvis Melo over 18 måneder når 8 %
af nye danske graviditeter (~4.800 familier/år) og konverterer 6 % til
familieabonnement à 299 kr/år, er det ~86 t.kr ARR fra årgang ét alene —
lille i sig selv, men hver årgang lægges oven på den forrige, og B2B-sporet
(kommuner, pension) er hvor skaleringen ligger. Se gtm-marketing-plan.md.

---

## 2. Konkurrentlandskab

### Matrix

| App | Styrke | Svaghed (= Melos åbning) | Model | Partner-oplevelse |
|---|---|---|---|---|
| **Preglife** (Nordics, 9 mio. downloads) | Markedsleder i Norden, dansk sprog, gratis kerne | Generisk indhold, partner er "gæst" i mors app, svensk afsender | Freemium ~349 kr/år | Bolt-on |
| **Min Graviditet** (SST/Sundhedsdatastyrelsen) | Officiel, gratis, høj tillid | Kun graviditet (stopper ved fødsel), institutionel tone, ingen samarbejdsværktøjer | Gratis (offentlig) | Delvis (partner kan følge med) |
| **Flo** | Enormt brand, cyklus-data | Privatlivs-skandaler, mor-centreret, dyr | Freemium ~250-450 kr/år | Ingen reel |
| **Pregnancy+** (Philips) | Flotte 3D-visuals, globalt | Annoncefinansieret, indhold ikke DK-tilpasset | Annoncer + premium | Bolt-on |
| **What to Expect / BabyCenter** | Indholdsdybde, community | Ad-tunge, US-centrerede anbefalinger, privatlivs-kritik | Annoncer | Ingen |
| **Peanut** | Social/community for mødre | Kun mødre, kun social | Freemium | Ingen |
| **Dad-apps** (Dads Journey m.fl.) | Taler til far | Isoleret fra mors oplevelse — to apps, nul sync | Freemium | Kun far |

### Melos positionering i én sætning

> **Den eneste app bygget til begge forældre fra dag ét — med dansk
> sundhedsfagligt indhold, uden annoncer og uden at sælge jeres data.**

Tre søjler, i prioriteret rækkefølge:

1. **To forældre, ét barn, én app.** Mor (clay-palet) og far/medforælder
   (sage-palet) har hver sin oplevelse — synkroniseret. Far-dashboardet er
   ikke en watered-down kopi; det har eget indhold (støt-mor-tips, vagter,
   missioner). Ingen konkurrent kan sige det.
2. **Privatliv som løfte, ikke småtekst.** Ingen annoncer, EU-data, GDPR-
   hærdet. Formuler det aktivt: *"Vi tjener penge på abonnementer — ikke på
   jeres data."* Flo-sagerne gør dette budskab konkret og forståeligt.
3. **Fagligt forankret i dansk svangreomsorg.** Indhold verificeret mod
   SST/SSI, jordemoder-sign-off undervejs. Min Graviditet stopper ved
   fødslen — Melo fortsætter gennem det underserverede "fjerde trimester"
   og barnets første år.

### Vigtigste konkurrent-trussel

**Preglife** er den reelle modstander i DK — samme freemium-model, nordisk,
etableret. Melo vinder ikke på volumen eller brand, men på (a) den ægte
to-forældre-arkitektur, (b) dansk-først faglighed og (c) privatlivsløftet.
**Min Graviditet** er ikke en trussel men en *rampe*: den normaliserer
app-brug i graviditeten og efterlader brugeren ved fødslen — præcis hvor
Melo tager over.

---

## 3. Målgruppeanalyse (DK)

### Primært segment: Førstegangsforældre-parret, 27-36 år

~45 % af fødsler er førstegangsfødende. Kendetegn: informationshungrende,
høj betalingsvillighed på alt baby-relateret, downloader 3-5 apps i
graviditeten og beholder 1-2. Beslutningstager for download er oftest den
gravide (uge 6-12, lige efter positiv test og igen efter nakkefoldsscanning
uge 12 — de to store download-vinduer). **Partneren onboardes via invite —
det er Melos indbyggede virale loop: hver aktiveret bruger nr. 1 rekrutterer
selv bruger nr. 2.**

*Jobs to be done:* "Forstå hvad der sker uge for uge" · "Føl mig tryg ved at
det vi gør er rigtigt" · "Få min partner med ind i det, så jeg ikke bærer
det alene."

### Sekundært segment: Partneren/faren, 28-38 år

Downloader sjældent selv en graviditetsapp — men *bliver inviteret*.
Aktiveres af konkret, handlingsanvisende indhold ("hvad gør jeg NU"),
ikke af fostrets størrelse i frugter. Melos far-dashboard (vagter,
missioner, støt-mor-tips) er designet præcis hertil. Marketingmæssigt nås
han bedst *gennem* mor ("send den her til din kæreste") og sekundært direkte
(fædre-grupper, sport/lifestyle-medier).

### Tertiære segmenter

- **Solo-forældre** ("Jeg er den fødende / Jeg er medforælder"-onboarding
  understøtter allerede dette). Vinkles med omhu — inklusion, ikke nødmodel.
- **Flergangsforældre**: lavere informationsbehov, men samarbejds- og
  logistikbehovet er *større* (søskende!). Task-/vagt-features er krogen.
- **Regnbue- og medmor-familier**: to-forælder-arkitekturen er kønsneutral i
  sin kerne ("den fødende"/"medforælder") — en stille styrke; fremhæv den.

### Betalingsvillighed

Danske forældre bruger typisk 30-70.000 kr på barnets første år. 299 kr/år
for ro, overblik og parsamarbejde er en afrundingsfejl i det budget —
*hvis* værdien er tydelig. Konvertering afgøres ikke af prisen men af om
premium-grænsen er lagt rigtigt (se gtm-marketing-plan.md §4).

---

## 4. Risici

| Risiko | Sandsynlighed | Afbødning |
|---|---|---|
| Preglife kopierer to-forældre-vinklen | Middel (12-18 mdr horisont) | Fart + dansk faglighed + brand. Arkitektur er svær at eftermontere |
| Min Graviditet udvides forbi fødslen | Lav (offentlig udviklingstakt) | Position som *supplement*, ikke konkurrent — evt. samarbejde |
| Apple/App Store-afvisning (sundhedsindhold) | Lav-middel | Jordemoder-sign-off + kilder synlige i appen + disclaimer |
| Lav konvertering til premium | Middel | Gratis-først-launch giver data før paywall lægges (se GTM-plan) |
| AI-chat giver forkert sundhedsråd | Lav men høj konsekvens | Guardrails, kildehenvisning, "kontakt jordemoder/læge ved..." — allerede i melo-indhold-skillens sikkerhedsregler |

---

## Kilder

- Danmarks Statistik: [Fødsler](https://www.dst.dk/da/Statistik/emner/borgere/befolkning/foedsler) · [DR: fødselstal stiger](https://www.dr.dk/nyheder/indland/udviklingen-er-vendt-nu-gaar-foedselstallet-igen-op) · [TV2, jan 2026](https://nyheder.tv2.dk/samfund/2026-01-23-efter-aar-med-indvandring-er-der-pludselig-kommet-flere-foedsler)
- Markedsstørrelse: [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/pregnancy-tracking-and-postpartum-care-apps-market) · [Grand View Research](https://www.grandviewresearch.com/industry-analysis/pregnancy-tracking-post-partum-care-apps-market-report) · [market.us](https://market.us/report/pregnancy-tracking-and-postpartum-care-apps-market/) · [SkyQuest](https://www.skyquestt.com/report/pregnancy-tracker-apps-market)
- Flo/privatliv: [FTC-forlig 2021](https://www.ftc.gov/news-events/news/press-releases/2021/01/developer-popular-womens-fertility-tracking-app-settles-ftc-allegations-it-misled-consumers-about) · [Class action-forlig 2025](https://topclassactions.com/lawsuit-settlements/open-lawsuit-settlements/59-5m-flo-data-sharing-class-action-settlement/) · [Frasco v. Flo Health](https://www.labaton.com/cases/frasco-v-flo-health-inc)
- Konkurrenter: [Preglife](https://preglife.com/) · [Min Graviditet (SST)](https://www.sst.dk/vidensbase/graviditet-og-smaaboern/graviditet/min-graviditet-app-til-gravide) · [Dad-app-landskab](https://adamosoft.com/blog/healthcare-software-development/pregnancy-app-for-dads/)
