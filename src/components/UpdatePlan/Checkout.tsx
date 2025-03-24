import { FC, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import logo from "../../assets/fav.png";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ISubscription } from "../../api/Subscriptions/subscriptionType";
import {
  getFromSessionStorage,
  updateLocalStorage,
} from "../../utils/HandleStore";
import { SafeKaroUser, SESSION_USER } from "../../context/constant";
import { IUser } from "../../Auth/IAuth";
import { AddTransactionProps } from "../../api/Transaction/ITransaction";
import AddTransactionServices from "../../api/Transaction/AddTranstion/AddTransactionServices";
import { IVerifyResponsePayload } from "../../api/Razorpay/IRazorpay";
import InitiatePaymentService from "../../api/Razorpay/InitiatePayment/InitiatePaymentService";
import VerifyPaymentService from "../../api/Razorpay/VerifyPayment/VerifyPaymentService";
interface CheckoutState {
  plan?: ISubscription;
  selectedPlan: "monthly" | "yearly";
}
const Checkout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CheckoutState | undefined;
  const plan = state?.plan;
  const user = getFromSessionStorage(SESSION_USER) as IUser;
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [selectedMonths, setSelectedMonths] = useState<number>(1);

  if (!plan) {
    toast.error("No plan selected. Redirecting to plans page...");
    navigate("/plans");
    return null;
  }
  const getAmount = () => {
    const baseAmount = plan.monthlyAmount;
    return Number(baseAmount) * selectedMonths;
  };

  const getNearestDiscount = (month: number): number => {
    if (!plan.discount) return 0;

    const discountMonths = Object.keys(plan.discount)
      .map(Number)
      .sort((a, b) => a - b);

    for (let i = month; i >= 1; i--) {
      if (discountMonths.includes(i)) {
        return plan.discount[i];
      }
    }
    return 0;
  };

  const getDiscount = () => {
    const discountPercentage = getNearestDiscount(selectedMonths);
    const monthlyDiscount = (plan.monthlyAmount * discountPercentage) / 100;

    return monthlyDiscount * selectedMonths;
  };

  const getTotalAmount = () => {
    return getAmount() - getDiscount();
  };

  const handleUpdateMonth = (event: SelectChangeEvent<number>) => {
    setSelectedMonths(Number(event.target.value));
  };

  const CalculateCurrentDate = (): string => {
    const currentDate = new Date();
    return currentDate.toISOString();
  };
  const calculatePlanEndDate = (): string => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + Number(selectedMonths || 1));
    return currentDate.toISOString();
  };
  const calculateFreePlanEndDate = (): string => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    return currentDate.toISOString();
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
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };
  const verifyPayment = async (
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ) => {
    try {
      const response = await VerifyPaymentService({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      if (response.success) {
        await handleTransaction(razorpay_payment_id, razorpay_order_id, true);
        handleNavigation();
      } else {
        toast.error("Payment verification failed");
      }
    } catch (error) {
      handleTransaction("free", "free", false);
      toast.error("Error verifying payment");
      handleNavigation();
    }
  };
  const handleTransaction = async (
    tId: string,
    oId: string,
    status: boolean
  ) => {
    try {
      const amount = getTotalAmount();
      if (tId === "free") {
        AddTransactionServices({
          data: makePayloadForFree(),
        });
      } else {
        AddTransactionServices({
          data: makeTransactionPayload(tId, oId, status, amount),
        });
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };

  const makePayloadForFree = () => {
    const newUserLimit: Record<string, number | string> = {};
    for (let key in plan.userLimit) {
      if (key.toLowerCase() === "relationship manager") {
        key = "rm";
      }
      newUserLimit[key.toLowerCase()] = plan.userLimit[key.toLowerCase()];
    }

    const payload: AddTransactionProps = {
      userId: userData?.profileId || user?._id || "",
      transactionId: "free",
      orderId: "free",
      createdBy: userData?.name || user?.name || "Unknown",
      transactionStatus: true,
      planId: plan?._id || "",
      planType: plan?.planName || "Unknown Plan",
      planStartDate: CalculateCurrentDate(),
      policyCount: Number(plan?.policyCount) || 1,
      userLimit: newUserLimit ?? 0,
      amount: 0,
      planEndDate: calculateFreePlanEndDate(),
    };

    return payload;
  };
  const makeTransactionPayload = (
    pId: string,
    oId: string,
    status: boolean,
    amount: number
  ): AddTransactionProps => {
    const newUserLimit: Record<string, number | string> = {};
    for (let key in plan.userLimit) {
      if (key.toLowerCase() === "relationship manager") {
        key = "rm";
      }
      newUserLimit[key.toLowerCase()] = plan.userLimit[key.toLowerCase()];
    }

    if (userData?.role) {
      const payload: AddTransactionProps = {
        userId: userData.profileId,
        transactionId: pId,
        orderId: oId,
        createdBy: userData.name,
        transactionStatus: status,
        planId: plan._id,
        planType: plan.planName,
        planStartDate: CalculateCurrentDate(),
        policyCount:
          (Number(plan.policyCount) * selectedMonths || 1) +
            Number(userData.policyCount) || 0,
        userLimit: newUserLimit,
        amount: amount || 0,
        planEndDate:
          plan.planName?.toLowerCase() === "free"
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
        planId: plan._id,
        planType: plan.planName,
        amount: amount || 0,
        planStartDate: CalculateCurrentDate(),
        planEndDate: calculatePlanEndDate(),
        policyCount: Number(plan.policyCount) * selectedMonths || 1,
        userLimit: newUserLimit,
      };
      sessionStorage.clear();
      localStorage.clear();
      return payload;
    }
  };

  const calculateLimit = (ele: string) => {
    const planLimit = Number(plan?.userLimit?.[ele]) || 0;
    const months = Number(selectedMonths) || 1;

    if (planLimit === Infinity) {
      return "unlimited";
    }

    return planLimit;
  };

  const handleProceedPayment = async () => {
    if (!isCheckUserData()) {
      navigate("/signup");
      sessionStorage.clear();
      localStorage.clear();
      return;
    }
    const amount = getTotalAmount();
    if (amount <= 0) {
      handleTransaction("free", "free", true);
      updateLocalStorage({ transactionStatus: true });
      handleNavigation();
    } else {
      try {
        const response = await InitiatePaymentService({ amount });
        const data = await response;
        if (data.success) {
          const { order_id } = data;
          const options = {
            key: process.env.REACT_APP_API_KEY,
            amount: Number(amount) * 100,
            currency: "INR",
            name: "Blue Sparing",
            description: `Payment for ${plan.planName} plan`,
            image: logo,
            order_id: order_id,
            handler: async (response: IVerifyResponsePayload) => {
              try {
                await verifyPayment(
                  response.razorpay_order_id,
                  response.razorpay_payment_id,
                  response.razorpay_signature
                );
              } catch (error) {
                handleTransaction("error", "error", false);
              }
            },
            prefill: {
              name: user ? user.name : userData.name,
              email: user ? user.email : userData.email,
              contact: user ? user.phone : userData.phoneNumber,
            },
            theme: {
              color: "#e59411",
            },
          };
          const razorpay = new (window as any).Razorpay(options);
          razorpay.open();
        }
      } catch (error) {
        handleTransaction("error", "error", false);
        toast.error("Error initiating payment");
      }
    }
  };

  const getMaxDiscountMonth = () => {
    if (!plan.discount) return { month: 0, discount: 0 };

    return Object.entries(plan.discount).reduce(
      (max, [month, discount]) =>
        Number(discount) > max.discount
          ? { month: Number(month), discount: Number(discount) }
          : max,
      { month: 0, discount: 0 }
    );
  };

  const { month: highestMonth, discount: highestDiscount } =
    getMaxDiscountMonth();

  return (
    <div className="w-full min-h-screen bg-blue-200 flex flex-col items-center p-3">
      {}
      <h1 className="w-full pt-6 sm:pt-10 text-center text-lg sm:text-xl uppercase font-semibold text-[#213555]">
        Your Cart
      </h1>
      <div className="w-full max-w-5xl px-3 sm:px-6 py-3 sm:py-4 mt-4 rounded-xl bg-[#e59411] text-white text-center shadow-lg">
        <h2 className="font-satoshi font-semibold text-sm sm:text-lg">
          🔥 Hurry! Limited-Time Offer on {plan.planName} Plans! 🔥
        </h2>
        <p className="font-satoshi text-xs sm:text-md mt-1">
          💰 Select {plan.planName} plan for {highestMonth}{" "}
          {highestMonth > 1 ? "Months" : "Month"} to get {highestDiscount}% off
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mt-6 w-full px-3 sm:px-6 max-w-6xl">
        <Box className="p-4 sm:p-6 w-full max-w-sm sm:max-w-md rounded-xl bg-white shadow-lg border border-gray-200">
          <div className="bg-[#e59411] p-3 mt-0 text-center text-white rounded-t-xl">
            <Typography className="text-base sm:text-lg font-bold font-satoshi">
              Checkout{" "}
            </Typography>
            <Typography className="text-xs sm:text-sm font-satoshi">
              Selected Plan : ({plan.planName})
            </Typography>
          </div>
          <Typography className="font-satoshi mt-4 text-sm sm:text-base">
            <span className="text-[#027AAE] font-semibold">
              Monthly Amount :
            </span>{" "}
            {plan.planName.toLowerCase().trim() === "free" && (
              <span className="line-through px-2 text-gray-500">₹199</span>
            )}
            <span className="text-sm font-semibold">₹{plan.monthlyAmount}</span>
          </Typography>

          <Typography className="font-satoshi my-1 text-sm sm:text-base">
            <span className="text-[#027AAE] font-semibold">Policy Count :</span>{" "}
            <span className="text-sm font-semibold">
              {Number(plan?.policyCount) * Number(selectedMonths) +
                (Number(userData?.policyCount) || 0)}
            </span>
          </Typography>
          {Object.keys(plan.userLimit).map((ele) => {
            return (
              <Typography
                key={ele}
                className="font-satoshi text-sm my-1 sm:text-base"
              >
                <span className="font-semibold text-[#027AAE] capitalize">
                  {ele.toLowerCase()} Limit:
                </span>
                <span className="font-medium"> {calculateLimit(ele)}</span>
              </Typography>
            );
          })}

          <Typography className="font-satoshi my-2 text-sm sm:text-base">
            <span className="text-[#027AAE] font-semibold">Duration :</span>
            <Select
              value={selectedMonths}
              onChange={handleUpdateMonth}
              displayEmpty
              className="ml-2 w-32 sm:w-40 h-10 text-sm sm:text-base font-semibold"
              IconComponent={KeyboardArrowDownIcon}
            >
              {[...Array(24)].map((_, index) => {
                const month = index + 1;
                return (
                  <MenuItem key={`${month}-month`} value={month}>
                    {`${month} - Month`}
                  </MenuItem>
                );
              })}
            </Select>
          </Typography>
        </Box>

        <Box className="p-4 sm:p-6 w-full max-w-sm sm:max-w-md rounded-xl bg-white shadow-lg border border-gray-200">
          <div className="bg-[#e59411] p-3 text-center text-white rounded-t-xl">
            <Typography className="text-base sm:text-lg font-semibold font-satoshi">
              Selected Plan
            </Typography>
            <Typography className="text-xs sm:text-sm font-satoshi">
              ({plan.planName})
            </Typography>
          </div>

          <Typography className="font-satoshi mt-4 text-sm sm:text-base">
            <span className="text-[#027AAE] font-semibold">Amount:</span>{" "}
            <span className="font-semibold">₹{getAmount()}</span>
          </Typography>

          {getNearestDiscount(selectedMonths) > 0 && (
            <Typography className="font-satoshi mt-3 text-sm sm:text-base">
              <span className="text-[#027AAE] font-semibold">Discount :</span>{" "}
              <span className="text-sm font-semibold">
                ₹{getDiscount().toFixed(2)} (
                {getNearestDiscount(selectedMonths)}%)
              </span>
            </Typography>
          )}

          <hr className="h-1 rounded mt-2" />
          <Typography className="font-satoshi mt-4 text-base sm:text-lg">
            <span className="text-[#027AAE] font-semibold">Total :</span>{" "}
            <span className="text-sm font-semibold">
              ₹{getTotalAmount().toFixed(2)}
            </span>
          </Typography>

          <Button
            variant="contained"
            className="transform active:scale-75 transition-transform"
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
