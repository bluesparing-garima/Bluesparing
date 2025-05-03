import React, { useState } from 'react'
import { IAddEditHealthForm } from '../IHealth';
import { Close as CloseIcon, Edit as EditIcon } from "@mui/icons-material";
import {
  Autocomplete, Button, FormControl, Grid, IconButton, TextField, Tooltip, Typography, InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Paper,
} from '@mui/material';
import { Field, Form } from 'react-final-form';
import DynamicTextField from '../../../utils/ui/DynamicTextField';
import FormAutocompleteField from '../../../utils/ui/FormAutocompleteField';
import { addHealthPolicyDocumentsOptions, ALLOWED_FILE_TYPES, Document, header, imagePath, MAX_FILE_SIZE } from '../../../context/constant';
import useGetCompanies from '../../../Hooks/Company/useGetCompanies';
import useGetBrokers from '../../../Hooks/Broker/useGetBrokers';
import useGetPartners from '../../../Hooks/Partner/useGetPartners';
import DynamicDateField from '../../../utils/ui/DynamicDateField';
import { fi } from 'date-fns/locale';
import dayjs, { Dayjs } from 'dayjs';

export interface AddPolicyFormProps {
  initialValues: IAddEditHealthForm;
}
export interface DocumentUploaderProps {
  selectedDoc: string[];
  setSelectedDoc: React.Dispatch<React.SetStateAction<string[]>>;
  files: {
    [key: string]: File | null;
  };
  setFiles: React.Dispatch<React.SetStateAction<{
    [key: string]: File | null;
  }>>

}
const policyTypes = [
  "Individuals",
  "Family Floater",
  "Critical Illness",
  "Top-up Policy",
  "Personal Accidental",
  "Travel Insurance",
];
const caseTypes = ["New", "ReNewal", "Port"];
const product = ["Health", " Personal Accident"];
const paymentMode = ["Cash", "Check", "online"]
const AddHealthPolicyForm = (props: AddPolicyFormProps) => {
  let [companies] = useGetCompanies({ header: header });
  let [brokers] = useGetBrokers({ header: header });
  let [partners] = useGetPartners({ header: header, role: "partner" });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPolicyType, setSelectedPolicyType] = useState(policyTypes[0]);
  const [selectedCaseType, setSelectedCaseType] = useState(caseTypes[0]);
  const [selectedProduct, setSelectedProduct] = useState(product[0]);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [selectedBrokerId, setSelectedBrokerId] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [renewalYear, setRenewalYear] = useState(0);
  const defaultDoc = addHealthPolicyDocumentsOptions[0].value;

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


  const handleFirstPurchasedDate = (d: Dayjs | null) => {
    if (d) {
      const givenDate = d;
      const today = dayjs();
      const diffInYears = today.diff(givenDate, 'year');
      setRenewalYear(diffInYears)
    }
  }
  const onSubmit = async (data: any) => {
    console.log(data)
    console.log(files)
  }
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
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <FormAutocompleteField
                  name="caseType"
                  label="Select Case Type"
                  options={caseTypes}
                  onChangeExtra={setSelectedCaseType}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <FormAutocompleteField
                  name="product"
                  label="Select Product"
                  options={product}
                  onChangeExtra={setSelectedProduct}
                />

              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="companyId">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="companyId"
                          value={
                            input.value !== undefined
                              ? input.value
                              : null
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
                            setSelectedCompany(newValue._id)
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
                <Field name="brokerId">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="broker"
                          value={
                            input.value !== undefined
                              ? input.value
                              : null
                          }
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : `${option.brokerName} - ${option.brokerCode}` ||
                              ""
                          }
                          options={brokers}
                          onChange={(event, newValue) => {
                            input.onChange(newValue ? `${newValue.brokerName} - ${newValue.brokerCode}` : "");
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
                          value={
                            input.value !== undefined
                              ? input.value
                              : null
                          }
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : `${option.name} - ${option.userCode}` ||
                              ""
                          }
                          options={partners}
                          onChange={(event, newValue) => {
                            input.onChange(
                              `${newValue.name} - ${newValue.userCode}`
                            );
                            setSelectedPartnerId(newValue._id)
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
              <DynamicDateField
                name="firstPurchasedDate"
                label="First Purchased Date"
                disableFuture
                onChangeDate={handleFirstPurchasedDate}
                gridProps={{ lg: 4, md: 4, sm: 6, xs: 12 }}
              />
               <Grid item lg={4} md={4} sm={6} xs={12}>

              <TextField
                label="Enter Renewal Year"
                variant="outlined"
                size="small"
                value={renewalYear}
                fullWidth
                InputProps={{ readOnly: true }}
              />
               </Grid>

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
                name="accumulatedBonus"
                label="Enter Accumulated Bonus"
                type="number"
                gridProps={{ lg: 4, md: 4, sm: 12, xs: 12 }}
              />
              <DynamicTextField
                name="accumulativeBonus"
                label="Enter Accumulative Bonus"
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
                <FormAutocompleteField
                  name="paymentMode"
                  label="Select Payment Mode"
                  options={paymentMode}
                  onChangeExtra={setSelectedPaymentMode}
                />

              </Grid>
              {
                (selectedPaymentMode.toLowerCase() === 'online' || selectedPaymentMode.toLowerCase() === 'check') && <DynamicTextField
                  name="paymentDetails"
                  label="Enter Payment Details"
                  type="number"
                  gridProps={{ lg: 4, md: 4, sm: 12, xs: 12 }}

                />
              }

              <Grid item lg={12} md={12} sm={6} xs={12}>

                <DocumentUploader selectedDoc={selectedDoc} files={files} setFiles={setFiles} setSelectedDoc={setSelectedDoc} />
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
  )
}


const DocumentUploader: React.FC<DocumentUploaderProps> = ({ selectedDoc, setFiles, setSelectedDoc, files }) => {

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
        <Button variant="outlined" onClick={() => setShowSelect(true)} sx={{ mb: 3 }}>
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
                    .map((val) => addHealthPolicyDocumentsOptions.find((o) => o.value === val)?.label)
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
          const label = addHealthPolicyDocumentsOptions.find((o) => o.value === docKey)?.label;
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
                          alert(`File size exceeds ${MAX_FILE_SIZE}MB. Please select a smaller file.`);
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

                  <IconButton color="error" onClick={() => handleDelete(docKey)}>
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





export default AddHealthPolicyForm
