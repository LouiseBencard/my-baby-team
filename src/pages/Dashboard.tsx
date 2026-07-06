import { useFamily } from "@/context/FamilyContext";
import DashboardPregnant from "./DashboardPregnant";
import DashboardPregnantFar from "./DashboardPregnantFar";
import DashboardBaby from "./DashboardBaby";
import DashboardBabyFar from "./DashboardBabyFar";

export default function Dashboard() {
  const { profile } = useFamily();
  if (profile.phase === "pregnant") {
    return profile.role === "far" ? <DashboardPregnantFar /> : <DashboardPregnant />;
  }
  // Baby-fasen forgrener nu også på rolle — far får sin egen oplevelse efter fødslen
  return profile.role === "far" ? <DashboardBabyFar /> : <DashboardBaby />;
}
