import logo from "../assets/login_logo.png";
import { useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { FormProps, ISignUp } from "./IAuth";
import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { header, SESSION_USER } from "../context/constant";
import fetchInterceptor, { FetchOptions } from "../utils/fetchInterceptor ";
import useSubscription from "../Hooks/Subscription/useSubscription";
import useGetRoles from "../Hooks/Role/useGetRoles";
import toast, { Toaster } from "react-hot-toast";
import { storeInSessionStorage } from "../utils/HandleStore";
const Signup = () => {
  const navigate = useNavigate();
  const [subsData] = useSubscription();
  const [roles] = useGetRoles({ header });
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
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };
  const generateFormData = (obj: any) => {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value === undefined || value === null) {
        return;
      }
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    });
    return formData;
  };
  const onSubmit = async (signUpData: FormProps) => {
    const { role, plans, companyLogo, profileImage, gender } = signUpData;
    let payload: ISignUp = {
      name: signUpData.name,
      email: signUpData.email,
      role: role,
      password: signUpData.password,
      phoneNumber: signUpData.phoneNumber,
      confirmPassword: signUpData.confirmPassword,
      partnerCode: signUpData.partnerCode,
      file: signUpData.file,
      isActive: false,
      planName: plans.planName,
      planId: plans._id,
      joiningDate: Date.now().toString(),
      roleId: findRoleIdByName(role),
      companyLogo,
      profileImage,
      gender: gender.toLowerCase(),
    };
    payload.role = role.toLowerCase();
    try {
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
        navigate("/update-plan");
      } else {
        throw new Error("Failed to Register");
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
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
          <div className="lg:w-1/2 xl:w-6/12 p-3 sm:p-2">
            <div>
              <img src={logo} className="w-56 mx-auto" alt="" />
            </div>
            <div className="mt-2 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
              <div className="w-full flex-1">
                <div className="my-2 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"></div>
                </div>
                <div className="mx-auto max-w-full px-20">
                  <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitError }) => (
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <div className="mb-1">
                              <label
                                htmlFor="role"
                                className="mb-1 block text-base font-medium text-[#07074D]"
                              >
                                Register As
                              </label>
                              <Field name="role" initialValue="Admin">
                                {({ input }) => (
                                  <Autocomplete
                                    {...input}
                                    options={["Admin", "Partner"]}
                                    defaultValue="Admin"
                                    onChange={(event, value) =>
                                      input.onChange(value)
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Select role"
                                        variant="outlined"
                                        size="small"
                                      />
                                    )}
                                  />
                                )}
                              </Field>
                            </div>
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <label
                              htmlFor="role"
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
                                  <InputLabel>Select Gender</InputLabel>
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
                          <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="mb-1">
                              <label
                                htmlFor="confirmPassword"
                                className="mb-1 block text-base font-satoshi font-medium text-[#07074D]"
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
                          <Button
                            type="submit"
                            className="mt-1 ml-4 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                            <span className="ml-3">Sign Up</span>
                          </Button>
                        </Grid>
                      </form>
                    )}
                  />
                </div>
                <div className="my-3 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    <a
                      href="/#/update-plan"
                      className="text-safekaroDarkOrange"
                    >
                      View Plans
                    </a>
                  </div>
                </div>
                <div className="my-3 border-b text-center">
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
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default Signup;
