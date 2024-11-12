import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import React from "react";
import { Field, Form } from "react-final-form";
import { ADD, SafeKaroUser, header } from "../../../context/constant";
import { accountsPath } from "../../../sitemap";
import { IAccountForm } from "../IAccounts";
import { useLocation, useNavigate } from "react-router-dom";
import { FORM_ERROR, setIn } from "final-form";
import * as yup from "yup";
import addAccountService from "../../../api/Account/AddAccount/addAccountService";
import editAccountService from "../../../api/Account/EditAccount/editAccountService";
import toast, { Toaster } from "react-hot-toast";
export interface addAccountFormProps {
  initialValues: IAccountForm;
}
const AddAccountsForm = (props: addAccountFormProps) => {
  let { initialValues } = props;
  const navigate = useNavigate();
  const location = useLocation() as any;
  const pathName = location.pathname.split("/");
  const isAddEdit = pathName[pathName.length - 1] as string;
  const isAdd = isAddEdit === ADD;
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const onSubmit = (accountForm: IAccountForm, form: any) => {
    let accountHolderName = accountForm.accountHolderName!.toUpperCase();
    let bankName = accountForm.bankName!.substring(0, 3);
    let accountNumber = accountForm.accountNumber!.slice(-3);
    accountForm.accountCode = bankName + accountHolderName + accountNumber;
    accountForm.createdBy = userData.name;
    if (isAdd) {
      callAddAccountAPI(accountForm);
    } else {
      callEditAccountAPI(accountForm, accountForm.id!);
    }
  };
  const callAddAccountAPI = async (account: any) => {
    try {
      const accountResponse = await addAccountService({
        header,
        account,
      });
      if (accountResponse.status === "success") {
        navigate(accountsPath());
      } else {
        return { [FORM_ERROR]: `error` };
      }
    } catch (error:any) {
      const err = await error
      toast.error(err.message)
      return { [FORM_ERROR]: `error` };
    }
  };
  const callEditAccountAPI = async (account: any, accountId: string) => {
    try {
      const accountResponse = await editAccountService({
        header,
        account,
        accountId,
      });
      if (accountResponse.status === "success") {
        navigate(accountsPath());
      } else {
        return { [FORM_ERROR]: `error` };
      }
    } catch (error:any) {
      const err = await error
       toast.error(err.message)
      return { [FORM_ERROR]: `error` };
    }
  };
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
    bankName: yup
      .string()
      .min(3, "Bank Name must be at least 3 character")
      .nullable()
      .required("Bank Name is required"),
    amount: yup.number().nullable().required("Amount is required"),
    IFSCCode: yup.string().required("IFSC Code is required").nullable(),
  });
  const addValidate = validateFormValues(validationSchema);
  return (
    <>
      <React.Fragment>
        <Card>
          <CardContent>
            <Form
              mt={3}
              onSubmit={onSubmit}
              initialValues={initialValues}
              validate={addValidate}
              render={({ handleSubmit, submitError, submitting }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="accountNumber">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            id="accountNumber"
                            size="small"
                            fullWidth
                            label="Enter Account Number"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="accountHolderName">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            id="accountHolderName"
                            size="small"
                            fullWidth
                            label="Enter AccountHolder Name"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="bankName">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            id="bankName"
                            size="small"
                            fullWidth
                            label="Enter Bank Name"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="amount">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            id="amount"
                            size="small"
                            fullWidth
                            type="number"
                            label="Enter Amount"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="IFSCCode">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            id="IFSCCode"
                            size="small"
                            fullWidth
                            label="Enter IFSC Code"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} mt={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      {submitError && (
                        <div className="error text-safekaroDarkOrange">
                          {submitError}
                        </div>
                      )}
                      <Button variant="contained" type="submit">
                        submit
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
export default AddAccountsForm;
