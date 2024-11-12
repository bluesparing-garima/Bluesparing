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
  const { creditDebitId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
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
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 20 }}>
         
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
                className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                onClick={handleClickDistribution}
              >
                Distribution Change
              </Button>
            </div>
           
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
