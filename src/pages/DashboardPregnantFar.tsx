import { useFamily } from "@/context/FamilyContext";
import { NotificationBell } from "@/components/NotificationCenter";
import { CheckInCard } from "@/components/PregnancyCheckIn";
import { User, ArrowRight, ChevronRight, Sparkles, Heart, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import headerImg from "@/assets/header-far-gravid.webp";

function getWeekContent(week: number) {
  if (week < 12) return {
    focus: "Vær der. Lyt. Det er nok.",
    tip: "Baby er på størrelse med en blomme. Louise oplever sandsynligvis kvalme og træthed — din ro og omsorg er alt.",
    helpTips: ["Tag over med madlavning — undgå stærke dufte", "Lad hende hvile uden dårlig samvittighed", "Spørg hvad hun har brug for"],
    symptoms: ["Kraftig træthed", "Kvalme", "Stemningsudsving"],
    actions: ["Book jordemoder", "Fortæl din arbejdsgiver om orloven", "Undersøg regler for fedreorlov"],
  };
  if (week < 20) return {
    focus: "Baby hører din stemme nu.",
    tip: "Tal til maven — baby kender forskel på stemmer. Dit nærvær tæller mere end du tror.",
    helpTips: ["Tal til maven dagligt", "Massér hendes ryg", "Tag styring på indkøb og madplaner"],
    symptoms: ["Rygsmerter", "Halsbrand", "Baby begynder at sparke"],
    actions: ["Tilmeld jer fødselsforberedelse", "Start samtale om navne", "Lav budget for første år"],
  };
  if (week < 28) return {
    focus: "I er halvvejs — fejr det i aften.",
    tip: "Baby kan høre jer begge tydeligt nu. Tal, synge — det tæller.",
    helpTips: ["Søg info om fødselsforberedelse nu", "Tag ansvar for jeres økonomi-forberedelse", "Spørg hvad hun ønsker til fødslen"],
    symptoms: ["Hævede ankler", "Halsbrand", "Rygsmerter"],
    actions: ["Bestil babygrej (seng, klapvogn)", "Lær om din rolle under fødslen", "Planlæg barselsorlov"],
  };
  if (week < 36) return {
    focus: "Din ro smitter. Vær klar.",
    tip: "Baby vender sig nu. Pak hospitalstasken og kend vej til hospitalet.",
    helpTips: ["Pak hospitalstasken sammen", "Lær om tegn på fødsel", "Hav telefonen opladet"],
    symptoms: ["Træt og tung", "Braxton Hicks veer", "Svært ved at sove"],
    actions: ["Pak hospitalstasken", "Lær veer-timeren at kende", "Lav aftale om hvem passer ældre søskende"],
  };
  return {
    focus: "Baby kan komme når som helst.",
    tip: "I er klar — begge to. Vær til stede, hold telefonen opladet.",
    helpTips: ["Vær til stede — aflys hvad du kan", "Tag styring på alt praktisk", "Minder hende om hun er stærk"],
    symptoms: ["Meget ubehagelig", "Utålmodig", "Blandede følelser"],
    actions: ["Hold telefon opladet altid", "Kend vej til hospitalet", "Vær klar til at tage af sted"],
  };
}

export default function DashboardPregnantFar() {
  const { profile, currentWeek, morName, farName, tasks, takeTask } = useFamily();
  const { t } = useTranslation();

  const content = getWeekContent(currentWeek);
  const extraDays = new Date().getDay() % 6;
  const weekLabel = `${currentWeek}+${extraDays}`;
  const daysLeft = Math.max(0, (40 - currentWeek) * 7);
  const myTasks = tasks.filter(t => !t.completed && (t.assignee === "far" || t.takenBy === "far")).slice(0, 3);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 10) return t("greeting.morning");
    if (h < 17) return t("greeting.afternoon");
    return t("greeting.evening");
  };

  return (
    <div className="pb-6">

      {/* ── ILLUSTRATION HEADER ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: 260, marginBottom: 20 }}>
        <img src={headerImg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(251,248,242,0) 20%, rgba(251,248,242,0.6) 65%, rgba(251,248,242,1) 100%)" }} />
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-4">
          <img src="/melo-wordmark.png" alt="melo" style={{ height: 22 }} />
          <div className="flex items-center gap-2.5">
            <NotificationBell />
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[0.72rem] font-semibold"
              style={{ background: "rgba(251,248,242,0.88)", color: "hsl(var(--sage-dark))" }}>
              {profile.parentName?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <h1 className="font-serif text-[1.75rem] leading-tight" style={{ color: "hsl(var(--bark))" }}>
            {getGreeting()}, {farName || profile.parentName}
          </h1>
          <p className="text-[0.82rem] mt-0.5" style={{ color: "hsl(var(--stone))" }}>
            {morName} er i uge {weekLabel} · {daysLeft} dage til termin
          </p>
        </div>
      </div>

      <div className="space-y-4 px-4">
        <CheckInCard />

        {/* ── MELO FORESLÅR ─────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-4 section-fade-in"
          style={{ background: "hsl(var(--sage-light))", border: "1px solid hsl(var(--sage) / 0.3)", animationDelay: "60ms" }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" style={{ color: "hsl(var(--sage-dark))" }} />
            <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase" style={{ color: "hsl(var(--sage-dark))" }}>Melo foreslår</p>
          </div>
          <p className="font-serif text-[1.1rem] font-medium leading-snug mb-1" style={{ color: "hsl(var(--bark))" }}>
            {content.focus}
          </p>
          <p className="text-[0.78rem] leading-relaxed" style={{ color: "hsl(var(--sage-dark))" }}>
            {content.tip}
          </p>
        </div>

        {/* ── DINE OPGAVER ──────────────────────────────────────────────────── */}
        {myTasks.length > 0 && (
          <div className="section-fade-in" style={{ animationDelay: "120ms" }}>
            <div className="flex items-baseline justify-between mb-1">
              <p className="text-[0.92rem] font-semibold" style={{ color: "hsl(var(--bark))" }}>I dag</p>
              <Link to="/sammen" className="text-[0.72rem] font-medium" style={{ color: "hsl(var(--moss))" }}>Se alle</Link>
            </div>
            <p className="text-[0.72rem] mb-3" style={{ color: "hsl(var(--stone))" }}>3 ting der gør en forskel</p>
            <div className="space-y-2.5">
              {myTasks.map(task => (
                <div key={task.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background: "#fff", border: "1px solid hsl(var(--stone-light))" }}
                >
                  <div className="w-6 h-6 rounded-full border-2 flex-shrink-0"
                    style={{ borderColor: "hsl(var(--stone-light))" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.82rem] font-medium truncate" style={{ color: "hsl(var(--bark))" }}>{task.title}</p>
                  </div>
                  <span className="text-[0.68rem] px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ background: "hsl(var(--sage-light))", color: "hsl(var(--sage-dark))" }}>
                    Dig
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FORSTÅ HVAD HUN OPLEVER ───────────────────────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden section-fade-in"
          style={{ background: "#fff", border: "1px solid hsl(var(--stone-light))", animationDelay: "180ms" }}
        >
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4" style={{ color: "hsl(var(--clay))" }} />
              <p className="text-[0.88rem] font-semibold" style={{ color: "hsl(var(--bark))" }}>
                Forstå hvad {morName} oplever
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {content.symptoms.map((s, i) => (
                <span key={i} className="text-[0.7rem] px-2.5 py-1 rounded-full font-medium"
                  style={{ background: "hsl(var(--clay-light))", color: "hsl(var(--bark))" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="border-t px-4 py-3 space-y-2.5" style={{ borderColor: "hsl(var(--stone-lighter))" }}>
            <p className="text-[0.75rem] font-semibold mb-1" style={{ color: "hsl(var(--bark))" }}>Sådan hjælper du</p>
            {content.helpTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(var(--moss))" }} />
                <p className="text-[0.78rem] leading-snug" style={{ color: "hsl(var(--bark))" }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SPØRG MELO ────────────────────────────────────────────────────── */}
        <Link
          to="/chat"
          className="flex items-center gap-3 rounded-2xl px-4 py-3.5 section-fade-in transition-all active:scale-[0.98]"
          style={{ background: "hsl(var(--sage-light))", border: "1px solid hsl(var(--sage) / 0.3)", animationDelay: "240ms" }}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--moss))" }}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[0.88rem] font-semibold" style={{ color: "hsl(var(--moss))" }}>Spørg Melo</p>
            <p className="text-[0.72rem]" style={{ color: "hsl(var(--sage-dark))" }}>
              Fx om din rolle, fødslen eller hvad {morName} har brug for
            </p>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--moss))" }}>
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
}
