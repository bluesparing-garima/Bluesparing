import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Button, Typography } from "@mui/material";
import { CompareBrokerResultProps, IPolicyBrokerData } from "../ICompareResult";
import Papa from "papaparse";
interface ActivitiesProps {
  comparison?: CompareBrokerResultProps;
  onExcelUploaded?: () => void;
}
const downloadCsv = (filename: string, csv: string) => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
const handleExportRows = (rows: any[]) => {
  const rowData = rows.map((row) => row.original);
  const csv = Papa.unparse(rowData, { header: true });
  downloadCsv("brokerCompare.csv", csv);
};
const CompareBrokerResult: React.FC<ActivitiesProps> = ({
  onExcelUploaded,
  comparison,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const safekarocolumns = useMemo<MRT_ColumnDef<IPolicyBrokerData>[]>(
    () => [
      {
        accessorKey: "policyNumber",
        header: "Policy Number",
        size: 100,
      },
      {
        accessorKey: "db_payInCommission",
        header: "SafeKaro Commission",
        size: 100,
      },
      {
        accessorKey: "excel_payInCommission",
        header: "Broker Commission",
        size: 100,
      },
      {
        accessorKey: "difference",
        header: "Difference",
        size: 100,
      },
    ],
    []
  );
  const safekaroData = useMemo(
    () =>
      comparison!.data.map((payIn: IPolicyBrokerData) => ({
        policyNumber: payIn.policyNumber,
        db_payInCommission: payIn.db_payInCommission,
        excel_payInCommission: payIn.excel_payInCommission,
        difference: payIn.difference,
      })) ?? [],
    [comparison]
  );
  const updateLoading = useCallback(async () => {
    if (comparison!.data.length === 0) {
    }
    setIsLoading(false);
  }, [comparison]);
  useEffect(() => {
    if (onExcelUploaded) {
      updateLoading();
    }
  }, [onExcelUploaded, updateLoading]);
  return (
    <>
      <Typography className="text-safekaroDarkOrange" variant="h5">
        Comparison Table of {comparison!.broker}
      </Typography>
      <MaterialReactTable
        state={{ isLoading }}
        columns={safekarocolumns}
        data={safekaroData}
        renderTopToolbarCustomActions={({ table }) => (
          <>
            <Button
              className="text-white bg-safekaroDarkOrange m-2 p-2"
              disabled={table.getRowModel().rows.length === 0}
              onClick={() => handleExportRows(table.getFilteredRowModel().rows)}
            >
              Export Filter Data
            </Button>
          </>
        )}
      />
    </>
  );
};
export default CompareBrokerResult;
