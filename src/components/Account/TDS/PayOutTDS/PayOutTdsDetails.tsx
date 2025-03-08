import { FC, useState, useMemo } from "react";
import TDSWrapper from "../TDSWrapper";
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import MaterialReactTable from "material-react-table";
import { ITdsType, PolicyTdsPayOutProps } from "../ITDS";
import toast from "react-hot-toast";
import UpdateTdsStatusService from "../../../../api/Account/UpdateTdsStatus/UpdateTdsStatusService";
import { IUpdateTdsPayout } from "../../../../api/Account/getAccountTypes";
import PayOutTdsColumns from "./PayOutTdsColumns";
import Papa from "papaparse";
const PayOutTdsDetails: FC<PolicyTdsPayOutProps> = ({
  policies,
  accountId,
  accountCode,
  startDate,
  endDate,
  distributedDate,
}) => {
  const [selectAllPaid, setSelectAllPaid] = useState(false);
  const [updatePolicies, setUpdatePolicies] = useState<ITdsType[]>(
    policies.map((policy) => ({ ...policy }))
  );

  
  console.log('policy : ', updatePolicies);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const totalTdsAmount = useMemo(
    () => policies.reduce((acc, policy) => acc + (policy.tdsAmount || 0), 0),
    [policies]
  );

  const totalDisTds = useMemo(
    () =>
      updatePolicies.reduce((acc, policy) => {
        return policy.tdsProcessed ? acc + (policy.tdsAmount || 0) : acc;
      }, 0),
    [updatePolicies]
  );

  const currLeftDisAmount = totalTdsAmount - totalDisTds;

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
    const exclusiveCol = [
      "_id",
      "updatedOn", "employeeId", "employeeName", "createdBy", "remarks", "policyNumber"
    ];
    const rowData = rows.map((row) => {
      const modifiedRow = { ...row.original };
      exclusiveCol.forEach((col) => {
        delete modifiedRow[col];
      });
      return modifiedRow;
    });
    const csv = Papa.unparse(rowData, { header: true });
    downloadCsv("tds_payout.csv", csv);
  };

  const makePayload = (): Partial<ITdsType>[] => {
    return updatePolicies
      .filter((policy) => policy.tdsProcessed)
      .map((policy) => ({
        _id: policy._id,
        tdsAmount: policy.tdsAmount,
        partnerId: policy.partnerId,
        tdsProcessed: policy.tdsProcessed,
        remarks: policy.remarks,
        accountType: policy.accountType,
        accountId,
        startDate,
        endDate,
        distributedDate,
        accountCode,
        partnerName: policy.partnerName,
        tdsPercentage: policy.tdsPercentage,
        receiverPan: policy.receiverPan,
        receiverIFSCCode: policy.receiverIFSCCode,
        receiverAccountNumber: policy.receiverAccountNumber,
        receiverBankName: policy.receiverBankName,
        receiverAccountCode: policy.receiverAccountCode,
        receiverName: policy.receiverName
      }));
  };

  const handleClickSubmit = async () => {
    const payload = makePayload();

    if (payload.length === 0) {
      toast.error("Please select at least one policy.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);
      const response = await UpdateTdsStatusService(payload as IUpdateTdsPayout[]);
      if (response.success) {
        setSuccessMsg(response.message || "TDS distributed successfully.");
        toast.success(response.message || "TDS updated successfully.");
      } else {
        setError(response.message || "Failed to update TDS.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while updating TDS.");
      toast.error(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const updateAllTdsData = (tdsProcessed: boolean) => {
    setUpdatePolicies((prev) =>
      prev.map((policy) => ({ ...policy, tdsProcessed }))
    );
  };

  const updateIndividualsTdsData = (tdsProcessed: boolean, id: string) => {
    setUpdatePolicies((prev) =>
      prev.map((policy) =>
        policy._id === id ? { ...policy, tdsProcessed } : policy
      )
    );
  };

  const handleSelectAllPaidChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setSelectAllPaid(isChecked);
    updateAllTdsData(isChecked);
  };

  const handleRowCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: ITdsType
  ) => {
    const { checked } = event.target;
    updateIndividualsTdsData(checked, row._id);
  };

  if (error) {
    return (
      <TDSWrapper title="Error Occurred">
        <Alert severity="error">{error}</Alert>
      </TDSWrapper>
    );
  }

  if (successMsg) {
    return (
      <TDSWrapper title="">
        <Alert severity="success">{successMsg}</Alert>
      </TDSWrapper>
    );
  }

  return (
    <TDSWrapper title={`TDS Distribution Of partners`}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Total Policies TDS Amount:{" "}
            <span className="text-safekaroDarkOrange">{totalTdsAmount}</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Total Distributed TDS Amount:{" "}
            <span className="text-safekaroDarkOrange">{totalDisTds}</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Left Distributed TDS Amount:{" "}
            <span className="text-safekaroDarkOrange">{currLeftDisAmount}</span>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectAllPaid}
                  onChange={handleSelectAllPaidChange}
                />
              }
              label="Select All Paid"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button
            type="button"
            variant="contained"
            onClick={handleClickSubmit}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update TDS"}
          </Button>
        </Grid>
      </Grid>

      <MaterialReactTable
        state={{ isLoading: loading }}
        columns={PayOutTdsColumns}
        data={updatePolicies || []}
        enableRowActions
        renderRowActions={({ row }) => (
          <Checkbox
            checked={row.original.tdsProcessed || false}
            onChange={(event) => handleRowCheckboxChange(event, row.original)}
          />
        )}
        renderTopToolbarCustomActions={({ table }) => (
          <>
            <Button
              className="text-white bg-safekaroDarkOrange md:m-2 md:p-2 md:text-xs text-[10px]"
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
    </TDSWrapper>
  );
};

export default PayOutTdsDetails;
