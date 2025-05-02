import { useLocation, useParams } from "react-router-dom";
import AddHealthPolicyForm from "./AddHealthPolicyForm";

import { useEffect, useState } from "react";
import { ADD, header } from "../../../context/constant";
// import { IAddEditPolicyForm } from "../IPolicy";
import { IAddEditHealthForm } from "../IHealth";
import getPolicyByIdService from "../../../api/Policies/GetPolicyById/getPolicyByIdService";

const AddHealthPolicyFormCard = () => {
  const { policyId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editPolicyDetails, setEditPolicyDetails] =
    useState<IAddEditHealthForm>();
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
      <AddHealthPolicyForm
        initialValues={{
          id: isAdd ? "0" : editPolicyDetails?.id || "",
          policyType: isAdd ? "" : editPolicyDetails?.policyType || "",
          caseType: isAdd ? "" : editPolicyDetails?.caseType!,
          companyName: isAdd ? "" : editPolicyDetails?.companyName!,
          productType: isAdd ? "" : editPolicyDetails?.productType!,
          broker: isAdd ? "" : editPolicyDetails?.broker!,
          brokerId: isAdd ? "" : editPolicyDetails?.brokerId!,
          brokerCode: isAdd ? "" : editPolicyDetails?.brokerCode!,
          policyNumber: isAdd ? "" : editPolicyDetails?.policyNumber!,
          fullName: isAdd ? "" : editPolicyDetails?.fullName!,
          emailId: isAdd ? "" : editPolicyDetails?.emailId!,
          phoneNumber: isAdd ? 0 : editPolicyDetails?.phoneNumber!,
          renewalYear: isAdd ? 0 : editPolicyDetails?.renewalYear!,
          firstPurchaseDate: isAdd ? '' : editPolicyDetails?.firstPurchaseDate!,
          issueDate: isAdd ? "" : editPolicyDetails?.issueDate!,
          endDate: isAdd ? "" : editPolicyDetails?.endDate!,
          accumulatedBonus : isAdd ? 0 : editPolicyDetails?.accumulatedBonus!,
          accumulativeBonus : isAdd ? 0 : editPolicyDetails?.accumulativeBonus!,
          // registrationDate: isAdd ? "" : editPolicyDetails?.registrationDate!,
          netPremium: isAdd ? 0 : editPolicyDetails?.netPremium!,
          finalPremium: isAdd ? 0 : editPolicyDetails?.finalPremium!,
          totalSumInsured: isAdd ? 0 : editPolicyDetails?.totalSumInsured!,
          paymentMode: isAdd ? "" : editPolicyDetails?.paymentMode!,
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

export default AddHealthPolicyFormCard;
