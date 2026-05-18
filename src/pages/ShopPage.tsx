import { useFamily } from "@/context/FamilyContext";
import { Package, Truck, Bell } from "lucide-react";

const COMING_SOON_ITEMS = [
  { emoji: "🌿", title: "Bleer & pleje", desc: "Automatisk genbestilling baseret på barnets alder og forbrug" },
  { emoji: "🥕", title: "Måltidskasser", desc: "Familieopskrifter klar på 30 min — tilpasset småbørnsfamilier" },
  { emoji: "💊", title: "Vitaminer & amning", desc: "Anbefalet af sundhedsplejerske — leveret til døren" },
  { emoji: "📦", title: "Baby essentials", desc: "Aldrig løb tør for det vigtigste igen" },
];

export default function ShopPage() {
  const { profile } = useFamily();
  const childName = profile.children?.[0]?.name || "baby";

  return (
    <div className="space-y-6 pb-8">
      <div className="section-fade-in">
        <h1 className="font-serif text-[1.9rem] font-normal">Abonnement</h1>
        <p className="label-upper mt-1">LEVERET TIL DØREN — ALDRIG LØBET TØR</p>
      </div>

      {/* Hero */}
      <div
        className="rounded-[20px] p-6 section-fade-in"
        style={{
          background: "linear-gradient(135deg, hsl(var(--moss)), hsl(154 32% 14%))",
          animationDelay: "40ms",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: "rgba(255,255,255,0.15)" }}>
            🚚
          </div>
          <div>
            <p className="text-white font-semibold text-[1.05rem]">Smart genbestilling</p>
            <p className="text-white/70 text-[0.75rem]">Baseret på {childName}s alder og forbrug</p>
          </div>
        </div>
        <p className="text-white/85 text-[0.85rem] leading-relaxed mb-5">
          Melo ved hvornår I løber tør — og bestiller automatisk. Ingen abonnementsfælder, ingen binding. Kun det I har brug for.
        </p>
        <div
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[0.72rem] font-semibold tracking-wide"
          style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
        >
          <Bell className="w-3.5 h-3.5" />
          Kommer snart
        </div>
      </div>

      {/* Features preview */}
      <div className="section-fade-in" style={{ animationDelay: "80ms" }}>
        <p className="label-upper mb-3">HVAD ER PÅ VEJ</p>
        <div className="space-y-2.5">
          {COMING_SOON_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl px-4 py-3.5"
              style={{ background: "hsl(var(--warm-white))", border: "1px solid hsl(var(--stone-light))" }}
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{item.emoji}</span>
              <div>
                <p className="text-[0.88rem] font-semibold">{item.title}</p>
                <p className="text-[0.72rem] text-muted-foreground mt-0.5 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div
        className="rounded-2xl px-4 py-4 flex items-start gap-3 section-fade-in"
        style={{ background: "hsl(var(--sage-light))", animationDelay: "160ms" }}
      >
        <Truck className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(var(--moss))" }} />
        <div>
          <p className="text-[0.82rem] font-semibold" style={{ color: "hsl(var(--moss))" }}>Ingen binding</p>
          <p className="text-[0.72rem] leading-snug mt-0.5" style={{ color: "hsl(var(--moss))" }}>
            Pause, skift eller afmeld når som helst. Vi tror på at I vælger os fordi det virker — ikke fordi I er låst.
          </p>
        </div>
      </div>

      <div
        className="rounded-xl px-4 py-3 section-fade-in flex items-start gap-2.5"
        style={{ background: "hsl(var(--stone-lighter))", animationDelay: "200ms" }}
      >
        <Package className="w-4 h-4 flex-shrink-0 mt-0.5 text-muted-foreground" />
        <p className="text-[0.72rem] text-muted-foreground leading-relaxed">
          Abonnementsfunktionen er under udvikling. Jeres data og præferencer gemmes klar til lancering.
        </p>
      </div>
    </div>
  );
}
