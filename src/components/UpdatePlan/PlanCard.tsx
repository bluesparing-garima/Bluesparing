import { FC } from "react";
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

  const titleGenerator = () => {
    let title = "Checkout";
    if (userData?.planId === p._id) {
      title = "Your Plan"
    } else if (userData?.transactionStatus) {
      title = "Update Plan"
    }
    return title;
  }

  const handleCheckout = () => {
    if (!isCheckUserData()) {
      navigate("/signup");
      sessionStorage.clear();
      return;
    }
    navigate("/checkout", { state: { plan: p } });
  };

  return (

    <div className="w-[90%] max-w-[400px] sm:w-[40vw] md:w-[30vw] lg:w-[22vw] xl:w-[23vw] h-[65vh] bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-200 flex flex-col justify-between m-auto">
  
  {/* Header */}
  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 py-3 text-center text-white font-bold text-lg">
    {p.planName.toUpperCase()}
  </div>

  {/* Price */}
  <div className="text-center py-4">
    <h2 className="text-3xl font-extrabold text-gray-800">
      {p.planName.toLowerCase().trim() === "free" && (
        <span className="line-through text-gray-400 text-xl mr-2">₹199</span>
      )}
      ₹{p.monthlyAmount}
      <span className="text-sm font-semibold text-gray-500"> /month</span>
    </h2>
  </div>

  {/* Scrollable Features Section */}
  <div className="flex-1 px-6 overflow-y-auto scrollbar custom-scrollbar">
    <h3 className="font-semibold text-lg text-gray-700 mb-2">Plan Features:</h3>

    <div
      className="text-sm text-gray-600 space-y-2"
      dangerouslySetInnerHTML={{ __html: p.planDetails }}
    />

    <p className="mt-2 text-sm font-medium text-gray-700">
      <span className="font-semibold text-blue-600">Policy Limit:</span> {p.policyCount}
    </p>

    {Object.keys(p?.userLimit).map((ele) => (
      <p key={ele} className="text-sm font-medium text-gray-700">
        <span className="font-semibold text-blue-600">{ele.toLowerCase()} Limit:</span>{" "}
        <span className="font-medium">
          {parseFloat(p?.userLimit?.[ele] as unknown as string) === Infinity
            ? "Unlimited"
            : p?.userLimit?.[ele]}
        </span>
      </p>
    ))}
  </div>

  {/* Button */}
  <div className="p-4">
    <button
      onClick={handleCheckout}
      disabled={userData?.planId === p._id}
      className={`w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 rounded-lg transition-all duration-300 
       ${userData?.planId === p._id ? " cursor-not-allowed opacity-70" : ""}`}
    >
      {titleGenerator()}
    </button>
  </div>

  <Toaster position="bottom-center" reverseOrder={true} />
</div>
  );
};
export default PlanCard;
