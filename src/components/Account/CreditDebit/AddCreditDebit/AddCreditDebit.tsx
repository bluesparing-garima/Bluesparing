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
  const { creditDebitId } = useParams(); // Retrieve creditDebitId from URL params
  const location = useLocation(); // Get current location object
  const pathName = location.pathname.split("/"); // Split pathname into parts
  const isAdd = pathName[pathName.length - 1] === ADD; // Determine if it's an add operation based on URL

  // State to hold credit debit details
  const [creditDebitDetails, setCreditDebitDetails] = useState<
    ICreditDebitForm | undefined
  >(undefined);

  // Fetch credit/debit details by ID if editing existing record
  useEffect(() => {
    if (!isAdd && creditDebitId) {
      getCreditDebitByIdService({ header, creditDebitId })
        .then((creditDebitDetails) => {
          // Convert received data to form format using converter function
          const creditDebitVMToCreditDebitForm =
            convertICreditDebitVMToICreditDebitForm(creditDebitDetails);
          // Update state with fetched credit/debit details
          setCreditDebitDetails(creditDebitVMToCreditDebitForm);
        })
        .catch(async(error) => {
          const errRes = await error
          toast.error(errRes.message)
          
        });
    }
  }, [isAdd, creditDebitId]); // Run effect when isAdd or creditDebitId changes

  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 20 }}>
          {/* Title */}
          <Typography
            variant="h5"
            className="text-safekaroDarkOrange"
            gutterBottom
            display="inline"
          >
            {title}
          </Typography>

          {/* Breadcrumbs */}
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

          {/* Divider line */}
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />

          {/* Form component */}
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
