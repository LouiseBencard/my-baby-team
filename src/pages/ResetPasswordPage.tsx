import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { MeloWordmark } from "@/components/MeloWordmark";
import { useTranslation } from "react-i18next";

export default function ResetPasswordPage() {
  const { updatePassword, clearRecoveryMode } = useAuth();
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError(t("auth.passwordMin"));
      return;
    }
    if (password !== confirm) {
      setError(t("auth.passwordMismatch"));
      return;
    }

    setLoading(true);
    const { error } = await updatePassword(password);
    setLoading(false);
    if (error) setError(error);
    else setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center space-y-6">
          <div className="flex flex-col items-center mb-8">
            <MeloWordmark size="2.6rem" />
          </div>
          <div className="rounded-2xl p-6" style={{ background: "hsl(var(--sage-light))" }}>
            <p className="text-[1.1rem] font-semibold">✅ {t("auth.passwordUpdated")}</p>
          </div>
          <button
            onClick={clearRecoveryMode}
            className={cn(
              "w-full h-12 rounded-full font-semibold text-[0.74rem] tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98]",
              "bg-[hsl(var(--moss))] text-white hover:bg-[hsl(var(--sage-dark))]"
            )}
          >
            {t("auth.toApp")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10 section-fade-in">
          <MeloWordmark size="2.6rem" />
        </div>

        <div className="mb-8 text-center section-fade-in">
          <p className="text-[1.05rem] font-semibold">{t("auth.newPasswordTitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 section-fade-in">
          <div className="space-y-1.5">
            <label className="text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground">{t("auth.newPassword")}</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("auth.passwordMin")}
                required
                minLength={6}
                className="w-full rounded-xl border-[1.5px] border-[hsl(var(--stone-light))] bg-background pl-10 pr-11 py-3 text-[0.88rem] focus:outline-none focus:border-[hsl(var(--moss))] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground">{t("auth.confirmPassword")}</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder={t("auth.confirmPassword")}
                required
                minLength={6}
                className="w-full rounded-xl border-[1.5px] border-[hsl(var(--stone-light))] bg-background pl-10 pr-4 py-3 text-[0.88rem] focus:outline-none focus:border-[hsl(var(--moss))] transition-colors"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl px-4 py-3 text-[0.78rem]" style={{ background: "hsl(0 70% 95%)", color: "hsl(0 60% 40%)" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full h-12 rounded-full font-semibold text-[0.74rem] tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98]",
              "bg-[hsl(var(--moss))] text-white hover:bg-[hsl(var(--sage-dark))]",
              loading && "opacity-70 cursor-not-allowed"
            )}
          >
            {loading ? t("auth.loading") : t("auth.savePassword")}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
