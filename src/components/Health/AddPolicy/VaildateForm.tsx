import { setIn } from "final-form";
import * as yup from "yup";


export const addValidationSchema = yup.object({
  policyNumber: yup
    .string()
    .required("Policy Number is required")
    .min(1, "Policy Number must be at least 1 character")
    .max(100, "Policy Number cannot exceed 100 characters")
    .matches(/^[a-zA-Z0-9\/\-\s]*$/, "Policy Number contains invalid characters.")
    .test(
      "no-whitespace-between-numbers",
      "Whitespace is not allowed between numbers.",
      value => value ? !/\d\s+\d/.test(value) : true
    )
    .transform(value => value ? value.replace(/\s+/g, " ").trim() : value),

  policyType: yup.string().required("Policy Type is required"),
  caseType: yup.string().required("Case Type is required"),
  product: yup.string().required("Product is required"),
  companyId: yup.string().required("Company is required"),
  brokerId: yup.string().required("Broker is required"),
  partnerId: yup.string().required("Partner is required"),

  issueDate: yup.date().required("Start Date is required"),
  endDate: yup.date().required("End Date is required"),
  firstPurchasedDate: yup.date().required("First Purchased Date is required"),

  totalSumInsured: yup
    .number()
    .typeError("Total Sum Insured must be a number")
    .required("Total Sum Insured is required")
    .min(0, "Total Sum Insured cannot be negative"),

  netPremium: yup
    .number()
    .typeError("Net Premium must be a number")
    .required("Net Premium is required")
    .min(0, "Net Premium cannot be negative"),

  finalPremium: yup
    .number()
    .typeError("Final Premium must be a number")
    .required("Final Premium is required")
    .min(0, "Final Premium cannot be negative"),

  cumulativeBonus: yup
    .number()
    .typeError("Cumulative Bonus must be a number")
    .required("Cumulative Bonus is required"),

  accumulativeBonus: yup
    .number()
    .typeError("Accumulative Bonus must be a number")
    .required("Accumulative Bonus is required"),

  fullName: yup
    .string()
    .required("Full Name is required")
    .min(2, "Full Name must be at least 2 characters"),

  emailId: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits"),

  paymentMode: yup.string().required("Payment Mode is required"),

  paymentDetails: yup
    .string()
    .when("paymentMode", {
      is: (val: string) =>
        val?.toLowerCase() === "online" || val?.toLowerCase() === "check",
      then: schema => schema.required("Payment Details required"),
      otherwise: schema => schema.notRequired(),
    }),
});


  export const validateFormValues = (schema: any) => async (values: any) => {
    if (typeof schema === "function") {
      schema = schema();
    }
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (err: any) {
      const errors = err.inner.reduce((formError: any, innerError: any) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {}) as any;
      return errors;
    }
  };