import { Box, Button, Grid, Typography } from "@mui/material";
import useSubscription from "../../Hooks/Subscription/useSubscription";
import PlanCard from "./PlanCard";
import { useNavigate } from "react-router-dom";

const UpdatePlan = () => {
  const [subsData] = useSubscription();
  const navigate = useNavigate();

  // Sort the plans to ensure the free plan appears at the top
  const sortedPlans = [...subsData].sort((a, b) => {
    const aIsFree = a.planName.toLowerCase().includes("free");
    const bIsFree = b.planName.toLowerCase().includes("free");
    return aIsFree ? -1 : bIsFree ? 1 : 0;
  });

  const handleCustomPlan = () => {
    navigate("/custom-plan");
  };

  return (
    <div className="bg-blue-200 lg:p-5 h-full p-4">
      <h1 className="w-full text-center mb-4 text-2xl uppercase font-extrabold underline text-[#213555]">
        Choose your plan
      </h1>
      <Grid container spacing={2} gap={3} padding={2}>
        {sortedPlans.map((ele, index) => (
          <PlanCard key={`${ele.planName}${index}`} p={ele} />
        ))}

        {/* Custom Plan Card (Only Once) */}
        <Box
          sx={{
            width: 300,
          margin: "auto",
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
          padding: 2,
          }}
        >
          <Box sx={{ backgroundColor: "#e59411", color: "white", py: 1 }}>
            <Typography className="font-satoshi font-extrabold">
              Custom Plan
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight="bold" mt={1}>
            Create Your Own Plan
          </Typography>
          <Typography mt={1} color="#027AAE">
            Choose limits and features based on your needs.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, px: 4, borderRadius: 1, backgroundColor: "#027AAE" }}
            className="font-satoshi"
            onClick={handleCustomPlan}
          >
            Customize Plan
          </Button>
        </Box>
      </Grid>
    </div>
  );
};

export default UpdatePlan;
