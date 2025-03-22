import logo from "../assets/login_logo.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { Button, Grid } from "@mui/material";
import { FORM_ERROR } from "final-form";
import { ISignIn } from "./IAuth";
import { SafeKaroUser, header } from "../context/constant";
import { setTokens } from "../Hooks/Tokens/useToken";
import fetchInterceptor, { FetchOptions } from "../utils/fetchInterceptor ";

import { useEffect, useState } from "react";
import useDebounce from "../Hooks/Debounce/useDebounce";
import SendOtpService from "../api/Client/SendOtp/SendOtpService";
import VerifyOtpService from "../api/Client/VerifyOtp/VerifyOtpService";
import OverlayError from "../utils/ui/OverlayError";
import OverlayLoader from "../utils/ui/OverlayLoader";
const Signin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get("mode");
  const mode = queryValue ? queryValue : "normal";
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const debouncedEmail = useDebounce(email, 1000);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validate = (values: ISignIn) => {
    const errors: Partial<ISignIn> = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const onClose = () => {
    setErrMsg("")
  }
  const isValidEmail = (email: string): boolean => {
    return emailRegex.test(email);
  };

  const roleDashboardMapping: { [key: string]: string } = {
    admin: "/dashboard",
    operation: "/operationdashboard",
    booking: "/bookingdashboard",
    account: "/accountdashboard",
    rm: "/rm/dashboard",
    hr: "/hr/dashboard",
    it: "/it/dashboard",
    default: "/partnerdashboard",
  };
  const onSubmit = async (signInData: ISignIn) => {
    if (mode === 'client') {
      await verifyOtp(debouncedEmail, otp);
    } else {
      try {
        setIsLoading(true);
        setErrMsg("")
        const url = "/api/user/login";
        const options: FetchOptions = {
          headers: header,
          method: "POST",
          body: JSON.stringify(signInData),
        };
        const responseData = await fetchInterceptor<any>(url, options);
        if (responseData.role.toLowerCase().trim() === "superadmin") {
          setErrMsg("super admin can't login ")
          return;
        }
        if (responseData.status === "success") {
          let loginData: SafeKaroUser = {
            ...responseData,
          };
          if (loginData.accessToken && loginData.refreshToken) {
            setTokens(loginData.accessToken!, loginData.refreshToken!);
          }

          localStorage.setItem("user", JSON.stringify(loginData));
          if (loginData.policyCount! <= 0) {
            navigate("/plan-exhausted");
            return;
          }
          let role = responseData.role.toLowerCase();
          if (role === "relationship manager") {
            role = "rm";
          }
          if (
            !responseData.transactionStatus &&
            responseData.role.toLowerCase().trim() === "admin"
          ) {
            navigate("/update-plan");
            return;
          }
          navigate(roleDashboardMapping[role] || roleDashboardMapping.default);
        }
      } catch (error: any) {
        const err = await error;
      
        setErrMsg(err.message)

      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value)
  }

  const sendOtpReq = async (mailId: string) => {
    if (!isValidEmail(mailId)) {
      return "invalid email format"
    }
    try {
      setIsLoading(true)
      setErrMsg("")
      const res = await SendOtpService(mailId);
      if (res.status === "success") {
        setShowOtpBox(true)
      }
    } catch (error: any) {
      const err = await error;
      setErrMsg(err.message || "Error while sending otp!Please try Again")

    } finally {
      setIsLoading(false)
    }
  }

  const verifyOtp = async (email: string, otp: string) => {
    try {
      setIsLoading(true)
      setErrMsg("")
      const res = await VerifyOtpService(email, otp);
      if (res.status === "success") {
        navigate("client", { state: res.data });
      }
    } catch (error: any) {
      setErrMsg(error.message || "Error in verify Otp")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (debouncedEmail && isValidEmail(debouncedEmail)) {
      sendOtpReq(debouncedEmail).then((data) => {
        setShowOtpBox(true);
      }).catch(() => {
        setShowOtpBox(false);
      });
    }
  }, [debouncedEmail]);

  const handleOtp = (e: any) => {
    setOtp(e.target.value)
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-400">
      <div className="max-w-[90vw] h-[90vh] bg-white shadow rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-6/12 p-3 sm:p-6">
          <picture>
            <source srcSet={logo} type="image/png" />
            <img src={logo} className="w-56 mx-auto" alt="company Logo" />
          </picture>
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
            {
              mode === 'normal' ? <>
                <div className="w-full flex-1">
                  <div className="mt-1 mb-4 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"></div>
                  </div>

                  <div className="mx-auto max-w-lg">
                    <Form
                      onSubmit={onSubmit}
                      validate={validate}
                      render={({ handleSubmit, submitError }) => (
                        <form onSubmit={handleSubmit}>
                          <Grid container spacing={4}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div className="mb-2 mt-2">
                                <label
                                  htmlFor="email"
                                  className="mb-4 block text-base font-medium text-[#07074D]"
                                >
                                  Email
                                </label>
                                <Field name="email">
                                  {({ input, meta }) => (
                                    <div>
                                      <input
                                        {...input}
                                        placeholder="Email"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div className="mb-2 mt-2">
                                <label
                                  htmlFor="password"
                                  className="mb-4 block text-base font-medium text-[#07074D]"
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
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              {submitError && (
                                <div className="error text-safekaroDarkOrange">
                                  {submitError}
                                </div>
                              )}
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <Button
                                type="submit"
                                className="tracking-wide font-semibold bg-gradient-to-r from-[#E9762B] to-[#EDB65C] text-[#443627] transition-all w-full mb-10 px-4 py-3 rounded hover:from-[#EDB65C] hover:to-[#E9762B] active:scale-90 duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  "Submitting..."
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
                                    <span className="ml-3">Sign In</span>
                                  </>
                                )}
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      )}
                    />
                  </div>
                  <div className="text-center flex justify-center gap-x-3 ">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Sign In As a {""}
                      <Link to="?mode=client" className="text-safekaroDarkOrange">
                        Client
                      </Link>
                    </div>
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      If you don't have account{" "}
                      <Link to="/signup" className="text-safekaroDarkOrange">
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </div>
              </> : <><div className="w-full flex-1">
                <div className="mt-1 mb-4 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"></div>
                </div>

                <div className="mx-auto max-w-lg">
                  <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, submitError }) => (
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className="mb-2 mt-2">
                              <label
                                htmlFor="email"
                                className="mb-4 block text-base font-medium text-[#07074D]"
                              >
                                Email
                              </label>
                              <Field name="email">
                                {({ input, meta }) => (
                                  <div>
                                    <input
                                      {...input}
                                      placeholder="Email"
                                      value={email}
                                      onChange={handleEmail}
                                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />

                                  </div>
                                )}
                              </Field>
                            </div>
                          </Grid>
                          {
                            showOtpBox && <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div className="mb-2 mt-2">
                                <label
                                  htmlFor="password"
                                  className="mb-4 block text-base font-medium text-[#07074D]"
                                >
                                  OTP
                                </label>
                                <Field name="otp">
                                  {({ input, meta }) => (
                                    <div>
                                      <input
                                        {...input}
                                        type="otp"
                                        onChange={handleOtp}
                                        value={otp}
                                        placeholder="Otp"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                      />

                                    </div>
                                  )}
                                </Field>
                              </div>
                            </Grid>
                          }

                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            {submitError && (
                              <div className="error text-safekaroDarkOrange">
                                {submitError}
                              </div>
                            )}
                          </Grid>
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Button
                              type="submit"
                              className="tracking-wide font-semibold bg-gradient-to-r from-[#E9762B] to-[#EDB65C] text-[#443627] transition-all w-full mb-10 px-4 py-3 rounded hover:from-[#EDB65C] hover:to-[#E9762B] active:scale-90 duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                "Submitting..."
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
                                  <span className="ml-3">Sign In</span>
                                </>
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    )}
                  />
                </div>
                <div className="text-center flex justify-center gap-x-3 ">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Sign In As a {""}
                    <Link to="" className="text-safekaroDarkOrange">
                      Partner or other
                    </Link>
                  </div>
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    If you don't have account{" "}
                    <Link to="/signup" className="text-safekaroDarkOrange">
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div></>
            }

          </div>
        </div>
        <div className="flex-1 bg-indigo-100 rounded-tr-lg rounded-br-lg text-center lg:w-1/2 hidden lg:flex">
          <div
            className="w-full lg:m-16 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
        {
          errMsg && <OverlayError title="Failed" onClose={onClose} msg={errMsg} />
        }
        {
          isLoading && <OverlayLoader />
        }
      </div>
    
    </div>
  );
};
export default Signin;
