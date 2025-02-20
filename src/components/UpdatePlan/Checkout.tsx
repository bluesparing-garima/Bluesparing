import { FC, useState } from "react";
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
  const getDiscount = () => {
    const monthDiscount = plan.discount?.[selectedMonths] ?? 0;
    const discountPercentage = Number(monthDiscount) || 0;
    const monthlyDiscount = (plan.monthlyAmount * discountPercentage) / 100;
    return monthlyDiscount * selectedMonths;
  };
  const getTotalAmount = () => {
    return getAmount() - getDiscount();
  };

  const handleUpdateMonth = (event: SelectChangeEvent<number>) => {
    console.log(event.target.value);
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
    if (userData?.role) {
      navigate("/dashboard");
      sessionStorage.clear();
    } else {
      navigate("/");
      sessionStorage.clear();
    }
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
        handleTransaction(razorpay_payment_id, razorpay_order_id, true);
        updateLocalStorage({ transactionStatus: true });
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
      AddTransactionServices({
        data: makeTransactionPayload(tId, oId, status),
      });
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
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
        planId: plan._id,
        planType: plan.planName,
        planStartDate: CalculateCurrentDate(),
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
        planStartDate: CalculateCurrentDate(),
        planEndDate: calculatePlanEndDate(),
      };
      sessionStorage.clear();
      return payload;
    }
  };

  const handleProceedPayment = async () => {
    if (!isCheckUserData()) {
      navigate("/signup");
      sessionStorage.clear();
      return;
    }
    if (plan?.planName.toLowerCase().trim() === "free") {
      handleTransaction("free", "free", true);
      updateLocalStorage({ transactionStatus: true });
      handleNavigation();
    } else {
      try {
        const amount = getTotalAmount() ;
        const response = InitiatePaymentService({ amount});
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
  return (
    <div className="w-full h-screen flex flex-col bg-blue-200 justify-center ">
      {}
      <h1 className="w-full text-center mb-4 text-2xl uppercase font-extrabold underline  text-[#213555]">
        Payment Page
      </h1>
      <div className="flex justify-center ">
        <Box className="mt-16 p-10 w-[500px] h-[400px] rounded-xl rounded-r-none bg-white shadow-[-4px_2px_10px_rgba(0,0,0,0.25)]">
          <div className="bg-[#e59411] p-2 text-center text-white">
            <Typography className="text-md font-extrabold font-satoshi">
              Checkout{" "}
            </Typography>
            <Typography className="text-sm font-satoshi">
              Selected Plan :({plan.planName})
            </Typography>
          </div>
          <Typography className="font-satoshi mt-5">
            <span className="text-[#027AAE] font-semibold">Monthly Amount :</span>{" "}
            <span className="text-sm font-semibold">₹{getAmount()}</span>
          </Typography>
          <Typography className="font-satoshi my-3">
            <span className="text-[#027AAE] font-semibold">
              Policy Count :
            </span>{" "}
            <span className="text-sm font-semibold">{plan.policyCount}</span>
          </Typography>
          {Object.keys(plan.userLimit).map((ele) => {
          return (
            <Typography key={ele} className="font-satoshi">
              <span className="font-semibold text-[#027AAE] capitalize ">
                {ele.toLowerCase()} Limit:
              </span>
              <span className="font-medium"> {plan.userLimit?.[ele]}</span>
            </Typography>
          );
        })}
          <Typography className="font-satoshi mt-3">
            <span className="text-[#027AAE] font-semibold">Duration :</span>
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
        <Box className="mt-16 p-10 w-[500px] h-[400px] rounded-xl rounded-l-none bg-white shadow-[6px_2px_15px_rgba(0,0,0,0.25)]">
          <div className="bg-[#e59411] p-2 text-center text-white">
            <Typography className="text-md font-semibold font-satoshi">
              Selected Plan
            </Typography>
            <Typography className="text-sm font-satoshi">
              ({plan.planName})
            </Typography>
          </div>
          <Typography className="font-satoshi mt-5">
            <span className="text-[#027AAE] font-semibold font-extrabold">Amount :</span>{" "}
            <span className="text-sm font-semibold">₹{getAmount()}</span>
          </Typography>
  
          <Typography className="font-satoshi mt-3">
            <span className="text-[#027AAE] font-semibold">Discount :</span>{" "}
            <span className="text-sm font-semibold">
              ₹{getDiscount().toFixed(2)} ({`${plan.discount[selectedMonths]}%`}
              )
            </span>
          </Typography>
          <hr className="h-1 rounded mt-2"/>
          <Typography className="font-satoshi mt-3">
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
