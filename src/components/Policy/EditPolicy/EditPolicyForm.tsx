import {
  Autocomplete,
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { Field, Form } from "react-final-form";
import { setIn } from "final-form";
import { IAddEditPolicyForm } from "../IPolicy";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import addPolicyService from "../../../api/Policies/AddPolicy/addPolicyService";
import {
  MAX_FILE_SIZE,
  SafeKaroUser,
  Document,
  header,
  ALLOWED_FILE_TYPES,
  DAY_FORMAT,
  imagePath,
} from "../../../context/constant";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { motorPolicyPath } from "../../../sitemap";
import { useNavigate } from "react-router-dom";
import { FORM_ERROR } from "final-form";
import useGetProductSubTypes from "../../../Hooks/Product/useGetProductSubTypes";
import useGetPolicyTypes from "../../../Hooks/Policy/useGetPolicyTypes";
import useGetCaseTypes from "../../../Hooks/CaseType/useGetCaseTypes";
import useGetProducts from "../../../Hooks/Product/useGetProducts";
import useGetBrokers from "../../../Hooks/Broker/useGetBrokers";
import useGetCompanies from "../../../Hooks/Company/useGetCompanies";
import useGetFuelTypes from "../../../Hooks/FuelType/useGetFuelTypes";
import {
  documentTypes,
  paymentModes,
  policyCreatedBy,
  policyCreatedByAdmin,
} from "../IPolicyData";
import useGetMakes from "../../../Hooks/Make/useGetMakes";
import useGetModels from "../../../Hooks/Model/useGetModels";
import useGetPartners from "../../../Hooks/Partner/useGetPartners";
import { IProducts } from "../../Admin/Product/IProduct";
import { IProductSubTypes } from "../../Admin/ProductSubType/IProductSubTypes";
import { IModels } from "../../Admin/Model/IModel";
import { IMakes } from "../../Admin/Make/IMake";
import getPolicyByNumberService from "../../../api/Policies/GetPolicyByNumber/getPolicyByNumberService";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
export interface AddPolicyFormProps {
  initialValues: IAddEditPolicyForm;
}
const EditPolicyForm = (props: AddPolicyFormProps) => {
  const { initialValues } = props;
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [policyType, setPolicyType] = useState("");
  const [od, setOd] = useState(0);
  const [tp, setTp] = useState(0);
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "currentPolicy", file: "" },
  ]);
  const [errors, setErrors] = useState<{ docName: string; file: string }[]>([
    { docName: "", file: "" },
  ]);
  let [policyTypes] = useGetPolicyTypes({ header: header });
  let [relationshipManagers] = useGetPartners({
    header: header,
    role: "Relationship Manager",
  });
  const [isLoading, setIsLoading] = useState(false);
  let [partners] = useGetPartners({ header: header, role: "partner" });
  let [caseTypes] = useGetCaseTypes({ header: header });
  let [makes] = useGetMakes({ header: header });
  let [models] = useGetModels({ header: header });
  let [fuelTypes] = useGetFuelTypes({ header: header });
  let [brokers] = useGetBrokers({ header: header });
  let [companies] = useGetCompanies({ header: header });
  let [products] = useGetProducts({ header: header, category: "motor" });
  let [productSubTypes] = useGetProductSubTypes({ header: header });
  const [isVisibile, setIsVisibile] = useState(false);
  const [selectedBrokerId, setSelectedBrokerId] = useState("");
  const [selectedPartnerName, setSelectedPartnerName] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [selectedRMName, setSelectedRMName] = useState("");
  const [selectedRMId, setSelectedRMId] = useState("");
  const navigate = useNavigate();
  const [selectedPaymentMode, setSelectedPaymentMode] = useState();
  const [selectedPolicyCreatedBy, setSelectedPolicyCreatedBy] =
    useState<string>();
  const [selectedProduct, setSelectedProduct] = useState<IProducts>();
  const [selectedMake, setSelectedMake] = useState<IMakes>();
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    IProductSubTypes[]
  >([]);
  const [filteredSubModels, setFilteredSubModels] = useState<IModels[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [policyErrorMessage, setPolicyErrorMessage] = useState("");
  const [rmErrorMessage, setRMErrorMessage] = useState("");
  const [netPremium, setNetPremium] = useState(Number(od) + Number(tp));
  const [proType, setProType] = useState(initialValues.productType || "");
  useEffect(() => {
    setNetPremium(Number(od) + Number(tp));
  }, [od, tp]);
  const handleNetPremiumChange = (event: any) => {
    const value = event.target.value;
    setNetPremium(value);
  };
  useEffect(() => {
    if (!initialValues) return;
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
    setSelectedBrokerId(initialValues.brokerId ?? "");
    setSelectedPartnerId(initialValues.partnerId ?? "");
    setSelectedPartnerName(initialValues.partnerName ?? "");
    setSelectedRMId(initialValues.relationshipManagerId ?? "");
    setSelectedRMName(initialValues.relationshipManagerName ?? "");
    setRMErrorMessage("");
    setProType(initialValues.productType);
    if (initialValues.policyCreatedBy) {
      setSelectedPolicyCreatedBy(initialValues.policyCreatedBy);
    }
  }, [initialValues]);
  useEffect(() => {
    if (selectedMake) {
      const MakeId = selectedMake._id;
      setFilteredSubModels(models.filter((sub) => sub.makeId === MakeId));
    } else {
      setFilteredSubModels(models);
    }
  }, [selectedMake, models]);

  const extractNumbers = (str: string): number[] => {
    const match = str.match(/\d+/g);
    return match ? match.map(Number) : [];
  };
  useEffect(() => {
    if (selectedProduct) {
      const productId: string = selectedProduct._id!;
      const filterData: IProductSubTypes[] = productSubTypes.filter(
        (sub) => sub.productId === productId
      );
      if (selectedProduct.productName?.toLowerCase() === 'goods carrying vehicle') {
        setIsVisibile(true);
        filterData.sort((a, b) => {
          const aNumbers = extractNumbers(a.productSubType!);
          const bNumbers = extractNumbers(b.productSubType!);

          for (let i = 0; i < Math.min(aNumbers.length, bNumbers.length); i++) {
            if (aNumbers[i] !== bNumbers[i]) {
              return aNumbers[i] - bNumbers[i];
            }
          }

          return aNumbers.length - bNumbers.length;
        });
        setFilteredSubcategories(filterData);
      } else {
        setFilteredSubcategories(filterData.sort());
      }



    } else {
      setIsVisibile(false);
      setFilteredSubcategories(productSubTypes);
    }
  }, [selectedProduct, productSubTypes]);


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

  const getDocumentUrl = (file: any): string | undefined => {
    if (!file) return undefined; // null ki jagah undefined return karein
    if (file instanceof File) {
      return URL.createObjectURL(file); // Naya upload hua file
    }
    return `${imagePath}${encodeURIComponent(file)}`; // API se aayi purani file
  };

  const calculateYearDifference = (
    startDate: string,
    endDate: string
  ): number => {
    const endTime = dayjs(endDate);
    const startTime = dayjs(startDate);
    let yearsDifference = endTime.year() - startTime.year();
    const monthDifference = endTime.month() - startTime.month();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && endTime.date() < startTime.date())
    ) {
      yearsDifference--;
    }
    return yearsDifference;
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
  const bindValues = async (policyForm: any) => {
    if (policyType.toLowerCase().trim() === "third party only/ tp") {
      policyForm["idv"] = 0;
    }
    policyForm.issueDate = dayjs(policyForm.issueDate).format(DAY_FORMAT);
    policyForm.registrationDate = dayjs(policyForm.registrationDate).format(
      DAY_FORMAT
    );
    policyForm.endDate = dayjs(policyForm.endDate).format(DAY_FORMAT);

    const yearDifference = calculateYearDifference(
      policyForm.registrationDate,
      policyForm.issueDate
    );
    if (yearDifference <= 0) {
      policyForm.vehicleAge = "0 year";
    } else if (yearDifference >= 1 && yearDifference <= 2) {
      policyForm.vehicleAge = "1-2 year";
    } else if (yearDifference >= 3 && yearDifference <= 5) {
      policyForm.vehicleAge = "3-5 year";
    } else if (yearDifference > 5) {
      policyForm.vehicleAge = ">5 year";
    } else {
      policyForm.vehicleAge = null;
    }
    policyForm.relationshipManagerId =
      userData.role.toLowerCase() === "admin"
        ? selectedRMId
        : policyForm.policyCreatedBy === "Direct"
        ? userData.headRMId
        : selectedRMId;
    policyForm.relationshipManagerName =
      userData.role.toLowerCase() === "admin"
        ? selectedRMName
        : policyForm.policyCreatedBy === "Direct"
        ? userData.headRM
        : selectedRMName;
    policyForm.partnerId =
      userData.role.toLowerCase() === "admin"
        ? selectedPartnerId
        : policyForm.policyCreatedBy === "Direct"
        ? userData.profileId
        : selectedPartnerId;
    policyForm.partnerName =
      userData.role.toLowerCase() === "admin"
        ? selectedPartnerName
        : policyForm.policyCreatedBy === "Direct"
        ? userData.name
        : selectedPartnerName;
    policyForm.createdBy = userData.name;
    policyForm.vehicleNumber = policyForm.vehicleNumber.toUpperCase();
    policyForm.rto = policyForm.vehicleNumber.substring(0, 4);
    policyForm.policyCompletedBy = userData.profileId;
    policyForm.netPremium = netPremium;
    policyForm.brokerId = selectedBrokerId;
    policyForm.bookingRMId = userData.headRMId;
    const formData = new FormData();
    const addedKeys = new Map<string, string>();
    Object.keys(policyForm).forEach((key) => {
      const value = policyForm[key as keyof IAddEditPolicyForm];
      if (value !== undefined) {
        addedKeys.set(key, value);
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
    callAddPolicyAPI(formData);
  };

  const validateDateWithMfg = (mgfYear: string, valueStr: string) => {
    const yearValue = dayjs(valueStr).year();
    if (Number(mgfYear) > Number(yearValue)) {
      return true;
    }
    return false;
  };
  const onSubmit = async (policyForm: any) => {
    const isIssueDateValid = dayjs(policyForm.issueDate).isValid();
    const isRegDateValid = dayjs(policyForm.registrationDate).isValid();
    const isEndDateValid = dayjs(policyForm.endDate).isValid();
    const startDate = dayjs(policyForm.issueDate);
    const endDate = dayjs(policyForm.endDate);
    if (!isIssueDateValid) {
      toast.error("Invalid issue Date");
      return;
    }
    if (!isEndDateValid) {
      toast.error("Invalid end Date");
      return;
    }
    if (!isRegDateValid) {
      toast.error("Invalid Registration  Date");
      return;
    }
    if (endDate.isBefore(startDate)) {
      toast.error("End Date cannot be earlier than the Issue Date");
      return;
    }

    if (
      validateDateWithMfg(
        policyForm.mfgYear as string,
        policyForm.registrationDate as string
      )
    ) {
      toast.error(
        "Registration date cannot be earlier than the manufacturing year"
      );
      return;
    }

    if (
      validateDateWithMfg(
        policyForm.mfgYear as string,
        policyForm.issueDate as string
      )
    ) {
      toast.error("Issue date cannot be earlier than the manufacturing year");
      return;
    }
    const formValid = documents.every((doc, index) =>
      validateDocument(doc, index)
    );
    const createdOn = dayjs(initialValues.createdOn);
    const now = dayjs();
    const diff = now.diff(createdOn);
    policyForm["timer"] = diff.toString();
    if (initialValues.bookingId) {
      policyForm["bookingId"] = initialValues.bookingId;
    }
    if (initialValues.leadId) {
      policyForm["leadId"] = initialValues.leadId;
    }
    if (policyForm.policyCreatedBy.toLowerCase() === "admin") {
      if (!selectedRMId) {
        setRMErrorMessage("Select Partner or RM");
      } else if (formValid) {
        await bindValues(policyForm);
      }
    } else if (policyForm.policyCreatedBy !== "Direct") {
      setPolicyErrorMessage("");
      if (!selectedRMId) {
        setRMErrorMessage("Select Partner or RM");
      } else if (formValid) {
        await bindValues(policyForm);
      }
    } else {
      if (formValid) {
        await bindValues(policyForm);
      }
    }
  };

  const callAddPolicyAPI = async (policy: any) => {
    try {
      setIsLoading(true);
      const newPolicy = await addPolicyService({ header, policy });
      if (newPolicy.status === "success") {
        navigate(motorPolicyPath());
      } else {
        return { [FORM_ERROR]: `${newPolicy.message}` };
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
      return { [FORM_ERROR]: `${"message"}` };
    } finally {
      setIsLoading(false);
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
  const validateFormValues = (schema: any) => async (values: any) => {
    if (typeof schema === "function") {
      schema = schema();
    }
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (err: any) {
      const errors = err.inner.reduce((formError: any, innerError: any) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {}) as any;
      return errors;
    }
  };
  const addValidationSchema = yup.object({
    policyNumber: yup
      .string()
      .required("Policy Number is required")
      .min(1, "Policy Number must be at least 1 character")
      .max(100, "Policy Number cannot exceed 100 characters")
      .test(
        "no-invalid-characters",
        "Policy Number contains invalid characters.",
        (value) => {
          if (!value) return false;
          return !/[^a-zA-Z0-9\/\-\s]/.test(value);
        }
      )
      .test(
        "no-whitespace-between-numbers",
        "Whitespace is not allowed between numbers.",
        (value) => {
          if (!value) return false; // Required validation will handle this
          // Disallow spaces between numbers
          return !/\d\s+\d/.test(value);
        }
      )
      .transform((value) =>
        value ? value.replace(/\s+/g, " ").trim() : value
      ),
    mfgYear: yup.number().required("MFG Year is required").nullable(),
    tenure: yup.number().required("Tenure is required").nullable(),
    cc: yup.string().required("CC is required").nullable(),
    tp: yup.number().required("TP is required").nullable(),
    od: yup.number().required("OD is required").nullable(),
    idv: yup
      .number()
      .nullable()
      .when([], {
        is: () => policyType.toLowerCase().trim() === "third party only/ tp",
        then: yup.number().nullable(),
        otherwise: yup.number().required("IDV is required").nullable(),
      }),
    netPremium: yup.number().required("Net Premium is required").nullable(),
    finalPremium: yup.number().required("Final Premium is required").nullable(),
    fullName: yup
      .string()
      .trim()
      .nullable()
      .required("Full Name is required")
      .min(1, "Full Name must be at least 1 character")
      .max(100, "Full Name cannot exceed 100 characters"),
    emailId: yup
      .string()
      .trim()
      .nullable()
      .required("Email Id is required")
      .min(1, "Email Id must be at least 1 character"),
    phoneNumber: yup
      .string()
      .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits long")
      .required("Phone Number is required")
      .min(1, "Phone Number must be at least 1 character")
      .max(10, "Phone Number must be at least 10 character"),
    vehicleNumber: yup
      .string()
      .required("Vehicle Number is required")
      .min(1, "Vehicle Number must be at least 1 character")
      .max(10, "Vehicle Number must can be 10 character"),
    registrationDate: yup
      .string()
      .required("Registration Date is required")
      .nullable(),
    endDate: yup.string().required("End Date is required").nullable(),
    issueDate: yup.string().required("Issue Date is required").nullable(),
    policyType: yup.string().required("Policy Type is required").nullable(),
    caseType: yup.string().nullable().required("Case Type is required"),
    productType: yup.string().nullable().required("Product Type is required"),
    companyName: yup.string().nullable().required("Company Name is required"),
    make: yup.string().required("Make is required").nullable(),
    model: yup.string().nullable().required("Model is required"),
    fuelType: yup.string().nullable().required("Fuel Type is required"),
    paymentMode: yup.string().nullable().required("Payment Mode is required"),
    ncb: yup.string().nullable().required("NCB is required"),
    broker: yup.string().nullable().required("Broker Name is required"),
    policyCreatedBy: yup
      .string()
      .nullable()
      .required("Policy Created By is required"),
  });
  const addValidate = validateFormValues(addValidationSchema);
  const handleSelectPolicyCreatedBy = (event: any, newValue: any) => {
    setSelectedPolicyCreatedBy(newValue ? newValue.label : "");
  };
  const handleSelectPaymentMode = (event: any, newValue: any) => {
    setSelectedPaymentMode(newValue ? newValue.label : "");
  };
  const handleSelectPartnerChange = async (e: any) => {
    if (e._id) {
      setSelectedPartnerId(e._id!);
      setSelectedPartnerName(e.fullName!);
      setSelectedRMId(e.headRMId!);
      setSelectedRMName(e.headRM!);
      setRMErrorMessage("");
    }
  };
  const handleSelectRMChange = async (e: any) => {
    setSelectedRMId(e._id!);
    setSelectedRMName(e.fullName!);
  };
  const handleChangePolicyNumber = async (e: any) => {
    const policyNumber = e.target.value;
    try {
      const newPolicy = await getPolicyByNumberService({
        header,
        policyNumber,
      });
      if (newPolicy.exist === true) {
        setPolicyErrorMessage(newPolicy.message);
      } else {
        setPolicyErrorMessage("");
      }
    } catch {
      console.error("eror");
    }
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
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="policyNumber">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            fullWidth
                            label="Enter Policy Number"
                            variant="outlined"
                            onChange={(e) => {
                              const value = e.target.value.replace(/\s/g, "");
                              input.onChange(value);
                              handleChangePolicyNumber(e);
                            }}
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                      {policyErrorMessage && (
                        <div style={{ color: "red" }}>{policyErrorMessage}</div>
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
                                  if (newValue && newValue.policyType) {
                                    setPolicyType(newValue.policyType);
                                  }
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
                                    value={policyType}
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
                      <Field name="productType">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.productType || null
                                }
                                options={products}
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.productName || ""
                                }
                                onChange={(event, newValue) => {
                                  input.onChange(
                                    newValue ? newValue.productName : ""
                                  );
                                  setSelectedProduct(newValue);
                                  setProType(newValue?.productName);
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
                                    value={input.value || null}
                                    getOptionLabel={(option) =>
                                      typeof option === "string"
                                        ? option
                                        : option.productSubType || ""
                                    }
                                    onChange={(event, newValue) =>
                                      input.onChange(
                                        newValue ? newValue.productSubType : ""
                                      )
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
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="broker">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="broker"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.broker || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : `${option.brokerName} - ${option.brokerCode}` ||
                                      ""
                                }
                                options={brokers}
                                onChange={(event, newValue) => {
                                  input.onChange(
                                    newValue ? newValue.brokerName : ""
                                  );
                                  setSelectedBrokerId(
                                    newValue ? newValue._id : ""
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Broker"
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
                      <Field name="make">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="make"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.make || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.makeName || ""
                                }
                                options={makes}
                                onChange={(event, newValue) => {
                                  input.onChange(
                                    newValue ? newValue.makeName : ""
                                  );
                                  setSelectedMake(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Make"
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
                    {filteredSubModels && filteredSubModels.length > 0 && (
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="model">
                          {({ input, meta }) => (
                            <div>
                              <FormControl fullWidth size="small">
                                <Autocomplete
                                  {...input}
                                  id="model"
                                  value={
                                    input.value !== undefined
                                      ? input.value
                                      : initialValues.model || null
                                  }
                                  getOptionLabel={(option) =>
                                    typeof option === "string"
                                      ? option
                                      : option.modelName || ""
                                  }
                                  options={filteredSubModels}
                                  onChange={(event, newValue) => {
                                    input.onChange(
                                      newValue ? newValue.modelName : ""
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label=" Select Model"
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
                      <Field name="fuelType">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="fuelType"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.fuelType || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.fuelType || ""
                                }
                                options={fuelTypes}
                                onChange={(event, newValue) => {
                                  input.onChange(
                                    newValue ? newValue.fuelType : ""
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Fuel Type"
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
                      <Field name="registrationDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="Registration Date"
                              inputFormat="DD/MM/YYYY"
                              value={input.value || null}
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
                      <Field name="issueDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="Issue Date"
                              value={input.value || null}
                              inputFormat="DD/MM/YYYY"
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
                      <Field name="endDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disablePast
                              label="End Date"
                              inputFormat="DD/MM/YYYY"
                              value={input.value || null}
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
                      <Field name="vehicleNumber">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            label="Enter Vehicle Number"
                            variant="outlined"
                            className="rounded-sm w-full"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="ncb">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="ncb"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.ncb || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.label || ""
                                }
                                onChange={(event, newValue) => {
                                  input.onChange(
                                    newValue ? newValue.value : null
                                  );
                                }}
                                options={[
                                  { label: "Yes", value: "yes" },
                                  { label: "No", value: "no" },
                                ]}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select NCB"
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
                      <Field name="mfgYear">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            fullWidth
                            size="small"
                            type="number"
                            label="Enter MFG Year"
                            className="rounded-sm w-full"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="tenure">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            fullWidth
                            size="small"
                            type="number"
                            label="Enter Tenure"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    {isVisibile ? (
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="weight">
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              label="Enter Weight"
                              type="number"
                              fullWidth
                              variant="outlined"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                      </Grid>
                    ) : (
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="seatingCapacity">
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              fullWidth
                              type="number"
                              label="Enter Seating Capacity"
                              variant="outlined"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                      </Grid>
                    )}
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="cc">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            label="Enter CC"
                            type="number"
                            fullWidth
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                            disabled={proType === "Goods carrying vehicle"}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="idv">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            fullWidth
                            label="Enter IDV"
                            type="number"
                            variant="outlined"
                            disabled={policyType === "Third Party Only/ TP"}
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="od">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            fullWidth
                            label="Enter OD"
                            type="number"
                            value={od}
                            onChangeCapture={(e: any) => setOd(e.target.value)}
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                            disabled={policyType === "Third Party Only/ TP"}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="tp">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            fullWidth
                            label="Enter TP"
                            variant="outlined"
                            type="number"
                            value={tp}
                            onChangeCapture={(e: any) => setTp(e.target.value)}
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                            disabled={policyType === "Own Damage Only/ OD"}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="netPremium">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            fullWidth
                            type="number"
                            label="Enter Net Premium"
                            variant="outlined"
                            value={netPremium}
                            onChange={(event) => {
                              input.onChange(event);
                              handleNetPremiumChange(event);
                            }}
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="finalPremium">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            type="number"
                            label="Enter Final Premium"
                            fullWidth
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <>
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="fullName">
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              label="Enter Full Name"
                              className="rounded-sm w-full"
                              variant="outlined"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="emailId">
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              fullWidth
                              label="Enter Email Id"
                              className="rounded-sm w-full"
                              variant="outlined"
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
                              fullWidth
                              type="text"
                              size="small"
                              label="Enter Phone Number"
                              className="rounded-sm w-full"
                              variant="outlined"
                              inputProps={{ maxLength: 10 }}
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="paymentMode">
                          {({ input, meta }) => (
                            <div>
                              <FormControl fullWidth size="small">
                                <Autocomplete
                                  {...input}
                                  id="paymentMode"
                                  value={
                                    input.value !== undefined
                                      ? input.value
                                      : initialValues.paymentMode || null
                                  }
                                  getOptionLabel={(option) =>
                                    typeof option === "string"
                                      ? option
                                      : option.label || null
                                  }
                                  onChange={(event, newValue) => {
                                    input.onChange(
                                      newValue ? newValue.value : null
                                    );
                                    handleSelectPaymentMode(event, newValue);
                                  }}
                                  options={paymentModes}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      className="rounded-sm w-full"
                                      size="small"
                                      label=" Select Payment Mode"
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
                      {selectedPaymentMode &&
                        selectedPaymentMode !== "Cash" && (
                          <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Field name="paymentDetails">
                              {({ input, meta }) => (
                                <TextField
                                  {...input}
                                  size="small"
                                  fullWidth
                                  label="Enter Payment Details"
                                  variant="outlined"
                                  error={meta.touched && Boolean(meta.error)}
                                  helperText={meta.touched && meta.error}
                                />
                              )}
                            </Field>
                          </Grid>
                        )}
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="policyCreatedBy">
                          {({ input, meta }) => (
                            <div>
                              <FormControl fullWidth size="small">
                                <Autocomplete
                                  {...input}
                                  id="policyCreatedBy"
                                  value={
                                    input.value !== undefined
                                      ? input.value
                                      : initialValues.policyCreatedBy || null
                                  }
                                  getOptionLabel={(option) =>
                                    typeof option === "string"
                                      ? option
                                      : option.label || ""
                                  }
                                  options={
                                    userData.role.toLowerCase() === "admin"
                                      ? policyCreatedBy
                                      : policyCreatedByAdmin
                                  }
                                  onChange={(event, newValue) => {
                                    input.onChange(
                                      newValue ? newValue.value : ""
                                    );
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
                                      id="partnerName"
                                      value={
                                        input.value !== undefined
                                          ? input.value
                                          : initialValues.partnerName || null
                                      }
                                      getOptionLabel={(option) =>
                                        typeof option === "string"
                                          ? option
                                          : `${option.fullName} - ${option.partnerId}` ||
                                            ""
                                      }
                                      options={partners}
                                      onChange={(event, newValue) => {
                                        input.onChange(
                                          newValue ? newValue.fullName : ""
                                        );
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
                      {selectedPolicyCreatedBy &&
                        selectedPolicyCreatedBy === "Relationship Manager" && (
                          <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Field name="relationshipManagerName">
                              {({ input, meta }) => (
                                <div>
                                  <FormControl fullWidth size="small">
                                    <Autocomplete
                                      {...input}
                                      id="relationshipManagerName"
                                      getOptionLabel={(option) =>
                                        typeof option === "string"
                                          ? option
                                          : `${option.fullName} - ${option.partnerId}` ||
                                            ""
                                      }
                                      value={
                                        input.value !== undefined
                                          ? input.value
                                          : initialValues.relationshipManagerName ||
                                            null
                                      }
                                      options={relationshipManagers}
                                      onChange={(event, newValue) => {
                                        input.onChange(
                                          newValue ? newValue.fullName : ""
                                        );
                                        handleSelectRMChange(newValue);
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          className="rounded-sm w-full"
                                          size="small"
                                          label="Select Relationship Manager"
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
                      <Grid item md={12} mt={2}>
                        {rmErrorMessage && (
                          <div style={{ color: "red" }}>{rmErrorMessage}</div>
                        )}
                        <Button
                          variant="outlined"
                          onClick={handleClickAddDocument}
                        >
                          Add More Document
                        </Button>
                        <Typography variant="body1" gutterBottom mr={4}>
                          {"Image or PDF should be <= 4MB."}
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
                                {doc.file ? (
                                  <>
                                    <Tooltip title={`${doc.file}`}>
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
                    </>
                  </Grid>
                  <Grid container spacing={2} mt={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? "Submitting..." : "Submit"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </CardContent>
        </Card>
        <Toaster position="bottom-center" reverseOrder={false} />
      </React.Fragment>
    </>
  );
};
export default EditPolicyForm;
