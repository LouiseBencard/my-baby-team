import { useFamily } from "@/context/FamilyContext";
import { getBabySize, getWeekInsight } from "@/lib/phaseData";
import { MeloWordmark } from "@/components/MeloWordmark";
import { NotificationBell } from "@/components/NotificationCenter";
import { WeekUnlockModal } from "@/components/WeekUnlockModal";
import { CheckInCard } from "@/components/PregnancyCheckIn";
import { BabyStageIllustration } from "@/components/BabyStageIllustration";
import { User, ArrowRight, Check, ChevronRight, Timer, FileText, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ── Week-specific development bullets ─────────────────────────────────────────
function getWeekBullets(week: number): string[] {
  if (week < 8)  return ["Babys hjerte begynder at slå", "Alle vitale organer er ved at dannes", "Fosteret er størrelse med et hindbær"];
  if (week < 12) return ["Hjertet slår ca. 150 slag i minuttet", "Fingre og tæer er ved at forme sig", "Hjernen udvikler sig hurtigt"];
  if (week < 16) return ["Første trimester er klaret", "Risikoen for tab falder markant nu", "Baby begynder at bevæge sig"];
  if (week < 20) return ["Baby kan lave ansigtsudtryk", "Sanser begynder at vågne", "Knogler og muskler bliver stærkere"];
  if (week < 24) return ["Baby kan høre lyde udefra", "Halvvejs igennem graviditeten", "Hjertet pumper ca. 25 liter blod i døgnet"];
  if (week < 28) return ["Baby reagerer på lys og mørke", "Har en regelmæssig søvnrytme", "Lungerne er ved at modnes"];
  if (week < 32) return ["Tredje trimester er begyndt", "Baby kan åbne og lukke øjnene", "Baby vender sig langsomt med hovedet nedad"];
  if (week < 36) return ["Baby er næsten fuldt udviklet", "I kan mærke tydelige spark og bevægelser", "Begyn at pakke hospitalstasken"];
  return ["Baby er klar til verden når som helst", "Alle organer er fuldt udviklede", "I er stærkere end I tror"];
}

// ── Weekly guides (list-style) ─────────────────────────────────────────────────
interface Guide {
  emoji: string;
  bgColor: string;
  title: string;
  desc: string;
  path: string;
}

function getWeeklyGuides(week: number, trimester: number): Guide[] {
  const trimLabel = `${trimester}. trimester`;
  return [
    {
      emoji: "🍎",
      bgColor: "hsl(var(--sage-light))",
      title: `Kostråd i ${trimLabel}`,
      desc: "Det anbefales, og det der virker godt nu",
      path: "/graviditet/uge",
    },
    {
      emoji: "🧘",
      bgColor: "hsl(var(--clay-light))",
      title: "Træning og bevægelse",
      desc: "Hvad der er godt for dig og din baby",
      path: "/raad",
    },
    {
      emoji: "❤️",
      bgColor: "hsl(var(--sand-light))",
      title: "Hvad er normalt lige nu?",
      desc: "Symptomer og forandringer i denne tid",
      path: "/graviditet/uge",
    },
  ];
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function DashboardPregnant() {
  const { profile, currentWeek, totalWeeks, trimester, tasks, morName, farName, takeTask } = useFamily();
  const { t, i18n } = useTranslation();

  const size = getBabySize(currentWeek);
  const insight = getWeekInsight(currentWeek);
  const bullets = getWeekBullets(currentWeek);
  const guides = getWeeklyGuides(currentWeek, trimester);

  const progress = Math.round((currentWeek / totalWeeks) * 100);
  const daysLeft = Math.max(0, (totalWeeks - currentWeek) * 7);
  const trimesterLabel = trimester === 1 ? "1. trimester" : trimester === 2 ? "2. trimester" : "3. trimester";

  const getGreeting = (): string => {
    const h = new Date().getHours();
    if (h < 10) return t("greeting.morning");
    if (h < 17) return t("greeting.afternoon");
    return t("greeting.evening");
  };

  const previewTasks = tasks.filter(t => !t.completed).slice(0, 3);
  const myRole = profile.role;

  return (
    <div className="space-y-5 pb-6">
      <WeekUnlockModal />

      {/* ── A. Header ───────────────────────────────────────────────────────── */}
      <div className="section-fade-in">
        <div className="flex items-center justify-between mb-5">
          <MeloWordmark size="1.8rem" />
          <div className="flex items-center gap-3">
            <NotificationBell />
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[0.75rem] font-semibold overflow-hidden"
              style={{ background: "hsl(var(--clay-light))", color: "hsl(var(--clay-text))" }}
            >
              {profile.parentName?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
            </div>
          </div>
        </div>

        <h1 className="font-serif text-[1.9rem] leading-tight" style={{ color: "hsl(var(--bark))" }}>
          {getGreeting()}, {profile.parentName}
        </h1>
        <p className="text-[0.9rem] text-muted-foreground mt-1">Ét skridt ad gangen.</p>
      </div>

      {/* ── B. Daily Check-in ───────────────────────────────────────────────── */}
      <CheckInCard />

      {/* ── C. Pregnancy Hero Card ──────────────────────────────────────────── */}
      <div
        className="rounded-[20px] overflow-hidden section-fade-in"
        style={{
          background: "linear-gradient(155deg, hsl(22 28% 25%), hsl(32 22% 17%))",
          animationDelay: "60ms",
        }}
      >
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[0.68rem] font-semibold px-2.5 py-1 rounded-full text-white"
                  style={{ background: "rgba(255,255,255,0.14)" }}>
                  Uge {currentWeek}
                </span>
                <span className="text-[0.75rem] text-white/70">{trimesterLabel}</span>
              </div>
            </div>
            <BabyStageIllustration
  week={currentWeek}
  fruitEmoji={size.emoji}
  fruitLabel={size.label.toLowerCase()}
  lengthLabel={`ca. ${size.lengthCm} cm`}
  weightLabel={`ca. ${size.weightG} g`}
/>
          </div>

          <p className="font-serif text-[1.45rem] font-medium text-white leading-snug mb-2">
            {bullets[0]}
          </p>
          <p className="text-[0.85rem] text-white/75 mb-1">
            På størrelse med {size.label.toLowerCase()}
          </p>
          <div className="flex items-center gap-4 mb-4 text-[0.8rem] text-white/70">
            <span>Længde<br /><span className="text-white font-medium">ca. {size.lengthCm} cm</span></span>
            <span className="text-white/30">·</span>
            <span>Vægt<br /><span className="text-white font-medium">ca. {size.weightG} g</span></span>
          </div>

          <div className="space-y-1.5 mb-4">
            {bullets.slice(1).map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.13)" }}>
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <p className="text-[0.8rem] text-white/80">{b}</p>
              </div>
            ))}
          </div>

          <Link
            to="/graviditet/uge"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.78rem] font-medium text-[hsl(var(--bark))] transition-all active:scale-95"
            style={{ background: "hsl(var(--warm-white))" }}
          >
            Læs mere om uge {currentWeek} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {insight.milestone && (
          <div className="px-5 py-2.5 border-t border-white/10"
            style={{ background: "rgba(0,0,0,0.18)" }}>
            <p className="text-[0.72rem] text-white/70">🎯 {insight.milestone}</p>
          </div>
        )}
      </div>

      {/* ── D. Progress — horisontal bjælke ─────────────────────────────────── */}
      <div
        className="rounded-2xl px-5 py-4 section-fade-in"
        style={{
          background: "hsl(var(--cream))",
          border: "1px solid hsl(var(--stone-light))",
          animationDelay: "240ms",
        }}
      >
        <div className="flex items-baseline justify-between mb-2.5">
          <p className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-muted-foreground">
            Din graviditet
          </p>
          <p className="text-[0.82rem] font-semibold tabular-nums" style={{ color: "hsl(var(--clay-text))" }}>
            {progress}%
          </p>
        </div>
        <div className="w-full h-[5px] rounded-full overflow-hidden mb-2.5" style={{ background: "hsl(var(--stone-light))" }}>
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%`, background: "hsl(var(--clay))" }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[0.72rem] text-muted-foreground">
            Uge <span className="font-semibold" style={{ color: "hsl(var(--bark))" }}>{currentWeek}</span> af {totalWeeks}
          </p>
          <p className="text-[0.72rem] text-muted-foreground">
            <span className="font-semibold" style={{ color: "hsl(var(--clay-text))" }}>{daysLeft}</span> dage til termin
          </p>
        </div>
      </div>

      {/* ── D2. Quick genveje ────────────────────────────────────────────────── */}
      <div className="section-fade-in" style={{ animationDelay: "390ms" }}>
        <p className="text-[0.7rem] font-medium tracking-[0.12em] uppercase text-muted-foreground mb-2.5">
          Genveje
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { emoji: "📅", label: "Kalender",  sub: "Scanninger & aftaler",  path: "/gravid-kalender", bg: "hsl(var(--sage-light))" },
            { emoji: "📝", label: "Dagbog",    sub: "Skriv om i dag",         path: "/gravid-dagbog",   bg: "hsl(var(--clay-light))" },
            { emoji: "✅", label: "Tjekliste", sub: "Hvad mangler I?",        path: "/tjekliste",       bg: "hsl(var(--sand-light))" },
            currentWeek >= 30
              ? { emoji: "🌿", label: "Fødselsplan", sub: "Jeres ønsker",   path: "/foedselsplan",    bg: "hsl(var(--sage-light))" }
              : { emoji: "💬", label: "Spørg MELO",  sub: "Din AI-guide",   path: "/chat",            bg: "hsl(var(--stone-lighter))" },
          ].map((tile, i) => (
            <Link
              key={i}
              to={tile.path}
              className="flex flex-col gap-2 rounded-2xl p-3.5 transition-all active:scale-[0.97]"
              style={{ background: tile.bg, border: "1px solid hsl(var(--stone-light) / 0.6)" }}
            >
              <span className="text-[1.35rem] leading-none">{tile.emoji}</span>
              <div>
                <p className="text-[0.82rem] font-semibold leading-snug" style={{ color: "hsl(var(--bark))" }}>{tile.label}</p>
                <p className="text-[0.68rem] mt-0.5 text-muted-foreground">{tile.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── D. Ugens råd og guides ───────────────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden section-fade-in"
        style={{
          background: "hsl(var(--warm-white))",
          border: "1px solid hsl(var(--stone-light))",
          animationDelay: "240ms",
        }}
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <div>
            <p className="font-serif text-[1.1rem] font-medium">Ugens råd og guides</p>
            <p className="text-[0.68rem] text-muted-foreground">Tilpasset uge {currentWeek}</p>
          </div>
          <Link
            to="/graviditet/uge"
            className="text-[0.72rem] font-medium px-3.5 py-1.5 rounded-full transition-all active:scale-95"
            style={{ background: "hsl(var(--clay-light))", color: "hsl(var(--clay-text))" }}
          >
            Læs mere
          </Link>
        </div>

        <div className="divide-y" style={{ borderColor: "hsl(var(--stone-lighter))" }}>
          {guides.map((guide, i) => (
            <Link
              key={i}
              to={guide.path}
              className="flex items-center gap-3.5 px-5 py-3.5 transition-all active:bg-[hsl(var(--stone-lighter))]"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-[1.1rem]"
                style={{ background: guide.bgColor }}
              >
                {guide.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.85rem] font-medium leading-snug">{guide.title}</p>
                <p className="text-[0.68rem] text-muted-foreground">{guide.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 flex-shrink-0 text-muted-foreground/40" />
            </Link>
          ))}
        </div>
      </div>

      {/* ── E. Tasks Preview ────────────────────────────────────────────────── */}
      {previewTasks.length > 0 && (
        <div className="section-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[0.82rem] font-semibold">Det I er i gang med</p>
            <Link to="/sammen" className="text-[0.72rem] font-medium" style={{ color: "hsl(var(--moss))" }}>
              Se alle opgaver <ChevronRight className="w-3 h-3 inline" />
            </Link>
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "hsl(var(--warm-white))", border: "1px solid hsl(var(--stone-light))" }}
          >
            <div className="divide-y" style={{ borderColor: "hsl(var(--stone-lighter))" }}>
              {previewTasks.map(task => {
                const assigneeName =
                  task.assignee === "mor" ? morName :
                  task.assignee === "far" ? farName :
                  "Fælles";
                const assigneeInitial =
                  task.assignee === "mor" ? morName?.[0] :
                  task.assignee === "far" ? farName?.[0] :
                  null;
                const isMyTask = task.assignee === myRole || task.takenBy === myRole;
                const isFelles = task.assignee === "fælles";

                return (
                  <div key={task.id} className="flex items-center gap-3 px-4 py-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {isFelles ? (
                        <div className="flex -space-x-1.5">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-semibold border-2 border-white z-10"
                            style={{ background: "hsl(var(--clay-light))", color: "hsl(var(--bark))" }}>
                            {morName?.[0]}
                          </div>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-semibold border-2 border-white"
                            style={{ background: "hsl(var(--sage-light))", color: "hsl(var(--moss))" }}>
                            {farName?.[0]}
                          </div>
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-semibold"
                          style={{
                            background: task.assignee === "mor" ? "hsl(var(--clay-light))" : "hsl(var(--sage-light))",
                            color: task.assignee === "mor" ? "hsl(var(--bark))" : "hsl(var(--moss))",
                          }}>
                          {assigneeInitial}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[0.82rem] font-medium truncate">{task.title}</p>
                      <p className="text-[0.65rem] text-muted-foreground">{assigneeName}</p>
                    </div>

                    {isMyTask ? (
                      <span className="text-[0.65rem] px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{ background: "hsl(var(--stone-lighter))", color: "hsl(var(--muted-foreground))" }}>
                        Din opgave
                      </span>
                    ) : (
                      <button
                        onClick={() => takeTask(task.id)}
                        className="text-[0.72rem] font-semibold px-3.5 py-1.5 rounded-full text-white transition-all active:scale-95 flex-shrink-0"
                        style={{ background: "hsl(var(--moss))" }}
                      >
                        Tag den
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── E2. Graviditetskalender ──────────────────────────────────────────── */}
      <Link
        to="/gravid-kalender"
        className="flex items-center gap-4 rounded-2xl px-5 py-4 section-fade-in transition-all active:scale-[0.98]"
        style={{
          background: "hsl(var(--warm-white))",
          border: "1px solid hsl(var(--stone-light))",
          animationDelay: "330ms",
        }}
      >
        <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-2xl"
          style={{ background: "hsl(var(--sage-light))" }}>
          📅
        </div>
        <div className="flex-1">
          <p className="text-[0.88rem] font-semibold">Scanninger & aftaler</p>
          <p className="text-[0.7rem] text-muted-foreground">Synkronisér med din kalender</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
      </Link>

      {/* ── F. Fødselsplan (week 30+) ───────────────────────────────────────── */}
      {currentWeek >= 30 && (
        <Link
          to="/foedselsplan"
          className="flex items-center gap-4 rounded-2xl px-5 py-4 section-fade-in transition-all active:scale-[0.98]"
          style={{
            background: "hsl(var(--warm-white))",
            border: "1px solid hsl(var(--stone-light))",
            animationDelay: "360ms",
          }}
        >
          <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-2xl"
            style={{ background: "hsl(var(--sage-light))" }}>
            🌿
          </div>
          <div className="flex-1">
            <p className="text-[0.88rem] font-semibold">Vores fødselsplan</p>
            <p className="text-[0.7rem] text-muted-foreground">Dokumentér jeres ønsker til fødslen</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
        </Link>
      )}

      {/* ── G. Contraction Timer (week 36+) ─────────────────────────────────── */}
      {currentWeek >= 36 && (
        <Link
          to="/veer"
          className="flex items-center gap-4 rounded-2xl px-5 py-4 section-fade-in transition-all active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, hsl(var(--clay-light)), hsl(var(--sand-light)))",
            border: "1px solid hsl(var(--clay) / 0.3)",
            animationDelay: "390ms",
          }}
        >
          <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-2xl"
            style={{ background: "rgba(255,255,255,0.5)" }}>
            ⏱️
          </div>
          <div className="flex-1">
            <p className="text-[0.88rem] font-semibold">Veer-timer</p>
            <p className="text-[0.7rem] text-muted-foreground">Track veer og del live med din partner</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
        </Link>
      )}

      {/* ── G. Disclaimer ───────────────────────────────────────────────────── */}
      <div
        className="rounded-xl px-4 py-3 section-fade-in flex items-start gap-2.5"
        style={{ background: "hsl(var(--stone-lighter))", animationDelay: "420ms" }}
      >
        <span className="text-[0.75rem] text-muted-foreground/60 flex-shrink-0 mt-0.5">ⓘ</span>
        <p className="text-[0.72rem] text-muted-foreground leading-relaxed">
          Alle graviditeter er forskellige. Indholdet er generel information og kan ikke erstatte professionel rådgivning.
        </p>
      </div>

    </div>
  );
}
