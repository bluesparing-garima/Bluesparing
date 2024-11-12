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
  // Define table columns
  const columns = useMemo<MRT_ColumnDef<IPayInExcel>[]>(
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
            // insuredType: payIn.insuredType,
            createdOn: dayjs(payIn.createdOn).format(DAYJS_DISPLAY_FORMAT),
            updatedOn: dayjs(payIn.updatedOn).format(DAYJS_DISPLAY_FORMAT),
          } as IPayInExcelVM)
      ) ?? [],
    [payInExcel]
  );

  const updateLoading = useCallback(async () => {
    // setIsLoading(true) when caseTypes.length is 0, and setIsLoading(false) when caseTypes.length is > 0
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
