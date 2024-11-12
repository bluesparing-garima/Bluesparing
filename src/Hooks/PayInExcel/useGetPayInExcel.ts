import { useEffect, useRef, useState } from "react";
import { IPayInExcel } from "../../components/Admin/Percentage/ICommission";
import getPayInExcelService from "../../api/PayoutExcel/GetPayInExcel/getPayInExcelService";
import { GetPayInExcelProps } from "../../api/PayoutExcel/getPayTypes";

export const defaultPayIn: IPayInExcel[] = [];

const useGetPayInExcel = ({ header }: GetPayInExcelProps) => {
  const [payInExcel, setPayInExcel] = useState<IPayInExcel[]>(defaultPayIn);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getPayInExcelService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          setPayInExcel(apiResponse.data!);
        })
        .catch((res) => {
          console.error(res.status);
        });
    }
  }, [header, isLoading]);

  return [payInExcel];
};

export default useGetPayInExcel;
