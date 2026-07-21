import { Capacitor } from "@capacitor/core";

/**
 * Melo lokale notifikationer.
 *
 * Principper (fra gtm-marketing-plan.md §4):
 * - Max 3-4 notifikationer om ugen pr. bruger som standard.
 * - Alle notifikationer har reel nytteværdi — ingen skyld, ingen streaks.
 * - Granulær opt-out pr. kategori (styres i Indstillinger).
 *
 * Kategorier:
 * - "weekly": ny uge er klar (søndag 19:00)
 * - "phase":  fase-kritiske reminders (D-vitamin fra 2-ugers alderen,
 *             vaccinationer 3/5/12 mdr — jf. SST, allerede verificeret i
 *             phaseData.ts)
 * - "appreciation": ugentlig påmindelse om at påskønne sin partner
 *             (fredag 20:00)
 *
 * Partner-aktivitet ("Louise skrev i dagbogen") kræver server-side push via
 * APNs (device_tokens-tabellen findes allerede) — det er en separat opgave
 * og ligger IKKE her.
 *
 * Tekster ligger inline med lang-parameter (samme mønster som DEV_STAGES) —
 * de fastfryses på planlægningstidspunktet i brugerens valgte sprog.
 */

export type NotifCategory = "weekly" | "phase" | "appreciation";

const PREFS_KEY = "melo-notif-prefs";
const ASKED_KEY = "melo-notif-asked";

// Faste id-intervaller så vi kan aflyse vores egne uden at røre andres
const IDS = {
  weekly: [1000, 1001, 1002, 1003],
  phase: [2000, 2001, 2002, 2003],
  appreciation: [3000],
  sleep: [4000], // bruges af useSleepNotifications
};

export interface NotifPrefs {
  weekly: boolean;
  phase: boolean;
  appreciation: boolean;
}

const DEFAULT_PREFS: NotifPrefs = { weekly: true, phase: true, appreciation: true };

export function getNotifPrefs(): NotifPrefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? { ...DEFAULT_PREFS, ...JSON.parse(raw) } : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

export function setNotifPref(category: NotifCategory, enabled: boolean): NotifPrefs {
  const prefs = { ...getNotifPrefs(), [category]: enabled };
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
  return prefs;
}

async function getPlugin() {
  if (!Capacitor.isNativePlatform()) return null;
  try {
    const { LocalNotifications } = await import("@capacitor/local-notifications");
    return LocalNotifications;
  } catch {
    return null;
  }
}

/**
 * Beder om tilladelse første gang (og kun én gang automatisk).
 * Returnerer om tilladelsen er givet.
 */
export async function ensureNotifPermission(): Promise<boolean> {
  const plugin = await getPlugin();
  if (!plugin) return false;

  const { display } = await plugin.checkPermissions();
  if (display === "granted") return true;

  const alreadyAsked = localStorage.getItem(ASKED_KEY) === "1";
  if (display === "prompt" && !alreadyAsked) {
    localStorage.setItem(ASKED_KEY, "1");
    const { display: granted } = await plugin.requestPermissions();
    return granted === "granted";
  }
  return false;
}

/** Næste forekomst af en ugedag/klokkeslæt (weekday: 0=søndag ... 6=lørdag) */
function nextOccurrence(weekday: number, hour: number, from = new Date()): Date {
  const d = new Date(from);
  d.setHours(hour, 0, 0, 0);
  let diff = (weekday - d.getDay() + 7) % 7;
  if (diff === 0 && d <= from) diff = 7;
  d.setDate(d.getDate() + diff);
  return d;
}

function weeksBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24 * 7));
}

interface ScheduleOpts {
  /** ISO-dato: fremtid = termin (gravid), fortid = fødselsdato */
  dueOrBirthDate?: string;
  phase: "pregnant" | "newborn" | "baby";
  babyName?: string;
  lang: "da" | "en";
}

/**
 * Aflyser Melos planlagte notifikationer og lægger nye ud fra profil + prefs.
 * Kaldes ved app-start og når prefs/termin ændres. Idempotent.
 */
export async function rescheduleAll(opts: ScheduleOpts): Promise<void> {
  const plugin = await getPlugin();
  if (!plugin) return;

  const { display } = await plugin.checkPermissions();
  if (display !== "granted") return;

  const prefs = getNotifPrefs();
  const en = opts.lang === "en";
  const name = opts.babyName?.trim();

  // Aflys alle vores kategori-id'er (ikke sleep — den styres af sin egen hook)
  const ourIds = [...IDS.weekly, ...IDS.phase, ...IDS.appreciation];
  try {
    const pending = await plugin.getPending();
    const toCancel = pending.notifications.filter(n => ourIds.includes(n.id));
    if (toCancel.length > 0) {
      await plugin.cancel({ notifications: toCancel.map(n => ({ id: n.id })) });
    }
  } catch {
    // ignore
  }

  const toSchedule: Array<{
    id: number;
    title: string;
    body: string;
    schedule: { at: Date };
    extra?: { route?: string };
  }> = [];

  // ── Ugentligt: ny uge er klar (søndag 19:00, næste 4 uger) ──
  if (prefs.weekly && opts.dueOrBirthDate) {
    const anchor = new Date(opts.dueOrBirthDate);
    for (let i = 0; i < 4; i++) {
      const fireAt = nextOccurrence(0, 19);
      fireAt.setDate(fireAt.getDate() + i * 7);

      let title: string;
      let body: string;
      if (opts.phase === "pregnant") {
        // Gestationsuge på affyringstidspunktet: 40 - uger til termin
        const week = Math.min(42, Math.max(4, 40 - weeksBetween(fireAt, anchor)));
        title = en ? `Week ${week} is ready` : `Uge ${week} er klar`;
        body = en
          ? "New week, new content — for both of you."
          : "Ny uge, nyt indhold — til jer begge.";
      } else {
        const week = Math.max(0, weeksBetween(anchor, fireAt));
        title = en
          ? `${name || "Your baby"} — week ${week}`
          : `${name || "Jeres barn"} — uge ${week}`;
        body = en
          ? "This week's development and tips are ready."
          : "Ugens udvikling og tips er klar.";
      }
      toSchedule.push({
        id: IDS.weekly[i],
        title,
        body,
        schedule: { at: fireAt },
        extra: { route: opts.phase === "pregnant" ? "/graviditet/uge" : "/barn" },
      });
    }
  }

  // ── Fase-kritiske reminders (kun efter fødsel) ──
  if (prefs.phase && opts.phase !== "pregnant" && opts.dueOrBirthDate) {
    const birth = new Date(opts.dueOrBirthDate);
    const now = new Date();

    const phaseReminders: Array<{ id: number; at: Date; title: string; body: string }> = [];

    // D-vitamin fra 2-ugers alderen (SST)
    const dVit = new Date(birth);
    dVit.setDate(dVit.getDate() + 14);
    dVit.setHours(9, 0, 0, 0);
    phaseReminders.push({
      id: IDS.phase[0],
      at: dVit,
      title: en ? "Time to start vitamin D" : "Tid til at starte D-vitamin",
      body: en
        ? "From 2 weeks old, babies need daily vitamin D drops (Danish Health Authority)."
        : "Fra 2-ugers alderen anbefales daglige D-vitamin-dråber (Sundhedsstyrelsen).",
    });

    // Vaccinationer 3, 5 og 12 mdr — reminder 5 dage før, kl. 9
    const vaccMonths = [3, 5, 12];
    vaccMonths.forEach((months, idx) => {
      const vacc = new Date(birth);
      vacc.setMonth(vacc.getMonth() + months);
      vacc.setDate(vacc.getDate() - 5);
      vacc.setHours(9, 0, 0, 0);
      phaseReminders.push({
        id: IDS.phase[idx + 1],
        at: vacc,
        title: en
          ? `Vaccination at ${months} months is coming up`
          : `${months}-måneders-vaccination nærmer sig`,
        body: en
          ? "Remember to book an appointment with your GP if you haven't yet."
          : "Husk at bestille tid hos egen læge, hvis I ikke har gjort det endnu.",
      });
    });

    // Kun fremtidige — og max de to nærmeste, så vi ikke støjer
    phaseReminders
      .filter(r => r.at > now)
      .sort((a, b) => a.at.getTime() - b.at.getTime())
      .slice(0, 2)
      .forEach(r =>
        toSchedule.push({
          id: r.id,
          title: r.title,
          body: r.body,
          schedule: { at: r.at },
          extra: { route: "/tjekliste" },
        }),
      );
  }

  // ── Appreciation-digest (fredag 20:00, én ad gangen) ──
  if (prefs.appreciation) {
    toSchedule.push({
      id: IDS.appreciation[0],
      title: en ? "A little moment for you two" : "Et lille øjeblik til jer to",
      body: en
        ? "What did your partner do this week that you appreciated?"
        : "Hvad gjorde din partner i denne uge, som du satte pris på?",
      schedule: { at: nextOccurrence(5, 20) },
      extra: { route: "/sammen" },
    });
  }

  if (toSchedule.length > 0) {
    try {
      await plugin.schedule({ notifications: toSchedule });
    } catch {
      // ignore — notifikationer må aldrig crashe appen
    }
  }
}

/** Planlæg søvn-sweetspot-notifikation (bruges af useSleepNotifications). */
export async function scheduleSleepNotification(at: Date, childName: string, lang: "da" | "en"): Promise<void> {
  const plugin = await getPlugin();
  if (!plugin) return;
  const { display } = await plugin.checkPermissions();
  if (display !== "granted") return;
  const en = lang === "en";
  try {
    await plugin.cancel({ notifications: [{ id: IDS.sleep[0] }] });
    await plugin.schedule({
      notifications: [
        {
          id: IDS.sleep[0],
          title: en ? `${childName} is nearly ready for a nap 💤` : `${childName} er snart klar til en lur 💤`,
          body: en
            ? "The sleep window closes in about 15 minutes. A good time to wind down."
            : "Søvnvinduet lukker om ca. 15 minutter. God tid at finde ro.",
          schedule: { at },
          extra: { route: "/sovn" },
        },
      ],
    });
  } catch {
    // ignore
  }
}

/** Aflys søvn-notifikationen (fx når baby lægges til at sove). */
export async function cancelSleepNotification(): Promise<void> {
  const plugin = await getPlugin();
  if (!plugin) return;
  try {
    await plugin.cancel({ notifications: [{ id: IDS.sleep[0] }] });
  } catch {
    // ignore
  }
}
