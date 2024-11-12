import React from "react";
import logo from "../assets/login_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { ISignUp } from "./IAuth";
import {  Button, Grid } from "@mui/material";
import { header } from "../context/constant";
import fetchInterceptor, { FetchOptions } from "../utils/fetchInterceptor ";
const Signup = () => {
  const navigate = useNavigate();
  const loc = useLocation().state as { form: string };
  const role = loc.form.toLowerCase();
  const validate = (values: ISignUp) => {
    const errors: Partial<ISignUp> = {};
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
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (role === "admin" && !values.file) {
      errors.file = "Please select a Logo";
    } else if (role === "admin" && values.file) {
      const maxSizeInBytes = 1 * 1024 * 1024;
      if (values.file.size > maxSizeInBytes) {
        errors.file = "Logo size should not exceed 1 MB";
      }
    }
    return errors;
  };
  const onSubmit = async (signUpData: ISignUp) => {
    signUpData.role = role;
    signUpData.partnerId = "null";
    if (role === "admin") {
      signUpData.partnerCode = "Admin";
    }
    try {
      const url = "/api/user/register";
      let options: FetchOptions;
      if (!!signUpData.file) {
        const formData = new FormData();
        Object.keys(signUpData).forEach((ele) => {
          const value = signUpData[ele as keyof ISignUp];
          if (value instanceof File) {
            formData.append(ele, value);
          } else {
            formData.append(ele, value as string);
          }
        });
        options = {
          method: "POST",
          body: formData,
        };
      } else {
        options = {
          headers: header,
          method: "POST",
          body: JSON.stringify({
            ...signUpData,
          }),
        };
      }
      const responseData = await fetchInterceptor<any>(url, options);
      if (responseData.status === "success") {
        navigate("/");
      } else {
        throw new Error("Failed to Register");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    return { [FORM_ERROR]: "Sign up failed. Try again!" };
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-6/12 p-3 sm:p-2 overflow-scroll">
            <div>
              <picture>
                <source srcSet={logo} type="image/png" />
                <img
                  src={logo}
                  className="w-56 mx-auto"
                  alt="company Logo"
                />
              </picture>
            </div>
            <div className="mt-3 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
              <div className="w-full flex-1">
                <div className="my-4 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"></div>
                </div>
                <div className="mx-auto max-w-full px-20">
                  <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitError }) => (
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                          <Grid item lg={12} md={12} sm={6} xs={12}>
                            <div className="mb-1">
                              <label
                                htmlFor="email"
                                className="mb-2 block text-base font-medium text-[#07074D]"
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
                                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                                className="mb-2 block text-base font-medium text-[#07074D]"
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
                                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                                className="mb-2 block text-base font-medium text-[#07074D]"
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
                                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                                htmlFor="password"
                                className="mb-2 block text-base font-medium text-[#07074D]"
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
                                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                                htmlFor="confirmPassword"
                                className="mb-2 block text-base font-medium text-[#07074D]"
                              >
                                Confirm Password
                              </label>
                              <Field name="confirmPassword">
                                {({ input, meta }) => (
                                  <div>
                                    <input
                                      {...input}
                                      type="password"
                                      placeholder="Confirm Password"
                                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                          {role === "admin" && (
                            <Grid item lg={12} md={12} xs={12}>
                              <label
                                htmlFor="Logo"
                                className="mb-2 block text-base font-medium text-[#07074D]"
                              >
                                Upload Logo
                              </label>
                              <Field name="file">
                                {({ input, meta }) => (
                                  <div>
                                    <Grid item lg={12} xs={12}>
                                      <input
                                        type="file"
                                        placeholder="Select logo (Svg,png,jpg format only)"
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
                                        accept="image/*"
                                      />
                                      {meta.touched && meta.error && (
                                        <span className="text-safekaroDarkOrange">
                                          {meta.error}
                                        </span>
                                      )}
                                    </Grid>
                                  </div>
                                )}
                              </Field>
                            </Grid>
                          )}
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
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                              <circle cx="8.5" cy="7" r="4" />
                              <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">Register</span>
                          </Button>
                        </Grid>
                      </form>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
