import  { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import AddAccountsForm from "./AddAccountsForm";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../context/constant";
import { IAccountForm } from "../IAccounts";
import getAccountByIdService from "../../../api/Account/GetAccountById/getAccountByIdService";
import { convertIAccountVMToIAccountForm } from "../../../api/Account/convertIAccountVMToIAccountForm";
import toast, { Toaster } from "react-hot-toast";
const AddAccounts = () => {
  const title = "Add Account Details";
  const { accountId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [accountDetails, setAccountDetails] = useState<
    IAccountForm | undefined
  >(undefined);
  useEffect(() => {
    if (!isAdd && accountId) {
      getAccountByIdService({ header, accountId })
        .then((accountDetails) => {
          const accountVMToAccountForm =
            convertIAccountVMToIAccountForm(accountDetails);
          setAccountDetails(accountVMToAccountForm);
        })
        .catch(async(error) => {
          const err = await error
          toast.error(err.message)
          console.error("Failed to fetch team details", error);
        });
    }
  }, [isAdd, accountId]);
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
            <Link to="/account" className="text-addButton font-bold text-sm">
              Accounts /
            </Link>
            <span className="text-grey-600 text-sm">{title}</span>
           
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <AddAccountsForm
            initialValues={{
              id: isAdd ? "" : accountDetails?.id || "",
              accountCode: isAdd ? "" : accountDetails?.accountCode || "",
              accountHolderName: isAdd
                ? ""
                : accountDetails?.accountHolderName || "",
              accountNumber: isAdd ? "" : accountDetails?.accountNumber || "",
              amount: isAdd ? 0 : accountDetails?.amount || 0,
              IFSCCode: isAdd ? "" : accountDetails?.IFSCCode || "",
              bankName: isAdd ? "" : accountDetails?.bankName || "",
              isActive: true,
              createdBy: "",
            }}
          />
        </Paper>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};
export default AddAccounts;
