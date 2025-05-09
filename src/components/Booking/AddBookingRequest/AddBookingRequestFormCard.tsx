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
import React, { useEffect, useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import useGetPolicyTypes from "../../../Hooks/Policy/useGetPolicyTypes";
import {
  MAX_FILE_SIZE,
  Document,
  SafeKaroUser,
  header,
  ALLOWED_FILE_TYPES,
  imagePath,
  addBookingReqDocumentsOptions,
} from "../../../context/constant";
import useGetCaseTypes from "../../../Hooks/CaseType/useGetCaseTypes";
import useGetCompanies from "../../../Hooks/Company/useGetCompanies";
import useGetProducts from "../../../Hooks/Product/useGetProducts";
import useGetProductSubTypes from "../../../Hooks/Product/useGetProductSubTypes";
import { IProductSubTypes } from "../../Admin/ProductSubType/IProductSubTypes";
import { IProducts } from "../../Admin/Product/IProduct";
import {  policyCreatedByAdmin } from "../../Policy/IPolicyData";
import useGetPartners from "../../../Hooks/Partner/useGetPartners";
import addBookingRequestService from "../../../api/BookingRequest/AddBookingRequest/addBookingRequestService";
import { bookingRequestsPath } from "../../../sitemap";
import { IBookingRequestForm } from "../IBookingRequests";
import { useNavigate, useParams } from "react-router-dom";
import { FORM_ERROR, setIn } from "final-form";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import validatePolicyNumberService from "../../../api/BookingRequest/ValidatePolicyNumber/validatePolicyNumberService";
export interface addBookingRequestFormProps {
  initialValues: IBookingRequestForm;
}
const AddBookingRequestFormCard = (props: addBookingRequestFormProps) => {
  let { initialValues } = props;
  const { leadId } = useParams();
  const [policyErrorMessage, setPolicyErrorMessage] = useState("");
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);
  const [errors, setErrors] = useState<{ docName: string; file: string }[]>([
    { docName: "", file: "" },
  ]);
  const timeRef = useRef<NodeJS.Timeout|null>(null)
  const navigate = useNavigate();
  let [policyTypes] = useGetPolicyTypes({ header: header });
  let [caseTypes] = useGetCaseTypes({ header: header });
  let [companies] = useGetCompanies({ header: header });
  let [products] = useGetProducts({ header: header,category:"motor" });
  let [productSubTypes] = useGetProductSubTypes({ header: header });
  let [partners] = useGetPartners({ header: header, role: "partner" });
  const [selectedProduct, setSelectedProduct] = useState<IProducts>();
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    IProductSubTypes[]
  >([]);
  const [selectedPolicyCreatedBy, setSelectedPolicyCreatedBy] = useState();
  const [selectedPartnerName, setSelectedPartnerName] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [selectedRMName, setSelectedRMName] = useState("");
  const[isLoading,setIsLoading] = useState(false);
  const [selectedRMId, setSelectedRMId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
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
  useEffect(() => {
    if (selectedProduct) {
      const ProductId = selectedProduct._id;
      const subCategory = productSubTypes.filter(
        (sub) => sub.productId === ProductId
      );
      if (subCategory.length > 0) {
        setFilteredSubcategories(subCategory);
      } else {
        setFilteredSubcategories([]);
      }
    } else {
      setFilteredSubcategories(productSubTypes);
    }
  }, [selectedProduct, productSubTypes]);
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
  const handleSelectPolicyCreatedBy = (event: any, newValue: any) => {
    setSelectedPolicyCreatedBy(newValue.label);
  };
  const handleSelectPartnerChange = async (e: any) => {
    setSelectedPartnerId(e._id!);
    setSelectedPartnerName(e.name!);
    setSelectedRMId(e.headRMId!);
    setSelectedRMName(e.headRM!);
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
  const bindValues = (bookingForm: any, form: any) => {
    bookingForm.relationshipManagerId =
      userData.role.toLowerCase() === "partner"
        ? userData.headRMId
        : selectedRMId;
    bookingForm.relationshipManagerName =
      userData.role.toLowerCase() === "partner"
        ? userData.headRM
        : selectedRMName;
    bookingForm.partnerId =
      userData.role.toLowerCase() === "partner"
        ? userData.profileId
        : selectedPartnerId;
    bookingForm.partnerName =
      userData.role.toLowerCase() === "partner"
        ? userData.name
        : selectedPartnerName;
    bookingForm.createdBy = userData.name;
    bookingForm.bookingCreatedBy = userData.profileId;
    const formData = new FormData();
    formData.append("policyNumber", bookingForm.policyNumber);
    formData.append("category", bookingForm.category);
    formData.append("policyType", bookingForm.policyType);
    formData.append("caseType", bookingForm.caseType);
    formData.append("productType", bookingForm.productType);
    formData.append("subCategory", bookingForm.subCategory);
    formData.append("companyName", bookingForm.companyName);
    formData.append("bookingStatus", bookingForm.bookingStatus);
    formData.append("bookingAcceptedBy", bookingForm.bookingAcceptedBy);
    formData.append("bookingCreatedBy", bookingForm.bookingCreatedBy);
    formData.append("partnerId", bookingForm.partnerId);
    formData.append("partnerName", bookingForm.partnerName);
    formData.append("createdBy", userData.name);
    formData.append("relationshipManagerId", bookingForm.relationshipManagerId);
    formData.append(
      "relationshipManagerName",
      bookingForm.relationshipManagerName
    );
    documents.forEach((doc: Document) => {
      if (doc.file) {
        formData.append(doc.docName, doc.file);
      }
    });
    callAddBookingRequestAPI(formData, form);
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
  
  const getDocumentUrl = (file: any): string | undefined => {
    if (!file) return undefined; // null ki jagah undefined return karein
    if (file instanceof File) {
      return URL.createObjectURL(file); // Naya upload hua file
    }
    return `${imagePath}${encodeURIComponent(file)}`; // API se aayi purani file
  };

  const onSubmit = (bookingForm: any, form: any) => {
    const formValid = documents.every((doc, index) =>
      validateDocument(doc, index)
    );
    if (leadId) {
      bookingForm.relationshipManagerId = initialValues.relationshipManagerId;
      bookingForm.relationshipManagerName =
        initialValues.relationshipManagerName;
      bookingForm.partnerId = initialValues.partnerId;
      bookingForm.partnerName = initialValues.partnerName;
      bookingForm.createdBy = userData.name;
      bookingForm.bookingCreatedBy = userData.profileId;
      const formData = new FormData();
      formData.append("leadId", leadId);
      formData.append("policyNumber", bookingForm.policyNumber);
      formData.append("category", bookingForm.category);
      formData.append("policyType", bookingForm.policyType);
      formData.append("caseType", bookingForm.caseType);
      formData.append("productType", bookingForm.productType);
      formData.append("subCategory", bookingForm.subCategory);
      formData.append("companyName", bookingForm.companyName);
      formData.append("bookingStatus", bookingForm.bookingStatus);
      formData.append("bookingAcceptedBy", bookingForm.bookingAcceptedBy);
      formData.append("bookingCreatedBy", bookingForm.bookingCreatedBy);
      formData.append("partnerId", bookingForm.partnerId);
      formData.append("partnerName", bookingForm.partnerName);
      formData.append(
        "relationshipManagerId",
        bookingForm.relationshipManagerId
      );
      formData.append(
        "relationshipManagerName",
        bookingForm.relationshipManagerName
      );
      formData.append("createdBy", userData.name);
      documents.forEach((doc: Document) => {
        if (doc.file) {
          formData.append(doc.docName, doc.file);
        }
      });
      callAddBookingRequestAPI(formData, form);
    } else {
      if (userData.role.toLowerCase() === "operation") {
        if (!selectedRMId) {
          setPolicyErrorMessage("Select Partner or RM");
        } else if (formValid) {
          bindValues(bookingForm, form);
        }
      } else {
        if (formValid) {
          setPolicyErrorMessage("");
          bindValues(bookingForm, form);
        }
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
  const callAddBookingRequestAPI = async (bookingRequest: any, form: any) => {
    try {
      setIsLoading(true)
      const newBookingPolicy = await addBookingRequestService({
        header,
        bookingRequest,
      });
      if (newBookingPolicy.status === "success") {
        navigate(bookingRequestsPath());
      } else {
        return { [FORM_ERROR]: `error` };
      }
    } catch (err: any) {
      const errObj = await err;
      toast.error(errObj.message);
      setDocuments([{ docName: "", file: "" }]);
      return { [FORM_ERROR]: `error ` };
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
    policyNumber: yup
      .string()
      .required("Policy Number is required")
      .min(1, "Policy Number must be at least 1 character")
      .max(100, "policyNumber cannot exceed 100 characters"),
    policyType: yup.string().nullable().required("Policy Type is required"),
    caseType: yup.string().nullable().required("Case Type is required"),
    companyName: yup.string().nullable().required("Company Name is required"),
    productType: yup.string().required("Product Type is required").nullable(),
  });
  const addValidate = validateFormValues(validationSchema);

  
  const handleChangePolicyNumber = async (e: any) => {
    if(timeRef.current){
      clearTimeout(timeRef.current)
    }
    const policyNumber = e.target.value;
    timeRef.current = setTimeout(async() => {
      
      try {
        const newPolicy = await validatePolicyNumberService({
          header,
          policyNumber,
        });
        if (newPolicy.exist === true) {
          setPolicyErrorMessage(newPolicy.message);
        } else {
          setPolicyErrorMessage("");
        }
      } catch (error: any) {
        const err = await error;
        toast.error(err.message);
      }
    }, 300);
  };
  return (
    <>
     
            <Form
              mt={3}
              onSubmit={onSubmit}
              initialValues={initialValues}
              validate={addValidate}
              render={({ handleSubmit, submitError, submitting }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      {policyErrorMessage && (
                        <div style={{ color: "red" }}>{policyErrorMessage}</div>
                      )}
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="policyNumber">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            id="policyNumber"
                            size="small"
                            fullWidth
                            label="Enter Policy Number"
                            onChange={(e) => {
                              const value = e.target.value.replace(/\s/g, "");
                              input.onChange(value);
                              handleChangePolicyNumber(e);
                            }}
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
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
                                  input.onChange(newValue.policyType);
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
                                options={caseTypes}
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.caseType || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.caseType || ""
                                }
                                onChange={(event, newValue) => {
                                  input.onChange(newValue.caseType);
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
                      <Field name="productType">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="productType"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.productType || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.productName || ""
                                }
                                options={products}
                                onChange={(event, newValue) => {
                                  input.onChange(newValue.productName);
                                  setSelectedProduct(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Product"
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
                    {filteredSubcategories &&
                      filteredSubcategories.length > 0 && (
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Field name="subCategory">
                            {({ input, meta }) => (
                              <div>
                                <FormControl fullWidth size="small">
                                  <Autocomplete
                                    {...input}
                                    id="subCategory"
                                    value={
                                      input.value !== undefined
                                        ? input.value
                                        : initialValues.subCategory || null
                                    }
                                    getOptionLabel={(option) =>
                                      typeof option === "string"
                                        ? option
                                        : option.productSubType || ""
                                    }
                                    onChange={(event, newValue) =>
                                      input.onChange(newValue.productSubType)
                                    }
                                    options={filteredSubcategories}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label=" Select Sub Category"
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
                      )}
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
                                  input.onChange(newValue.companyName);
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
                    {!leadId &&
                    (userData.role.toLowerCase() === "operation" ||
                      userData.role.toLowerCase() === "admin") ? (
                      <>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Field name="policyCreatedBy">
                            {({ input, meta }) => (
                              <div>
                                <FormControl fullWidth size="small">
                                  <Autocomplete
                                    {...input}
                                    getOptionLabel={(option) => option.label}
                                    value={input.value || null}
                                    options={[{ label: "Partner", value: "Partner" }]}
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
                                            helperText={
                                              meta.touched && meta.error
                                            }
                                          />
                                        )}
                                      />
                                    </FormControl>
                                  </div>
                                )}
                              </Field>
                            </Grid>
                          )}
                      </>
                    ) : (
                      ""
                    )}
                    <Grid item md={12} mt={2}>
                      <Button
                        variant="outlined"
                        onClick={handleClickAddDocument}
                      >
                        Add More Document
                      </Button>
                      <Typography variant="body1" gutterBottom mr={4}>
                        {"Image or pdf should be <= 4MB."}
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
                                  addBookingReqDocumentsOptions.find(
                                    (option) => option.value === doc.docName
                                  ) || null
                                }
                                onChange={(e, newValue) =>
                                  handleChangeDocumentName(newValue!, index)
                                }
                                options={addBookingReqDocumentsOptions}
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
                              {doc.file ? (
                                <>
                                  <Tooltip title={typeof doc.file === "string" ? doc.file : "View Document"}>
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
               <Button
  type="submit"
  disabled={isLoading}
  variant="contained"
  color="primary"
  className="btnGradient text-black px-5 py-2 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
>
  {isLoading ? "Submitting..." : "Submit"}
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
export default AddBookingRequestFormCard;
