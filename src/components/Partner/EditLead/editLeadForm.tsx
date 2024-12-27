import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  TextField,
  Autocomplete,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-final-form";
import {
  MAX_FILE_SIZE,
  SafeKaroUser,
  header,
  Document,
  ALLOWED_FILE_TYPES,
} from "../../../context/constant";
import { ILeadForm } from "../IPartner";
import editLeadService from "../../../api/Leads/EditLead/editLeadService";
import { leadsPath } from "../../../sitemap";
import { documentTypes } from "../../Policy/IPolicyData";
import toast, { Toaster } from "react-hot-toast";
import FileView from "../../../utils/FileView";
import { formatFilename } from "../../../utils/convertLocaleStringToNumber";

export interface addLeadRequestFormProps {
  initialValues: ILeadForm;
}
const EditLeadForm = (props: addLeadRequestFormProps) => {
  const { initialValues } = props;
  const navigate = useNavigate();
  const { leadId } = useParams();
  const [errors, setErrors] = useState<{ docName: string; file: string }[]>([
    { docName: "", file: "" },
  ]);
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
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
  const validateDocument = (document: Document, index: number) => {
    const isValidDocName = document.docName.trim() !== "";
    const isValidFile = document.file;
    validateField(index, "docName", document.docName);
    validateField(index, "file", document.file);
    return isValidDocName && isValidFile;
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
  const onSubmit = (leadForm: any, form: any) => {
    const formValid = documents.every((doc, index) =>
      validateDocument(doc, index)
    );
    if (formValid) {
      leadForm.id = leadId;
      leadForm.category = initialValues?.category;
      leadForm.policyType = initialValues?.policyType;
      leadForm.caseType = initialValues?.caseType;
      leadForm.companyName = initialValues?.companyName;
      leadForm.partnerId = initialValues?.partnerId;
      leadForm.partnerName = initialValues?.partnerName;
      leadForm.relationshipManagerId = initialValues?.relationshipManagerId;
      leadForm.relationshipManagerName = initialValues?.relationshipManagerName;
      leadForm.leadCreatedBy = initialValues?.leadCreatedBy;
      leadForm.remarks = initialValues?.remarks;
      leadForm.updatedBy = userData.name;
      leadForm.status = "requested";
      const formData = new FormData();
      formData.append("id", leadForm.id);
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
      formData.append("updatedBy", userData.name);
      documents.forEach((doc: Document) => {
        if (doc.file) {
          formData.append(doc.docName, doc.file);
        }
      });
      callEditLeadAPI(formData, leadForm.id);
    }
  };
  const callEditLeadAPI = async (leadForm: any, leadId: string) => {
    try {
      const newLead = await editLeadService({
        header,
        lead: leadForm,
        leadId,
      });
      if (newLead.status === "success") {
        navigate(leadsPath());
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const handleChangeDocumentName = (newValue: any, index: any) => {
    const updatedDocuments = documents.map((doc, i) =>
      i === index ? { ...doc, docName: newValue?.value! } : doc
    );
    setDocuments(updatedDocuments);
  };
  const handleClickAddDocument = () => {
    setDocuments([...documents, { docName: "", file: "" }]);
  };
  const handleClickDeleteDocument = (index: any) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((_, i) => i !== index)
    );
  };
  useEffect(() => {
    const updatedDocuments: Document[] = [];
    if (initialValues.rcBack) {
      updatedDocuments.push({ docName: "rcBack", file: initialValues.rcBack });
    }
    if (initialValues.rcFront) {
      updatedDocuments.push({
        docName: "rcFront",
        file: initialValues.rcFront,
      });
    }
    if (initialValues.previousPolicy) {
      updatedDocuments.push({
        docName: "previousPolicy",
        file: initialValues.previousPolicy,
      });
    }
    if (initialValues.survey) {
      updatedDocuments.push({ docName: "survey", file: initialValues.survey });
    }
    if (initialValues.puc) {
      updatedDocuments.push({ docName: "puc", file: initialValues.puc });
    }
    if (initialValues.fitness) {
      updatedDocuments.push({
        docName: "fitness",
        file: initialValues.fitness,
      });
    }
    if (initialValues.proposal) {
      updatedDocuments.push({
        docName: "proposal",
        file: initialValues.proposal,
      });
    }
    if (initialValues.currentPolicy) {
      updatedDocuments.push({
        docName: "currentPolicy",
        file: initialValues.currentPolicy,
      });
    }
    if (initialValues.other) {
      updatedDocuments.push({ docName: "other", file: initialValues.other });
    }
    setDocuments(updatedDocuments);
  }, [initialValues]);



  return (
    <>
      <div className="bg-blue-200 p-1">
        <Paper elevation={3} style={{ padding: 20 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                className="text-safekaroDarkOrange"
                gutterBottom
                display="inline"
              >
                Update Documents
              </Typography>
              <Form
                mt={3}
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({ handleSubmit, submitError, submitting }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
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
                                <FileView fileName={formatFilename(doc.file)}>
                                  <input
                                    id={`file ${index}`}
                                    type="file"
                                    onChange={(e) =>
                                      handleFileInputChange(e, index)
                                    }
                                    style={{
                                      position: "absolute",
                                      opacity: 0,
                                      width: "100%",
                                      height: "100%",
                                      top: 0,
                                      left: 0,
                                      cursor: "pointer",
                                    }}
                                  />
                                </FileView>

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
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        {submitError && (
                          <div className="error text-safekaroDarkOrange">
                            {submitError}
                          </div>
                        )}
                        <Button variant="contained" type="submit">
                          submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              />
            </CardContent>
          </Card>
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default EditLeadForm;
