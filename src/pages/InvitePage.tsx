import { useState } from "react";
import { useFamily } from "@/context/FamilyContext";
import { Copy, Share2, Check, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InvitePage() {
  const { profile, joinFamilyByCode } = useFamily();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [joinedName, setJoinedName] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const myCode = profile.inviteCode || "";
  const isConnected = !!profile.partnerUserId;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(myCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Melo — forbind os",
        text: `Brug denne kode til at forbinde dig med mig i Melo: ${myCode}`,
      });
    } else {
      handleCopy();
    }
  };

  const handleJoin = async () => {
    if (!code.trim()) return;
    setJoining(true);
    setJoinError(null);
    const result = await joinFamilyByCode(code.trim());
    setJoining(false);
    if (result.success) {
      setJoinedName(result.partnerName || "din partner");
    } else {
      setJoinError(result.error || "Noget gik galt. Prøv igen.");
    }
  };

  return (
    <div className="space-y-5 pb-8">

      {/* Header */}
      <div className="section-fade-in flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-xl transition-all active:scale-90"
          style={{ color: "hsl(var(--moss))" }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif text-[1.9rem] font-normal">Partner</h1>
          <p className="text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground">Forbind jeres telefoner</p>
        </div>
      </div>

      {/* Already connected banner */}
      {isConnected && !joinedName && (
        <div className="rounded-2xl px-5 py-4 section-fade-in"
          style={{ background: "hsl(var(--sage-light) / 0.5)", border: "1px solid hsl(var(--sage) / 0.3)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "hsl(var(--sage))" }}>
              <Check className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[0.88rem] font-semibold">Forbundet med {profile.partnerName}</p>
              <p className="text-[0.7rem] text-muted-foreground">Data synkroniseres ved næste login</p>
            </div>
          </div>
        </div>
      )}

      {/* Success after joining */}
      {joinedName && (
        <div className="rounded-2xl px-5 py-4 section-fade-in"
          style={{ background: "hsl(var(--sage-light) / 0.5)", border: "1px solid hsl(var(--sage) / 0.3)" }}>
          <p className="text-2xl mb-2">🎉</p>
          <p className="text-[0.95rem] font-semibold mb-1">Forbundet med {joinedName}!</p>
          <p className="text-[0.75rem] text-muted-foreground leading-relaxed">
            Jeres opgaver er importeret. Gå til Samarbejde for at se dem.
          </p>
        </div>
      )}

      {/* My invite code */}
      <div className="card-soft section-fade-in" style={{ animationDelay: "40ms" }}>
        <p className="text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground mb-1">Din kode</p>
        <p className="text-[0.75rem] text-muted-foreground mb-3 leading-relaxed">
          Del denne kode med din partner, så de kan forbinde sig til dig
        </p>

        <div className="flex items-center justify-center rounded-2xl px-5 py-4 mb-3"
          style={{ background: "hsl(var(--stone-lighter))" }}>
          <p className="font-mono text-[2rem] font-bold tracking-[0.25em]"
            style={{ color: "hsl(var(--moss))" }}>
            {myCode}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-[0.78rem] font-medium border transition-all active:scale-[0.97]"
            style={{ borderColor: "hsl(var(--moss) / 0.4)", color: "hsl(var(--moss))" }}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Kopieret" : "Kopier"}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-[0.78rem] font-medium text-white transition-all active:scale-[0.97]"
            style={{ background: "hsl(var(--moss))" }}
          >
            <Share2 className="w-3.5 h-3.5" />
            Del kode
          </button>
        </div>
      </div>

      {/* Enter partner code */}
      {!joinedName && (
        <div className="card-soft section-fade-in" style={{ animationDelay: "80ms" }}>
          <p className="text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground mb-1">
            Har du en kode fra din partner?
          </p>
          <p className="text-[0.75rem] text-muted-foreground mb-3 leading-relaxed">
            Indtast deres kode her for at forbinde jer og importere fælles opgaver
          </p>

          <input
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="F.eks. X4KR2P"
            maxLength={8}
            className="w-full rounded-2xl border px-4 py-3.5 text-center font-mono text-[1.3rem] tracking-[0.25em] font-bold focus:outline-none mb-3"
            style={{
              borderColor: "hsl(var(--stone-light))",
              background: "hsl(var(--warm-white))",
              fontSize: "16px",
            }}
          />

          {joinError && (
            <p className="text-[0.72rem] mb-3 text-center" style={{ color: "hsl(var(--clay))" }}>
              {joinError}
            </p>
          )}

          <button
            onClick={handleJoin}
            disabled={!code.trim() || joining}
            className="w-full py-3 rounded-full text-[0.82rem] font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-40"
            style={{ background: "hsl(var(--moss))" }}
          >
            {joining ? "Forbinder..." : "Tilslut jer"}
          </button>
        </div>
      )}

      {/* Info footer */}
      <div className="rounded-2xl px-4 py-3 section-fade-in"
        style={{ animationDelay: "120ms", background: "hsl(var(--stone-lighter))" }}>
        <p className="text-[0.68rem] text-muted-foreground leading-relaxed">
          <span className="font-medium">Hvad deles?</span> Opgaveliste, nattevagter og familieprofil. Chathistorik og Ventil-rum deles aldrig — de er altid private.
        </p>
      </div>

    </div>
  );
}
