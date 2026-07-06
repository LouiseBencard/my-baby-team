/**
 * pregnancyContent.ts — SINGLE SOURCE OF TRUTH for week-by-week pregnancy content.
 *
 * Hvorfor denne fil findes:
 *   Indtil nu har det samme uge-indhold ligget duplikeret i fem filer
 *   (phaseData, PregnancyWeekPage, DashboardPregnant, DashboardPregnantFar,
 *   BarnPage, WeekUnlockModal) og var allerede begyndt at drive fra hinanden.
 *   Det gjorde fagligt sign-off umuligt at lave ét sted.
 *
 *   Alt fagligt uge-indhold samles HER. Når en jordemoder/sundhedsplejerske har
 *   godkendt det, rettes komponenterne én ad gangen til at læse fra denne fil.
 *
 * Følger Sundhedsstyrelsens anbefalinger og standard-embryologi.
 * Care-pathway (vaccinationer, screening, jordemodersamtaler) ligger separat
 * i phaseData.ts og dækkes af sign-off-dokumentet i docs/.
 */

export type Vitamin = "folsyre" | "d-vitamin" | "jern" | "omega-3" | "calcium";

export interface WeekContent {
  week: number;
  trimester: 1 | 2 | 3;
  babyDev: string;        // hvad sker der med barnet
  motherBody: string;     // hvad sker der med mors krop
  highlight: string;      // kort ugens vigtigste begivenhed
  highlightEmoji: string;
  facts: string[];        // 3 korte bullets til kort-visning
  nutrition: { icon: string; text: string }[];  // 2–3 kostpunkter
  partnerFocus: string;   // kort fokus til partner denne uge
  activeVitamins: Vitamin[];
}

export interface TrimesterContent {
  herSymptoms: string[];      // typiske oplevelser i kroppen
  partnerHelpTips: string[];  // konkrete handlinger til partner
  redFlags: string[];         // ring til jordemoder ved disse symptomer
  preparation: string[];      // praktiske ting at få gjort
}

// ──────────────────────────────────────────────────────────────────────────────
// PER-UGE INDHOLD (uge 5–40)
// ──────────────────────────────────────────────────────────────────────────────

export const pregnancyWeeks: Record<number, WeekContent> = {
  5: {
    week: 5, trimester: 1,
    babyDev: "Embryoet er på størrelse med et sesamfrø. Neuralrøret begynder at danne sig — bliver senere til hjerne og rygsøjle.",
    motherBody: "Du producerer nu store mængder HCG. Kvalme, træthed og ømme bryster kan være de første tegn.",
    highlight: "Hjertet begynder at dannes",
    highlightEmoji: "💗",
    facts: ["Neuralrøret dannes — bliver til hjerne og rygsøjle", "Hjertet begynder at forme sig", "Embryoet er på størrelse med et sesamfrø"],
    nutrition: [
      { icon: "🥦", text: "Folsyre (400 µg/dag) er kritisk — beskytter neuralrøret" },
      { icon: "🚫", text: "Undgå alkohol fuldstændigt — ingen mængde er sikker" },
      { icon: "💊", text: "Start D-vitamin (10 µg/dag) med det samme" },
    ],
    partnerFocus: "Hun er mere træt end nogensinde — ikke fordi hun vil. Kroppen arbejder hårdt. Overtag aftensmaden.",
    activeVitamins: ["folsyre", "d-vitamin"],
  },
  6: {
    week: 6, trimester: 1,
    babyDev: "Hjertet slår for første gang — ca. 100 slag i minuttet. Øjne, ører og næse begynder at forme sig.",
    motherBody: "Kvalmen topper typisk morgen og aften. Sæt tørkiks ved sengen. Små, hyppige måltider hjælper.",
    highlight: "Hjertet slår for første gang",
    highlightEmoji: "💓",
    facts: ["Hjertet slår — ca. 100 slag/min", "Øjne, ører og næse begynder at forme sig", "Embryoet er på størrelse med en linse"],
    nutrition: [
      { icon: "🥦", text: "Folsyre: grønne blade, linser og nødder dagligt" },
      { icon: "🍋", text: "Syrlig mad og kolde drikke kan lindre morgenkvalme" },
      { icon: "🫚", text: "Spis lidt og tit — holder blodsukkeret stabilt" },
    ],
    partnerFocus: "Lugtesansen er skærpet dramatisk. Hold kraftigt duftende sæbe, stearinlys og mad væk.",
    activeVitamins: ["folsyre", "d-vitamin"],
  },
  7: {
    week: 7, trimester: 1,
    babyDev: "Embryoet er på størrelse med et blåbær. Hjernen vokser hurtigt — mange nye nerveforbindelser dannes dagligt.",
    motherBody: "Livmoderen er nu ca. dobbelt så stor som normalt. Du kan mærke tryk i bækkenet.",
    highlight: "Hjernen vokser hurtigt",
    highlightEmoji: "🧠",
    facts: ["Hjernen udvikler sig hurtigt", "Ansigtstræk begynder at antydes", "Embryoet er på størrelse med et blåbær"],
    nutrition: [
      { icon: "🥦", text: "Folsyre stadig den vigtigste — fortsæt dagligt" },
      { icon: "💧", text: "1,5–2 liter vand dagligt — hjælper også mod kvalme" },
      { icon: "🥜", text: "Små portioner protein holder energien stabil" },
    ],
    partnerFocus: "Book første jordemoder-samtale, hvis I ikke har gjort det. Det er din opgave denne uge.",
    activeVitamins: ["folsyre", "d-vitamin"],
  },
  8: {
    week: 8, trimester: 1,
    babyDev: "Alle vitale organer er anlagt. Baby har nu fingre — med svømmehud, der langsomt forsvinder.",
    motherBody: "Mange oplever forværret kvalme uge 8–10. Det er et tegn på, at HCG er højt — altså et godt tegn.",
    highlight: "Alle organer er anlagt",
    highlightEmoji: "✅",
    facts: ["Alle vitale organer er anlagt", "Fingre og tæer formes — stadig med svømmehud", "Embryoet er ca. 1,6 cm"],
    nutrition: [
      { icon: "🥦", text: "Folsyre kritisk frem til uge 12" },
      { icon: "🥛", text: "Calcium fra mejeriprodukter — babys knogler dannes nu" },
      { icon: "🚫", text: "Undgå lever og leverpostej — for høj A-vitamin" },
    ],
    partnerFocus: "Første scanning nærmer sig. Vær med — det er jeres første fælles oplevelse af barnet.",
    activeVitamins: ["folsyre", "d-vitamin"],
  },
  9: {
    week: 9, trimester: 1,
    babyDev: "Baby kaldes nu et foster. Halen er væk. Baby kan sluge og sparke — du mærker det bare ikke endnu.",
    motherBody: "Bækkenbunden bærer på ekstra vægt. Start blide bækkenbundsøvelser allerede nu.",
    highlight: "Fosterstadiet begynder",
    highlightEmoji: "🌱",
    facts: ["Embryoet kaldes nu et foster", "Baby kan sluge og sparke", "Halen er væk — ligner mere et lille menneske"],
    nutrition: [
      { icon: "🐟", text: "Omega-3 fra fed fisk støtter babys hjerneudvikling" },
      { icon: "🥛", text: "Calcium og D-vitamin til den begyndende knogledannelse" },
      { icon: "🫐", text: "Bær og C-vitamin beskytter mod cellestress" },
    ],
    partnerFocus: "Spørg ind til kvalme og energi uden at komme med løsninger. Lyt og anerkend.",
    activeVitamins: ["folsyre", "d-vitamin"],
  },
  10: {
    week: 10, trimester: 1,
    babyDev: "Baby er på størrelse med en oliven og kan bøje armene. Fingernegle begynder at dannes.",
    motherBody: "Blodvolumen stiger. Du kan opleve svimmelhed og hjertebanken — det er normalt.",
    highlight: "Baby kan bøje armene",
    highlightEmoji: "💪",
    facts: ["Baby kan bøje og strække armene", "Fingernegle begynder at spire", "Blodvolumen stiger hos mor"],
    nutrition: [
      { icon: "🥩", text: "Jern bliver vigtigt nu — blodvolumen stiger" },
      { icon: "🍊", text: "C-vitamin øger optaget af jern fra plantekilder" },
      { icon: "🌾", text: "Fuldkorn giver langsom energi og forebygger forstoppelse" },
    ],
    partnerFocus: "Undersøg jeres rettigheder til barselsorlov og dagpenge nu — det tager tid.",
    activeVitamins: ["folsyre", "d-vitamin", "jern"],
  },
  11: {
    week: 11, trimester: 1,
    babyDev: "Babys knogler begynder at hærde. Fingrene er ikke længere sammenvoksede. Kønsorganerne dannes.",
    motherBody: "Kvalmen begynder at aftage for mange. Energien vender langsomt tilbage.",
    highlight: "Knogler begynder at hærde",
    highlightEmoji: "🦴",
    facts: ["Knogler begynder at hærde", "Fingre og tæer er adskilte", "Nyrerne producerer urin"],
    nutrition: [
      { icon: "🌾", text: "Fibre fra havregryn og grøntsager forebygger forstoppelse" },
      { icon: "🥦", text: "Grønne grøntsager: folsyre, jern og calcium på én gang" },
      { icon: "💧", text: "1,5–2 liter vand dagligt — hyppig vandladning er normalt" },
    ],
    partnerFocus: "Book nakkefoldsscanning (uge 11–14) nu, hvis I ønsker den.",
    activeVitamins: ["folsyre", "d-vitamin", "jern"],
  },
  12: {
    week: 12, trimester: 1,
    babyDev: "Baby er nu ca. 5 cm lang — og kan åbne munden og strække fingrene. Nyrerne fungerer.",
    motherBody: "1. trimester slutter! Risikoen for spontan abort falder markant. Mange fortæller nyheden nu.",
    highlight: "1. trimester overstået",
    highlightEmoji: "🎉",
    facts: ["1. trimester er overstået", "Baby er ca. 5 cm lang", "Baby kan åbne munden og strække fingrene"],
    nutrition: [
      { icon: "🥩", text: "Jern stiger i vigtighed — din blodmasse øges hurtigt" },
      { icon: "🥛", text: "Calcium ~1000 mg/dag — babys skelet begynder at hærde" },
      { icon: "🚫", text: "Undgå rå fisk, upasteuriseret ost og rå æg" },
    ],
    partnerFocus: "Nakkefoldsscanningen er denne uge. Tag fri og vær med.",
    activeVitamins: ["folsyre", "d-vitamin", "jern", "calcium"],
  },
  13: {
    week: 13, trimester: 2,
    babyDev: "Baby har fingeraftryk. Ansigtet er fuldt formet. Baby kan suge på tommelfingeren.",
    motherBody: "Maven begynder at vise sig. Mange oplever øget energi i 2. trimester.",
    highlight: "Fingeraftryk dannes",
    highlightEmoji: "👆",
    facts: ["Unikke fingeraftryk dannes", "Baby kan suge på tommelfingeren", "Energi vender for mange tilbage"],
    nutrition: [
      { icon: "🥩", text: "Fortsæt jern og protein dagligt" },
      { icon: "🐟", text: "Fed fisk 1–2 gange ugentligt — vælg laks, sild, makrel" },
      { icon: "🥦", text: "Stadig folsyre fra grønne blade og bælgfrugter" },
    ],
    partnerFocus: "Tal om jeres forventninger til hinanden som forældre — det er lettere nu end efter fødslen.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  14: {
    week: 14, trimester: 2,
    babyDev: "Baby laver vejrtrækningsbevægelser og øver synke-refleksen med fostervand.",
    motherBody: "Livmoderen er nu over skambenet. Du mærker måske første lette pres oppefra.",
    highlight: "Baby øver at trække vejret",
    highlightEmoji: "🫁",
    facts: ["Baby øver vejrtrækning med fostervand", "Synke-refleksen trænes", "Livmoderen rejser sig over skambenet"],
    nutrition: [
      { icon: "🫐", text: "Bær + C-vitamin øger jernoptagelsen" },
      { icon: "🥜", text: "Nødder og frø: sundt fedt, magnesium og E-vitamin" },
      { icon: "💧", text: "Drik rigeligt — fostervandsproduktionen øges" },
    ],
    partnerFocus: "Undersøg fødesteder sammen. Hospitalet, fødeklinik eller hjemmefødsel? Start samtalen.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  15: {
    week: 15, trimester: 2,
    babyDev: "Baby kan høre lyde fra omverdenen. Tal med din mave — baby kender allerede din stemme.",
    motherBody: "Mange oplever runde-ligament-smerter — stikkende smerter i siden. Det er normalt.",
    highlight: "Baby kan høre din stemme",
    highlightEmoji: "👂",
    facts: ["Baby kan høre lyde udefra", "Stikkende smerter i siden er normale", "Babys hørelse skærpes"],
    nutrition: [
      { icon: "🐟", text: "Fed fisk 2 gange ugentligt — omega-3 til hørelse og syn" },
      { icon: "🥦", text: "Grønne blade: jern og folsyre fortsat vigtigt" },
      { icon: "🫘", text: "Bønner og linser: plantebaseret jern og protein" },
    ],
    partnerFocus: "Begynd at tale til maven. Det føles mærkeligt, men baby genkender din stemme ved fødslen.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  16: {
    week: 16, trimester: 2,
    babyDev: "Baby er på størrelse med en avocado. Muskler og knogler vokser hurtigt. Øjnene bevæger sig.",
    motherBody: "Nogle mærker de første forsigtige spark — som sommerfugleflagren eller bobler.",
    highlight: "Første spark mærkes måske",
    highlightEmoji: "🦋",
    facts: ["Første spark kan mærkes — som bobler", "Muskler og knogler vokser hurtigt", "Babys øjne bevæger sig"],
    nutrition: [
      { icon: "🥩", text: "Jern: babys røde blodlegemer produceres hurtigt" },
      { icon: "🥛", text: "Calcium ekstra vigtigt — knoglehærdningen er i fuld gang" },
      { icon: "🌾", text: "Komplekse kulhydrater giver stabil energi hele dagen" },
    ],
    partnerFocus: "Læg hånden på maven dagligt. Det er din måde at skabe kontakt på allerede nu.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  17: {
    week: 17, trimester: 2,
    babyDev: "Baby er dækket af lanugo — fin dun, der holder varmen. Fedtlag begynder at dannes.",
    motherBody: "Rygsmerter er almindelige nu. En gravid-pude om natten hjælper. Undgå at stå længe.",
    highlight: "Lanugo-dun dækker kroppen",
    highlightEmoji: "🌫️",
    facts: ["Lanugo-dun dækker babys hud", "Fedtlag begynder at dannes", "Rygsmerter er almindelige"],
    nutrition: [
      { icon: "🐟", text: "Omega-3 og E-vitamin støtter babys fedtvævsdannelse" },
      { icon: "🥜", text: "Mandler og solsikkefrø: E-vitamin der beskytter cellerne" },
      { icon: "💧", text: "Rigeligt vand hjælper mod hævede ankler og halsbrand" },
    ],
    partnerFocus: "Overtag gulvvask og andet tungt husarbejde. Hendes tyngdepunkt forskydes.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  18: {
    week: 18, trimester: 2,
    babyDev: "Baby kan nu gabe, strække sig og sparke. Knoglerne er synlige på scanning.",
    motherBody: "Maveblodkarrene udvider sig — nogle oplever svimmelhed ved at rejse sig hurtigt.",
    highlight: "Baby strækker og sparker",
    highlightEmoji: "🤸",
    facts: ["Baby strækker sig og gaber", "Knogler synlige på scanning", "Mavens blodkar udvider sig"],
    nutrition: [
      { icon: "🥩", text: "Jerntilskud (40–50 mg/dag) som anbefalet af jordemoder" },
      { icon: "🍊", text: "C-vitamin til hvert jernrigt måltid øger optaget" },
      { icon: "🌾", text: "Fuldkorn giver B-vitaminer og langvarig energi" },
    ],
    partnerFocus: "Tilmeld jer fødselsforberedelseskurset nu — hold fyldes hurtigt op.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  19: {
    week: 19, trimester: 2,
    babyDev: "Babys sanser udvikles hurtigt. Hjernens sensoriske centre aktiveres.",
    motherBody: "Du er tæt på halvvejs. Mærkbare spark begynder for de fleste nu.",
    highlight: "Alle sanser aktiveres",
    highlightEmoji: "✨",
    facts: ["Alle sanser aktiveres", "Hjernens sensoriske centre er aktive", "Mærkbare spark for de fleste"],
    nutrition: [
      { icon: "🫘", text: "Protein til babys accelererende vækst: linser, bønner, kød, fisk" },
      { icon: "🥛", text: "Calcium og D-vitamin: knogledannelsen er på sit højeste" },
      { icon: "🌾", text: "Fibre og regelmæssige måltider forebygger forstoppelse" },
    ],
    partnerFocus: "Lav en liste over hvad I mangler at købe/klargøre. Del op i måneder.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  20: {
    week: 20, trimester: 2,
    babyDev: "Baby er nu ca. 25 cm lang (isse-hæl). 20-ugers scanningen viser alt: hjertet, hjernen, rygraden. (Bemærk: målet ændres fra isse-sæde til isse-hæl omkring nu — det er derfor 'længden' pludselig stiger.)",
    motherBody: "HALVVEJS! Maven er nu tydelig. Strækmærker kan begynde at dannes — fugtig hud hjælper.",
    highlight: "HALVVEJS — 20 uger!",
    highlightEmoji: "🎉",
    facts: ["Halvvejs gennem graviditeten", "20-ugers misdannelsesscanning", "Baby ca. 25 cm (isse-hæl)"],
    nutrition: [
      { icon: "🐟", text: "DHA omega-3: babys hjerne vokser særlig hurtigt nu" },
      { icon: "🥦", text: "Magnesium fra grønne grøntsager hjælper mod benkramper" },
      { icon: "💧", text: "2–2,5 liter vand — fostervandproduktionen er høj" },
    ],
    partnerFocus: "Fejr halvvejs ordentligt i aften. I har klaret meget.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  21: {
    week: 21, trimester: 2,
    babyDev: "Baby sover og er vågen i egne cyklusser. Baby kan smage fostervandet.",
    motherBody: "Fordøjelsen sænkes af progesteron. Forstoppelse og halsbrand er almindelige nu.",
    highlight: "Baby har egne søvncyklusser",
    highlightEmoji: "💤",
    facts: ["Baby har sine egne søvncyklusser", "Baby kan smage fostervandet", "Forstoppelse er almindelig"],
    nutrition: [
      { icon: "🥛", text: "Jod fra mejeriprodukter og fisk: babys skjoldbruskkirtel dannes" },
      { icon: "🥩", text: "Protein og jern til babys fortsatte hurtige vækst" },
      { icon: "🫐", text: "Bær og citrus: antioxidanter og C-vitamin" },
    ],
    partnerFocus: "Sæt gang i babyværelset — det er en fælles opgave, der styrker samhørighed.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  22: {
    week: 22, trimester: 2,
    babyDev: "Babys læber og øjenbryn er fuldt formede. Hørelsen skærpes — baby reagerer på høje lyde.",
    motherBody: "Braxton Hicks-sammentrækninger (øve-veer) kan starte nu. De er uregelmæssige og smertefrie.",
    highlight: "Baby reagerer på høje lyde",
    highlightEmoji: "🔊",
    facts: ["Læber og øjenbryn er fuldt formede", "Baby reagerer på høje lyde", "Øve-veer kan starte"],
    nutrition: [
      { icon: "🌾", text: "Komplekse kulhydrater forebygger blodsukkerfald" },
      { icon: "🐟", text: "DHA fra fed fisk eller algeolie — babys syn er aktivt" },
      { icon: "🥜", text: "Avocado og nødder: sundt fedt til babys hjernevækst" },
    ],
    partnerFocus: "Øv dig i at sige 'hvad har du brug for?' frem for at komme med løsninger.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  23: {
    week: 23, trimester: 2,
    babyDev: "Babys hud er stadig rynket — fedtlaget er endnu ikke fyldt ud. Lungerne modner.",
    motherBody: "Øget svedtendens og varme i kroppen er normalt — blodvolumen er steget ca. 40%.",
    highlight: "Blodvolumen +40% over normal",
    highlightEmoji: "❤️",
    facts: ["Lungerne modner langsomt", "Mors blodvolumen +40%", "Babys hud er stadig rynket"],
    nutrition: [
      { icon: "🥩", text: "Jern og protein til babys vækstspurt" },
      { icon: "🫘", text: "Kikærter og linser: jern, fibre og protein i ét" },
      { icon: "🍊", text: "C-vitamin + jern = bedste duo" },
    ],
    partnerFocus: "Tjek om arbejdsgiver kræver særlig opsigelse ved barselsstart.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  24: {
    week: 24, trimester: 2,
    babyDev: "Mange ekstremt for tidligt fødte børn omkring uge 24 kan overleve med intensiv pleje. Levedygtigheden stiger gradvist fra denne tid og frem — det er ikke en fast grænse, og hvert barn er individuelt.",
    motherBody: "Bækkenbund under stigende pres. Bækkenbundsøvelser er vigtige — 3 sæt × 10 dagligt.",
    highlight: "Levedygtighedstærsklen — gradvis",
    highlightEmoji: "🌱",
    facts: ["Levedygtighed stiger gradvist", "Bækkenbund under pres — træn dagligt", "Babys lunger udvikles fortsat"],
    nutrition: [
      { icon: "🥛", text: "Calcium ~1000 mg/dag: babys lunger og knogler hærder" },
      { icon: "💊", text: "D-vitamin understøtter calciumoptaget" },
      { icon: "🌾", text: "Fibre forebygger forstoppelse og hæmorider i 3. trimester" },
    ],
    partnerFocus: "Tal om jeres fødselsplan: ønsker, smertelindring, musik. Det reducerer stress på dagen.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  25: {
    week: 25, trimester: 2,
    babyDev: "Baby vejer nu ca. 700 g. Håndflader og fodsåler er fuldt formede med unikke linjer.",
    motherBody: "Mange oplever øget sparkaktivitet efter måltider. Baby kan mærke blodsukkerstigninger.",
    highlight: "Unikke håndlinjer dannes",
    highlightEmoji: "✋",
    facts: ["Unikke håndlinjer og fodlinjer", "Baby reagerer på blodsukker", "Baby vejer ca. 700 g"],
    nutrition: [
      { icon: "🥩", text: "Jern og protein dagligt — kroppen bygger reserver" },
      { icon: "🐟", text: "Fed fisk 2 gange ugentligt fortsat" },
      { icon: "🌾", text: "Stabilt blodsukker = stabil baby — undgå hurtige sukre" },
    ],
    partnerFocus: "Frys 10–15 portioner mad ned til barslen — den bedste praktiske investering.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  26: {
    week: 26, trimester: 2,
    babyDev: "Babys øjne åbner sig for første gang. Baby kan skelne lys fra mørke.",
    motherBody: "Søvnbesvær starter for mange. Lig på venstre side — det forbedrer blodgennemstrømningen.",
    highlight: "Baby åbner øjnene",
    highlightEmoji: "👀",
    facts: ["Babys øjne åbner sig", "Lys og mørke kan skelnes", "Sov på venstre side for bedst blodgennemstrømning"],
    nutrition: [
      { icon: "🥦", text: "Vitamin K fra grønne blade forbereder blodets størkning ved fødsel" },
      { icon: "🐟", text: "DHA fortsat — synet udvikler sig nu" },
      { icon: "💧", text: "Hydrering reducerer søvnafbrydelser" },
    ],
    partnerFocus: "Masér hendes ryg og ben dagligt. Det er ikke luksus — det lindrer reelle smerter.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  27: {
    week: 27, trimester: 2,
    babyDev: "Hjernens overflade begynder at folde sig — hjernebarken danner gyri. REM-søvn starter.",
    motherBody: "3. trimester er snart her. Tyngdefølelse, hyppig vandladning og åndenød starter.",
    highlight: "Baby drømmer måske allerede",
    highlightEmoji: "🌙",
    facts: ["Hjernebarken danner folder", "REM-søvn er aktiv", "3. trimester er lige om hjørnet"],
    nutrition: [
      { icon: "🥩", text: "Jern og protein dagligt — blodvolumen højeste niveau" },
      { icon: "🐟", text: "Fed fisk 2 gange ugentligt fortsat" },
      { icon: "🌾", text: "Mindre, hyppigere måltider når maven trykker" },
    ],
    partnerFocus: "Undersøg besøgskarantæne de første dage hjemme — det er jeres valg.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  28: {
    week: 28, trimester: 3,
    babyDev: "3. trimester! Baby vejer ca. 1 kg. Huden glatter ud, efterhånden som fedtet dannes.",
    motherBody: "Bækken-løsning er hyppig nu. Smerter i symfysen og lysken — tag det seriøst.",
    highlight: "3. TRIMESTER begynder",
    highlightEmoji: "🏁",
    facts: ["3. trimester starter", "Baby vejer ca. 1 kg", "Bækkenløsning kan give smerter"],
    nutrition: [
      { icon: "🥦", text: "Vitamin K fra grønne blade hjælper blodets størkning ved fødsel" },
      { icon: "🥛", text: "Calcium: babys knogler mineraliseres hurtigt" },
      { icon: "🌾", text: "Fibre og vand forebygger forstoppelse" },
    ],
    partnerFocus: "Ved screening for svangerskabsdiabetes (hvis tilbudt): kør hende derhen, det er et langt besøg.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  29: {
    week: 29, trimester: 3,
    babyDev: "Baby kan styre sin kropstemperatur. Muskelmasse og knogletæthed stiger hurtigt.",
    motherBody: "Åndedrættet kan føles tungt — livmoderen trykker på diafragma. Det er normalt.",
    highlight: "Baby styrer kropstemperaturen",
    highlightEmoji: "🌡️",
    facts: ["Baby regulerer egen temperatur", "Muskelmasse stiger hurtigt", "Mors åndedræt føles tungt"],
    nutrition: [
      { icon: "🐟", text: "DHA omega-3: babys hjerneudvikling accelererer" },
      { icon: "🥩", text: "Protein til babys vækst på ca. 200 g/uge fremover" },
      { icon: "💊", text: "Tal med jordemoder om jern-niveau" },
    ],
    partnerFocus: "Forbered de første uger hjemme: hvem kommer? Hvornår? Sæt klare grænser med familie.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  30: {
    week: 30, trimester: 3,
    babyDev: "Baby er ca. 40 cm og vejer ca. 1,3 kg. Hjernen udvikler sig med enorm fart.",
    motherBody: "Rygsmerter er på sit højeste. Fysioterapi og vandgymnastik er effektivt.",
    highlight: "Hjernen vokser eksplosivt",
    highlightEmoji: "🧠",
    facts: ["Hjernens vækst på sit højeste", "Baby ca. 40 cm og 1,3 kg", "Rygsmerter topper hos mor"],
    nutrition: [
      { icon: "🐟", text: "DHA-rige fede fisk fortsat — hjernen vokser hurtigt" },
      { icon: "🥛", text: "Calcium og D-vitamin højeste behov" },
      { icon: "🌾", text: "Magnesium fra fuldkorn og grønne blade mod kramper" },
    ],
    partnerFocus: "Lær tegn på for tidlig fødsel: regelmæssige veer, pres nedad, vandafgang. Og planen hvis det sker.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  31: {
    week: 31, trimester: 3,
    babyDev: "Baby er ved at vende sig med hovedet nedad. Alle organer er fuldt funktionelle.",
    motherBody: "Søvnen er svær. Prøv: U-pude, hævet hoved, ingen skærme efter 21.",
    highlight: "Baby drejer hovedet nedad",
    highlightEmoji: "🔄",
    facts: ["Baby vender sig — hoved nedad", "Alle organer er funktionelle", "Søvnen er svær — det er normalt"],
    nutrition: [
      { icon: "🐟", text: "Omega-3 fortsat — lunger og hjerne i finalefase" },
      { icon: "🫘", text: "Plantebaseret jern + C-vitamin øger optaget" },
      { icon: "🥛", text: "Calciumbehovet er højest nu" },
    ],
    partnerFocus: "Tag ansvaret for det logistiske: hvem passer søskende/dyr? Er bilen tanket?",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  32: {
    week: 32, trimester: 3,
    babyDev: "Baby øver åndedræt intensivt. Fingre og tæer er fuldt udviklede med negle.",
    motherBody: "Falske veer (Braxton Hicks) intensiveres. Rigtige veer: regelmæssige, stærkere, tættere.",
    highlight: "Hospitalstasken skal pakkes",
    highlightEmoji: "🧳",
    facts: ["Baby øver åndedræt intensivt", "Fingernegle er fuldt formede", "Lær forskel på falske og rigtige veer"],
    nutrition: [
      { icon: "🥦", text: "Jern fortsat vigtigt — kroppen bygger reserver til fødslen" },
      { icon: "🌾", text: "Små, hyppige måltider mod halsbrand" },
      { icon: "🐟", text: "Omega-3 fra fisk eller algeolie" },
    ],
    partnerFocus: "Pak hospitalstasken — begges. Det er for sent at pakke under veerne.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  33: {
    week: 33, trimester: 3,
    babyDev: "Babys knogler hærder fuldstændigt — undtagen kraniet, der forbliver bøjeligt til fødslen.",
    motherBody: "Brysterne kan producere råmælk (colostrum) allerede nu — let gullig, klistret væske.",
    highlight: "Råmælk begynder at dannes",
    highlightEmoji: "🤱",
    facts: ["Knogler er fuldt hærdede — undtagen kraniet", "Råmælk (colostrum) kan dannes", "Babys vækst fortsætter"],
    nutrition: [
      { icon: "🥩", text: "Protein og jern til vækst og blodopbygning før fødsel" },
      { icon: "🥛", text: "Calcium og D-vitamin de næste 7 uger" },
      { icon: "🌾", text: "Fibre forebygger forstoppelse" },
    ],
    partnerFocus: "Kør ruten til hospitalet en gang. Find parkeringen. Kend en alternativ rute.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  34: {
    week: 34, trimester: 3,
    babyDev: "Baby sover meget af tiden. Centralnervesystemet og immunforsvaret modnes. Øjnene kan fokusere.",
    motherBody: "Bækkenbunden bærer nu 10+ kg ekstra. Let inkontinens er almindeligt — det er normalt.",
    highlight: "Immunforsvaret modnes",
    highlightEmoji: "🛡️",
    facts: ["CNS og immunforsvar modnes", "Baby sover det meste af tiden", "Inkontinens er almindeligt"],
    nutrition: [
      { icon: "🍊", text: "C-vitamin styrker bindevæv og reducerer blødningsrisiko" },
      { icon: "🐟", text: "Fed fisk 2 gange ugentligt fortsat" },
      { icon: "💧", text: "Rigeligt vand — dehydrering kan udløse for tidlige veer" },
    ],
    partnerFocus: "Gennemgå jeres fødselsplan med jordemoderen. Kend jeres holdning til smertelindring.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  35: {
    week: 35, trimester: 3,
    babyDev: "Baby fylder næsten hele livmoderen. Plads er knap — bevægelserne mærkes anderledes.",
    motherBody: "Lysning kan starte — maven 'falder' lidt nedad. Åndedrættet lettere, pres på blæren øges.",
    highlight: "Maven falder — lysning",
    highlightEmoji: "⬇️",
    facts: ["Plads bliver knap — bevægelser ændrer sig", "Lysning kan starte", "Blæren bliver mere presset"],
    nutrition: [
      { icon: "🌾", text: "Små portioner når maven trykker" },
      { icon: "🥩", text: "Protein holder energien oppe" },
      { icon: "💊", text: "Tjek jern-niveau med læge/jordemoder før fødsel" },
    ],
    partnerFocus: "Vær fysisk tilgængelig. Tilen kan komme pludseligt fra nu af.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  36: {
    week: 36, trimester: 3,
    babyDev: "Baby er stort set fuldt udviklet. Nu handler det om at tage på. Lanugo-dunene forsvinder.",
    motherBody: "Sidste scanninger og samtaler i mange forløb. Tjek babys position med jordemoder.",
    highlight: "Baby er stort set fuldt udviklet",
    highlightEmoji: "✅",
    facts: ["Baby er stort set fuldt udviklet", "Vægten øges fortsat", "Lanugo-dun forsvinder"],
    nutrition: [
      { icon: "🌾", text: "Små portioner mod halsbrand og tyngde" },
      { icon: "🥩", text: "Protein holder energiniveauet oppe" },
      { icon: "💊", text: "Jern bør tjekkes hos jordemoder/læge — forebyg anæmi" },
    ],
    partnerFocus: "Tjek at I har: autostol installeret, vugge klar, babytøj vasket, bleer og våde klude klar.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  37: {
    week: 37, trimester: 3,
    babyDev: "Baby er fuldbåren (term). De fleste babyer er klar til at fødes nu, men nogle har stadig brug for ekstra støtte ved fødsel — særligt med vejrtrækning. Vægt typisk 2,8–3,2 kg.",
    motherBody: "Livmoderhalsen kan begynde at modne. Slimproppen kan afgå (brunlig/rosa slim).",
    highlight: "Fuldbåren — baby er term",
    highlightEmoji: "🏆",
    facts: ["Baby er fuldbåren (term)", "Slimproppen kan afgå", "Vægt typisk 2,8–3,2 kg"],
    nutrition: [
      { icon: "🌾", text: "Lette, små måltider — kroppen forbereder fødsel" },
      { icon: "💧", text: "Hydrering — vigtig under veer" },
      { icon: "🥩", text: "Jern og protein dagligt" },
    ],
    partnerFocus: "Sov. Tag resten. Tank energi. Fødslen kræver udholdenhed af jer begge.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  38: {
    week: 38, trimester: 3,
    babyDev: "Baby producerer surfaktant, der modner lungerne yderligere.",
    motherBody: "Veer kan starte. Følg jeres jordemoders konkrete råd om, hvornår I skal kontakte fødestedet.",
    highlight: "Lungerne er klar",
    highlightEmoji: "🫁",
    facts: ["Surfaktant modner lungerne", "Veer kan starte når som helst", "Følg jordemoders veer-vejledning"],
    nutrition: [
      { icon: "🌾", text: "Stabilt blodsukker hjælper hvis veer starter" },
      { icon: "💧", text: "Hydrering — særligt vigtig under veer" },
      { icon: "🥩", text: "Jern og protein fortsat" },
    ],
    partnerFocus: "Sov med telefonen på lyd. Hav en plan for hvad du gør, hvis veerne starter om natten.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  39: {
    week: 39, trimester: 3,
    babyDev: "Baby er typisk omkring 50 cm. Vernix (voksbeskyttelsen) er stadig på huden.",
    motherBody: "Træthed og uro er normalt. Mange kvinder har rastløs energi dagene før fødsel.",
    highlight: "Fødslen er nær",
    highlightEmoji: "🌅",
    facts: ["Baby er typisk ca. 50 cm", "Vernix beskytter huden", "Rastløs energi kan ramme før fødsel"],
    nutrition: [
      { icon: "🌾", text: "Lette, små måltider" },
      { icon: "💧", text: "Hydrering" },
      { icon: "🥦", text: "Grønne grøntsager og bælgfrugter" },
    ],
    partnerFocus: "Vær til stede. Intet arbejde, ingen aftaler. Bare vær der.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
  40: {
    week: 40, trimester: 3,
    babyDev: "Termin. Baby er klar. Vejer typisk 3,0–3,5 kg og er 50–52 cm lang.",
    motherBody: "Termin er en gennemsnitsdato — ca. halvdelen føder efter terminen. Igangsættelse tilbydes typisk uge 41–42.",
    highlight: "TERMIN — I er klar",
    highlightEmoji: "🎉",
    facts: ["Termin nået", "Mange føder først efter termin", "Igangsættelse tilbydes typisk uge 41–42"],
    nutrition: [
      { icon: "💧", text: "Hydrering" },
      { icon: "🌾", text: "Lette måltider" },
      { icon: "🥩", text: "Vedligehold jern og protein" },
    ],
    partnerFocus: "Hold telefonen opladet. Vær rolig. Hun har brug for din ro mere end noget andet nu.",
    activeVitamins: ["d-vitamin", "jern", "omega-3", "calcium"],
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// TRIMESTER-INDHOLD (symptomer, partner-hjælp, røde flag, forberedelse)
// ──────────────────────────────────────────────────────────────────────────────

export const trimesterContent: Record<1 | 2 | 3, TrimesterContent> = {
  1: {
    herSymptoms: [
      "Kraftig træthed",
      "Kvalme og opkastninger",
      "Ømme bryster",
      "Stemningsudsving",
      "Hyppig vandladning",
    ],
    partnerHelpTips: [
      "Tag over med madlavning — undgå stærke dufte",
      "Lad hende hvile uden dårlig samvittighed",
      "Spørg konkret ind til hvad hun har brug for",
      "Vær tålmodig med stemningsudsving",
      "Tag med til scanninger — det betyder meget",
    ],
    redFlags: [
      "Kraftig blødning (mere end let pletblødning)",
      "Stærke vedvarende mavesmerter",
      "Feber over 38°C",
      "Vedvarende voldsom opkastning, hvor du ikke kan holde væske inde",
    ],
    preparation: [
      "Bookning af jordemoder",
      "Fortæl arbejdsgiver om graviditet, når du er klar",
      "Undersøg regler for fædreorlov / medforælder-orlov",
    ],
  },
  2: {
    herSymptoms: [
      "Energien vender for mange tilbage",
      "Tydeligt bulnende mave",
      "Rygsmerter og ligament-smerter",
      "Halsbrand",
      "Hævede ankler og fødder",
      "Første spark mærkes",
    ],
    partnerHelpTips: [
      "Læg hånden på maven og vent tålmodigt på spark",
      "Massér hendes ryg — det giver stor lindring",
      "Tag styring på indkøb og madplaner",
      "Tal til maven — baby hører din stemme nu",
      "Sæt benene op for hende om aftenen",
    ],
    redFlags: [
      "Nedsat liv: mærker færre eller svagere spark end vanligt fra ~uge 22",
      "Kraftig blødning",
      "Stærk, vedvarende hovedpine, synsforstyrrelser eller pludselige hævelser (tegn på svangerskabsforgiftning)",
      "Stærke, regelmæssige sammentrækninger (truende for tidlig fødsel)",
      "Vandafgang før uge 37",
      "Feber over 38°C",
    ],
    preparation: [
      "Tilmeld fødselsforberedelseskursus",
      "Start samtalen om navne",
      "Lav budget og plan for første år",
      "Køb det vigtigste babygrej",
    ],
  },
  3: {
    herSymptoms: [
      "Træthed vender tilbage",
      "Åndedrætsbesvær (livmoderen trykker)",
      "Bækken- og rygsmerter",
      "Søvnproblemer",
      "Braxton Hicks (øve-veer)",
      "Let inkontinens — almindeligt og normalt",
    ],
    partnerHelpTips: [
      "Tag over med alt der kræver bøjning og løft",
      "Pak hospitalstasken færdig sammen",
      "Lær tegn på reel fødsel vs. øve-veer",
      "Hav veer-timeren klar på telefonen",
      "Vær fysisk tilgængelig — timen kan komme pludseligt",
    ],
    redFlags: [
      "Mærkbart nedsat liv hos barnet — kontakt jordemoder samme dag",
      "Kraftig blødning",
      "Vandafgang før uge 37",
      "Stærk hovedpine, synsforstyrrelser eller pludselige hævelser",
      "Stærke vedvarende mavesmerter",
      "Feber over 38°C",
      "Stærk kløe (særligt om natten, på hænder og fødder)",
    ],
    preparation: [
      "Pak hospitalstasken",
      "Installer autostol",
      "Frys mad ned til barslen",
      "Aftal hvem der passer dyr/søskende, hvis det går hurtigt",
      "Kør ruten til hospitalet",
    ],
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// HJÆLPEFUNKTIONER
// ──────────────────────────────────────────────────────────────────────────────

import { pregnancyWeeksEN, trimesterContentEN } from "./pregnancyContent.en";

/** Hent indholdet for en konkret uge. Falder tilbage til nærmeste uge der findes.
 *  Tager et valgfrit sprog-flag; "en" giver den engelske variant. */
export function getWeekContent(week: number, lang?: string): WeekContent {
  const source = lang === "en" ? pregnancyWeeksEN : pregnancyWeeks;
  if (source[week]) return source[week];
  const keys = Object.keys(source).map(Number).sort((a, b) => a - b);
  let closest = keys[0];
  for (const k of keys) if (k <= week) closest = k;
  return source[closest];
}

/** Find trimester ud fra uge. */
export function getTrimester(week: number): 1 | 2 | 3 {
  if (week < 13) return 1;
  if (week < 28) return 2;
  return 3;
}

/** Hent symptomer, partner-tips, røde flag og forberedelse for den aktuelle uge. */
export function getTrimesterContent(week: number, lang?: string): TrimesterContent {
  const source = lang === "en" ? trimesterContentEN : trimesterContent;
  return source[getTrimester(week)];
}
