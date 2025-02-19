import { FC, useState } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ISubscription } from "../../api/Subscriptions/subscriptionType";

interface CheckoutState {
  plan?: ISubscription;
  selectedPlan: "monthly" | "yearly";
}

const Checkout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract state safely
  const state = location.state as CheckoutState | undefined;
  const plan = state?.plan;
  const defaultPlanType = state?.selectedPlan || "monthly";

  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    defaultPlanType
  );
  const [selectedMonths, setSelectedMonths] = useState<number>(1);

  // console.log(selectedMonths)
  // Redirect if no plan is available
  if (!plan) {
    toast.error("No plan selected. Redirecting to plans page...");
    navigate("/plans");
    return null;
  }
  // console.log(plan.discount);

  // Function to calculate total amount
  const getAmount = () => {
    const baseAmount = plan.monthlyAmount;
    return Number(baseAmount) * selectedMonths;
  };

  // Function to calculate discount (10% discount)
  // Function to calculate discount dynamically based on months
const getDiscount = () => {
  // Ensure discount object exists and retrieve the discount percentage
  const monthDiscount = plan.discount?.[selectedMonths] ?? 0;

  // Convert discount percentage to a number (default to 0 if invalid)
  const discountPercentage = Number(monthDiscount) || 0;

  // Calculate discount based on the monthly amount
  const monthlyDiscount = (plan.monthlyAmount * discountPercentage) / 100;

  // Return total discount for selected months
  return monthlyDiscount * selectedMonths;
};

// Function to calculate total price after discount
const getTotalAmount = () => {
  return getAmount() - getDiscount();
};


  // Handle dropdown selection change
  const handleUpdateMonth = (event: SelectChangeEvent<number>) => {
    console.log(event.target.value)
    setSelectedMonths(Number(event.target.value));
  };

  const handleProceedPayment = () => {
    toast.success(
      `Processing payment of ₹${getTotalAmount()} for ${plan.planName}`
    );
    // Add Razorpay or other payment processing logic here
  };

  return (
    <div className="w-full h-screen flex flex-col bg-blue-200 justify-center">
      {/* Left Section */}
      <h1 className="w-full text-center mb-4 text-2xl uppercase font-extrabold underline  text-[#213555]">
        Payment Page
      </h1>
      <div className="flex justify-center">
        <Box className="mt-16 p-10 w-[500px] h-[400px] rounded-xl rounded-r-none bg-white shadow-[-4px_2px_10px_rgba(0,0,0,0.25)]">
          <div className="bg-[#e59411] p-2 text-center text-white">
            <Typography className="text-md font-extrabold font-satoshi">
              Checkout{" "}
            </Typography>
            <Typography className="text-sm font-satoshi">
              Selected Plan : {selectedPlan.toUpperCase()}({plan.planName})
            </Typography>
          </div>
          <Typography className="font-satoshi mt-5">
            <span className="text-[#027AAE] font-extrabold">Amount :</span>{" "}
            <span className="text-sm font-extrabold">₹{getAmount()}</span>
          </Typography>
          <Typography className="font-satoshi mt-3">
            <span className="text-[#027AAE] font-extrabold">
              Policy Count :
            </span>{" "}
            <span className="text-sm font-extrabold">{plan.policyCount}</span>
          </Typography>
          <Typography className="font-satoshi mt-3">
            <span className="text-[#027AAE] font-extrabold">Duration :</span>
            <Select
              value={selectedMonths}
              onChange={handleUpdateMonth}
              displayEmpty
              sx={{
                ml: 2,
                width: 120,
                height: 35,
                fontFamily: "satoshi",
                fontWeight: "500",
              }}
              IconComponent={KeyboardArrowDownIcon}
            >
              {Object.keys(plan.discount).map((item) => {
                return (
                  <MenuItem key={`${item}-month`} value={`${item}`}>
                    {`${item} Month`}
                  </MenuItem>
                );
              })}
            </Select>
          </Typography>
        </Box>

        {/* Right Section - Summary */}
        <Box className="mt-16 p-10 w-[500px] h-[400px] rounded-xl rounded-l-none bg-white shadow-[6px_2px_15px_rgba(0,0,0,0.25)]">
          <div className="bg-[#e59411] p-2 text-center text-white">
            <Typography className="text-md font-extrabold font-satoshi">
              Selected Plan
            </Typography>
            <Typography className="text-sm font-satoshi">
              {selectedPlan.toUpperCase()}({plan.planName})
            </Typography>
          </div>
          <Typography className="font-satoshi mt-5">
            <span className="text-[#027AAE] font-extrabold">Amount :</span>{" "}
            <span className="text-sm font-extrabold">₹{getAmount()}</span>
          </Typography>
          <Typography className="font-satoshi mt-3">
            <span className="text-[#027AAE] font-extrabold">Discount :</span>{" "}
            <span className="text-sm font-extrabold">
              ₹{getDiscount().toFixed(2)} ({`${plan.discount[selectedMonths]}%`})
            </span>
          </Typography>
          <Typography className="font-satoshi mt-3">
            <span className="text-[#027AAE] font-extrabold">Total :</span>{" "}
            <span className="text-sm font-extrabold">
              ₹{getTotalAmount().toFixed(2)}
            </span>
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 1,
              backgroundColor: "#027AAE",
              fontFamily: "satoshi",
              marginTop: "20px",
            }}
            onClick={handleProceedPayment}
          >
            Proceed to Payment
          </Button>
          <Toaster position="bottom-center" reverseOrder={false} />
        </Box>
      </div>
    </div>
  );
};

export default Checkout;
