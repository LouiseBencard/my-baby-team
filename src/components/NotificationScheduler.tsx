import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { useFamily } from "@/context/FamilyContext";
import { ensureNotifPermission, rescheduleAll } from "@/lib/notifications";

/**
 * Holder lokale notifikationer i sync med profilen og navigerer ved
 * notifikations-tap. Kører ved app-start og når termin/fase/sprog ændres.
 * Renderer intet.
 */
export function NotificationScheduler() {
  const { profile } = useFamily();
  const navigate = useNavigate();
  const lang = profile.languages?.[profile.role] || "da";
  const babyName = profile.children?.[0]?.name;

  // Tap på en notifikation → naviger til dens route.
  // "push-navigate" dispatches af usePushNotifications (APNs);
  // lokale notifikationer registrerer deres egen listener her.
  useEffect(() => {
    const onPushNavigate = (e: Event) => {
      const route = (e as CustomEvent).detail?.route as string | undefined;
      if (route) navigate(route);
    };
    window.addEventListener("push-navigate", onPushNavigate);

    let remove: (() => void) | undefined;
    if (Capacitor.isNativePlatform()) {
      void (async () => {
        try {
          const { LocalNotifications } = await import("@capacitor/local-notifications");
          const listener = await LocalNotifications.addListener(
            "localNotificationActionPerformed",
            action => {
              const route = action.notification.extra?.route as string | undefined;
              if (route) navigate(route);
            },
          );
          remove = () => listener.remove();
        } catch {
          // plugin ikke tilgængelig — ignorér
        }
      })();
    }

    return () => {
      window.removeEventListener("push-navigate", onPushNavigate);
      remove?.();
    };
  }, [navigate]);

  useEffect(() => {
    if (!profile.onboarded) return;
    void (async () => {
      const granted = await ensureNotifPermission();
      if (!granted) return;
      await rescheduleAll({
        dueOrBirthDate: profile.dueOrBirthDate,
        phase: profile.phase,
        babyName,
        lang,
      });
    })();
  }, [profile.onboarded, profile.dueOrBirthDate, profile.phase, babyName, lang]);

  return null;
}
