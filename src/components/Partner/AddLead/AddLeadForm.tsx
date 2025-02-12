import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import useGetPolicyTypes from "../../../Hooks/Policy/useGetPolicyTypes";
import {
  MAX_FILE_SIZE,
  Document,
  SafeKaroUser,
  header,
  ALLOWED_FILE_TYPES,
} from "../../../context/constant";
import useGetCaseTypes from "../../../Hooks/CaseType/useGetCaseTypes";
import useGetCompanies from "../../../Hooks/Company/useGetCompanies";
import { leadsPath } from "../../../sitemap";
import { ILeadForm } from "../IPartner";
import { useNavigate } from "react-router-dom";
import { FORM_ERROR, setIn } from "final-form";
import * as yup from "yup";
import addLeadsService from "../../../api/Leads/AddLead/addLeadsService";
import { documentTypes, policyCreatedByAdmin } from "../../Policy/IPolicyData";
import useGetPartners from "../../../Hooks/Partner/useGetPartners";
import toast, { Toaster } from "react-hot-toast";
export interface addLeadRequestFormProps {
  initialValues: ILeadForm;
}
const AddLeadFormCard = (props: addLeadRequestFormProps) => {
  let { initialValues } = props;
  const [leadErrorMessage, setLeadErrorMessage] = useState("");
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);
  const [errors, setErrors] = useState<{ docName: string; file: string }[]>([
    { docName: "", file: "" },
  ]);
  const navigate = useNavigate();
  let [partners] = useGetPartners({ header: header, role: "partner" });
  let [policyTypes] = useGetPolicyTypes({ header: header });
  let [caseTypes] = useGetCaseTypes({ header: header });
  let [companies] = useGetCompanies({ header: header });
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPolicyCreatedBy, setSelectedPolicyCreatedBy] = useState();
  const[isLoading,setIsLoading] = useState(false);
  const [selectedPartnerName, setSelectedPartnerName] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [selectedRMName, setSelectedRMName] = useState("");
  const [selectedRMId, setSelectedRMId] = useState("");
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const handleChangeDocumentName = (newValue: any, index: any) => {
    const updatedDocuments = documents.map((doc, i) =>
      i === index ? { ...doc, docName: newValue?.value! } : doc
    );
    setDocuments(updatedDocuments);
  };
  const validateField = (index: number, name: string, value: string) => {
    const newErrors = [...errors];
    if (name === "docName" || name === "file") {
      newErrors[index] = {
        ...newErrors[index],
        [name]: value === "" ? `${name} cannot be empty` : "",
      };
    }
    setErrors(newErrors);
  };
  const validateDocument = (document: Document, index: number) => {
    const isValidDocName = document.docName.trim() !== "";
    const isValidFile = document.file !== undefined && document.file !== null;
    validateField(index, "docName", document.docName);
    validateField(index, "file", document.file);
    return isValidDocName && isValidFile;
  };
  const handleClickAddDocument = () => {
    setDocuments([...documents, { docName: "", file: "" }]);
  };
  const handleClickDeleteDocument = (index: any) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((_, i) => i !== index)
    );
    const newErrors = errors.filter((_, i) => i !== index);
    setErrors(newErrors);
  };
  const handleFileInputChange = (event: any, index: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileType = file.type;
      const fileSize = file.size;
      const newErrors = [...errors];
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
  const onSubmit = (leadForm: any, form: any) => {
    const formValid = documents.every((doc, index) =>
      validateDocument(doc, index)
    );
    if (formValid) {
      setLeadErrorMessage("");
      leadForm.relationshipManagerId =
        userData.role.toLowerCase() === "partner"
          ? userData.headRMId
          : selectedRMId;
      leadForm.relationshipManagerName =
        userData.role.toLowerCase() === "partner"
          ? userData.headRM
          : selectedRMName;
      leadForm.partnerId =
        userData.role.toLowerCase() === "partner"
          ? userData.profileId
          : selectedPartnerId;
      leadForm.partnerName =
        userData.role.toLowerCase() === "partner"
          ? userData.name
          : selectedPartnerName;
      leadForm.createdBy = userData.role;
      leadForm.leadCreatedBy =
        userData.role.toLowerCase() === "partner" ? "" : userData.profileId;
      leadForm.status =
        userData.role.toLowerCase() === "partner" ? "Requested" : "Accepted";
      const formData = new FormData();
      formData.append("category", leadForm.category);
      formData.append("policyType", leadForm.policyType);
      formData.append("caseType", leadForm.caseType);
      formData.append("companyName", leadForm.companyName);
      formData.append("partnerId", leadForm.partnerId);
      formData.append("partnerName", leadForm.partnerName);
      formData.append("relationshipManagerId", leadForm.relationshipManagerId);
      formData.append(
        "relationshipManagerName",
        leadForm.relationshipManagerName
      );
      formData.append("leadCreatedBy", leadForm.leadCreatedBy);
      formData.append("remarks", leadForm.remarks);
      formData.append("status", leadForm.status);
      formData.append("createdBy", userData.name);
      documents.forEach((doc: Document) => {
        if (doc.file) {
          formData.append(doc.docName, doc.file);
        }
      });
      callAddLeadAPI(formData, form);
    }
  };
  const callAddLeadAPI = async (lead: any, form: any) => {
    try {
      setIsLoading(true)
      const newLead = await addLeadsService({
        header,
        lead,
      });
      if (newLead.status === "success") {
        navigate(leadsPath());
      } else {
        return { [FORM_ERROR]: `error` };
      }
    } catch (err:any) {
      const errObj = await err;
      toast.error(errObj.message)
      setDocuments([{ docName: "", file: "" }]);
      return { [FORM_ERROR]: `error${errObj.message}` };
    }finally{
      setIsLoading(false)
    }
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
  const validationSchema = yup.object().shape({
    policyType: yup.string().nullable().required("Policy Type is required"),
    caseType: yup.string().nullable().required("Case Type is required"),
    companyName: yup.string().nullable().required("Company Name is required"),
  });
  const addValidate = validateFormValues(validationSchema);
  const handleSelectPolicyCreatedBy = (event: any, newValue: any) => {
    setSelectedPolicyCreatedBy(newValue.label);
  };
  const handleSelectPartnerChange = async (e: any) => {
    setSelectedPartnerId(e._id!);
    setSelectedPartnerName(e.name!);
    setSelectedRMId(e.headRMId!);
    setSelectedRMName(e.headRM!);
  };
  return (
    <>
      <React.Fragment>
        <Card>
          <CardContent>
            <Form
              mt={3}
              onSubmit={onSubmit}
              initialValues={initialValues}
              validate={addValidate}
              render={({ handleSubmit, submitError, submitting }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      {leadErrorMessage && (
                        <div style={{ color: "red" }}>{leadErrorMessage}</div>
                      )}
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="policyType">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="policyType"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.policyType || null
                                }
                                options={policyTypes}
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.policyType || ""
                                }
                                onChange={(event, newValue) => {
                                  input.onChange(
                                    newValue ? newValue.policyType : ""
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Policy Type"
                                    className="rounded-sm w-full"
                                    size="small"
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
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="caseType">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="caseType"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.caseType || null
                                }
                                options={caseTypes}
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.caseType || ""
                                }
                                onChange={(event, newValue) => {
                                  input.onChange(
                                    newValue ? newValue.caseType : ""
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Case Type"
                                    className="rounded-sm w-full"
                                    size="small"
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
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="companyName">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="companyName"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.companyName || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.companyName || ""
                                }
                                options={companies}
                                onChange={(event, newValue) => {
                                  input.onChange(
                                    newValue ? newValue.companyName : ""
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Company Name"
                                    className="rounded-sm w-full"
                                    size="small"
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
                    {userData.role.toLowerCase() === "operation" ? (
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="policyCreatedBy">
                          {({ input, meta }) => (
                            <div>
                              <FormControl fullWidth size="small">
                                <Autocomplete
                                  {...input}
                                  getOptionLabel={(option) => option.label}
                                  value={input.value || null}
                                  options={policyCreatedByAdmin}
                                  onChange={(event, newValue) => {
                                    input.onChange(newValue);
                                    handleSelectPolicyCreatedBy(
                                      event,
                                      newValue
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      className="rounded-sm w-full"
                                      size="small"
                                      label="Select Made by"
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
                    ) : (
                      ""
                    )}
                    {selectedPolicyCreatedBy &&
                      selectedPolicyCreatedBy === "Partner" && (
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Field name="partnerName">
                            {({ input, meta }) => (
                              <div>
                                <FormControl fullWidth size="small">
                                  <Autocomplete
                                    {...input}
                                    value={input.value || null}
                                    getOptionLabel={(option) =>
                                      `${option.name} - ${option.userCode}`
                                    }
                                    options={partners}
                                    onChange={(event, newValue) => {
                                      input.onChange(newValue);
                                      handleSelectPartnerChange(newValue);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        className="rounded-sm w-full"
                                        size="small"
                                        label="Select Partners"
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
                    <Grid item sm={12}>
                      <Field name="remarks">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            label="Enter Remarks"
                            variant="outlined"
                            multiline
                            rows={4}
                            className="rounded-sm w-full"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item md={12} mt={2}>
                      <Button
                        variant="outlined"
                        onClick={handleClickAddDocument}
                      >
                        Add More Document
                      </Button>
                      <Typography variant="body1" gutterBottom mr={4}>
                        {"Image should be <= 2MB."}
                      </Typography>
                    </Grid>
                    <Grid item md={12}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <span style={{ color: "red" }}>{errorMessage}</span>
                      </Grid>
                      {documents.map((doc, index) => (
                        <Grid item key={index} md={12} xs={12}>
                          <Grid container spacing={2} mt={1}>
                            <Grid item lg={4} md={4} sm={4} xs={12}>
                              <Autocomplete
                                value={
                                  documentTypes.find(
                                    (option) => option.value === doc.docName
                                  ) || null
                                }
                                onChange={(e, newValue) =>
                                  handleChangeDocumentName(newValue!, index)
                                }
                                options={documentTypes}
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
                              {errors[index]?.docName && (
                                <span>{errors[index].docName}</span>
                              )}
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={12}>
                              <input
                                id={`file ${index}`}
                                type="file"
                                onChange={(e) =>
                                  handleFileInputChange(e, index)
                                }
                                style={{
                                  border: "1px solid #c4c4c4",
                                  padding: "5px",
                                  width: "100%",
                                  borderRadius: "5px",
                                }}
                              />
                              {errors[index]?.file && (
                                <span style={{ color: "red" }}>
                                  {errors[index].file}
                                </span>
                              )}
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                              {documents.length !== 1 && (
                                <Tooltip title={"Delete Image"}>
                                  <IconButton
                                    color="primary"
                                    aria-label={"Delete Image"}
                                    component="span"
                                    onClick={() =>
                                      handleClickDeleteDocument(index)
                                    }
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
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} mt={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      {submitError && (
                        <div className="error text-safekaroDarkOrange">
                          {submitError}
                        </div>
                      )}
                      <Button variant="contained" type="submit" disabled={isLoading}>
                        {isLoading?'Submitting...':'submit'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </CardContent>
        </Card>
      </React.Fragment>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default AddLeadFormCard;
