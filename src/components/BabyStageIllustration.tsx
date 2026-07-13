import { useState } from "react";

interface Props {
  week: number;
  fruitEmoji: string;
  fruitLabel: string;
  lengthLabel: string;
  weightLabel: string;
  size?: number;
}

function StageSilhouette({ week, s }: { week: number; s: number }) {
  const cream = "#F6F1E7";
  if (week < 8) return (
    <svg width={s} height={s} viewBox="0 0 72 72" aria-hidden="true">
      <path d="M44 22 C52 26 54 38 47 46 C42 52 33 54 27 50 C22 47 21 41 25 38 C28 36 32 37 33 40 C34 43 31 45 29 44" fill="none" stroke={cream} strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="41" cy="26" r="9" fill={cream} />
    </svg>
  );
  if (week < 12) return (
    <svg width={s} height={s} viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="42" cy="28" r="11" fill={cream} />
      <path d="M35 37 C28 40 25 47 28 53 C31 58 38 59 42 55" fill="none" stroke={cream} strokeWidth="7.5" strokeLinecap="round" />
      <path d="M32 50 C29 53 28 56 30 58" fill="none" stroke={cream} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
  if (week < 16) return (
    <svg width={s} height={s} viewBox="0 0 76 76" aria-hidden="true">
      <circle cx="45" cy="27" r="11.5" fill={cream} />
      <path d="M38 37 C29 40 24 48 28 56 C31 62 39 64 44 60" fill="none" stroke={cream} strokeWidth="8.5" strokeLinecap="round" />
      <path d="M33 53 C29 57 28 61 30 64" fill="none" stroke={cream} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M41 44 C37 46 36 49 37 51" fill="none" stroke={cream} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
  if (week < 20) return (
    <svg width={s} height={s} viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="47" cy="27" r="12" fill={cream} />
      <path d="M40 37 C30 40 25 49 29 57 C32 63 40 65 45 61" fill="none" stroke={cream} strokeWidth="9" strokeLinecap="round" />
      <path d="M33 55 C29 59 28 63 30 66" fill="none" stroke={cream} strokeWidth="5" strokeLinecap="round" />
      <path d="M42 44 C38 46 36 49 37 52" fill="none" stroke={cream} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
  if (week < 24) return (
    <svg width={s} height={s} viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="46" cy="26" r="12.5" fill={cream} />
      <path d="M39 37 C28 41 23 51 28 59 C32 65 41 66 46 61" fill="none" stroke={cream} strokeWidth="9.5" strokeLinecap="round" />
      <path d="M32 56 C27 60 26 65 29 68" fill="none" stroke={cream} strokeWidth="5" strokeLinecap="round" />
      <path d="M43 45 C38 47 36 51 38 54" fill="none" stroke={cream} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M52 34 C56 37 57 41 55 44" fill="none" stroke={cream} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
  if (week < 28) return (
    <svg width={s} height={s} viewBox="0 0 84 84" aria-hidden="true">
      <circle cx="49" cy="28" r="13" fill={cream} />
      <path d="M41 39 C30 43 25 54 30 62 C34 68 44 69 49 63" fill="none" stroke={cream} strokeWidth="10.5" strokeLinecap="round" />
      <path d="M34 59 C29 63 28 68 31 71" fill="none" stroke={cream} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M45 47 C40 49 38 53 40 56" fill="none" stroke={cream} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M55 37 C59 40 60 44 58 47" fill="none" stroke={cream} strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
  if (week < 32) return (
    <svg width={s} height={s} viewBox="0 0 84 84" aria-hidden="true">
      <circle cx="34" cy="46" r="13" fill={cream} />
      <path d="M43 38 C51 32 56 25 52 18 C49 12 41 11 36 15 C32 18 32 23 35 26" fill="none" stroke={cream} strokeWidth="10.5" strokeLinecap="round" />
      <path d="M49 24 C54 26 56 30 55 34" fill="none" stroke={cream} strokeWidth="5" strokeLinecap="round" />
      <path d="M40 19 C37 17 34 17 32 19" fill="none" stroke={cream} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
  if (week < 36) return (
    <svg width={s} height={s} viewBox="0 0 84 84" aria-hidden="true">
      <circle cx="36" cy="55" r="13" fill={cream} />
      <path d="M44 45 C52 38 56 30 52 23 C49 17 41 15 35 19 C31 22 30 27 33 30" fill="none" stroke={cream} strokeWidth="11" strokeLinecap="round" />
      <path d="M50 30 C55 32 58 36 57 41" fill="none" stroke={cream} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M42 24 C39 21 35 20 32 22" fill="none" stroke={cream} strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width={s} height={s} viewBox="0 0 88 88" aria-hidden="true">
      <circle cx="37" cy="59" r="14" fill={cream} />
      <path d="M46 48 C55 41 59 32 55 24 C51 17 42 15 36 19 C31 23 30 29 34 32" fill="none" stroke={cream} strokeWidth="12.5" strokeLinecap="round" />
      <path d="M53 31 C59 33 62 38 61 44" fill="none" stroke={cream} strokeWidth="6" strokeLinecap="round" />
      <path d="M44 25 C41 22 36 21 33 23" fill="none" stroke={cream} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function BabyStageIllustration({ week, fruitEmoji, fruitLabel, lengthLabel, weightLabel, size = 116 }: Props) {
  const [showSize, setShowSize] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setShowSize(v => !v)}
      className="relative flex-shrink-0 transition-transform active:scale-95"
      style={{ width: size, height: size }}
      aria-label={showSize ? "Vis illustration af barnet" : `Vis størrelse: på størrelse med ${fruitLabel}`}
    >
      <style>{`
        @keyframes meloBabyFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes meloBabyPulse { 0% { transform: scale(1); opacity: .3; } 70% { transform: scale(1.25); opacity: 0; } 100% { transform: scale(1.25); opacity: 0; } }
      `}</style>

      <span className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.10)", animation: "meloBabyPulse 2.6s ease-out infinite" }} aria-hidden="true" />
      <span className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} aria-hidden="true" />

      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-300"
        style={{ opacity: showSize ? 0 : 1, transform: showSize ? "scale(0.85)" : "scale(1)", animation: showSize ? "none" : "meloBabyFloat 4.5s ease-in-out infinite" }}
      >
        <StageSilhouette week={week} s={Math.round(size * 0.66)} />
      </span>

      <span
        className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300"
        style={{ opacity: showSize ? 1 : 0, transform: showSize ? "scale(1)" : "scale(0.85)" }}
        aria-hidden={!showSize}
      >
        <span style={{ fontSize: Math.round(size * 0.3), lineHeight: 1 }}>{fruitEmoji}</span>
        <span className="text-white/85 font-medium" style={{ fontSize: 10.5, marginTop: 4 }}>{lengthLabel}</span>
        <span className="text-white/60" style={{ fontSize: 10 }}>{weightLabel}</span>
      </span>
    </button>
  );
}