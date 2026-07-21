import { useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { useDiary } from "@/context/DiaryContext";
import { useFamily } from "@/context/FamilyContext";
import { scheduleSleepNotification, cancelSleepNotification } from "@/lib/notifications";

/**
 * Notifies when baby's wake window is closing.
 * Native iOS: scheduled local notification (works with locked screen).
 * Web: browser Notification API (works while the tab is open).
 * Only notifies the parent who is "on duty" (on leave = default on duty,
 * weekends = both parents get notified).
 */
export function useSleepNotifications() {
  const { sleepLogs, activeSleep } = useDiary();
  const { profile, babyAgeWeeks, isOnLeave } = useFamily();
  const notifiedRef = useRef<string | null>(null);
  const childName = profile.children?.[0]?.name || "Baby";
  const lang = (profile.languages?.[profile.role] || "da") as "da" | "en";
  const isNative = Capacitor.isNativePlatform();

  // Request permission on mount (web only — native handled by NotificationScheduler)
  useEffect(() => {
    if (isNative) return;
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, [isNative]);

  useEffect(() => {
    if (activeSleep) {
      // Baby is sleeping — cancel any pending sweetspot notification
      if (isNative) void cancelSleepNotification();
      return;
    }
    if (!isNative && (!("Notification" in window) || Notification.permission !== "granted")) return;

    // Determine if this parent should receive notifications
    const dayOfWeek = new Date().getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const currentRoleOnLeave = isOnLeave(profile.role);

    // On weekdays: only notify if on leave. On weekends: notify both.
    if (!isWeekend && !currentRoleOnLeave) return;

    // Find last sleep end
    const completed = sleepLogs.filter(l => l.endTime);
    if (completed.length === 0) return;

    const sorted = [...completed].sort(
      (a, b) => new Date(b.endTime!).getTime() - new Date(a.endTime!).getTime()
    );
    const lastEnd = new Date(sorted[0].endTime!).getTime();
    const lastSleepId = sorted[0].id;

    // Calculate wake window
    const maxWakeMin =
      babyAgeWeeks < 6 ? 60 :
      babyAgeWeeks < 12 ? 90 :
      babyAgeWeeks < 26 ? 120 : 150;

    const minutesSinceWake = (Date.now() - lastEnd) / 60000;
    const timeLeft = maxWakeMin - minutesSinceWake;

    // ── Native iOS: schedule a local notification at sweetspot-minus-15 ──
    // Fires even if the app is closed or the screen is locked.
    if (isNative) {
      if (timeLeft > 15 && notifiedRef.current !== lastSleepId) {
        notifiedRef.current = lastSleepId;
        const notifyAt = new Date(lastEnd + (maxWakeMin - 15) * 60000);
        void scheduleSleepNotification(notifyAt, childName, lang);
      }
      return;
    }

    // ── Web: browser notification ──
    // Notify ~15 min before sweetspot closes
    if (timeLeft > 0 && timeLeft <= 15 && notifiedRef.current !== lastSleepId) {
      notifiedRef.current = lastSleepId;
      new Notification(`${childName} er snart klar til en lur 💤`, {
        body: `Søvnvinduet lukker om ca. ${Math.round(timeLeft)} minutter. God tid at finde ro.`,
        icon: "/favicon.ico",
        tag: "sleep-sweetspot",
      });
    }

    // Set up a timer to check again
    if (timeLeft > 15) {
      const msUntilNotify = (timeLeft - 15) * 60000;
      const timer = setTimeout(() => {
        if (notifiedRef.current !== lastSleepId) {
          notifiedRef.current = lastSleepId;
          new Notification(`${childName} er snart klar til en lur 💤`, {
            body: `Søvnvinduet lukker om ca. 15 minutter. God tid at finde ro.`,
            icon: "/favicon.ico",
            tag: "sleep-sweetspot",
          });
        }
      }, msUntilNotify);
      return () => clearTimeout(timer);
    }
  }, [sleepLogs, activeSleep, babyAgeWeeks, profile, isOnLeave, childName]);
}
