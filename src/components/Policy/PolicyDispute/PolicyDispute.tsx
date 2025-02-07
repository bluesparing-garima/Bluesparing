import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PolicyDetails from "./PolicyDetails";
import PolicyPaymentDetails from "./PolicyPaymentDetails";
import { PolicyDisputeData } from "./IPolicyDispute";
import ChatFeedBox from "./ChatFeedBox";
import GetDisputeDataService from "../../../api/Policies/GetDisputeData/GetDisputeDataService";
import toast from "react-hot-toast";
import PolicyDisputeWrapper from "./PolicyDisputeWrapper";
import UpdateDisputeService from "../../../api/Policies/UpdateDispute/UpdateDisputeService";
import useThrilling from "../../../Hooks/Throlling/useThrilling";

const PolicyDispute = () => {
  const location = useLocation();
  const r = location.state as any;
const navigate = useNavigate();
  const pType = checkPolicyType(r.policyType);
  const [messages, setMessages] = useState<PolicyDisputeData[]>([]);
  const [isDispute, setIsDispute] = useState(r.isDispute);
  const fetchData = useCallback(async () => {
    try {
      const res = await GetDisputeDataService(r.id || r._id || "");
      setMessages(res.data);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message || "error occurred fetching chats");
    }
  }, [r.id, r._id]);
 
  useThrilling(fetchData,r.isDispute ,10000);
  const handleDisputeData = (data: PolicyDisputeData) => {
    setMessages([...messages, data]);
  };
  const btnHandler = async () => {
    try {
      const payload = {
        policyNumber: r.policyNumber,
        isDispute: false,
      };
      const res = await UpdateDisputeService(payload);
      if (res) {
        navigate(-1)
        setIsDispute(false);

      }
    } catch (error) {}
  };
  function checkPolicyType(type: string) {
    const givenType = type.toLowerCase().trim();
    switch (givenType) {
      case "third party only/ tp":
        return 0;
      case "own damage only/ od":
        return 1;
      default:
        return 2;
    }
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <PolicyDisputeWrapper
        title="Policy Dispute"
        isDispute={isDispute}
        btnHandler={btnHandler}
      >
        <PolicyDetails
          policyNumber={r.policyNumber}
          productType={r.productType}
          policyType={r.policyType}
        />
        <PolicyPaymentDetails
          payOutPaymentStatus={r.payOutPaymentStatus || ""}
          payOutODAmount={pType !== 0 ? r.payOutODAmount : 0}
          payOutTPAmount={pType !== 1 ? r.payOutTPAmount : 0}
          payOutCommission={r.payOutCommission}
        />

        <ChatFeedBox
          disputeData={messages}
          policyId={r.id || r._id || ""}
          policyNumber={r.policyNumber}
          handleDisputeData={handleDisputeData}
          policyRemarks={`Remarks-${r.policyRemarks?r.policyRemarks:"No Remarks"}`}
          isDispute={isDispute}
        />
      </PolicyDisputeWrapper>
    </>
  );
};

export default PolicyDispute;
