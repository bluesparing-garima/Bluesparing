import { useEffect, useRef, useState } from "react";
import getRolesService from "../../api/Role/GetRoles/getRolesService";
import { GetRoleProps } from "../../api/Role/getRolesTypes";
import { IRoles } from "../../components/Admin/Role/IRole";

export const defaultRole: IRoles[] = [];

const useGetRoles = ({ header }: GetRoleProps) => {
  const [roles, setRoles] = useState<IRoles[]>(defaultRole);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getRolesService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          setRoles(apiResponse.data!);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header, isLoading]);

  return [roles];
};

export default useGetRoles;
