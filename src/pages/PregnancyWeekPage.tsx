import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFamily } from "@/context/FamilyContext";
import { getBabySize } from "@/lib/phaseData";
import {
  ChevronLeft,
  Share2,
  Bookmark,
  Check,
  Sprout,
  Waves,
  Zap,
  Heart,
  Apple,
  Leaf,
  Pill,
  CalendarDays,
  X,
} from "lucide-react";

// ── Week content helpers ───────────────────────────────────────────────────────

function getWeekBullets(week: number): string[] {
  if (week < 8)  return ["Babys hjerte begynder at slå", "Alle vitale organer er ved at dannes", "Fosteret er på størrelse med et hindbær"];
  if (week < 12) return ["Hjertet slår ca. 150 slag i minuttet", "Fingre og tæer er ved at forme sig", "Hjernen udvikler sig hurtigt"];
  if (week < 16) return ["Første trimester er klaret", "Risikoen for tab falder markant nu", "Baby begynder at bevæge sig"];
  if (week < 20) return ["Baby kan lave ansigtsudtryk", "Sanser begynder at vågne", "Knogler og muskler bliver stærkere"];
  if (week < 24) return ["Baby kan høre lyde udefra", "Halvvejs igennem graviditeten", "Hjertet pumper ca. 25 liter blod i døgnet"];
  if (week < 28) return ["Baby reagerer på lys og mørke", "Har en regelmæssig søvnrytme", "Lungerne er ved at modnes"];
  if (week < 32) return ["Tredje trimester er begyndt", "Baby kan åbne og lukke øjnene", "Baby vender sig langsomt med hovedet nedad"];
  if (week < 36) return ["Baby er næsten fuldt udviklet", "I kan mærke tydelige spark og bevægelser", "Begyn at pakke hospitalstasken"];
  return ["Baby er klar til verden når som helst", "Alle organer er fuldt udviklede", "I er stærkere end I tror"];
}

interface BodyContent {
  intro: string;
  tips: string[];
}

function getBodyContent(week: number): BodyContent {
  if (week < 8) return {
    intro: "De første uger kan føles overvældende. Kvalme, træthed og ømme bryster er meget almindelige og er tegn på at graviditeten udvikler sig normalt.",
    tips: ["Spis lidt og ofte for at holde blodsukkeret stabilt", "Hvil så meget du har brug for — din krop arbejder hårdt", "Hold dig hydreret, særligt hvis du har kvalme"],
  };
  if (week < 12) return {
    intro: "Du er stadig i første trimester. Træthed og kvalme er de mest hyppige symptomer. Mange mærker at symptomerne topper netop nu.",
    tips: ["Ingefær kan hjælpe mod kvalme — prøv te eller kandis", "Undgå stærkt duftende mad hvis lugteoverfølsomhed er et problem", "Korte gåture kan give energi uden at udmatte"],
  };
  if (week < 16) return {
    intro: "Første trimester er overstået! Mange oplever at energien begynder at vende tilbage. Livmoderen er nu stor nok til at du begynder at se en lille bule.",
    tips: ["Begynd at bruge en fugtighedscreme på maven — det hjælper på elasticiteten", "Overvej at fortælle tættere venner og familie nu", "Begynd at sove på siden — det er mere komfortabelt og sundt for blodomløbet"],
  };
  if (week < 20) return {
    intro: "Andet trimester er for mange den behageligste periode. Energien er tilbage, kvalmen er væk, og maven er synlig men ikke tung endnu.",
    tips: ["Start med svømmning, yoga eller gåture — bevægelse er godt for jer begge", "Overvej at starte på svangreomsorgens undersøgelser og scanninger", "Tal med din partner om barselsorlov og praktiske forberedelser"],
  };
  if (week < 24) return {
    intro: "Du er halvvejs! Du kan nu mærke baby bevæge sig tydeligt. Ryggen kan begynde at give lidt — det er fordi din holdning ændrer sig.",
    tips: ["En graviditetspude kan hjælpe dig sove bedre", "Øv dig på bækkenbundøvelser dagligt", "Book halvvejsscanningen hvis du ikke allerede har"],
  };
  if (week < 28) return {
    intro: "Baby sparker og bevæger sig nu regelmæssigt. Halsbranden kan tiltage da livmoderen trykker mod mavesækken. Lette svømmende bevægelser i maven er normalt.",
    tips: ["Spis mindre portioner mere hyppigt for at reducere halsbrand", "Løft benene når du sidder for at modvirke hævede ankler", "Deltag i fødselsforberedelse — det er godt for jer begge"],
  };
  if (week < 32) return {
    intro: "Du er i tredje trimester. Braxton Hicks-sammentrækninger (øveveer) er normale og harmløse. Baby er nu stor nok til at du kan mærke tydelige spark og bevægelser.",
    tips: ["Pak hospitalstasken — det er aldrig for tidligt", "Sov på venstre side for bedst blodomløb til placenta", "Tal med din jordemoder om dine ønsker til fødslen"],
  };
  if (week < 36) return {
    intro: "Baby vender sig med hovedet nedad og er næsten fuldt udviklet. Du kan opleve ryg- og bækkensmerter og hyppigere toiletbesøg.",
    tips: ["Lav en fødselsplan og del den med din jordemoder", "Tjek at hospitalstasken er klar", "Aftal med din partner hvem der skal kontaktes når veer starter"],
  };
  return {
    intro: "Du er næsten ved termin. Baby kan komme når som helst de næste uger. Nesting-instinktet er normalt — det er kroppens måde at gøre sig klar.",
    tips: ["Hvil når du kan — du får brug for energien snart", "Hold din jordemoder og hospital informeret om dine symptomer", "Stol på din krop — den ved hvad den gør"],
  };
}

interface NutritionContent {
  dietTips: string[];
  vitamins: { name: string; note: string; active: boolean }[];
}

function getNutrition(week: number): NutritionContent {
  const trimester = week <= 12 ? 1 : week <= 27 ? 2 : 3;
  return {
    dietTips: trimester === 1
      ? ["Spis varieret — grønt, protein og fuldkorn", "Undgå rå fisk, upasteuriseret ost og lever", "Drik 1,5–2 liter vand dagligt"]
      : trimester === 2
      ? ["Dit kalorieindtag bør stige med ca. 300 kcal/dag", "Spis jernrige fødevarer: linser, kød, grønne blade", "Kalk fra mælkeprodukter og grønt styrker babys knogler"]
      : ["Jern og kalk er ekstra vigtigt nu", "Små måltider hyppigt hjælper mod halsbrand", "Omega-3 fra fisk eller tilskud støtter babys hjerne"],
    vitamins: [
      { name: "Folsyre", note: "Vigtigst før uge 12", active: week < 14 },
      { name: "D-vitamin", note: "Hele graviditeten", active: true },
      { name: "Jern", note: "Fra uge 10 og frem", active: week >= 10 },
      { name: "Omega-3", note: "Støtter babys hjerne", active: week >= 20 },
    ],
  };
}

function getTrimesterRange(week: number): string {
  if (week <= 12) return "1. trimester (uge 1–12)";
  if (week <= 27) return "2. trimester (uge 13–27)";
  return "3. trimester (uge 28–42)";
}

function getWeekPreparations(week: number): string[] {
  if (week < 12) return ["Book 1. scanning", "Start folsyre", "Find jordemoder", "Fortæl familien"];
  if (week < 20) return ["Book halvvejs-scanning", "Tal om barsel", "Start øvelser", "Læs om fødsel"];
  if (week < 28) return ["Tilmeld fødselsforberedelse", "Indkøb basisudstyr", "Book fotografering", "Planlæg barslen"];
  if (week < 36) return ["Pak hospitalstaske", "Lav fødselsplan", "Forbered hjemmet", "Kend vej til sygehuset"];
  return ["Kend fødselstegn", "Hvil og lad op", "Hold partner klar", "Stol på dig selv"];
}

// ── BabyAnimationModal helpers ─────────────────────────────────────────────────

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

// ── BabyAnimationModal ─────────────────────────────────────────────────────────

function BabyAnimationModal({
  week,
  size,
  onClose,
}: {
  week: number;
  size: ReturnType<typeof getBabySize>;
  onClose: () => void;
}) {
  const [factIdx, setFactIdx] = useState(0);
  const config = getAnimConfig(week);

  useEffect(() => {
    const id = setInterval(() => setFactIdx(i => (i + 1) % config.facts.length), 2800);
    return () => clearInterval(id);
  }, [config.facts.length]);

  const emojiSize =
    week < 10 ? "4rem" :
    week < 20 ? "5.5rem" :
    week < 28 ? "7rem" :
    week < 36 ? "8.5rem" : "10rem";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: config.bg }}
      onClick={onClose}
    >
      <style>{`
        @keyframes melo-float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes melo-ring-pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes melo-heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.12); }
          28% { transform: scale(1); }
          42% { transform: scale(1.06); }
          56% { transform: scale(1); }
        }
        @keyframes melo-fact-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-12 right-6 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.12)" }}
      >
        <X className="w-4 h-4 text-white" />
      </button>

      {/* Label */}
      <p
        className="text-[0.7rem] tracking-[0.18em] uppercase font-medium mb-10"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {config.label}
      </p>

      {/* Rings + baby */}
      <div className="relative flex items-center justify-center" style={{ width: 240, height: 240 }}>
        {[0, 1].map(i => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 160, height: 160,
              border: `1.5px solid ${config.ringColor}`,
              animation: `melo-ring-pulse 2.4s ease-out ${i * 1.2}s infinite`,
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        <div
          className="absolute rounded-full"
          style={{
            width: 160, height: 160,
            border: `1px solid ${config.ringColor}`,
            opacity: 0.25,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 140, height: 140,
            background: "rgba(255,255,255,0.04)",
            animation: "melo-heartbeat 1.5s ease-in-out infinite",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div style={{ animation: "melo-float 4s ease-in-out infinite", fontSize: emojiSize, lineHeight: 1 }}>
          {size.emoji}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mt-10 mb-8">
        <div className="text-center">
          <p className="text-[0.6rem] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Længde</p>
          <p className="text-white font-semibold text-[1rem] mt-0.5">ca. {size.lengthCm} cm</p>
        </div>
        <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.15)" }} />
        <div className="text-center">
          <p className="text-[0.6rem] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Vægt</p>
          <p className="text-white font-semibold text-[1rem] mt-0.5">ca. {size.weightG} g</p>
        </div>
        <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.15)" }} />
        <div className="text-center">
          <p className="text-[0.6rem] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Størrelse</p>
          <p className="text-white font-semibold text-[1rem] mt-0.5">{size.label}</p>
        </div>
      </div>

      {/* Cycling fact */}
      <div className="px-8 text-center" style={{ minHeight: 48 }}>
        <p
          key={factIdx}
          className="text-white/80 text-[0.9rem] leading-relaxed font-serif"
          style={{ animation: "melo-fact-in 0.5s ease forwards" }}
        >
          {config.facts[factIdx]}
        </p>
        <div className="flex justify-center gap-1.5 mt-4">
          {config.facts.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === factIdx ? 16 : 5,
                height: 5,
                background: i === factIdx ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      <p
        className="absolute bottom-10 text-[0.65rem] tracking-widest uppercase"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        Tryk hvor som helst for at lukke
      </p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function PregnancyWeekPage() {
  const navigate = useNavigate();
  const { currentWeek } = useFamily();

  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [showAnimation, setShowAnimation] = useState(false);
  const weekScrollRef = useRef<HTMLDivElement>(null);

  const size = getBabySize(selectedWeek);
  const bullets = getWeekBullets(selectedWeek);
  const body = getBodyContent(selectedWeek);
  const nutrition = getNutrition(selectedWeek);
  const trimesterRange = getTrimesterRange(selectedWeek);
  const preparations = getWeekPreparations(selectedWeek);

  // Build visible week range: 3 before + current + 3 after, clamped to 4–40
  const weekRange: number[] = [];
  for (let w = selectedWeek - 3; w <= selectedWeek + 3; w++) {
    const clamped = Math.min(40, Math.max(4, w));
    if (!weekRange.includes(clamped)) weekRange.push(clamped);
  }

  // Scroll selected week into view
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
          text: `Vi er i uge ${selectedWeek}! Baby er på størrelse med ${size.label.toLowerCase()} — ${size.lengthCm} cm og ${size.weightG} g.`,
        });
      } catch {}
    }
  };

  const bodyIcons = [Waves, Zap, Heart];

  return (
    <>
      {showAnimation && (
        <BabyAnimationModal
          week={selectedWeek}
          size={size}
          onClose={() => setShowAnimation(false)}
        />
      )}

      <div className="space-y-4 pb-10 section-fade-in">

        {/* ── 1. Header ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full active:scale-95 transition-transform"
            style={{ background: "hsl(var(--stone-light))" }}
          >
            <ChevronLeft className="w-4 h-4" style={{ color: "hsl(var(--bark))" }} />
          </button>

          <div className="text-center">
            <p className="font-serif text-[1.6rem] font-medium leading-none" style={{ color: "hsl(var(--moss))" }}>
              Uge {selectedWeek}
            </p>
            <p className="text-[0.72rem] text-muted-foreground mt-0.5">{trimesterRange}</p>
          </div>

          <div className="flex items-center gap-1">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full active:scale-95 transition-transform"
              style={{ background: "hsl(var(--stone-light))" }}
            >
              <Bookmark className="w-4 h-4" style={{ color: "hsl(var(--bark))" }} />
            </button>
            <button
              onClick={handleShare}
              className="w-9 h-9 flex items-center justify-center rounded-full active:scale-95 transition-transform"
              style={{ background: "hsl(var(--stone-light))" }}
            >
              <Share2 className="w-4 h-4" style={{ color: "hsl(var(--bark))" }} />
            </button>
          </div>
        </div>

        {/* ── 2. Uge-picker ──────────────────────────────────────────────────── */}
        <div
          ref={weekScrollRef}
          className="overflow-x-auto scrollbar-none -mx-4"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-3 px-4 py-3" style={{ width: "max-content" }}>
            {weekRange.map(w => {
              const isActive = w === selectedWeek;
              return (
                <button
                  key={w}
                  data-week={w}
                  onClick={() => setSelectedWeek(w)}
                  className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
                    style={
                      isActive
                        ? { background: "hsl(var(--moss))", color: "white" }
                        : { background: "transparent", color: "hsl(var(--muted-foreground))" }
                    }
                  >
                    <span className={`text-[0.85rem] font-${isActive ? "semibold" : "normal"}`}>{w}</span>
                  </div>
                  {isActive && (
                    <Heart
                      className="w-2.5 h-2.5"
                      fill="hsl(var(--moss))"
                      style={{ color: "hsl(var(--moss))" }}
                    />
                  )}
                  {!isActive && <div className="w-2.5 h-2.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3. Hero-kort "Barnets Udvikling" ──────────────────────────────── */}
        <div
          className="rounded-3xl px-5 pt-5 pb-4 relative overflow-hidden"
          style={{ background: "linear-gradient(145deg, hsl(var(--sage-light)) 0%, hsl(var(--cream)) 100%)" }}
        >
          {/* Label */}
          <div className="flex items-center gap-1.5 mb-3">
            <Sprout className="w-3.5 h-3.5" style={{ color: "hsl(var(--moss))" }} />
            <p
              className="text-[0.65rem] font-semibold tracking-[0.12em] uppercase"
              style={{ color: "hsl(var(--moss))" }}
            >
              Barnets Udvikling
            </p>
          </div>

          {/* Headline + floating emoji */}
          <div className="flex items-start justify-between">
            <p
              className="font-serif text-[1.5rem] font-medium leading-snug pr-2 flex-1"
              style={{ color: "hsl(var(--bark))" }}
            >
              Din baby er på størrelse med {size.label.toLowerCase()} {size.emoji}
            </p>
            <span
              className="flex-shrink-0 select-none"
              style={{ fontSize: "6rem", lineHeight: 1, marginTop: "-0.5rem", marginRight: "-0.5rem", animation: "melo-float 4s ease-in-out infinite" }}
            >
              {size.emoji}
            </span>
          </div>

          {/* Bullets */}
          <div className="space-y-1.5 mt-3 mb-4">
            {bullets.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--moss))" }} />
                <p className="text-[0.82rem]" style={{ color: "hsl(var(--bark))" }}>{b}</p>
              </div>
            ))}
          </div>

          {/* Stat pills */}
          <div className="flex gap-2 mb-4">
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{ background: "rgba(255,255,255,0.55)" }}
            >
              <span className="text-sm">🌿</span>
              <div>
                <p className="text-[0.55rem] font-semibold tracking-widest uppercase" style={{ color: "hsl(var(--moss))" }}>Længde</p>
                <p className="text-[0.82rem] font-semibold" style={{ color: "hsl(var(--bark))" }}>{size.lengthCm} cm</p>
              </div>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{ background: "rgba(255,255,255,0.55)" }}
            >
              <span className="text-sm">⚖️</span>
              <div>
                <p className="text-[0.55rem] font-semibold tracking-widest uppercase" style={{ color: "hsl(var(--moss))" }}>Vægt</p>
                <p className="text-[0.82rem] font-semibold" style={{ color: "hsl(var(--bark))" }}>{size.weightG} g</p>
              </div>
            </div>
          </div>

          {/* Animation button */}
          <button
            onClick={() => setShowAnimation(true)}
            className="rounded-full px-4 py-2 text-[0.8rem] font-semibold active:scale-95 transition-transform"
            style={{ background: "hsl(var(--clay))", color: "white" }}
          >
            Se animation ▶
          </button>
        </div>

        {/* ── 4. 2-kolonne grid: DIN KROP + KOST & NÆRING ───────────────────── */}
        <div className="grid grid-cols-2 gap-3">
          {/* DIN KROP */}
          <div className="card-soft flex flex-col gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-base">🪷</span>
              <p className="text-[0.62rem] font-semibold tracking-[0.1em] uppercase" style={{ color: "hsl(var(--moss))" }}>
                Din krop i denne fase
              </p>
            </div>
            <div className="space-y-2 flex-1">
              {body.tips.slice(0, 3).map((tip, i) => {
                const Icon = bodyIcons[i % bodyIcons.length];
                return (
                  <div key={i} className="flex items-start gap-1.5">
                    <Icon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "hsl(var(--moss))" }} />
                    <p className="text-[0.72rem] text-muted-foreground leading-snug">{tip}</p>
                  </div>
                );
              })}
            </div>
            <Link
              to="/chat"
              className="text-[0.72rem] font-semibold"
              style={{ color: "hsl(var(--moss))" }}
            >
              Læs mere →
            </Link>
          </div>

          {/* KOST & NÆRING */}
          <div className="card-soft flex flex-col gap-3">
            <div className="flex items-center gap-1.5">
              <Apple className="w-3.5 h-3.5" style={{ color: "hsl(var(--moss))" }} />
              <p className="text-[0.62rem] font-semibold tracking-[0.1em] uppercase" style={{ color: "hsl(var(--moss))" }}>
                Kost & Næring
              </p>
            </div>
            <div className="space-y-2 flex-1">
              {nutrition.dietTips.slice(0, 3).map((tip, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <Leaf className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "hsl(var(--moss))" }} />
                  <p className="text-[0.72rem] text-muted-foreground leading-snug">{tip}</p>
                </div>
              ))}
            </div>
            <Link
              to="/chat"
              className="text-[0.72rem] font-semibold"
              style={{ color: "hsl(var(--moss))" }}
            >
              Se kostråd →
            </Link>
          </div>
        </div>

        {/* ── 5. 2-kolonne grid: VITAMINER + FORBEREDELSE ───────────────────── */}
        <div className="grid grid-cols-2 gap-3">
          {/* VITAMINER */}
          <div
            className="rounded-2xl px-4 py-4 flex flex-col gap-3"
            style={{ background: "hsl(var(--clay-light))" }}
          >
            <div className="flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5" style={{ color: "hsl(var(--bark))" }} />
              <p className="text-[0.62rem] font-semibold tracking-[0.1em] uppercase" style={{ color: "hsl(var(--bark))" }}>
                Vitaminer
              </p>
            </div>
            <div className="space-y-2 flex-1">
              {nutrition.vitamins.filter(v => v.active).map((v, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: "hsl(var(--bark))" }}
                  />
                  <div>
                    <p className="text-[0.72rem] font-medium" style={{ color: "hsl(var(--bark))" }}>{v.name}</p>
                    <p className="text-[0.62rem] text-muted-foreground">{v.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/tjekliste"
              className="text-[0.72rem] font-semibold"
              style={{ color: "hsl(var(--bark))" }}
            >
              Se anbefalinger →
            </Link>
          </div>

          {/* FORBEREDELSE */}
          <div
            className="rounded-2xl px-4 py-4 flex flex-col gap-3"
            style={{ background: "linear-gradient(145deg, hsl(var(--moss)), hsl(154 27% 28%))" }}
          >
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-white/80" />
              <p className="text-[0.62rem] font-semibold tracking-[0.1em] uppercase text-white/80">
                Forbered denne uge
              </p>
            </div>
            <div className="grid grid-cols-2 gap-1.5 flex-1">
              {preparations.slice(0, 4).map((prep, i) => (
                <div
                  key={i}
                  className="rounded-xl px-2 py-2 text-center"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <p className="text-[0.65rem] font-medium text-white leading-snug">{prep}</p>
                </div>
              ))}
            </div>
            <Link
              to="/tjekliste"
              className="text-[0.72rem] font-semibold text-white"
            >
              Se tjekliste →
            </Link>
          </div>
        </div>

        {/* ── 6. Footer ──────────────────────────────────────────────────────── */}
        <div
          className="rounded-xl px-4 py-3 flex items-start gap-2"
          style={{ background: "hsl(var(--stone-light))" }}
        >
          <span className="text-[0.75rem] text-muted-foreground flex-shrink-0">i</span>
          <p className="text-[0.68rem] text-muted-foreground leading-relaxed">
            Informationen er generel og baseret på sundhedsfaglige kilder.{" "}
            <button className="font-semibold underline underline-offset-2">
              Vores kilder →
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
