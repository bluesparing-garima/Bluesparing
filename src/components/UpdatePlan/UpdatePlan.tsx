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
    <div className="bg-gradient-to-b from-blue-200 to-blue-200 min-h-screen flex flex-col justify-center px-4 md:px-10 py-8">
  {/* Title */}
  <h1 className="text-center text-3xl font-satoshi sm:text-3xl font-semibold uppercase underline text-blue-900 mb-8">
    Choose Your Plan
  </h1>

  {/* Plan Cards Grid */}
  <div className="container mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {subsData.map((ele: any, index: number) =>
        freePlan(ele.planName) ? (
          <div key={`${ele.planName}${index}`} className="flex justify-center">
            <PlanCard p={ele} />
          </div>
        ) : null
      )}
    </div>
  </div>
</div>

  );
};

export default UpdatePlan;
