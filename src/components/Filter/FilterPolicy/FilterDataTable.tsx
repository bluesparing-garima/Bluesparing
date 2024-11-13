import React, { useEffect, useState } from "react";
import { Document, imagePath } from "../../../context/constant";
import { MotorPolicyData } from "../IFilter";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
interface FilterDataTableProps {
  policy: MotorPolicyData;
}
const FilterDataTable: React.FC<FilterDataTableProps> = ({ policy }) => {
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);
  useEffect(() => {
    if (policy) {
      const updatedDocuments: Document[] = [];
      if (policy.rcBack) {
        updatedDocuments.push({
          docName: "rcBack",
          file: imagePath + policy.rcBack,
        });
      }
      if (policy.rcFront) {
        updatedDocuments.push({
          docName: "rcFront",
          file: imagePath + policy.rcFront,
        });
      }
      if (policy.previousPolicy) {
        updatedDocuments.push({
          docName: "previousPolicy",
          file: imagePath + policy.previousPolicy,
        });
      }
      if (policy.survey) {
        updatedDocuments.push({
          docName: "survey",
          file: imagePath + policy.survey,
        });
      }
      if (policy.puc) {
        updatedDocuments.push({
          docName: "puc",
          file: imagePath + policy.puc,
        });
      }
      if (policy.fitness) {
        updatedDocuments.push({
          docName: "fitness",
          file: imagePath + policy.fitness,
        });
      }
      if (policy.proposal) {
        updatedDocuments.push({
          docName: "proposal",
          file: imagePath + policy.proposal,
        });
      }
      if (policy.currentPolicy) {
        updatedDocuments.push({
          docName: "currentPolicy",
          file: imagePath + policy.currentPolicy,
        });
      }
      if (policy.other) {
        updatedDocuments.push({
          docName: "other",
          file: imagePath + policy.other,
        });
      }
      setDocuments(updatedDocuments);
    }
  }, [policy]);
  const downloadFile = (url: string, fileName: string) => {
    const urlFileName = url.substring(url.lastIndexOf("/") + 1);
    const fileExtension = urlFileName.split(".").pop()?.toLowerCase();
    if (
      fileExtension === "pdf" ||
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "png"
    ) {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const href = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = href;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch((error) => console.error("Error downloading file:", error));
    } else {
      console.error("Unsupported file type:", fileExtension);
    }
  };
  const handleClickDownloadDocuments = async () => {
    const promises = documents.map(async (document) => {
      const FileName = policy?.policyNumber + document.docName;
      downloadFile(document.file, FileName);
    });
    await Promise.all(promises);
  };
  return (
    <>
      <Grid item xs={12} m={2}>
        <Typography
          variant="h5"
          className="text-safekaroDarkOrange"
          component="h2"
          sx={{ mb: 0 }}
        >
          {"Policy Details"}
        </Typography>
      </Grid>
      <Card className="bg-blue-200">
        <CardContent>
          <Grid container mt={2}>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Company Name"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.companyName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                Policy Number
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.policyNumber}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Policy Status"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.policyStatus?.toUpperCase()}
              </Typography>
            </Grid>
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
                {policy?.policyType}
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
                {policy?.caseType}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Product"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.productType}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Sub Category"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.subCategory}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Fuel Type"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.fuelType}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Make"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.make}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Model"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.model}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"NCB"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.ncb}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Tenure"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.tenure}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Grid item xs={12} m={2}>
        <Typography
          variant="h5"
          className="text-safekaroDarkOrange"
          component="h2"
          sx={{ mb: 0 }}
        >
          {"User Details"}
        </Typography>
      </Grid>
      <Card className="bg-blue-200">
        <CardContent>
          <Grid container>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Full Name"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.fullName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Email Id"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.emailId}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Phone Number"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Vehicle Number"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.vehicleNumber}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"RTO"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.rto}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Seating Capacity"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.seatingCapacity}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"CC"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.cc}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Weight"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.weight}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Vehicle Age"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.vehicleAge}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"MFG Year"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.mfgYear}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Registration Date"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.registrationDate}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"End Date"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.endDate}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Issue Date"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.issueDate}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Grid item xs={12} m={2}>
        <Typography
          variant="h5"
          className="text-safekaroDarkOrange"
          component="h2"
          sx={{ mb: 0 }}
        >
          {"Partner Details"}
        </Typography>
      </Grid>
      <Card className="bg-blue-200">
        <CardContent>
          <Grid container>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Policy Created On"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.createdOn}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Policy Updated On"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.updatedOn}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Broker Name"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.broker}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Payment Mode"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.paymentMode}
              </Typography>
            </Grid>
            {policy?.paymentMode !== "Cash" && (
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className="text-addButton"
                  component="h2"
                  sx={{ mb: 0 }}
                >
                  {"Payment Details"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {policy?.paymentDetails}
                </Typography>
              </Grid>
            )}
            {policy?.policyCreatedBy === "Partner" && (
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className="text-addButton"
                  component="h2"
                  sx={{ mb: 0 }}
                >
                  {"Partner Name"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {policy?.partnerName}
                </Typography>
              </Grid>
            )}
            {policy?.policyCreatedBy === "Partner" && (
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className="text-addButton"
                  component="h2"
                >
                  {"Relationship Manager Name"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {policy?.relationshipManagerName}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      <Grid item xs={12} m={2}>
        <Typography
          variant="h5"
          className="text-safekaroDarkOrange"
          component="h2"
          sx={{ mb: 0 }}
        >
          {"Policy Payment Details"}
        </Typography>
      </Grid>
      <Card className="bg-blue-200">
        <CardContent>
          <Grid container>
            <Grid item xs={2}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"IDV"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.idv}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"OD"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.od}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"TP"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.tp}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Net Premium"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.netPremium}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Final Premium"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy?.finalPremium}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <hr className="my-4" />
      <Grid item xs={12}>
        <Typography
          variant="h4"
          className="text-safekaroDarkOrange "
          sx={{ mb: 0 }}
        >
          {"Documents"}
        </Typography>
        <Grid container>
          <Grid item xs={10}></Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleClickDownloadDocuments}>
              Download Document
            </Button>
          </Grid>
        </Grid>
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
    </>
  );
};
export default FilterDataTable;
