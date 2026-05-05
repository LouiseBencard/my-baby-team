import { useState, useCallback } from "react";

export interface BirthPlan {
  // Smertelindring
  painRelief: string[];
  painReliefNote: string;
  // Hvem er til stede
  partnerPresent: boolean;
  doula: boolean;
  otherPresent: string;
  // Under fødslen
  birthPositions: string[];
  wantsMusic: boolean;
  wantsDimLight: boolean;
  wantsMinimalStaff: boolean;
  birthNote: string;
  // Navlesnor
  cordCutting: string;
  delayedCord: boolean;
  // Hud-mod-hud
  skinToSkin: string;
  // Amning
  feeding: string;
  // Partner rolle
  partnerRoles: string[];
  partnerNote: string;
  // Andet
  otherWishes: string;
  updatedAt: string;
}

const STORAGE_KEY = "melo-birth-plan";

const DEFAULT_PLAN: BirthPlan = {
  painRelief: [],
  painReliefNote: "",
  partnerPresent: true,
  doula: false,
  otherPresent: "",
  birthPositions: [],
  wantsMusic: false,
  wantsDimLight: false,
  wantsMinimalStaff: false,
  birthNote: "",
  cordCutting: "",
  delayedCord: false,
  skinToSkin: "",
  feeding: "",
  partnerRoles: [],
  partnerNote: "",
  otherWishes: "",
  updatedAt: "",
};

function load(): BirthPlan {
  try { return { ...DEFAULT_PLAN, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return DEFAULT_PLAN; }
}

export function useBirthPlan() {
  const [plan, setPlan] = useState<BirthPlan>(load);

  const update = useCallback(<K extends keyof BirthPlan>(key: K, value: BirthPlan[K]) => {
    setPlan(prev => {
      const next = { ...prev, [key]: value, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleArray = useCallback((key: "painRelief" | "birthPositions" | "partnerRoles", value: string) => {
    setPlan(prev => {
      const arr = prev[key] as string[];
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      const updated = { ...prev, [key]: next, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // How complete is the plan (0–100)
  const completeness = (() => {
    const checks = [
      plan.painRelief.length > 0,
      plan.birthPositions.length > 0,
      !!plan.cordCutting,
      !!plan.skinToSkin,
      !!plan.feeding,
      plan.partnerRoles.length > 0,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  })();

  return { plan, update, toggleArray, completeness };
}

// ── Option configs ─────────────────────────────────────────────────────────────
export const PAIN_RELIEF_OPTIONS = [
  { key: "epidural",     label: "Epidural",          icon: "💉", desc: "Bedøvelse i ryggen — virker hurtigt og effektivt. Kræver anlæggelse af anæstesilæge og kan give blodtryksfald." },
  { key: "lattergas",    label: "Lattergas",          icon: "😅", desc: "Indåndes via maske og virker inden for sekunder. Tager ikke smerten helt væk, men giver en afstand til den." },
  { key: "varmtbad",     label: "Varmt bad/brusebad", icon: "🛁", desc: "Varmt vand lindrer smerter og fremmer afslapning. Kan bruges under aktive veer og i tidlig fødsel." },
  { key: "akupunktur",   label: "Akupunktur",         icon: "🪡", desc: "Nåle i specifikke punkter kan reducere smerte og angst. Kræver, at fødegangen har en uddannet jordmoder." },
  { key: "transcutaneous", label: "TENS",             icon: "⚡", desc: "Elektriske impulser via elektroder på ryggen forstyrrer smertesignalerne. Bedst til tidlig fødsel." },
  { key: "morfin",       label: "Morfin/pethidin",    icon: "💊", desc: "Stærk smertestillende medicin som gives som injektion. Giver søvnig/svimmel fornemmelse og kan påvirke baby." },
  { key: "ingen",        label: "Så lidt som muligt", icon: "🌿", desc: "Du ønsker at føde med så få indgreb og medicin som muligt. Jordemoderen støtter med vejrtrækning og positioner." },
  { key: "aaben",        label: "Åben for alt",       icon: "✨", desc: "Du vil vurdere undervejs og er åben for alle muligheder. Det mest fleksible valg." },
];

export const BIRTH_POSITIONS = [
  { key: "staaende",  label: "Stående",    icon: "🧍", desc: "Tyngdekraften hjælper baby nedad. Gode til aktive veer og fremmer veernes effekt." },
  { key: "siddende",  label: "Siddende",   icon: "🪑", desc: "Fødestol, toilet eller på hug. Åbner bækkenet og giver god kontrol." },
  { key: "liggende",  label: "Liggende",   icon: "🛌", desc: "På siden eller ryggen. Lettere for personalet at overvåge, men ikke optimalt for bækkenet." },
  { key: "firfoeds",  label: "Firefødder", icon: "🐾", desc: "På hænder og knæ. Reducerer tryk på perineum og hjælper ved smerter i lænde og ryg." },
  { key: "vand",      label: "Vand",       icon: "💧", desc: "Vandbirths sker i specielt badekar. Lindrer smerter og fremmer afslapning. Kræver ledig fødekasse." },
  { key: "aaben",     label: "Åben",       icon: "✨", desc: "Du vil mærke efter under fødslen og vælge position spontant." },
];

export const CORD_OPTIONS = [
  { key: "partner",    label: "Min partner klipper", desc: "En symbolsk og mindeværdig handling for jeres familie." },
  { key: "jordemoder", label: "Jordemoderen klipper", desc: "Jordemoderen tager sig af det — ingen præference fra jer." },
  { key: "ingen",      label: "Ingen præference", desc: "I er åbne for, hvad der passer bedst i situationen." },
];

export const SKIN_OPTIONS = [
  { key: "straks",          label: "Straks efter fødslen", desc: "Baby lægges direkte på din mave — skaber tilknytning og varme fra første sekund." },
  { key: "partner-foerst",  label: "Partner får hud-mod-hud først", desc: "Din partner holder baby, mens du hviler eller sys. Fremmer farens tilknytning." },
  { key: "efter-vask",      label: "Vask baby først", desc: "Baby vaskes og vejes inden hudkontakt. Nogle foretrækker dette af hygiejniske årsager." },
  { key: "ingen",           label: "Ingen præference", desc: "I er åbne for, hvad der fungerer bedst i situationen." },
];

export const FEEDING_OPTIONS = [
  { key: "amme",     label: "Amme",              icon: "🤱", desc: "Modermælk giver optimal ernæring og immunforsvar. Kræver tilvænning de første dage." },
  { key: "flaske",   label: "Flaske",            icon: "🍼", desc: "Modermælkserstatning eller afpumpet mælk på flaske. Giver fleksibilitet og mulighed for deling." },
  { key: "begge",    label: "Begge dele",        icon: "💛", desc: "Du ønsker at prøve amning, men vil gerne have mulighed for flaske ved behov." },
  { key: "uafklaret",label: "Ikke besluttet endnu", icon: "🌀", desc: "Du vil vente og se, hvad der fungerer for jer efter fødslen." },
];

export const PARTNER_ROLES = [
  { key: "stotte",       label: "Støtte og opmuntre", desc: "Vær hendes ankerpunkt — ord og nærvær giver styrke." },
  { key: "massere",      label: "Massere ryggen", desc: "Tryk og cirkelbevægelser på lænden lindrer veesmerter markant." },
  { key: "musik",        label: "Sætte musik på", desc: "Rolig musik sænker stressniveauet og skaber en tryg atmosfære." },
  { key: "foto",         label: "Tage billeder/video", desc: "Fang øjeblikket — I vil sætte stor pris på det bagefter." },
  { key: "kommunikere",  label: "Kommunikere med personalet", desc: "Vær hendes stemme — spørg, afklar og sørg for ønskerne overholdes." },
  { key: "klip",         label: "Klippe navlesnoren", desc: "En stærk symbolsk handling — din første handling som far." },
  { key: "hud",          label: "Give hud-mod-hud", desc: "Hold baby mod din bare hud — det skaber tilknytning og giver baby varme og ro." },
  { key: "stille",       label: "Bare være der", desc: "Din tilstedeværelse alene er nok — hun har brug for dig ved sin side." },
];
