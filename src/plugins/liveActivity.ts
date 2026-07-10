import { Capacitor, registerPlugin } from "@capacitor/core";

interface StartSleepActivityOptions {
  childName: string;
  startTime: number;
  sleepType: "nap" | "night";
}

interface LiveActivityPlugin {
  startSleepActivity(options: StartSleepActivityOptions): Promise<void>;
  endSleepActivity(): Promise<void>;
}

const LiveActivity = registerPlugin<LiveActivityPlugin>("LiveActivity");

export async function startSleepActivity(options: StartSleepActivityOptions): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await LiveActivity.startSleepActivity(options);
  } catch {
    // Live Activities er nice-to-have (kræver iOS 16.2+)
  }
}

export async function endSleepActivity(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await LiveActivity.endSleepActivity();
  } catch {
    // silent fail
  }
}