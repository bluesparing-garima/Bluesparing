import { useEffect, useRef, useState } from "react";
import { IPolicyTypes } from "../../components/Admin/PolicyType/IPolicyType";
import getPolicyTypeService from "../../api/PolicyType/GetPolicyType/getPolicyTypeService";
import { GetPolicyTypeProps } from "../../api/PolicyType/getPolicyTypes";

export const defaultPolicyType: IPolicyTypes[] = [];

const useGetPolicyTypes = ({ header }: GetPolicyTypeProps) => {
  const [policyTypes, setPolicyTypes] =
    useState<IPolicyTypes[]>(defaultPolicyType);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getPolicyTypeService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          //to Get Only Active Types
          const policies = apiResponse.data.filter(
            (policy: IPolicyTypes) => policy.isActive === true
          );
          setPolicyTypes(policies);
        })
        .catch((res) => {
          console.error(res.status);
        });
    }
  }, [header, isLoading]);

  return [policyTypes];
};

export default useGetPolicyTypes;
