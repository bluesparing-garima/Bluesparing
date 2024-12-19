import React, { FC, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ISubscription } from "../../api/Subscriptions/subscriptionType";
import InitiatePaymentService from "../../api/Razorpay/InitiatePayment/InitiatePaymentService";
import { IVerifyResponsePayload } from "../../api/Razorpay/IRazorpay";
import toast from "react-hot-toast";
import VerifyPaymentService from "../../api/Razorpay/VerifyPayment/VerifyPaymentService";
import logo from "../../assets/Blue_Sparinglogo_ornage - Copy.png";
interface PlanCardProps {
  p: ISubscription;
  name?: string;
  phone?: string;
  email?: string;
}

const PlanCard: FC<PlanCardProps> = ({ p, name, phone, email }) => {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const getAmount = () => {
    if (selectedPlan === "monthly") {
      return p.monthlyAmount;
    } else {
      return p.annualAmount;
    }
  };
  const handlePlanChange = (planType: "monthly" | "yearly") => {
    setSelectedPlan(planType);
  };
  const handleMakePayment = async () => {
    const amount = getAmount();
    try {
      const response = InitiatePaymentService({ amount });
      const data = await response;

      if (data.success) {
        const { order_id } = data;
        const options = {
          key: process.env.REACT_APP_API_KEY,
          amount: Number(amount) * 100,
          currency: "INR",
          name: "Blue Sparing",
          description: `Payment for ${p.planName} plan`,
          image: logo,
          order_id: order_id,
          handler: (response: IVerifyResponsePayload) => {
            verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: name ? name : "",
            email: email,
            contact: phone,
          },
          theme: {
            color: "#e59411",
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      toast.error("Error initiating payment");
    }
  };
  const verifyPayment = async (
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ) => {
    try {
      const response = VerifyPaymentService({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      const data = await response;

      if (data.success) {
        toast.success("Payment verified successfully");
      } else {
        toast.error("Payment verification failed");
      }
    } catch (error) {
      toast.error("Error verifying payment");
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
        overflow: "hidden",
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
        ₹{selectedPlan === "monthly" ? p.monthlyAmount : p.annualAmount}
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
          className="font-satoshi  hide-scrollbar"
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
        onClick={handleMakePayment}
      >
        Make Payment
      </Button>
    </Box>
  );
};

export default PlanCard;
