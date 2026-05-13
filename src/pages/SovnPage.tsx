import { useState, useMemo, useEffect } from "react";
import { useFamily } from "@/context/FamilyContext";
import { useDiary } from "@/context/DiaryContext";
import { format, differenceInMinutes, isToday, subDays } from "date-fns";
import { da, enUS } from "date-fns/locale";
import { Moon, Sun, Clock, Trash2, ChevronDown, ChevronUp, Shield, Timer, AlertTriangle, Star, Link as LinkIcon } from "lucide-react";
import { AISleepGuidance } from "@/components/AISleepGuidance";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// ── Sleep recommendations by age (months) ───────────────────────────────────
const sleepRecommendations: Record<string, {
  totalHours: number; naps: number; napDuration: string;
  wakeWindow: string; bedtime: string; tipKey: string;
}> = {
  "0-1":  { totalHours: 16,   naps: 5, napDuration: "30min–2t",  wakeWindow: "45–60 min",  bedtime: "Fleksibel",   tipKey: "tip0_1" },
  "1-2":  { totalHours: 15.5, naps: 4, napDuration: "30min–2t",  wakeWindow: "60–90 min",  bedtime: "19:00–20:00", tipKey: "tip1_2" },
  "2-3":  { totalHours: 15,   naps: 4, napDuration: "45min–2t",  wakeWindow: "75–105 min", bedtime: "19:00–20:00", tipKey: "tip2_3" },
  "3-4":  { totalHours: 14.5, naps: 3, napDuration: "1–2t",      wakeWindow: "1.5–2 t",    bedtime: "18:30–19:30", tipKey: "tip3_4" },
  "4-6":  { totalHours: 14,   naps: 3, napDuration: "1–2t",      wakeWindow: "2–2.5 t",    bedtime: "18:30–19:00", tipKey: "tip4_6" },
  "6-9":  { totalHours: 14,   naps: 2, napDuration: "1–2t",      wakeWindow: "2.5–3.5 t",  bedtime: "18:00–19:00", tipKey: "tip6_9" },
  "9-12": { totalHours: 13.5, naps: 2, napDuration: "1–1.5t",    wakeWindow: "3–4 t",      bedtime: "18:00–19:00", tipKey: "tip9_12" },
};

// ── Regression ages ──────────────────────────────────────────────────────────
const REGRESSIONS = [
  {
    range: [3.5, 5],
    label: "4-månedersregressionen",
    desc: "Babys søvnarkitektur skifter permanent til kortere, voksen-lignende cyklusser. De fleste babyer begynder at vågne hyppigere om natten.",
    tip: "Fasthold faste rutiner. Tilbyd ekstra nærhed i dagtimerne. Det varer typisk 2–6 uger.",
    emoji: "🔄",
  },
  {
    range: [7.5, 9.5],
    label: "8-månedersregressionen",
    desc: "Stor motorisk og kognitiv udvikling: kravling, siddende og separationsangst. Hjernen arbejder på højtryk.",
    tip: "Øv separation i dagtimerne. Lidt kortere vågevindue kan hjælpe. Tålmodighed — det går over.",
    emoji: "🧠",
  },
  {
    range: [11, 13.5],
    label: "12-månedersregressionen",
    desc: "Gang, sprog og selvstændighed. Mange babyer overgår fra 2 til 1 lur i denne periode, hvilket midlertidigt forstyrrer søvnen.",
    tip: "Overgangen til 1 lur er normal. Hold sengetiden tidlig (18–19). Rutine er vigtigere end nogensinde.",
    emoji: "🚶",
  },
  {
    range: [17, 20],
    label: "18-månedersregressionen",
    desc: "Sprogeksplosion, selvstændighed og grænseafprøvning. Separationsangst kan blusse op igen.",
    tip: "Klare, trygge sengetidsrutiner. Anerkend frustration. Vær konsekvent med grænser.",
    emoji: "💬",
  },
];

// ── Safe sleep guidelines (SST / WHO / AAP) ─────────────────────────────────
const SAFE_SLEEP = [
  { icon: "✅", text: "Baby sover ALTID på ryggen — aldrig på maven eller siden" },
  { icon: "🛏️", text: "Fast, plan madras uden huller eller bløde kanter" },
  { icon: "🚫", text: "Ingen dyne, pude, tøjdyr eller bumper i sengen" },
  { icon: "👜", text: "Brug sovepose — TOG 1.0 sommer, TOG 2.5 vinter" },
  { icon: "🌡️", text: "Soverumstemperatur 18–20°C" },
  { icon: "🚭", text: "Ingen rygning nær baby — hverken inden eller efter fødsel" },
  { icon: "🛋️", text: "Undgå at sove på sofa eller stol med baby" },
  { icon: "🤱", text: "Amning reducerer SIDS-risikoen markant" },
];

// ── Pregnant sleep data ───────────────────────────────────────────────────────
const PREGNANCY_ISSUES = [
  {
    title: "Hyppig vandladning",
    icon: "💧",
    solution: "Reducer væskeindtag 2 timer før sengetid. Gå altid på toilettet sidst inden sengetid.",
  },
  {
    title: "Halsbrænderi",
    icon: "🔥",
    solution: "Spis ikke 2–3 timer før sengetid. Hæv hovedenden 15–20 cm. Undgå fedt og krydret mad om aftenen.",
  },
  {
    title: "Urolige ben (RLS)",
    icon: "🦵",
    solution: "Spørg din jordemoder om jerntilskud. Stræk benene inden sengetid. Prøv et varmt bad.",
  },
  {
    title: "Rundbåndssmerter",
    icon: "🤰",
    solution: "Pude under maven og mellem knæene. Rul dig langsomt ud af sengen — brug armene til at støtte dig.",
  },
  {
    title: "Levende drømme",
    icon: "💭",
    solution: "Normalt — hormonerne er årsagen. Ingen behandling nødvendig. Skriv dem ned om morgenen hvis de generer.",
  },
  {
    title: "Rygsmerter",
    icon: "🔙",
    solution: "Sov på siden med en pude mellem knæene. Undgå at sove på ryggen fra 2. trimester.",
  },
];

const TRIMESTER_TIPS: Record<1 | 2 | 3, { title: string; tips: string[] }> = {
  1: {
    title: "1. trimester (uge 1–12)",
    tips: [
      "Ekstrem træthed er normal — hormoner arbejder på højtryk. Hvil når du kan.",
      "Korte lure (20–30 min) midt på dagen kan hjælpe uden at forstyrre nattesøvnen.",
      "Kvalme kan forstyrre søvnen om natten — et lille kiks inden sengetid kan hjælpe.",
    ],
  },
  2: {
    title: "2. trimester (uge 13–27)",
    tips: [
      "De fleste oplever bedre søvn i 2. trimester — nyd det.",
      "Begynd at sove på siden nu — det gør overgangen i 3. trimester lettere.",
      "Pude mellem knæene aflaster hofterne og reducerer rygsmerter.",
    ],
  },
  3: {
    title: "3. trimester (uge 28–40)",
    tips: [
      "SOS — Sleep On Side — reducerer risikoen markant. Venstre side giver bedst blodgennemstrømning til moderkagen.",
      "En god graviditetspude (C-formet) støtter både mave, ryg og hofter.",
      "Accepter at søvnen er fragmenteret. Korte lure i dagtimerne er vigtige.",
    ],
  },
};

// ── Utility ──────────────────────────────────────────────────────────────────
function getAgeKey(months: number): string {
  if (months < 1) return "0-1";
  if (months < 2) return "1-2";
  if (months < 3) return "2-3";
  if (months < 4) return "3-4";
  if (months < 6) return "4-6";
  if (months < 9) return "6-9";
  return "9-12";
}

function parseWakeWindowRange(ww: string): { lo: number; hi: number } {
  const match = ww.match(/([\d.]+)[–\-]([\d.]+)\s*(min|h|t|timer)/i);
  if (!match) return { lo: 60, hi: 90 };
  const lo = parseFloat(match[1]);
  const hi = parseFloat(match[2]);
  const isMinutes = match[3].toLowerCase() === "min";
  return {
    lo: isMinutes ? lo : Math.round(lo * 60),
    hi: isMinutes ? hi : Math.round(hi * 60),
  };
}

function formatMinutes(mins: number): string {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}t ${m}m` : `${h}t`;
}

// ── Wake window sweetspot component ─────────────────────────────────────────
function WakeWindowSweetspot({
  lastWakeTime,
  wakeWindow,
}: {
  lastWakeTime: Date | null;
  wakeWindow: string;
}) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!lastWakeTime) return null;

  const { lo, hi } = parseWakeWindowRange(wakeWindow);
  const elapsed = Math.max(0, differenceInMinutes(now, lastWakeTime));
  const maxDisplay = Math.round(hi * 1.5);

  const phase: "early" | "sweetspot" | "overtired" =
    elapsed < lo ? "early" : elapsed <= hi ? "sweetspot" : "overtired";

  const phaseColor =
    phase === "early" ? "hsl(var(--bark))" :
    phase === "sweetspot" ? "hsl(var(--moss))" : "hsl(var(--clay))";

  const loPct = Math.round((lo / maxDisplay) * 100);
  const hiPct = Math.round((hi / maxDisplay) * 100);
  const elapsedPct = Math.min(Math.round((elapsed / maxDisplay) * 100), 98);

  const barGradient = `linear-gradient(to right,
    hsl(var(--stone-lighter)) 0%,
    hsl(var(--stone-lighter)) ${loPct}%,
    hsl(var(--sage) / 0.45) ${loPct}%,
    hsl(var(--sage) / 0.45) ${hiPct}%,
    hsl(var(--clay) / 0.35) ${hiPct}%,
    hsl(var(--clay) / 0.55) 100%
  )`;

  const statusText =
    phase === "early"
      ? `${formatMinutes(lo - elapsed)} til sweetspot`
      : phase === "sweetspot"
      ? "Nu er det perfekt tidspunkt for lur"
      : "Overtræt — start søvnrutine nu!";

  return (
    <div
      className="rounded-2xl px-5 py-4 space-y-3"
      style={{
        background: "hsl(var(--warm-white))",
        border: `1.5px solid ${phase === "sweetspot" ? "hsl(var(--sage) / 0.5)" : "hsl(var(--stone-light))"}`,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.58rem] tracking-[0.18em] uppercase text-muted-foreground">Vågetid</p>
          <p className="font-serif text-[1.6rem] leading-none mt-0.5" style={{ color: phaseColor }}>
            {formatMinutes(elapsed)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[0.58rem] tracking-[0.18em] uppercase text-muted-foreground">Sweetspot</p>
          <p className="text-[0.82rem] font-medium mt-0.5" style={{ color: "hsl(var(--moss))" }}>
            {formatMinutes(lo)}–{formatMinutes(hi)}
          </p>
        </div>
      </div>

      {/* Bar */}
      <div className="relative">
        <div
          className="h-8 rounded-full relative overflow-hidden"
          style={{ background: barGradient }}
        >
          {/* Sweetspot label inside bar */}
          <div
            className="absolute top-0 h-full flex items-center justify-center"
            style={{ left: `${loPct}%`, width: `${hiPct - loPct}%` }}
          >
            <span className="text-[0.5rem] tracking-[0.1em] uppercase font-semibold" style={{ color: "hsl(var(--moss))" }}>
              Sweetspot
            </span>
          </div>

          {/* Indicator dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full shadow-md border-2 border-white transition-all duration-[1200ms] ease-out"
            style={{
              left: `calc(${elapsedPct}% - 12px)`,
              background: phaseColor,
            }}
          />
        </div>

        {/* Tick labels */}
        <div className="flex justify-between text-[0.56rem] text-muted-foreground mt-1 px-0.5">
          <span>0</span>
          <span style={{ marginLeft: `${loPct}%`, transform: "translateX(-50%)", position: "absolute" }}>
            {formatMinutes(lo)}
          </span>
          <span style={{ marginLeft: `${hiPct}%`, transform: "translateX(-50%)", position: "absolute" }}>
            {formatMinutes(hi)}
          </span>
          <span className="ml-auto">{formatMinutes(maxDisplay)}</span>
        </div>
      </div>

      {/* Status pill */}
      <div
        className="rounded-xl px-4 py-2.5 text-center"
        style={{
          background: phase === "sweetspot" ? "hsl(var(--sage-light))" : phase === "overtired" ? "hsl(var(--clay-light))" : "hsl(var(--stone-lighter))",
        }}
      >
        <p className="text-[0.82rem] font-medium" style={{ color: phaseColor }}>
          {phase === "sweetspot" && "✨ "}
          {phase === "overtired" && "⚠️ "}
          {statusText}
        </p>
      </div>
    </div>
  );
}

// ── Safe sleep checklist ─────────────────────────────────────────────────────
function SafeSleepChecklist() {
  const [open, setOpen] = useState(false);
  const STORAGE_KEY = "melo-safe-sleep-checked";
  const [checked, setChecked] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
  });

  const toggle = (i: number) => {
    const next = checked.includes(i) ? checked.filter(x => x !== i) : [...checked, i];
    setChecked(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const allDone = checked.length === SAFE_SLEEP.length;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "hsl(var(--warm-white))",
        border: allDone ? "1.5px solid hsl(var(--sage) / 0.5)" : "1px solid hsl(var(--stone-light))",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 transition-all"
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: allDone ? "hsl(var(--sage-light))" : "hsl(var(--stone-lighter))" }}
        >
          <Shield className="w-4.5 h-4.5" style={{ color: allDone ? "hsl(var(--moss))" : "hsl(var(--bark))" }} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-[0.88rem] font-semibold">Sikker søvn — SST/WHO</p>
          <p className="text-[0.68rem] text-muted-foreground">{checked.length}/{SAFE_SLEEP.length} punkter gennemgaet</p>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {open && (
        <div className="border-t divide-y" style={{ borderColor: "hsl(var(--stone-lighter))" }}>
          {SAFE_SLEEP.map((item, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={cn(
                "w-full flex items-start gap-3 px-4 py-3 text-left transition-all",
                checked.includes(i) && "opacity-60"
              )}
            >
              <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
              <p className={cn("text-[0.82rem] leading-snug flex-1", checked.includes(i) && "line-through text-muted-foreground")}>
                {item.text}
              </p>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
                  checked.includes(i) ? "border-[hsl(var(--moss))] bg-[hsl(var(--moss))]" : "border-[hsl(var(--stone-light))]"
                )}
              >
                {checked.includes(i) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          ))}
          {allDone && (
            <div className="px-4 py-3 text-center" style={{ background: "hsl(var(--sage-light))" }}>
              <p className="text-[0.78rem]" style={{ color: "hsl(var(--moss))" }}>
                Fantastisk — alle sikkerhedspunkter er gennemgaet
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Sleep regression alert ───────────────────────────────────────────────────
function RegressionAlert({ babyAgeMonths }: { babyAgeMonths: number }) {
  const [dismissed, setDismissed] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("melo-regression-dismissed") || "[]"); } catch { return []; }
  });

  const active = REGRESSIONS.find(
    r => babyAgeMonths >= r.range[0] && babyAgeMonths <= r.range[1]
  );

  if (!active || dismissed.includes(active.label)) return null;

  const dismiss = () => {
    const next = [...dismissed, active.label];
    setDismissed(next);
    localStorage.setItem("melo-regression-dismissed", JSON.stringify(next));
  };

  return (
    <div
      className="rounded-2xl px-4 py-4 space-y-2"
      style={{
        background: "hsl(var(--clay-light))",
        border: "1px solid hsl(var(--clay) / 0.3)",
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{active.emoji}</span>
        <div className="flex-1">
          <p className="text-[0.88rem] font-semibold" style={{ color: "hsl(var(--bark))" }}>
            {active.label}
          </p>
          <p className="text-[0.75rem] text-muted-foreground mt-1 leading-relaxed">{active.desc}</p>
          <div className="mt-2 rounded-xl px-3 py-2" style={{ background: "white/60" }}>
            <p className="text-[0.75rem] leading-relaxed" style={{ color: "hsl(var(--bark))" }}>
              💡 {active.tip}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={dismiss}
        className="text-[0.65rem] text-muted-foreground w-full text-right"
      >
        Skjul
      </button>
    </div>
  );
}

// ── Bedtime calculator ───────────────────────────────────────────────────────
function BedtimeCalculator({ lastNapEnd, wakeWindow, bedtime }: {
  lastNapEnd: Date | null;
  wakeWindow: string;
  bedtime: string;
}) {
  if (!lastNapEnd) return null;
  const { hi } = parseWakeWindowRange(wakeWindow);
  const suggested = new Date(lastNapEnd.getTime() + hi * 60_000);
  if (suggested < new Date()) return null;

  return (
    <div
      className="rounded-2xl px-4 py-3.5 flex items-center gap-3"
      style={{ background: "hsl(var(--cream))", border: "1px solid hsl(var(--stone-light))" }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "hsl(var(--sage-light))" }}
      >
        <Moon className="w-5 h-5" style={{ color: "hsl(var(--moss))" }} />
      </div>
      <div>
        <p className="text-[0.78rem] text-muted-foreground">Anbefalet sengetid i aften</p>
        <p className="text-[1.1rem] font-semibold" style={{ color: "hsl(var(--moss))" }}>
          {format(suggested, "HH:mm")}
        </p>
        <p className="text-[0.65rem] text-muted-foreground">
          Baseret på seneste lur + {formatMinutes(hi)} vågevindue
        </p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-[0.6rem] text-muted-foreground">Typisk</p>
        <p className="text-[0.78rem] font-medium">{bedtime}</p>
      </div>
    </div>
  );
}

// ── Pregnant sleep view ───────────────────────────────────────────────────────
const QUALITY_KEY = "melo-pregnancy-sleep-quality";

function PregnantSleepPage({ week }: { week: number }) {
  const trimester: 1 | 2 | 3 = week <= 12 ? 1 : week <= 27 ? 2 : 3;
  const trimesterData = TRIMESTER_TIPS[trimester];

  const todayStr = new Date().toISOString().slice(0, 10);
  const [stars, setStars] = useState<number>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(QUALITY_KEY) || "{}");
      return stored.date === todayStr ? stored.stars : 0;
    } catch { return 0; }
  });

  const [openIssue, setOpenIssue] = useState<number | null>(null);

  const handleStars = (n: number) => {
    setStars(n);
    localStorage.setItem(QUALITY_KEY, JSON.stringify({ date: todayStr, stars: n }));
  };

  return (
    <div className="space-y-5">
      <div className="section-fade-in">
        <h1 className="font-serif text-[1.9rem] font-normal">Søvn</h1>
        <p className="text-[0.58rem] tracking-[0.18em] uppercase text-muted-foreground mt-1">
          Uge {week} · {trimesterData.title}
        </p>
      </div>

      {/* Sleep quality last night */}
      <div
        className="rounded-2xl px-5 py-5 section-fade-in"
        style={{ background: "hsl(var(--warm-white))", border: "1px solid hsl(var(--stone-light))" }}
      >
        <p className="text-[0.72rem] font-semibold mb-3 text-muted-foreground">
          Hvordan sov du i nat?
        </p>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => handleStars(n)}
              className="transition-all active:scale-90"
            >
              <Star
                className="w-8 h-8"
                style={{
                  color: n <= stars ? "hsl(var(--clay))" : "hsl(var(--stone-light))",
                  fill: n <= stars ? "hsl(var(--clay))" : "none",
                }}
              />
            </button>
          ))}
        </div>
        {stars > 0 && (
          <p className="text-center text-[0.72rem] text-muted-foreground mt-2">
            {stars <= 2 ? "Det horer med — hvil i dag hvis du kan" :
             stars === 3 ? "Nogenlunde — helt normalt i graviditeten" :
             "Godt! Husk at det ikke er en selvfolge — nyd det"}
          </p>
        )}
      </div>

      {/* SOS card — only from week 20 */}
      {week >= 20 && (
        <div
          className="rounded-2xl px-5 py-5 section-fade-in"
          style={{
            background: week >= 28
              ? "linear-gradient(145deg, hsl(154 22% 28%), hsl(154 27% 20%))"
              : "hsl(var(--warm-white))",
            border: week >= 28 ? "none" : "1px solid hsl(var(--stone-light))",
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🛌</span>
            <div>
              <p
                className="text-[0.88rem] font-semibold"
                style={{ color: week >= 28 ? "white" : "inherit" }}
              >
                SOS — Sleep On Side
              </p>
              <p
                className="text-[0.68rem]"
                style={{ color: week >= 28 ? "rgba(255,255,255,0.65)" : "hsl(var(--muted-foreground))" }}
              >
                {week >= 28 ? "Vigtigt fra uge 28" : "God vane fra uge 20"}
              </p>
            </div>
          </div>
          <p
            className="text-[0.8rem] leading-relaxed"
            style={{ color: week >= 28 ? "rgba(255,255,255,0.82)" : "hsl(var(--muted-foreground))" }}
          >
            {week >= 28
              ? "At sove på ryggen fra uge 28 gør at livmoderen presser på en stor årestreng og reducerer blodgennemstrømningen. Venstre side er bedst — giver optimal blodgennemstrømning til moderkagen."
              : "Begynd at vænne dig til at sove på siden nu — det gælder fra uge 28 og er svært at ændre vanen til på et sent tidspunkt."}
          </p>
          {week >= 28 && (
            <div className="mt-3 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.1)" }}>
              <p className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.7)" }}>
                Tip: En graviditetspude (C-formet) holder dig på siden hele natten — et af de bedste søvninvesteringer.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Trimester tips */}
      <div
        className="rounded-2xl px-5 py-4 space-y-3 section-fade-in"
        style={{ background: "hsl(var(--cream))", border: "1px solid hsl(var(--stone-light))" }}
      >
        <p className="text-[0.58rem] tracking-[0.18em] uppercase text-muted-foreground">
          Søvntips nu
        </p>
        {trimesterData.tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-[0.7rem] mt-0.5" style={{ color: "hsl(var(--sage))" }}>✦</span>
            <p className="text-[0.82rem] leading-relaxed text-muted-foreground">{tip}</p>
          </div>
        ))}
      </div>

      {/* Common issues accordion */}
      <div>
        <p className="text-[0.58rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
          Hyppige sovnproblemer
        </p>
        <div className="space-y-2">
          {PREGNANCY_ISSUES.map((issue, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ background: "hsl(var(--warm-white))", border: "1px solid hsl(var(--stone-light))" }}
            >
              <button
                onClick={() => setOpenIssue(openIssue === i ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
              >
                <span className="text-base flex-shrink-0">{issue.icon}</span>
                <p className="text-[0.85rem] font-medium flex-1">{issue.title}</p>
                {openIssue === i
                  ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                }
              </button>
              {openIssue === i && (
                <div className="px-4 pb-3 pt-0">
                  <p className="text-[0.78rem] text-muted-foreground leading-relaxed">{issue.solution}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ve-timer link (from week 36) */}
      {week >= 36 && (
        <Link
          to="/veer"
          className="flex items-center gap-4 rounded-2xl px-4 py-4 transition-all active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, hsl(var(--clay-light)), hsl(var(--clay) / 0.12))",
            border: "1px solid hsl(var(--clay) / 0.25)",
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(var(--clay-light))" }}
          >
            <Timer className="w-5 h-5" style={{ color: "hsl(var(--clay))" }} />
          </div>
          <div className="flex-1">
            <p className="text-[0.88rem] font-semibold">Ve-timer</p>
            <p className="text-[0.72rem] text-muted-foreground">Tag tid på veerne og se mønster</p>
          </div>
          <LinkIcon className="w-4 h-4 text-muted-foreground" />
        </Link>
      )}

      {/* Recommended sleep */}
      <div
        className="rounded-xl px-4 py-3"
        style={{ background: "hsl(var(--stone-lighter))" }}
      >
        <p className="text-[0.68rem] text-muted-foreground leading-relaxed">
          <strong>WHO anbefaler</strong> 7–9 timers søvn pr. nat under graviditeten. Mange gravide behøver mere.
          Prioritér søvnen — det er ikke dovenskab, det er biologi.
        </p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SovnPage() {
  const { profile, babyAgeWeeks, babyAgeMonths, currentWeek } = useFamily();
  const { sleepLogs, addSleep, endSleep, removeSleepLog, activeSleep, todaySleepMinutes } = useDiary();
  const { t, i18n } = useTranslation();
  const dateFnsLocale = i18n.language === "en" ? enUS : da;
  const childName = profile.children?.[0]?.name || "Baby";

  const [sleepType, setSleepType] = useState<"nap" | "night">("nap");
  const [manualStart, setManualStart] = useState("");
  const [manualEnd, setManualEnd] = useState("");

  // Manual "baby is awake now" — stored per day so it resets at midnight
  const todayStr = new Date().toISOString().slice(0, 10);
  const WAKE_KEY = `melo-manual-wake-${todayStr}`;
  const [manualWakeTime, setManualWakeTime] = useState<Date | null>(() => {
    try {
      const v = localStorage.getItem(WAKE_KEY);
      return v ? new Date(v) : null;
    } catch { return null; }
  });

  const handleBabyAwake = () => {
    const now = new Date();
    setManualWakeTime(now);
    localStorage.setItem(WAKE_KEY, now.toISOString());
  };

  // ── Pregnant interface ──
  if (profile.phase === "pregnant") {
    return <PregnantSleepPage week={currentWeek} />;
  }

  // ── Baby interface ──
  const ageKey = getAgeKey(babyAgeMonths);
  const rec = sleepRecommendations[ageKey];

  const todayLogs = useMemo(() =>
    sleepLogs
      .filter(l => isToday(new Date(l.startTime)))
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()),
    [sleepLogs]
  );

  const todayNaps = todayLogs.filter(l => l.type === "nap" && l.endTime);
  const totalHours = Math.floor(todaySleepMinutes / 60);
  const totalMins = Math.round(todaySleepMinutes % 60);
  const progressPct = Math.min((todaySleepMinutes / (rec.totalHours * 60)) * 100, 100);

  // Last time baby woke up: prefer logged end-of-sleep, fall back to manual tap
  const lastWakeTime = useMemo(() => {
    const lastEnded = todayLogs.find(l => l.endTime && !activeSleep);
    if (lastEnded) return new Date(lastEnded.endTime!);
    return manualWakeTime;
  }, [todayLogs, activeSleep, manualWakeTime]);

  // Last nap end (for bedtime calc)
  const lastNapEnd = useMemo(() => {
    const lastNap = todayLogs.find(l => l.type === "nap" && l.endTime);
    return lastNap ? new Date(lastNap.endTime!) : null;
  }, [todayLogs]);

  const weekData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const day = subDays(new Date(), 6 - i);
      const dayStr = day.toDateString();
      const dayLogs = sleepLogs.filter(l => new Date(l.startTime).toDateString() === dayStr && l.endTime);
      const mins = dayLogs.reduce((sum, l) => sum + differenceInMinutes(new Date(l.endTime!), new Date(l.startTime)), 0);
      return { day: format(day, "EEE", { locale: dateFnsLocale }), mins };
    });
  }, [sleepLogs, dateFnsLocale]);

  const handleQuickStart = () => {
    setManualWakeTime(null);
    localStorage.removeItem(WAKE_KEY);
    addSleep(sleepType, new Date().toISOString());
  };

  const handleManualAdd = () => {
    if (!manualStart) return;
    const today = new Date().toISOString().slice(0, 10);
    const start = new Date(`${today}T${manualStart}`).toISOString();
    const end = manualEnd ? new Date(`${today}T${manualEnd}`).toISOString() : undefined;
    addSleep(sleepType, start, end);
    setManualStart(""); setManualEnd("");
  };

  return (
    <div className="space-y-5">
      <div className="section-fade-in">
        <h1 className="font-serif text-[1.9rem] font-normal">{t("sleep.title")}</h1>
        <p className="label-upper mt-1">{childName.toUpperCase()} · {babyAgeMonths} {t("sleep.months")}</p>
      </div>

      {/* Regression alert */}
      <RegressionAlert babyAgeMonths={babyAgeMonths} />

      {/* Active sleep banner */}
      {activeSleep && (
        <div
          className="rounded-2xl px-5 py-4 flex items-center gap-4 section-fade-in"
          style={{
            background: "linear-gradient(135deg, hsl(var(--sage-light)), hsl(var(--sage) / 0.35))",
            border: "1px solid hsl(var(--sage) / 0.25)",
          }}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ background: "hsl(var(--sage))" }} />
            <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: "hsl(var(--moss))" }} />
          </span>
          <div className="flex-1">
            <p className="text-[0.95rem] font-semibold" style={{ color: "hsl(var(--moss))" }}>
              {activeSleep.type === "nap" ? t("sleep.napInProgress") : t("sleep.nightInProgress")}
            </p>
            <p className="text-[0.7rem]" style={{ color: "hsl(var(--sage-dark))" }}>
              {t("sleep.startedAt", { time: format(new Date(activeSleep.startTime), "HH:mm") })}
            </p>
          </div>
          <button
            onClick={() => endSleep(activeSleep.id)}
            className="px-4 py-2 rounded-full text-[0.78rem] font-medium transition-all active:scale-95"
            style={{ background: "hsl(var(--moss))", color: "white" }}
          >
            {t("sleep.stop")}
          </button>
        </div>
      )}

      {/* Sweetspot timer — only when not sleeping */}
      {!activeSleep && lastWakeTime && (
        <div className="space-y-2">
          <WakeWindowSweetspot lastWakeTime={lastWakeTime} wakeWindow={rec.wakeWindow} />
          <button
            onClick={handleBabyAwake}
            className="w-full text-[0.72rem] text-muted-foreground py-2 rounded-xl border border-dashed transition-all active:scale-[0.98]"
            style={{ borderColor: "hsl(var(--stone-light))" }}
          >
            Baby er vågnet nu — nulstil timer
          </button>
        </div>
      )}

      {/* "Baby er vågnet nu" — shown when no sleep has been logged today */}
      {!activeSleep && !lastWakeTime && (
        <button
          onClick={handleBabyAwake}
          className="w-full rounded-2xl px-5 py-4 flex items-center gap-4 transition-all active:scale-[0.98] section-fade-in"
          style={{
            background: "hsl(var(--warm-white))",
            border: "1.5px dashed hsl(var(--stone-light))",
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(var(--sage-light))" }}
          >
            <Sun className="w-5 h-5" style={{ color: "hsl(var(--moss))" }} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[0.95rem] font-semibold">Baby er vågnet nu</p>
            <p className="text-[0.72rem] text-muted-foreground">Start vågevindue-timer uden at logge lur</p>
          </div>
        </button>
      )}

      {/* Today's progress */}
      <div className="card-soft section-fade-in" style={{ animationDelay: "80ms" }}>
        <div className="flex items-center justify-between mb-3">
          <p className="label-upper">{t("sleep.sleepToday")}</p>
          <span className="text-[1.3rem] font-semibold" style={{ color: "hsl(var(--moss))" }}>
            {totalHours > 0 ? `${totalHours}t ${totalMins}m` : `${totalMins}m`}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: "hsl(var(--stone-lighter))" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%`, background: progressPct >= 90 ? "hsl(var(--sage))" : "hsl(var(--clay))" }}
          />
        </div>
        <p className="text-[0.68rem] text-muted-foreground">
          {t("sleep.recommended", { hours: rec.totalHours, naps: todayNaps.length, maxNaps: rec.naps })}
        </p>
      </div>

      {/* Bedtime calculator */}
      {!activeSleep && lastNapEnd && (
        <BedtimeCalculator lastNapEnd={lastNapEnd} wakeWindow={rec.wakeWindow} bedtime={rec.bedtime} />
      )}

      {!activeSleep && <AISleepGuidance />}

      {/* Quick log + manual log */}
      <div className="grid grid-cols-2 gap-2.5 section-fade-in" style={{ animationDelay: "160ms" }}>
        <div className="card-soft !p-4 space-y-3">
          <p className="label-upper">{t("sleep.quickLog")}</p>
          <div className="flex gap-2">
            {([{ key: "nap" as const, icon: Sun, label: t("sleep.nap") }, { key: "night" as const, icon: Moon, label: t("sleep.night") }]).map(st => (
              <button
                key={st.key}
                onClick={() => setSleepType(st.key)}
                className={`flex-1 py-2 rounded-xl text-[0.72rem] border transition-all active:scale-[0.97] flex items-center justify-center gap-1 ${
                  sleepType === st.key
                    ? "bg-[hsl(var(--sage-light))] border-[hsl(var(--sage))] font-medium"
                    : "border-[hsl(var(--stone-light))] text-muted-foreground"
                }`}
              >
                <st.icon className="w-3.5 h-3.5" />
                {st.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleQuickStart}
            disabled={!!activeSleep}
            className="btn-moss w-full disabled:opacity-50 text-[0.82rem]"
          >
            {activeSleep ? t("sleep.sleepInProgress") : t("sleep.start")}
          </button>
        </div>

        <div className="card-soft !p-4 space-y-3">
          <p className="label-upper">{t("sleep.manualLog")}</p>
          <div className="space-y-2">
            <div>
              <label className="text-[0.56rem] tracking-[0.14em] uppercase text-muted-foreground mb-0.5 block">{t("sleep.startTime")}</label>
              <input
                type="time"
                value={manualStart}
                onChange={e => setManualStart(e.target.value)}
                className="w-full rounded-xl border border-[hsl(var(--stone-light))] bg-background px-2.5 py-1.5 text-[0.82rem] focus:outline-none focus:border-[hsl(var(--sage))] transition-colors"
              />
            </div>
            <div>
              <label className="text-[0.56rem] tracking-[0.14em] uppercase text-muted-foreground mb-0.5 block">{t("sleep.endTime")}</label>
              <input
                type="time"
                value={manualEnd}
                onChange={e => setManualEnd(e.target.value)}
                className="w-full rounded-xl border border-[hsl(var(--stone-light))] bg-background px-2.5 py-1.5 text-[0.82rem] focus:outline-none focus:border-[hsl(var(--sage))] transition-colors"
              />
            </div>
          </div>
          <button onClick={handleManualAdd} disabled={!manualStart} className="btn-moss w-full disabled:opacity-50 text-[0.82rem]">
            {t("sleep.addBtn")}
          </button>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card-soft section-fade-in" style={{ animationDelay: "240ms" }}>
        <p className="label-upper mb-2">{t("sleep.recommendations", { ageKey: ageKey.toUpperCase() })}</p>
        <div className="space-y-2.5">
          {[
            [t("sleep.totalSleep"), `${rec.totalHours} ${t("sleep.hours")}`],
            [t("sleep.napCount"), `${rec.naps} ${t("sleep.naps")}`],
            [t("sleep.napDuration"), rec.napDuration],
            [t("sleep.wakeWindowLabel"), rec.wakeWindow],
            [t("sleep.bedtime"), rec.bedtime],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-[0.78rem] text-muted-foreground">{label}</span>
              <span className="text-[0.82rem] font-medium">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl px-4 py-2.5" style={{ background: "hsl(var(--sage-light))" }}>
          <p className="text-[0.78rem] leading-relaxed">💡 {t(`sleep.${rec.tipKey}`)}</p>
        </div>
      </div>

      {/* Safe sleep checklist */}
      <SafeSleepChecklist />

      {/* Week chart */}
      <div className="card-soft section-fade-in" style={{ animationDelay: "280ms" }}>
        <p className="label-upper mb-3">{t("sleep.last7days")}</p>
        <div className="flex items-end gap-1.5 h-20">
          {weekData.map((d, i) => {
            const maxMins = rec.totalHours * 60;
            const h = Math.max((d.mins / maxMins) * 100, 4);
            const isGood = d.mins >= maxMins * 0.85;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    height: `${h}%`,
                    background: isGood ? "hsl(var(--sage))" : "hsl(var(--clay) / 0.5)",
                    minHeight: "3px",
                  }}
                />
                <span className="text-[0.5rem] text-muted-foreground">{d.day}</span>
              </div>
            );
          })}
        </div>
        <p className="text-[0.6rem] text-muted-foreground mt-2 text-center">
          {t("sleep.goal", { hours: rec.totalHours })}
        </p>
      </div>

      {/* Today's log */}
      {todayLogs.length > 0 && (
        <div className="card-soft section-fade-in" style={{ animationDelay: "320ms" }}>
          <p className="label-upper mb-3">{t("sleep.todayLog")}</p>
          {todayLogs.map(l => (
            <div key={l.id} className="flex items-center gap-3 py-2.5 border-b border-foreground/5 last:border-0">
              <span className="text-lg flex-shrink-0">{l.type === "nap" ? "💤" : "🌙"}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[0.84rem]">
                  {l.type === "nap" ? t("sleep.napLog") : t("sleep.nightLog")}
                  {!l.endTime && (
                    <span className="text-[0.68rem] ml-1" style={{ color: "hsl(var(--moss))" }}>
                      ({t("diary.inProgress")})
                    </span>
                  )}
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  {format(new Date(l.startTime), "HH:mm")}
                  {l.endTime && ` — ${format(new Date(l.endTime), "HH:mm")}`}
                  {l.endTime && ` · ${differenceInMinutes(new Date(l.endTime), new Date(l.startTime))} ${t("sleep.min")}`}
                </p>
              </div>
              <button onClick={() => removeSleepLog(l.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors">
                <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
