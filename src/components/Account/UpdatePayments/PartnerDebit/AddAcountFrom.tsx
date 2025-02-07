import React, { FC, useState } from "react";
import { AddAccountProps } from "../IUpdatePayments";
import * as yup from "yup";
import { header, SafeKaroUser } from "../../../../context/constant";
import { IAccountForm } from "../../IAccounts";
import toast, { Toaster } from "react-hot-toast";
import addAccountService from "../../../../api/Account/AddAccount/addAccountService";
import { setIn } from "final-form";
import { Field, Form } from "react-final-form";
import { Button, Card, CardContent, Grid } from "@mui/material";
import DynamicTextField from "../../../../utils/ui/DynamicTextField";

const AddAccountFrom: FC<AddAccountProps> = ({
  partnerId,
  handleAddAccountFlag,
  handleAccountUpdate,
}) => {
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [isLoading,setIsLoading] = useState(false)
  const validateFormValues = (schema: any) => async (values: any) => {
    if (typeof schema === "function") {
      schema = schema();
    }
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (err: any) {
      const errors = err.inner.reduce((formError: any, innerError: any) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {});
      return errors;
    }
  };
  const onSubmit = (accountForm: IAccountForm, form: any) => {
    let accountHolderName = accountForm.accountHolderName!.toUpperCase();
    let bankName = accountForm.bankName!.substring(0, 3);
    let accountNumber = accountForm.accountNumber!.slice(-3);
    accountForm.accountCode = bankName + accountHolderName + accountNumber;
    accountForm.createdBy = userData.name;
    accountForm["roleName"] = "Partner";
    accountForm.partnerId = partnerId;

    const payload: IAccountForm = { ...accountForm };
    if (payload.partner !== undefined) {
      delete payload.partner;
    }
    callAddAccountAPI(payload);
  };
  const callAddAccountAPI = async (account: any) => {
    try {
      setIsLoading(true)
      const accountResponse = await addAccountService({
        header,
        account,
      });
      if (accountResponse.status === "success") {
        const updatedData = accountResponse.data;
        handleAccountUpdate(updatedData);
        toast.success("account Added Successfully");
        handleAddAccountFlag(false);
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }finally{
      setIsLoading(false)
    }
  };

  const validationSchema = yup.object().shape({
    accountNumber: yup
      .string()
      .required("Account Number is required")
      .min(1, "Account Number must be at least 1 character"),
    accountHolderName: yup
      .string()
      .nullable()
      .min(3, "Account Holder Name must be at least 3 character")
      .required("Account Holder Name is required"),
    pan: yup.string().nullable().required("pan number is required"),
    bankName: yup
      .string()
      .min(3, "Bank Name must be at least 3 character")
      .nullable()
      .required("Bank Name is required"),
    IFSCCode: yup.string().required("IFSC Code is required").nullable(),
  });
  const addValidate = validateFormValues(validationSchema);

  return (
    <>
      <React.Fragment>
        <Card className="my-3">
          <CardContent>
            <Form
              mt={3}
              onSubmit={onSubmit}
              validate={addValidate}
              render={({ handleSubmit, submitError, submitting }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <DynamicTextField
                      name="accountNumber"
                      label="Enter Account Number"
                      gridProps={{ lg: 4, md: 4, sm: 6, xs: 12 }}
                    />
                    <DynamicTextField
                      name="accountHolderName"
                      label="Enter Account Holder Name"
                      gridProps={{ lg: 4, md: 4, sm: 6, xs: 12 }}
                    />
                    <DynamicTextField
                      name="pan"
                      label="Enter Pan Number"
                      gridProps={{ lg: 4, md: 4, sm: 4, xs: 12 }}
                    />

                    <DynamicTextField
                      name="bankName"
                      label="Enter Bank Name"
                      gridProps={{ lg: 4, md: 4, sm: 6, xs: 12 }}
                    />
                    <DynamicTextField
                      name="IFSCCode"
                      label="Enter IFSCCode"
                      gridProps={{ lg: 4, md: 4, sm: 6, xs: 12 }}
                    />
                  </Grid>
                  <Grid container spacing={2} mt={2}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      {submitError && (
                        <div className="error text-safekaroDarkOrange">
                          {submitError}
                        </div>
                      )}
                      <Button variant="contained" type="submit" disabled={isLoading}>
                      {isLoading ? "Submitting..." : "Submit"}
                       
                      </Button>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      {submitError && (
                        <div className="error text-safekaroDarkOrange">
                          {submitError}
                        </div>
                      )}
                      <Button
                        onClick={() => handleAddAccountFlag(false)}
                        variant="contained"
                        type="button"
                        color="error"
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </CardContent>
        </Card>
      </React.Fragment>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default AddAccountFrom;
