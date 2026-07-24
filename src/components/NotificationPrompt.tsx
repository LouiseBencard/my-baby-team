import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { ensureNotifPermission } from "@/lib/notifications";
import { track } from "@/lib/analytics";

const DISMISS_KEY = "melo-notif-prompt-dismissed";

/**
 * Blidt kort der tilbyder at slå notifikationer til.
 * Vises kun på native iOS, hvis tilladelse ikke allerede er givet/afvist,
 * og hvis brugeren ikke selv har lukket kortet. Ingen pres, nem at afvise.
 */
export function NotificationPrompt({ childName }: { childName: string }) {
  const [visible, setVisible] = useState(false);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    if (localStorage.getItem(DISMISS_KEY) === "1") return;
    void (async () => {
      try {
        const { LocalNotifications } = await import("@capacitor/local-notifications");
        const { display } = await LocalNotifications.checkPermissions();
        if (display === "granted") return; // allerede slået til — vis intet
        setVisible(true);
      } catch {
        // plugin ikke tilgængeligt — vis intet
      }
    })();
  }, []);

  const enable = async () => {
    const ok = await ensureNotifPermission();
    track("notif_prompt", { result: ok ? "granted" : "denied" });
    if (ok) {
      setGranted(true);
      setTimeout(() => setVisible(false), 1800);
    } else {
      setVisible(false);
    }
  };

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    track("notif_prompt", { result: "dismissed" });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="card-soft section-fade-in"
      style={{ background: "hsl(var(--sage-light) / 0.5)", border: "1px solid hsl(var(--sage) / 0.3)" }}
    >
      {granted ? (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--sage))" }}>
            <Check className="w-4 h-4 text-white" />
          </div>
          <p className="text-[0.88rem] font-semibold">Notifikationer er slået til</p>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--sage))" }}>
              <Bell className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[0.9rem] font-semibold mb-0.5">Vil du have en blid påmindelse?</p>
              <p className="text-[0.72rem] text-muted-foreground leading-relaxed">
                Vi kan minde dig om {childName}s søvnvinduer og vigtige milepæle. Højst et par gange om ugen — aldrig med dårlig samvittighed.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={enable}
              className="flex-1 py-2.5 rounded-full text-[0.8rem] font-semibold text-white transition-all active:scale-[0.98]"
              style={{ background: "hsl(var(--moss))" }}
            >
              Slå til
            </button>
            <button
              onClick={dismiss}
              className="px-4 py-2.5 rounded-full text-[0.8rem] font-medium text-muted-foreground transition-all active:scale-[0.98]"
            >
              Ikke nu
            </button>
          </div>
        </>
      )}
    </div>
  );
}
