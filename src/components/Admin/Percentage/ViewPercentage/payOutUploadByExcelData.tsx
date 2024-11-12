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
  // Define table columns
  const columns = useMemo<MRT_ColumnDef<IPayOutExcel>[]>(
    () => [
      {
        accessorKey: "policyType", // accessor key for case type name
        header: "Policy Type",
        size: 100,
      },
      {
        accessorKey: "productType", // accessor key for case type name
        header: "Product Type",
        size: 100,
      },
      {
        accessorKey: "subCategory", // accessor key for case type name
        header: "sub Category",
        size: 100,
      },
      {
        accessorKey: "fuelType", // accessor key for case type name
        header: "Fuel Type",
        size: 100,
      },
      {
        accessorKey: "companyName", // accessor key for case type name
        header: "company Name",
        size: 100,
      },
      {
        accessorKey: "od", // accessor key for case type name
        header: "od",
        size: 50,
      },
      {
        accessorKey: "tp", // accessor key for case type name
        header: "tp",
        size: 50,
      },
    ],
    []
  );

  // Parse and format the data for the table
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
            // insuredType: payOut.insuredType,
            createdOn: dayjs(payOut.createdOn).format(DAYJS_DISPLAY_FORMAT),
            updatedOn: dayjs(payOut.updatedOn).format(DAYJS_DISPLAY_FORMAT),
          } as IPayOutExcelVM)
      ) ?? [],
    [payOutExcel]
  );

  const updateLoading = useCallback(async () => {
    // setIsLoading(true) when caseTypes.length is 0, and setIsLoading(false) when caseTypes.length is > 0
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
