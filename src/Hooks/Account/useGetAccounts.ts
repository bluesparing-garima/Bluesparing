import { useEffect, useRef, useState } from "react";
import { IAccounts } from "../../components/Account/IAccounts";
import { GetAccountProps } from "../../api/Account/getAccountTypes";
import getAccountService from "../../api/Account/GetAccount/getAccountService";

export const defaultAccount: IAccounts[] = [];

const useGetAccounts = ({ header }: GetAccountProps) => {
  const [accounts, setAccounts] = useState<IAccounts[]>(defaultAccount);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getAccountService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          setAccounts(apiResponse.data);
        })
        .catch((res) => {
          console.error(res.status);
        });
    }
  }, [header, isLoading]);

  return [accounts];
};

export default useGetAccounts;
