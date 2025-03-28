import { useEffect, useRef, useState } from "react";
import { GetRMListProps } from "../../api/Team/getTeamsTypes";
import { IAppUser } from "../../components/Admin/Team/ITeam";
import getRMListService from "../../api/Team/GetRMList/getRMListServcie";

export const defaultRMList: IAppUser[] = [];

const useGetRMList = ({ header, role }: GetRMListProps) => {
  const [rmList, setRMList] = useState<IAppUser[]>(defaultRMList);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getRMListService({ header, role })
        .then((apiResponse) => {
          isLoading.current = false;
          setRMList(apiResponse.data!);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header,role, isLoading]);

  return [rmList];
};

export default useGetRMList;
