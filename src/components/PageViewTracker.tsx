import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/** Logger page_view ved hvert rute-skift. Renderer intet. */
export function PageViewTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
