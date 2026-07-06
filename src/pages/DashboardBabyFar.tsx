import { useFamily } from "@/context/FamilyContext";
import { useDiary } from "@/context/DiaryContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { User, ChevronRight, Heart, CheckCircle2, Dumbbell, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { da, enUS } from "date-fns/locale";

import { MeloWordmark } from "@/components/MeloWordmark";
import { NotificationBell } from "@/components/NotificationCenter";
import { TaskList } from "@/components/TaskList";
import { TakenTaskCard } from "@/components/TakenTaskCard";
import { NeedsCard } from "@/components/NeedsCard";
import { AppreciationCard } from "@/components/AppreciationCard";
import { DadDailyMissions, VidsteDuCard } from "@/components/FarDashboardCards";
import { NattenKort } from "@/components/NattenKort";

import {
  getFarBabyContent,
  formatWeightCompare,
  pickReminderOfDay,
  pickMorSupportOfDay,
  pickShiftSuggestions,
  type FeedingMethod,
} from "@/lib/farBabyContent";

// ──────────────────────────────────────────────────────────────────────────────
// Far-dashboard i baby-fasen — bygget til en mand med et barn i den ene arm.
// Kort indhold, store tryk-flader, kettlebell-/workout-rammer hvor det passer.
// ──────────────────────────────────────────────────────────────────────────────

export default function DashboardBabyFar() {
  const { profile, babyAgeWeeks, morName, farName } = useFamily();
  const { t, i18n } = useTranslation();
  const dateFnsLocale = i18n.language === "en" ? enUS : da;
  const childName = profile.children?.[0]?.name;
  const feedingMethod = profile.morHealth?.feedingMethod as FeedingMethod;

  const content = getFarBabyContent(babyAgeWeeks, i18n.language);
  const weightLine = formatWeightCompare(content.weightCompare.comparison, babyAgeWeeks);
  const morSupport = pickMorSupportOfDay(content);
  const reminder = pickReminderOfDay(content);
  const shiftSuggestions = pickShiftSuggestions(content, feedingMethod);

  const getGreeting = (): string => {
    const h = new Date().getHours();
    if (h < 10) return t("greeting.morning");
    if (h < 17) return t("greeting.afternoon");
    return t("greeting.evening");
  };

  const ageLabel = babyAgeWeeks < 16
    ? `${babyAgeWeeks} ${babyAgeWeeks === 1 ? "uge" : "uger"} gammel`
    : `${Math.floor(babyAgeWeeks / 4.33)} måneder gammel`;

  const dateStr = format(new Date(), "EEE d. MMM", { locale: dateFnsLocale }).toUpperCase();

  return (
    <div className="space-y-5 pb-6">

      {/* ── A. Header ───────────────────────────────────────────────────────── */}
      <div className="section-fade-in">
        <div className="flex items-center justify-between mb-5">
          <MeloWordmark size="1.8rem" />
          <div className="flex items-center gap-3">
            <NotificationBell />
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[0.75rem] font-semibold"
              style={{ background: "hsl(var(--sage-light))", color: "hsl(var(--moss))" }}
            >
              {profile.parentName?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
            </div>
          </div>
        </div>
        <h1 className="font-serif text-[1.9rem] leading-tight">
          {getGreeting()}, {farName || profile.parentName}
        </h1>
        <p className="text-[0.9rem] text-muted-foreground mt-1">
          {childName ? `${childName} er ` : "Baby er "}{ageLabel} — {content.label.toLowerCase()}.
        </p>
      </div>

      {/* ── B. TakenTaskCard — anerkendelser at sende når mor har taget noget ── */}
      <TakenTaskCard />

      {/* ── C. Hero: vægt + workout-frame ───────────────────────────────────── */}
      <div
        className="rounded-[20px] overflow-hidden section-fade-in"
        style={{
          background: "linear-gradient(145deg, hsl(154 27% 24%), hsl(154 22% 16%))",
          animationDelay: "30ms",
        }}
      >
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between mb-3">
            <span
              className="text-[0.68rem] font-semibold px-2.5 py-1 rounded-full text-white"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              {content.label}
            </span>
            <span className="text-[3.2rem] leading-none">{content.weightCompare.emoji}</span>
          </div>

          <p className="font-serif text-[1.35rem] font-medium text-white leading-snug mb-1.5">
            {weightLine}
          </p>
          <p className="text-[0.82rem] text-white/75 mb-4">
            {content.weightCompare.workout}
          </p>
        </div>

        <div
          className="px-5 py-3 border-t border-white/10 flex items-center justify-between"
          style={{ background: "rgba(0,0,0,0.15)" }}
        >
          <p className="text-[0.68rem] text-white/50">{dateStr}</p>
          <p className="text-[0.68rem] text-white/50">{ageLabel}</p>
        </div>
      </div>

      {/* ── D. Reminder of the day — kort, handlingsanvisende ─────────────── */}
      <div
        className="rounded-2xl px-4 py-3.5 section-fade-in flex items-start gap-3"
        style={{
          background: "hsl(var(--cream))",
          border: "1px solid hsl(var(--clay) / 0.2)",
          animationDelay: "50ms",
        }}
      >
        <span className="text-xl flex-shrink-0">{reminder.emoji}</span>
        <div>
          <p className="text-[0.55rem] tracking-[0.16em] uppercase text-muted-foreground mb-0.5">
            Dagens påmindelse
          </p>
          <p className="text-[0.85rem] leading-snug">{reminder.text}</p>
        </div>
      </div>

      {/* ── E. Forstå hvad mor oplever ─────────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden section-fade-in"
        style={{
          background: "hsl(var(--warm-white))",
          border: "1px solid hsl(var(--stone-light))",
          animationDelay: "80ms",
        }}
      >
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-4 h-4" style={{ color: "hsl(var(--clay))" }} />
            <p className="text-[0.95rem] font-semibold">
              Forstå hvad {morName || "mor"} oplever nu
            </p>
          </div>
          <p className="text-[0.72rem] text-muted-foreground mb-3">
            Det her sker for hende lige nu — så du kan møde det
          </p>
          <div className="space-y-2">
            <SupportLine icon="🌸" text={morSupport.physical} />
            <SupportLine icon="🤲" text={morSupport.practical} />
            <SupportLine icon="💬" text={morSupport.emotional} />
          </div>
        </div>
      </div>

      {/* ── F. Vagtfordeling — fodermetode-bevidst ─────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden section-fade-in"
        style={{
          background: "hsl(var(--warm-white))",
          border: "1px solid hsl(var(--stone-light))",
          animationDelay: "100ms",
        }}
      >
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center gap-2 mb-1">
            <Dumbbell className="w-4 h-4" style={{ color: "hsl(var(--moss))" }} />
            <p className="text-[0.95rem] font-semibold">Vagter & bleskift</p>
          </div>
          <p className="text-[0.72rem] text-muted-foreground mb-3">
            {feedingMethod === "flaske"
              ? "I bruger flaske — del nætterne ligeligt"
              : feedingMethod === "begge"
              ? "I kombinerer amning og flaske — fleksibilitet er jeres ven"
              : "Mor ammer — du kan stadig tage meget mere end du tror"}
          </p>
          <div className="space-y-2">
            {shiftSuggestions.map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: "hsl(var(--moss))" }}
                />
                <p className="text-[0.8rem] leading-snug">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── G. Dagens missioner — eksisterende komponent ──────────────────── */}
      <DadDailyMissions />

      {/* ── H. Aktiviteter — workout-frame valgfri ────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden section-fade-in"
        style={{
          background: "hsl(var(--warm-white))",
          border: "1px solid hsl(var(--stone-light))",
          animationDelay: "150ms",
        }}
      >
        <div className="px-5 pt-4 pb-3">
          <p className="text-[0.95rem] font-semibold mb-0.5">
            Aktiviteter med {childName || "baby"}
          </p>
          <p className="text-[0.72rem] text-muted-foreground mb-3">
            Leg = bonding = workout. Tre ting på én gang.
          </p>
          <div className="space-y-2.5">
            {content.activities.map((activity, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-3"
                style={{ background: "hsl(var(--sage-light) / 0.3)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{activity.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.85rem] font-medium">{activity.title}</p>
                    <p className="text-[0.7rem] text-muted-foreground mt-0.5">
                      {activity.benefit}
                    </p>
                    {activity.workout && (
                      <p
                        className="text-[0.65rem] mt-1 italic"
                        style={{ color: "hsl(var(--moss))" }}
                      >
                        💪 {activity.workout}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── I. Søvn-overblik & jeres delte opgaver ────────────────────────── */}
      <NattenKort />
      <NeedsCard />
      <TaskList />

      {/* ── J. Anerkendelse — eksisterende komponent ──────────────────────── */}
      <AppreciationCard />

      {/* ── K. "Vidste du?" til far — eksisterende komponent ──────────────── */}
      <VidsteDuCard ageWeeks={babyAgeWeeks} morName={morName || "mor"} />

      {/* ── L. Hurtige links ──────────────────────────────────────────────── */}
      <div className="section-fade-in" style={{ animationDelay: "200ms" }}>
        <p className="text-[0.82rem] font-semibold mb-3">Hurtige redskaber</p>
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/dagbog"
            className="flex flex-col gap-2 rounded-2xl p-4 transition-all active:scale-[0.97]"
            style={{ background: "hsl(var(--warm-white))", border: "1px solid hsl(var(--stone-light))" }}
          >
            <span className="text-2xl">📔</span>
            <div>
              <p className="text-[0.82rem] font-semibold leading-snug">Dagbog</p>
              <p className="text-[0.65rem] text-muted-foreground">Mad · ble · søvn</p>
            </div>
          </Link>

          <Link
            to="/sovn"
            className="flex flex-col gap-2 rounded-2xl p-4 transition-all active:scale-[0.97]"
            style={{ background: "hsl(var(--warm-white))", border: "1px solid hsl(var(--stone-light))" }}
          >
            <span className="text-2xl">😴</span>
            <div>
              <p className="text-[0.82rem] font-semibold leading-snug">Søvn</p>
              <p className="text-[0.65rem] text-muted-foreground">Tracker & rytmer</p>
            </div>
          </Link>

          <Link
            to="/chat"
            className="flex flex-col gap-2 rounded-2xl p-4 transition-all active:scale-[0.97]"
            style={{ background: "hsl(var(--warm-white))", border: "1px solid hsl(var(--stone-light))" }}
          >
            <MessageCircle className="w-6 h-6" style={{ color: "hsl(var(--moss))" }} />
            <div>
              <p className="text-[0.82rem] font-semibold leading-snug">Spørg MELO</p>
              <p className="text-[0.65rem] text-muted-foreground">Din AI-guide</p>
            </div>
          </Link>

          <Link
            to="/sammen"
            className="flex flex-col gap-2 rounded-2xl p-4 transition-all active:scale-[0.97]"
            style={{ background: "hsl(var(--warm-white))", border: "1px solid hsl(var(--stone-light))" }}
          >
            <span className="text-2xl">🤝</span>
            <div>
              <p className="text-[0.82rem] font-semibold leading-snug">Sammen</p>
              <p className="text-[0.65rem] text-muted-foreground">Opgaver & rytmer</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ── M. Disclaimer ──────────────────────────────────────────────────── */}
      <div
        className="rounded-xl px-4 py-3 section-fade-in flex items-start gap-2.5"
        style={{ background: "hsl(var(--stone-lighter))", animationDelay: "250ms" }}
      >
        <span className="text-[0.75rem] text-muted-foreground/60 flex-shrink-0 mt-0.5">ⓘ</span>
        <p className="text-[0.72rem] text-muted-foreground leading-relaxed">
          Indholdet er generel støtte til forældreskab — ikke sundhedsfaglig
          rådgivning. Ved bekymring om mor eller barn: kontakt sundhedsplejerske,
          jordemoder eller læge.
        </p>
      </div>

    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────

function SupportLine({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>
      <p className="text-[0.82rem] leading-relaxed">{text}</p>
    </div>
  );
}
