import { Grid } from "@mui/material";
import useSubscription from "../../Hooks/Subscription/useSubscription";
import PlanCard from "./PlanCard";
import { SafeKaroUser } from "../../context/constant";
import { FC } from "react";

interface UpdatePlanProps {
  name?: string;
  email?: string;
  phone?: string;
}
const UpdatePlan: FC<UpdatePlanProps> = ({ name, email, phone }) => {
  const [subsData] = useSubscription();
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  return (
    <div className="bg-blue-200  p-4">
      <Grid container spacing={2} gap={3} padding={2}>
        {subsData.map((ele, index) => (
          <PlanCard
            key={`${ele.planName}${index}`}
            p={ele}
            name={name ? name : userData.name}
            email={email ? email : userData.email}
            phone={phone ? phone : userData.phoneNumber}
          />
        ))}
      </Grid>
    </div>
  );
};

export default UpdatePlan;
