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
    // <Box
    //   sx={{
    //     minWidth: 300,
    //     minHeight:430,
    //     margin: "auto",
    //     backgroundColor: "white",
    //     boxShadow: 3,
    //     borderRadius: 2,
    //     textAlign: "center",
    //     padding: 2,
    //     marginBottom:5
    //   }}
    // >
    //   <Box sx={{ backgroundColor: "#e59411", color: "white", py: 1 }}>
    //     <Typography className="font-satoshi font-extrabold">
    //       {p.planName.toUpperCase()}
    //     </Typography>
    //   </Box>
    //   <Typography variant="h3" fontWeight="bold" mt={1}>
    //     {p.planName.toLowerCase().trim() === "free" && (
    //       <span className="line-through px-2">₹199</span>
    //     )}
    //     ₹{p.monthlyAmount}{" "}
    //     <span className="text-sm font-semibold capitalize">per month</span>
    //   </Typography>

    //   <Box mt={1} textAlign="left">
    //     <Typography variant="body1" fontWeight="bold" gutterBottom>
    //       Plan Features:
    //     </Typography>
    //     <div
    //       className="font-satoshi "
    //       style={{
    //         maxHeight: "8rem",
    //         overflowY: "auto",
    //       }}
    //       dangerouslySetInnerHTML={{
    //         __html: p.planDetails,
    //       }}
    //     />
    //     <Typography className="font-satoshi">
    //       <span className="font-semibold text-[#027AAE]">Policy Limit:</span>
    //       <span className="font-medium"> {p.policyCount}</span>
    //     </Typography>

    //     {Object.keys(p.userLimit).map((ele) => {
    //       return (
    //         <Typography key={ele} className="font-satoshi">
    //           <span className="font-semibold text-[#027AAE] capitalize ">
    //             {ele.toLowerCase()} Limit:
    //           </span>
    //           <span className="font-medium"> {p.userLimit?.[ele]}</span>
    //         </Typography>
    //       );
    //     })}
    //   </Box>
    //   <Button
    //     variant="contained"
    //     sx={{ mt: 3, px: 4, borderRadius: 1, backgroundColor: "#027AAE" }}
    //     className="font-satoshi"
    //     onClick={handleCheckout}
    //   >
    //     Checkout
    //   </Button>
    //   <Toaster position="bottom-center" reverseOrder={true} />
    // </Box>

    <div className="w-full sm:w-[38vw] md:w-[28vw] md:ml-2 ml-5 lg:w-[21.5vw] mb-2 lg:ml-1 xl:w-[23.5vw] xl:ml-3 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 py-3 text-center text-white font-bold text-lg">
        {p.planName.toUpperCase()}
      </div>

      {/* Price Section */}
      <div className="text-center py-4">
        <h2 className="text-3xl font-extrabold text-gray-800">
          {p.planName.toLowerCase().trim() === "free" && (
            <span className="line-through text-gray-400 text-xl mr-2">₹199</span>
          )}
          ₹{p.monthlyAmount}
          <span className="text-sm font-semibold text-gray-500"> /month</span>
        </h2>
      </div>

      {/* Features */}
      <div className="px-6 py-3">
        <h3 className="font-semibold text-lg text-gray-700 mb-2">Plan Features:</h3>
        <div
          className="text-sm text-gray-600 space-y-2 max-h-32 overflow-y-auto custom-scrollbar"
          dangerouslySetInnerHTML={{ __html: p.planDetails }}
        />

        <p className="mt-2 text-sm font-medium text-gray-700">
          <span className="font-semibold text-blue-600">Policy Limit:</span> {p.policyCount}
        </p>

        {Object.keys(p.userLimit).map((ele) => (
          <p key={ele} className="text-sm font-medium text-gray-700">
            <span className="font-semibold text-blue-600">{ele.toLowerCase()} Limit:</span>{" "}
            {p.userLimit?.[ele]}
          </p>
        ))}
      </div>

      {/* Checkout Button */}
      <div className="p-4">
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 rounded-lg transition-all duration-300"
        >
          Checkout
        </button>
      </div>

      <Toaster position="bottom-center" reverseOrder={true} />
    </div>
  );
};
export default PlanCard;
