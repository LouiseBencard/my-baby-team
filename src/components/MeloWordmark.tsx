import meloMark from "@/assets/melo-mark.png";

interface MeloWordmarkProps {
  size?: string;
  color?: string;
}

export function MeloWordmark({ size = "1.8rem" }: MeloWordmarkProps) {
  const px = parseFloat(size) * 16;
  const markHeight = Math.round(px * 0.92);

  return (
    <div className="flex items-center gap-2 select-none" aria-label="Melo">
      <img
        src={meloMark}
        alt=""
        aria-hidden="true"
        style={{ height: markHeight, width: "auto", display: "block" }}
        draggable={false}
      />
      <span
        className="font-serif lowercase"
        style={{
          fontSize: size,
          color: "hsl(var(--moss))",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          marginTop: "0.08em",
        }}
      >
        melo
      </span>
    </div>
  );
}

export function MeloIcon({ size = 28, color = "hsl(var(--moss))" }: { size?: number; color?: string }) {
  return (
    <img
      src={meloMark}
      alt=""
      aria-hidden="true"
      style={{ width: size, height: "auto" }}
      draggable={false}
    />
  );
}