import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Trash2, ExternalLink, Heart, ShoppingCart, Share2, Check } from "lucide-react";
import { useWishlist, type WishlistItem } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

function babysamUrl(title: string) {
  return `https://www.babysam.dk/search?query=${encodeURIComponent(title)}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("da-DK", { day: "numeric", month: "short" });
}

function AddItemSheet({ onClose, onAdd }: { onClose: () => void; onAdd: (item: { title: string; url?: string; note?: string; emoji?: string }) => void }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), url: url.trim() || undefined, note: note.trim() || undefined });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
      <div className="w-full max-w-lg rounded-t-3xl px-5 pt-5 pb-10 space-y-4" style={{ background: "hsl(var(--warm-white))" }}>
        <div className="w-10 h-1 rounded-full mx-auto mb-2" style={{ background: "hsl(var(--stone-light))" }} />
        <h2 className="font-serif text-[1.3rem]">Tilføj produkt</h2>

        <div className="space-y-3">
          <div>
            <label className="text-[0.68rem] tracking-[0.12em] uppercase text-muted-foreground block mb-1">Produktnavn *</label>
            <input
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="fx Barneseng, Bæresele..."
              className="w-full rounded-xl border px-3 py-2.5 text-[0.88rem] focus:outline-none"
              style={{ borderColor: "hsl(var(--stone-light))", fontSize: "16px", background: "white" }}
            />
          </div>

          <div>
            <label className="text-[0.68rem] tracking-[0.12em] uppercase text-muted-foreground block mb-1">Link (valgfri)</label>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://..."
              type="url"
              className="w-full rounded-xl border px-3 py-2.5 text-[0.88rem] focus:outline-none"
              style={{ borderColor: "hsl(var(--stone-light))", fontSize: "16px", background: "white" }}
            />
          </div>

          <div>
            <label className="text-[0.68rem] tracking-[0.12em] uppercase text-muted-foreground block mb-1">Note (valgfri)</label>
            <input
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="fx str. 56, farve, model..."
              className="w-full rounded-xl border px-3 py-2.5 text-[0.88rem] focus:outline-none"
              style={{ borderColor: "hsl(var(--stone-light))", fontSize: "16px", background: "white" }}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full text-[0.85rem] text-muted-foreground border transition-all active:scale-[0.98]"
            style={{ borderColor: "hsl(var(--stone-light))" }}
          >
            Annuller
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1 py-3 rounded-full text-[0.85rem] font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-40"
            style={{ background: "hsl(var(--moss))" }}
          >
            Tilføj
          </button>
        </div>
      </div>
    </div>
  );
}

function WishCard({ item, onRemove, onToggleReserve }: { item: WishlistItem; onRemove: () => void; onToggleReserve: () => void }) {
  const isReserved = !!item.reservedBy;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "hsl(var(--warm-white))",
        border: `1.5px solid ${isReserved ? "hsl(var(--sage))" : "hsl(var(--stone-light))"}`,
      }}
    >
      <div className="px-4 py-3.5 flex items-start gap-3">
        {item.emoji && (
          <span className="text-2xl flex-shrink-0 mt-0.5">{item.emoji}</span>
        )}
        <div className="flex-1 min-w-0">
          <p className={cn("text-[0.88rem] font-medium leading-snug", isReserved && "line-through text-muted-foreground")}>
            {item.title}
          </p>
          {item.note && (
            <p className="text-[0.72rem] text-muted-foreground mt-0.5">{item.note}</p>
          )}
          <p className="text-[0.6rem] text-muted-foreground/60 mt-1">Tilføjet {formatDate(item.addedAt)}</p>
        </div>
        <button
          onClick={onRemove}
          className="text-muted-foreground/30 hover:text-muted-foreground transition-colors flex-shrink-0 mt-0.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div
        className="px-4 py-2.5 flex items-center gap-2 border-t"
        style={{ borderColor: "hsl(var(--stone-lighter))", background: "hsl(var(--stone-lighter))" }}
      >
        {/* Link button */}
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.68rem] font-medium transition-all active:scale-95"
            style={{ background: "hsl(var(--moss))", color: "white" }}
          >
            <ExternalLink className="w-3 h-3" />
            Se produkt
          </a>
        ) : (
          <a
            href={babysamUrl(item.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.68rem] font-medium transition-all active:scale-95"
            style={{ background: "hsl(var(--stone-light))", color: "hsl(var(--bark))" }}
          >
            <ShoppingCart className="w-3 h-3" />
            Søg på babysam
          </a>
        )}

        {/* Reserve toggle */}
        <button
          onClick={onToggleReserve}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.68rem] font-medium transition-all active:scale-95"
          style={{
            background: isReserved ? "hsl(var(--sage-light))" : "hsl(var(--stone-light))",
            color: isReserved ? "hsl(var(--moss))" : "hsl(var(--muted-foreground))",
          }}
        >
          {isReserved ? <Check className="w-3 h-3" /> : null}
          {isReserved ? "Koebt" : "Marker kobt"}
        </button>
      </div>
    </div>
  );
}

export default function ØnskelistePage() {
  const navigate = useNavigate();
  const { items, addItem, removeItem, toggleReserve } = useWishlist();
  const [showAdd, setShowAdd] = useState(false);

  const activeItems = items.filter(i => !i.reservedBy);
  const reservedItems = items.filter(i => i.reservedBy);

  const handleShare = async () => {
    const text = items
      .filter(i => !i.reservedBy)
      .map(i => `${i.emoji ? i.emoji + " " : ""}${i.title}${i.url ? " — " + i.url : ""}`)
      .join("\n");

    if (navigator.share) {
      await navigator.share({ title: "Vores ønskeliste", text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="space-y-5 pb-10 section-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-muted-foreground text-[0.78rem] active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
          Tilbage
        </button>
        <button
          onClick={handleShare}
          className="ml-auto flex items-center gap-1.5 text-[0.72rem] text-muted-foreground active:scale-95 transition-transform"
        >
          <Share2 className="w-3.5 h-3.5" />
          Del liste
        </button>
      </div>

      <div>
        <h1 className="font-serif text-[1.9rem] font-normal">Ønskeliste</h1>
        <p className="text-[0.72rem] tracking-[0.12em] uppercase text-muted-foreground mt-1">
          {items.length} {items.length === 1 ? "ønske" : "ønsker"} · {reservedItems.length} købt
        </p>
      </div>

      {/* Add button */}
      <button
        onClick={() => setShowAdd(true)}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[0.85rem] font-medium transition-all active:scale-[0.98] border-2 border-dashed"
        style={{ borderColor: "hsl(var(--stone-light))", color: "hsl(var(--bark))" }}
      >
        <Plus className="w-4 h-4" />
        Tilføj produkt
      </button>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="text-center py-14 space-y-3">
          <Heart className="w-10 h-10 mx-auto text-muted-foreground/30" />
          <p className="text-[0.85rem] text-muted-foreground">Din ønskeliste er tom</p>
          <p className="text-[0.72rem] text-muted-foreground/60 leading-relaxed max-w-[220px] mx-auto">
            Tilføj produkter herfra eller via hjertet på tjeklisten
          </p>
        </div>
      )}

      {/* Active items */}
      {activeItems.length > 0 && (
        <div className="space-y-3">
          {activeItems.map(item => (
            <WishCard
              key={item.id}
              item={item}
              onRemove={() => removeItem(item.id)}
              onToggleReserve={() => toggleReserve(item.id)}
            />
          ))}
        </div>
      )}

      {/* Reserved items */}
      {reservedItems.length > 0 && (
        <div className="space-y-2">
          <p className="text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground">Koebt ({reservedItems.length})</p>
          <div className="space-y-2 opacity-60">
            {reservedItems.map(item => (
              <WishCard
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onToggleReserve={() => toggleReserve(item.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      {items.length > 0 && (
        <div className="rounded-xl px-4 py-3" style={{ background: "hsl(var(--stone-lighter))" }}>
          <p className="text-[0.68rem] text-muted-foreground leading-relaxed">
            Del listen med familie og venner via knappen ovenfor. "Markér købt" hjælper jer med at holde styr på hvad der allerede er købt.
          </p>
        </div>
      )}

      {/* Add item sheet */}
      {showAdd && (
        <AddItemSheet
          onClose={() => setShowAdd(false)}
          onAdd={({ title, url, note }) => addItem({ title, url, note })}
        />
      )}
    </div>
  );
}
