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
       initialValues={editPolicyDetails}
      />
    </>
  );
};

export default AddHealthPolicyFormCard;
