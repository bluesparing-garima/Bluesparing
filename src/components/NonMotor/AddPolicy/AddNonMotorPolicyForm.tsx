import { useState, useEffect } from "react";
import { IAddEditNonMotorPolicyForm } from "../iNonMotorPolicy";
import { useFormState } from "react-final-form";
import { Close as CloseIcon, Edit as EditIcon } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Field, Form } from "react-final-form";
import DynamicTextField from "../../../utils/ui/DynamicTextField";
import FormAutocompleteField from "../../../utils/ui/FormAutocompleteField";
import {
  addHealthPolicyDocumentsOptions,
  ALLOWED_FILE_TYPES,
  Document,
  header,
  imagePath,
  MAX_FILE_SIZE,
  addNonMotorPolicyDocumentsOptions,
} from "../../../context/constant";
import useGetCompanies from "../../../Hooks/Company/useGetCompanies";
import useGetBrokers from "../../../Hooks/Broker/useGetBrokers";
import useGetPartners from "../../../Hooks/Partner/useGetPartners";
import DynamicDateField from "../../../utils/ui/DynamicDateField";
import { fi } from "date-fns/locale";
import dayjs, { Dayjs } from "dayjs";
import useGetOccupancy, {
  IOccupancy,
} from "../../../Hooks/Occupancy/useGetOccupancy";
import { IProducts } from "../../Admin/Product/IProduct";
import useGetPolicyTypes from "../../../Hooks/Policy/useGetPolicyTypes";

export interface AddPolicyFormProps {
  initialValues: IAddEditNonMotorPolicyForm;
}

export interface DocumentUploaderProps {
  selectedDoc: string[];
  setSelectedDoc: React.Dispatch<React.SetStateAction<string[]>>;
  files: {
    [key: string]: File | null;
  };
  setFiles: React.Dispatch<
    React.SetStateAction<{
      [key: string]: File | null;
    }>
  >;
}

const policyTypes = ["Fire", "Marine", "Miscellaneous"];

const caseTypes = ["New", "Renewal", "Rollover"];

const marineProducts = [
  "Marine Specific Policy (Single Voyage)",
  "Marine Open Policy (MOP)",
  "Sales Turnover Policy (STOP)",
];

const marineSubCategories = [
  "Import",
  "Export",
  "Domestic",
  "Import + Export + Domestic",
];

const paymentMode = ["Cash", "Check", "online"];

const fireProducts = ["Sukah", "Laghu", "Standard Fire", "Residential Fire"];

const subCategories = [
  "Import",
  "Export",
  "Domestic",
  "Import + Export + Domestic",
];

const miscProductOptions = [
  "3D Liability (Premises)",
  "Commercial General Liability (CGL)",
  "Public Liability Policy (PLI Act)",
  "Other",
];

const accidentalPercentages = [10, 15, 20, 25];

const predefinedOrder = ["Marine Specific Policy(Single Voyage)"];
const product = [
  "Marine Specific Policy(single Voyage)",
  "Marine Open Policy(MOP)",
  "Sales Turnover Policy(STOP)",
];

const AddNonMotorPolicyForm = () => {
  const { values } = useFormState();
const policyType = values.policyType;
  let [companies] = useGetCompanies({ header: header });
  let [brokers] = useGetBrokers({ header: header });
  let [partners] = useGetPartners({ header: header, role: "partner" });
  let [occupancyData] = useGetOccupancy();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(product[0]);
  const [selectedBrokerId, setSelectedBrokerId] = useState("");
  const [selectedCaseType, setSelectedCaseType] = useState(caseTypes[0]);
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [openBurglaryPopup, setOpenBurglaryPopup] = useState(false);
  const [firstLossBasis, setFirstLossBasis] = useState("");
  const [sumInsured, setSumInsured] = useState("");
  const fireSumInsured = "500000"; // example, fetch from fire data
  const [terrorismCover, setTerrorismCover] = useState(""); // "Yes" / "No"
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [selectedPolicyCreatedBy, setSelectedPolicyCreatedBy] = useState<
    string | undefined
  >();
  const [occupancy, setSelectedOccupancy] = useState<IOccupancy>();
  const [commodity, setCommodity] = useState("");
  const [annualTurnover, setAnnualTurnover] = useState<number>(0);
  const [accidentalPercent, setAccidentalPercent] = useState<number>(0);
  const [accidentalAmount, setAccidentalAmount] = useState<number>(0);
  const [miscProduct, setMiscProduct] = useState("");
  const [customProduct, setCustomProduct] = useState("");
  const [limitOfLiability, setLimitOfLiability] = useState("");
  const [od, setOd] = useState(0);
  const [tp, setTp] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [policyErrorMessage, setPolicyErrorMessage] = useState("");
  const [vehicleErr, setVehicleErr] = useState("");
  const [rmErrorMessage, setRMErrorMessage] = useState("");
  const [netPremium, setNetPremium] = useState(Number(od) + Number(tp));
  const [selectedPolicyType, setSelectedPolicyType] = useState(policyTypes[0]);
  const [marineProduct, setMarineProduct] = useState("");
  const [marineSubCategory, setMarineSubCategory] = useState("");

  const defaultDoc = addNonMotorPolicyDocumentsOptions[0].value;
  const [selectedDoc, setSelectedDoc] = useState<string[]>([defaultDoc]);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    [defaultDoc]: null,
  });

  const getDocumentUrl = (file: any): string | undefined => {
    if (!file) return undefined;
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return `${imagePath}${encodeURIComponent(file)}`;
  };

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

  const onSubmit = async (data: any) => {
    console.log("Full Submitted Values : ", data);
    console.log("files : ", files); // Full object
  };

  return (
    <>
      <Form
        mt={3}
        onSubmit={onSubmit}
        render={({ handleSubmit, submitError, submitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <DynamicTextField
                name="policyNumber"
                label="Enter Policy Number"
                gridProps={{ lg: 4, md: 4, sm: 12, xs: 12 }}
              />
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <FormAutocompleteField
                  name="policyType"
                  label="Select Policy Type"
                  options={policyTypes}
                  onChangeExtra={setSelectedPolicyType}
                />
              </Grid>

              {policyType === "Fire" && (
                <>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
    <FormAutocompleteField
  name="product"
  label="Select Product"
  options={fireProducts} // ✅ fireProducts is already a string[]
  onChangeExtra={(val) => {
    setSelectedProduct(val || ""); // val is a string if options are strings
    setMiscProduct(val || "");
  }}
/>
    </Grid>
                  {/* Product Dropdown */}
                  {/* <Grid item lg={4} md={4} sm={6} xs={12}>
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
                  </Grid> */}

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
                      <DialogTitle>Add Burglary Policy</DialogTitle>
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
                    <FormAutocompleteField
                      name="product"
                      label="Select Product"
                      options={product}
                      onChangeExtra={setSelectedProduct}
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
                <FormAutocompleteField
                  name="caseType"
                  label="Select Case Type"
                  options={caseTypes}
                  onChangeExtra={setSelectedCaseType}
                />
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
                              : `${option.occupancyDescription}-${option.occupancyCode}` ||
                                ""
                          }
                          onChange={(event, newValue) => {
                            input.onChange(
                              newValue
                                ? `${newValue.occupancyDescription}-${newValue.occupancyCode}`
                                : ""
                            );
                            setSelectedOccupancy(newValue?._id);
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
                <Field name="brokerId">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="broker"
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : `${option.brokerName} - ${option.brokerCode}` ||
                                ""
                          }
                          options={brokers}
                          onChange={(event, newValue) => {
                            input.onChange(
                              newValue
                                ? `${newValue.brokerName} - ${newValue.brokerCode}`
                                : ""
                            );
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
                <Field name="partnerId">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="partner"
                          value={input.value !== undefined ? input.value : null}
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : `${option.name} - ${option.userCode}` || ""
                          }
                          options={partners}
                          onChange={(event, newValue) => {
                            input.onChange(
                              `${newValue.name} - ${newValue.userCode}`
                            );
                            setSelectedPartnerId(newValue._id);
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
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="companyId">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="companyId"
                          value={input.value !== undefined ? input.value : null}
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
                            setSelectedCompany(newValue._id);
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
              <DynamicDateField
                name="issueDate"
                label="Start Date"
                disableFuture
                gridProps={{ lg: 4, md: 4, sm: 6, xs: 12 }}
              />
              <DynamicDateField
                name="endDate"
                label="End Date"
                gridProps={{ lg: 4, md: 4, sm: 6, xs: 12 }}
              />
              <DynamicTextField
                name="totalSumInsured"
                label="Enter Total Sum Insured "
                type="number"
                gridProps={{ lg: 4, md: 4, sm: 12, xs: 12 }}
              />
              <DynamicTextField
                name="netPremium"
                label="Enter Net Premium"
                type="number"
                gridProps={{ lg: 4, md: 4, sm: 12, xs: 12 }}
              />
              <DynamicTextField
                name="finalPremium"
                label="Enter Final Premium"
                type="number"
                gridProps={{ lg: 4, md: 4, sm: 12, xs: 12 }}
              />

              <DynamicTextField
                name="fullName"
                label="Enter Full Name"
                gridProps={{ lg: 4, md: 4, sm: 12, xs: 12 }}
              />
              <DynamicTextField
                name="emailId"
                label="Enter email"
                type="email"
                gridProps={{ lg: 4, md: 4, sm: 12, xs: 12 }}
              />
              <DynamicTextField
                name="phoneNumber"
                label="Enter Phone Number"
                type="number"
                gridProps={{ lg: 4, md: 4, sm: 12, xs: 12 }}
              />
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
                <FormAutocompleteField
                  name="paymentMode"
                  label="Select Payment Mode"
                  options={paymentMode}
                  onChangeExtra={setSelectedPaymentMode}
                />
              </Grid>
              {(selectedPaymentMode.toLowerCase() === "online" ||
                selectedPaymentMode.toLowerCase() === "check") && (
                <DynamicTextField
                  name="paymentDetails"
                  label="Enter Payment Details"
                  type="number"
                  gridProps={{ lg: 4, md: 4, sm: 12, xs: 12 }}
                />
              )}

              <Grid item lg={12} md={12} sm={6} xs={12}>
                <DocumentUploader
                  selectedDoc={selectedDoc}
                  files={files}
                  setFiles={setFiles}
                  setSelectedDoc={setSelectedDoc}
                />
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
                  disabled={isLoading}
                  type="submit"
                  className="btnGradient text-black px-4 py-3 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </>
  );
};

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  selectedDoc,
  setFiles,
  setSelectedDoc,
  files,
}) => {
  const [showSelect, setShowSelect] = useState<boolean>(false);

  const handleSelectDoc = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedDoc(value);

    const updatedFiles: { [key: string]: File | null } = { ...files };
    value.forEach((doc) => {
      if (!(doc in updatedFiles)) {
        updatedFiles[doc] = null;
      }
    });

    // Remove deselected docs
    Object.keys(updatedFiles).forEach((key) => {
      if (!value.includes(key)) {
        delete updatedFiles[key];
      }
    });

    setFiles(updatedFiles);
    setShowSelect(false); // Hide after selection
  };

  const handleFileChange = (docKey: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [docKey]: file }));
  };

  const handleDelete = (docKey: string) => {
    setSelectedDoc((prev) => prev.filter((key) => key !== docKey));
    setFiles((prev) => {
      const updated = { ...prev };
      delete updated[docKey];
      return updated;
    });
  };

  return (
    <Box p={1}>
      <Typography variant="h6" mb={2} fontWeight={600}>
        Upload Documents
      </Typography>

      {/* Add More Button */}
      {!showSelect && (
        <Button
          variant="outlined"
          onClick={() => setShowSelect(true)}
          sx={{ mb: 3 }}
        >
          Add More Document
        </Button>
      )}

      {/* Select Dropdown */}
      {showSelect && (
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="doc-select-label">Select Documents</InputLabel>
              <Select
                labelId="doc-select-label"
                multiple
                value={selectedDoc}
                onChange={handleSelectDoc}
                label="Select Documents"
                renderValue={(selected) =>
                  selected
                    .map(
                      (val) =>
                        addHealthPolicyDocumentsOptions.find(
                          (o) => o.value === val
                        )?.label
                    )
                    .join(", ")
                }
              >
                {addHealthPolicyDocumentsOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}

      {/* Uploaded Document Cards */}
      <Grid container spacing={3}>
        {selectedDoc.map((docKey) => {
          const label = addHealthPolicyDocumentsOptions.find(
            (o) => o.value === docKey
          )?.label;
          const file = files[docKey];

          return (
            <Grid key={docKey} item xs={12} md={6} lg={4}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                <Typography variant="subtitle2" fontWeight={600} mb={1}>
                  {label}
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                  <input
                    type="file"
                    id={`file-input-${docKey}`}
                    style={{ display: "none" }}
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        const maxSizeBytes = MAX_FILE_SIZE * 1024 * 1024;

                        if (file.size > maxSizeBytes) {
                          alert(
                            `File size exceeds ${MAX_FILE_SIZE}MB. Please select a smaller file.`
                          );
                          e.target.value = "";
                          return;
                        }

                        handleFileChange(docKey, file);
                      } else {
                        handleFileChange(docKey, null);
                      }
                    }}
                  />

                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    disabled
                    placeholder="No file chosen"
                    value={file ? file.name : ""}
                  />

                  {file ? (
                    <>
                      <Typography variant="body2" noWrap maxWidth={150}>
                        {file.name}
                      </Typography>
                      <IconButton
                        color="primary"
                        component="label"
                        htmlFor={`file-input-${docKey}`}
                        sx={{ p: 0.5 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </>
                  ) : (
                    <label htmlFor={`file-input-${docKey}`}>
                      <Button variant="contained" component="span">
                        Upload
                      </Button>
                    </label>
                  )}

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(docKey)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AddNonMotorPolicyForm;
