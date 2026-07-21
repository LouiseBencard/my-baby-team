import { useFamily } from "@/context/FamilyContext";
import { getBabySize, getWeekInsight } from "@/lib/phaseData";
import { NotificationBell } from "@/components/NotificationCenter";
import { WeekUnlockModal } from "@/components/WeekUnlockModal";
import { CheckInCard } from "@/components/PregnancyCheckIn";
import { User, ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import headerImg from "@/assets/header-mor-gravid.webp";

function getWeekBullets(week: number): string[] {
  if (week < 8)  return ["Babys hjerte begynder at slå", "Alle vitale organer er ved at dannes", "Fosteret er størrelse med et hindbær"];
  if (week < 12) return ["Hjertet slår ca. 150 slag i minuttet", "Fingre og tæer er ved at forme sig", "Hjernen udvikler sig hurtigt"];
  if (week < 16) return ["Første trimester er klaret", "Risikoen for tab falder markant nu", "Baby begynder at bevæge sig"];
  if (week < 20) return ["Baby kan lave ansigtsudtryk", "Sanser begynder at vågne", "Knogler og muskler bliver stærkere"];
  if (week < 24) return ["Baby kan høre din stemme", "Halvvejs igennem graviditeten", "Hjertet pumper ca. 25 liter blod i døgnet"];
  if (week < 28) return ["Baby reagerer på lys og mørke", "Har en regelmæssig søvnrytme", "Lungerne er ved at modnes"];
  if (week < 32) return ["Tredje trimester er begyndt", "Baby kan åbne og lukke øjnene", "Baby vender sig langsomt med hovedet nedad"];
  if (week < 36) return ["Baby er næsten fuldt udviklet", "I kan mærke tydelige spark og bevægelser", "Begyn at pakke hospitalstasken"];
  return ["Baby er klar til verden når som helst", "Alle organer er fuldt udviklede", "I er stærkere end I tror"];
}

function getWeekDays(week: number): { days: number; extra: number } {
  return { days: week, extra: Math.floor(Math.random() * 6) };
}

export default function DashboardPregnant() {
  const { profile, currentWeek, totalWeeks, trimester, tasks, morName, farName, takeTask } = useFamily();
  const { t } = useTranslation();

  const size = getBabySize(currentWeek);
  const insight = getWeekInsight(currentWeek);
  const bullets = getWeekBullets(currentWeek);

  const progress = Math.round((currentWeek / totalWeeks) * 100);
  const daysLeft = Math.max(0, (totalWeeks - currentWeek) * 7);
  const extraDays = new Date().getDay() % 6;
  const weekLabel = `${currentWeek}+${extraDays}`;

  const getGreeting = (): string => {
    const h = new Date().getHours();
    if (h < 10) return t("greeting.morning");
    if (h < 17) return t("greeting.afternoon");
    return t("greeting.evening");
  };

  const previewTasks = tasks.filter(t => !t.completed).slice(0, 3);
  const myRole = profile.role;

  return (
    <div className="pb-6">
      <WeekUnlockModal />

      {/* ── ILLUSTRATION HEADER ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: 260, marginBottom: 20 }}>
        <img
          src={headerImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Gradient overlay — cream i bunden */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(251,248,242,0) 20%, rgba(251,248,242,0.6) 65%, rgba(251,248,242,1) 100%)" }}
        />
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-4">
          <img src="/melo-wordmark.png" alt="melo" style={{ height: 22 }} />
          <div className="flex items-center gap-2.5">
            <NotificationBell />
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[0.72rem] font-semibold"
              style={{ background: "rgba(251,248,242,0.88)", color: "hsl(var(--clay-text))" }}
            >
              {profile.parentName?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
            </div>
          </div>
        </div>
        {/* Navn og uge i bunden af headeren */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <h1 className="font-serif text-[1.75rem] leading-tight" style={{ color: "hsl(var(--bark))" }}>
            {getGreeting()}, {profile.parentName}
          </h1>
          <p className="text-[0.82rem] mt-0.5" style={{ color: "hsl(var(--stone))" }}>
            {weekLabel} uger · {daysLeft} dage til termin
          </p>
        </div>
      </div>

      <div className="space-y-4 px-4">

        {/* ── CHECK-IN ──────────────────────────────────────────────────────── */}
        <CheckInCard />

        {/* ── UGENS HIGHLIGHT ───────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-4 section-fade-in"
          style={{ background: "hsl(var(--clay-light))", border: "1px solid hsl(var(--clay) / 0.2)", animationDelay: "60ms" }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" style={{ color: "hsl(var(--clay-text))" }} />
            <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase" style={{ color: "hsl(var(--clay-text))" }}>
              Ugens highlight
            </p>
          </div>
          <p className="font-serif text-[1.15rem] font-medium leading-snug mb-1" style={{ color: "hsl(var(--bark))" }}>
            {bullets[0]}
          </p>
          <p className="text-[0.78rem] leading-relaxed" style={{ color: "hsl(var(--clay-text))" }}>
            {bullets[1]}
          </p>
          <Link
            to="/graviditet/uge"
            className="inline-flex items-center gap-1 text-[0.72rem] font-medium mt-2"
            style={{ color: "hsl(var(--clay-text))" }}
          >
            Læs mere <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* ── 3 TING I DAG ──────────────────────────────────────────────────── */}
        {previewTasks.length > 0 && (
          <div className="section-fade-in" style={{ animationDelay: "120ms" }}>
            <div className="flex items-baseline justify-between mb-1">
              <p className="text-[0.92rem] font-semibold" style={{ color: "hsl(var(--bark))" }}>I dag</p>
              <Link to="/sammen" className="text-[0.72rem] font-medium" style={{ color: "hsl(var(--moss))" }}>Se alle</Link>
            </div>
            <p className="text-[0.72rem] mb-3" style={{ color: "hsl(var(--stone))" }}>3 ting der gør en forskel</p>
            <div className="space-y-2.5">
              {previewTasks.map(task => {
                const isMyTask = task.assignee === myRole || task.takenBy === myRole;
                const isFelles = task.assignee === "fælles";
                return (
                  <div key={task.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                    style={{ background: "#fff", border: "1px solid hsl(var(--stone-light))" }}
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                      style={{ borderColor: task.completed ? "hsl(var(--moss))" : "hsl(var(--stone-light))", background: task.completed ? "hsl(var(--moss))" : "transparent" }}
                    >
                      {task.completed && <ChevronRight className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.82rem] font-medium truncate" style={{ color: "hsl(var(--bark))" }}>{task.title}</p>
                      {task.note && <p className="text-[0.68rem] mt-0.5" style={{ color: "hsl(var(--stone))" }}>{task.note}</p>}
                    </div>
                    {!isMyTask && !task.completed ? (
                      <button
                        onClick={() => takeTask(task.id)}
                        className="text-[0.68rem] font-semibold px-3 py-1 rounded-full text-white flex-shrink-0"
                        style={{ background: "hsl(var(--moss))" }}
                      >
                        Tag den
                      </button>
                    ) : (
                      <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--stone-light))" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── PROGRESS ──────────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl px-4 py-3.5 section-fade-in"
          style={{ background: "hsl(var(--cream))", border: "1px solid hsl(var(--stone-light))", animationDelay: "180ms" }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-[0.68rem] font-medium tracking-[0.1em] uppercase" style={{ color: "hsl(var(--stone))" }}>Din graviditet</p>
            <p className="text-[0.78rem] font-semibold" style={{ color: "hsl(var(--clay-text))" }}>{progress}%</p>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden mb-2" style={{ background: "hsl(var(--stone-light))" }}>
            <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "hsl(var(--clay))" }} />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[0.68rem]" style={{ color: "hsl(var(--stone))" }}>
              Uge <span className="font-semibold" style={{ color: "hsl(var(--bark))" }}>{weekLabel}</span> af {totalWeeks}
            </p>
            <p className="text-[0.68rem]" style={{ color: "hsl(var(--stone))" }}>
              <span className="font-semibold" style={{ color: "hsl(var(--clay-text))" }}>{daysLeft} dage</span> til termin
            </p>
          </div>
        </div>

        {/* ── SPØRG MELO ────────────────────────────────────────────────────── */}
        <Link
          to="/chat"
          className="flex items-center gap-3 rounded-2xl px-4 py-3.5 section-fade-in transition-all active:scale-[0.98]"
          style={{ background: "hsl(var(--sage-light))", border: "1px solid hsl(var(--sage) / 0.3)", animationDelay: "240ms" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(var(--moss))" }}
          >
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[0.88rem] font-semibold" style={{ color: "hsl(var(--moss))" }}>Spørg Melo</p>
            <p className="text-[0.72rem]" style={{ color: "hsl(var(--sage-dark))" }}>
              Har du spørgsmål om graviditet, fødsel eller din krop?
            </p>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(var(--moss))" }}
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </Link>

        {/* ── DISCLAIMER ────────────────────────────────────────────────────── */}
        <p className="text-[0.68rem] text-center leading-relaxed section-fade-in px-4" style={{ color: "hsl(var(--stone))", animationDelay: "300ms" }}>
          Indholdet er generel information og erstatter ikke professionel rådgivning fra jordemoder eller læge.
        </p>
      </div>
    </div>
  );
}
