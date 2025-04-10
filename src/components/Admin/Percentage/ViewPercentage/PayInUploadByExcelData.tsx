import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { DAYJS_DISPLAY_FORMAT, header } from "../../../../context/constant";
import { IPayInExcel, IPayInExcelVM } from "../ICommission";
import dayjs from "dayjs";
import { Paper, Typography } from "@mui/material";
import useGetPayInExcel from "../../../../Hooks/PayInExcel/useGetPayInExcel";
interface ActivitiesProps {
  onExcelUploaded?: () => void;
}
const PayInUploadByExcelData = ({ onExcelUploaded }: ActivitiesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  let [payInExcel] = useGetPayInExcel({ header: header });
  const columns = useMemo<MRT_ColumnDef<IPayInExcel>[]>(
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
      payInExcel.map(
        (payIn: IPayInExcel) =>
          ({
            id: payIn._id,
            policyCategory: payIn.policyCategory,
            caseType: payIn.caseType,
            companyName: payIn.companyName,
            engine: payIn.engine,
            weight: payIn.weight,
            fuelType: payIn.fuelType,
            make: payIn.make,
            model: payIn.model,
            ncb: payIn.ncb,
            od: payIn.od,
            tp: payIn.tp,
            policyType: payIn.policyType,
            productType: payIn.productType,
            rto: payIn.rto,
            subCategory: payIn.subCategory,
            createdOn: dayjs(payIn.createdOn).format(DAYJS_DISPLAY_FORMAT),
            updatedOn: dayjs(payIn.updatedOn).format(DAYJS_DISPLAY_FORMAT),
          } as IPayInExcelVM)
      ) ?? [],
    [payInExcel]
  );
  const updateLoading = useCallback(async () => {
    setIsLoading(payInExcel.length >= 0 ? false : true);
  }, [payInExcel]);
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);
  return (
    <>
      <div className="pt-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Pay In Table
          </Typography>
          <MaterialReactTable
            muiTablePaperProps={{
              sx: {
                boxShadow: "none", 
                backgroundColor: "transparent", 
              
              },
            }}
      
            muiTableContainerProps={{
              sx: {
                boxShadow: "none", 
                backgroundColor: "transparent", 
              },
            }}
            state={{ isLoading }}
            columns={columns}
            data={parsedData}
          />
        </Paper>
      </div>
    </>
  );
};
export default PayInUploadByExcelData;
