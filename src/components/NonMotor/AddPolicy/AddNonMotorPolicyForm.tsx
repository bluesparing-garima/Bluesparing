import {
  Autocomplete,
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { Field, Form } from "react-final-form";
import { setIn } from "final-form";
import { IconButton, Tooltip } from "@mui/material";
import addPolicyService from "../../../api/Policies/AddPolicy/addPolicyService";
import toast, { Toaster } from "react-hot-toast";
import {
  MAX_FILE_SIZE,
  SafeKaroUser,
  Document,
  header,
  ALLOWED_FILE_TYPES,
  imagePath,
  ADD,
  DAY_FORMAT,
  addPolicyDocumentsOptions,
  addNonMotorPolicyDocumentsOptions,
} from "../../../context/constant";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { motorPolicyPath } from "../../../sitemap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FORM_ERROR } from "final-form";
import useGetProductSubTypes from "../../../Hooks/Product/useGetProductSubTypes";
import useGetPolicyTypes from "../../../Hooks/Policy/useGetPolicyTypes";
import useGetCaseTypes from "../../../Hooks/CaseType/useGetCaseTypes";
import useGetProducts from "../../../Hooks/Product/useGetProducts";
import useGetBrokers from "../../../Hooks/Broker/useGetBrokers";
import useGetCompanies from "../../../Hooks/Company/useGetCompanies";
import useGetFuelTypes from "../../../Hooks/FuelType/useGetFuelTypes";
import useGetMakes from "../../../Hooks/Make/useGetMakes";
import useGetModels from "../../../Hooks/Model/useGetModels";
import useGetPartners from "../../../Hooks/Partner/useGetPartners";
import { IProducts } from "../../Admin/Product/IProduct";
import { IProductSubTypes } from "../../Admin/ProductSubType/IProductSubTypes";
import { IModels } from "../../Admin/Model/IModel";
import { IMakes } from "../../Admin/Make/IMake";
import getPolicyByNumberService from "../../../api/Policies/GetPolicyByNumber/getPolicyByNumberService";
import dayjs from "dayjs";
import editPolicyService from "../../../api/Policies/EditPolicy/editPolicyService";
import getVechicleNumberService from "../../../api/Policies/GetVehicleNumber/getVechicleNumberService";
import FileView from "../../../utils/FileView";
import { formatFilename } from "../../../utils/convertLocaleStringToNumber";
import { updateLocalStorage } from "../../../utils/HandleStore";
import UpgradePlanPopup from "../../UpdatePlan/UpgradeExistingPlan";
import LoadingOverlay from "../../../utils/ui/LoadingOverlay";
import getPolicyCountAPI from "../../../api/Policies/getPolicyCount/getPolicyCountAPI";
import { IAddEditPolicyForm } from "../../Policy/IPolicy";
import {
  paymentModes,
  policyCreatedBy,
  policyCreatedByAdmin,
} from "../../Policy/IPolicyData";
import useGetOccupancy, { IOccupancy } from "../../../Hooks/Occupancy/useGetOccupancy";

export interface AddPolicyFormProps {
  initialValues: IAddEditPolicyForm;
}

const AddNonMotorPolicyForm = (props: AddPolicyFormProps) => {
  const { policyId } = useParams();
  const { initialValues } = props;
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "currentPolicy", file: "" },
  ]);
  const [errors, setErrors] = useState<{ docName: string; file: string }[]>([
    { docName: "", file: "" },
  ]);
  // let [policyTypes] = useGetPolicyTypes({ header: header });
  const policyTypes = [
    { policyType: "Fire" },
    { policyType: "Marine" },
    { policyType: "Miscellaneous" },
  ];

  const caseTypes = [
    { caseType: "New" },
    { caseType: "Renewal" },
    { caseType: "Rollover" },
  ];

  const marineProducts = [
    { label: "Marine Specific Policy (Single Voyage)" },
    { label: "Marine Open Policy (MOP)" },
    { label: "Sales Turnover Policy (STOP)" },
  ];

  const marineSubCategories = [
    { label: "Import" },
    { label: "Export" },
    { label: "Domestic" },
    { label: "Import + Export + Domestic" },
  ];

  const accidentalPercentages = [10, 15, 20, 25];

const [occupancy,setSelectedOccupancy] = useState<IOccupancy>()
  const [commodity, setCommodity] = useState("");
  const [annualTurnover, setAnnualTurnover] = useState<number>(0);
  const [accidentalPercent, setAccidentalPercent] = useState<number>(0);
  const [accidentalAmount, setAccidentalAmount] = useState<number>(0);

  const [miscProduct, setMiscProduct] = useState("");
  const [customProduct, setCustomProduct] = useState("");
  const [limitOfLiability, setLimitOfLiability] = useState("");

  const miscProductOptions = [
    { label: "3D Liability (Premises)" },
    { label: "Commercial General Liability (CGL)" },
    { label: "Public Liability Policy (PLI Act)" },
    { label: "Other" },
  ];

  let [relationshipManagers] = useGetPartners({
    header: header,
    role: "Relationship Manager",
  });
  let [occupancyData] = useGetOccupancy();
  let [partners] = useGetPartners({ header: header, role: "partner" });
  let [makes] = useGetMakes({ header: header });
  let [models] = useGetModels({ header: header });

  let [brokers] = useGetBrokers({ header: header });
  let [companies] = useGetCompanies({ header: header });
  let [products] = useGetProducts({ header: header, category: "motor" });
  let [productSubTypes] = useGetProductSubTypes({ header: header });
  const [selectedPartnerName, setSelectedPartnerName] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [selectedBrokerId, setSelectedBrokerId] = useState("");
  const [selectedRMName, setSelectedRMName] = useState("");
  const [selectedRMId, setSelectedRMId] = useState("");
  const [selectedCaseType, setSelectedCaseType] = useState(
    initialValues.caseType || ""
  );
  const [openBurglaryPopup, setOpenBurglaryPopup] = useState(false);
  const [firstLossBasis, setFirstLossBasis] = useState("");
  const [sumInsured, setSumInsured] = useState("");
  const fireSumInsured = "500000"; // example, fetch from fire data
  const [terrorismCover, setTerrorismCover] = useState(""); // "Yes" / "No"

  const fireProducts = [
    { product: "Sukah" },
    { product: "Laghu" },
    { product: "Standard Fire" },
    { product: "Residential Fire" },
  ];

  const yesNoOptions = [{ label: "Yes" }, { label: "No" }];

  const navigate = useNavigate();
  const [selectedPaymentMode, setSelectedPaymentMode] = useState();
  const [selectedPolicyCreatedBy, setSelectedPolicyCreatedBy] = useState<
    string | undefined
  >();
  const [selectedProduct, setSelectedProduct] = useState<IProducts>();
  const foundMake = () => {
    return makes?.find((ele) => {
      const val = initialValues.make?.toLowerCase();
      const arg = ele.makeName?.toLowerCase();
      return arg === val;
    });
  };

  const subCategories = [
    { subTypeName: "Import" },
    { subTypeName: "Export" },
    { subTypeName: "Domestic" },
    { subTypeName: "Import + Export + Domestic" },
  ];

  // Convert subTypeName to productSubType (matching IProductSubTypes interface)
  const convertedSubCategories: IProductSubTypes[] = subCategories.map(
    (item) => ({
      productSubType: item.subTypeName,
    })
  );

  const [filteredSubcategories, setFilteredSubcategories] = useState<
    IProductSubTypes[]
  >(convertedSubCategories);

  const [selectedMake, setSelectedMake] = useState<IMakes | undefined>();
  // const [filteredSubcategories, setFilteredSubcategories] = useState<
  //   IProductSubTypes[]
  // >([]);

  const [policyType, setPolicyType] = useState(initialValues.policyType || "");
  const [od, setOd] = useState(0);
  const [tp, setTp] = useState(0);
  const [filteredSubModels, setFilteredSubModels] = useState<IModels[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [policyErrorMessage, setPolicyErrorMessage] = useState("");
  const [vehicleErr, setVehicleErr] = useState("");
  const [rmErrorMessage, setRMErrorMessage] = useState("");
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [netPremium, setNetPremium] = useState(Number(od) + Number(tp));
  const [proType, setProType] = useState(initialValues.productType || "");
  const [cc, setCC] = useState<number>();
  const [idv, setIdv] = useState<number>();
  const [tenure, setTenure] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [progress, setProgress] = useState(0);
  const [policyCount, setPolicyCount] = useState<number>(0);
  const [marineProduct, setMarineProduct] = useState("");
  const [marineSubCategory, setMarineSubCategory] = useState("");

  useEffect(() => {
    if (!isAdd) {
      setOd(initialValues.od ?? 0);
      setTp(initialValues.tp ?? 0);
      setNetPremium(initialValues.netPremium ?? 0);
      setSelectedBrokerId(initialValues.brokerId!);
      setSelectedPartnerId(initialValues.partnerId!);
      setSelectedPolicyCreatedBy(initialValues.policyCreatedBy);
      setSelectedPartnerName(initialValues.partnerName!);
      setSelectedRMId(initialValues.relationshipManagerId!);
      setSelectedRMName(initialValues.relationshipManagerName!);
      setPolicyType(initialValues.policyType);
      setProType(initialValues.productType);
      setCC(initialValues.cc ?? 0);
      setIdv(initialValues.idv ?? 0);
      setTenure(initialValues.tenure ?? 1);
      setSelectedCaseType(initialValues.caseType ?? "");
      const updatedDocuments: Document[] = [];
      if (initialValues.rcBack) {
        updatedDocuments.push({
          docName: "rcBack",
          file: initialValues.rcBack,
        });
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
        updatedDocuments.push({
          docName: "survey",
          file: initialValues.survey,
        });
      }
      if (initialValues.puc) {
        updatedDocuments.push({
          docName: "puc",
          file: initialValues.puc,
        });
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
        updatedDocuments.push({
          docName: "other",
          file: initialValues.other,
        });
      }
      setDocuments(updatedDocuments);
    }
  }, [isAdd, initialValues]);
  useEffect(() => {
    if (initialValues.make) {
      setSelectedMake(foundMake());
    }
    // eslint-disable-next-line
  }, [initialValues]);
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

  useEffect(() => {
    if (policyType.toLowerCase().trim() === "third party only/ tp") {
      setTp(initialValues.tp ?? 0);
      setOd(0);
      setIdv(undefined);
    }
    if (policyType === "Own Damage Only/ OD") {
      setTp(0);
      setOd(initialValues.od ?? 0);
      setIdv(initialValues.idv ?? undefined);
    }
    // eslint-disable-next-line
  }, [policyType]);

  const calculateYearDifference = (
    startDate: dayjs.Dayjs | string,
    endDate: dayjs.Dayjs | string
  ): number => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    let yearsDifference = end.year() - start.year();
    const monthDifference = end.month() - start.month();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && end.date() < start.date())
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
    if (userData.role.toLowerCase() === "admin") {
      policyForm.partnerId = selectedPartnerId;
      policyForm.partnerName = selectedPartnerName;
    } else if (policyForm.policyCreatedBy === "Direct") {
      policyForm.partnerId = "Direct";
      policyForm.partnerName = "Direct";
    } else {
      policyForm.partnerId = selectedPartnerId;
      policyForm.partnerName = selectedPartnerName;
    }

    policyForm.relationshipManagerId = selectedRMId;
    policyForm.relationshipManagerName = selectedRMName;
    policyForm.createdBy = userData.name;
    policyForm.vehicleNumber = policyForm.vehicleNumber.toUpperCase();
    policyForm.rto = policyForm.vehicleNumber.substring(0, 4);
    policyForm.policyCompletedBy = userData.profileId;
    policyForm.netPremium = netPremium;
    policyForm.brokerId = selectedBrokerId;
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
    if (isAdd) {
      callAddPolicyAPI(formData);
    } else {
      callEditPolicyAPI(formData, policyId!);
    }
  };

  const validateDateWithMfg = (mgfYear: string, valueStr: string) => {
    const yearValue = dayjs(valueStr).year();
    if (Number(mgfYear) > Number(yearValue)) {
      return true;
    }
    return false;
  };

  const onSubmit = async (policyForm: any) => {
    console.log("policyForm", policyForm);

    const isIssueDateValid = dayjs(policyForm.issueDate).isValid();
    const isRegDateValid = dayjs(policyForm.registrationDate).isValid();
    const isEndDateValid = dayjs(policyForm.endDate).isValid();
    const isGcv = proType === "Goods Carrying Vehicle";
    const startDate = dayjs(policyForm.issueDate);
    const endDate = dayjs(policyForm.endDate);

    if (isGcv) {
      const w = policyForm.weight;
      if (w <= 0) {
        toast.error("Weight can't be zero");
        return;
      }
    }
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

  const onProgress = (p: number) => {
    setProgress(p);
  };

  const callAddPolicyAPI = async (policy: any) => {
    try {
      setIsLoading(true);

      if (policyCount <= 0) {
        setShowUpgradePopup(true);
        return;
      }

      const newPolicy = await addPolicyService({ header, policy, onProgress });
      if (newPolicy.status === "success") {
        if (policyCount > 0) {
          setPolicyCount((prevCount) => {
            const updatedCount = prevCount - 1;
            updateLocalStorage({ policyCount: updatedCount });
            return updatedCount;
          });
        }

        navigate(motorPolicyPath());
        return;
      } else {
        return { [FORM_ERROR]: `${newPolicy.message}` };
      }
    } catch (err: any) {
      let errData = await err;
      toast.error(errData.message);
      return { [FORM_ERROR]: `${"message"}` };
    } finally {
      setIsLoading(false);
    }
  };

  const callEditPolicyAPI = async (policy: any, policyId: string) => {
    try {
      setIsLoading(true);
      const newPolicy = await editPolicyService({ header, policy, policyId });
      if (newPolicy.status === "success") {
        navigate(motorPolicyPath());
      } else {
        return { [FORM_ERROR]: `${newPolicy.message}` };
      }
    } catch (err: any) {
      const errorData = await err;
      toast.error(errorData.message);
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
  const fetchPolicyCount = async () => {
    setIsLoading(true);
    try {
      const response = await getPolicyCountAPI({ userId: userData.profileId });
      if (response?.remainingPolicyCount <= 0) {
        updateLocalStorage({ policyCount: policyCount });
        setShowUpgradePopup(true);
      }
      setPolicyCount(response.remainingPolicyCount);
    } catch (err) {
      setErrors((prevErrors) => [
        ...prevErrors,
        { docName: "Error", file: "Failed to fetch policy count" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (userData.profileId) {
      fetchPolicyCount();
    }
  }, [userData.profileId]);

  useEffect(() => {
    if (isAdd) {
      setNetPremium(Number(od) + Number(tp));
    }
  }, [od, tp, isAdd]);
  const handleNetPremiumChange = (event: any) => {
    const value = event.target.value;
    setNetPremium(value);
  };
  useEffect(() => {
    if (selectedMake) {
      const MakeId = selectedMake._id;
      const filterModel = models.filter((sub) => sub.makeId === MakeId);
      setFilteredSubModels(filterModel);
    } else {
      setFilteredSubModels([]);
    }
  }, [selectedMake, models]);
  useEffect(() => {
    if (selectedProduct) {
      const ProductId = selectedProduct._id;
      setFilteredSubcategories(
        productSubTypes.filter((sub) => sub.productId === ProductId)
      );
    } else {
      setFilteredSubcategories(productSubTypes);
    }
  }, [selectedProduct, productSubTypes]);
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
      .min(1, "Email Id must be at least 1 character")
      .email("Must be a valid email address"),
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
      .max(12, "Vehicle Number must can be 12 character"),
    registrationDate: yup
      .string()
      .required("Registration Date is required")
      .nullable(),
    // endDate: yup.string().required("End Date is required").nullable(),
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
      setSelectedPartnerName(e.name!);
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
    } catch { }
  };
  const validateVehicleNumber = async (e: any) => {
    if (selectedCaseType.toLowerCase().trim() === "new") {
      return;
    }
    const vehicleNumber = e.target.value;
    try {
      const res = await getVechicleNumberService({
        header,
        vehicleNumber,
      });
      if (res.exist) {
        setVehicleErr(`${vehicleNumber} is already exist`);
      } else {
        setVehicleErr("");
      }
    } catch (error: any) {
      let errData = await error;
      toast.error(errData.message);
    }
  };

  const getDocumentUrl = (file: any): string | undefined => {
    if (!file) return undefined; // null ki jagah undefined return karein
    if (file instanceof File) {
      return URL.createObjectURL(file); // Naya upload hua file
    }
    return `${imagePath}${encodeURIComponent(file)}`; // API se aayi purani file
  };

  const predefinedOrder = ["Marine Specific Policy(Single Voyage)"];
  const product = [
    "Marine Specific Policy(single Voyage)",
    "Marine Open Policy(MOP)",
    "Sales Turnover Policy(STOP)",
  ];

  const sortedProducts = [...products].sort((a, b) => {
    const nameA = a.productName || "";
    const nameB = b.productName || "";
    return predefinedOrder.indexOf(nameA) - predefinedOrder.indexOf(nameB);
  });

  return (
    <>
      <UpgradePlanPopup
        open={showUpgradePopup}
        onClose={() => setShowUpgradePopup(false)}
      />

      <Form
        mt={3}
        onSubmit={onSubmit}
        initialValues={initialValues}
        // validate={addValidate}
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
                      disabled={isAdd ? false : true}
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
                            input.onChange(newValue ? newValue.policyType : "");
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Select Policy Type"
                              value={policyType}
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

              {policyType === "Fire" && (
                <>
                  {/* Product Dropdown */}
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        options={fireProducts}
                        getOptionLabel={(option) => option.product}
                        onChange={(e, value) =>
                          console.log("Product selected:", value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Product Type"
                            size="small"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Terrorism Cover */}
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        options={yesNoOptions}
                        getOptionLabel={(option) => option.label}
                        onChange={(e, value) => {
                          if (value && value.label) {
                            setTerrorismCover(value.label);
                          } else {
                            setTerrorismCover("");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Terrorism Cover"
                            size="small"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Conditional Premium Fields */}
                  {terrorismCover === "Yes" && (
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Terrorism Premium"
                        size="small"
                        variant="outlined"
                      />
                    </Grid>
                  )}
                  {terrorismCover === "No" && (
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Fire Premium Without Terrorism"
                        size="small"
                        variant="outlined"
                      />
                    </Grid>
                  )}


                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        options={yesNoOptions}
                        getOptionLabel={(option) => option.label}
                        onChange={(e, value) => {
                          if (value?.label === "Yes") {
                            setOpenBurglaryPopup(true);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Add Corresponding Burglary Policy"
                            size="small"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Popup */}
                  {openBurglaryPopup && (
                    <Dialog
                      open={openBurglaryPopup}
                      onClose={() => setOpenBurglaryPopup(false)}
                      fullWidth
                      maxWidth="md" // options: xs, sm, md, lg, xl
                      PaperProps={{
                        sx: {
                          width: "90%",
                          maxWidth: "700px",
                          height: "auto",
                          maxHeight: "90vh",
                        },
                      }}
                    >
                      <DialogTitle>Add  Burglary Policy</DialogTitle>
                      <DialogContent>
                        <TextField
                          label="Policy Number"
                          fullWidth
                          margin="dense"
                          variant="outlined"
                        />

                        <Autocomplete
                          options={[{ label: "Yes" }, { label: "No" }]}
                          getOptionLabel={(option) => option.label}
                          onChange={(e, value) =>
                            setFirstLossBasis(value?.label || "")
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="First Loss Basis"
                              margin="dense"
                            />
                          )}
                        />

                        {firstLossBasis === "Yes" ? (
                          <TextField
                            label="Sum Insured Amount"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            value={sumInsured}
                            onChange={(e) => setSumInsured(e.target.value)}
                          />
                        ) : firstLossBasis === "No" ? (
                          <TextField
                            label="Sum Insured Amount"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            value={fireSumInsured}
                            disabled
                          />
                        ) : null}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setOpenBurglaryPopup(false)}>
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => {
                            /* Save logic */
                          }}
                        >
                          Save
                        </Button>
                      </DialogActions>
                    </Dialog>
                  )}
                </>
              )}

              {policyType === "Marine" && (
                <>
                  {/* Product Dropdown */}
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Autocomplete
                      options={marineProducts}
                      getOptionLabel={(option) => option.label}
                      onChange={(e, value) =>
                        setMarineProduct(value?.label || "")
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Select Marine Product" />
                      )}
                    />
                  </Grid>

                  {/* Subcategory */}
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Autocomplete
                      options={marineSubCategories}
                      getOptionLabel={(option) => option.label}
                      onChange={(e, value) =>
                        setMarineSubCategory(value?.label || "")
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Select Sub Category" />
                      )}
                    />
                  </Grid>

                  {/* Commodity */}
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <TextField
                      label="Mention Commodity"
                      fullWidth
                      variant="outlined"
                      value={commodity}
                      onChange={(e) => setCommodity(e.target.value)}
                    />
                  </Grid>

                  {/* Annual Turnover */}
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <TextField
                      label="Annual Turnover"
                      type="number"
                      fullWidth
                      variant="outlined"
                      value={annualTurnover}
                      onChange={(e) => {
                        const turnover = parseFloat(e.target.value) || 0;
                        setAnnualTurnover(turnover);
                        setAccidentalAmount(
                          (turnover * accidentalPercent) / 100
                        );
                      }}
                    />
                  </Grid>

                  {/* Accidental Charges */}
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Autocomplete
                      options={accidentalPercentages}
                      getOptionLabel={(option) => `${option}%`}
                      onChange={(e, value) => {
                        setAccidentalPercent(value || 0);
                        setAccidentalAmount(
                          ((annualTurnover || 0) * (value || 0)) / 100
                        );
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Accidental Charge (%)" />
                      )}
                    />
                  </Grid>

                  {/* Auto-Calculated Amount */}
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <TextField
                      label="Accidental Amount"
                      fullWidth
                      variant="outlined"
                      value={accidentalAmount}
                      disabled
                    />
                  </Grid>
                </>
              )}

              {policyType === "Miscellaneous" && (
                <>
                  {/* Product Dropdown */}
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Autocomplete
                      options={miscProductOptions}
                      getOptionLabel={(option) => option.label}
                      onChange={(e, value) =>
                        setMiscProduct(value?.label || "")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Product Type"
                          fullWidth
                          size="small"
                        />
                      )}
                    />
                  </Grid>

                  {/* Mention Product - only if 'Other' is selected */}
                  {miscProduct === "Other" && (
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <TextField
                        label="Mention Product"
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={customProduct}
                        onChange={(e) => setCustomProduct(e.target.value)}
                      />
                    </Grid>
                  )}

                  {/* Limit of Liability */}
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <TextField
                      label="Limit of Liability"
                      fullWidth
                      size="small"
                      variant="outlined"
                      value={limitOfLiability}
                      onChange={(e) => setLimitOfLiability(e.target.value)}
                    />
                  </Grid>
                </>
              )}

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
                            input.onChange(newValue ? newValue.caseType : "");
                            setSelectedCaseType(newValue.caseType);
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
                <Field name="occupancy">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          value={
                            input.value !== undefined
                              ? input.value
                              : (initialValues as any).occupancy || null
                          }
                          options={occupancyData}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : `${option.occupancyDescription}-${option.occupancyCode}` || ""
                          }
                          onChange={(event, newValue) => {
                            input.onChange(newValue ? newValue._id : "");
                            setSelectedOccupancy(newValue._id);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Select Occupancy(IIB Risk board)"
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
                            input.onChange(newValue ? newValue.brokerName : "");
                            setSelectedBrokerId(newValue ? newValue._id : "");
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
  <Field name="partner">
    {({ input, meta }) => (
      <div>
        <FormControl fullWidth size="small">
          <Autocomplete
            {...input}
            id="partner"
            value={
              partners.find((partner) => partner._id === selectedPartnerId) || null
            }
            getOptionLabel={(option) =>
              typeof option === "string"
                ? option
                : `${option.name} - ${option.userCode}` || ""
            }
            options={partners}
            onChange={(event, newValue) => {
              if (newValue) {
                if (Array.isArray(newValue)) {
                  console.error("Unexpected array value for partner selection");
                } else if (newValue && newValue._id) {
                  setSelectedPartnerId(newValue._id);
                }
                if (!Array.isArray(newValue) && newValue?.name) {
                  setSelectedPartnerName(newValue.name);
                }
                if (!Array.isArray(newValue) && newValue?._id) {
                  input.onChange(newValue._id); // Update the form value
                } else {
                  input.onChange(""); // Clear the form value if invalid
                }
              } else {
                setSelectedPartnerId("");
                setSelectedPartnerName("");
                input.onChange(""); // Clear the form value
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Partner"
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
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="issueDate">
                  {({ input, meta }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disableFuture
                        label="Issue Date"
                        inputFormat="DD/MM/YYYY"
                        value={input.value || null}
                        onChange={(date) => {
                          input.onChange(date);
                        }}
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
                        value={input.value}
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
                <Field name="totalSumInsured">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      size="small"
                      fullWidth
                      value={netPremium}
                      onChange={(event) => {
                        input.onChange(event);
                        handleNetPremiumChange(event);
                      }}
                      type="number"
                      label="Total Sum Insured"
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
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
                      value={netPremium}
                      onChange={(event) => {
                        input.onChange(event);
                        handleNetPremiumChange(event);
                      }}
                      type="number"
                      label="Enter Net Premium"
                      variant="outlined"
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
                  <Field name="pincode">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        fullWidth
                        type="text"
                        size="small"
                        label="Pincode of Risk Location"
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
                              input.onChange(newValue ? newValue.value : null);
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
                {selectedPaymentMode && selectedPaymentMode !== "Cash" && (
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
                <Grid item md={12} mt={2}>
                  {rmErrorMessage && (
                    <div style={{ color: "red" }}>{rmErrorMessage}</div>
                  )}
                  <Button variant="outlined" onClick={handleClickAddDocument}>
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
                              addPolicyDocumentsOptions.find(
                                (option) => option.value === doc.docName
                              ) || null
                            }
                            onChange={(e, newValue) =>
                              handleChangeDocumentName(newValue!, index)
                            }
                            options={addNonMotorPolicyDocumentsOptions}
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
                          <FileView
                            fileName={formatFilename(doc.file)}
                            index={index}
                          >
                            <input
                              id={`file-${index}`}
                              type="file"
                              onChange={(e) => handleFileInputChange(e, index)}
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
                          {documents.length !== 1 && (
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
                  className="btnGradient text-black px-6 py-3 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />

      <Toaster position="bottom-center" reverseOrder={false} />
      <LoadingOverlay
        loading={progress > 0 && progress < 100}
        message={progress}
      />
    </>
  );
};
export default AddNonMotorPolicyForm;
