import { useEffect, useRef, useState } from "react";
import { GetRMListProps } from "../../api/Team/getTeamsTypes";
import { ITeams } from "../../components/Admin/Team/ITeam";
import getRMListService from "../../api/Team/GetRMList/getRMListServcie";

export const defaultRMList: ITeams[] = [];

const useGetRMList = ({ header, role }: GetRMListProps) => {
  const [rmList, setRMList] = useState<ITeams[]>(defaultRMList);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getRMListService({ header, role })
        .then((apiResponse) => {
          isLoading.current = false;
          setRMList(apiResponse.data!);
        })
        .catch((res) => {
          console.error(res.status);
        });
    }
  }, [header,role, isLoading]);

  return [rmList];
};

export default useGetRMList;
