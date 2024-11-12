/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";
import { FormControl, Autocomplete } from "@mui/material";
import addTeamService from "../../../../api/Team/AddTeam/addTeamService";
import { ITeamForm, ITeams } from "../ITeam";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import {
  ADD,
  header,
  Document,
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
  imagePath,
} from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { teamPath } from "../../../../sitemap";
import editTeamService from "../../../../api/Team/EditTeam/editTeamService";
import useGetBranches from "../../../../Hooks/Branch/useGetBranches";
import useGetRoles from "../../../../Hooks/Role/useGetRoles";
import useGetRMList from "../../../../Hooks/RM/useGetRMList";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import validateEmailService from "../../../../api/Team/ValidateEmail/validateEmailService";
import { userDocumentList } from "../../../Policy/IPolicyData";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
export interface addPolicyTypeFormProps {
  initialValues: ITeamForm;
}

const AddTeamForm = (props: addPolicyTypeFormProps) => {
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);
  const [teamErrors, setErrors] = useState<{ docName: string; file: string }[]>(
    [{ docName: "", file: "" }]
  );
  const { initialValues } = props;

  let [branches] = useGetBranches({ header: header });
  let [roles] = useGetRoles({ header: header });
  let [headRMs] = useGetRMList({
    header: header,
    role: "Relationship Manager",
  });
  const [selectedRMName, setSelectedRMName] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [selectedRMId, setSelectedRMId] = useState("");
  const [filteredHeadRM, setFilteredHeadRM] = useState<ITeams[]>([]);
  const [selectedRole, setSelectedRole] = useState<any>();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation() as any;
  const pathName = location.pathname.split("/");
  const isAddEdit = pathName[pathName.length - 1] as string;
  const isAdd = isAddEdit === ADD;
  const [rmErrorMessage, setRMErrorMessage] = useState("");

  useEffect(() => {
    if (!isAdd) {
      const updatedDocuments: Document[] = [];

      if (initialValues.image) {
        updatedDocuments.push({
          docName: "image",
          file: initialValues.image,
        });
      }
      if (initialValues.adharCardBack) {
        updatedDocuments.push({
          docName: "adharCardBack",
          file: initialValues.adharCardBack,
        });
      }
      if (initialValues.panCard) {
        updatedDocuments.push({
          docName: "panCard",
          file: initialValues.panCard,
        });
      }
      if (initialValues.adharCardFront) {
        updatedDocuments.push({
          docName: "adharCardFront",
          file: initialValues.adharCardFront,
        });
      }
      if (initialValues.qualification) {
        updatedDocuments.push({
          docName: "qualification",
          file: initialValues.qualification,
        });
      }
      if (initialValues.bankProof) {
        updatedDocuments.push({
          docName: "bankProof",
          file: initialValues.bankProof,
        });
      }
      if (initialValues.experience) {
        updatedDocuments.push({
          docName: "experience",
          file: initialValues.experience,
        });
      }
      if (initialValues.other) {
        updatedDocuments.push({
          docName: "other",
          file: initialValues.other,
        });
      }
      setDocuments(updatedDocuments);
    }
  }, [isAdd, initialValues]);

  useEffect(() => {
    if (!isAdd) {
      setSelectedRole(initialValues.role!);
      setFilteredHeadRM(headRMs);
      setSelectedRMId(initialValues.headRMId!);
      setSelectedRMName(initialValues.headRM!);
    } else {
      setFilteredHeadRM([]);
    }
  }, [initialValues, isAdd, headRMs]);

  const handleChangeRole = async (e: any) => {
    const role = e.target.value;
    setSelectedRole(role);
    if (role === "Relationship Manager") {
      setFilteredHeadRM([]);
    } else {
      setFilteredHeadRM(headRMs);
    }
  };

  const validateDocument = (document: Document, index: number) => {
    const isValidDocName = document.docName.trim() !== "";

    const isValidFile = document.file;
    validateField(index, "docName", document.docName);
    validateField(index, "file", document.file);
    return isValidDocName && isValidFile;
  };

  const validateField = (index: number, name: string, value: string) => {
    const newErrors = [...teamErrors];
    if (name === "docName" || name === "file") {
      newErrors[index] = {
        ...newErrors[index],
        [name]: value === "" ? `${name} cannot be empty` : "",
      };
    }
    setErrors(newErrors);
  };
  const onSubmit = async (teamForm: ITeamForm) => {
    const isJoiningDate = dayjs(teamForm.joiningDate).isValid();
    const isDateOfBirth = dayjs(teamForm.dateOfBirth).isValid();

    if (!isJoiningDate) {
      toast.error("Invalid Joining Date ,its MM/DD/YYYY from");
      return;
    }
    if (!isDateOfBirth) {
      toast.error("Invalid  DOB, its MM/DD/YYYY from");
      return;
    }
    console.log(teamForm);
    const formValid = documents.every((doc, index) =>
      validateDocument(doc, index)
    );

    if (selectedRole === "Relationship Manager") {
      if (formValid) {
        teamForm.role = selectedRole;
        teamForm.headRMId = selectedRMId === undefined ? "" : selectedRMId;
        teamForm.headRM = selectedRMName;
        const formData = new FormData();
        const addedKeys = new Map<string, string>();
        Object.keys(teamForm).forEach((key) => {
          const value = teamForm[key as keyof ITeamForm];
          if (value !== undefined) {
            // formData.append(key, value);
            addedKeys.set(key, value); // Mark this key as added
          }
        });
        documents.forEach((doc: Document) => {
          if (doc.file) {
            addedKeys.set(doc.docName, doc.file);
          }
        });

        addedKeys.forEach((file, key) => {
          formData.append(key, file);
        });
        if (isAdd) {
          callAddTeamAPI(formData);
        } else {
          callEditTeamAPI(formData, teamForm.id!);
        }
      }
    } else {
      if (!selectedRMId) {
        setRMErrorMessage("Select Partner or RM");
      } else if (formValid) {
        setRMErrorMessage("");
        teamForm.role = selectedRole;
        teamForm.headRMId = selectedRMId === undefined ? "" : selectedRMId;
        teamForm.headRM = selectedRMName;
        const formData = new FormData();
        const addedKeys = new Map<string, string>();
        Object.keys(teamForm).forEach((key) => {
          const value = teamForm[key as keyof ITeamForm];
          if (value !== undefined) {
            // formData.append(key, value);
            addedKeys.set(key, value); // Mark this key as added
          }
        });
        documents.forEach((doc: Document) => {
          if (doc.file) {
            addedKeys.set(doc.docName, doc.file);
          }
        });

        addedKeys.forEach((file, key) => {
          formData.append(key, file);
        });
        if (isAdd) {
          callAddTeamAPI(formData);
        } else {
          callEditTeamAPI(formData, teamForm.id!);
        }
      }
    }
  };

  const navigateToTeams = (message: string) => {
    navigate(teamPath(), {
      state: message,
    });
  };

  const callAddTeamAPI = async (team: any) => {
    try {
      const newTeam = await addTeamService({ header, team });
      navigateToTeams(`${newTeam.message}`);
    } catch (err: any) {
      const errObj = await err;
      toast.error(errObj.message);
    }
  };

  const callEditTeamAPI = async (team: any, teamId: string) => {
    try {
      const newTeam = await editTeamService({ header, team, teamId });
      navigateToTeams(`${newTeam.message}`);
    } catch (err: any) {
      const errObj = await err;
      toast.error(errObj.message);
    }
  };

  const handleFileInputChange = (event: any, index: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileType = file.type;
      const fileSize = file.size;
      const newErrors = [...teamErrors];

      if (!ALLOWED_FILE_TYPES.includes(fileType)) {
        // setErrorMessage("Invalid file type. Please upload an image or a PDF.");
        newErrors[index] = {
          ...newErrors[index],
          file: "Invalid file type. Please upload an image or a PDF.",
        };
        setErrors(newErrors);
      } else if (fileSize > MAX_FILE_SIZE) {
        //setErrorMessage("File size exceeds the maximum limit.");
        newErrors[index] = {
          ...newErrors[index],
          file: "File size exceeds the maximum limit",
        };
        setErrors(newErrors);
      } else {
        setErrorMessage("");
        const newDocuments = [...documents];
        newDocuments[index] = { ...newDocuments[index], file: file };
        setDocuments(newDocuments);

        // Clear the error if the file is valid
        if (newErrors[index]) {
          newErrors[index].file = "";
        }
        setErrors(newErrors);
      }
    }
  };
  // handle DocName change
  const handleChangeDocumentName = (newValue: any, index: any) => {
    const updatedDocuments = documents.map((doc, i) =>
      i === index ? { ...doc, docName: newValue?.value! } : doc
    );

    setDocuments(updatedDocuments);
    // Clear the error if the file is valid
    const newErrors = [...teamErrors];
    if (newErrors[index]) {
      newErrors[index].docName =
        newValue === "" ? "docName cannot be empty" : "";
      setErrors(newErrors);
    }
  };

  const handleClickDeleteDocument = (index: any) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((_, i) => i !== index)
    );
    const newErrors = teamErrors.filter((_, i) => i !== index);
    setErrors(newErrors);
  };

  const handleClickAddDocument = () => {
    setDocuments([...documents, { docName: "", file: "" }]);
  };

  const handleSelectRMChange = async (e: any) => {
    if (e) {
      setSelectedRMId(e._id!);
      setSelectedRMName(e.fullName!);
    }
  };
  // Function to Open file download

  const openFileInNewTab = (url: string, fileName: string) => {
    // Extract file extension from the original URL
    const urlFileName = url.substring(url.lastIndexOf("/") + 1);
    const fileExtension = urlFileName.split(".").pop()?.toLowerCase();

    // Validate file extension
    if (
      fileExtension === "pdf" ||
      fileExtension === "png" ||
      fileExtension === "jpg" ||
      fileExtension === "jpeg"
    ) {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      console.error("Unsupported file type:", fileExtension);
      //alert("Unsupported file type. Only PDF and PNG files are supported.");
    }
  };
  const handleClickViewDocument = (file: any, docName: any) => {
    const url = imagePath + file;
    openFileInNewTab(url, docName);
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

  const checkEmailExists = async (e: any) => {
    const email = e.target.value;
    try {
      const emailCheck = await validateEmailService({
        header,
        email,
      });
      if (emailCheck.status === "success") {
        setEmailErrorMessage("Email already exist");
        return true;
      } else {
        setEmailErrorMessage(" ");
        return false;
      }
    } catch {
      return false;
    }
  };

  const validationSchema = yup.object().shape({
    fullName: yup
      .string()
      .required("Full Name is required")
      .min(1, "Name must be at least 1 character")
      .max(100, "Name cannot exceed 100 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(1, "Password must be at least 1 character"),
    phoneNumber: yup
      .string()
      .required("Phone Number is required")
      .matches(/^\d+$/, "Phone Number must contain only digits")
      .min(10, "Phone Number must be exactly 10 digits")
      .max(10, "Phone Number must be exactly 10 digits"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    gender: yup
      .string()
      .required("gender is required")
      .min(1, "gender must be at least 1 character"),
    address: yup
      .string()
      .required("address is required")
      .min(1, "address must be at least 1 character"),
    pincode: yup
      .string()
      .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
      .required("Pincode is required")
      .min(1, "Pincode must be at least 1 character")
      .max(6, "Pincode must be exactly 6 digits"),
    bankName: yup
      .string()
      .required("Bank Name is required")
      .min(1, "bankName must be at least 1 character"),
    IFSC: yup
      .string()
      .required("IFSC is required")
      .min(1, "IFSC must be at least 1 character"),
    accountHolderName: yup
      .string()
      .required("Account Holder Name is required")
      .min(1, "Account Holder Name must be at least 1 character"),
    accountNumber: yup
      .string()
      .required("Account number is required")
      .matches(/^\d+$/, "Account number must contain only digits")
      .min(6, "Account number must be at least 6 digits")
      .max(12, "Account number must be at most 12 digits"),
    salary: yup
      .string()
      .required("salary is required")
      .min(1, "salary must be at least 1 character"),
    //role: yup.string().required("Role is required").nullable(),
    branchName: yup.string().required("Branch Name is required").nullable(),
  });

  const validate = validateFormValues(validationSchema);

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit, submitting, errors }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="branchName">
                  {({ input, meta }) => (
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size="small"
                      error={meta.touched && Boolean(meta.error)}
                    >
                      <InputLabel>Select Branch Name</InputLabel>
                      <Select
                        id="branchName"
                        {...input}
                        input={<OutlinedInput label="Select Branch Name" />}
                      >
                        {branches.map((option) => (
                          <MenuItem key={option._id} value={option.branchName}>
                            {option.branchName}
                          </MenuItem>
                        ))}
                      </Select>
                      {meta.touched && meta.error && (
                        <FormHelperText>{meta.error}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="role">
                  {({ input, meta }) => (
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size="small"
                      error={meta.touched && Boolean(meta.error)}
                    >
                      <InputLabel>Select Role</InputLabel>
                      <Select
                        id="role"
                        {...input}
                        value={selectedRole ? selectedRole : initialValues.role}
                        onChange={handleChangeRole}
                        input={<OutlinedInput label="Select a role" />}
                      >
                        {roles.map((option) => (
                          <MenuItem key={option._id} value={option.roleName}>
                            {option.roleName}
                          </MenuItem>
                        ))}
                      </Select>
                      {meta.touched && meta.error && (
                        <FormHelperText>{meta.error}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>
              </Grid>
              {selectedRole !== "Relationship Manager" && (
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Field name="headRM">
                    {({ input, meta }) => (
                      <div>
                        <FormControl fullWidth size="small">
                          <Autocomplete
                            {...input}
                            id="headRM"
                            value={
                              input.value !== undefined
                                ? input.value
                                : initialValues.headRM || null
                            }
                            getOptionLabel={(option) =>
                              option && typeof option === "object"
                                ? option.fullName || ""
                                : ""
                            }
                            options={filteredHeadRM || []} // Ensure it's never undefined
                            isOptionEqualToValue={
                              (option, value) => option?._id === value?._id // Safeguard for null/undefined values
                            }
                            onChange={(event, newValue) => {
                              input.onChange(newValue || null); // Safeguard when clearing
                              handleSelectRMChange(newValue || null);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select Head RM"
                                className="rounded-sm w-full"
                                size="small"
                                variant="outlined"
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                              />
                            )}
                          />
                          {rmErrorMessage && (
                            <div style={{ color: "red" }}>{rmErrorMessage}</div>
                          )}
                        </FormControl>
                      </div>
                    )}
                  </Field>
                </Grid>
              )}
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="fullName">
                  {({ input, meta }) => (
                    <TextField
                      type="text"
                      {...input}
                      label="Enter Full Name"
                      variant="outlined"
                      size="small"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="phoneNumber">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Mobile Number"
                      variant="outlined"
                      size="small"
                      type="tel"
                      className="rounded-sm w-full"
                      inputProps={{
                        maxLength: 10, // Limits input to 10 digits
                        inputMode: "numeric", // Ensures the numeric keyboard on mobile
                        pattern: "[0-9]*", // Ensures only digits
                      }}
                      onInput={(e: any) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
                      }}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="email">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      id="email"
                      label="Enter Email"
                      type="email"
                      variant="outlined"
                      size="small"
                      className="rounded-sm w-full"
                      onChangeCapture={checkEmailExists}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                {emailErrorMessage && (
                  <div style={{ color: "red" }}>{emailErrorMessage}</div>
                )}
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="password">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Password"
                      variant="outlined"
                      size="small"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="gender">
                  {({ input, meta }) => (
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size="small"
                      error={meta.touched && Boolean(meta.error)}
                    >
                      <InputLabel>Select Gender</InputLabel>
                      <Select
                        id="gender"
                        {...input}
                        input={<OutlinedInput label="Select Gender" />}
                      >
                        {["Male", "Female", "Other"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {meta.touched && meta.error && (
                        <FormHelperText>{meta.error}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="salary">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Salary"
                      variant="outlined"
                      type="number"
                      size="small"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Field name="address">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Address"
                      multiline
                      rows={3}
                      variant="outlined"
                      size="small"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="pincode">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Pincode"
                      variant="outlined"
                      size="small"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="dateOfBirth">
                  {({ input, meta }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disableFuture
                        label="Date of Birth"
                        value={
                          input.value !== undefined
                            ? input.value
                            : initialValues.dateOfBirth || null
                        }
                        onChange={(date) => input.onChange(date)}
                        renderInput={(params: any) => (
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            {...params}
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="bankName">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Bank Name"
                      variant="outlined"
                      size="small"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="IFSC">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter IFSC"
                      variant="outlined"
                      size="small"
                      className="rounded-sm w-full"
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
                      label="Enter Account Holder Name"
                      variant="outlined"
                      size="small"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="joiningDate">
                  {({ input, meta }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disableFuture
                        label="Joining Date"
                        value={
                          input.value !== undefined
                            ? input.value
                            : initialValues.joiningDate || null
                        }
                        onChange={(date) => input.onChange(date)}
                        renderInput={(params: any) => (
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            {...params}
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                </Field>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="accountNumber">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Account Number"
                      variant="outlined"
                      size="small"
                      type="number"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>

              <Grid item md={12} mt={2}>
                <Button variant="outlined" onClick={handleClickAddDocument}>
                  Add More Document
                </Button>
                <Typography variant="body1" gutterBottom mr={4}>
                  {"Image should be 100x100 pixels and must be <= 256KB."}
                </Typography>
              </Grid>
              <Grid item md={12}>
                {documents.map((doc, index) => (
                  <Grid item key={index} md={11} xs={12}>
                    <Grid container spacing={2} mt={1}>
                      <Grid item lg={4} md={4} sm={4} xs={12}>
                        <Autocomplete
                          value={
                            userDocumentList.find(
                              (option) => option.value === doc.docName
                            ) || null
                          }
                          onChange={(e, newValue) =>
                            handleChangeDocumentName(newValue!, index)
                          }
                          //userDocumentList
                          options={userDocumentList}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              className="rounded-sm w-full"
                              size="small"
                              label="Select Document"
                              fullWidth
                              variant="outlined"
                            />
                          )}
                        />

                        {teamErrors[index]?.docName && (
                          <span>{teamErrors[index].docName}</span>
                        )}
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={12}>
                        <input
                          id={`file ${index}`}
                          type="file"
                          onChange={(e) => handleFileInputChange(e, index)}
                          style={{
                            border: "1px solid #c4c4c4",
                            padding: "5px",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        />

                        {teamErrors[index]?.file && (
                          <span style={{ color: "red" }}>
                            {teamErrors[index].file}
                          </span>
                        )}
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={4}>
                        {!isAdd && (
                          <>
                            <Tooltip title={"View Document"}>
                              <IconButton
                                color="primary"
                                aria-label={"View Document"}
                                component="span"
                                onClick={() =>
                                  handleClickViewDocument(doc.file, doc.docName)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-6 text-safekaroDarkOrange"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                </svg>
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        <span style={{ color: "red" }}>{errorMessage}</span>
                        {documents.length !== 1 && (
                          <>
                            <Tooltip title={"Delete Image"}>
                              <IconButton
                                color="primary"
                                aria-label={"Delete Image"}
                                component="span"
                                onClick={() => handleClickDeleteDocument(index)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  disabled={submitting}
                  variant="contained"
                  color="primary"
                  className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                >
                  {isAdd ? "Add Team" : "Update Team"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default AddTeamForm;