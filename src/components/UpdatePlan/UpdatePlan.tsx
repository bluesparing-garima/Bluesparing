import { Grid } from "@mui/material";
import useSubscription from "../../Hooks/Subscription/useSubscription";
import PlanCard from "./PlanCard";
import { SafeKaroUser } from "../../context/constant";


const UpdatePlan = () => {
  const [subsData] = useSubscription();
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

  const freePlan = (plan: string) => {
    const currentPlan = plan.trim().toLowerCase();
    if (!UserData) {
      return true;
    } else {
      if (currentPlan === "free" && UserData.isFreePlanUsed) {
        return false;
      }
      return true;
    }

  }
  return (
    <div className="bg-blue-200 lg:p-5 h-full hide-scrollbar p-4">
      <h1 className="w-full text-center mb-4 text-2xl uppercase font-extrabold underline  text-[#213555]">
        Choose your plan
      </h1>
      <Grid container spacing={2} gap={3} padding={2}>
        {subsData.map((ele: any, index: number) => (
          freePlan(ele.planName) ? <PlanCard key={`${ele.planName}${index}`} p={ele} /> : null
        ))}
      </Grid>
    </div>
  );
};

export default UpdatePlan;
