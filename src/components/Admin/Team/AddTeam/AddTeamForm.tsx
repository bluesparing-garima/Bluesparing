import  { useEffect, useState } from "react";
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
import { IAppUser, ITeamForm } from "../ITeam";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { updateLocalStorage } from "../../../../utils/HandleStore";
import {
  ADD,
  header,
  Document,
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
  imagePath,
  SafeKaroUser,
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
import dayjs from "dayjs";
import generateFormData from "../../../../utils/generateFromData";
import UpgradePlanPopup from "../../../UpdatePlan/UpgradeExistingPlan";
import LoadingOverlay from "../../../../utils/ui/LoadingOverlay";
import OverlayError from "../../../../utils/ui/OverlayError";
import OverlayLoader from "../../../../utils/ui/OverlayLoader";
export interface addPolicyTypeFormProps {
  initialValues?: IAppUser;
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
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  let [headRMs] = useGetRMList({
    header: header,
    role: "Relationship Manager",
  });
  const [selectedRMName, setSelectedRMName] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [selectedRMId, setSelectedRMId] = useState("");
  const [filteredHeadRM, setFilteredHeadRM] = useState<IAppUser[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation() as any;
  const pathName = location.pathname.split("/");
  const isAddEdit = pathName[pathName.length - 1] as string;
  const isAdd = isAddEdit === ADD;
  const [rmErrorMessage, setRMErrorMessage] = useState("");
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    if (!isAdd) {
      const updatedDocuments: Document[] = [];
      if (initialValues?.image) {
        updatedDocuments.push({
          docName: "image",
          file: initialValues.image,
        });
      }
      if (initialValues?.adharCardBack) {
        updatedDocuments.push({
          docName: "adharCardBack",
          file: initialValues.adharCardBack,
        });
      }
      if (initialValues?.panCard) {
        updatedDocuments.push({
          docName: "panCard",
          file: initialValues.panCard,
        });
      }
      if (initialValues?.adharCardFront) {
        updatedDocuments.push({
          docName: "adharCardFront",
          file: initialValues.adharCardFront,
        });
      }
      if (initialValues?.qualification) {
        updatedDocuments.push({
          docName: "qualification",
          file: initialValues.qualification,
        });
      }
      if (initialValues?.bankProof) {
        updatedDocuments.push({
          docName: "bankProof",
          file: initialValues.bankProof,
        });
      }
      if (initialValues?.experience) {
        updatedDocuments.push({
          docName: "experience",
          file: initialValues.experience,
        });
      }
      if (initialValues?.other) {
        updatedDocuments.push({
          docName: "other",
          file: initialValues.other,
        });
      }
      setDocuments(updatedDocuments);
    }
  }, [isAdd, initialValues]);

  const generateInitialValue = () => {
    let result: Record<string, any> = {};

    if (initialValues) {
      const { branchName, branchId, headRM, headRMId, role, roleId, ...rest } =
        initialValues;
      result = { ...rest, password: initialValues.originalPassword };

      if (branchName !== undefined && branchId !== undefined) {
        result["branch"] = { branchName, _id: branchId };
      }
      if (headRM !== undefined && headRMId !== undefined) {
        result["headRM"] = { name: headRM, _id: headRMId };
      }
      if (role !== undefined && roleId !== undefined) {
        result["role"] = { roleName: role, _id: roleId };
      }
    }

    return result;
  };
  useEffect(() => {
    if (!isAdd) {
      setSelectedRole(initialValues?.role!);
      setFilteredHeadRM(headRMs);
      setSelectedRMId(initialValues?.headRMId!);
      setSelectedRMName(initialValues?.headRM!);
    } else {
      setFilteredHeadRM([]);
    }
  }, [initialValues, isAdd, headRMs]);

  const findRoleIdByName = (role: string) => {
    const r = role?.toLowerCase();
    const newRole = roles?.find((ele) => ele.roleName?.toLowerCase() === r);
    if (newRole) {
      return newRole._id;
    } else {
      return "";
    }
  };

  const handleChangeRole = async (roleName: string) => {
    setSelectedRole(roleName);
    if (roleName === "Relationship Manager") {
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
    const { branch } = teamForm;
    const isDateOfBirth = dayjs(teamForm.dateOfBirth).isValid();
    if (!isJoiningDate) {
      setErrMsg("Invalid Joining Date ,its MM/DD/YYYY from");
      return;
    }
    if (!isDateOfBirth) {
      setErrMsg("Invalid  DOB, its MM/DD/YYYY from");
      return;
    }
    const formValid = documents.every((doc, index) =>
      validateDocument(doc, index)
    );

    if (selectedRole === "Relationship Manager") {
      if (formValid) {
        teamForm.role = selectedRole;
        teamForm.roleId = findRoleIdByName(selectedRole);
        teamForm.headRMId = selectedRMId === undefined ? "" : selectedRMId;
        teamForm.headRM = selectedRMName;
        teamForm.planId = UserData.planId;
        teamForm.planName = UserData.planName;
        teamForm.planExpired = UserData.planExpired;
        teamForm.planStartDate = UserData.planStartDate;
        teamForm.transactionId = UserData.transactionId;
        teamForm.transactionStatus = UserData.transactionStatus;
        documents.forEach((doc: Document) => {
          if (doc.file && doc.docName) {
            teamForm[doc.docName as keyof typeof teamForm] = doc.file;
          }
        });

        const formData = generateFormData(teamForm);
        formData.append("branchName", branch.branchName);
        formData.append("branchId", branch._id);
        if (isAdd) {
          callAddTeamAPI(formData);
        } else {
          callEditTeamAPI(formData, initialValues?._id!!);
        }
      }
    } else {
      if (!selectedRMId) {
        setRMErrorMessage("Select Partner or RM");
      } else if (formValid) {
        setRMErrorMessage("");
        teamForm.role = selectedRole;
        teamForm.roleId = findRoleIdByName(selectedRole || "");
        teamForm.headRMId = selectedRMId === undefined ? "" : selectedRMId;
        teamForm.headRM = selectedRMName;
        teamForm.planId = UserData.planId;
        teamForm.planName = UserData.planName;
        teamForm.planExpired = UserData.planExpired;
        teamForm.planStartDate = UserData.planStartDate;
        teamForm.transactionId = UserData.transactionId;
        teamForm.transactionStatus = UserData.transactionStatus;
        documents.forEach((doc: Document) => {
          if (doc.file && doc.docName) {
            teamForm[doc.docName as keyof typeof teamForm] = doc.file;
          }
        });

        const formData = generateFormData(teamForm);
        formData.append("branchName", branch.branchName);
        formData.append("branchId", branch._id);
        if (isAdd) {
          callAddTeamAPI(formData);
        } else {
          callEditTeamAPI(formData, initialValues?._id!);
        }
      }
    }
  };
  
  const navigateToTeams = (message: string) => {
    const storedTheme: any = localStorage.getItem("user");
    const UserData = storedTheme ? JSON.parse(storedTheme) : null;
    const userRole = UserData?.role || ""; // User ka role fetch karna
  
    navigate(teamPath(userRole), {
      state: message,
    });
  };
  
  const callAddTeamAPI = async (team: any) => {
    try {
      setIsLoading(true);
      const userLimit = UserData?.userLimit || {};
      let newRole = selectedRole ? selectedRole.toLowerCase() : "";
      if (newRole === "relationship manager") {
        newRole = "rm";
      }
      const maxLimit = userLimit.hasOwnProperty(newRole)
        ? userLimit[newRole]
        : 0;
      if (Number(maxLimit) <= 0) {
        setShowUpgradePopup(true);
        return;
      }
      const onProgress = (p: number) => {
        setProgress(p);
      };
      const newTeam = await addTeamService({ header, team, onProgress });
      const updateKey = UserData.userLimit[newRole] === "Infinity" ? "Infinity" : Number(UserData.userLimit[newRole]) - 1;
      if (newRole && Number(UserData.userLimit[newRole]) > 0) {
        const updatedUserLimit = {
          ...UserData.userLimit,
          [newRole]: updateKey,
        };

        updateLocalStorage({ userLimit: updatedUserLimit });
      }

      navigateToTeams(`${newTeam.message}`);
    } catch (err: any) {
      const errObj = await err;
      setErrMsg(errObj.message);
    } finally {
      setIsLoading(false);
    }
  };
  const callEditTeamAPI = async (team: any, teamId: string) => {
    try {
      setIsLoading(true);
      const newTeam = await editTeamService({ header, team, teamId });
      navigateToTeams(`${newTeam.message}`);
    } catch (err: any) {
      const errObj = await err;
     
      setErrMsg(errObj.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFileInputChange = (event: any, index: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileType = file.type;
      const fileSize = file.size;
      const newErrors = [...teamErrors];
      if (!ALLOWED_FILE_TYPES.includes(fileType)) {
        newErrors[index] = {
          ...newErrors[index],
          file: "Invalid file type. Please upload an image or a PDF.",
        };
        setErrors(newErrors);
      } else if (fileSize > MAX_FILE_SIZE) {
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
        if (newErrors[index]) {
          newErrors[index].file = "";
        }
        setErrors(newErrors);
      }
    }
  };
  const handleChangeDocumentName = (newValue: any, index: any) => {
    const updatedDocuments = documents.map((doc, i) =>
      i === index ? { ...doc, docName: newValue?.value! } : doc
    );
    setDocuments(updatedDocuments);
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
      setSelectedRMName(e.name!);
    }
  };
  const openFileInNewTab = (url: string, fileName: string) => {
    const urlFileName = url.substring(url.lastIndexOf("/") + 1);
    const fileExtension = urlFileName.split(".").pop()?.toLowerCase();
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
    }
  };

  const onClose = () => {
    setErrMsg("")
  }

  const getDocumentUrl = (file: any): string | undefined => {
    if (!file) return undefined; // null ki jagah undefined return karein
    if (file instanceof File) {
      return URL.createObjectURL(file); // Naya upload hua file
    }
    return `${imagePath}${encodeURIComponent(file)}`; // API se aayi purani file
  };

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
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  const debouncedCheckEmailExists = debounce(async (e: any) => {
    const email = e.target.value;
    try {
      const emailCheck = await validateEmailService({
        header,
        email,
      });
      if (emailCheck.status === "success" && emailCheck.data.length > 0) {
        setEmailErrorMessage("Email already exist");
        return true;
      } else {
        setEmailErrorMessage(" ");
        return false;
      }
    } catch {
      setEmailErrorMessage("Error validating email");
      return false;
    }
  }, 300); // 300ms debounce delay

  const validationSchema = yup.object().shape({
    name: yup
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
    salary: yup
      .string()
      .required("salary is required")
      .min(1, "salary must be at least 1 character"),
    branch: yup.object().required("Branch Name is required").nullable(),
  });
  const allowedRoles = ["Account", "Booking", "HR", "Operation", "Partner", "Relationship Manager"];
  const validate = validateFormValues(validationSchema);
  return (
    <>
      <UpgradePlanPopup
        open={showUpgradePopup}
        onClose={() => setShowUpgradePopup(false)}
        msg={`${selectedRole} limit is exhausted please update your plan`}
      />
      <Form
        onSubmit={onSubmit}
        initialValues={generateInitialValue()}
        validate={validate}
        render={({ handleSubmit, submitting, errors }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="branch">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="branch"
                          value={
                            input.value !== undefined
                              ? input.value
                              : initialValues?.branchName || null
                          }
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : `${option.branchName}` || ""
                          }
                          options={branches}
                          onChange={(event, newValue) => {
                            input.onChange(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              className="rounded-sm w-full"
                              size="small"
                              label="Select Branch"
                              variant="outlined"
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        />
                      </FormControl>
                    </div>
                  )}
                </Field>
              </Grid>
              {/* <Grid item lg={4} md={4} sm={6} xs={12}> */}
              {/* <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="role">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="role"
                          value={
                            input.value !== undefined
                              ? input.value
                              : initialValues?.role || null
                          }
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : `${option.roleName}` || ""
                          }
                          options={roles}
                          onChange={(event, newValue) => {
                            input.onChange(newValue);
                            handleChangeRole(newValue.roleName);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              className="rounded-sm w-full"
                              size="small"
                              label="Select Role"
                              variant="outlined"
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        />
                      </FormControl>
                    </div>
                  )}
                </Field>
              </Grid> */}
              <Grid item lg={3} md={4} sm={6} xs={12}>
  <Field name="role">
    {({ input, meta }) => (
      <div>
        <FormControl fullWidth size="small">
          <Autocomplete
            {...input}
            id="role"
            value={input.value !== undefined ? input.value : initialValues?.role || null}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.roleName || ""
            }
            options={roles.filter(role => allowedRoles.includes(role.roleName ?? ""))}
            onChange={(event, newValue) => {
              input.onChange(newValue);
              handleChangeRole(newValue?.roleName);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="rounded-sm w-full"
                size="small"
                label="Select Role"
                variant="outlined"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
              />
            )}
          />
        </FormControl>
      </div>
    )}
  </Field>
</Grid>;


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
                                : initialValues?.headRM || null
                            }
                            getOptionLabel={(option) =>
                              typeof option === "string"
                                ? option
                                : `${option.name}` || ""
                            }
                            options={filteredHeadRM}
                            onChange={(event, newValue) => {
                              input.onChange(newValue);
                              handleSelectRMChange(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className="rounded-sm w-full"
                                size="small"
                                label="Select Head RM"
                                variant="outlined"
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                              />
                            )}
                          />
                        </FormControl>
                      </div>
                    )}
                  </Field>
                </Grid>
              )}
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="name">
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
                        maxLength: 10,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      onInput={(e: any) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
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
                      onChangeCapture={debouncedCheckEmailExists}
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
                                                value={input.value !== undefined ? input.value : initialValues?.dateOfBirth || null}
                        onChange={(date) => input.onChange(date)}
                        inputFormat="DD/MM/YYYY"
                        shouldDisableDate={(date) => {
                          const today = dayjs();
                          const minAgeDate = today.subtract(18, 'year');
                          return date.isAfter(minAgeDate); // Disable dates that make the user younger than 18
                        }}
                        renderInput={(params: any) => (
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            {...params}
                            inputProps={{ ...params.inputProps, readOnly: true }} // Prevent manual entry
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
                <Field name="joiningDate">
                  {({ input, meta }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disableFuture
                        label="Joining Date"
                        value={input.value !== undefined ? input.value : initialValues?.joiningDate || null}
                        onChange={(date) => input.onChange(date)}
                        inputFormat="DD/MM/YYYY"
                        renderInput={(params: any) => (
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            {...params}
                            inputProps={{ ...params.inputProps, readOnly: true }} // Prevent manual entry
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                </Field>
              </Grid>


              <Grid item md={12} mt={2}>
                <Button variant="outlined" onClick={handleClickAddDocument}>
                  Add More Document
                </Button>
                <Typography variant="body1" gutterBottom mr={4}>
                  {"Image or pdf should be <= 4MB."}
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
                        {doc.file ? (
                          <>
                            <Tooltip
                              title={
                                typeof doc.file === "string"
                                  ? doc.file
                                  : "View Document"
                              }
                            >
                              <IconButton
                                color="primary"
                                aria-label={`${doc.file}`}
                                component="span"
                                onClick={() =>
                                  window.open(
                                    getDocumentUrl(doc.file),
                                    "_blank"
                                  )
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
                        ) : (
                          <></>
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
                  disabled={isLoading}
                  variant="contained"
                  color="primary"
                  className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                >
                  {isLoading
                    ? "Submitting..."
                    : isAdd
                    ? "Add Team"
                    : "Update Team"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
      {
        errMsg && <OverlayError title="Failed" onClose={onClose} msg={errMsg} />
      }
      {
        isLoading && <OverlayLoader />
      }
      <LoadingOverlay loading={progress > 0 && progress<100 } message={progress} />
    </>
  );
};
export default AddTeamForm;
