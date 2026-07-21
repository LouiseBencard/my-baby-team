import { useFamily } from "@/context/FamilyContext";
import { NotificationBell } from "@/components/NotificationCenter";
import { WhatMattersNow } from "@/components/WhatMattersNow";
import { QuickLog } from "@/components/QuickLog";
import { TaskList } from "@/components/TaskList";
import { AppreciationCard } from "@/components/AppreciationCard";
import { NattenKort } from "@/components/NattenKort";
import { BabyDevCard } from "@/components/BabyDevCard";
import { VidsteDuCard } from "@/components/VidsteDuCard";
import { DagensSpørgsmål } from "@/components/DagensSpørgsmål";
import { NotificationPrompt } from "@/components/NotificationPrompt";
import { User, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import headerImg from "@/assets/header-far-baby.webp";

export default function DashboardBabyFar() {
  const { profile, morName, farName, babyAgeWeeks, childName } = useFamily();
  const { t } = useTranslation();

  const getGreeting = (): string => {
    const h = new Date().getHours();
    if (h < 10) return t("greeting.morning");
    if (h < 17) return t("greeting.afternoon");
    return t("greeting.evening");
  };

  return (
    <div className="pb-6">
      <div className="relative overflow-hidden" style={{ height: 240, marginBottom: 16 }}>
        <img src={headerImg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(251,248,242,0) 20%, rgba(251,248,242,0.55) 62%, rgba(251,248,242,1) 100%)" }} />
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-4">
          <img src="/melo-wordmark.png" alt="melo" style={{ height: 22 }} />
          <div className="flex items-center gap-2.5">
            <NotificationBell />
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[0.72rem] font-semibold" style={{ background: "rgba(251,248,242,0.88)", color: "hsl(var(--sage-dark))" }}>
              {profile.parentName?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <h1 className="font-serif text-[1.75rem] leading-tight" style={{ color: "hsl(var(--bark))" }}>
            {getGreeting()}, {farName || profile.parentName}
          </h1>
          <p className="text-[0.82rem] mt-0.5" style={{ color: "hsl(var(--stone))" }}>
            {childName || "Baby"} er {babyAgeWeeks} {babyAgeWeeks === 1 ? "uge" : "uger"} gammel
          </p>
        </div>
      </div>

      <div className="px-4 space-y-4">
        <WhatMattersNow />
        <NattenKort />
        <QuickLog />
        <AppreciationCard />
        <TaskList />
        <BabyDevCard />
        <VidsteDuCard ageWeeks={babyAgeWeeks} morName={morName} />
        <DagensSpørgsmål />
        <Link to="/chat" className="flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all active:scale-[0.98]" style={{ background: "hsl(var(--sage-light))", border: "1px solid hsl(var(--sage) / 0.3)" }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--moss))" }}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[0.88rem] font-semibold" style={{ color: "hsl(var(--moss))" }}>Spørg Melo</p>
            <p className="text-[0.72rem]" style={{ color: "hsl(var(--sage-dark))" }}>Fx om din rolle, søvn eller hvad {childName || "Baby"} har brug for</p>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--moss))" }}>
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </Link>
        <NotificationPrompt childName={childName || "Baby"} />
      </div>
    </div>
  );
}
