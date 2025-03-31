import { Button, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { IViewPolicy } from "../IPolicy";
import { useEffect, useState } from "react";
import { Document, header, imagePath } from "../../../context/constant";
import getPolicyWithPaymentService from "../../../api/Policies/GetPolicyWithPayment/getPolicyWithPaymentService";
import { Card } from "@material-ui/core";
const ViewPolicy = () => {
  const { policyId } = useParams();
  const [policy, setPolicyDetails] = useState<IViewPolicy | undefined>(
    undefined
  );
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);
  useEffect(() => {
    if (policyId) {
      getPolicyWithPaymentService({ header, policyId })
        .then((policyDetails) => {
          setPolicyDetails(policyDetails.data);
          const updatedDocuments: Document[] = [];
          if (policyDetails.data.rcBack) {
            updatedDocuments.push({
              docName: "rcBack",
              file: imagePath + policyDetails.data.rcBack,
            });
          }
          if (policyDetails.data.rcFront) {
            updatedDocuments.push({
              docName: "rcFront",
              file: imagePath + policyDetails.data.rcFront,
            });
          }
          if (policyDetails.data.previousPolicy) {
            updatedDocuments.push({
              docName: "previousPolicy",
              file: imagePath + policyDetails.data.previousPolicy,
            });
          }
          if (policyDetails.data.survey) {
            updatedDocuments.push({
              docName: "survey",
              file: imagePath + policyDetails.data.survey,
            });
          }
          if (policyDetails.data.puc) {
            updatedDocuments.push({
              docName: "puc",
              file: imagePath + policyDetails.data.puc,
            });
          }
          if (policyDetails.data.fitness) {
            updatedDocuments.push({
              docName: "fitness",
              file: imagePath + policyDetails.data.fitness,
            });
          }
          if (policyDetails.data.proposal) {
            updatedDocuments.push({
              docName: "proposal",
              file: imagePath + policyDetails.data.proposal,
            });
          }
          if (policyDetails.data.currentPolicy) {
            updatedDocuments.push({
              docName: "currentPolicy",
              file: imagePath + policyDetails.data.currentPolicy,
            });
          }
          if (policyDetails.data.other) {
            updatedDocuments.push({
              docName: "other",
              file: imagePath + policyDetails.data.other,
            });
          }
          setDocuments(updatedDocuments);
        })
        .catch((error) => {
          throw error
        });
    }
  }, [policyId]);
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
        .catch((error) => {throw error});
    } else {
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
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography
            variant="h5"
            className="text-safekaroDarkOrange"
            gutterBottom
            display="inline"
          >
            {"View Policy"}
          </Typography>
          <Typography variant="h5" mb={2}>
            <Link to="/dashboard" className="text-addButton font-bold text-sm">
              Dashboard {" / "}
            </Link>
            <Link
              to="/policy/motor-policies"
              className="text-addButton font-bold text-sm"
            >
              Policy /
            </Link>
            <span className="text-grey-600 text-sm">{"View Policy"}</span>
            
            <hr
              className="mt-4 mb-2"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
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
              {"Payment Details"}
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
                <Card>
                  <Grid item xs={12} m={2}>
                    <Typography
                      variant="h5"
                      className="text-safekaroDarkOrange"
                      component="h2"
                      sx={{ mb: 0 }}
                    >
                      {"Pay IN Details"}
                    </Typography>
                  </Grid>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={3}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"Pay In OD Percentage"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {policy?.payInODPercentage}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"Pay In TP Percentage"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {policy?.payInTPPercentage}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"Pay In OD Amount"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {policy?.payInODAmount}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"Pay IN TP Amount"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {policy?.payInTPAmount}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"PayIn Commission"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {policy?.payInCommission}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"Paid Amount"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {policy?.payInAmount}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"PayIn Balance"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {policy?.payInBalance}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"Pay In Commission Status"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {policy?.payInPaymentStatus}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <div className="bg-blue-200 mt-2">
                  <Card>
                    <Grid item xs={12} m={2}>
                      <Typography
                        variant="h5"
                        className="text-safekaroDarkOrange"
                        component="h2"
                        sx={{ mb: 0 }}
                      >
                        {"Pay Out Details"}
                      </Typography>
                    </Grid>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={3}>
                          <Typography
                            variant="subtitle1"
                            className="text-addButton"
                            component="h2"
                          >
                            {"Pay Out OD Percentage"}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {policy?.payOutODPercentage}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="subtitle1"
                            className="text-addButton"
                            component="h2"
                          >
                            {"Pay Out TP Percentage"}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {policy?.payOutTPPercentage}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="subtitle1"
                            className="text-addButton"
                            component="h2"
                            sx={{ mb: 0 }}
                          >
                            {"Pay Out OD Payout"}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {policy?.payOutODAmount}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="subtitle1"
                            className="text-addButton"
                            component="h2"
                            sx={{ mb: 0 }}
                          >
                            {"Pay Out TP Amount"}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {policy?.payOutTPAmount}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="subtitle1"
                            className="text-addButton"
                            component="h2"
                            sx={{ mb: 0 }}
                          >
                            {"Pay Out Commission"}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {policy?.payOutCommission}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="subtitle1"
                            className="text-addButton"
                            component="h2"
                            sx={{ mb: 0 }}
                          >
                            {"Paid Amount"}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {policy?.payOutAmount}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="subtitle1"
                            className="text-addButton"
                            component="h2"
                            sx={{ mb: 0 }}
                          >
                            {"PayOut Balance"}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {policy?.payOutBalance}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="subtitle1"
                            className="text-addButton"
                            component="h2"
                            sx={{ mb: 0 }}
                          >
                            {"Pay Out Commission Status"}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {policy?.payOutPaymentStatus}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
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
                <Button
                  variant="contained"
                  onClick={handleClickDownloadDocuments}
                >
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
        </Paper>
      </div>
    </>
  );
};
export default ViewPolicy;
