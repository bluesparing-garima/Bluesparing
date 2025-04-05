import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import AddCreditDebitForm from "./AddCreditDebitForm";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { ICreditDebitForm } from "../ICreditDebits";
import getCreditDebitByIdService from "../../../../api/CreditDebit/GetCreditDebitById/getCreditDebitByIdService";
import { convertICreditDebitVMToICreditDebitForm } from "../../../../api/CreditDebit/convertICreditDebitVMToICreditDebitForm";
import toast, { Toaster } from "react-hot-toast";
const AddCreditDebits = () => {
  const title = " Add Transaction";
  const { creditDebitId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [creditDebitDetails, setCreditDebitDetails] = useState<
    ICreditDebitForm | undefined
  >(undefined);
  useEffect(() => {
    if (!isAdd && creditDebitId) {
      getCreditDebitByIdService({ header, creditDebitId })
        .then((creditDebitDetails) => {
          const creditDebitVMToCreditDebitForm =
            convertICreditDebitVMToICreditDebitForm(creditDebitDetails);
          setCreditDebitDetails(creditDebitVMToCreditDebitForm);
        })
        .catch(async(error) => {
          const errRes = await error
          toast.error(errRes.message)
        });
    }
  }, [isAdd, creditDebitId]);
  return (
    <>
      <div className="md:p-7 p-2">
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
              to="/account/creditdebit"
              className="text-addButton font-bold text-sm"
            >
               Transactions /
            </Link>
            <span className="text-grey-600 text-sm">{title}</span>
          </Typography>
         
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
         
          <AddCreditDebitForm
            initialValues={{
              id: isAdd ? "" : creditDebitDetails?.id || "",
              accountCode: isAdd ? "" : creditDebitDetails?.accountCode || "",
              accountId: isAdd ? "" : creditDebitDetails?.accountId || "",
              accountType: isAdd
                ? "CutPay"
                : creditDebitDetails?.accountType || "",
              type: isAdd ? "" : creditDebitDetails?.type || "",
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
export default AddCreditDebits;
