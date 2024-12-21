import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";
import logo from "../../assets/Blue_Sparinglogo_ornage - Copy.png";
import toast, { Toaster } from "react-hot-toast";
import VerifyPaymentService from "../../api/Razorpay/VerifyPayment/VerifyPaymentService";
import InitiatePaymentService from "../../api/Razorpay/InitiatePayment/InitiatePaymentService";
interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

const PaymentForm: React.FC = () => {
  const onSubmit = async (data: any) => {
    const { amount, name, phone, email } = data;
    try {
      const response = InitiatePaymentService({ amount });
      const data = await response;

      if (data.success) {
        const { order_id } = data;
        const options = {
          key: process.env.REACT_APP_API_KEY,
          amount: Number(amount) * 100,
          currency: "INR",
          name: "Blue Sparing",
          description: "Payment for products/services",
          image: logo,
          order_id: order_id,
          handler: (response: RazorpayResponse) => {
            verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name,
            email: email,
            contact: phone,
          },
          theme: {
            color: "#F37254",
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      toast.error("Error initiating payment");
    }
  };

  const verifyPayment = async (
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ) => {
    try {
      const response = VerifyPaymentService({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      const data = await response;

      if (data.success) {
        toast.success("Payment verified successfully");
      } else {
        toast.error("Payment verification failed");
      }
    } catch (error) {
      toast.error("Error verifying payment");
    }
  };

  return (
    <div className="bg-blue-200 md:p-7 p-2">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography
          variant="h5"
          className="text-safekaroDarkOrange"
          gutterBottom
          display="inline"
        >
          Payment
        </Typography>
        <Typography variant="h5" mb={2}>
          <Link to="/dashboard" className="text-addButton font-bold text-sm">
            Dashboard {" / "}
          </Link>

          <span className="text-grey-600 text-sm">Payment</span>

          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, errors }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item lg={4} sm={12}>
                  <Field name="amount">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        label="Enter Amount"
                        type="number"
                        variant="outlined"
                        className="rounded-sm w-full"
                        size="small"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item lg={4} sm={12}>
                  <Field name="email">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        label="Enter Email"
                        type="email"
                        size="small"
                        variant="outlined"
                        className="rounded-sm w-full"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item lg={4} sm={12}>
                  <Field name="name">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        label="Enter Name"
                        type="text"
                        size="small"
                        variant="outlined"
                        className="rounded-sm w-full"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item lg={4} sm={12}>
                  <Field name="phone">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        label="Enter Phone Number"
                        type="number"
                        variant="outlined"
                        size="small"
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
                    Pay Now
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default PaymentForm;
