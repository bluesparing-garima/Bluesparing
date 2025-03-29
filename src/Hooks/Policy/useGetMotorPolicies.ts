import { useEffect, useRef, useState } from "react";
import getMotorPolicyService from "../../api/Policies/GetMotorPolicy/getMotorPolicyService";
import { GetMotorPoliciesProps } from "../../api/Policies/getPoliciesTypes";
import { IPolicy } from "../../components/Policy/IPolicy";

export const defaultPolicyType: IPolicy[] = [];

const useGetMotorPolicies = ({ header }: GetMotorPoliciesProps) => {
  const [motorPolicyTypes, setMotorPolicyTypes] = useState<IPolicy[]>(defaultPolicyType);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getMotorPolicyService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          setMotorPolicyTypes(apiResponse.data!);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header, isLoading]);

  return [motorPolicyTypes];
};

export default useGetMotorPolicies;
