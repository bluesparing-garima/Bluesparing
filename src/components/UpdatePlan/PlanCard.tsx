import { FC, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ISubscription } from "../../api/Subscriptions/subscriptionType";
import InitiatePaymentService from "../../api/Razorpay/InitiatePayment/InitiatePaymentService";
import { IVerifyResponsePayload } from "../../api/Razorpay/IRazorpay";
import toast, { Toaster } from "react-hot-toast";
import VerifyPaymentService from "../../api/Razorpay/VerifyPayment/VerifyPaymentService";
import logo from "../../assets/fav.png";
import { useNavigate } from "react-router-dom";
import {
  getFromSessionStorage,
  updateLocalStorage,
} from "../../utils/HandleStore";
import { SafeKaroUser, SESSION_USER } from "../../context/constant";
import { IUser } from "../../Auth/IAuth";
import { AddTransactionProps } from "../../api/Transaction/ITransaction";
import AddTransactionServices from "../../api/Transaction/AddTranstion/AddTransactionServices";
interface PlanCardProps {
  p: ISubscription;
}
const PlanCard: FC<PlanCardProps> = ({ p }) => {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const user = getFromSessionStorage(SESSION_USER) as IUser;
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const navigate = useNavigate();
  const getAmount = () => {
    if (selectedPlan === "monthly") {
      return p.monthlyAmount;
    }
  };
  const CalculateCurrentDate = (): string => {
    const currentDate = new Date();
    return currentDate.toISOString();
  };
  const calculatePlanEndDate = (): string => {
    const currentDate = new Date();
    if (selectedPlan === "monthly") {
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else if (selectedPlan === "yearly") {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    return currentDate.toISOString();
  };
  const calculateFreePlanEndDate = (): string => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    return currentDate.toISOString();
  };

  const makeTransactionPayload = (
    pId: string,
    oId: string,
    status: boolean
  ): AddTransactionProps => {
    if (userData?.role) {
      const payload: AddTransactionProps = {
        userId: userData.profileId,
        transactionId: pId,
        orderId: oId,
        createdBy: userData.name,
        transactionStatus: status,
        planId: p._id,
        planType: p.planName,
        planStartDate: CalculateCurrentDate(),
        planEndDate:
          p.planName?.toLowerCase() === "free"
            ? calculateFreePlanEndDate()
            : calculatePlanEndDate(),
      };
      return payload;
    } else {
      const payload: AddTransactionProps = {
        userId: user._id,
        transactionId: pId,
        orderId: oId,
        createdBy: user.name,
        transactionStatus: status,
        planId: p._id,
        planType: p.planName,
        planStartDate: CalculateCurrentDate(),
        planEndDate: calculatePlanEndDate(),
      };
      sessionStorage.clear();
      return payload;
    }
  };
  const handlePlanChange = (planType: "monthly" | "yearly") => {
    setSelectedPlan(planType);
  };

  const isCheckUserData = () => {
    if (userData?.role) {
      return true;
    } else if (user?._id) {
      return true;
    }
    return false;
  };

  const handleNavigation = () => {
    if (userData?.role) {
      navigate("/dashboard");
      sessionStorage.clear();
    } else {
      navigate("/");
      sessionStorage.clear();
    }
  };
  const handleTransaction = async (
    tId: string,
    oId: string,
    status: boolean
  ) => {
    try {
      AddTransactionServices({
        data: makeTransactionPayload(tId, oId, status),
      });
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };

  const handleCheckout = () => {
    if (!isCheckUserData()) {
      navigate("/signup");
      sessionStorage.clear();
      return;
    }

    if (p.planName.toLowerCase().trim() === "free") {
      handleTransaction("free", "free", true);
      updateLocalStorage({ transactionStatus: true });
      handleNavigation();
    }else{
      navigate('/checkout', { state: { plan: p, selectedPlan } });
    }
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
        <Typography className="font-satoshi ">
          PER {selectedPlan.toUpperCase()}
        </Typography>
      </Box>
      <Typography variant="h3" fontWeight="bold" mt={1}>
        ₹{p.monthlyAmount}
      </Typography>
      <Box mt={2}>
        <Button
          variant={selectedPlan === "monthly" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handlePlanChange("monthly")}
          sx={{ mr: 2, borderRadius: 1 }}
        >
          Monthly
        </Button>
        <Button
          variant={selectedPlan === "yearly" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handlePlanChange("yearly")}
          sx={{ borderRadius: 1 }}
        >
          Yearly
        </Button>
      </Box>
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
