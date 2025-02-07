import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { header } from "../../../context/constant";
import { IViewPolicy } from "../IPolicy";
import getPolicyWithPaymentService from "../../../api/Policies/GetPolicyWithPayment/getPolicyWithPaymentService";

// Make sure to import the correct component
import EditCommisonForm from "./editCommisonForm";

const EditCommison = () => {
  const title = "Edit Policy Commission";
  const { policyId } = useParams();
  const [policyDetails, setPolicyDetails] = useState<IViewPolicy | undefined>(
    undefined
  );

  useEffect(() => {
    if (policyId) {
      getPolicyWithPaymentService({ header, policyId })
        .then((policyDetails) => {
          setPolicyDetails(policyDetails.data);
        })
        .catch((error) => {
          console.error("Failed to fetch Policy details", error);
        });
    }
  }, [policyId]);

  const checkPolicyType = (type: string) => {
    const givenType = type.toLowerCase().trim();
    //tp-0,op-1 complete-2
    switch (givenType) {
      case "third party only/ tp":
        return 0;
      case "own damage only/ od":
        return 1;
      default:
        return 2;
    }
  };
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography
            variant="h5"
            className="text-safekaroDarkOrange"
            gutterBottom
            display="inline"
          >
            {title}
          </Typography>
          <Typography variant="h5" mb={2}>
            <Link to="/dashboard" className="text-addButton font-bold text-sm">
              Dashboard {" / "}
            </Link>
            <Link
              to="/policy/motorpolicies"
              className="text-addButton font-bold text-sm"
            >
              Policies /
            </Link>
            <span className="text-grey-600 w-full  text-sm">{title}</span>
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>

          <EditCommisonForm
            initialValues={{
              od: policyDetails?.od || 0,
              tp: policyDetails?.tp || 0,
              policyNumber: policyDetails?.policyNumber || "",
              policyId: policyDetails?.policyId! || "",
              partnerId: policyDetails?.partnerId! || "",
              bookingId: policyDetails?.bookingId! || "",
              netPremium: policyDetails?.netPremium || 0,
              finalPremium: policyDetails?.finalPremium || 0,
              payInODPercentage: policyDetails?.payInODPercentage || 0,
              payInTPPercentage: policyDetails?.payInTPPercentage || 0,
              payInODAmount: policyDetails?.payInODAmount || 0,
              payInTPAmount: policyDetails?.payInTPAmount || 0,
              payInCommission: policyDetails?.payInCommission || 0,
              payOutODPercentage: policyDetails?.payOutODPercentage || 0,
              payOutTPPercentage: policyDetails?.payOutTPPercentage || 0,
              payOutODAmount: policyDetails?.payOutODAmount || 0,
              payOutTPAmount: policyDetails?.payOutTPAmount || 0,
              payOutCommission: policyDetails?.payOutCommission || 0,
              payInAmount: policyDetails?.payInAmount || 0,
              payOutAmount: policyDetails?.payOutAmount || 0,
              payInPaymentStatus: policyDetails?.payInPaymentStatus || "",
              payOutPaymentStatus: policyDetails?.payOutPaymentStatus || "",
              payInBalance: policyDetails?.payInBalance || 0,
              payOutBalance: policyDetails?.payOutBalance || 0,
              policyType: checkPolicyType(policyDetails?.policyType || ""),
            }}
          />
        </Paper>
      </div>
    </>
  );
};

export default EditCommison;
