import  { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import AddBookingRequestFormCard from "./AddBookingRequestFormCard";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../context/constant";
import { IBookingRequestForm } from "../IBookingRequests";
import getLeadByIdService from "../../../api/Leads/GetLeadById/getLeadByIdService";
import toast, { Toaster } from "react-hot-toast";
const AddBookingRequest = () => {
  const title = "Add Booking Request";
  const { leadId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [bookingDetails, setBookingDetails] = useState<
    IBookingRequestForm | undefined
  >(undefined);
  useEffect(() => {
    if (!isAdd && leadId) {
      getLeadByIdService({ header, leadId })
        .then((teamDetails) => {
          setBookingDetails(teamDetails.data);
        })
        .catch(async(error:any) => {
          const err = await error
          toast.error(err.message)
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
            <Link to="/booking" className="text-addButton font-bold text-sm">
              Booking Request /
            </Link>
            <span className="text-grey-600 text-sm">{title}</span>
            
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <AddBookingRequestFormCard
            initialValues={{
              policyNumber: isAdd ? "0" : bookingDetails?.policyNumber || "",
              category: isAdd ? "Motor" : bookingDetails?.category || "Motor",
              policyType: isAdd ? "" : bookingDetails?.policyType || "",
              caseType: isAdd ? "" : bookingDetails?.caseType || "",
              productType: isAdd ? "" : bookingDetails?.productType || "",
              subCategory: isAdd ? "" : bookingDetails?.subCategory || "",
              companyName: isAdd ? "" : bookingDetails?.companyName || "",
              partnerId: isAdd ? "" : bookingDetails?.partnerId || "",
              partnerName: isAdd ? "" : bookingDetails?.partnerName || "",
              relationshipManagerId: isAdd
                ? ""
                : bookingDetails?.relationshipManagerId || "",
              relationshipManagerName: isAdd
                ? ""
                : bookingDetails?.relationshipManagerName || "",
              bookingStatus: "requested",
              bookingCreatedBy: "",
              bookingAcceptedBy: "",
              rcFront: isAdd ? "" : bookingDetails?.rcFront || "",
              rcBack: isAdd ? "" : bookingDetails?.rcBack || "",
              previousPolicy: isAdd ? "" : bookingDetails?.previousPolicy || "",
              survey: isAdd ? "" : bookingDetails?.survey || "",
              puc: isAdd ? "" : bookingDetails?.puc || "",
              fitness: isAdd ? "" : bookingDetails?.fitness || "",
              proposal: isAdd ? "" : bookingDetails?.proposal || "",
              currentPolicy: isAdd ? "" : bookingDetails?.currentPolicy || "",
              other: isAdd ? "" : bookingDetails?.other || "",
              isActive: true,
              createdBy: "",
            }}
          />
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default AddBookingRequest;
