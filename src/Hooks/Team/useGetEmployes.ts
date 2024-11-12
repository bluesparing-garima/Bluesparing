import { useEffect, useRef, useState } from "react";
import getAllEmployeeService from "../../api/Team/GetEmployee/getAllEmployeeService";
import { ITeams } from "../../components/Admin/Team/ITeam";
import { GetEmployeesProps } from "../../api/Team/getTeamsTypes";

export const defaultTeam: ITeams[] = [];

const useGetEmployees = ({ header }: GetEmployeesProps) => {
  const [employees, setEmployees] = useState<ITeams[]>(defaultTeam);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getAllEmployeeService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          setEmployees(apiResponse.data!);
        })
        .catch((res) => {
          console.error(res.status);
        });
    }
  }, [header, isLoading]);

  return [employees];
};

export default useGetEmployees;
