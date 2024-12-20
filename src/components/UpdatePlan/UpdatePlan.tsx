import { Grid } from "@mui/material";
import useSubscription from "../../Hooks/Subscription/useSubscription";
import PlanCard from "./PlanCard";

const UpdatePlan = () => {
  const [subsData] = useSubscription();

  return (
    <div className="bg-blue-200  p-4">
      <Grid container spacing={2} gap={3} padding={2}>
        {subsData.map((ele, index) => (
          <PlanCard key={`${ele.planName}${index}`} p={ele} />
        ))}
      </Grid>
    </div>
  );
};

export default UpdatePlan;
