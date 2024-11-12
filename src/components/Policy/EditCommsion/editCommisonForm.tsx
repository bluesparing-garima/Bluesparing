/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { header } from "../../../context/constant";
import { motorPolicyPath } from "../../../sitemap";
import * as yup from "yup";
import { setIn } from "final-form";
import { IPolicyPayment } from "../IPolicy";
import { Field, Form } from "react-final-form";
import editMotorPolicyPaymentService from "../../../api/MotorPolicyPayment/EditMotorPolicyPayment/editMotorPolicyPaymentService";
import toast, { Toaster } from "react-hot-toast";

export interface AddPolicyFormProps {
  initialValues: IPolicyPayment;
}

function editCommisonForm(props: AddPolicyFormProps) {
  const navigate = useNavigate();
  const { initialValues } = props;

  const onSubmit = async (policyForm: IPolicyPayment) => {
    const ODAmount = initialValues?.od!;
    const TPAmount = initialValues?.tp!;

    ///---------------------------Pay In----------------------///
    //value from Form
    const payInODPercentage = policyForm?.payInODPercentage!;
    const payInTPPercentage = policyForm?.payInTPPercentage!;

    //PayINCalcuation
    let calculatedPayInODPercentage: number =
      (ODAmount * payInODPercentage) / 100;
    let calculatedPayInTPPercentage: number =
      (TPAmount * payInTPPercentage) / 100;

    //Round off
    calculatedPayInODPercentage = Math.round(calculatedPayInODPercentage);
    calculatedPayInTPPercentage = Math.round(calculatedPayInTPPercentage);
    policyForm.payInODAmount = calculatedPayInODPercentage;
    policyForm.payInTPAmount = calculatedPayInTPPercentage;

    // Calculate the sum of percentages
    let payInCommission =
      calculatedPayInODPercentage + calculatedPayInTPPercentage;
    payInCommission = Math.round(payInCommission);
    policyForm.payInCommission = payInCommission;

    ///---------------------------Pay Out----------------------///

    //value from Form
    const payOutODPercentage = policyForm?.payOutODPercentage!;
    const payOutTPPercentage = policyForm?.payOutTPPercentage!;

    //PayOutCalcuation
    let calculatedPayOutODPercentage: number =
      (ODAmount * payOutODPercentage) / 100;
    let calculatedPayOutTPPercentage: number =
      (TPAmount * payOutTPPercentage) / 100;

    calculatedPayOutODPercentage = Math.round(calculatedPayOutODPercentage);
    calculatedPayOutTPPercentage = Math.round(calculatedPayOutTPPercentage);
    policyForm.payOutODAmount = calculatedPayOutODPercentage;
    policyForm.payOutTPAmount = calculatedPayOutTPPercentage;

    let payOutCommission =
      calculatedPayOutODPercentage + calculatedPayOutTPPercentage;
    // Round to two decimal places and convert to number
    payOutCommission = Math.round(payOutCommission);
    policyForm.payOutCommission = payOutCommission;

    ////------------------Bind Other Policy Details---------------------//
    policyForm.od = initialValues?.od!;
    policyForm.tp = initialValues?.tp!;
    policyForm.policyNumber = initialValues?.policyNumber!;
    policyForm.partnerId = initialValues?.partnerId!;
    policyForm.bookingId = initialValues?.bookingId!;
    policyForm.bookingId = initialValues?.bookingId!;
    policyForm.netPremium = initialValues?.netPremium!;
    policyForm.finalPremium = initialValues?.finalPremium!;
    policyForm.policyId = initialValues?.policyId!;
    policyForm.updatedBy = "Admin";

    try {
      const newPayment = await editMotorPolicyPaymentService({
        header,
        policyPayment: policyForm,
      });
      if (newPayment.status === "success") {
        navigate(motorPolicyPath());
      }
    } catch (err: any) {
      const errObj = await err;
      toast.error(errObj.message);
    }
  };

  // To be passed to React Final Form
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
    payInODPercentage: yup.number().required("Pay In OD Premium is required"),
    payInTPPercentage: yup.number().required("Pay In TP Premium is required"),
    payOutODPercentage: yup.number().required("Pay out OD Premium is required"),
    payOutTPPercentage: yup.number().required("Pay out TP Premium is required"),
  });

  const validate = validateFormValues(validationSchema);
  return (
    <>
      <Card>
        <CardContent>
          <Grid container mt={2}>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                className="text-addButton w-full"
                component="h2"
                sx={{ mb: 0 }}
              >
                Policy Number
              </Typography>
              <Typography variant="body1" gutterBottom>
                {initialValues?.policyNumber}
              </Typography>
            </Grid>
          </Grid>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
            render={({ handleSubmit, submitting, errors }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <Typography
                      variant="subtitle1"
                      className="text-safekaroDarkOrange"
                      gutterBottom
                      display="inline"
                    >
                      Pay In Values
                    </Typography>
                  </Grid>
                  <Grid item sm={6}>
                    <Field name="payInODPercentage">
                      {({ input, meta }) => (
                        <TextField
                          {...input}
                          label="Enter Pay In OD Percentage"
                          variant="outlined"
                          type="number"
                          className="rounded-sm w-full"
                          error={meta.touched && Boolean(meta.error)}
                          helperText={meta.touched && meta.error}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item sm={6}>
                    <Field name="payInTPPercentage">
                      {({ input, meta }) => (
                        <TextField
                          {...input}
                          type="number"
                          label="Enter Pay In TP Percentage"
                          variant="outlined"
                          className="rounded-sm w-full"
                          error={meta.touched && Boolean(meta.error)}
                          helperText={meta.touched && meta.error}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item sm={12}>
                    <Typography
                      variant="subtitle1"
                      className="text-safekaroDarkOrange"
                      gutterBottom
                      display="inline"
                    >
                      Pay Out Values
                    </Typography>
                  </Grid>
                  <Grid item sm={6}>
                    <Field name="payOutODPercentage">
                      {({ input, meta }) => (
                        <TextField
                          {...input}
                          label="Enter PayOut OD Percentage"
                          variant="outlined"
                          type="number"
                          className="rounded-sm w-full"
                          error={meta.touched && Boolean(meta.error)}
                          helperText={meta.touched && meta.error}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item sm={6}>
                    <Field name="payOutTPPercentage">
                      {({ input, meta }) => (
                        <TextField
                          {...input}
                          type="number"
                          label="Enter PayOut TP Percentage"
                          variant="outlined"
                          className="rounded-sm w-full"
                          error={meta.touched && Boolean(meta.error)}
                          helperText={meta.touched && meta.error}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      disabled={submitting}
                      variant="contained"
                      color="primary"
                      className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                    >
                      Update Policy
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </CardContent>
      </Card>

      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default editCommisonForm;
