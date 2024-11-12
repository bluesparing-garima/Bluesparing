import { useEffect, useRef, useState } from "react";
import { IBranches } from "../../components/Admin/Branch/IBranch";
import getBranchesService from "../../api/Branch/GetBranches/getBranchesService";
import { GetBranchProps } from "../../api/Branch/getBranchTypes";

export const defaultBranch: IBranches[] = [];

const useGetBranches = ({ header }: GetBranchProps) => {
  const [branches, setBranches] = useState<IBranches[]>(defaultBranch);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getBranchesService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          const branches = apiResponse.data.filter(
            (branch: IBranches) => branch.isActive === true
          );
          setBranches(branches);
        })
        .catch((res) => {
          console.error(res.status);
        });
    }
  }, [header, isLoading]);

  return [branches];
};

export default useGetBranches;