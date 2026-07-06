/**
 * farBabyContent.ts — Aldersbevidst indhold til far i baby-fasen.
 *
 * Skrevet til et primært mandligt publikum med referencer, han kan spejle sig
 * i (kettlebell, workout, sport) — men aldrig på bekostning af det egentlige
 * formål: at gøre forældreskabet, kommunikationen og opgavefordelingen
 * lettere, og at støtte mor i efterfødselstiden.
 *
 * Indholdet er bevidst kort: en træt mand med et barn i den ene arm skal
 * kunne læse det på 10 sekunder og handle på det.
 */

export type FeedingMethod = "amning" | "flaske" | "begge" | undefined;

export interface FarBabyAgeContent {
  ageMin: number; // i uger, inklusive
  ageMax: number; // i uger, eksklusive — Infinity for sidste bucket
  label: string;  // kort beskrivelse af fasen

  /** Ugens vægt-sammenligning. Erstattes dynamisk med {weight} = baby kg. */
  weightCompare: { emoji: string; comparison: string; workout: string };

  /** Korte fakta-bidder, far kan læse på vej til skraldespanden. */
  facts: { emoji: string; text: string; sub: string }[];

  /**
   * Sådan støtter du mor i denne fase. Tre kategorier:
   * - physical: hvad hendes krop går igennem, og hvordan du letter trykket
   * - practical: konkrete ting du kan tage uden at spørge
   * - emotional: ord og handlinger der får hende til at føle sig set
   */
  morSupport: {
    physical: string[];
    practical: string[];
    emotional: string[];
  };

  /** Vagtfordeling, der ændrer sig med fodermetoden. */
  shiftSuggestions: {
    amning: string[];
    flaske: string[];
    begge: string[];
  };

  /** Aktiviteter med baby — workout-vinklen er valgfri krydderi. */
  activities: {
    emoji: string;
    title: string;
    benefit: string;     // for baby/jeres bånd
    workout?: string;    // den humoristiske kropsvinkel
  }[];

  /** Korte reminders, der kan rotere som "dagens tip" til far. */
  reminders: { emoji: string; text: string }[];
}

// ──────────────────────────────────────────────────────────────────────────────
// Indhold pr. aldersbucket
// ──────────────────────────────────────────────────────────────────────────────

export const farBabyContent: FarBabyAgeContent[] = [
  // ── 0–4 uger: den nyfødte ──────────────────────────────────────────────────
  {
    ageMin: 0,
    ageMax: 4,
    label: "Den nyfødte fase",

    weightCompare: {
      emoji: "🏋️",
      comparison: "Baby vejer ca. {weight} kg — som en lille kettlebell",
      workout: "Bær 20 minutter = grip strength + core stabilitet",
    },

    facts: [
      { emoji: "🧠", text: "Hjernen danner 1 million nye nerveforbindelser i sekundet", sub: "Når du taler, synger eller bare bærer — bygger du hjerne." },
      { emoji: "👀", text: "Baby kan kun fokusere 20–25 cm væk", sub: "Præcis afstanden til dit ansigt under bæring." },
      { emoji: "👃", text: "Baby kan kende din lugt på flere meters afstand", sub: "Du er allerede en kendt zone for dem." },
      { emoji: "🌙", text: "4–6 timer brudt søvn ≈ 0,1 promille", sub: "Kør forsigtigt. Vær blid mod dig selv og mor." },
    ],

    morSupport: {
      physical: [
        "Hendes krop er i fuld restitution — undgå at hun løfter mere end baby de første 6 uger",
        "Hun blødder stadig (op til 4–6 uger) — tjek om der er rene bind, undertøj og smertestillende",
        "Bækkenbund og evt. ar/sting heler — sørg for hun ikke står for længe ad gangen",
      ],
      practical: [
        "Sørg for at hun har vand og en snack i nærheden — hun er låst når hun ammer",
        "Tag alle bleskift når du er hjemme — det er hurtigt og det tæller",
        "Saml vasketøj, åbn opvaskemaskine, ryd op uden at blive bedt om det",
        "Bær baby i 20–30 min ad gangen, så hun kan brusebade i ro",
      ],
      emotional: [
        "Baby kan ikke selv sige tak — så hun har stadig brug for at høre det fra dig",
        "Sig 'du gør det godt' højt, helst flere gange dagligt",
        "Anerkend hvad hun har gjort i dag — også når det 'bare' er at amme og hvile",
        "Lyt uden at løse — nogle gange skal hun bare have lov at sige det højt",
      ],
    },

    shiftSuggestions: {
      amning: [
        "Putning kræver nærhed, ikke amning — du kan sagtens tage aftenputningen",
        "Hjælp baby til brystet om natten, så hun ikke skal stå op",
        "Bring baby til hende i sengen, tag det tilbage når amningen er færdig",
      ],
      flaske: [
        "Tag en hel nattevagt 1–2 gange om ugen — én sammenhængende søvncyklus til hende er guld",
        "Forbered flasker om aftenen, så natten kører glat",
        "Skift fodringsrunder så ingen skal stå alle nætter",
      ],
      begge: [
        "Når hun ammer, så tag næste flaskefodring — så får hun en sammenhængende søvn",
        "Tag aftenputningen — du kan sagtens bære og lulle uden flaske",
      ],
    },

    activities: [
      { emoji: "🫂", title: "Hud-mod-hud på sofaen", benefit: "Regulerer babys puls, temperatur og stress", workout: "Time under tension — 30 min er nok" },
      { emoji: "🗣️", title: "Snak til baby om hvad du laver", benefit: "Stemmen er sprog-fundament — det tæller", workout: "Multitask: dialog + dish washing" },
      { emoji: "🎵", title: "Syng en sang du allerede kan", benefit: "Variation i tonefald aktiverer 3× så mange hjerneområder", workout: "Vejrtrækningskontrol" },
      { emoji: "👀", title: "Hold baby tæt på og se på hinanden", benefit: "Det første sociale signal — bygger tilknytning", workout: "Stillhed = også træning" },
    ],

    reminders: [
      { emoji: "💧", text: "Sørg for at mor har vand og snacks i armslængde — hun er låst når hun ammer" },
      { emoji: "💬", text: "Baby kan ikke selv sige tak — så hun har stadig brug for at høre det fra dig" },
      { emoji: "🚪", text: "Tag baby når du kommer ind ad døren — hun har brug for at lade op" },
      { emoji: "🛒", text: "Hav altid noget nemt i fryseren — sult gør alting hårdere" },
      { emoji: "🤐", text: "Lyt uden at løse — nogle gange skal hun bare have lov at sige det højt" },
    ],
  },

  // ── 4–12 uger: smilet og rytmen ────────────────────────────────────────────
  {
    ageMin: 4,
    ageMax: 12,
    label: "Smilet og rytmen",

    weightCompare: {
      emoji: "💪",
      comparison: "Baby vejer ca. {weight} kg — håndvægts-niveau",
      workout: "Bæring + trappe = Zone 2-cardio uden hjelm",
    },

    facts: [
      { emoji: "😊", text: "Det første ægte sociale smil kommer omkring uge 6", sub: "Det er ikke gas — det er rent kærlighed til dig." },
      { emoji: "🧠", text: "Hjernen er stadig i eksplosiv udvikling", sub: "Hvert blik, hvert smil, hver lyd tæller." },
      { emoji: "💤", text: "Baby kender endnu ikke dag og nat", sub: "Hold dage lyse og aktive, nætter mørke og rolige." },
      { emoji: "🎵", text: "At synge for baby — selv falsk — er rigtig god stimulation", sub: "Stemmens variation > de rigtige toner." },
    ],

    morSupport: {
      physical: [
        "Hun har brug for at gå små ture — ikke at træne hårdt endnu",
        "Bækkenbundstræning er ikke 'flot at gøre' — det er medicinsk nødvendigt",
        "Søvnmangel påvirker humør, kognition og immunforsvar — 20 minutters lur tæller",
      ],
      practical: [
        "Planlæg én aften om ugen hvor hun har 2 timer for sig selv",
        "Tag indkøb og madplanen — gentag, så hun ikke skal tænke på det",
        "Hold huset i 'god nok'-stand — ikke perfekt",
        "Sørg for at hun ikke står for længe ad gangen",
      ],
      emotional: [
        "Sig 'du klarer det godt' — selv på dage hvor det ikke føles sådan",
        "Spørg konkret: 'hvad har du brug for lige nu?' — ikke et generelt 'er du okay?'",
        "Fejr de små ting — første smil, første grin, første fulde nat",
        "Mind hende om hvad hun har klaret — det forsvinder hurtigt i hverdagen",
      ],
    },

    shiftSuggestions: {
      amning: [
        "Tag aftenputningen — du kan sagtens lulle uden bryst",
        "Bring baby til hende om natten, hold dig vågen 5 min så hun kan sove ind igen",
        "Tag morgenrunden — så hun får én ekstra times søvn",
      ],
      flaske: [
        "Tag mindst én sammenhængende nattevagt om ugen",
        "Skift fodringerne så I begge får ~6 timers søvn ind imellem",
        "Forbered flasker aftenen før — så natten kører glat",
      ],
      begge: [
        "Når hun ammer, så tag næste flaskefodring så hun får 6+ timers søvn",
        "Tag aftenputningen — det handler om nærhed, ikke amning",
      ],
    },

    activities: [
      { emoji: "🚶", title: "Gå en tur med baby i sele eller vogn", benefit: "Frisk luft + søvn + sansestimulation", workout: "5–10 km gåtur med 5+ kg vest" },
      { emoji: "🛁", title: "Tag badetid — du i karret, baby ovenpå", benefit: "Hud-mod-hud + ro — kæmpe bonding-boost", workout: "Recovery mode" },
      { emoji: "🤸", title: "Tummy time på dit bryst 3× dagligt", benefit: "Styrker nakke + ryg, forebygger flad baghoved", workout: "Du ligger ned — wow" },
      { emoji: "😜", title: "Lav grimasser og overdrev ansigtsudtryk", benefit: "Baby spejler og bygger sociale forbindelser", workout: "Facial workout" },
      { emoji: "🎶", title: "Far-playlist til baby", benefit: "Baby genkender din 'sound' resten af livet", workout: "Det kommer derhen vi går" },
    ],

    reminders: [
      { emoji: "🧠", text: "Babyens hjerne vokser cirka 1% om dagen — øjenkontakt og stemme er raketbrændstof" },
      { emoji: "💬", text: "Sig noget rart til mor — hun hører det mindre end du tror" },
      { emoji: "🌅", text: "Lad mor sove ud én morgen om ugen — uden alarmer, uden spørgsmål" },
      { emoji: "📵", text: "Skærmen kan vente — baby kan ikke" },
      { emoji: "👀", text: "Se hvad der skal gøres — og gør det. Ingen tjekliste. Bare gør det." },
    ],
  },

  // ── 12–26 uger: gribe, rulle, le ───────────────────────────────────────────
  {
    ageMin: 12,
    ageMax: 26,
    label: "Gribe, rulle, le",

    weightCompare: {
      emoji: "🏋️‍♂️",
      comparison: "Baby vejer ca. {weight} kg — kettlebell-størrelse",
      workout: "Leg = Russian twists, dødløft, deadbug. Træning er gratis.",
    },

    facts: [
      { emoji: "😂", text: "Baby begynder at grine højt — ikke bare smil", sub: "Det er et socialt signal: 'jeg stoler på dig, gør det igen.'" },
      { emoji: "🤚", text: "Greb = hjernekraft", sub: "Hver gang noget holdes, bygges nye nerve-forbindelser." },
      { emoji: "🔄", text: "Baby ruller og vender sig", sub: "Aldrig efterlad alene på sofa/puslebord — gælder fra nu." },
      { emoji: "💤", text: "4-måneders søvnregression er normal", sub: "Det er ikke en regression — det er en modning. Det går over." },
    ],

    morSupport: {
      physical: [
        "Mange mødre vender tilbage til motion nu — men kroppen er stadig under forandring",
        "Amning kan give skuldersmerter — tilbyd skuldermassage uden at blive bedt om det",
        "Søvn er stadig brudt — pas på at hun ikke 'glemmer' at hvile fordi det føles 'bedre'",
      ],
      practical: [
        "Hav babymad og snacks klar når hun amer — det varer længere nu",
        "Tag flere indkøbsrunder selv — barnevognen er nemmere end før",
        "Lad hende træne én aften om ugen — og hold huset uden at spørge",
        "Begynd at planlægge fælles aktiviteter — også uden baby",
      ],
      emotional: [
        "Hun savner måske sig selv — den frihed hun havde før. Anerkend det uden at fikse",
        "Spørg om hendes drømme — ikke kun om baby",
        "Mind hende om hvad I har klaret — bagudblik bygger styrke",
        "Date night behøver ikke være ude af huset — det handler om opmærksomhed",
      ],
    },

    shiftSuggestions: {
      amning: [
        "Putning er stadig dit territorium — det er en gave at give hende fri",
        "Aftenrutinen (bad → bog → godnat) er perfekt fars-tid",
      ],
      flaske: [
        "Mange babyer går længere mellem fodringer nu — natten bliver bedre",
        "Tag de sene aftenflasker (22-23) — hun kan sove tidligt",
      ],
      begge: [
        "Skift fodringer flydende — det er ikke en regnemaskine",
        "Tag aftenputningen og nattens første runde — det giver hende den dybeste søvn",
      ],
    },

    activities: [
      { emoji: "🦅", title: "Flyveren på dine ben", benefit: "Vestibulær stimulation + grin", workout: "Deadbug variation, kerne under pres" },
      { emoji: "🤲", title: "Tilbud forskellige teksturer — stof, træ, plastik", benefit: "Sanseudforskning bygger hjerne", workout: "Grip variety" },
      { emoji: "🪞", title: "Spejlleg — pege og navngive", benefit: "Selv-genkendelse + sprog", workout: "Mest mental" },
      { emoji: "🎵", title: "Klap til musik på din skød", benefit: "Rytme + sociale signaler", workout: "Cardio (let)" },
      { emoji: "🚶", title: "Bær i sele opad bakke", benefit: "Søvn + frisk luft for baby", workout: "Wheightveted hike — gratis træningstur" },
    ],

    reminders: [
      { emoji: "🛡️", text: "Aldrig efterlad baby alene på sofa eller puslebord — de ruller pludseligt" },
      { emoji: "💬", text: "Hun har stadig brug for at høre 'du gør det godt' — også når du tror hun ved det" },
      { emoji: "🍽️", text: "Lav middag eller bestil — sult gør mor og dig surere på hinanden" },
      { emoji: "🛌", text: "Når baby sover, så sov ikke selv — tag tøjvasken eller giv hende en pause i stedet" },
      { emoji: "📸", text: "Tag ét billede af mor og baby i dag — hun er sjældent med på billederne selv" },
    ],
  },

  // ── 26–52 uger: kravler, prøver mad ────────────────────────────────────────
  {
    ageMin: 26,
    ageMax: 52,
    label: "Kravler, prøver mad",

    weightCompare: {
      emoji: "🏋️‍♀️",
      comparison: "Baby vejer ca. {weight} kg — middelvægts-kettlebell",
      workout: "Kravletid på gulvet med baby = bear crawls og squats hele dagen",
    },

    facts: [
      { emoji: "🧩", text: "Baby forstår nu at ting eksisterer selvom de er gemt", sub: "Derfor er tittit-bansen pludselig det bedste." },
      { emoji: "🍎", text: "Omkring 6 mdr er de fleste babyer klar til fast føde", sub: "Tegn: kan sidde med støtte, griber efter mad, mistet tungetrykningsrefleks." },
      { emoji: "😢", text: "Separationsangst begynder", sub: "Det er tegn på stærk tilknytning — ikke et problem." },
      { emoji: "🚪", text: "Babysikring er ikke for tidligt nu", sub: "Når de først kravler, er der ingen pause." },
    ],

    morSupport: {
      physical: [
        "Amning aftager for mange omkring nu — kroppen skifter igen",
        "Hun kan stadig være træt — søvn er ikke pålideligt selv ved 9 måneder",
        "Hormonelle skift kan give nedtrykthed — det er normalt og ikke hendes fejl",
      ],
      practical: [
        "Tag de fleste måltider med baby — det bliver rodet og det er fint",
        "Plan + indkøb af baby-mad — mos og fingermad i ugevis",
        "Babysikring: lad mig kalde det 'projektet' — du kan tage det helt",
        "Bestil eller pak dagpleje/vuggestue-papirer — kommunal frist sniger sig op",
      ],
      emotional: [
        "Hendes identitet er stadig under forandring — anerkend det uden at problematisere",
        "Fejr at I er kommet hertil — det er ikke selvfølgeligt",
        "Tag initiativ til kvalitetstid uden baby — kort men ægte er bedre end ikke",
        "Lyt når hun bekymrer sig — separationsangst er hård for begge",
      ],
    },

    shiftSuggestions: {
      amning: [
        "Når mor langsomt skruer ned for amning, så vær der med ekstra nærhed",
        "Aftenrutinen er din — bog, sang, putning",
      ],
      flaske: [
        "Du kan tage alle fodringer nu — del om I vil",
        "Måltider er sociale — sid med, snak, spis sammen",
      ],
      begge: [
        "Når fast føde tager over, så er det åbent for alle hænder",
        "Tag madlavning + fodring i samme runde — én bevidst opgave",
      ],
    },

    activities: [
      { emoji: "🧱", title: "Stabling og sortering af klodser", benefit: "Motorik, problemløsning", workout: "Squats + fingerspidser" },
      { emoji: "📚", title: "Læs billedbøger sammen", benefit: "Sprog, koncentration, ritualer", workout: "Fra sofaen — recovery" },
      { emoji: "🍴", title: "Lad baby udforske mad i eget tempo", benefit: "Smag, tillid, motorik. Rodet = læring", workout: "Mental tålmodighed" },
      { emoji: "🐻", title: "Forhindringsbane af puder og tæpper", benefit: "Motorik + risk-vurdering", workout: "Bear crawls med dig" },
      { emoji: "🥁", title: "Trommer på gryder", benefit: "Rytme, årsag-virkning", workout: "Hearing test" },
    ],

    reminders: [
      { emoji: "🍴", text: "Tving aldrig — tillid til mad bygges langsomt, og fars ro tæller meget" },
      { emoji: "💬", text: "Mind mor om at hun har skabt et helt menneske — det glemmer hun" },
      { emoji: "🛡️", text: "Tag babysikring fra A til Z — det er praktisk far-arbejde" },
      { emoji: "📆", text: "Planlæg en weekend uden baby (selv én nat) inden 1-årsdagen — det betyder mere end I tror" },
      { emoji: "💪", text: "Du har båret denne familie i månedsvis — tag også en pause selv" },
    ],
  },

  // ── 52+ uger: vugger, rejser sig, kravler hurtigere end du kan løbe ────────
  {
    ageMin: 52,
    ageMax: Infinity,
    label: "Det første år og videre",

    weightCompare: {
      emoji: "🏆",
      comparison: "Baby vejer ca. {weight} kg — du har bygget en lille atlet",
      workout: "Du har skiftet 2.500+ bleer og overlevet. Du er en legende.",
    },

    facts: [
      { emoji: "🚶", text: "Alle børn udvikler sig i eget tempo", sub: "Nogle kravler, andre ruller eller bum-shuffler. Alle veje er rigtige." },
      { emoji: "🗣️", text: "Babling er tidlig sprogøvelse", sub: "Svar som i en samtale — du bygger sprogets fundament." },
      { emoji: "🤔", text: "Imiterer alt — også de ting du helst vil glemme", sub: "Tid til at være en god rollemodel." },
      { emoji: "🎉", text: "1 år+. Du har givet alt. Det var nok", sub: "Sig det højt — også til dig selv." },
    ],

    morSupport: {
      physical: [
        "Hvis hun stadig ammer, så respekter at det er hendes valg",
        "Mange genstarter motion nu — vær der med pasning, ikke pres",
        "Hormoner skifter når amning trappes ned — humøret kan svinge",
      ],
      practical: [
        "Tag initiativ til dagpleje/vuggestue-overgangen — det er stort",
        "Planlæg første date-night eller weekend uden baby — du står for det praktiske",
        "Pak madplaner ind i en rytme — fast føde gør hverdagen mere kompleks",
        "Mind hende om at booke sine egne aftaler — tandlæge, læge, frisør",
      ],
      emotional: [
        "Sig 'tak for året' — også selvom hun var den der ammede",
        "Anerkend at hun har holdt jer sammen — også på dage du ikke kunne se det",
        "Tal om 'hvem vil I gerne være som familie' — ikke kun praktik",
        "Date-night er ikke luksus — det er strukturel vedligeholdelse",
      ],
    },

    shiftSuggestions: {
      amning: [
        "Aftenputning er fortsat din zone — endnu mere nu hvor amning trappes ned",
        "Tag morgenrutinen — du klarer den, og hun får sove",
      ],
      flaske: [
        "Du kan tage alt nu — del fleksibelt",
        "Sit-down-måltider er sociale — gør dem til ritualer",
      ],
      begge: [
        "Overgangen ud af amning kan være følsom — vær mere til stede, ikke mindre",
      ],
    },

    activities: [
      { emoji: "🚪", title: "Lad baby 'hjælpe' med praktiske ting", benefit: "Selvstændighed, imitation, samhørighed", workout: "Tålmodighed × 100" },
      { emoji: "🌳", title: "Naturture — pinde, blade, sten", benefit: "Sanser, motorik, ro", workout: "Hike med tung pakke (baby)" },
      { emoji: "🎭", title: "Rolleleg med dukker, dyr, telefoner", benefit: "Empati, sprog, fantasi", workout: "Sketch-skuespil" },
      { emoji: "🧱", title: "Byg tårne og lad dem vælte", benefit: "Årsag-virkning, latter, samarbejde", workout: "Sit-ups med ekstra vægt" },
      { emoji: "🚲", title: "Cykeltur med baby på cyklen / cykelvogn", benefit: "Frisk luft, frihed, søvn", workout: "Cardio + smug-træning" },
    ],

    reminders: [
      { emoji: "👏", text: "Ros indsatsen, ikke kun resultatet — også når du roser mor" },
      { emoji: "💑", text: "Planlæg én voksenting om måneden uden baby — det holder jer sammen" },
      { emoji: "🌱", text: "Du har båret 'projektet' uden løn i et helt år — det er ikke småting" },
      { emoji: "📞", text: "Ring til en kammerat — fars venskaber forsvinder, hvis du ikke vedligeholder dem" },
      { emoji: "💬", text: "Sig 'tak for året' — også selvom hun ammede og du arbejdede" },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// ENGLISH MIRROR — same shapes, idiomatic translation. Used when i18n.language
// is "en". Keep in sync with the Danish content above when either is edited.
// ──────────────────────────────────────────────────────────────────────────────

export const farBabyContentEN: FarBabyAgeContent[] = [
  {
    ageMin: 0, ageMax: 4, label: "Newborn phase",
    weightCompare: {
      emoji: "🏋️",
      comparison: "Baby weighs about {weight} kg — like a small kettlebell",
      workout: "20 minutes of carrying = grip strength + core stability",
    },
    facts: [
      { emoji: "🧠", text: "The brain forms 1 million new neural connections per second", sub: "Every word, song or carry is brain-building." },
      { emoji: "👀", text: "Baby can only focus 20–25 cm away", sub: "Exactly the distance to your face while carrying." },
      { emoji: "👃", text: "Baby recognizes your scent from meters away", sub: "You're already a known safe zone." },
      { emoji: "🌙", text: "4–6 hours of broken sleep ≈ 0.1 ‰ alcohol", sub: "Drive carefully. Be kind to yourself and mom." },
    ],
    morSupport: {
      physical: [
        "Her body is in full recovery — keep her from lifting anything heavier than baby for 6 weeks",
        "She is still bleeding (up to 4–6 weeks) — make sure pads, underwear and painkillers are stocked",
        "Pelvic floor and any tears/stitches are healing — don't let her stand for long stretches",
      ],
      practical: [
        "Keep water and a snack within arm's reach — she's pinned down when nursing",
        "Take every diaper change when you're home — it's fast and it counts",
        "Gather laundry, empty the dishwasher, tidy up without being asked",
        "Carry baby for 20–30 minutes so she can shower in peace",
      ],
      emotional: [
        "Baby can't say thank you yet — so she still needs to hear it from you",
        "Say 'you're doing great' out loud, several times a day",
        "Acknowledge what she's done today — even when it's 'just' nursing and resting",
        "Listen without solving — sometimes she just needs to say it out loud",
      ],
    },
    shiftSuggestions: {
      amning: [
        "Bedtime needs closeness, not nursing — you can absolutely take the evening put-down",
        "Help baby to the breast at night so she doesn't have to get up",
        "Bring baby to her in bed, take baby back when nursing is done",
      ],
      flaske: [
        "Take a full night shift 1–2 times a week — one uninterrupted sleep cycle for her is gold",
        "Prep bottles in the evening so the night runs smooth",
        "Alternate feedings so nobody does every night",
      ],
      begge: [
        "When she nurses, you take the next bottle feed — that gives her a longer sleep stretch",
        "Take bedtime put-down — it's about closeness, not the bottle",
      ],
    },
    activities: [
      { emoji: "🫂", title: "Skin-to-skin on the couch", benefit: "Regulates baby's heart rate, temperature and stress", workout: "Time under tension — 30 minutes is plenty" },
      { emoji: "🗣️", title: "Narrate what you're doing", benefit: "Your voice is language foundation — it counts", workout: "Multitask: dialogue + dish washing" },
      { emoji: "🎵", title: "Sing a song you already know", benefit: "Tonal variation lights up 3× the brain regions of speech", workout: "Breath control" },
      { emoji: "👀", title: "Hold baby close and look at each other", benefit: "The first social signal — builds attachment", workout: "Stillness is also training" },
    ],
    reminders: [
      { emoji: "💧", text: "Keep water and snacks within arm's reach for mom — she's locked in when nursing" },
      { emoji: "💬", text: "Baby can't say thank you yet — she still needs to hear it from you" },
      { emoji: "🚪", text: "Take baby when you walk in the door — she needs to recharge" },
      { emoji: "🛒", text: "Always have something easy in the freezer — hunger makes everything harder" },
      { emoji: "🤐", text: "Listen without solving — sometimes she just needs to say it out loud" },
    ],
  },
  {
    ageMin: 4, ageMax: 12, label: "The smile and the rhythm",
    weightCompare: {
      emoji: "💪",
      comparison: "Baby weighs about {weight} kg — dumbbell territory",
      workout: "Carrying + stairs = Zone 2 cardio without a helmet",
    },
    facts: [
      { emoji: "😊", text: "The first real social smile comes around week 6", sub: "It's not gas — it's pure love directed at you." },
      { emoji: "🧠", text: "The brain is still in explosive development", sub: "Every glance, every smile, every sound counts." },
      { emoji: "💤", text: "Baby doesn't know day from night yet", sub: "Keep days bright and active, nights dark and calm." },
      { emoji: "🎵", text: "Singing to baby — even off-key — is excellent stimulation", sub: "Variation in tone matters more than hitting notes." },
    ],
    morSupport: {
      physical: [
        "She needs short walks — not hard training yet",
        "Pelvic floor work isn't 'nice to have' — it's medically necessary",
        "Sleep deprivation hits cognition, mood and immune system — 20-minute naps count",
      ],
      practical: [
        "Plan one evening a week where she has 2 hours to herself",
        "Take groceries and meal planning — repeat so she doesn't have to think about it",
        "Keep the house in 'good enough' shape — not perfect",
        "Make sure she isn't standing for too long at a time",
      ],
      emotional: [
        "Say 'you're doing great' — even on days when it doesn't feel that way",
        "Ask concretely: 'what do you need right now?' — not a generic 'are you okay?'",
        "Celebrate the small things — first smile, first laugh, first full night",
        "Remind her what she has gotten through — it disappears fast in the everyday",
      ],
    },
    shiftSuggestions: {
      amning: [
        "Take the evening put-down — you can lull without a breast",
        "Bring baby to her at night, stay awake 5 min so she can fall back asleep",
        "Take the morning round — she gets an extra hour of sleep",
      ],
      flaske: [
        "Take at least one continuous night shift per week",
        "Alternate feedings so you both get ~6 hours of sleep in chunks",
        "Prep bottles the night before — the night runs smoother",
      ],
      begge: [
        "When she nurses, you take the next bottle feed so she gets 6+ hours of sleep",
        "Take the evening put-down — it's about closeness, not feeding",
      ],
    },
    activities: [
      { emoji: "🚶", title: "Walk with baby in carrier or stroller", benefit: "Fresh air + sleep + sensory stimulation", workout: "5–10 km hike with 5+ kg weighted vest" },
      { emoji: "🛁", title: "Bath time — you in the tub, baby on top", benefit: "Skin-to-skin + calm — huge bonding boost", workout: "Recovery mode" },
      { emoji: "🤸", title: "Tummy time on your chest 3× daily", benefit: "Strengthens neck + back, prevents flat head", workout: "You're lying down — wow" },
      { emoji: "😜", title: "Make faces and exaggerated expressions", benefit: "Baby mirrors and builds social connection", workout: "Facial workout" },
      { emoji: "🎶", title: "Dad-playlist for baby", benefit: "Baby recognizes your 'sound' for life", workout: "It comes to where we go" },
    ],
    reminders: [
      { emoji: "🧠", text: "Baby's brain grows about 1% per day — eye contact and voice are rocket fuel" },
      { emoji: "💬", text: "Say something kind to mom — she hears it less than you think" },
      { emoji: "🌅", text: "Let mom sleep in one morning a week — no alarms, no questions" },
      { emoji: "📵", text: "The screen can wait — baby can't" },
      { emoji: "👀", text: "See what needs doing — and do it. No checklist. Just do it." },
    ],
  },
  {
    ageMin: 12, ageMax: 26, label: "Grasp, roll, laugh",
    weightCompare: {
      emoji: "🏋️‍♂️",
      comparison: "Baby weighs about {weight} kg — kettlebell size",
      workout: "Play = Russian twists, deadlifts, deadbugs. Free training.",
    },
    facts: [
      { emoji: "😂", text: "Baby starts laughing out loud — not just smiling", sub: "It's a social signal: 'I trust you, do it again.'" },
      { emoji: "🤚", text: "Grip = brain power", sub: "Every time something is held, new connections form." },
      { emoji: "🔄", text: "Baby rolls and turns", sub: "Never leave alone on sofa/changing table — applies from now." },
      { emoji: "💤", text: "The 4-month sleep regression is normal", sub: "It's not regression — it's maturation. It passes." },
    ],
    morSupport: {
      physical: [
        "Many mothers return to exercise now — but the body is still changing",
        "Nursing can cause shoulder pain — offer shoulder massage unprompted",
        "Sleep is still broken — watch she doesn't 'forget' to rest because she feels better",
      ],
      practical: [
        "Have baby food and snacks ready when she nurses — it lasts longer now",
        "Take more grocery runs yourself — the stroller is easier than before",
        "Let her train one evening a week — and keep the house without asking",
        "Start planning activities together — also without baby",
      ],
      emotional: [
        "She might miss herself — the freedom she had before. Acknowledge it without fixing",
        "Ask about her dreams — not just about baby",
        "Remind her what you have gotten through — looking back builds strength",
        "Date night doesn't have to be out of the house — it's about attention",
      ],
    },
    shiftSuggestions: {
      amning: [
        "Bedtime is still your territory — it's a gift to give her time off",
        "The evening routine (bath → book → goodnight) is perfect dad time",
      ],
      flaske: [
        "Many babies stretch between feeds now — nights get better",
        "Take the late evening bottles (10–11pm) — she can sleep early",
      ],
      begge: [
        "Switch feedings flexibly — it isn't a calculator",
        "Take bedtime and the first round of the night — gives her the deepest sleep",
      ],
    },
    activities: [
      { emoji: "🦅", title: "Airplane on your legs", benefit: "Vestibular stimulation + laughter", workout: "Deadbug variation, core under tension" },
      { emoji: "🤲", title: "Offer different textures — fabric, wood, plastic", benefit: "Sensory exploration builds the brain", workout: "Grip variety" },
      { emoji: "🪞", title: "Mirror play — point and name", benefit: "Self-recognition + language", workout: "Mostly mental" },
      { emoji: "🎵", title: "Clap to music on your lap", benefit: "Rhythm + social cues", workout: "Cardio (light)" },
      { emoji: "🚶", title: "Carry uphill in carrier", benefit: "Sleep + fresh air for baby", workout: "Weighted hike — free training" },
    ],
    reminders: [
      { emoji: "🛡️", text: "Never leave baby alone on the sofa or changing table — they roll suddenly" },
      { emoji: "💬", text: "She still needs to hear 'you're doing great' — even when you think she knows" },
      { emoji: "🍽️", text: "Make dinner or order in — hunger makes mom and you snappier" },
      { emoji: "🛌", text: "When baby sleeps, don't always sleep yourself — take the laundry or give her a break" },
      { emoji: "📸", text: "Take one photo of mom and baby today — she's rarely in the pictures herself" },
    ],
  },
  {
    ageMin: 26, ageMax: 52, label: "Crawling, trying food",
    weightCompare: {
      emoji: "🏋️‍♀️",
      comparison: "Baby weighs about {weight} kg — middleweight kettlebell",
      workout: "Floor time with baby = bear crawls and squats all day",
    },
    facts: [
      { emoji: "🧩", text: "Baby now understands things exist even when hidden", sub: "That's why peek-a-boo suddenly becomes the best." },
      { emoji: "🍎", text: "Around 6 months most babies are ready for solid food", sub: "Signs: sits with support, reaches for food, lost tongue-thrust reflex." },
      { emoji: "😢", text: "Separation anxiety begins", sub: "It's a sign of strong attachment — not a problem." },
      { emoji: "🚪", text: "Baby-proofing isn't too early now", sub: "Once they crawl, there's no pause." },
    ],
    morSupport: {
      physical: [
        "Nursing winds down for many around now — the body shifts again",
        "She can still be exhausted — sleep isn't reliable even at 9 months",
        "Hormonal shifts can cause low mood — it's normal and not her fault",
      ],
      practical: [
        "Take most baby meals — it gets messy and that's fine",
        "Plan + buy baby food — purées and finger food for weeks",
        "Baby-proofing: call it 'the project' — you can take it entirely",
        "Order or pack daycare/nursery paperwork — municipal deadlines sneak up",
      ],
      emotional: [
        "Her identity is still shifting — acknowledge it without problematizing",
        "Celebrate that you've gotten here — it isn't a given",
        "Initiate quality time without baby — short but real beats nothing",
        "Listen when she worries — separation anxiety is hard for both of you",
      ],
    },
    shiftSuggestions: {
      amning: [
        "As mom slowly winds down nursing, be present with extra closeness",
        "The evening routine is yours — book, song, put-down",
      ],
      flaske: [
        "You can take any feeding now — share as you like",
        "Meals are social — sit, talk, eat together",
      ],
      begge: [
        "As solid food takes over, all hands are open",
        "Take cooking + feeding in one round — one conscious task",
      ],
    },
    activities: [
      { emoji: "🧱", title: "Stacking and sorting blocks", benefit: "Motor skills, problem solving", workout: "Squats + fingertips" },
      { emoji: "📚", title: "Read picture books together", benefit: "Language, focus, rituals", workout: "From the sofa — recovery" },
      { emoji: "🍴", title: "Let baby explore food at their own pace", benefit: "Taste, trust, motor skills. Messy = learning", workout: "Mental patience" },
      { emoji: "🐻", title: "Obstacle course of pillows and blankets", benefit: "Motor skills + risk assessment", workout: "Bear crawls with you" },
      { emoji: "🥁", title: "Drums on pots", benefit: "Rhythm, cause and effect", workout: "Hearing test" },
    ],
    reminders: [
      { emoji: "🍴", text: "Never force — trust in food is built slowly, and dad's calm matters a lot" },
      { emoji: "💬", text: "Remind mom that she created a whole human — she forgets" },
      { emoji: "🛡️", text: "Take baby-proofing A to Z — it's practical dad work" },
      { emoji: "📆", text: "Plan a weekend without baby (even one night) before the 1-year mark — it matters more than you think" },
      { emoji: "💪", text: "You've carried this family for months — take a break yourself too" },
    ],
  },
  {
    ageMin: 52, ageMax: Infinity, label: "First year and beyond",
    weightCompare: {
      emoji: "🏆",
      comparison: "Baby weighs about {weight} kg — you've built a little athlete",
      workout: "You've changed 2,500+ diapers and survived. You're a legend.",
    },
    facts: [
      { emoji: "🚶", text: "All children develop at their own pace", sub: "Some crawl, others roll or bum-shuffle. All paths are right." },
      { emoji: "🗣️", text: "Babbling is early language practice", sub: "Reply as in conversation — you're building the foundation of speech." },
      { emoji: "🤔", text: "Imitates everything — including what you'd rather forget", sub: "Time to be a good role model." },
      { emoji: "🎉", text: "1+ years. You gave everything. It was enough", sub: "Say it out loud — to yourself too." },
    ],
    morSupport: {
      physical: [
        "If she's still nursing, respect that it's her choice",
        "Many restart exercise now — be there with childcare, not pressure",
        "Hormones shift as nursing winds down — mood can swing",
      ],
      practical: [
        "Take the initiative on the daycare transition — it's big",
        "Plan a first date night or weekend without baby — you handle the logistics",
        "Build meal planning into a rhythm — solid food makes weekdays more complex",
        "Remind her to book her own appointments — dentist, doctor, hairdresser",
      ],
      emotional: [
        "Say 'thank you for the year' — even if she was the one nursing",
        "Acknowledge that she held you all together — even on days you couldn't see it",
        "Talk about 'who do you want to be as a family' — not just logistics",
        "Date night isn't luxury — it's structural maintenance",
      ],
    },
    shiftSuggestions: {
      amning: [
        "Bedtime put-down is still your zone — even more now as nursing winds down",
        "Take the morning routine — you handle it, she gets to sleep",
      ],
      flaske: [
        "You can take everything now — share flexibly",
        "Sit-down meals are social — make them rituals",
      ],
      begge: [
        "The transition out of nursing can be sensitive — be more present, not less",
      ],
    },
    activities: [
      { emoji: "🚪", title: "Let baby 'help' with practical things", benefit: "Independence, imitation, togetherness", workout: "Patience × 100" },
      { emoji: "🌳", title: "Nature walks — sticks, leaves, stones", benefit: "Senses, motor skills, calm", workout: "Hike with heavy pack (baby)" },
      { emoji: "🎭", title: "Role play with dolls, animals, phones", benefit: "Empathy, language, imagination", workout: "Sketch comedy" },
      { emoji: "🧱", title: "Build towers and let them fall", benefit: "Cause and effect, laughter, teamwork", workout: "Sit-ups with extra weight" },
      { emoji: "🚲", title: "Bike ride with baby on the bike / trailer", benefit: "Fresh air, freedom, sleep", workout: "Cardio + stealth training" },
    ],
    reminders: [
      { emoji: "👏", text: "Praise the effort, not just the result — also when praising mom" },
      { emoji: "💑", text: "Plan one adult thing per month without baby — it keeps you together" },
      { emoji: "🌱", text: "You've carried 'the project' unpaid for a full year — that's not small" },
      { emoji: "📞", text: "Call a friend — dads' friendships fade if you don't maintain them" },
      { emoji: "💬", text: "Say 'thank you for the year' — even if she nursed and you worked" },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Hjælpefunktioner
// ──────────────────────────────────────────────────────────────────────────────

/** Find indholds-bucket for en konkret alder i uger og sprog. */
export function getFarBabyContent(ageWeeks: number, lang?: string): FarBabyAgeContent {
  const arr = lang === "en" ? farBabyContentEN : farBabyContent;
  return arr.find((c) => ageWeeks >= c.ageMin && ageWeeks < c.ageMax) || arr[0];
}

/** Erstat {weight} i en kettlebell-sammenligning. */
export function formatWeightCompare(template: string, ageWeeks: number): string {
  // Groft estimat: fødselsvægt 3,3 kg + ca. 150 g pr. uge i de første mdr.,
  // aftager med tiden. Brug profilens egen vægt hvis I har en.
  const weight = (3.3 + Math.min(ageWeeks, 52) * 0.15).toFixed(1);
  return template.replace("{weight}", weight);
}

/** Rotér daglige reminders sådan alle får tur i løbet af ugen. */
export function pickReminderOfDay(content: FarBabyAgeContent): { emoji: string; text: string } {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return content.reminders[dayOfYear % content.reminders.length];
}

/** Vælg dagens støt-mor-tips (én af hver kategori). */
export function pickMorSupportOfDay(content: FarBabyAgeContent): {
  physical: string;
  practical: string;
  emotional: string;
} {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const pick = <T,>(arr: T[]) => arr[dayOfYear % arr.length];
  return {
    physical: pick(content.morSupport.physical),
    practical: pick(content.morSupport.practical),
    emotional: pick(content.morSupport.emotional),
  };
}

/** Vælg vagt-forslag baseret på fodermetode. */
export function pickShiftSuggestions(
  content: FarBabyAgeContent,
  feedingMethod: FeedingMethod
): string[] {
  if (feedingMethod === "flaske") return content.shiftSuggestions.flaske;
  if (feedingMethod === "begge") return content.shiftSuggestions.begge;
  // Default til amning hvis ikke sat — det er den hyppigste konfiguration tidligt
  return content.shiftSuggestions.amning;
}
