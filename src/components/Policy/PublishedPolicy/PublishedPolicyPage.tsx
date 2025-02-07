import { Alert, CircularProgress, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import useGetPolicyById from "../../../Hooks/Policy/useGetPolicyById";
import PublishPolicyFrom from "./PublishPolicyFrom";
import { PartnerDetails, PublishedPolicyPageProps } from "./IPublish";

const PublishedPolicyPage = () => {
    const location = useLocation() ;
    const { partnerName, partnerId, policyId,policyNumber,bookingId,leadId,bookingCreated } = location.state as PublishedPolicyPageProps || {};
  const [policy, isLoading, error] = useGetPolicyById(policyId);
  const partners: PartnerDetails[] = [
    { partnerName, partnerId },
    {
      partnerName: policy?.partnerName || "",
      partnerId: policy?.partnerId || "",
    },
  ];
  if (isLoading) {
    <div className="bg-blue-200 md:p-7 p-2 flex justify-center items-center">
      <CircularProgress />
    </div>;
  }
  return (
    <div className="bg-blue-200 md:p-7 p-2">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography
          variant="h5"
          className="text-safekaroDarkOrange"
          gutterBottom
          display="inline"
        >
          Update Published Details
        </Typography>
        <Typography variant="h5" mb={2}>
          <Link
            to="/bookingdashboard"
            className="text-addButton font-bold text-sm"
          >
            Dashboard {" / "}
          </Link>
          <Link to="/booking" className="text-addButton font-bold text-sm">
            Policy /
          </Link>

          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <PublishPolicyFrom partners={partners} policyNumber={policyNumber} bookingId={bookingId} leadId={leadId} bookingCreated={bookingCreated}  />
        )}
      </Paper>
    </div>
  );
};

export default PublishedPolicyPage;
