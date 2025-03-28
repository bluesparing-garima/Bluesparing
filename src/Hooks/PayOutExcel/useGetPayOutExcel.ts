import { useEffect, useRef, useState } from "react";
import { IPayOutExcel } from "../../components/Admin/Percentage/ICommission";
import getPayOutExcelService from "../../api/PayoutExcel/GetPayOutExcel/getPayOutExcelService";
import { GetPayOutExcelProps } from "../../api/PayoutExcel/getPayTypes";

export const defaultPayOut: IPayOutExcel[] = [];

const useGetPayOutExcel = ({ header }: GetPayOutExcelProps) => {
  const [payOutExcel, setPayOutExcel] = useState<IPayOutExcel[]>(defaultPayOut);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getPayOutExcelService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          setPayOutExcel(apiResponse.data!);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header, isLoading]);

  return [payOutExcel];
};

export default useGetPayOutExcel;
