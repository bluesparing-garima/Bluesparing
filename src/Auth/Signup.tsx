import logo from "../assets/login_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { FormProps, ISignUp } from "./IAuth";
import {
  Autocomplete,
  Button,
  Dialog,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { header, SESSION_USER } from "../context/constant";
import fetchInterceptor, { FetchOptions } from "../utils/fetchInterceptor ";
import useSubscription from "../Hooks/Subscription/useSubscription";
import useGetRoles from "../Hooks/Role/useGetRoles";
import { storeInSessionStorage } from "../utils/HandleStore";
import generateFormData from "../utils/generateFromData";
import { useEffect, useState } from "react";
import OverlayError from "../utils/ui/OverlayError";
import OverlayLoader from "../utils/ui/OverlayLoader";

const Signup = () => {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [subsData] = useSubscription();
  const [roles] = useGetRoles({ header });
  // const [termsAccepted, setTermsAccepted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const findRoleIdByName = (name: string) => {
    const temp = name.toLowerCase();
    const roleObj = roles.find((ele) => ele.roleName?.toLowerCase() === temp);
    if (roleObj) {
      return roleObj?._id;
    } else {
      return "";
    }
  };
  const validate = (values: FormProps) => {
    const errors: Partial<FormProps> = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(values.phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };
  useEffect(() => {
    // Check if user accepted terms from localStorage
    if (localStorage.getItem("termsAccepted") === "true") {
      setTermsAccepted(true);
    }
  }, []);

  const handleSignup = () => {
    if (!termsAccepted) {
      alert("You must accept the Terms and Conditions to sign up.");
      return;
    }
    console.log("Signing up with:", email, password);
  };
  const onSubmit = async (signUpData: FormProps) => {
    const { plans, companyLogo, profileImage, gender } = signUpData;
    let payload: ISignUp = {
      name: signUpData.name,
      email: signUpData.email,
      role: "admin",
      password: signUpData.password,
      phoneNumber: signUpData.phoneNumber,
      confirmPassword: signUpData.confirmPassword,
      partnerCode: signUpData.partnerCode,
      file: signUpData.file,
      isActive: false,
      planName: plans.planName,
      planId: plans._id,
      joiningDate: Date.now().toString(),
      roleId: findRoleIdByName("Admin"),
      companyLogo,
      profileImage,
      gender: gender.toLowerCase(),
    };
    try {
      setIsLoading(true);
      setErrMsg("");
      const url = "/api/user/register";
      const options: FetchOptions = {
        method: "POST",
        body: generateFormData(payload),
      };
      const responseData = await fetchInterceptor<any>(url, options);

      if (responseData.user.role.toLowerCase().trim() === "partner") {
        navigate("/");
        return;
      }
      if (responseData.status === "success") {
        const data = {
          name: responseData.user.name,
          _id: responseData.user._id,
          phone: responseData.user.phoneNumber,
          email: responseData.user.email,
          role: responseData.user.role,
        };
        storeInSessionStorage(SESSION_USER, data);
        navigate("/plan-details");
      } else {
        setErrMsg("Failed to Register");
      }
    } catch (error: any) {
      const err = await error;
      setErrMsg(err.message || "Fail to signup");
    } finally {
      setIsLoading(false);
    }
    return { [FORM_ERROR]: "Sign up failed. Try again!" };
  };
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-blue-400">
        <div className="max-w-[90vw] h-auto bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-indigo-100 rounded-tl-lg rounded-bl-lg text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-6/12 p-3 sm:p-2">
            <div>
              <img src={logo} className="w-56 mx-auto mt-2" alt="" />
            </div>
            <div className="mt-1 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
              <div className="w-full flex-1">
                <div className="mb-3 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"></div>
                </div>
                <div className="mx-auto max-w-full px-20">
                  <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitError }) => (
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <label
                              htmlFor="Plan"
                              className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                              Select Plans
                            </label>
                            <Field name="plans">
                              {({ input, meta }) => (
                                <FormControl fullWidth size="small">
                                  <Autocomplete
                                    {...input}
                                    id="plans"
                                    value={input.value || null}
                                    options={subsData}
                                    getOptionLabel={(option) =>
                                      typeof option === "string"
                                        ? option
                                        : option?.planName || ""
                                    }
                                    onChange={(event, newValue) => {
                                      input.onChange(
                                        newValue ? newValue : null
                                      );
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        size="small"
                                        className="rounded-sm"
                                        error={meta.touched && !!meta.error}
                                        helperText={meta.touched && meta.error}
                                      />
                                    )}
                                  />
                                </FormControl>
                              )}
                            </Field>
                          </Grid>
                          <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="mb-1">
                              <label
                                htmlFor="email"
                                className="mb-1 block text-base font-medium text-[#07074D]"
                              >
                                Email
                              </label>
                              <Field name="email">
                                {({ input, meta }) => (
                                  <div>
                                    <input
                                      {...input}
                                      type="email"
                                      placeholder="Email"
                                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {meta.error && meta.touched && (
                                      <span className="text-safekaroDarkOrange">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Field>
                            </div>
                          </Grid>
                          <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="mb-1">
                              <label
                                htmlFor="name"
                                className="mb-1 block text-base font-medium text-[#07074D]"
                              >
                                Name
                              </label>
                              <Field name="name">
                                {({ input, meta }) => (
                                  <div>
                                    <input
                                      {...input}
                                      type="text"
                                      placeholder="Name"
                                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {meta.error && meta.touched && (
                                      <span className="text-safekaroDarkOrange">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Field>
                            </div>
                          </Grid>
                          <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="mb-1">
                              <label
                                htmlFor="phoneNumber"
                                className="mb-1 block text-base font-medium text-[#07074D]"
                              >
                                Phone Number
                              </label>
                              <Field name="phoneNumber">
                                {({ input, meta }) => (
                                  <div>
                                    <input
                                      {...input}
                                      type="number"
                                      placeholder="Phone Number"
                                      maxLength={10}
                                      onInput={(e) => {
                                        e.currentTarget.value =
                                          e.currentTarget.value
                                            .replace(/\D/g, "")
                                            .slice(0, 10);
                                        input.onChange(e.currentTarget.value);
                                      }}
                                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {meta.error && meta.touched && (
                                      <span className="text-safekaroDarkOrange">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Field>
                            </div>
                          </Grid>
                          <Grid item lg={6} md={6} sm={6} xs={12}>
                            <label
                              htmlFor="role"
                              className="mb-1 block text-base font-medium text-[#07074D]"
                            >
                              Gender
                            </label>
                            <Field name="gender">
                              {({ input, meta }) => (
                                <FormControl
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  error={meta.touched && Boolean(meta.error)}
                                >
                                  <Select {...input} input={<OutlinedInput />}>
                                    {["Male", "Female", "Other"].map(
                                      (option) => (
                                        <MenuItem
                                          className="capitalized"
                                          key={option}
                                          value={option}
                                        >
                                          {option}
                                        </MenuItem>
                                      )
                                    )}
                                  </Select>
                                  {meta.touched && meta.error && (
                                    <FormHelperText>
                                      {meta.error}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              )}
                            </Field>
                          </Grid>
                          <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="mb-1">
                              <label
                                htmlFor="password"
                                className="mb-1 block text-base font-medium text-[#07074D]"
                              >
                                Password
                              </label>
                              <Field name="password">
                                {({ input, meta }) => (
                                  <div>
                                    <input
                                      {...input}
                                      type="password"
                                      placeholder="Password"
                                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {meta.error && meta.touched && (
                                      <span className="text-safekaroDarkOrange">
                                        {meta.error}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Field>
                            </div>
                          </Grid>

                          <Grid item lg={6} md={6} xs={12}>
                            <FormLabel className="mb-1 block text-base font-satoshi font-medium text-[#07074D]">
                              Profile Image
                            </FormLabel>
                            <Field name="profileImage">
                              {({ input, meta }) => (
                                <div>
                                  <Grid item lg={12} xs={12}>
                                    <input
                                      type="file"
                                      style={{
                                        border: "1px solid #c4c4c4",
                                        padding: "5px",
                                        width: "100%",
                                        borderRadius: "5px",
                                      }}
                                      onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        const file = event.target.files
                                          ? event.target.files[0]
                                          : null;
                                        input.onChange(file);
                                      }}
                                    />
                                    {meta.touched && meta.error && (
                                      <span style={{ color: "red" }}>
                                        {meta.error}
                                      </span>
                                    )}
                                  </Grid>
                                </div>
                              )}
                            </Field>
                          </Grid>
                          <Grid item lg={6} md={6} xs={12}>
                            <FormLabel className="mb-1 block text-base font-satoshi font-medium text-[#07074D]">
                              Company Logo
                            </FormLabel>
                            <Field name="companyLogo">
                              {({ input, meta }) => (
                                <div>
                                  <Grid item lg={12} xs={12}>
                                    <input
                                      type="file"
                                      style={{
                                        border: "1px solid #c4c4c4",
                                        padding: "5px",
                                        width: "100%",
                                        borderRadius: "5px",
                                      }}
                                      onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        const file = event.target.files
                                          ? event.target.files[0]
                                          : null;
                                        input.onChange(file);
                                      }}
                                    />
                                    {meta.touched && meta.error && (
                                      <span style={{ color: "red" }}>
                                        {meta.error}
                                      </span>
                                    )}
                                  </Grid>
                                </div>
                              )}
                            </Field>
                          </Grid>
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            {submitError && (
                              <div className="error text-safekaroDarkOrange">
                                {submitError}
                              </div>
                            )}
                          </Grid>
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            {/* Terms and Conditions Checkbox */}
                            <div className="flex items-center mb-2">
                              <input
                                type="checkbox"
                                id="termsCheckbox"
                                checked={termsAccepted}
                                onChange={(e) =>
                                  setTermsAccepted(e.target.checked)
                                }
                                className="w-4 h-4 mr-2 cursor-pointer"
                              />
                              <label
                                htmlFor="termsCheckbox"
                                className="text-sm text-[#443627]"
                              >
                                I agree to the{" "}
                                <button
                                  type="button"
                                  onClick={() => setIsModalOpen(true)}
                                  className="text-[#E9762B] underline"
                                >
                                  Terms and Conditions
                                </button>
                              </label>
                            </div>

                            {/* Signup Button */}
                            <Button
                              type="submit"
                              className={`mt-2 tracking-wide font-semibold w-full bg-gradient-to-r from-[#E9762B] to-[#EDB65C] text-[#443627] transition-all duration-300 px-4 py-3 rounded hover:from-[#EDB65C] hover:to-[#E9762B] active:scale-90 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${
                                !termsAccepted
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={isLoading || !termsAccepted}
                            >
                              {isLoading ? (
                                "Submitting"
                              ) : (
                                <>
                                  <svg
                                    className="w-6 h-6 -ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                  </svg>
                                  <span className="ml-3">Sign Up</span>
                                </>
                              )}
                            </Button>

                            {/* Terms and Conditions Modal */}
                            {isModalOpen && (
                              <Dialog
                                open={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                              >
                                <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg border-2 border-[#E9762B]">
                                  <h2 className="text-2xl font-bold text-[#E9762B] border-b-2 border-[#EDB65C] pb-3 text-center">
                                    Terms and Conditions
                                  </h2>
                                  <div className="mt-4 text-sm text-gray-700 max-h-72 overflow-y-auto space-y-4 p-4 border border-[#EDB65C] rounded-md bg-[#FFF9F2]">
                                    <p>
                                      <strong className="text-[#E9762B]">
                                        1. Introduction
                                      </strong>
                                      <br />
                                      Bluesparing provides insurance management
                                      software to streamline policy
                                      administration, claims processing, and
                                      customer interactions. These terms apply
                                      to all users.
                                    </p>

                                    <p>
                                      <strong className="text-[#E9762B]">
                                        2. Account and Access
                                      </strong>
                                      <br />
                                      You must register an account to access
                                      certain features. You are responsible for
                                      maintaining the confidentiality of your
                                      account credentials.
                                    </p>

                                    <p>
                                      <strong className="text-[#E9762B]">
                                        3. Subscription and Payment
                                      </strong>
                                      <br />
                                      Access may require a subscription.
                                      Payments are due as per the agreed billing
                                      cycle.
                                    </p>

                                    <p>
                                      <strong className="text-[#E9762B]">
                                        4. Permitted Use
                                      </strong>
                                      <br />
                                      Users may not modify, copy, distribute, or
                                      resell the software without authorization.
                                    </p>

                                    <p>
                                      <strong className="text-[#E9762B]">
                                        5. Data Privacy and Security
                                      </strong>
                                      <br />
                                      Bluesparing collects and processes data in
                                      accordance with our Privacy Policy.
                                    </p>

                                    <p>
                                      <strong className="text-[#E9762B]">
                                        6. Service Availability and Changes
                                      </strong>
                                      <br />
                                      We strive to maintain 99.9% uptime but may
                                      perform maintenance.
                                    </p>

                                    <p>
                                      <strong className="text-[#E9762B]">
                                        7. Termination of Service
                                      </strong>
                                      <br />
                                      Non-compliance or failure to pay fees may
                                      result in termination.
                                    </p>

                                    <p>
                                      <strong className="text-[#E9762B]">
                                        8. Limitation of Liability
                                      </strong>
                                      <br />
                                      Bluesparing is not responsible for
                                      financial losses from misuse.
                                    </p>

                                    <p>
                                      <strong className="text-[#E9762B]">
                                        9. Governing Law
                                      </strong>
                                      <br />
                                      These Terms are governed by the laws of
                                      [Insert Jurisdiction].
                                    </p>

                                    <p>
                                      <strong className="text-[#E9762B]">
                                        10. Contact Us
                                      </strong>
                                      <br />
                                      For support, contact
                                      support@bluesparing.com.
                                    </p>
                                  </div>
                                  <div className="mt-6 flex justify-center">
                                    <button
                                      onClick={() => setIsModalOpen(false)}
                                      className="bg-[#E9762B] text-white px-6 py-3 rounded-lg hover:bg-[#EDB65C] transition-all duration-200 shadow-md font-semibold"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </Dialog>
                            )}
                          </Grid>
                        </Grid>
                      </form>
                    )}
                  />
                </div>

                <div className="my-4 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    If you have already account{" "}
                    <a href="/#/" className="text-safekaroDarkOrange">
                      Sign In
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {errMsg && (
          <OverlayError
            title="Error"
            onClose={() => setErrMsg("")}
            msg={errMsg}
          />
        )}
        {isLoading && <OverlayLoader />}
      </div>
    </>
  );
};
export default Signup;
