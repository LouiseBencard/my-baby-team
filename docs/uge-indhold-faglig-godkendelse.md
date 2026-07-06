# Melo — fagligt sign-off af graviditetsindhold

**Dokumentets formål:** At samle ALT app-indhold om uge-for-uge-graviditet
ét sted, så en dansk jordemoder eller sundhedsplejerske kan gennemgå og
godkende det i én samlet seance.

**Hvordan du bruger det:** Læs igennem og marker direkte i dokumentet (eller
notér uge-numre/sektioner) hvad der bør ændres. Vi opdaterer derefter
`src/lib/pregnancyContent.ts`, som er den eneste kilde appen læser fra.

**Bemærk:** Standardvægte, -længder og udviklingsmilepæle er holdt op mod
standardembryologi og findes lignende i øvrige danske og internationale
gravid-apps. Det vigtigste at sætte din faglige vinkel på er:
care-pathway (afsnit A), framing af følsomme emner (afsnit C), og at det
matcher den vejledning, du selv ville give en gravid.

---

## A. Care-pathway — verificeret mod Sundhedsstyrelsen / SSI

Disse punkter er siden bekræftet mod officielle danske kilder og **rettet i
koden** før dette sign-off. Bekræft gerne, at det nu stemmer overens med jeres
praksis.

- ✅ **Børnevaccinationer.** Rettet til **DiTeKiPolHib ved 3, 5 og 12 måneder**
  + MFR ved 15 måneder (kilde: SSI / Sundhedsstyrelsen). Tidligere stod der
  fejlagtigt 2, 5, og 8–10 måneder.
- ✅ **Lægeundersøgelser hos egen læge.** Rettet til **5 uger, 5 måneder,
  12 måneder** (kilde: Sundhed.dk, Sundhedsstyrelsen).
- ✅ **D-vitamin til spædbarn.** Rettet fra "fra dag 1" til **"10 µg dagligt
  fra 2-ugers alderen og til 4 år"** (kilde: Sundhedsstyrelsen, 2020-opdatering).

Følgende er **stadig åbent** for din vurdering, fordi praksis varierer eller
ikke kunne afklares entydigt fra de officielle vejledninger alene:

- **GBS-test uge 36–37.** Appen nævner det som standard. Vi har forstået, at
  DK bruger risikobaseret tilgang. Skal det formuleres som "tilbydes ved
  risikofaktorer" eller udelades?
- **Sukkerbelastning (OGTT) uge 28.** Anført som standard for alle.
  Risikobaseret i DK — bekræft formulering.
- **36-ugers scanning.** Anført som standard. Universel i alle regioner?
- **Antal og timing af jordemodersamtaler.** Appens liste (uge 8, 12, 15,
  19, 25, 28, 30, 32, 36, 37, 39). Stemmer det med jeres region?
- **Lakrids-advarsel.** Vi har "lakrids: begrænses pga. glycyrrhizin" — er
  formuleringen god, eller skal den være mere/mindre kategorisk?

---

## B. Generelle anbefalinger (gælder hele graviditeten)

✅ = verificeret mod Sundhedsstyrelsen / Sundhed.dk.

- ✅ **Folsyre 400 µg/dag** fra graviditetsplanlægning og til og med uge 12
  (helst start 3 mdr før graviditet).
- ✅ **D-vitamin 10 µg/dag** hele graviditeten.
- ✅ **Jerntilskud fra uge 10** med 40–50 mg/dag (Sundhedsstyrelsen — eller
  efter blodprøvesvar).
- ✅ **Koffein:** maks. ca. 200 mg/dag (≈ 2 kopper kaffe).
- **Omega-3 / fed fisk 2 gange ugentligt** — vælg fortrinsvis laks, sild,
  makrel. Begræns store rovfisk (tun, sværdfisk) pga. kviksølv.
- **Calcium ~1000 mg/dag.**
- **Alkohol:** ingen mængde er sikker.
- **Lakrids:** begrænses pga. glycyrrhizin.
- **Undgå:** rå fisk, upasteuriseret ost, rå æg, lever og leverpostej (A-
  vitamin).

→ Marker hvis du vil ændre tal, formuleringer eller tilføje noget.

---

## C. Per-uge indhold (uge 5–40)

Hver uge har: hvad sker der med barnet · hvad sker der med mor · ugens
højdepunkt · 3 korte fakta · 3 kostpunkter · ét fokus til partner · hvilke
vitaminer der er aktive i appen denne uge.

### Trimester 1

#### Uge 5
- **Baby:** Embryoet er på størrelse med et sesamfrø. Neuralrøret begynder
  at danne sig — bliver senere til hjerne og rygsøjle.
- **Mor:** Store mængder HCG. Kvalme, træthed og ømme bryster kan være de
  første tegn.
- **Højdepunkt:** Hjertet begynder at dannes 💗
- **Fakta:** Neuralrøret dannes · Hjertet begynder at forme sig · På
  størrelse med et sesamfrø
- **Kost:** Folsyre 400 µg/dag · Ingen alkohol · Start D-vitamin 10 µg/dag
- **Partner:** Hun er mere træt end nogensinde — kroppen arbejder hårdt.
  Overtag aftensmaden.
- **Aktive vitaminer:** folsyre, D-vitamin

#### Uge 6
- **Baby:** Hjertet slår for første gang — ca. 100 slag/min. Øjne, ører og
  næse begynder at forme sig.
- **Mor:** Kvalmen topper morgen og aften. Tørkiks ved sengen. Små,
  hyppige måltider hjælper.
- **Højdepunkt:** Hjertet slår for første gang 💓
- **Fakta:** Hjertet slår ~100 slag/min · Ansigtstræk antydes · På
  størrelse med en linse
- **Kost:** Folsyre i grønne blade, linser, nødder · Syrlig mad mod
  morgenkvalme · Lidt og tit holder blodsukker stabilt
- **Partner:** Lugtesansen er skærpet dramatisk. Hold kraftig duft væk.
- **Aktive vitaminer:** folsyre, D-vitamin

#### Uge 7
- **Baby:** Embryoet er på størrelse med et blåbær. Hjernen vokser hurtigt
  — mange nye nerveforbindelser dagligt.
- **Mor:** Livmoderen er ca. dobbelt så stor som normalt. Tryk i bækkenet.
- **Højdepunkt:** Hjernen vokser hurtigt 🧠
- **Fakta:** Hjernen udvikler sig hurtigt · Ansigtstræk antydes · På
  størrelse med et blåbær
- **Kost:** Folsyre fortsat dagligt · 1,5–2 l vand · Små portioner protein
- **Partner:** Book første jordemoder-samtale denne uge.
- **Aktive vitaminer:** folsyre, D-vitamin

#### Uge 8
- **Baby:** Alle vitale organer er anlagt. Baby har fingre — med svømmehud,
  der langsomt forsvinder.
- **Mor:** Forværret kvalme uge 8–10 er almindeligt — tegn på højt HCG,
  altså et godt tegn.
- **Højdepunkt:** Alle organer er anlagt ✅
- **Fakta:** Vitale organer anlagt · Fingre og tæer formes · Ca. 1,6 cm
- **Kost:** Folsyre kritisk til uge 12 · Calcium fra mejeri · Undgå lever
  og leverpostej (A-vitamin)
- **Partner:** Første scanning nærmer sig — vær med.
- **Aktive vitaminer:** folsyre, D-vitamin

#### Uge 9
- **Baby:** Kaldes nu et foster. Halen er væk. Baby kan sluge og sparke.
- **Mor:** Bækkenbunden bærer på ekstra vægt. Start blide
  bækkenbundsøvelser.
- **Højdepunkt:** Fosterstadiet begynder 🌱
- **Fakta:** Embryoet bliver til foster · Baby kan sluge og sparke · Halen
  er væk
- **Kost:** Omega-3 fra fed fisk · Calcium + D-vitamin · Bær mod
  cellestress
- **Partner:** Spørg ind til kvalme og energi — lyt frem for at løse.
- **Aktive vitaminer:** folsyre, D-vitamin

#### Uge 10
- **Baby:** På størrelse med en oliven og kan bøje armene. Fingernegle
  spirer.
- **Mor:** Blodvolumen stiger. Svimmelhed og hjertebanken kan opstå.
- **Højdepunkt:** Baby kan bøje armene 💪
- **Fakta:** Baby kan bøje og strække armene · Fingernegle begynder ·
  Blodvolumen stiger
- **Kost:** Jern bliver vigtigt nu · C-vitamin øger jernoptag · Fuldkorn
  mod forstoppelse
- **Partner:** Undersøg barselsrettigheder og dagpenge.
- **Aktive vitaminer:** folsyre, D-vitamin, jern

#### Uge 11
- **Baby:** Knogler begynder at hærde. Fingre er adskilte. Kønsorganer
  dannes.
- **Mor:** Kvalmen aftager for mange. Energien vender tilbage.
- **Højdepunkt:** Knogler begynder at hærde 🦴
- **Fakta:** Knogler hærder · Fingre og tæer adskilte · Nyrer producerer
  urin
- **Kost:** Fibre mod forstoppelse · Grønne grøntsager (folsyre + jern +
  calcium) · 1,5–2 l vand
- **Partner:** Book nakkefoldsscanning hvis I ønsker den.
- **Aktive vitaminer:** folsyre, D-vitamin, jern

#### Uge 12
- **Baby:** Ca. 5 cm lang. Kan åbne munden og strække fingrene. Nyrerne
  fungerer.
- **Mor:** 1. trimester slutter. Risikoen for spontan abort falder
  markant.
- **Højdepunkt:** 1. trimester overstået 🎉
- **Fakta:** 1. trimester overstået · Baby ca. 5 cm · Baby kan åbne
  munden
- **Kost:** Jern stiger i vigtighed · Calcium ~1000 mg/dag · Undgå rå
  fisk, upasteuriseret ost og rå æg
- **Partner:** Nakkefoldsscanning denne uge — vær med.
- **Aktive vitaminer:** folsyre, D-vitamin, jern, calcium

### Trimester 2

#### Uge 13
- **Baby:** Fingeraftryk dannes. Ansigtet er fuldt formet. Baby suger på
  tommelfingeren.
- **Mor:** Maven begynder at vise sig. Energien vender for mange tilbage.
- **Højdepunkt:** Fingeraftryk dannes 👆
- **Fakta:** Unikke fingeraftryk · Baby suger på tommel · Energi vender
  tilbage
- **Kost:** Jern og protein dagligt · Fed fisk 1–2 gange ugentligt · Fortsat
  folsyre
- **Partner:** Tal om jeres forventninger til hinanden som forældre.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 14
- **Baby:** Vejrtrækningsbevægelser og synkerefleks øves i fostervandet.
- **Mor:** Livmoderen er nu over skambenet. Let pres oppefra.
- **Højdepunkt:** Baby øver at trække vejret 🫁
- **Fakta:** Baby øver vejrtrækning · Synkerefleks trænes · Livmoderen
  rejser sig
- **Kost:** Bær + C-vitamin øger jernoptag · Nødder og frø · Rigeligt
  vand
- **Partner:** Undersøg fødesteder sammen.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 15
- **Baby:** Kan høre lyde udefra. Baby genkender din stemme efter
  fødslen.
- **Mor:** Stikkende smerter i siden (rund-ligament-smerter) er normale.
- **Højdepunkt:** Baby kan høre din stemme 👂
- **Fakta:** Baby hører udefra · Ligament-smerter normale · Hørelsen
  skærpes
- **Kost:** Fed fisk 2 gange/uge · Grønne blade (jern + folsyre) ·
  Bælgfrugter
- **Partner:** Begynd at tale til maven — baby kender din stemme ved
  fødslen.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 16
- **Baby:** Avocado-størrelse. Muskler og knogler vokser hurtigt. Øjnene
  bevæger sig.
- **Mor:** Første forsigtige spark — som sommerfugleflagren.
- **Højdepunkt:** Første spark mærkes måske 🦋
- **Fakta:** Første spark · Muskler og knogler vokser · Øjnene bevæger
  sig
- **Kost:** Jern til blodlegemer · Calcium til knoglehærdning ·
  Komplekse kulhydrater for stabil energi
- **Partner:** Læg hånden på maven dagligt.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 17
- **Baby:** Lanugo-dun dækker huden. Fedtlag begynder at dannes.
- **Mor:** Rygsmerter er almindelige. Gravid-pude om natten hjælper.
- **Højdepunkt:** Lanugo-dun dækker kroppen 🌫️
- **Fakta:** Lanugo-dun · Fedtlag begynder · Rygsmerter almindelige
- **Kost:** Omega-3 + E-vitamin · Mandler og solsikkefrø · Rigeligt vand
- **Partner:** Overtag tunge huslige opgaver.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 18
- **Baby:** Kan gabe, strække sig, sparke. Knogler synlige på scanning.
- **Mor:** Maveblodkar udvider sig — svimmelhed ved hurtig rejsen er
  normal.
- **Højdepunkt:** Baby strækker og sparker 🤸
- **Fakta:** Baby strækker sig · Knogler synlige på scanning · Blodkar
  udvider sig
- **Kost:** Jerntilskud (40–50 mg/dag) som anbefalet · C-vitamin til jern
  · Fuldkorn for B-vitamin
- **Partner:** Tilmeld fødselsforberedelseskursus nu.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 19
- **Baby:** Sanserne udvikles hurtigt. Hjernens sensoriske centre
  aktiveres.
- **Mor:** Tæt på halvvejs. Mærkbare spark for de fleste.
- **Højdepunkt:** Alle sanser aktiveres ✨
- **Fakta:** Alle sanser aktive · Sensoriske centre arbejder · Spark
  mærkes
- **Kost:** Protein til vækst · Calcium + D-vitamin til knogler · Fibre
  mod forstoppelse
- **Partner:** Lav indkøbs- og forberedelsesliste fordelt over måneder.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 20
- **Baby:** Ca. 25 cm (isse-hæl). 20-ugers scanningen viser alt. *Bemærk:
  målet skifter fra isse-sæde til isse-hæl her — derfor stiger 'længden'
  pludselig. Dette forklares for brugeren i appen.*
- **Mor:** HALVVEJS! Maven tydelig. Strækmærker kan begynde — fugtig hud
  hjælper.
- **Højdepunkt:** HALVVEJS — 20 uger 🎉
- **Fakta:** Halvvejs · 20-ugers misdannelsesscanning · Baby ca. 25 cm
- **Kost:** DHA omega-3 til hjerne · Magnesium mod kramper · 2–2,5 l vand
- **Partner:** Fejr halvvejs ordentligt.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 21
- **Baby:** Egne søvncyklusser. Kan smage fostervandet.
- **Mor:** Fordøjelsen sænkes. Forstoppelse og halsbrand er almindelige.
- **Højdepunkt:** Baby har egne søvncyklusser 💤
- **Fakta:** Egne søvncyklusser · Baby kan smage · Forstoppelse normal
- **Kost:** Jod fra mejeri/fisk (skjoldbruskkirtel) · Protein og jern ·
  Bær og citrus
- **Partner:** Sæt gang i babyværelset sammen.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 22
- **Baby:** Læber og øjenbryn fuldt formede. Reagerer på høje lyde.
- **Mor:** Braxton Hicks (øve-veer) kan starte — uregelmæssige, smertefrie.
- **Højdepunkt:** Baby reagerer på høje lyde 🔊
- **Fakta:** Læber og øjenbryn formede · Baby reagerer på lyde ·
  Øve-veer kan starte
- **Kost:** Komplekse kulhydrater for blodsukker · DHA fra fed fisk eller
  algeolie · Avocado og nødder
- **Partner:** Spørg "hvad har du brug for?" frem for at løse.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 23
- **Baby:** Huden er stadig rynket — fedtlaget ikke fyldt. Lungerne
  modner.
- **Mor:** Øget svedtendens — blodvolumen +40%.
- **Højdepunkt:** Blodvolumen +40% ❤️
- **Fakta:** Lungerne modner · Blodvolumen +40% · Hud stadig rynket
- **Kost:** Jern og protein · Kikærter og linser · C-vitamin med jern
- **Partner:** Tjek arbejdsgiverens opsigelsesregler ved barselsstart.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 24
- **Baby:** Levedygtigheden stiger gradvist fra denne tid og frem — *ikke
  en fast dato.* Mange ekstremt for tidligt fødte børn omkring uge 24 kan
  overleve med intensiv pleje, men det er individuelt.
- **Mor:** Bækkenbund under stigende pres. Bækkenbundsøvelser: 3 × 10
  dagligt.
- **Højdepunkt:** Levedygtighedstærsklen — gradvis 🌱
- **Fakta:** Levedygtighed stiger gradvist · Bækkenbund presset ·
  Lungerne fortsætter udvikling
- **Kost:** Calcium ~1000 mg · D-vitamin støtter calciumoptag · Fibre mod
  forstoppelse
- **Partner:** Tal om fødselsplan: ønsker, smertelindring, musik.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 25
- **Baby:** Ca. 700 g. Unikke hånd- og fodlinjer.
- **Mor:** Øget sparkaktivitet efter måltider.
- **Højdepunkt:** Unikke håndlinjer dannes ✋
- **Fakta:** Unikke håndlinjer · Baby reagerer på blodsukker · Vejer
  ~700 g
- **Kost:** Jern og protein · Fed fisk 2x/uge · Stabilt blodsukker
- **Partner:** Frys 10–15 portioner mad ned til barslen.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 26
- **Baby:** Øjnene åbner sig for første gang. Lys og mørke skelnes.
- **Mor:** Søvnbesvær. Sov på venstre side.
- **Højdepunkt:** Baby åbner øjnene 👀
- **Fakta:** Øjnene åbner · Lys og mørke skelnes · Sov på venstre side
- **Kost:** Vitamin K fra grønne blade · DHA fortsat · Hydrering
- **Partner:** Massér ryg og ben dagligt.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 27
- **Baby:** Hjernebarken folder sig (gyri). REM-søvn aktiv.
- **Mor:** 3. trimester snart. Tyngdefølelse, hyppig vandladning, åndenød.
- **Højdepunkt:** Baby drømmer måske 🌙
- **Fakta:** Hjernebarken folder · REM-søvn aktiv · 3. trimester snart
- **Kost:** Jern og protein · Fed fisk 2x/uge · Mindre, hyppigere
  måltider
- **Partner:** Aftal besøgskarantæne de første dage hjemme — jeres valg.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

### Trimester 3

#### Uge 28
- **Baby:** 3. trimester. Ca. 1 kg. Huden glatter ud.
- **Mor:** Bækkenløsning kan give smerter — tag seriøst.
- **Højdepunkt:** 3. TRIMESTER 🏁
- **Fakta:** 3. trimester · Baby ~1 kg · Bækkenløsning kan smerte
- **Kost:** Vitamin K · Calcium til knoglemineralisering · Fibre og vand
- **Partner:** Ved evt. sukkerbelastning: kør hende derhen.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 29
- **Baby:** Kan styre egen kropstemperatur. Muskelmasse og knogletæthed
  stiger.
- **Mor:** Tungt åndedræt — diafragma presses.
- **Højdepunkt:** Baby styrer kropstemperaturen 🌡️
- **Fakta:** Egen temperaturregulering · Muskelmasse stiger ·
  Åndedrættet tungt
- **Kost:** DHA omega-3 · Protein til 200 g/uge vækst · Jern-niveau med
  jordemoder
- **Partner:** Forbered de første uger hjemme — sæt grænser med familie.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 30
- **Baby:** Ca. 40 cm, 1,3 kg. Hjernen vokser eksplosivt.
- **Mor:** Rygsmerter på sit højeste. Fysioterapi og vandgymnastik er
  effektivt.
- **Højdepunkt:** Hjernen vokser eksplosivt 🧠
- **Fakta:** Hjernen vokser · Baby ~40 cm · Rygsmerter topper
- **Kost:** DHA fortsat · Calcium + D-vitamin højt · Magnesium mod
  kramper
- **Partner:** Lær tegn på for tidlig fødsel — og plan hvis det sker.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 31
- **Baby:** Vender sig med hovedet nedad. Alle organer funktionelle.
- **Mor:** Søvnen er svær. U-pude, hævet hoved, ingen skærme efter 21.
- **Højdepunkt:** Baby drejer hovedet nedad 🔄
- **Fakta:** Baby vender hovedet ned · Organer funktionelle · Søvn svær
- **Kost:** Omega-3 · Plantejern + C-vitamin · Calcium højt behov
- **Partner:** Tag logistikken — søskende/dyr, bilen, alt det praktiske.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 32
- **Baby:** Øver åndedræt intensivt. Fingre og tæer fuldt udviklede.
- **Mor:** Braxton Hicks intensiveres. Lær forskel på øve-veer og rigtige
  veer.
- **Højdepunkt:** Hospitalstasken pakkes 🧳
- **Fakta:** Åndedræt øves intensivt · Fingernegle fuldt formede · Lær
  veer-forskellen
- **Kost:** Jern stadig vigtigt · Små, hyppige måltider · Omega-3
- **Partner:** Pak hospitalstasken — begges.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 33
- **Baby:** Knoglerne er fuldt hærdede — undtagen kraniet.
- **Mor:** Råmælk (colostrum) kan begynde at dannes.
- **Højdepunkt:** Råmælk begynder 🤱
- **Fakta:** Knogler hærdede (ikke kraniet) · Råmælk kan dannes · Baby
  vokser fortsat
- **Kost:** Protein og jern · Calcium + D-vitamin · Fibre mod
  forstoppelse
- **Partner:** Kør ruten til hospitalet en gang. Find parkeringen.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 34
- **Baby:** CNS og immunforsvaret modnes. Øjnene fokuserer.
- **Mor:** Bækkenbunden bærer 10+ kg ekstra. Let inkontinens almindeligt.
- **Højdepunkt:** Immunforsvaret modnes 🛡️
- **Fakta:** CNS og immunforsvar modner · Øjne fokuserer · Inkontinens
  normal
- **Kost:** C-vitamin styrker bindevæv · Fed fisk · Rigeligt vand —
  dehydrering kan udløse veer
- **Partner:** Gennemgå fødselsplanen med jordemoderen.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 35
- **Baby:** Fylder næsten hele livmoderen. Bevægelser føles anderledes.
- **Mor:** Lysning kan starte — maven 'falder' nedad. Lettere åndedræt,
  mere blæretryk.
- **Højdepunkt:** Maven falder — lysning ⬇️
- **Fakta:** Plads er knap · Lysning kan starte · Mere blæretryk
- **Kost:** Små portioner · Protein · Jern-tjek hos læge/jordemoder
- **Partner:** Vær fysisk tilgængelig — det kan gå hurtigt fra nu af.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 36
- **Baby:** Stort set fuldt udviklet. Vægten øges. Lanugo forsvinder.
- **Mor:** Sidste scanninger og samtaler i mange forløb — tjek babys
  position med jordemoder.
- **Højdepunkt:** Stort set fuldt udviklet ✅
- **Fakta:** Stort set fuldt udviklet · Vægten øges · Lanugo forsvinder
- **Kost:** Små portioner · Protein · Jern bør tjekkes — forebyg anæmi
- **Partner:** Tjek: autostol, vugge, vasket tøj, bleer, våde klude.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 37
- **Baby:** Baby er fuldbåren (term). De fleste babyer er klar til at
  fødes nu, men nogle har stadig brug for ekstra støtte — særligt med
  vejrtrækning. Vægt typisk 2,8–3,2 kg.
- **Mor:** Livmoderhalsen kan begynde at modne. Slimproppen kan afgå
  (brunlig/rosa slim).
- **Højdepunkt:** Fuldbåren — baby er term 🏆
- **Fakta:** Fuldbåren · Slimprop kan afgå · Vægt 2,8–3,2 kg
- **Kost:** Lette, små måltider · Hydrering · Jern og protein
- **Partner:** Sov. Tank energi. Fødslen kræver udholdenhed.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 38
- **Baby:** Producerer surfaktant der modner lungerne yderligere.
- **Mor:** Veer kan starte. Følg jordemoders konkrete råd om hvornår I
  kontakter fødestedet.
- **Højdepunkt:** Lungerne er klar 🫁
- **Fakta:** Surfaktant modner lungerne · Veer kan starte · Følg
  jordemoders veer-vejledning
- **Kost:** Stabilt blodsukker · Hydrering · Jern og protein
- **Partner:** Sov med telefonen på lyd. Hav nat-plan.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 39
- **Baby:** Typisk omkring 50 cm. Vernix-voks beskytter huden.
- **Mor:** Træthed og uro. Mange har rastløs energi dagene før fødsel.
- **Højdepunkt:** Fødslen er nær 🌅
- **Fakta:** Ca. 50 cm · Vernix beskytter huden · Rastløs energi normal
- **Kost:** Lette måltider · Hydrering · Grønne grøntsager og bælgfrugter
- **Partner:** Vær til stede. Intet andet.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

#### Uge 40
- **Baby:** Termin. Vejer typisk 3,0–3,5 kg, 50–52 cm.
- **Mor:** Termin er gennemsnitsdato — ca. halvdelen føder efter.
  Igangsættelse tilbydes typisk uge 41–42.
- **Højdepunkt:** TERMIN — I er klar 🎉
- **Fakta:** Termin · Halvdelen føder efter termin · Igangsættelse uge
  41–42
- **Kost:** Hydrering · Lette måltider · Vedligehold jern og protein
- **Partner:** Hold telefonen opladet. Vær rolig.
- **Aktive vitaminer:** D-vitamin, jern, omega-3, calcium

---

## D. Symptomer, partner-hjælp, røde flag og forberedelse (pr. trimester)

### Trimester 1 (uge 0–12)
- **Typiske symptomer:** Kraftig træthed · Kvalme og opkastninger · Ømme
  bryster · Stemningsudsving · Hyppig vandladning.
- **Partner-hjælp:** Tag over med madlavning (undgå stærke dufte) · Lad
  hende hvile uden skyld · Spørg konkret ind · Vær tålmodig med
  stemningsudsving · Tag med til scanninger.
- **Røde flag — kontakt jordemoder/læge:** Kraftig blødning (mere end let
  pletblødning) · Stærke vedvarende mavesmerter · Feber over 38°C ·
  Vedvarende voldsom opkastning hvor du ikke kan holde væske inde.
- **Forberedelse:** Bookning af jordemoder · Fortæl arbejdsgiver, når du
  er klar · Undersøg rettigheder til fædre-/medforælder-orlov.

### Trimester 2 (uge 13–27)
- **Typiske symptomer:** Energien vender for mange tilbage · Tydeligt
  bulnende mave · Rygsmerter og ligament-smerter · Halsbrand · Hævede
  ankler og fødder · Første spark.
- **Partner-hjælp:** Læg hånden på maven · Massér ryggen · Tag styring
  på indkøb og madplaner · Tal til maven · Sæt benene op for hende.
- **Røde flag — kontakt jordemoder/læge:** Nedsat liv (færre eller
  svagere spark end vanligt fra ~uge 22) · Kraftig blødning · Stærk
  vedvarende hovedpine, synsforstyrrelser eller pludselige hævelser ·
  Stærke regelmæssige sammentrækninger · Vandafgang før uge 37 · Feber
  over 38°C.
- **Forberedelse:** Tilmeld fødselsforberedelseskursus · Start samtale
  om navne · Budget og plan for første år · Køb det vigtigste babygrej.

### Trimester 3 (uge 28–40)
- **Typiske symptomer:** Træthed vender tilbage · Åndedrætsbesvær ·
  Bækken- og rygsmerter · Søvnproblemer · Braxton Hicks · Let
  inkontinens (almindeligt og normalt).
- **Partner-hjælp:** Tag tunge løft og bøjning · Pak hospitalstasken ·
  Lær reel fødsel vs. øve-veer · Hav veer-timer klar · Vær fysisk
  tilgængelig.
- **Røde flag — kontakt jordemoder/læge:** Mærkbart nedsat liv hos
  barnet · Kraftig blødning · Vandafgang før uge 37 · Stærk hovedpine,
  synsforstyrrelser, pludselige hævelser · Stærke vedvarende
  mavesmerter · Feber over 38°C · Stærk kløe (særligt om natten på
  hænder og fødder).
- **Forberedelse:** Pak hospitalstasken · Installer autostol · Frys mad
  ned · Aftal pasning af søskende/dyr · Kør ruten til hospitalet.

---

## Sign-off

Når du har gennemgået dokumentet:

- [ ] Afsnit A — care-pathway er bekræftet eller rettet
- [ ] Afsnit B — generelle anbefalinger er bekræftet
- [ ] Afsnit C — per-uge indhold er gennemgået (markeret med kommentarer
      hvor det skal ændres)
- [ ] Afsnit D — symptomer, røde flag og forberedelse er bekræftet
- [ ] Eventuelle bemærkninger nedenfor

**Sign-off:** ________________________  **Dato:** ____________
**Titel:** ________________________ (jordemoder / sundhedsplejerske)

**Bemærkninger:**


