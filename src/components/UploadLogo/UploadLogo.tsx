import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Field, Form } from "react-final-form";
import * as yup from "yup";
import { AddEditTeamProps } from "../../api/Team/getTeamsTypes";
import editTeamService from "../../api/Team/EditTeam/editTeamService";

const schema = yup.object().shape({
  companyLogo: yup
    .mixed()
    .required("Please select a Logo")
    .test("fileSize", "Logo size should not exceed 1 MB", (value) => {
      return value && value.size <= 1 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", (value) => {
      const validTypes = ["image/jpeg", "image/png", "image/svg+xml"];
      return value && validTypes.includes(value.type);
    }),
});

const UploadLogo = () => {
  const storedTheme: any = localStorage.getItem("user");
  const UserData = storedTheme ? JSON.parse(storedTheme) : null;
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    const team = new FormData();
    team.append("companyLogo", data.companyLogo);
    const teamId = UserData.profileId;
    const payload: AddEditTeamProps = { team, teamId };
    callEditTeamApi(payload);
  };
  const updateLogoInLocalstroage = (newValue: string) => {
    const storedData = localStorage.getItem("user");
    const newKey = "companyLogo";
    const currentData = storedData ? JSON.parse(storedData) : {};
    if (currentData.hasOwnProperty(newKey)) {
      currentData[newKey] = newValue;
    } else {
      currentData[newKey] = newValue;
    }
    localStorage.setItem("user", JSON.stringify(currentData));
  };
  const callEditTeamApi = async (data: AddEditTeamProps) => {
    try {
      const res = await editTeamService(data);

      if (res.data.companyLogo) {
        updateLogoInLocalstroage(res.data.companyLogo);
        navigate("/dashboard");
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const validate = (values: any) => {
    const errors: { [key: string]: string } = {};
    return schema
      .validate(values, { abortEarly: false })
      .catch((err: yup.ValidationError) => {
        err.inner.forEach((e: yup.ValidationError) => {
          errors[e.path as string] = e.message;
        });
      })
      .then(() => errors);
  };

  return (
    <>
      <div className="bg-blue-200   md:p-7">
        <Paper
          elevation={3}
          style={{ padding: 20, margin: 30, borderRadius: 10 }}
        >
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Upload Company Logo
          </Typography>
          <Typography variant="h5" mb={2}>
            <Link
              to={UserData?.role === "hr" ? "/hr/dashboard" : "/dashboard"}
              className="text-addButton font-bold text-sm"
            >
              Dashboard {" / "}
            </Link>
            <span className="text-grey-600 text-sm"> Upload Company Logo</span>
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, submitting, errors }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} xs={12}>
                    <label
                      htmlFor="companyLogo"
                      className="mb-2 block text-base font-medium text-[#07074D]"
                    >
                      Upload Logo
                    </label>
                    <Field name="companyLogo">
                      {({ input, meta }) => (
                        <div>
                          <Grid item lg={12} xs={12}>
                            <input
                              type="file"
                              placeholder="Select logo (Svg, png, jpg format only)"
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
                  <Grid item lg={4} xs={12}>
                    <Button
                      type="submit"
                      disabled={submitting}
                      variant="contained"
                      color="primary"
                      className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                    >
                      Upload Logo
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default UploadLogo;
