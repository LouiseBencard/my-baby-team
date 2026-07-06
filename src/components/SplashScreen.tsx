import { useEffect, useState } from "react";
import meloIcon from "@/assets/melo-app-icon.png";

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1200);
    const doneTimer = setTimeout(() => onDone(), 1700);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{
        background: "linear-gradient(145deg, hsl(var(--cream)), hsl(var(--sage-light)))",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          opacity: fading ? 0.6 : 1,
          transform: fading ? "scale(0.92)" : "scale(1)",
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}
      >
        <img
          src={meloIcon}
          alt="Melo"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "28px",
            boxShadow: "0 8px 40px hsl(var(--moss) / 0.18)",
            mixBlendMode: "multiply",
          }}
        />
      </div>
    </div>
  );
}
