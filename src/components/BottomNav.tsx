import { useLocation, Link } from "react-router-dom";
import { useFamily } from "@/context/FamilyContext";
import { useDiary } from "@/context/DiaryContext";
import { useTranslation } from "react-i18next";
import { Home, Baby, Users, MessageCircle, Menu, Sparkles } from "lucide-react";

export function BottomNav() {
  const { pathname } = useLocation();
  const { profile } = useFamily();
  const { nursingLogs, diaperLogs, sleepLogs } = useDiary();
  const { t } = useTranslation();
  const isPregnant = profile.phase === "pregnant";

  const today = new Date().toDateString();
  const hasPartnerLogsToday =
    nursingLogs.some(l => l.fromPartner && new Date(l.timestamp).toDateString() === today) ||
    diaperLogs.some(l => l.fromPartner && new Date(l.timestamp).toDateString() === today) ||
    sleepLogs.some(l => l.fromPartner && new Date(l.startTime).toDateString() === today);

  const pregnantItems = [
    { label: "Hjem",        icon: Home,      path: "/",        center: false },
    { label: "Gravid",      icon: Baby,      path: "/barn",    center: false },
    { label: "MELO",        icon: Sparkles,  path: "/chat",    center: true  },
    { label: "Sammen",      icon: Users,     path: "/sammen",  center: false },
    { label: "Menu",        icon: Menu,      path: "/mere",    center: false },
  ];

  const babyItems = [
    { label: t("nav.home"),    icon: Home,          path: "/",      center: false },
    { label: t("nav.child"),   icon: Baby,          path: "/barn",  center: false },
    { label: t("nav.chat"),    icon: MessageCircle, path: "/chat",  center: false },
    { label: t("nav.together"),icon: Users,         path: "/sammen", center: false },
    { label: "Mere",           icon: Menu,          path: "/mere",  center: false },
  ];

  const navItems = isPregnant ? pregnantItems : babyItems;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-end justify-around"
      style={{
        background: "hsl(var(--warm-white))",
        borderTop: "1px solid hsl(var(--stone-light))",
        paddingTop: "10px",
        paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        paddingLeft: "env(safe-area-inset-left, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
    >
      {navItems.map((item) => {
        const active = item.path === "/"
          ? pathname === "/"
          : pathname.startsWith(item.path);

        if (item.center) {
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-0.5 -mt-6"
            >
              <div
                className="w-[56px] h-[56px] rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90"
                style={{ background: "hsl(var(--moss))" }}
              >
                <item.icon className="w-6 h-6 text-white" strokeWidth={1.8} />
              </div>
              <span
                className="text-[10px] mt-0.5"
                style={{
                  fontWeight: active ? 600 : 400,
                  color: active ? "hsl(var(--moss))" : "hsl(var(--muted-foreground))",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors active:scale-95 ${
              active ? "text-moss" : "text-muted-foreground"
            }`}
          >
            <div className="relative">
              <item.icon className="w-[22px] h-[22px]" strokeWidth={active ? 2.2 : 1.8} />
              {item.path === "/mere" && !active && hasPartnerLogsToday && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                  style={{ background: "hsl(var(--moss))" }}
                />
              )}
              {active && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: "hsl(var(--moss))" }} />
              )}
            </div>
            <span className="text-[10px]" style={{ fontWeight: active ? 600 : 400 }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
