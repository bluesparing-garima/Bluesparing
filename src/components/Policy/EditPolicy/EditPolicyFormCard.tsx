import { useLocation, useParams } from "react-router-dom";
import EditPolicyForm from "./EditPolicyForm";
import { useEffect, useState } from "react";
import { ADD, header } from "../../../context/constant";
import { IAddEditPolicyForm } from "../IPolicy";
import getBookingRequestByIdService from "../../../api/BookingRequest/GetBookingRequestById/getBookingRequestByIdService";

const EditPolicyFormCard = () => {
  const { bookingRequestId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editPolicyDetails, setEditPolicyDetails] =
    useState<IAddEditPolicyForm>();

  useEffect(() => {
    if (bookingRequestId) {
      getBookingRequestByIdService({ header, bookingRequestId })
        .then((bookingDetails) => {
          const bookingRequestVMToPolicyForm = {
            category: "motor",
            bookingId: bookingRequestId,
            policyType: bookingDetails.data.policyType,
            caseType: bookingDetails.data.caseType,
            productType: bookingDetails.data.productType,
            subCategory: bookingDetails.data.subCategory,
            companyName: bookingDetails.data.companyName,
            broker: "",
            make: "",
            model: "",
            fuelType: "",
            rto: "",
            vehicleNumber: "",
            seatingCapacity: 0,
            cc: 0,
            ncb: "",
            policyNumber: bookingDetails.data.policyNumber,
            fullName: "",
            emailId: "",
            phoneNumber: 0,
            mfgYear: 0,
            tenure: 0,
            registrationDate: "",
            endDate: "",
            issueDate: "",
            idv: 0,
            od: 0,
            tp: 0,
            netPremium: 0,
            finalPremium: 0,
            paymentMode: "",
            policyCreatedBy: "",
            policyCompletedBy: "",
            partnerId: bookingDetails.data.partnerId,
            brokerId: bookingDetails.data.brokerId,
            partnerName: bookingDetails.data.partnerName,
            relationshipManagerId: bookingDetails.data.relationshipManagerId,
            relationshipManagerName:
              bookingDetails.data.relationshipManagerName,
            rcFront: bookingDetails.data.rcFront,
            rcBack: bookingDetails.data.rcBack,
            previousPolicy: bookingDetails.data.previousPolicy,
            survey: bookingDetails.data.survey,
            puc: bookingDetails.data.puc,
            fitness: bookingDetails.data.fitness,
            proposal: bookingDetails.data.proposal,
            currentPolicy: bookingDetails.data.currentPolicy,
            other: bookingDetails.data.other,
            leadId: bookingDetails.data.leadId,
            createdOn: bookingDetails.data.createdOn,
          };
          setEditPolicyDetails(bookingRequestVMToPolicyForm);
          // setEditPolicyDetails(bookingDetails.data);
        })
        .catch((error) => {
          console.error("Failed to fetch bookingRequest details", error);
        });
    }
  }, [isAdd, bookingRequestId]);

  return (
    <>
      <EditPolicyForm
        initialValues={{
          id: isAdd ? "0" : editPolicyDetails?.id || "",
          bookingId: isAdd ? "0" : editPolicyDetails?.bookingId || "",
          leadId: isAdd ? "0" : editPolicyDetails?.leadId || "",
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
          seatingCapacity: isAdd ? 0 : editPolicyDetails?.seatingCapacity!,
          cc: isAdd ? 0 : editPolicyDetails?.cc!,
          weight: isAdd ? 0 : editPolicyDetails?.weight!,
          ncb: isAdd ? "" : editPolicyDetails?.ncb!,
          vehicleNumber: isAdd ? "" : editPolicyDetails?.vehicleNumber!,
          policyNumber: isAdd ? "" : editPolicyDetails?.policyNumber!,
          fullName: isAdd ? "" : editPolicyDetails?.fullName!,
          emailId: isAdd ? "" : editPolicyDetails?.emailId!,
          phoneNumber: isAdd ? 0 : editPolicyDetails?.phoneNumber!,
          mfgYear: isAdd ? 2000 : editPolicyDetails?.mfgYear!,
          tenure: isAdd ? 1 : editPolicyDetails?.tenure!,
          issueDate: isAdd ? "" : editPolicyDetails?.issueDate!,
          endDate: isAdd ? "" : editPolicyDetails?.endDate!,
          registrationDate: isAdd ? "" : editPolicyDetails?.registrationDate!,
          idv: isAdd ? 0 : editPolicyDetails?.idv!,
          od: isAdd ? 0 : editPolicyDetails?.od!,
          tp: isAdd ? 0 : editPolicyDetails?.tp!,
          netPremium: isAdd ? 0 : editPolicyDetails?.netPremium!,
          finalPremium: isAdd ? 0 : editPolicyDetails?.finalPremium!,
          paymentMode: isAdd ? "" : editPolicyDetails?.paymentMode!,
          policyCreatedBy: isAdd
            ? ""
            : editPolicyDetails?.partnerId!
            ? "Partner"
            : editPolicyDetails?.policyCreatedBy!,
          //documents: [],
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

          documents: isAdd
            ? []
            : [
                editPolicyDetails?.rcFront,
                editPolicyDetails?.rcBack,
                editPolicyDetails?.previousPolicy,
                editPolicyDetails?.survey,
                editPolicyDetails?.puc,
                editPolicyDetails?.fitness,
                editPolicyDetails?.proposal,
                editPolicyDetails?.currentPolicy,
                editPolicyDetails?.other,
              ].filter(Boolean) as string[], // null ya undefined values remove karega
          policyCompletedBy: isAdd ? "" : editPolicyDetails?.policyCompletedBy!,
          createdOn: isAdd ? "" : editPolicyDetails?.createdOn!,
        }}
      />
    </>
  );
};

export default EditPolicyFormCard;
