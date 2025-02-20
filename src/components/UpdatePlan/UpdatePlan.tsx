import { Grid } from "@mui/material";
import useSubscription from "../../Hooks/Subscription/useSubscription";
import PlanCard from "./PlanCard";

const UpdatePlan = () => {
  const [subsData] = useSubscription();

  return (
    <div className="bg-blue-200 lg:p-5 h-screen  p-4">
      <h1 className="w-full text-center mb-4 text-2xl uppercase font-extrabold underline  text-[#213555]">
        Choose your plan
      </h1>
      <Grid container spacing={2} gap={3} padding={2}>
        {subsData.map((ele, index) => (
          <PlanCard key={`${ele.planName}${index}`} p={ele} />
        ))}
      </Grid>
    </div>
  );
};

export default UpdatePlan;
