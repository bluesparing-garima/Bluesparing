import React, { useEffect, useState } from "react";
//import { useTranslation } from "react-i18next";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  Autocomplete,
  Button,
} from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Field, Form } from "react-final-form";
import {
  ADD,
  MAX_FILE_SIZE,
  SafeKaroUser,
  header,
  Document,
  imagePath,
  policyStatusPartner,
  policyStatusOperation,
} from "../../../../context/constant";
import { ILeadForm, IQuotations } from "../../IPartner";
import { convertILeadVMToILeadForm } from "../../../../api/Leads/convertILeadVMToILeadForm";
import getLeadByIdService from "../../../../api/Leads/GetLeadById/getLeadByIdService";
import addQuotationService from "../../../../api/Quatotion/AddQuotation/addQuotationService";
import { bookingRequestNewPath, leadsPath } from "../../../../sitemap";
import FileDisplay from "../../../../utils/FileDisplay";
import getQuotationByLeadIdService from "../../../../api/Quatotion/GetQuotationByLeadId/getQuotationByLeadIdService";
import dayjs from "dayjs";
import editLeadService from "../../../../api/Leads/EditLead/editLeadService";
import toast, { Toaster } from "react-hot-toast";

const AddQuotation = () => {
  const title = "Add Comment";
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

  const navigate = useNavigate();
  const { leadId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editLeadDetails, setEditLeadDetails] = useState<ILeadForm>();
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState<any>(null);
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);
  const [viewQuotationDetails, setViewQuotationDetails] = useState<
    IQuotations[]
  >([]);


  useEffect(() => {
    if (!isAdd && leadId) {
      getQuotationByLeadIdService({ header, leadId })
        .then((leadDetails) => {
          setViewQuotationDetails(leadDetails.data);
        })
        .catch(async(error) => {
          const err = await error
          toast.error(err.message)
         
        });
    }
  }, [isAdd, leadId]);

  useEffect(() => {
    if (!isAdd && leadId) {
      getLeadByIdService({ header, leadId })
        .then((leadDetails) => {
          const leadVMToLeadForm = convertILeadVMToILeadForm(leadDetails.data);

          setEditLeadDetails(leadVMToLeadForm);
          const updatedDocuments: Document[] = [];

          if (leadDetails.data.rcBack) {
            updatedDocuments.push({
              docName: "rcBack",
              file: imagePath + leadDetails.data.rcBack,
            });
          }
          if (leadDetails.data.rcFront) {
            updatedDocuments.push({
              docName: "rcFront",
              file: imagePath + leadDetails.data.rcFront,
            });
          }
          if (leadDetails.data.previousPolicy) {
            updatedDocuments.push({
              docName: "previousPolicy",
              file: imagePath + leadDetails.data.previousPolicy,
            });
          }
          if (leadDetails.data.survey) {
            updatedDocuments.push({
              docName: "survey",
              file: imagePath + leadDetails.data.survey,
            });
          }
          if (leadDetails.data.puc) {
            updatedDocuments.push({
              docName: "puc",
              file: imagePath + leadDetails.data.puc,
            });
          }
          if (leadDetails.data.fitness) {
            updatedDocuments.push({
              docName: "fitness",
              file: imagePath + leadDetails.data.fitness,
            });
          }
          if (leadDetails.data.proposal) {
            updatedDocuments.push({
              docName: "proposal",
              file: imagePath + leadDetails.data.proposal,
            });
          }
          if (leadDetails.data.currentPolicy) {
            updatedDocuments.push({
              docName: "currentPolicy",
              file: imagePath + leadDetails.data.currentPolicy,
            });
          }
          if (leadDetails.data.other) {
            updatedDocuments.push({
              docName: "other",
              file: imagePath + leadDetails.data.other,
            });
          }
          setDocuments(updatedDocuments);
        })
        .catch(async(error) => {
          const err = await error
          toast.error(err.message)
         
        });
    }
  }, [isAdd, leadId]);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileSize = file.size;
      if (fileSize > MAX_FILE_SIZE) {
        setErrorMessage("Image is incorrect size.");
      } else {
        setErrorMessage("");
        setImage(file);
      }
    }
  };

  const onSubmit = (quotationForm: any, form: any) => {

    quotationForm.relationshipManagerId = userData.headRMId;
    quotationForm.relationshipManagerName = userData.headRM;
    quotationForm.leadId = leadId;

    quotationForm.createdBy = userData.name;
    quotationForm.quotationImage = image;
    quotationForm.status = quotationForm.status.value;

    const editFrom = new FormData();
    editFrom.append("id", leadId!);
   
    editFrom.append("status", quotationForm.status);

    if (editLeadDetails) {
      quotationForm.partnerId = userData.partnerId;
      quotationForm.partnerName = userData.name;
       editFrom.append("partnerId", editLeadDetails.partnerId!);
    editFrom.append("partnerName", editLeadDetails?.partnerName!);
      editFrom.append("category", editLeadDetails.category);
      editFrom.append("policyType", editLeadDetails.policyType);
      editFrom.append("caseType", editLeadDetails.caseType);
      editFrom.append("companyName", editLeadDetails.companyName);
      editFrom.append(
        "relationshipManagerId",
        editLeadDetails.relationshipManagerId!
      );
      editFrom.append(
        "relationshipManagerName",
        editLeadDetails.relationshipManagerName!
      );
      editFrom.append("leadCreatedBy", editLeadDetails.leadCreatedBy);
    }


    if (leadId && editLeadDetails?.createdOn) {
      let updatedon = editLeadDetails?.updatedOn || editLeadDetails?.createdOn;
      handleStatus(
        leadId,
        quotationForm.status,
        updatedon,
        editFrom,
        editLeadDetails?.timer
      );
    }

    callAddQuotationAPI(quotationForm, form);
  };

  const callAddQuotationAPI = async (quotationForm: any, form: any) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(quotationForm)) {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    }
    try {
      const newQuotation = await addQuotationService({
        header,
        quotation: formData,
      });
      if (newQuotation.status === "success") {
        navigate(leadsPath());
      }
    } catch (error:any) {
      const err = await error
      toast.error(err.message)
     
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
        // navigate(leadsPath());
      }
    } catch (error:any) {
      const err = await error
      toast.error(err.message)
    }
  };
  const handleStatus = (
    id: string,
    status: string,
    createdOn: string,
    editFrom: FormData,
    timer: string | undefined
  ) => {
    let now = Date.now();
    switch (status.toLocaleLowerCase()) {
      // case "payment pending":
      case "payment verified":
        const regDate = dayjs(createdOn);
        let diffInMilliseconds = dayjs().diff(regDate);
        editFrom.append("timer", diffInMilliseconds.toString());
        callEditLeadAPI(editFrom, id);
        break;
      case "doc pending":
        editFrom.append("timer", Date.now().toString());
        callEditLeadAPI(editFrom, id);
        break;
      case "quotation sent":
        if (timer) {
          const timerTime = Number(timer);
          const diff = now - timerTime;
          const ms = dayjs(createdOn).valueOf();
          const result = ms + diff;
          const formattedDate = dayjs(result).toISOString();

          editFrom.append("updatedOn", formattedDate);
          callEditLeadAPI(editFrom, id);
        }

        break;

      default:
        break;
    }
  };

  const handleClickBooking = () => {
    navigate(bookingRequestNewPath(leadId!));
  };

  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography
            variant="h5"
            className="text-safekaroDarkOrange"
            gutterBottom
            display="inline"
          >
            {title}
          </Typography>
          <Typography variant="h5" mb={2}>
            <Link to="/dashboard" className="text-addButton font-bold text-sm">
              Dashboard {" / "}
            </Link>
            <Link to="/lead" className="text-addButton font-bold text-sm">
              Lead /
            </Link>
            <span className="text-grey-600 text-sm">{title}</span>
            {/* Add a full-width grey line here */}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <Card>
            <CardContent>
              <Form
                mt={3}
                onSubmit={onSubmit}
                //initialValues={initialValues}
                //validate={addValidate}
                render={({ handleSubmit, submitError, submitting }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"Policy Type"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {editLeadDetails?.policyType!}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"Case Type"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {editLeadDetails?.caseType}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"Company Name"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {editLeadDetails?.companyName}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"Status"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {editLeadDetails?.status}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"Remarks"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {editLeadDetails?.remarks}
                        </Typography>
                      </Grid>
                      <hr className="my-4" />
                      <Grid item lg={12} xs={12}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"Documents"}
                        </Typography>

                        <Grid container>
                          {documents.map((document, index) => (
                            <Grid item md={4} key={index}>
                              <Typography
                                className="text-addButton"
                                variant="subtitle1"
                                component="h4"
                              >
                                {document.docName}
                              </Typography>
                              {document.file.endsWith(".pdf") ? (
                                <embed
                                  src={document.file}
                                  type="application/pdf"
                                  width="400"
                                  height="400"
                                />
                              ) : (
                                <img
                                  src={document.file}
                                  alt={document.docName}
                                  style={{ maxWidth: "100%" }}
                                />
                              )}
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                      <Grid container mt={3}>
                        <Typography
                          variant="h5"
                          className="text-safekaroDarkOrange"
                          gutterBottom
                          display="inline"
                        >
                          {"Comments"}
                        </Typography>
                        <Grid item xs={12}>
                          <Typography
                            variant="subtitle1"
                            className="text-addButton"
                            component="h2"
                            sx={{ mb: 0 }}
                          >
                            {viewQuotationDetails.map(
                              (quotation: any, index: any) => (
                                <Grid key={index} item md={4}>
                                  <Typography
                                    variant="body1"
                                    className="text-addButton"
                                    component="h2"
                                    sx={{ mb: 2 }}
                                  >
                                    <span className="text-safekaroDarkOrange">
                                      {`${quotation.partnerName}:`}
                                    </span>
                                    {quotation.comments}
                                  </Typography>
                                  {quotation.quotationImage ? (
                                    <FileDisplay
                                      url={`${imagePath}${quotation.quotationImage}`}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </Grid>
                              )
                            )}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="status">
                          {({ input, meta }) => (
                            <div>
                              <FormControl fullWidth size="small">
                                <Autocomplete
                                  {...input}
                                  getOptionLabel={(option) => option.label}
                                  value={input.value || null}
                                  options={
                                    userData.role.toLowerCase() === "partner"
                                      ? policyStatusPartner
                                      : policyStatusOperation
                                  } // Replace with your options array
                                  onChange={(event, newValue) => {
                                    input.onChange(newValue);
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      className="rounded-sm w-full"
                                      size="small"
                                      label="Select Lead Status"
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
                        <input
                          id={`file`}
                          type="file"
                          onChange={(e) => handleFileInputChange(e)}
                          style={{
                            border: "1px solid #c4c4c4",
                            padding: "5px",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        />
                        <span style={{ color: "red" }}>{errorMessage}</span>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Field name="comments">
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              id="comments"
                              size="small"
                              fullWidth
                              label="Enter Comment"
                              variant="outlined"
                              multiline
                              rows={6}
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>
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

                        {userData.role.toLowerCase() === "operation" ? (
                          <>
                            {editLeadDetails &&
                              editLeadDetails.status === "Payment Verified" && (
                                <Button
                                  style={{ marginLeft: "20px" }}
                                  variant="contained"
                                  onClick={handleClickBooking}
                                >
                                  Request for Booking
                                </Button>
                              )}
                          </>
                        ) : (
                          ""
                        )}
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

export default AddQuotation;
