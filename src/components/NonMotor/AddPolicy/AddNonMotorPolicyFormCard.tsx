import { useLocation, useParams } from "react-router-dom";
import AddPolicyForm from "./AddNonMotorPolicyForm";
import { useEffect, useState } from "react";
import { ADD, header } from "../../../context/constant";
import getPolicyByIdService from "../../../api/Policies/GetPolicyById/getPolicyByIdService";
import { IAddEditPolicyForm } from "../../Policy/IPolicy";

const AddNonMotorPolicyFormCard = () => {
  const { policyId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editPolicyDetails, setEditPolicyDetails] =
    useState<IAddEditPolicyForm>();
  useEffect(() => {
    if (!isAdd && policyId) {
      getPolicyByIdService({ header, policyId })
        .then((policyDetails) => {
          setEditPolicyDetails(policyDetails.data);
        
        })
        .catch((error) => {
          throw error
        });
    }
  }, [isAdd, policyId]);

  return (
    <>
      <AddPolicyForm
        initialValues={{
          id: isAdd ? "0" : editPolicyDetails?.id || "",
          policyNumber: isAdd ? "" : editPolicyDetails?.policyNumber!,
          policyType: isAdd ? "" : editPolicyDetails?.policyType || "",
          caseType: isAdd ? "" : editPolicyDetails?.caseType!,
          productType: isAdd ? "" : editPolicyDetails?.productType!,
          category: "motor",
          subCategory: isAdd ? "" : editPolicyDetails?.subCategory!,
          companyName: isAdd ? "" : editPolicyDetails?.companyName!,
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
          fullName: isAdd ? "" : editPolicyDetails?.fullName!,
          emailId: isAdd ? "" : editPolicyDetails?.emailId!,
          phoneNumber: isAdd ? 0 : editPolicyDetails?.phoneNumber!,
          mfgYear: isAdd ? 0 : editPolicyDetails?.mfgYear!,
          tenure: isAdd ? 1 : editPolicyDetails?.tenure!,
          issueDate: isAdd ? "" : editPolicyDetails?.issueDate!,
          endDate: isAdd ? "" : editPolicyDetails?.endDate!,
          registrationDate: isAdd ? "" : editPolicyDetails?.registrationDate!,
          idv: isAdd ? undefined : editPolicyDetails?.idv!,
          od: isAdd ? 0 : editPolicyDetails?.od!,
          tp: isAdd ? 0 : editPolicyDetails?.tp!,
          netPremium: isAdd ? 0 : editPolicyDetails?.netPremium!,
          finalPremium: isAdd ? 0 : editPolicyDetails?.finalPremium!,
          paymentMode: isAdd ? "" : editPolicyDetails?.paymentMode!,
          policyCreatedBy: isAdd ? "" : editPolicyDetails?.policyCreatedBy!,
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
          rcFront: isAdd ? "" : editPolicyDetails?.rcFront!,
          rcBack: isAdd ? "" : editPolicyDetails?.rcBack!,
          previousPolicy: isAdd ? "" : editPolicyDetails?.previousPolicy!,
          survey: isAdd ? "" : editPolicyDetails?.survey!,
          puc: isAdd ? "" : editPolicyDetails?.puc!,
          fitness: isAdd ? "" : editPolicyDetails?.fitness!,
          proposal: isAdd ? "" : editPolicyDetails?.proposal!,
          currentPolicy: isAdd ? "" : editPolicyDetails?.currentPolicy!,
          other: isAdd ? "" : editPolicyDetails?.other!,
          policyCompletedBy: isAdd ? "" : editPolicyDetails?.policyCompletedBy!,
        }}
      />
    </>
  );
};

export default AddNonMotorPolicyFormCard;
