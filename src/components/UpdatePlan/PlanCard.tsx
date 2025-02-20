import { FC } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ISubscription } from "../../api/Subscriptions/subscriptionType";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getFromSessionStorage } from "../../utils/HandleStore";
import { SafeKaroUser, SESSION_USER } from "../../context/constant";
import { IUser } from "../../Auth/IAuth";
interface PlanCardProps {
  p: ISubscription;
}
const PlanCard: FC<PlanCardProps> = ({ p }) => {
  const user = getFromSessionStorage(SESSION_USER) as IUser;
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const navigate = useNavigate();
  const isCheckUserData = () => {
    if (userData?.role) {
      return true;
    } else if (user?._id) {
      return true;
    }
    return false;
  };

  const handleCheckout = () => {
    if (!isCheckUserData()) {
      navigate("/signup");
      sessionStorage.clear();
      return;
    }

    navigate("/checkout", { state: { plan: p } });
  };

  return (
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
          {p.planName.toUpperCase()}
        </Typography>
      </Box>
      <Typography variant="h3" fontWeight="bold" mt={1}>
        ₹{p.monthlyAmount} <span className="text-sm font-semibold capitalize ">per month</span>
      </Typography>

      <Box mt={1} textAlign="left">
        <Typography variant="body1" fontWeight="bold" gutterBottom>
          Plan Features:
        </Typography>
        <div
          className="font-satoshi "
          style={{
            maxHeight: "8rem",
            overflowY: "auto",
          }}
          dangerouslySetInnerHTML={{
            __html: p.planDetails,
          }}
        />
        <Typography className="font-satoshi">
          <span className="font-semibold text-[#027AAE]">Policy Limit:</span>
          <span className="font-medium"> {p.policyCount}</span>
        </Typography>

        {Object.keys(p.userLimit).map((ele) => {
          return (
            <Typography key={ele} className="font-satoshi">
              <span className="font-semibold text-[#027AAE] capitalize ">
                {ele.toLowerCase()} Limit:
              </span>
              <span className="font-medium"> {p.userLimit?.[ele]}</span>
            </Typography>
          );
        })}
      </Box>
      <Button
        variant="contained"
        sx={{ mt: 3, px: 4, borderRadius: 1, backgroundColor: "#027AAE" }}
        className="font-satoshi"
        onClick={handleCheckout}
      >
        Checkout
      </Button>
      <Toaster position="bottom-center" reverseOrder={true} />
    </Box>
  );
};
export default PlanCard;
