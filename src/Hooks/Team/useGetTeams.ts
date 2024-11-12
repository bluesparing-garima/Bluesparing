import { useEffect, useRef, useState } from "react";
import getTeamsService from "../../api/Team/GetTeams/getTeamsService";
import { GetTeamProps } from "../../api/Team/getTeamsTypes";
import { ITeams } from "../../components/Admin/Team/ITeam";

export const defaultTeam: ITeams[] = [];

const useGetTeams = ({ header }: GetTeamProps) => {
  const [teams, setTeams] = useState<ITeams[]>(defaultTeam);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getTeamsService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          setTeams(apiResponse.data!);
        })
        .catch((res) => {
          console.error(res.status);
        });
    }
  }, [header, isLoading]);

  return [teams];
};

export default useGetTeams;
