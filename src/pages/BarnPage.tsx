import { useState, useRef, useEffect } from "react";
import { useFamily } from "@/context/FamilyContext";
import { useTranslation } from "react-i18next";
import { getBabyInsight, developmentalLeaps, getLeapStatus, getActiveLeap, getBabySize } from "@/lib/phaseData";
import { Baby as BabyIcon, Check, ChevronDown, ChevronUp, Smile, Hand, Moon, Zap, Bookmark, Share2, ChevronRight, Heart, Shield, X } from "lucide-react";
import { cn } from "@/lib/utils";
import BabyMeasurements from "@/components/BabyMeasurements";
import { Link, useNavigate } from "react-router-dom";

export default function BarnPage() {
  const { profile, currentWeek, babyAgeWeeks, babyAgeMonths } = useFamily();

  if (profile.phase === "pregnant") return <PregnantBarnPage week={currentWeek} role={profile.role} />;
  return <BornBarnPage ageWeeks={babyAgeWeeks} ageMonths={babyAgeMonths} role={profile.role} />;
}

// ── Week-specific development bullets (2 facts shown in hero per week) ────────
const WEEK_BULLETS: Record<number, [string, string]> = {
  5:  ["Hjertet slår for første gang — en klump celler der banker", "Neuralrøret dannes og bliver til hjerne og rygsøjle"],
  6:  ["Hjertet slår 100–160 gange i minuttet — synligt på scanning", "Arme- og benstumper vokser frem som små årer"],
  7:  ["Hjernen vokser med 100 nye neuroner i minuttet", "Ansigtstræk begynder at forme sig — øjne og næsepartiet skimtes"],
  8:  ["Alle vitale organer er anlægt og i fuld udvikling", "Baby er officielt et foster — ca. 1,6 cm, ligner et lille menneske"],
  9:  ["Fingre og tæer adskilles fra hinanden", "Baby kan allerede gabe, strække sig og røre ved sit ansigt"],
  10: ["Neglene begynder at spire frem på fingre og tæer", "Baby drejer aktivt rundt i fostervæsken — men du mærker det ikke endnu"],
  11: ["Baby har allerede unikke fingeraftryk", "Nyrerne er aktive og producerer urin direkte i fostervandet"],
  12: ["Risikoen for tab falder markant — 1. trimester er næsten slut", "Baby kan suge tommelfingeren og lave ansigtsudtryk"],
  13: ["Baby 'vejrer' nu med fostervand og træner lungebevægelser", "Tarmene er vandret fra navlestrengen ind i bughulen"],
  14: ["Baby laver tydelige ansigtsudtryk — griner, rynker bryn, blinkker", "Kønnet kan nu bestemmes hos de fleste på scanning"],
  15: ["Høresansen udvikles — baby begynder at reagere på lyde udefra", "Baby drejer og sparker aktivt hele dagen"],
  16: ["Baby kan gribe og blinke — reflekserne er på plads", "Skelettet hærder fra bruskvæv til rigtigt knogle"],
  17: ["Fedtvæv begynder at dannes under huden for at holde varmen", "Høresansen skærpes markant — baby kender allerede din stemme"],
  18: ["Baby hører din stemme tydeligt og reagerer på den", "De første bevægelser kan mærkes — som sommerfugle i maven"],
  19: ["Vernix caseosa (ostecreme) begynder at beskytte babys hud", "Baby har nu en fast søvn-vågne cyklus på 20–30 minutter"],
  20: ["Halvvejs! Baby vejer ca. 300 g og er fuldt proportioneret", "Alle fem sanser er aktive og i fuld udvikling"],
  21: ["Baby synker fostervand og træner fordøjelsessystemet aktivt", "REM-søvn er bekræftet — baby drømmer sandsynligvis allerede"],
  22: ["Hjernen koordinerer nu bevægelserne aktivt og bevidst", "Baby ligner et lille menneskebarn — blot meget slankere"],
  23: ["Baby genkender stemmer den har hørt mange gange", "Finger- og tånegle er fuldt udviklede"],
  24: ["Baby er nu levedygtig med avanceret medicinsk hjælp", "Lungerne producerer surfaktant — stof der holder luftsækkene åbne"],
  25: ["Baby kan registrere lys udefra — dæk maven til og baby mærker det", "Hårvækst på babyens hoved begynder"],
  26: ["Baby åbner øjnene for første gang — synet begynder at fungere", "Hjernen styrer nu kropstemperatur selvstændigt"],
  27: ["Baby kan suge sin tommelfinger — sugeinstinktet er klar", "Baby er ca. 35 cm — 3. trimester er lige om hjørnet"],
  28: ["3. TRIMESTER! Baby vejer nu ca. 1 kg", "Synsnerverne er fuldt aktive — baby skelner lys fra mørke"],
  29: ["Hjernen danner gyri — folderne der giver mere kapacitet", "Baby sparker kraftigt og regelmæssigt — maven bevæger sig synligt"],
  30: ["Baby vender sig med hovedet nedad hos de fleste", "Knoglerne hærder intensivt — det kræver rigeligt calcium fra dig"],
  31: ["Baby kan blinkke og holde øjnene åbne i perioder", "Lungerne er næsten klar til selvstændig vejrtrækning"],
  32: ["Baby sover 90–95% af døgnet svarende til dine søvncyklusser", "Alle grundreflekser er på plads og funktionelle"],
  33: ["Skallen er stadig blød og formbar — den skal passere fødselskanalen", "Baby har alle fødselsreflekser klar til brug"],
  34: ["Baby er fuldt dannet — de kommende uger handler om at tage på", "Det hvide fedtlag giver babys hud den kendte runde, bløde form"],
  35: ["Baby vejer ca. 2,4 kg og er ca. 46 cm lang", "Nyrerne er 100% funktionelle"],
  36: ["Baby er officielt 'early term' og parat til verden", "Positionen er næsten altid hoved nedad fra nu af"],
  37: ["Baby er FULDGÅREN — lunger og hjerne er fuldt modne", "Baby kan klare sig uden medicinsk hjælp fra nu af"],
  38: ["Baby tager de allerseneste gram på", "Immunstoffer fra dig overføres via navlestrengen"],
  39: ["Baby er 100% klar — venter bare på det rette signal", "Moderkagen ældes — kroppen gør sig klar til fødslen"],
  40: ["TERMIN! Baby vejer typisk 3,2–3,6 kg og er ca. 50 cm", "Fødsel kan ske enhver dag — stol på din krop"],
  41: ["Babys hud kan begynde at skalle lidt — fostervandet aftager", "Overvågning intensiveres — I er i gode hænder"],
  42: ["Igangsætning overvejes med din læge eller jordemoder", "Baby er klar og rask — I er stærkere end I tror"],
};

// ── Week-specific nutrition (3 tips per week) ─────────────────────────────────
const WEEK_NUTRITION_DATA: Record<number, { icon: string; text: string }[]> = {
  5:  [{ icon: "🥦", text: "Folsyre (400 µg/dag) er kritisk — beskytter neuralrøret" }, { icon: "🚫", text: "Undgå alkohol fuldstændigt — ingen mængde er sikker" }, { icon: "💊", text: "Start D-vitamin (10 µg/dag) med det samme" }],
  6:  [{ icon: "🥦", text: "Folsyre: grønne blade, linser og nødder dagligt" }, { icon: "🍋", text: "Syrlig mad og kold drik kan lindre morgenkvalme" }, { icon: "🫚", text: "Spis lidt og tit — holder blodsukkeret stabilt" }],
  7:  [{ icon: "🫙", text: "Ingefærte eller ingefærkandis er effektivt mod morgenkvalme" }, { icon: "🍌", text: "Bananer: let fordøjelig energi når kvalmen er slem" }, { icon: "💧", text: "Drik rigeligt — kvalme kan føre til dehydrering" }],
  8:  [{ icon: "🥦", text: "Folsyre stadig kritisk til og med uge 12" }, { icon: "🥛", text: "Calcium fra mejeriprodukter — babys knogler dannes nu" }, { icon: "🚫", text: "Undgå lever og leverpostej — for høj vitamin A" }],
  9:  [{ icon: "🐟", text: "Omega-3 fra fed fisk understøtter babys hjernudvikling" }, { icon: "🥛", text: "Calcium og D-vitamin til babys begyndende knogledannelse" }, { icon: "🫐", text: "Antioxidanter fra bær beskytter mod cellestress" }],
  10: [{ icon: "🥩", text: "Jern: blodvolumen stiger med 50% i løbet af graviditeten" }, { icon: "🍊", text: "C-vitamin øger optaget af jern fra vegetabilske fødevarer" }, { icon: "🌾", text: "Fuldkorn giver langsom energi og forebygger forstoppelse" }],
  11: [{ icon: "🌾", text: "Fibre fra havregryn og grøntsager forebygger forstoppelse" }, { icon: "🥦", text: "Grønne grøntsager: folsyre, jern og calcium samlet" }, { icon: "💧", text: "1,5–2 liter vand dagligt — hyppig vandladning er normal" }],
  12: [{ icon: "🥩", text: "Jern stiger i vigtighed — din blodmasse øges hurtigt nu" }, { icon: "🥛", text: "Calcium: 1000 mg/dag — babys skelet begynder at hærde" }, { icon: "🚫", text: "Undgå rå fisk, upasteuriseret ost og rå æg" }],
  13: [{ icon: "🥩", text: "Protein til babys hurtige vækst: mindst 70 g dagligt" }, { icon: "🌾", text: "Fibre og vand mod forstoppelse der er hyppig i 2. trimester" }, { icon: "🥛", text: "Mejeri styrker babys begyndende tanddannelse" }],
  14: [{ icon: "🫐", text: "Jernrige bær kombineret med C-vitamin øger optaget" }, { icon: "🥜", text: "Nødder og frø: sundt fedt, magnesium og E-vitamin" }, { icon: "💧", text: "Drik mindst 2 liter — fostervandproduktionen øges" }],
  15: [{ icon: "🐟", text: "Fed fisk 2x ugentligt — omega-3 til babys øre- og øjenudvikling" }, { icon: "🥦", text: "Grønne blade: jern og folsyre — fortsat vigtig nu" }, { icon: "🫘", text: "Bønner og linser: plantebaseret jern og protein" }],
  16: [{ icon: "🥩", text: "Jern: babys røde blodlegemer produceres hurtigt nu" }, { icon: "🥛", text: "Calcium ekstra vigtig — knoglehærdningen er i fuld gang" }, { icon: "🌾", text: "Komplekse kulhydrater giver stabil energi hele dagen" }],
  17: [{ icon: "🐟", text: "Omega-3 og E-vitamin støtter babys fedtvævsdannelse" }, { icon: "🥜", text: "Mandler og solsikkefrø: E-vitamin der beskytter cellerne" }, { icon: "💧", text: "2+ liter vand hjælper mod hævede ankler og halsbrand" }],
  18: [{ icon: "🥩", text: "Jern: behovet er nu 27 mg/dag — dobbelt af det normale" }, { icon: "🍊", text: "C-vitamin til hvert jernrigt måltid øger optaget dramatisk" }, { icon: "🌾", text: "Fuldkorn giver B-vitaminer og langvarig energi" }],
  19: [{ icon: "🫘", text: "Protein til babys accelererende vækst: linser, bønner, kød, fisk" }, { icon: "🥛", text: "Calcium og D-vitamin: knogledannelsen er på sit højeste" }, { icon: "🌾", text: "Fibre og regelmæssige måltider forebygger forstoppelse" }],
  20: [{ icon: "🐟", text: "DHA omega-3: babys hjerne vokser særlig hurtigt nu" }, { icon: "🥦", text: "Magnesium fra grønne grøntsager hjælper mod benkramper" }, { icon: "💧", text: "2–2,5 liter vand — fostervandproduktionen er nu høj" }],
  21: [{ icon: "🥛", text: "Jod fra mejeriprodukter og fisk: babys skjoldbruskkirtel dannes" }, { icon: "🥩", text: "Protein og jern til babys fortsatte hurtige vækst" }, { icon: "🫐", text: "Bær og citrus: antioxidanter og C-vitamin" }],
  22: [{ icon: "🌾", text: "Komplekse kulhydrater forebygger svimmelhed og blodsukkerfald" }, { icon: "🐟", text: "DHA fra fed fisk eller algeolier — babys visuelle cortex er aktiv" }, { icon: "🥜", text: "Avocado og nødder: sundt fedt til babys hurtige hjernvækst" }],
  23: [{ icon: "🥩", text: "Jern og protein til babys store vækstspurt de kommende uger" }, { icon: "🫘", text: "Kikærter og linser: jern, fibre og protein i ét" }, { icon: "🍊", text: "C-vitamin kombineret med jernrige måltider — bedste duo" }],
  24: [{ icon: "🥛", text: "Calcium (1000 mg/dag): babys lunger og knogler hærder simultant" }, { icon: "💊", text: "D-vitamin understøtter calciumoptaget og lungernes modning" }, { icon: "🌾", text: "Fibre forebygger forstoppelse og hæmorider i 3. trimester" }],
  25: [{ icon: "🐟", text: "Omega-3 kritisk nu — babys øjennethindes DHA-indhold opbygges" }, { icon: "🥦", text: "Folat fra grønne grøntsager — fortsat vigtig for nervesystemet" }, { icon: "💧", text: "2+ liter vand forebygger hævede ankler og vandretention" }],
  26: [{ icon: "🫘", text: "Protein til det største vækstspurt i hele graviditeten" }, { icon: "🥛", text: "Calcium og magnesium hjælper mod søvnproblemer og kramper" }, { icon: "🌾", text: "Fuldkorn giver B6, der kan reducere tilbagevendende kvalme" }],
  27: [{ icon: "🥩", text: "Jern: dit blodvolumen er nu 50% højere end normalt" }, { icon: "🐟", text: "Fed fisk 2x ugentligt — de næste uger er afgørende for babys hjerne" }, { icon: "🍊", text: "Citrusfrugter: C-vitamin, fibre og naturlig hydrering" }],
  28: [{ icon: "🥦", text: "Vitamin K fra grønne blade hjælper mod blødning ved fødsel" }, { icon: "🥛", text: "Calcium: babys knogler mineraliseres hurtigt i 3. trimester" }, { icon: "🌾", text: "Fibre og vand forebygger forstoppelse i 3. trimester" }],
  29: [{ icon: "🐟", text: "DHA omega-3: babys hjerneudvikling accelererer kraftigt nu" }, { icon: "🥩", text: "Protein til babys vækst på ca. 200 g pr. uge fremover" }, { icon: "💊", text: "Tal med din læge om jern-niveau og eventuelt tilskud" }],
  30: [{ icon: "🥛", text: "Calcium er kritisk — babys skelet er ved at hærde fuldt" }, { icon: "🌾", text: "Spis lidt og tit — livmoderen trykker på mave og spiserør" }, { icon: "💧", text: "2+ liter vand forebygger Braxton Hicks-sammentrækninger" }],
  31: [{ icon: "🐟", text: "Omega-3: babys lungeudvikling og hjernefunktion i final fase" }, { icon: "🫘", text: "Plantebaseret jern fra kikærter + C-vitamin øger optaget" }, { icon: "🥛", text: "Calciumbehovet er højest nu — babys knogler kræver meget" }],
  32: [{ icon: "🥦", text: "Jern fortsat vigtigt — din krop bygger reserver til fødslen" }, { icon: "🌾", text: "Små, hyppige måltider afhjælper halsbrand og tyngdefornemmelse" }, { icon: "🐟", text: "Omega-3 via fisk eller algesupplement de næste uger" }],
  33: [{ icon: "🥩", text: "Protein og jern til babys vækst og din blodopbygning til fødsel" }, { icon: "🥛", text: "Calcium og D-vitamin er kritisk disse næste 7 uger" }, { icon: "🌾", text: "Fibre forebygger forstoppelse — undgå raffinerede kulhydrater" }],
  34: [{ icon: "🍊", text: "C-vitamin styrker bindevæv og reducerer blødningsrisiko" }, { icon: "🐟", text: "Fed fisk 2x ugentligt — omega-3 essentiel frem til fødslen" }, { icon: "💧", text: "Rigeligt vand — dehydrering kan udløse for tidlige veer" }],
  35: [{ icon: "🌾", text: "Let fordøjelig mad: ris, pasta, kartofler — maven er presset" }, { icon: "🥛", text: "Calcium og magnesium mod søvnproblemer og natlige kramper" }, { icon: "🫐", text: "Antioxidanter fra bær styrker dit immunforsvar inden fødsel" }],
  36: [{ icon: "🌾", text: "Små portioner — baby trykker nu markant på mave og spiserør" }, { icon: "🥩", text: "Protein holder energiniveauet oppe den sidste måned" }, { icon: "💊", text: "Jern bør tjekkes af læge — forebyg anæmi inden fødsel" }],
  37: [{ icon: "💧", text: "Hold dig godt hydreret — svag dehydrering kan ligne tidlige veer" }, { icon: "🌾", text: "Lette, næringsrige måltider — kroppen forbereder sig" }, { icon: "🥛", text: "Calcium og magnesium understøtter muskelkontraktioner ved fødsel" }],
  38: [{ icon: "🥣", text: "Let, næringsrig mad — fødslen kan starte hvornår som helst" }, { icon: "💧", text: "Drik rigeligt — dehydrering er hyppig årsag til igangsætning" }, { icon: "🌾", text: "Kulhydrater giver energireserver til selve fødselsarbejdet" }],
  39: [{ icon: "🥣", text: "Spis regelmæssigt — du ved ikke hvornår fødslen starter" }, { icon: "💧", text: "Vand og elektrolytter holder dig klar til den store dag" }, { icon: "🥩", text: "Protein giver muskler kraft til lange veer-perioder" }],
  40: [{ icon: "🥣", text: "Spis let og hyppigt — maven er presset til det yderste" }, { icon: "💧", text: "Drik nok vand — vigtigere end nogensinde nu" }, { icon: "🌿", text: "Hold dig næringsrig og let — krop og baby er klar" }],
  41: [{ icon: "💧", text: "God hydrering mens monitoreringen intensiveres" }, { icon: "🥣", text: "Let, næringsrig mad — kroppen holder sig klar til fødsel" }, { icon: "🌾", text: "Undgå tung, fedtrig mad — fokus på let og nærende" }],
  42: [{ icon: "💧", text: "Drik rigeligt vand hele dagen" }, { icon: "🥣", text: "Regelmæssige lette måltider holder blodsukkeret stabilt" }, { icon: "🌿", text: "Tal med jordemoder om igangsætning og muligheder" }],
};

function closestWeek(week: number, record: Record<number, unknown>): number {
  const keys = Object.keys(record).map(Number).sort((a, b) => a - b);
  return keys.reduce((prev, curr) => Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev, keys[0]);
}

// ── Data helpers ───────────────────────────────────────────────────────────────
function getDevCards(week: number) {
  const w = WEEK_BULLETS[week] ?? WEEK_BULLETS[closestWeek(week, WEEK_BULLETS)];
  return [
    { icon: "🌱", title: "Denne uge", desc: w[0] },
    { icon: "✨", title: "Og desuden", desc: w[1] },
    { icon: "📏", title: "Størrelse", desc: "Se details" },
    { icon: "⚖️", title: "Vægt", desc: "Se details" },
  ];
}

function getBodyPills(week: number): { icon: string; label: string }[] {
  if (week < 8) return [
    { icon: "🤢", label: "Morgenkvalme" },
    { icon: "😴", label: "Ekstrem træthed" },
    { icon: "🌸", label: "Ømme bryster" },
  ];
  if (week < 12) return [
    { icon: "🤢", label: "Kvalme" },
    { icon: "😴", label: "Træthed" },
    { icon: "💧", label: "Øget vandladning" },
  ];
  if (week < 16) return [
    { icon: "⚡", label: "Energi vender tilbage" },
    { icon: "🔵", label: "Begyndende maveform" },
    { icon: "💧", label: "Øget blodvolumen" },
  ];
  if (week < 20) return [
    { icon: "⚡", label: "Mere energi" },
    { icon: "🔵", label: "Rundere mave" },
    { icon: "😊", label: "Forbedret humør" },
  ];
  if (week < 24) return [
    { icon: "👶", label: "Mærker spark" },
    { icon: "🔥", label: "Begyndende halsbrand" },
    { icon: "🌙", label: "Søvnproblemer" },
  ];
  if (week < 28) return [
    { icon: "👶", label: "Tydelige spark" },
    { icon: "🔥", label: "Halsbrand" },
    { icon: "🦶", label: "Hævede ankler" },
  ];
  if (week < 32) return [
    { icon: "🤰", label: "Tung mave" },
    { icon: "😮‍💨", label: "Åndenød" },
    { icon: "🌀", label: "Braxton Hicks" },
  ];
  if (week < 36) return [
    { icon: "🤰", label: "Tung og stor mave" },
    { icon: "🚽", label: "Hyppig toilet" },
    { icon: "🦶", label: "Hævede fødder" },
  ];
  return [
    { icon: "🌀", label: "Øveveer" },
    { icon: "🪺", label: "Nesting" },
    { icon: "⚡", label: "Spænding" },
  ];
}

function getBodyDesc(week: number): { text: string; tip: string } {
  if (week < 8) return {
    text: "De tidlige uger er præget af intense hormonforandringer. Morgenkvalme og træthed er tegn på, at graviditeten udvikler sig normalt — din krop arbejder hårdt.",
    tip: "Spis noget tørt (kiks, riskakor) inden du står op — det hjælper mod morgenkvalme.",
  };
  if (week < 12) return {
    text: "Kvalme, træthed og ømme bryster er meget almindelige og er tegn på, at graviditeten udvikler sig normalt. Hormonerne er på sit højeste nu.",
    tip: "Spis lidt og ofte for at holde blodsukkeret stabilt — det hjælper mod kvalme.",
  };
  if (week < 16) return {
    text: "Første trimester er overstået! Energien begynder at vende tilbage. Livmoderen vokser og du kan begynde at mærke en let maveform.",
    tip: "Begynd at bruge fugtighedscreme på maven — det hjælper på elasticiteten.",
  };
  if (week < 20) return {
    text: "2. trimester er for mange den behageligste periode. Energien er tilbage, kvalmen er væk, og maven er synlig men ikke tung endnu.",
    tip: "Start svømmning, yoga eller gåture — bevægelse er godt for jer begge.",
  };
  if (week < 24) return {
    text: "Du kan nu mærke baby bevæge sig tydeligt. Ryggen kan begynde at give lidt — det er fordi din holdning ændrer sig i takt med maven.",
    tip: "En graviditetspude kan hjælpe dig sove bedre — placer den mellem knæene.",
  };
  if (week < 28) return {
    text: "Baby sparker og bevæger sig nu regelmæssigt. Halsbrand kan tiltage da livmoderen trykker mod mavesækken.",
    tip: "Spis mindre portioner mere hyppigt og løft benene når du sidder for at modvirke hævede ankler.",
  };
  if (week < 32) return {
    text: "Braxton Hicks-sammentrækninger er normale og harmløse øveveer. Baby er nu stor nok til at du kan mærke tydelige spark og bevægelser.",
    tip: "Sov på venstre side — det giver det bedste blodomløb til placenta og reducerer hævelse.",
  };
  if (week < 36) return {
    text: "Baby er næsten fuldt udviklet. Du kan opleve åndedrætsbesvær, hyppig vandladning og bækkentryk — det er alt sammen normalt.",
    tip: "Pak hospitalstasken og kend vejen til fødegangen — det giver ro i sindet.",
  };
  return {
    text: "Du er næsten ved termin. Baby kan komme når som helst de næste uger. Nesting-instinktet — trangen til at rydde og gøre klar — er kroppens naturlige forberedelse.",
    tip: "Hvil når du kan — du får brug for energien snart. Stol på din krop.",
  };
}

function getSymptoms(week: number): string[] {
  if (week < 8)  return ["Morgenkvalme", "Ekstrem træthed", "Ømme bryster", "Øget lugtesans"];
  if (week < 12) return ["Kvalme og opkast", "Træthed", "Ømme bryster", "Hyppig vandladning"];
  if (week < 16) return ["Energi vender tilbage", "Rundere mave", "Rygsmerter", "Svimmelhed"];
  if (week < 20) return ["Oppustethed", "Rygsmerter", "Hyppig vandladning", "Svært ved at sove"];
  if (week < 24) return ["Spark mærkes", "Halsbrand", "Rygsmerter", "Hævede ankler"];
  if (week < 28) return ["Halsbrand", "Hævede ankler", "Ryg- og bækkensmerter", "Søvnproblemer"];
  if (week < 32) return ["Åndenød", "Hyppig vandladning", "Braxton Hicks", "Træthed"];
  if (week < 36) return ["Tunge ben og fødder", "Hyppig vandladning", "Bækkentryk", "Åndenød"];
  return ["Stærke øveveer", "Bækkentryk", "Nesting-trang", "Søvnproblemer"];
}

function getNutritionTips(week: number): { icon: string; text: string }[] {
  const w = WEEK_NUTRITION_DATA[week] ?? WEEK_NUTRITION_DATA[closestWeek(week, WEEK_NUTRITION_DATA)];
  return w;
}

function getAffirmation(week: number): string {
  if (week < 8)  return "Din krop klarer et af de sværeste jobs i naturen. Bliv ved. 🌿";
  if (week < 12) return "Det er helt normalt at have blandede følelser. Din krop gør et fantastisk arbejde. 🌿";
  if (week < 16) return "1. trimester klaret! Du er stærkere end du tror. 🌿";
  if (week < 20) return "Det er normalt at føle både glæde og bekymring. Du gør det godt. 🌿";
  if (week < 24) return "Halvvejs! I gør det fantastisk. Jeres barn er allerede den heldigste baby i verden. 💚";
  if (week < 28) return "Baby kender allerede jeres stemmer. I er allerede en familie. 💚";
  if (week < 32) return "3. trimester! Hvert skridt bringer jer tættere på det store møde. 🌿";
  if (week < 36) return "I er stærkere end I tror. Hvert valg I tager nu er en gave til jeres barn. 🌿";
  return "I er klar — kroppen og barnet er klar. Stol på jer selv. 🌿";
}

function getWeekRecommendations(week: number): { icon: string; title: string; sub: string }[] {
  if (week < 12) return [
    { icon: "📅", title: "Book 1. trimester-scanning", sub: "Normalt uge 11–14" },
    { icon: "💊", title: "Start folsyre og D-vitamin", sub: "Vigtigt fra dag ét" },
    { icon: "🏥", title: "Tilmeld dig jordemoder", sub: "Jo tidligere jo bedre" },
  ];
  if (week < 20) return [
    { icon: "📅", title: "Planlæg næste lægebesøg", sub: "Få styr på dato og spørgsmål" },
    { icon: "📖", title: "Læs om fødselsforberedelse", sub: "Bliv klogere – i jeres tempo" },
    { icon: "💬", title: "Tal om forventninger", sub: "Styrk jeres fællesskab" },
  ];
  if (week < 28) return [
    { icon: "🎓", title: "Tilmeld fødselsforberedelse", sub: "Mange hold er hurtigt fulde" },
    { icon: "📷", title: "Book halvvejs-scanning", sub: "Normalt uge 18–20" },
    { icon: "🛍️", title: "Begynd indkøb af basiskøb", sub: "Barneseng, autostol, klapvogn" },
  ];
  if (week < 36) return [
    { icon: "🧳", title: "Pak hospitalstasken", sub: "Det er aldrig for tidligt" },
    { icon: "📋", title: "Lav fødselsplan", sub: "Del den med din jordemoder" },
    { icon: "🏠", title: "Forbered hjemmet", sub: "Klar plads til barneseng" },
  ];
  return [
    { icon: "📞", title: "Kend tegn på fødsel", sub: "Veer, vandafgang, blødning" },
    { icon: "🚗", title: "Kør-ruten til hospitalet", sub: "Øv den med din partner" },
    { icon: "😴", title: "Hvil så meget du kan", sub: "Du får brug for kræfterne" },
  ];
}

// ── Far-specific data ───────────────────────────────────────────────────────────
function getFarBodyPills(week: number): { icon: string; label: string }[] {
  if (week < 12) return [
    { icon: "🤢", label: "Hun: kvalme" },
    { icon: "😴", label: "Hun: træt" },
    { icon: "🌡️", label: "Din: couvade" },
    { icon: "😰", label: "Din: uro" },
  ];
  if (week < 20) return [
    { icon: "⚡", label: "Hun: mere energi" },
    { icon: "👶", label: "Spark snart" },
    { icon: "💭", label: "Din: forestillevne" },
    { icon: "🔧", label: "Din: planlægning" },
  ];
  if (week < 28) return [
    { icon: "🦶", label: "Hun: hævede ankler" },
    { icon: "🔥", label: "Hun: halsbrand" },
    { icon: "🤝", label: "Din: tilstedeværelse" },
    { icon: "💪", label: "Din: ansvar" },
  ];
  if (week < 36) return [
    { icon: "😓", label: "Hun: tung og træt" },
    { icon: "😤", label: "Hun: åndedræt" },
    { icon: "🧳", label: "Din: hospitalstaske" },
    { icon: "📱", label: "Din: oplad altid" },
  ];
  return [
    { icon: "⏳", label: "Hun: utålmodig" },
    { icon: "😰", label: "Din: klar til det" },
    { icon: "🚗", label: "Kend vejen" },
    { icon: "📞", label: "Hold telefon tæt" },
  ];
}

function getFarBodyDesc(week: number): { text: string; tip: string } {
  if (week < 12) return {
    text: "1. trimester kan føles ensomt for partneren — hun er syg og træt, men graviditeten er ikke synlig endnu. Dine omsorg og tålmodighed er afgørende nu.",
    tip: "Tag over med madlavning og undgå stærke dufte derhjemme — det gør en kæmpe forskel.",
  };
  if (week < 20) return {
    text: "2. trimester er ofte lettere for hende. Baby begynder at sparke, og du kan snart mærke det med din hånd. Det er et særligt øjeblik for jer begge.",
    tip: "Læg hånden på maven og vent — det er en af de øjeblikke man ikke glemmer.",
  };
  if (week < 28) return {
    text: "Baby hører jer begge tydeligt nu. Tal til maven, syng, og vær til stede — baby kender allerede din stemme. Hun har brug for din ro i denne periode.",
    tip: "Massér hendes ryg om aftenen — lændesmerter er meget almindelige nu og din hjælp er uvurderlig.",
  };
  if (week < 36) return {
    text: "3. trimester er fysisk hårdt. Hun bærer en fuldt udviklet baby og er sandsynligvis udmattet. Alt du tager fra hende nu er guld.",
    tip: "Tag styring på indkøb, madlavning og alt der kræver bøjning eller løft. Hun har ikke energien.",
  };
  return {
    text: "I er tæt på. Baby kan komme enhver dag. Hold telefonen opladet, kend vejen til hospitalet, og vær mentalt klar. Din ro er hendes tryghed.",
    tip: "Øv kørselruten til fødegangen, hav veer-timeren klar og hold telefonen opladet til enhver tid.",
  };
}

function getFarSymptoms(week: number): string[] {
  if (week < 12) return ["Kvalme & opkast (hende)", "Ekstrem træthed (hende)", "Ændret madlyst", "Stemningsudsving"];
  if (week < 20) return ["Begyndende spark (mærk dem!)", "Rundere mave (synlig nu)", "Mere energi hos hende", "Baby hører jeres stemmer"];
  if (week < 28) return ["Spark er tydelige", "Halsbrand (hende)", "Hævede ankler (hende)", "Rygsmerter (hende)"];
  if (week < 36) return ["Braxton Hicks-veer", "Åndenød (hende)", "Træt og tung (hende)", "Baby vender sig"];
  return ["Ægte veer begynder", "Vandafgang muligt", "Nesting (hun gør rent alt)", "I er klar begge to"];
}

function getFarNutritionTips(week: number): { icon: string; text: string }[] {
  if (week < 14) return [
    { icon: "🥤", text: "Hav ingefærte og kiks klar — det hjælper mod morgenkvalme" },
    { icon: "🍋", text: "Syrlige mad og kold drik kan lindre kvalme" },
    { icon: "🛒", text: "Tag over med indkøb — undgå stærkt lugtende mad" },
  ];
  if (week < 28) return [
    { icon: "🥗", text: "Lav nærende måltider med jern og folsyre til hende" },
    { icon: "💧", text: "Sørg for hun drikker nok — ca. 2 liter dagligt" },
    { icon: "🫐", text: "Blåbær og nødder er gode snacks til hende" },
  ];
  return [
    { icon: "🥣", text: "Små hyppige måltider hjælper mod halsbrand" },
    { icon: "🐟", text: "Fisk 2x om ugen giver vigtig omega-3 til baby" },
    { icon: "🛒", text: "Hav let tilgængeligt snackemad klar til hende" },
  ];
}

function getFarAffirmation(week: number): string {
  if (week < 12) return "Din ro og omsorg er det vigtigste fundament nu. Du er allerede en fantastisk partner. 🌿";
  if (week < 20) return "Din stemme er din baby allerede ved at kende. Tal til maven — det betyder noget. 💚";
  if (week < 28) return "Halvvejs! Du er en enorm støtte. Jeres baby er heldig at have jer begge. 🌿";
  if (week < 36) return "I er stærkere end I tror. Hvert valg du tager nu er en gave til jeres familie. 🌿";
  return "Du er klar. Hun er klar. Jeres barn er klar. Stol på jer selv — I har det, der skal til. 💚";
}

function getTrimesterLabel(week: number): string {
  if (week <= 12) return "1. trimester (uge 1-12)";
  if (week <= 27) return "2. trimester (uge 13-27)";
  return "3. trimester (uge 28-42)";
}

// ── Baby Animation Modal ───────────────────────────────────────────────────────
function getAnimConfig(week: number) {
  if (week < 10) return {
    bg: "linear-gradient(160deg, #0a1a12 0%, #0f2318 100%)",
    ringColor: "hsl(154 40% 30%)",
    facts: ["Hjertet begynder at slå", "Alle vitale organer dannes", "Størrelse: en hindbær"],
    label: "Embryo — uge " + week,
  };
  if (week < 14) return {
    bg: "linear-gradient(160deg, #0d1a1f 0%, #102030 100%)",
    ringColor: "hsl(200 40% 30%)",
    facts: ["Fingre og tæer formes", "Hjernen udvikler sig hurtigt", "Baby kan allerede gabe"],
    label: "Fosterstadiet — uge " + week,
  };
  if (week < 20) return {
    bg: "linear-gradient(160deg, #1a140d 0%, #251c0f 100%)",
    ringColor: "hsl(30 40% 35%)",
    facts: ["Babys sanser vågner", "Bevægelser begynder", "Du kan snart mærke dem"],
    label: "2. trimester — uge " + week,
  };
  if (week < 28) return {
    bg: "linear-gradient(160deg, #0f1a0f 0%, #162416 100%)",
    ringColor: "hsl(140 35% 28%)",
    facts: ["Baby hører din stemme", "Øjnene åbner og lukker", "Regelmæssig søvnrytme"],
    label: "Halvvejs — uge " + week,
  };
  if (week < 36) return {
    bg: "linear-gradient(160deg, #1a0f14 0%, #24101c 100%)",
    ringColor: "hsl(330 30% 30%)",
    facts: ["Baby er næsten klar", "Vender sig med hovedet nedad", "Hjernens finale forbindelser skabes"],
    label: "3. trimester — uge " + week,
  };
  return {
    bg: "linear-gradient(160deg, #0d150d 0%, #131f13 100%)",
    ringColor: "hsl(120 30% 25%)",
    facts: ["Fuldt udviklet", "Baby kan komme hvornår som helst", "I er klar — begge to"],
    label: "Terminen nærmer sig — uge " + week,
  };
}

function BabyAnimationModal({ week, size, onClose }: { week: number; size: ReturnType<typeof getBabySize>; onClose: () => void }) {
  const bullets = WEEK_BULLETS[week] ?? WEEK_BULLETS[closestWeek(week, WEEK_BULLETS)];
  const config = getAnimConfig(week);

  const openVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const q = encodeURIComponent(`fetal development week ${week} 3D animation in womb`);
    window.open(`https://www.youtube.com/results?search_query=${q}`, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: config.bg }}
    >
      <style>{`
        @keyframes melo-pulse-ring {
          0% { transform: scale(0.95); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.6; }
        }
        @keyframes melo-heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.08); }
          28% { transform: scale(1); }
          42% { transform: scale(1.04); }
          56% { transform: scale(1); }
        }
      `}</style>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-12 right-5 w-10 h-10 rounded-full flex items-center justify-center z-10"
        style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Top — week + trimester */}
      <div className="pt-14 pb-6 px-6 text-center">
        <p className="text-[0.62rem] tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          {config.label}
        </p>
        <p className="font-serif text-[3rem] font-normal leading-none text-white">Uge {week}</p>
      </div>

      {/* Centre — visual placeholder with heartbeat pulse */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
        {/* Pulse rings around stats */}
        <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 160 + i * 24, height: 160 + i * 24,
                border: `1px solid ${config.ringColor}`,
                animation: `melo-pulse-ring 3s ease-in-out ${i * 0.8}s infinite`,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
          {/* Central stats card */}
          <div
            className="w-36 h-36 rounded-full flex flex-col items-center justify-center gap-1"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: `1.5px solid ${config.ringColor}`,
              animation: "melo-heartbeat 1.8s ease-in-out infinite",
            }}
          >
            <p className="text-[0.52rem] tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>Foster</p>
            <p className="text-white font-semibold text-[1.1rem]">{size.lengthCm} cm</p>
            <div className="w-8 h-px my-0.5" style={{ background: "rgba(255,255,255,0.2)" }} />
            <p className="text-white font-semibold text-[1.1rem]">{size.weightG} g</p>
            <p className="text-[0.52rem] tracking-[0.12em] uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{size.label}</p>
          </div>
        </div>

        {/* Development facts */}
        <div className="w-full space-y-3 px-2">
          {bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl px-4 py-3"
              style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(255,255,255,0.15)" }}>
                <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-[0.82rem] text-white/85 leading-snug">{bullet}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom — YouTube video CTA */}
      <div className="px-6 pb-12 pt-4 space-y-3">
        <button
          onClick={openVideo}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-[0.95rem] transition-all active:scale-[0.98]"
          style={{ background: "hsl(var(--clay))", color: "white" }}
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white text-[0.7rem] ml-0.5">▶</span>
          </div>
          Se video af barnet i uge {week}
        </button>
        <p className="text-center text-[0.62rem]" style={{ color: "rgba(255,255,255,0.3)" }}>
          Åbner YouTube med 3D-animationer af foster i uge {week}
        </p>
        <button
          onClick={onClose}
          className="w-full py-2 text-[0.72rem]"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Luk
        </button>
      </div>
    </div>
  );
}

// ── Pregnant BarnPage ──────────────────────────────────────────────────────────
function PregnantBarnPage({ week: currentWeek, role }: { week: number; role: "mor" | "far" }) {
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [showAnimation, setShowAnimation] = useState(false);
  const weekScrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { addTask } = useFamily();

  const isFar = role === "far";

  const size = getBabySize(selectedWeek);
  const devCards = getDevCards(selectedWeek);
  const bodyPills = isFar ? getFarBodyPills(selectedWeek) : getBodyPills(selectedWeek);
  const bodyDesc = isFar ? getFarBodyDesc(selectedWeek) : getBodyDesc(selectedWeek);
  const symptoms = isFar ? getFarSymptoms(selectedWeek) : getSymptoms(selectedWeek);
  const nutrition = isFar ? getFarNutritionTips(selectedWeek) : getNutritionTips(selectedWeek);
  const affirmation = isFar ? getFarAffirmation(selectedWeek) : getAffirmation(selectedWeek);
  const recommendations = getWeekRecommendations(selectedWeek);

  // Scroll selected week into center on mount and week change
  useEffect(() => {
    const el = weekScrollRef.current;
    if (!el) return;
    const btn = el.querySelector(`[data-week="${selectedWeek}"]`) as HTMLElement;
    if (!btn) return;
    const offset = btn.offsetLeft - el.clientWidth / 2 + btn.offsetWidth / 2;
    el.scrollTo({ left: offset, behavior: "smooth" });
  }, [selectedWeek]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Uge ${selectedWeek} — Melo`,
          text: `Baby er i uge ${selectedWeek} på størrelse med ${size.label.toLowerCase()} — ${size.lengthCm} cm og ${size.weightG} g.`,
        });
      } catch {}
    }
  };

  return (
    <div className="space-y-4 pb-6">

      {showAnimation && (
        <BabyAnimationModal week={selectedWeek} size={size} onClose={() => setShowAnimation(false)} />
      )}

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between section-fade-in pt-1">
        <div className="w-9" />
        <div className="text-center">
          <h1 className="font-serif text-[2rem] font-normal leading-none" style={{ color: "hsl(var(--moss))" }}>
            Uge {selectedWeek}
          </h1>
          <p className="text-[0.65rem] text-muted-foreground mt-0.5">{getTrimesterLabel(selectedWeek)}</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-9 h-9 flex items-center justify-center rounded-full border transition-colors active:bg-[hsl(var(--stone-lighter))]"
            style={{ borderColor: "hsl(var(--stone-light))" }}>
            <Bookmark className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          </button>
          <button onClick={handleShare} className="w-9 h-9 flex items-center justify-center rounded-full border transition-colors active:bg-[hsl(var(--stone-lighter))]"
            style={{ borderColor: "hsl(var(--stone-light))" }}>
            <Share2 className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* ── Week selector ───────────────────────────────────────────────── */}
      <div
        ref={weekScrollRef}
        className="-mx-4 px-4 flex gap-2.5 overflow-x-auto scrollbar-none pb-1 section-fade-in"
        style={{ animationDelay: "30ms" }}
      >
        {Array.from({ length: 38 }, (_, i) => i + 5).map(w => {
          const isActive = w === selectedWeek;
          const isCurrent = w === currentWeek;
          return (
            <button
              key={w}
              data-week={w}
              onClick={() => setSelectedWeek(w)}
              className="flex flex-col items-center gap-0.5 flex-shrink-0 transition-all active:scale-90"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-[0.85rem] font-medium transition-all"
                style={{
                  background: isActive ? "hsl(var(--moss))" : "hsl(var(--warm-white))",
                  border: isActive ? "none" : "1.5px solid hsl(var(--stone-light))",
                  color: isActive ? "white" : "hsl(var(--foreground))",
                  fontWeight: isActive ? 700 : 400,
                  boxShadow: isActive ? "0 2px 8px hsl(var(--moss) / 0.25)" : "none",
                }}
              >
                {w}
              </div>
              {isCurrent && (
                <Heart className="w-2.5 h-2.5" style={{ color: "hsl(var(--moss))" }} fill="hsl(var(--moss))" />
              )}
              {!isCurrent && <div className="h-2.5" />}
            </button>
          );
        })}
      </div>

      {/* ── Hero card — Barnets udvikling ────────────────────────────────── */}
      <div
        className="rounded-3xl overflow-hidden section-fade-in"
        style={{ background: "hsl(var(--sage-light))", animationDelay: "60ms" }}
      >
        {/* Top content row */}
        <div className="flex min-h-[200px]">
          {/* Left text */}
          <div className="flex-1 p-5 pb-3 flex flex-col justify-between">
            <div>
              <p className="text-[0.58rem] tracking-[0.15em] uppercase font-medium mb-2 flex items-center gap-1.5"
                style={{ color: "hsl(var(--moss))" }}>
                🌱 Barnets udvikling
              </p>
              <h2 className="font-serif text-[1.3rem] font-normal leading-snug mb-3"
                style={{ color: "hsl(var(--bark))" }}>
                Din baby er på størrelse med {size.label === "?" ? "et lille mirakel" : `en ${size.label.toLowerCase()}`} {size.emoji}
              </h2>
              {/* 2 bullet points from devCards */}
              <ul className="space-y-2 mb-4">
                {devCards.slice(0, 2).map(card => (
                  <li key={card.title} className="flex items-start gap-2 text-[0.75rem]"
                    style={{ color: "hsl(var(--bark))" }}>
                    <span className="w-4.5 h-4.5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: "hsl(var(--moss) / 0.15)" }}>
                      <Check className="w-2.5 h-2.5" style={{ color: "hsl(var(--moss))" }} strokeWidth={2.5} />
                    </span>
                    <span className="leading-snug">{card.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Length + weight pills */}
            <div className="flex gap-2">
              <div className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                style={{ background: "rgba(255,255,255,0.75)" }}>
                <span className="text-[1.1rem]">{size.emoji}</span>
                <div>
                  <p className="text-[0.5rem] tracking-[0.1em] uppercase text-muted-foreground">Længde</p>
                  <p className="text-[0.8rem] font-semibold" style={{ color: "hsl(var(--bark))" }}>ca. {size.lengthCm} cm</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                style={{ background: "rgba(255,255,255,0.75)" }}>
                <span className="text-[1.1rem]">⚖️</span>
                <div>
                  <p className="text-[0.5rem] tracking-[0.1em] uppercase text-muted-foreground">Vægt</p>
                  <p className="text-[0.8rem] font-semibold" style={{ color: "hsl(var(--bark))" }}>ca. {size.weightG} g</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — fetal silhouette */}
          <div className="w-[44%] flex items-center justify-center py-4 pr-3 pl-1">
            <div
              className="w-full aspect-square rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.6), rgba(255,255,255,0.15) 70%)",
                border: "1.5px solid rgba(255,255,255,0.5)",
                boxShadow: "inset 0 3px 16px rgba(255,255,255,0.35), 0 4px 20px rgba(38,66,54,0.12)",
              }}
            >
              <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "72%", height: "72%" }}>
                {/* Head */}
                <ellipse cx="61" cy="29" rx="19" ry="21" fill="rgba(38,66,54,0.28)" />
                {/* Face highlight */}
                <ellipse cx="56" cy="24" rx="7" ry="8" fill="rgba(255,255,255,0.18)" />
                {/* Body */}
                <ellipse cx="47" cy="72" rx="23" ry="30" fill="rgba(38,66,54,0.22)" transform="rotate(-10 47 72)" />
                {/* Upper arm near face */}
                <path d="M 57 50 Q 72 58 73 73" stroke="rgba(38,66,54,0.25)" strokeWidth="9" strokeLinecap="round" fill="none" />
                {/* Hand/fist near face */}
                <circle cx="73" cy="75" r="6" fill="rgba(38,66,54,0.22)" />
                {/* Legs tucked up */}
                <path d="M 27 84 Q 17 100 26 112 Q 37 120 53 116 Q 67 112 74 100" stroke="rgba(38,66,54,0.26)" strokeWidth="11" strokeLinecap="round" fill="none" />
                {/* Foot/heel hint */}
                <ellipse cx="74" cy="100" rx="7" ry="5" fill="rgba(38,66,54,0.2)" transform="rotate(-20 74 100)" />
                {/* Umbilical cord */}
                <path d="M 34 80 Q 20 84 17 75 Q 14 65 23 62" stroke="rgba(38,66,54,0.13)" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom — animation CTA */}
        <div className="flex justify-between items-center px-4 pb-4 pt-1">
          <p className="text-[0.65rem] text-muted-foreground leading-snug max-w-[55%]">
            {size.label} · {size.lengthCm} cm · {size.weightG} g
          </p>
          <button
            onClick={() => setShowAnimation(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[0.75rem] font-semibold transition-all active:scale-95"
            style={{ background: "hsl(var(--clay))", color: "white" }}
          >
            Se 3D-animation
            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white/20">
              <span className="text-[0.45rem] ml-0.5">▶</span>
            </div>
          </button>
        </div>
      </div>

      {/* ── 2-column cards row 1: Din krop + Kost & næring ──────────────── */}
      <div className="grid grid-cols-2 gap-3 section-fade-in" style={{ animationDelay: "90ms" }}>

        {/* Din krop i denne fase */}
        <div className="rounded-2xl p-4 flex flex-col"
          style={{ background: "hsl(var(--warm-white))", border: "1px solid hsl(var(--stone-light))" }}>
          <div className="flex items-start justify-between mb-3">
            <p className="text-[0.72rem] font-semibold leading-snug pr-1" style={{ color: "hsl(var(--bark))" }}>
              {isFar ? "Din rolle som partner" : "Din krop i denne fase"}
            </p>
          </div>
          <ul className="space-y-2.5 flex-1">
            {bodyPills.slice(0, 3).map(pill => (
              <li key={pill.label} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[0.9rem]"
                  style={{ background: "hsl(var(--stone-lighter))" }}>
                  {pill.icon}
                </div>
                <span className="text-[0.72rem] leading-snug text-muted-foreground">{pill.label}</span>
              </li>
            ))}
          </ul>
          <Link to="/chat"
            className="flex items-center gap-0.5 text-[0.68rem] font-medium mt-3"
            style={{ color: "hsl(var(--moss))" }}>
            {isFar ? "Læs om din rolle" : "Læs mere om din krop"} <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Kost & næring */}
        <div className="rounded-2xl p-4 flex flex-col"
          style={{ background: "hsl(var(--warm-white))", border: "1px solid hsl(var(--stone-light))" }}>
          <div className="flex items-start justify-between mb-3">
            <p className="text-[0.72rem] font-semibold leading-snug pr-1" style={{ color: "hsl(var(--bark))" }}>
              {isFar ? "Du kan hjælpe med" : "Kost & næring"}
            </p>
            <span className="text-base flex-shrink-0">🍎</span>
          </div>
          <ul className="space-y-2.5 flex-1">
            {nutrition.map(n => (
              <li key={n.text} className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[0.9rem]"
                  style={{ background: "hsl(var(--stone-lighter))" }}>
                  {n.icon}
                </div>
                <span className="text-[0.72rem] leading-snug text-muted-foreground">{n.text}</span>
              </li>
            ))}
          </ul>
          <Link to="/chat"
            className="flex items-center gap-0.5 text-[0.68rem] font-medium mt-3"
            style={{ color: "hsl(var(--moss))" }}>
            Se flere kostraad <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* ── 2-column cards row 2: Vitaminer + Forbered ──────────────────── */}
      <div className="grid grid-cols-2 gap-3 section-fade-in" style={{ animationDelay: "110ms" }}>

        {/* Vitaminer & anbefalinger */}
        <div className="rounded-2xl p-4 flex flex-col"
          style={{ background: "hsl(var(--cream))", border: "1px solid hsl(var(--stone-light))" }}>
          <div className="flex items-start justify-between mb-2">
            <p className="text-[0.65rem] font-semibold tracking-[0.08em] uppercase leading-snug"
              style={{ color: "hsl(var(--clay))" }}>
              {isFar ? "Dit velvard" : "Vitaminer & anbefalinger"}
            </p>
            <span className="text-base flex-shrink-0">💊</span>
          </div>
          <p className="text-[0.72rem] text-muted-foreground leading-relaxed flex-1">
            {selectedWeek <= 12
              ? "Folsyre og D-vitamin er vigtigst nu. Start fra dag et."
              : selectedWeek <= 27
              ? "Fortsæt med folsyre og D-vitamin. Tal med læge om jern."
              : "Jern, kalk og D-vitamin er ekstra vigtigt i 3. trimester."}
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.6)" }}>
              🌿
            </div>
            <p className="text-[0.65rem] text-muted-foreground leading-snug">{affirmation}</p>
          </div>
          <Link to="/chat"
            className="flex items-center gap-0.5 text-[0.68rem] font-medium mt-3"
            style={{ color: "hsl(var(--clay))" }}>
            Se anbefalinger <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Denne uge kan I forberede */}
        <div className="rounded-2xl p-4 flex flex-col"
          style={{ background: "hsl(var(--clay-light))", border: "1px solid hsl(var(--clay) / 0.2)" }}>
          <div className="flex items-start justify-between mb-3">
            <p className="text-[0.65rem] font-semibold tracking-[0.08em] uppercase leading-snug"
              style={{ color: "hsl(var(--clay))" }}>
              Denne uge kan I forberede
            </p>
            <span className="text-base flex-shrink-0">📅</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 flex-1">
            {recommendations.slice(0, 4).map(rec => (
              <button
                key={rec.title}
                onClick={() => addTask(rec.title, "fælles", "never")}
                className="rounded-xl p-2.5 text-left transition-all active:scale-95 flex flex-col gap-1"
                style={{ background: "rgba(255,255,255,0.55)" }}
              >
                <span className="text-[0.95rem]">{rec.icon}</span>
                <p className="text-[0.65rem] font-medium leading-snug" style={{ color: "hsl(var(--bark))" }}>
                  {rec.title}
                </p>
              </button>
            ))}
          </div>
          <Link to="/tjekliste"
            className="flex items-center gap-0.5 text-[0.68rem] font-medium mt-3"
            style={{ color: "hsl(var(--clay))" }}>
            Se tjekliste <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* ── Fødselsplan (week 30+) ─────────────────────────────────────── */}
      {selectedWeek >= 30 && (
        <Link
          to="/foedselsplan"
          className="flex items-center gap-4 rounded-2xl px-5 py-4 section-fade-in transition-all active:scale-[0.98]"
          style={{
            background: "hsl(var(--sage-light))",
            border: "1px solid hsl(var(--sage) / 0.3)",
            animationDelay: "130ms",
          }}
        >
          <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-2xl"
            style={{ background: "hsl(var(--sage) / 0.2)" }}>
            🌿
          </div>
          <div className="flex-1">
            <p className="text-[0.88rem] font-semibold" style={{ color: "hsl(var(--moss))" }}>Vores foedselsplan</p>
            <p className="text-[0.7rem] text-muted-foreground">Dokumentér jeres ønsker til fødslen</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
        </Link>
      )}

      {/* ── Veer-timer (week 36+) ──────────────────────────────────────── */}
      {selectedWeek >= 36 && (
        <Link
          to="/veer"
          className="flex items-center gap-4 rounded-2xl px-5 py-4 section-fade-in transition-all active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, hsl(var(--clay-light)), hsl(var(--cream)))",
            border: "1px solid hsl(var(--clay) / 0.3)",
            animationDelay: "140ms",
          }}
        >
          <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-2xl"
            style={{ background: "rgba(255,255,255,0.5)" }}>
            ⏱️
          </div>
          <div className="flex-1">
            <p className="text-[0.88rem] font-semibold" style={{ color: "hsl(var(--clay))" }}>Ve-timer</p>
            <p className="text-[0.7rem] text-muted-foreground">Track veer og del live med din partner</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
        </Link>
      )}

      {/* ── Footer disclaimer ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between rounded-2xl px-4 py-3.5 section-fade-in"
        style={{ background: "hsl(var(--stone-lighter))", animationDelay: "150ms" }}>
        <div className="flex items-start gap-2 flex-1">
          <span className="text-[0.9rem] flex-shrink-0">ℹ️</span>
          <p className="text-[0.62rem] text-muted-foreground leading-relaxed">
            Informationen er generel og baseret på sundhedsfaglige kilder.
            Kontakt din læge eller jordemoder, hvis du er i tvivl.
          </p>
        </div>
        <button className="flex items-center gap-1 text-[0.65rem] font-medium flex-shrink-0 ml-3" style={{ color: "hsl(var(--moss))" }}>
          Vores kilder <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[0.5rem]">i</span>
        </button>
      </div>

    </div>
  );
}

function getFarBabyTip(ageWeeks: number, childName: string): string {
  if (ageWeeks < 2) return `Hold ${childName} hud-mod-hud på dit bryst — din stemme og din varme skaber tilknytning fra dag ét.`;
  if (ageWeeks < 6) return `Tal til ${childName} mens du skifter ble, bader eller bærer dem — din stemme er det vigtigste stimuli nu.`;
  if (ageWeeks < 12) return `Lav "borte-tit-tit" og øjenkontakt — ${childName} smiler socialt nu og du er en af favoritterne.`;
  const months = Math.floor(ageWeeks / 4.33);
  if (months < 6) return `Læg ${childName} på maven (tummy time) og opmuntr dem med dit ansigt — det styrker nakken og giver jer begge glæde.`;
  if (months < 9) return `${childName} elsker at efterligne — lav lyde og grimasser og se dem svare. Det er fundamentet for sproget.`;
  return `Leg "gem gemme" og sæt enkle ord på alt — dit engagement nu er direkte investering i ${childName}s sprogudvikling.`;
}

function BornBarnPage({ ageWeeks, ageMonths, role }: { ageWeeks: number; ageMonths: number; role: "mor" | "far" }) {
  const { profile } = useFamily();
  const { t } = useTranslation();
  const childName = profile.children?.[0]?.name || "Baby";
  const isFar = role === "far";
  const insight = getBabyInsight(ageWeeks, childName);
  const activeLeap = getActiveLeap(ageWeeks);

  const [completedLeaps, setCompletedLeaps] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("melo-achieved-leaps");
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [expandedLeap, setExpandedLeap] = useState<string | null>(null);

  const leaps = getLeapStatus(ageWeeks, completedLeaps);

  const toggleLeapCompleted = (id: string) => {
    setCompletedLeaps((prev) => {
      const next = prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id];
      localStorage.setItem("melo-achieved-leaps", JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="space-y-5 pb-6">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between section-fade-in">
        <div className="w-8" />
        <div className="text-center">
          <p className="text-[1rem] font-semibold">{childName}</p>
          <p className="text-[0.65rem] text-muted-foreground">
            {ageMonths < 3 ? t("barn.weeksLabel", { weeks: ageWeeks }) : t("barn.monthsLabel", { months: ageMonths })}
          </p>
        </div>
        <Share2 className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
      </div>

      {/* ── Hero insight card ───────────────────────────────────────────── */}
      <div
        className="rounded-[20px] overflow-hidden section-fade-in"
        style={{
          background: isFar
            ? "linear-gradient(145deg, hsl(154 27% 24%), hsl(154 22% 16%))"
            : "linear-gradient(145deg, hsl(22 35% 32%), hsl(22 30% 22%))",
          animationDelay: "40ms",
        }}
      >
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between mb-3">
            <span className="text-[0.68rem] font-semibold px-2.5 py-1 rounded-full text-white"
              style={{ background: "rgba(255,255,255,0.15)" }}>
              {ageMonths < 3 ? `${ageWeeks} uger` : `${ageMonths} måneder`}
            </span>
            <span className="text-[3rem] leading-none">👶</span>
          </div>
          <p className="font-serif text-[1.3rem] font-medium text-white leading-snug mb-2">
            {insight.insight}
          </p>
          <div className="flex items-start gap-2 mt-3 px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.12)" }}>
            <span className="text-sm flex-shrink-0">💡</span>
            <p className="text-[0.78rem] text-white/80 leading-relaxed">{insight.tip}</p>
          </div>
        </div>
      </div>

      <div className="section-fade-in" style={{ animationDelay: "120ms" }}>
        <BabyMeasurements childName={childName} ageWeeks={ageWeeks} />
      </div>

      {/* ── Far-specific dev tip ─────────────────────────────────────────── */}
      {isFar && (
        <div
          className="rounded-2xl px-4 py-4 flex items-start gap-3 section-fade-in"
          style={{ background: "hsl(var(--sage-light))", border: "1px solid hsl(var(--sage) / 0.3)", animationDelay: "130ms" }}
        >
          <span className="text-xl flex-shrink-0">🤲</span>
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-wide mb-1" style={{ color: "hsl(var(--moss))" }}>Din rolle nu</p>
            <p className="text-[0.8rem] leading-relaxed">{getFarBabyTip(ageWeeks, childName)}</p>
          </div>
        </div>
      )}

      <Link to="/leg" className="block">
        <div className="rounded-2xl p-4 flex items-center gap-3 section-fade-in transition-all hover:shadow-sm active:scale-[0.98]" style={{
          animationDelay: "140ms",
          background: "linear-gradient(135deg, hsl(var(--sage) / 0.08), hsl(var(--sage) / 0.03))",
          border: "1px solid hsl(var(--sage) / 0.2)",
        }}>
          <span className="text-2xl">🎨</span>
          <div className="flex-1">
            <p className="text-[0.88rem] font-medium">{t("barn.playActivities")}</p>
            <p className="text-[0.68rem] text-muted-foreground">{t("barn.suggestionsForAge", { childName })}</p>
          </div>
          <span className="text-muted-foreground">→</span>
        </div>
      </Link>

      <div className="section-fade-in" style={{ animationDelay: "160ms" }}>
        <h2 className="text-[1rem] font-semibold mb-3">{t("barn.leaps")}</h2>
        <p className="text-[0.75rem] text-muted-foreground mb-4 leading-relaxed">
          {t("barn.leapsDesc", { childName })}
        </p>

        <div className="space-y-2">
          {leaps.map((leap) => {
            const isExpanded = expandedLeap === leap.id;
            const statusStyles: Record<string, { bg: string; border: string; dot: string }> = {
              completed: { bg: "hsl(var(--sage-light) / 0.5)", border: "hsl(var(--sage) / 0.2)", dot: "hsl(var(--sage))" },
              achieved: { bg: "hsl(var(--moss) / 0.08)", border: "hsl(var(--moss) / 0.3)", dot: "hsl(var(--moss))" },
              active: { bg: "hsl(var(--clay) / 0.08)", border: "hsl(var(--clay) / 0.3)", dot: "hsl(var(--clay))" },
              upcoming: { bg: "hsl(var(--warm-white))", border: "hsl(var(--stone-light))", dot: "hsl(var(--stone))" },
            };
            const s = statusStyles[leap.status];

            return (
              <div key={leap.id} className="rounded-2xl overflow-hidden transition-all" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                <button onClick={() => setExpandedLeap(isExpanded ? null : leap.id)} className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all active:scale-[0.99]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-lg" style={{ background: `${s.dot}20` }}>
                    {leap.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={cn("text-[0.85rem] font-medium", leap.status === "upcoming" && "text-foreground/50")}>{leap.title}</p>
                      <span className="text-[0.55rem] tracking-[0.1em] uppercase text-muted-foreground">~{leap.weekStart} {t("common.weeks")}</span>
                    </div>
                    {leap.status === "active" && (
                      <p className="text-[0.65rem] mt-0.5" style={{ color: "hsl(var(--clay))" }}>{t("barn.happeningNow")}</p>
                    )}
                  </div>
                  {(leap.status === "completed" || leap.status === "achieved") && (
                    <span className="text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--sage) / 0.15)", color: "hsl(var(--moss))" }}>
                      ✓ {leap.achievedEarly ? t("barn.earlyReached") : t("barn.reached")}
                    </span>
                  )}
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3">
                    <p className="text-[0.78rem] text-foreground/70 leading-relaxed">{leap.description}</p>
                    <div>
                      <p className="text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground mb-1.5">{t("barn.signsToWatch")}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {leap.signs.map((sign, i) => (
                          <span key={i} className="text-[0.68rem] px-2.5 py-1 rounded-full" style={{ background: "hsl(var(--warm-white))", border: "1px solid hsl(var(--stone-light))" }}>{sign}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground mb-1.5">{t("barn.tips")}</p>
                      <ul className="space-y-1">
                        {leap.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-[0.75rem] text-foreground/70">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "hsl(var(--sage))" }} />{tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLeapCompleted(leap.id); }}
                      className={cn(
                        "w-full mt-2 py-2.5 rounded-xl text-[0.72rem] tracking-[0.08em] uppercase font-medium transition-all active:scale-[0.98]",
                        completedLeaps.includes(leap.id)
                          ? "bg-[hsl(var(--moss))] text-white"
                          : "border border-[hsl(var(--stone-light))] hover:border-[hsl(var(--sage))] text-foreground/70"
                      )}
                    >
                      {completedLeaps.includes(leap.id) ? t("barn.childReached", { childName }) : t("barn.markReached")}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
}
