import React, { useEffect, useState } from "react";
import { Typography, Paper, Card, CardContent, Grid } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import getQuotationByLeadIdService from "../../../../api/Quatotion/GetQuotationByLeadId/getQuotationByLeadIdService";
import { ADD, header, Document, imagePath } from "../../../../context/constant";
import { ILeads, IQuotations } from "../../IPartner";
import getLeadByIdService from "../../../../api/Leads/GetLeadById/getLeadByIdService";
import FileDisplay from "../../../../utils/FileDisplay";
import toast, { Toaster } from "react-hot-toast";
import { DocumentViewer } from "../../EditLead/editLead";
const ViewQuotation = () => {
  const title = "View Comments";
  const { leadId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editLeadDetails, setEditLeadDetails] = useState<ILeads>();
  const [viewQuotationDetails, setViewQuotationDetails] = useState<
    IQuotations[]
  >([]);
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);
  useEffect(() => {
    if (!isAdd && leadId) {
      getQuotationByLeadIdService({ header, leadId })
        .then((leadDetails) => {
          setViewQuotationDetails(leadDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        });
    }
  }, [isAdd, leadId]);
  useEffect(() => {
    if (!isAdd && leadId) {
      getLeadByIdService({ header, leadId })
        .then((leadDetails) => {
          setEditLeadDetails(leadDetails.data);
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
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        });
    }
  }, [isAdd, leadId]);
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

            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <Card>
            <CardContent>
              <Grid container>
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
                    {"Document"}
                  </Typography>
                  <Grid container>
                    {documents.map((document, index) => (
                      <Grid
                        item
                        md={4}
                        key={index}
                        style={{ flex: "0 0 auto" }}
                      >
                        <DocumentViewer
                          docName={document.docName}
                          file={document.file}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
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
                    {viewQuotationDetails.map((quotation: any, index: any) => (
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
                    ))}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default ViewQuotation;
