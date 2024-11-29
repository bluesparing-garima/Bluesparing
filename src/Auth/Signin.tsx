import logo from "../assets/login_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { Button, Grid } from "@mui/material";
import { FORM_ERROR } from "final-form";
import { ISignIn } from "./IAuth";
import { SafeKaroUser, header } from "../context/constant";
import getTeamDetailsService from "../api/Team/GetTeamDetails/getTeamDetailsService";
import { setTokens } from "../Hooks/Tokens/useToken";
import fetchInterceptor, { FetchOptions } from "../utils/fetchInterceptor ";
const Signin = () => {
  const navigate = useNavigate();
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
  const roleDashboardMapping: { [key: string]: string } = {
    admin: "/dashboard",
    operation: "/operationdashboard",
    booking: "/booking-dashboard",
    account: "/accountdashboard",
    rm: "/rm/dashboard",
    hr: "/hr/dashboard",
    it: "/it/dashboard",
    superadmin:"/super-admin/dashboard",
    default: "/partnerdashboard",
  };
  const onSubmit = async (signInData: ISignIn) => {
    try {
      const url = "/api/user/login";
      const options: FetchOptions = {
        headers: header,
        method: "POST",
        body: JSON.stringify(signInData),
      };
      const responseData = await fetchInterceptor<any>(url, options);
      if (responseData.status === "success") {
        let loginData: SafeKaroUser = {
          ...responseData,
          headRMId: "",
          headRM: "",
        };
        if (loginData.accessToken && loginData.refreshToken) {
          setTokens(loginData.accessToken!, loginData.refreshToken!);
        }
        if (responseData.role !== "admin") {
          const bookingRequestDetails = await getTeamDetailsService({
            header,
            teamId: responseData.partnerId,
          });
          loginData.headRMId = bookingRequestDetails.headRMId!;
          loginData.headRM = bookingRequestDetails.headRM!;
          loginData.id = responseData.partnerId!;
        } else {
          const bookingRequestDetails = await getTeamDetailsService({
            header,
            teamId: responseData.partnerId,
          });
          loginData.id = responseData.partnerId!;
          loginData.companyLogo = bookingRequestDetails.companyLogo
        }
        localStorage.setItem("user", JSON.stringify(loginData));
        let role = responseData.role.toLowerCase();
        if (role === "relationship manager") {
          role = "rm";
        }
        navigate(roleDashboardMapping[role] || roleDashboardMapping.default);
      } else {
        return { [FORM_ERROR]: `${responseData.message}` };
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/4 xl:w-6/12 p-3 sm:p-6">
          <picture>
            <source srcSet={logo} type="image/png" />
            <img src={logo} className="w-56 mx-auto" alt="company Logo" />
          </picture>
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
            <div className="w-full flex-1">
              <div className="my-4 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"></div>
              </div>
              <div className="mx-auto max-w-xs">
                <Form
                  onSubmit={onSubmit}
                  validate={validate}
                  render={({ handleSubmit, submitError }) => (
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <div className="mb-2">
                            <label
                              htmlFor="email"
                              className="mb-3 block text-base font-medium text-[#07074D]"
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
                          <div className="mb-2">
                            <label
                              htmlFor="password"
                              className="mb-3 block text-base font-medium text-[#07074D]"
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
                        <Button
                          type="submit"
                          className="mt-5 ml-4 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        >
                          <svg
                            className="w-6 h-6 -ml-2"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <path d="M20 8v6M23 11h-6" />
                          </svg>
                          <span className="ml-3">Sign In</span>
                        </Button>
                      </Grid>
                    </form>
                  )}
                />
              </div>
              <div className="my-4 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  If you don't have account{" "}
                  <a href="/#/signup" className="text-safekaroDarkOrange">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default Signin;
