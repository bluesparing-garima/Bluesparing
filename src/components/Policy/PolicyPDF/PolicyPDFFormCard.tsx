import { useLocation } from "react-router-dom";
import PolicyPDFForm from "./PolicyPDFForm";
import { useState } from "react";
import { ADD, header } from "../../../context/constant";
import { IPDFPolicyForm } from "../IPolicy";
import motorPolicyPDFService from "../../../api/Policies/MotorPolicyPDF/motorPolicyService";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { Field, Form } from "react-final-form";
import * as yup from "yup";
import useGetCompanies from "../../../Hooks/Company/useGetCompanies";
import useGetPolicyTypes from "../../../Hooks/Policy/useGetPolicyTypes";
import useGetBrokers from "../../../Hooks/Broker/useGetBrokers";
const PolicyPDFFormCard = () => {
  const location = useLocation();
  let [companies] = useGetCompanies({ header: header });
  let [policyTypes] = useGetPolicyTypes({ header: header });
  const[isLoading,setIsLoading] = useState(false)
  let [brokers] = useGetBrokers({ header: header });
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [policyFile, setPolicyFile] = useState<File | null>();
  const [editPolicyDetails, setEditPolicyDetails] = useState<IPDFPolicyForm>();
  interface FormValues {
    file: File | null;
    policyType: string | null;
    companyName: string | null;
    broker: any;
  }
  const [pdfUploaded, setPDFUploaded] = useState(false);
  const schema = yup.object().shape({
    file: yup
      .mixed()
      .required("File is required")
      .test(
        "fileType",
        "Only .pdf files are allowed",
        (value) => value && value.type === "application/pdf"
      ),
  });
  const validate = (values: FormValues) => {
    try {
      schema.validateSync(values, { abortEarly: false });
      return {};
    } catch (err) {
      const validationErrors: { [key: string]: string } = {};
      if (err instanceof yup.ValidationError && err.inner) {
        err.inner.forEach((error) => {
          if (error.path) validationErrors[error.path] = error.message;
        });
      }
      return validationErrors;
    }
  };
  const onSubmit = (values: FormValues) => {
    if (values.file) {
      try {
        setIsLoading(true)
        const formData = new FormData();
        setPolicyFile(values.file!);
        formData.append("file", values.file);
        formData.append("policyType", values.policyType!);
        formData.append("companyName", values.companyName!);
        formData.append("brokerId", values.broker._id!);
        formData.append("broker", values.broker.brokerName!);
        motorPolicyPDFService({ header, file: formData })
          .then((response) => {
            if (response) {
              if (response.status === "Success") {
                setPDFUploaded(true);
                setEditPolicyDetails(response.data);
              }
            }
          })
          .catch((error) => {
            throw error
          });
      } catch (error) {
        throw error
      }finally{
        setIsLoading(false)
      }
    } else {
    }
  };
  return (
    <>
      <Card>
       
        <CardContent>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Field name="policyType">
                      {({ input, meta }) => (
                        <div>
                          <FormControl fullWidth size="small">
                            <Autocomplete
                              {...input}
                              id="policyType"
                              value={
                                input.value !== undefined ? input.value : null
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
                    <Field name="companyName">
                      {({ input, meta }) => (
                        <div>
                          <FormControl fullWidth size="small">
                            <Autocomplete
                              {...input}
                              id="companyName"
                              value={
                                input.value !== undefined ? input.value : null
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
                                input.value !== undefined ? input.value : null
                              }
                              getOptionLabel={(option) =>
                                typeof option === "string"
                                  ? option
                                  : `${option.brokerName} - ${option.brokerCode}` ||
                                    ""
                              }
                              options={brokers}
                              onChange={(event, newValue) => {
                                input.onChange(newValue ? newValue : "");
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
                  <Grid item lg={8} xs={12}>
                    <Field name="file">
                      {({ input, meta }) => (
                        <div>
                          <Grid item lg={12} xs={12}>
                            <input
                              type="file"
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
                              accept=".pdf"
                            />
                            {meta.touched && meta.error && (
                              <span style={{ color: "red" }}>{meta.error}</span>
                            )}
                          </Grid>
                        </div>
                      )}
                    </Field>
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      variant="contained"
                      color="primary"
                      className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                    >
                      {isLoading?'Submitting...':'Upload PDF'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </CardContent>
      </Card>
      {pdfUploaded && (
        <PolicyPDFForm
          initialValues={{
            id: isAdd ? "0" : editPolicyDetails?.id || "",
            policyType: isAdd ? "" : editPolicyDetails?.policyType || "",
            caseType: isAdd ? "" : editPolicyDetails?.caseType!,
            category: "motor",
            subCategory: isAdd ? "" : editPolicyDetails?.subCategory!,
            companyName: isAdd ? "" : editPolicyDetails?.companyName!,
            productType: isAdd ? "" : editPolicyDetails?.productType!,
            broker: isAdd ? "" : editPolicyDetails?.broker!,
            brokerId: isAdd ? "" : editPolicyDetails?.brokerId!,
            make: isAdd ? "" : editPolicyDetails?.make!,
            model: isAdd ? "" : editPolicyDetails?.model!,
            fuelType: isAdd ? "" : editPolicyDetails?.fuelType!,
            rto: isAdd ? "" : editPolicyDetails?.rto!,
            seatingCapacity: isAdd
              ? 0
              : editPolicyDetails?.seatingCapacity
              ? editPolicyDetails?.seatingCapacity
              : 0,
            cc: isAdd ? 0 : editPolicyDetails?.cc ? editPolicyDetails?.cc : 0,
            weight: isAdd
              ? 0
              : editPolicyDetails?.weight
              ? editPolicyDetails?.weight
              : 0,
            ncb: isAdd ? "" : editPolicyDetails?.ncb!,
            vehicleNumber: isAdd ? "" : editPolicyDetails?.vehicleNumber!,
            policyNumber: isAdd
              ? ""
              : editPolicyDetails?.policyNumber.replace(/\s/g, "")!,
            fullName: isAdd ? "" : editPolicyDetails?.fullName!,
            emailId: "test@gmail.com",
            phoneNumber: isAdd ? 0 : editPolicyDetails?.phoneNumber!,
            mfgYear: isAdd ? 2000 : editPolicyDetails?.mfgYear!,
            tenure: isAdd
              ? 1
              : editPolicyDetails?.tenure
              ? editPolicyDetails?.tenure
              : 1,
            issueDate: isAdd ? "" : editPolicyDetails?.issueDate!,
            endDate: isAdd ? "" : editPolicyDetails?.endDate!,
            registrationDate: isAdd ? "" : editPolicyDetails?.registrationDate!,
            idv: isAdd
              ? 0
              : editPolicyDetails?.idv
              ? editPolicyDetails?.idv
              : 0,
            od: isAdd ? 0 : editPolicyDetails?.od ? editPolicyDetails?.od : 0,
            tp: isAdd ? 0 : editPolicyDetails?.tp ? editPolicyDetails?.tp : 0,
            netPremium: isAdd ? 0 : editPolicyDetails?.netPremium!,
            finalPremium: isAdd ? 0 : editPolicyDetails?.finalPremium!,
            paymentMode: "Cash",
            policyCreatedBy: "Partner",
            paymentDetails: isAdd ? "" : editPolicyDetails?.paymentDetails!,
            partnerId: isAdd ? "" : editPolicyDetails?.partnerId!,
            partnerName: isAdd ? "" : editPolicyDetails?.partnerName!,
            relationshipManagerId: isAdd
              ? ""
              : editPolicyDetails?.relationshipManagerId!,
            policyStatus: "booked",
            relationshipManagerName: isAdd
              ? ""
              : editPolicyDetails?.relationshipManagerName!,
            createdBy: isAdd ? "" : editPolicyDetails?.createdBy!,
            currentPolicy: policyFile,
            policyCompletedBy: isAdd
              ? ""
              : editPolicyDetails?.policyCompletedBy!,
          }}
        />
      )}
    </>
  );
};
export default PolicyPDFFormCard;
