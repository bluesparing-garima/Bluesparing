import { useEffect, useRef, useState } from "react";
import getCaseTypeService from "../../api/CaseType/GetCaseTypes/getCaseTypesService";
import {
  GetCaseTypeProps,
  ICaseTypes,
} from "../../components/Admin/CaseType/ICaseTypes";

export const defaultCaseType: ICaseTypes[] = [];

const useGetCaseTypes = ({ header }: GetCaseTypeProps) => {
  const [caseTypes, setCaseType] = useState<ICaseTypes[]>(defaultCaseType);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getCaseTypeService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          const caseTypes = apiResponse.data.filter(
            (caseType: ICaseTypes) => caseType.isActive === true
          );
          setCaseType(caseTypes);
        })
        .catch((res) => {
          console.error(res.status);
        });
    }
  }, [header, isLoading]);

  return [caseTypes];
};

export default useGetCaseTypes;
