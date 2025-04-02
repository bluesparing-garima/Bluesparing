import { useEffect, useRef, useState } from "react";
import { IAccounts } from "../../components/Account/IAccounts";
import { GetAccountByRoleProps } from "../../api/Account/getAccountTypes";
import GetAccountByRoleServices from "../../api/Account/GetAccountByRole/GetAccountByRoleServices";

export const defaultAccount: IAccounts[] = [];

const useGetAccountByRole = ({ header,partnerId,role }: GetAccountByRoleProps) => {
  const [accounts, setAccounts] = useState<IAccounts[]>(defaultAccount);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
        GetAccountByRoleServices({ header,partnerId ,role})
        .then((apiResponse) => {
          isLoading.current = false;
          setAccounts(apiResponse.data);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header, isLoading]);

  return [accounts];
};

export default useGetAccountByRole;
