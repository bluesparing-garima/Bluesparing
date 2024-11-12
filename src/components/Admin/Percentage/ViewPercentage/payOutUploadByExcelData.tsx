import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { DAYJS_DISPLAY_FORMAT, header } from "../../../../context/constant";
import { IPayOutExcel, IPayOutExcelVM } from "../ICommission";
import dayjs from "dayjs";
import { Paper, Typography } from "@mui/material";
import useGetPayOutExcel from "../../../../Hooks/PayOutExcel/useGetPayOutExcel";
interface ActivitiesProps {
  onExcelUploaded?: () => void;
}
const PayOutUploadByExcelData = ({ onExcelUploaded }: ActivitiesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  let [payOutExcel] = useGetPayOutExcel({ header: header });
  const columns = useMemo<MRT_ColumnDef<IPayOutExcel>[]>(
    () => [
      {
        accessorKey: "policyType",
        header: "Policy Type",
        size: 100,
      },
      {
        accessorKey: "productType",
        header: "Product Type",
        size: 100,
      },
      {
        accessorKey: "subCategory",
        header: "sub Category",
        size: 100,
      },
      {
        accessorKey: "fuelType",
        header: "Fuel Type",
        size: 100,
      },
      {
        accessorKey: "companyName",
        header: "company Name",
        size: 100,
      },
      {
        accessorKey: "od",
        header: "od",
        size: 50,
      },
      {
        accessorKey: "tp",
        header: "tp",
        size: 50,
      },
    ],
    []
  );
  const parsedData = useMemo(
    () =>
      payOutExcel.map(
        (payOut: IPayOutExcel) =>
          ({
            id: payOut._id,
            policyCategory: payOut.policyCategory,
            caseType: payOut.caseType,
            companyName: payOut.companyName,
            engine: payOut.engine,
            fuelType: payOut.fuelType,
            make: payOut.make,
            model: payOut.model,
            ncb: payOut.ncb,
            od: payOut.od,
            tp: payOut.tp,
            policyType: payOut.policyType,
            productType: payOut.productType,
            rto: payOut.rto,
            subCategory: payOut.subCategory,
            createdOn: dayjs(payOut.createdOn).format(DAYJS_DISPLAY_FORMAT),
            updatedOn: dayjs(payOut.updatedOn).format(DAYJS_DISPLAY_FORMAT),
          } as IPayOutExcelVM)
      ) ?? [],
    [payOutExcel]
  );
  const updateLoading = useCallback(async () => {
    setIsLoading(payOutExcel.length >= 0 ? false : true);
  }, [payOutExcel]);
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);
  return (
    <>
      <div className="pt-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Pay Out Table
          </Typography>
          <MaterialReactTable
            state={{ isLoading }}
            columns={columns}
            data={parsedData}
          />
        </Paper>
      </div>
    </>
  );
};
export default PayOutUploadByExcelData;
