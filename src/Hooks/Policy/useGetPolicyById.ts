import { useEffect, useRef, useState } from "react";
import { IViewPolicy } from "../../components/Policy/IPolicy";
import getPolicyByIdService from "../../api/Policies/GetPolicyById/getPolicyByIdService";
import { header } from "../../context/constant";

const useGetPolicyById = (policyId: string) => {
  const [policy, setPolicyDetails] = useState<IViewPolicy | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);
  const isLoading = useRef(true);

  useEffect(() => {
    if (isLoading.current) {
      getPolicyByIdService({ header, policyId })
        .then((apiResponse) => {
          isLoading.current = false;
          setPolicyDetails(apiResponse.data);
        })
        .catch((err) => {
          isLoading.current = false;
          setError(err.message || "An error occurred while fetching policy");
        });
    }
  }, [policyId]);

  return [policy, isLoading.current, error] as const;
};

export default useGetPolicyById;
