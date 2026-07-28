import { useState } from "react";
import { Ruler, Weight, Plus, X, TrendingUp } from "lucide-react";

export interface Measurement {
  id: string;
  date: string;
  weight?: number; // grams
  length?: number; // cm
  head?: number; // cm
}

function genId() { return Math.random().toString(36).slice(2, 10); }

function useMeasurements() {
  const [measurements, setMeasurements] = useState<Measurement[]>(() => {
    try { const s = localStorage.getItem("lille-measurements"); return s ? JSON.parse(s) : []; } catch { return []; }
  });

  const save = (ms: Measurement[]) => {
    setMeasurements(ms);
    localStorage.setItem("lille-measurements", JSON.stringify(ms));
  };

  const add = (m: Omit<Measurement, "id">) => {
    save([{ ...m, id: genId() }, ...measurements]);
  };

  const remove = (id: string) => save(measurements.filter(m => m.id !== id));

  return { measurements, add, remove };
}

function suggestDiaperSize(weightG: number): string {
  if (weightG < 3000) return "Prematur / str. 0";
  if (weightG < 5000) return "Str. 1 (2-5 kg)";
  if (weightG < 8000) return "Str. 2 (3-6 kg) eller 3 (4-9 kg)";
  if (weightG < 11000) return "Str. 3 (4-9 kg) eller 4 (7-18 kg)";
  return "Str. 4+ (9-20 kg)";
}

interface Props {
  childName: string;
  ageWeeks: number;
}

export default function BabyMeasurements({ childName, ageWeeks }: Props) {
  const { measurements, add, remove } = useMeasurements();
  const [showForm, setShowForm] = useState(false);
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [head, setHead] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const latest = measurements[0];
  const diaperSuggestion = latest?.weight ? suggestDiaperSize(latest.weight) : null;

  const handleAdd = () => {
    if (!weight && !length && !head) return;
    add({
      date,
      weight: weight ? parseFloat(weight) * 1000 : undefined,
      length: length ? parseFloat(length) : undefined,
      head: head ? parseFloat(head) : undefined,
    });
    setWeight(""); setLength(""); setHead("");
    setShowForm(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ruler className="w-4 h-4" style={{ color: "hsl(var(--clay))" }} />
          <p className="text-[1rem] font-semibold">Mål & vægt</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[0.68rem] font-medium border transition-all active:scale-95"
          style={{ borderColor: "hsl(var(--stone-light))", color: "hsl(var(--bark))" }}
        >
          {showForm ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          {showForm ? "Luk" : "Tilføj måling"}
        </button>
      </div>

      {/* Latest measurement */}
      {latest && (
        <div className="card-soft !p-4">
          <p className="text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground mb-2">SENESTE MÅLING · {new Date(latest.date).toLocaleDateString("da-DK", { day: "numeric", month: "short" })}</p>
          <div className="grid grid-cols-3 gap-3">
            {latest.weight && (
              <div className="text-center">
                <p className="text-[1.1rem] font-semibold" style={{ color: "hsl(var(--moss))" }}>{(latest.weight / 1000).toFixed(1)}</p>
                <p className="text-[0.55rem] tracking-[0.12em] uppercase text-muted-foreground">KG</p>
              </div>
            )}
            {latest.length && (
              <div className="text-center">
                <p className="text-[1.1rem] font-semibold" style={{ color: "hsl(var(--moss))" }}>{latest.length}</p>
                <p className="text-[0.55rem] tracking-[0.12em] uppercase text-muted-foreground">CM</p>
              </div>
            )}
            {latest.head && (
              <div className="text-center">
                <p className="text-[1.1rem] font-semibold" style={{ color: "hsl(var(--moss))" }}>{latest.head}</p>
                <p className="text-[0.55rem] tracking-[0.12em] uppercase text-muted-foreground">HOVED CM</p>
              </div>
            )}
          </div>
          {diaperSuggestion && (
            <div className="mt-3 rounded-xl px-3 py-2" style={{ background: "hsl(var(--sage-light))" }}>
              <p className="text-[0.72rem]">🧷 Forslag til ble: <span className="font-medium">{diaperSuggestion}</span></p>
            </div>
          )}
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="card-soft space-y-3 animate-fade-in">
          <p className="text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground">NY MÅLING</p>
          <div>
            <label className="text-[0.56rem] tracking-[0.14em] uppercase text-muted-foreground mb-0.5 block">Dato</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full rounded-xl border border-[hsl(var(--stone-light))] bg-background px-3 py-2 text-[0.82rem] focus:outline-none focus:border-[hsl(var(--sage))]" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[0.56rem] tracking-[0.14em] uppercase text-muted-foreground mb-0.5 block">Vægt (kg)</label>
              <input type="number" step="0.1" value={weight} onChange={e => setWeight(e.target.value)}
                placeholder="3.5"
                className="w-full rounded-xl border border-[hsl(var(--stone-light))] bg-background px-3 py-2 text-[0.82rem] focus:outline-none focus:border-[hsl(var(--sage))]" />
            </div>
            <div>
              <label className="text-[0.56rem] tracking-[0.14em] uppercase text-muted-foreground mb-0.5 block">Længde (cm)</label>
              <input type="number" step="0.5" value={length} onChange={e => setLength(e.target.value)}
                placeholder="52"
                className="w-full rounded-xl border border-[hsl(var(--stone-light))] bg-background px-3 py-2 text-[0.82rem] focus:outline-none focus:border-[hsl(var(--sage))]" />
            </div>
            <div>
              <label className="text-[0.56rem] tracking-[0.14em] uppercase text-muted-foreground mb-0.5 block">Hoved (cm)</label>
              <input type="number" step="0.5" value={head} onChange={e => setHead(e.target.value)}
                placeholder="35"
                className="w-full rounded-xl border border-[hsl(var(--stone-light))] bg-background px-3 py-2 text-[0.82rem] focus:outline-none focus:border-[hsl(var(--sage))]" />
            </div>
          </div>
          <button onClick={handleAdd} className="btn-moss w-full" disabled={!weight && !length && !head}>
            Gem måling
          </button>
        </div>
      )}

      {/* History */}
      {measurements.length > 1 && (
        <div className="space-y-1.5">
          <p className="text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground">HISTORIK</p>
          {measurements.slice(1, 6).map(m => (
            <div key={m.id} className="flex items-center justify-between px-3 py-2 rounded-xl"
              style={{ background: "hsl(var(--cream))" }}>
              <span className="text-[0.72rem] text-muted-foreground">
                {new Date(m.date).toLocaleDateString("da-DK", { day: "numeric", month: "short" })}
              </span>
              <div className="flex gap-3 text-[0.72rem]">
                {m.weight && <span>{(m.weight / 1000).toFixed(1)} kg</span>}
                {m.length && <span>{m.length} cm</span>}
                {m.head && <span>H: {m.head}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Growth indicator — ærlig: fejrer ikke ukritisk, flagger manglende vægtøgning */}
      {measurements.length >= 2 && measurements[0].weight && measurements[1].weight && (() => {
        const deltaKg = (measurements[0].weight! - measurements[1].weight!) / 1000;
        const gained = deltaKg > 0;
        return (
          <div className="rounded-xl px-3 py-2 flex items-center gap-2"
            style={{ background: gained ? "hsl(var(--sage-light))" : "hsl(38 58% 91%)" }}>
            <TrendingUp className="w-3.5 h-3.5" style={{ color: gained ? "hsl(var(--moss))" : "hsl(32 45% 40%)" }} />
            <p className="text-[0.72rem]">
              {gained
                ? `+${deltaKg.toFixed(1)} kg siden sidste måling`
                : "Vægten er ikke steget siden sidst. Det kan være helt normalt — men vend det med din sundhedsplejerske for en trygheds skyld."}
            </p>
          </div>
        );
      })()}
    </div>
  );
}
