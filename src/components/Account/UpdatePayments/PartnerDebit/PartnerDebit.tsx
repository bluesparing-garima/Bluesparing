import { useEffect, useState } from "react";
import { Typography, Paper, Button } from "@mui/material";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";

import getCreditDebitByIdService from "../../../../api/CreditDebit/GetCreditDebitById/getCreditDebitByIdService";
import { convertICreditDebitVMToICreditDebitForm } from "../../../../api/CreditDebit/convertICreditDebitVMToICreditDebitForm";
import PartnerDebitForm from "./PartnerDebitForm";
import { ICreditDebitForm } from "../../CreditDebit/ICreditDebits";
import { accountsPartnerPaymentPath } from "../../../../sitemap";
import toast, { Toaster } from "react-hot-toast";
const PartnerDebit = () => {
  const title = "Partner Payout Distribution";
  const { creditDebitId } = useParams(); // Retrieve creditDebitId from URL params
  const location = useLocation(); // Get current location object
  const pathName = location.pathname.split("/"); // Split pathname into parts
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [creditDebitDetails, setCreditDebitDetails] = useState<
    ICreditDebitForm | undefined
  >(undefined);
  const navigate = useNavigate();
  const handleClickDistribution = () => {
    navigate(accountsPartnerPaymentPath());
  };
  useEffect(() => {
    if (!isAdd && creditDebitId) {
      getCreditDebitByIdService({ header, creditDebitId })
        .then((creditDebitDetails) => {
          const creditDebitVMToCreditDebitForm =
            convertICreditDebitVMToICreditDebitForm(creditDebitDetails);
          setCreditDebitDetails(creditDebitVMToCreditDebitForm);
        })
        .catch(async(error) => {
          const err = await error
          toast.error(err.message)
         
        });
    }
  }, [isAdd, creditDebitId]);

  return (
    <>
      <div className=" md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 20 }}>
          {/* Title */}
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  className="text-safekaroDarkOrange"
                  gutterBottom
                  display="inline"
                >
                  {title}
                </Typography>
              </div>
              <Button
  type="button"
  className="btnGradient text-black px-4 py-2.5 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
  onClick={handleClickDistribution}
>
  Distribution Change
</Button>

            </div>
            {/* Divider */}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          
          <PartnerDebitForm
            initialValues={{
              id: isAdd ? "" : creditDebitDetails?.id || "",
              accountCode: isAdd ? "" : creditDebitDetails?.accountCode || "",
              accountId: isAdd ? "" : creditDebitDetails?.accountId || "",
              accountType: "PayOut",
              type: "Debit",
              amount: isAdd ? 0 : creditDebitDetails?.amount || 0,
              brokerId: isAdd ? "" : creditDebitDetails?.brokerId || "",
              brokerName: isAdd ? "" : creditDebitDetails?.brokerName || "",
              partnerId: isAdd ? "" : creditDebitDetails?.partnerId || "",
              partnerName: isAdd ? "" : creditDebitDetails?.partnerName || "",
              startDate: isAdd ? "" : creditDebitDetails?.startDate || "",
              distributedDate: isAdd
                ? ""
                : creditDebitDetails?.distributedDate || "",
              endDate: isAdd ? "" : creditDebitDetails?.endDate || "",
              policyNumber: isAdd ? "" : creditDebitDetails?.policyNumber || "",
              remarks: isAdd ? "" : creditDebitDetails?.remarks || "",
              isActive: true,
              createdBy: "",
            }}
          />
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default PartnerDebit;
