import React, { useEffect, useState } from "react";
//import { useTranslation } from "react-i18next";
import { Typography, Paper, Card, CardContent, Grid } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header, Document, imagePath } from "../../../context/constant";
import { ILeadForm } from "../IPartner";
import { convertILeadVMToILeadForm } from "../../../api/Leads/convertILeadVMToILeadForm";
import getLeadByIdService from "../../../api/Leads/GetLeadById/getLeadByIdService";
import EditLeadForm from "./editLeadForm";
import toast, { Toaster } from "react-hot-toast";

const EditLead = () => {
  const title = "Edit Lead";
  const { leadId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editLeadDetails, setEditLeadDetails] = useState<ILeadForm>();
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);
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
        .catch(async(error:any) => {
          const err = await error
          toast.error(err.message)
          console.error("Failed to fetch Lead details", error);
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
            {/* Add a full-width grey line here */}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
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
                <Grid item xs={4}>
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

                  <Grid container mb={2}>
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
              </Grid>

              <EditLeadForm
                initialValues={{
                  id: isAdd ? "0" : editLeadDetails?.id || "",
                  category: isAdd ? "" : editLeadDetails?.category || "",
                  policyType: isAdd ? "" : editLeadDetails?.policyType || "",
                  caseType: isAdd ? "" : editLeadDetails?.caseType || "",
                  companyName: isAdd ? "" : editLeadDetails?.companyName || "",
                  partnerId: isAdd ? "" : editLeadDetails?.partnerId || "",
                  partnerName: isAdd ? "" : editLeadDetails?.partnerName || "",
                  relationshipManagerId: isAdd
                    ? ""
                    : editLeadDetails?.relationshipManagerId || "",
                  relationshipManagerName: isAdd
                    ? ""
                    : editLeadDetails?.relationshipManagerName || "",
                  remarks: isAdd ? "" : editLeadDetails?.remarks || "",
                  status: isAdd ? "" : editLeadDetails?.status || "",
                  leadCreatedBy: isAdd
                    ? ""
                    : editLeadDetails?.leadCreatedBy || "",
                  rcFront: isAdd ? "" : editLeadDetails?.rcFront || "",
                  rcBack: isAdd ? "" : editLeadDetails?.rcBack || "",
                  previousPolicy: isAdd
                    ? ""
                    : editLeadDetails?.previousPolicy || "",
                  survey: isAdd ? "" : editLeadDetails?.survey || "",
                  puc: isAdd ? "" : editLeadDetails?.puc || "",
                  fitness: isAdd ? "" : editLeadDetails?.fitness || "",
                  proposal: isAdd ? "" : editLeadDetails?.proposal || "",
                  currentPolicy: isAdd
                    ? ""
                    : editLeadDetails?.currentPolicy || "",
                  other: isAdd ? "" : editLeadDetails?.other || "",
                  isActive: isAdd ? true : editLeadDetails?.isActive || true,
                  createdBy: "Admin",
                  updatedBy: "Admin",
                }}
              />
            </CardContent>
          </Card>
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default EditLead;
