import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Button, Grid, Paper, Typography } from "@mui/material";
import {
  ComparePartnerResultProps,
  IPolicyPartnerData,
} from "../ICompareResult";
import Papa from "papaparse";
interface ActivitiesProps {
  comparison?: ComparePartnerResultProps;
  onExcelUploaded?: () => void;
}
const ComparePartnerResult: React.FC<ActivitiesProps> = ({
  onExcelUploaded,
  comparison,
}) => {
  const [isLoading, setIsLoading] = useState(false);
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
    downloadCsv("partnerCompare.csv", csv);
  };
  const safekaroColumns = useMemo<MRT_ColumnDef<IPolicyPartnerData>[]>(
    () => [
      {
        accessorKey: "policyNumber",
        header: "Policy Number",
        size: 100,
      },
      {
        accessorKey: "partnerName",
        header: "Partner Name",
        size: 100,
      },
      {
        accessorKey: "db_payOutCommission",
        header: "SafeKaro Commission",
        size: 100,
      },
      {
        accessorKey: "excel_payOutCommission",
        header: "Partner Commission",
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
      comparison!.data.map((payOut: IPolicyPartnerData) => ({
        policyNumber: payOut.policyNumber,
        partnerName: payOut.partnerName,
        db_payOutCommission: payOut.db_payOutCommission,
        difference: payOut.difference || 0,
        excel_payOutCommission: payOut.excel_payOutCommission || 0,
        hasDifference: payOut.hasDifference || false,
      })) ?? [],
    [comparison]
  );
  const updateLoading = useCallback(async () => {
    setIsLoading(true);
    setIsLoading(false);
  }, []);
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);
  return (
    <>
      <div className="pt-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Comparison Table of {comparison!.partner}
          </Typography>
          <Grid container>
            <MaterialReactTable
              state={{ isLoading }}
              columns={safekaroColumns}
              data={safekaroData}
              renderTopToolbarCustomActions={({ table }) => (
                <>
                  <Button
                    className="text-white bg-safekaroDarkOrange m-2 p-2"
                    disabled={table.getRowModel().rows.length === 0}
                    onClick={() =>
                      handleExportRows(table.getFilteredRowModel().rows)
                    }
                  >
                    Export Filter Data
                  </Button>
                </>
              )}
            />
          </Grid>
        </Paper>
      </div>
    </>
  );
};
export default ComparePartnerResult;
