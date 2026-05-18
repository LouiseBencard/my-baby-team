import { useState, useEffect } from "react";
import { useFamily } from "@/context/FamilyContext";
import { useDiary } from "@/context/DiaryContext";
import { useTranslation } from "react-i18next";
import { QuickLog } from "@/components/QuickLog";
import { TaskList } from "@/components/TaskList";
import { VidsteDuCard } from "@/components/FarDashboardCards";
import { WhatMattersNow } from "@/components/CommandCenter";
import { NeedsCard } from "@/components/NeedsCard";
import { AppreciationCard } from "@/components/AppreciationCard";
import { MemoryKeeper } from "@/components/MemoryKeeper";
import { JordemoderCard } from "@/components/JordemoderCard";
import { NatteplanCard } from "@/components/NatteplanCard";
import { DagensSpørgsmål } from "@/components/DagensSpørgsmål";
import { UgensRecap } from "@/components/UgensRecap";
import { BabyDevCard } from "@/components/BabyDevCard";
import { NattenKort } from "@/components/NattenKort";
import { MeloWordmark } from "@/components/MeloWordmark";
import { NotificationBell } from "@/components/NotificationCenter";
import { MessageCircle, Heart, Gamepad2, Square, User } from "lucide-react";
import { format } from "date-fns";
import { da, enUS } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useSleepNotifications } from "@/hooks/useSleepNotifications";

// ── Baby hero milestone by age ─────────────────────────────────────────────────
function getBabyMilestone(ageWeeks: number, childName: string): { emoji: string; headline: string; sub: string } {
  if (ageWeeks < 2)  return { emoji: "🌱", headline: `${childName} er nyfødt`, sub: "De første dage er fyldt med nærhed og tilknytning." };
  if (ageWeeks < 6)  return { emoji: "👁️", headline: `${childName} begynder at fokusere`, sub: "Øjenkontakt og ansigtsudtryk er jeres første sprog." };
  if (ageWeeks < 10) return { emoji: "😊", headline: `${childName} smiler socialt`, sub: "Det første ægte smil — dit ansigt er det smukkeste de kender." };
  if (ageWeeks < 16) return { emoji: "🗣️", headline: `${childName} bruger stemmen`, sub: "Gurgling og lyde — babyen eksperimenterer med kommunikation." };
  if (ageWeeks < 20) return { emoji: "✋", headline: `${childName} griber om ting`, sub: "Hænder og ting er den nyeste opdagelse." };
  if (ageWeeks < 26) return { emoji: "🔄", headline: `${childName} vender sig`, sub: "Motorikken er i fuld udvikling — tummy time hjælper." };
  if (ageWeeks < 36) return { emoji: "🧸", headline: `${childName} sidder med støtte`, sub: "Verden ser anderledes ud fra oprejst position." };
  if (ageWeeks < 48) return { emoji: "🚀", headline: `${childName} er på vej op`, sub: "Kravling og rejsning — der er ingen stopper nu." };
  return { emoji: "👶", headline: `${childName} vokser hurtigt`, sub: "Hvert skridt er en milepæl — I er der for dem alle." };
}

export default function DashboardBaby() {
  const { profile, phaseLabel, morName, farName, babyAgeWeeks, isOnLeave, setNeed } = useFamily();
  const { t, i18n } = useTranslation();
  const hasPartner = profile.hasPartner !== false;
  const isMor = profile.role === "mor";
  const childName = profile.children?.[0]?.name;
  const dateFnsLocale = i18n.language === "en" ? enUS : da;

  useSleepNotifications();

  const displayPhase = childName
    ? `${phaseLabel} · ${childName}`
    : phaseLabel;

  const dateStr = format(new Date(), "EEE d. MMM", { locale: dateFnsLocale }).toUpperCase();

  const getGreeting = (): string => {
    const h = new Date().getHours();
    if (h < 10) return t("greeting.morning");
    if (h < 17) return t("greeting.afternoon");
    return t("greeting.evening");
  };

  const milestone = getBabyMilestone(babyAgeWeeks, childName || "Baby");
  const ageLabel = babyAgeWeeks < 16
    ? `${babyAgeWeeks} ${babyAgeWeeks === 1 ? "uge" : "uger"} gammel`
    : `${Math.floor(babyAgeWeeks / 4.33)} måneder gammel`;

  return (
    <div className="space-y-4">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="section-fade-in">
        <div className="flex items-center justify-between mb-5">
          <MeloWordmark size="1.8rem" />
          <div className="flex items-center gap-3">
            <NotificationBell />
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[0.75rem] font-semibold"
              style={{ background: isMor ? "hsl(var(--clay-light))" : "hsl(var(--sage-light))", color: isMor ? "hsl(var(--bark))" : "hsl(var(--moss))" }}
            >
              {profile.parentName?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
            </div>
          </div>
        </div>
        <h1 className="font-serif text-[1.9rem] leading-tight" style={{ color: "hsl(var(--bark))" }}>
          {getGreeting()}, {profile.parentName} <span className="text-[1.4rem]">🌿</span>
        </h1>
        <p className="text-[0.82rem] text-muted-foreground mt-1">{ageLabel} — I klarer det.</p>
      </div>

      {/* ── Hero card ────────────────────────────────────────────────────── */}
      <div
        className="rounded-[20px] overflow-hidden section-fade-in"
        style={{
          background: isMor
            ? "linear-gradient(145deg, hsl(22 35% 32%), hsl(22 30% 22%))"
            : "linear-gradient(145deg, hsl(154 22% 28%), hsl(154 27% 20%))",
          animationDelay: "30ms",
        }}
      >
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between mb-3">
            <span className="text-[0.68rem] font-semibold px-2.5 py-1 rounded-full text-white"
              style={{ background: "rgba(255,255,255,0.15)" }}>
              {ageLabel}
            </span>
            <span className="text-[3.2rem] leading-none">{milestone.emoji}</span>
          </div>
          <p className="font-serif text-[1.35rem] font-medium text-white leading-snug mb-1.5">
            {milestone.headline}
          </p>
          <p className="text-[0.82rem] text-white/75 mb-4">{milestone.sub}</p>
          <Link
            to="/barn"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.78rem] font-medium transition-all active:scale-95"
            style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
          >
            Se {childName || "babys"} udvikling →
          </Link>
        </div>
        <div className="px-5 py-2.5 border-t border-white/10 flex items-center justify-between"
          style={{ background: "rgba(0,0,0,0.12)" }}>
          <p className="text-[0.68rem] text-white/50">{dateStr}</p>
          <p className="text-[0.68rem] text-white/50">{displayPhase}</p>
        </div>
      </div>

      <NattenKort />
      <LiveSleepTracker childName={childName || "Baby"} />
      <WhatMattersNow />
      <QuickLog />
      <DiarySnapshot childName={childName || "Baby"} />
      <TaskList />
      <NeedsCardConditional />
      <NatteplanCard />
      <UgensRecap />
      <JordemoderCard />
      <BabyDevCard />
      {!isMor && (
        <VidsteDuCard ageWeeks={babyAgeWeeks} morName={morName} />
      )}
      <AppreciationCard />
      <MemoryKeeper />
      <DagensSpørgsmål />
      <NotificationPrompt childName={childName || "Baby"} />

      <div className={`grid gap-2.5 section-fade-in ${hasPartner ? "grid-cols-2" : "grid-cols-1 max-w-[200px] mx-auto"}`}>
        <Link to="/chat" className="card-soft !p-4 flex flex-col items-center gap-2 transition-all hover:shadow-sm active:scale-[0.98]">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: isMor ? "hsl(var(--clay-light))" : "hsl(var(--sage-light))" }}>
            <MessageCircle className="w-5 h-5" style={{ color: isMor ? "hsl(var(--clay))" : "hsl(var(--moss))" }} />
          </div>
          <p className="text-[0.78rem] font-medium">{t("dashboard.askMelo")}</p>
          <p className="text-[0.6rem] text-muted-foreground text-center">{t("dashboard.sleepDevAll")}</p>
        </Link>
        {hasPartner && (
          <Link to={isMor ? "/sammen" : "/leg"} className="card-soft !p-4 flex flex-col items-center gap-2 transition-all hover:shadow-sm active:scale-[0.98]">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: isMor ? "hsl(var(--clay-light))" : "hsl(var(--sage-light))" }}>
              {isMor ? <Heart className="w-5 h-5" style={{ color: "hsl(var(--clay))" }} /> : <Gamepad2 className="w-5 h-5" style={{ color: "hsl(var(--moss))" }} />}
            </div>
            <p className="text-[0.78rem] font-medium">{isMor ? t("dashboard.collaboration") : t("dashboard.playActivities")}</p>
            <p className="text-[0.6rem] text-muted-foreground text-center">{isMor ? t("dashboard.tasksDistribution") : t("dashboard.adaptedToAge", { childName: childName || "baby" })}</p>
          </Link>
        )}
      </div>
    </div>
  );
}

// ── Helper components ─────────────────────────────────────────────────────────

/**
 * NeedsCard visibility logic:
 * - No partner → never show
 * - Person on leave, partner at work (07–15) → show to fill in needs
 * - Working partner (15–19) → show so they see partner's needs before coming home
 * - Both on leave → show to both all day (mutual check-in)
 * - Stale need (>24h old) → auto-clear
 */
function NeedsCardConditional() {
  const { profile, isOnLeave, setNeed } = useFamily();
  const { role } = profile;
  const hasPartner = profile.hasPartner !== false;

  const myNeed = profile.activeNeed?.[role];
  const isStale = !!myNeed && (Date.now() - new Date(myNeed.setAt).getTime()) / 3600000 > 24;

  useEffect(() => {
    if (isStale) setNeed(null);
  }, [isStale, setNeed]);

  if (!hasPartner || isStale) return null;

  const hour = new Date().getHours();
  const myOnLeave = isOnLeave(role);
  const partnerOnLeave = isOnLeave(role === "mor" ? "far" : "mor");

  if (myOnLeave && partnerOnLeave) return <NeedsCard />;
  if (myOnLeave && !partnerOnLeave && hour >= 7 && hour < 15) return <NeedsCard />;
  if (!myOnLeave && partnerOnLeave && hour >= 15 && hour < 19) return <NeedsCard />;

  return null;
}

function NotificationPrompt({ childName }: { childName: string }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const handleEnable = async () => {
    const result = await Notification.requestPermission();
    setShow(false);
    if (result === "granted") {
      new Notification(t("notifications.enabled"), {
        body: t("notifications.enabledBody", { childName }),
        icon: "/favicon.ico",
      });
    }
  };

  return (
    <div className="rounded-2xl px-4 py-3.5 section-fade-in" style={{
      background: "hsl(var(--cream))",
      border: "1px solid hsl(var(--stone-light))",
    }}>
      <div className="flex items-start gap-3">
        <span className="text-lg">🔔</span>
        <div className="flex-1">
          <p className="text-[0.82rem] font-medium mb-0.5">{t("notifications.title")}</p>
          <p className="text-[0.72rem] text-muted-foreground mb-2">
            {t("notifications.body", { childName })}
          </p>
          <div className="flex gap-2">
            <button onClick={handleEnable} className="text-[0.72rem] font-medium px-3 py-1.5 rounded-lg transition-all active:scale-95" style={{ background: "hsl(var(--moss))", color: "white" }}>
              {t("notifications.enable")}
            </button>
            <button onClick={() => setShow(false)} className="text-[0.72rem] text-muted-foreground px-3 py-1.5">
              {t("notifications.notNow")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiarySnapshot({ childName }: { childName: string }) {
  const { nursingLogs, diaperLogs, sleepLogs } = useDiary();

  const isToday = (ts: string) => new Date(ts).toDateString() === new Date().toDateString();
  const todayFeedings = nursingLogs.filter(l => isToday(l.timestamp)).length;
  const todayDiapers = diaperLogs.filter(l => isToday(l.timestamp)).length;
  const todaySleepMin = sleepLogs
    .filter(l => isToday(l.startTime) && l.endTime)
    .reduce((acc, l) => acc + (new Date(l.endTime!).getTime() - new Date(l.startTime).getTime()) / 60000, 0);
  const sleepH = Math.floor(todaySleepMin / 60);
  const sleepM = Math.round(todaySleepMin % 60);

  // 7-day trend dots (number of feedings per day)
  const trend = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayStr = d.toDateString();
    return nursingLogs.filter(l => new Date(l.timestamp).toDateString() === dayStr).length;
  });
  const maxTrend = Math.max(...trend, 1);

  const hasAnyData = todayFeedings > 0 || todayDiapers > 0 || todaySleepMin > 0;
  if (!hasAnyData && trend.every(v => v === 0)) return null;

  return (
    <Link
      to="/dagbog"
      className="block rounded-2xl px-4 py-4 section-fade-in transition-all active:scale-[0.98]"
      style={{ background: "hsl(var(--warm-white))", border: "1px solid hsl(var(--stone-light))" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">📔</span>
          <p className="text-[0.82rem] font-semibold">{childName}s dag i dag</p>
        </div>
        <p className="text-[0.68rem]" style={{ color: "hsl(var(--moss))" }}>Se dagbog →</p>
      </div>
      <div className="flex gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🤱</span>
          <div>
            <p className="text-[0.72rem] font-semibold">{todayFeedings}</p>
            <p className="text-[0.58rem] text-muted-foreground">måltider</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm">💧</span>
          <div>
            <p className="text-[0.72rem] font-semibold">{todayDiapers}</p>
            <p className="text-[0.58rem] text-muted-foreground">bleskift</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm">💤</span>
          <div>
            <p className="text-[0.72rem] font-semibold">{sleepH > 0 ? `${sleepH}t ${sleepM}m` : todaySleepMin > 0 ? `${sleepM}m` : "—"}</p>
            <p className="text-[0.58rem] text-muted-foreground">søvn</p>
          </div>
        </div>
      </div>
      {/* 7-day feeding trend */}
      <div>
        <p className="text-[0.6rem] text-muted-foreground mb-1.5">Måltider — 7 dage</p>
        <div className="flex items-end gap-1 h-6">
          {trend.map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm transition-all"
              style={{
                height: `${Math.max(4, (v / maxTrend) * 100)}%`,
                background: i === 6 ? "hsl(var(--moss))" : "hsl(var(--stone-light))",
                minHeight: 4,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-[0.52rem] text-muted-foreground">For 6 dage</p>
          <p className="text-[0.52rem] text-muted-foreground">I dag</p>
        </div>
      </div>
    </Link>
  );
}

function LiveSleepTracker({ childName }: { childName: string }) {
  const { activeSleep, endSleep } = useDiary();
  const { profile } = useFamily();
  const isMor = profile.role === "mor";
  const { t } = useTranslation();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!activeSleep) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [activeSleep]);

  if (!activeSleep) return null;

  const startTime = new Date(activeSleep.startTime);
  const elapsedMs = Math.max(0, now - startTime.getTime());
  const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  const typeLabel = activeSleep.type === "nap" ? t("liveTracker.nap") : t("liveTracker.nightSleep");

  return (
    <div className="rounded-2xl overflow-hidden section-fade-in" style={{
      background: isMor
        ? "linear-gradient(145deg, hsl(var(--clay)), hsl(var(--bark)))"
        : "linear-gradient(145deg, hsl(var(--moss)), hsl(var(--sage-dark)))",
      border: isMor ? "1px solid hsl(var(--clay) / 0.3)" : "1px solid hsl(var(--moss) / 0.3)",
    }}>
      <div className="px-5 py-5 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold"
            style={{ background: isMor ? "hsl(var(--clay-light))" : "hsl(var(--sage))", color: isMor ? "hsl(var(--bark))" : "hsl(var(--moss))" }}>
            {childName.charAt(0)}
          </div>
          <div>
            <p className="text-[0.95rem] font-semibold text-white">{childName}</p>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ background: "hsl(var(--sage-light))" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(var(--sage-light))" }} />
              </span>
              <p className="text-[0.68rem] text-white/70">
                {t("liveTracker.sleepingSince", { time: format(startTime, "HH:mm"), type: typeLabel })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-baseline gap-1 tabular-nums">
          <span className="text-[2.8rem] font-light text-white leading-none">{pad(hours)}</span>
          <span className="text-[2rem] text-white/50 font-light leading-none">:</span>
          <span className="text-[2.8rem] font-light text-white leading-none">{pad(minutes)}</span>
          <span className="text-[2rem] text-white/50 font-light leading-none">:</span>
          <span className="text-[2.8rem] font-light text-white leading-none">{pad(seconds)}</span>
        </div>

        <button
          onClick={() => endSleep(activeSleep.id)}
          className="mt-1 w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-90"
          style={{
            background: isMor ? "hsl(var(--clay-light))" : "hsl(var(--sage-light))",
            boxShadow: isMor ? "0 0 20px hsl(var(--clay) / 0.3)" : "0 0 20px hsl(var(--sage) / 0.3)",
          }}
        >
          <Square className="w-5 h-5" style={{ color: isMor ? "hsl(var(--bark))" : "hsl(var(--moss))", fill: isMor ? "hsl(var(--bark))" : "hsl(var(--moss))" }} />
        </button>
        <p className="text-[0.6rem] text-white/40 uppercase tracking-wider">{t("liveTracker.stopSleep")}</p>
      </div>
    </div>
  );
}
