import { Capacitor } from "@capacitor/core";
import { supabase } from "@/integrations/supabase/client";

/**
 * Melo first-party analytics.
 *
 * Designprincipper (matcher privatlivsløftet):
 * - Ingen tredjeparts-SDK'er. Events lander i vores egen Supabase (EU).
 * - Ingen PII i events: aldrig navne, e-mails, fritekst eller sundhedsdata.
 *   Kun eventnavne og små strukturelle props (fase, rolle, step-navn).
 * - Opt-out respekteres altid (localStorage-flag, styres fra Indstillinger).
 * - Fire-and-forget: analytics må ALDRIG blokere eller crashe UI.
 *
 * RLS: tabellen er insert-only for klienter — ingen kan læse events fra
 * appen. Læsning sker kun via Supabase Dashboard/service role.
 */

const OPTOUT_KEY = "melo-analytics-optout";
const DEVICE_KEY = "melo-device-id";

function uuid(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

function getDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = uuid();
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

// Ét sessions-id pr. app-load — gør funnels og session-længde mulige
const sessionId = uuid();

export function isAnalyticsEnabled(): boolean {
  try {
    return localStorage.getItem(OPTOUT_KEY) !== "1";
  } catch {
    return true;
  }
}

export function setAnalyticsEnabled(enabled: boolean): void {
  try {
    if (enabled) localStorage.removeItem(OPTOUT_KEY);
    else localStorage.setItem(OPTOUT_KEY, "1");
  } catch {
    // ignore
  }
}

type Props = Record<string, string | number | boolean | null>;

/** Send et event. Fejler stille — analytics må aldrig påvirke brugeren. */
export function track(event: string, props: Props = {}): void {
  if (!isAnalyticsEnabled()) return;

  // Fire-and-forget — bevidst ingen await hos kalderen
  void (async () => {
    try {
      const { data } = await supabase.auth.getSession();
      await supabase.from("analytics_events").insert({
        event,
        props,
        device_id: getDeviceId(),
        session_id: sessionId,
        user_id: data.session?.user?.id ?? null,
        platform: Capacitor.getPlatform(), // "ios" | "web"
      });
    } catch {
      // Netværk nede eller tabel mangler — ignorér altid
    }
  })();
}

/** Sidevisning — kaldes af PageViewTracker ved rute-skift. */
export function trackPageView(path: string): void {
  track("page_view", { path });
}
