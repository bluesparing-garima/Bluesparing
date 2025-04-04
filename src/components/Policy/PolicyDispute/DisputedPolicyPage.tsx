import React, { useEffect, useMemo, useState } from "react";
import { IViewPolicy } from "../IPolicy";
import { DAYJS_DISPLAY_FORMAT, SafeKaroUser } from "../../../context/constant";
import PolicyDisputeWrapper from "./PolicyDisputeWrapper";
import GetAllDisputedPolicyService from "../../../api/Policies/GetAllDisputedPolicy/GetAllDisputedPolicyService";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { disputedCol } from "./DisputedColumns";
import dayjs from "dayjs";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";

const DisputedPolicyPage = () => {
  const [motorPolicies, setMotorPolicies] = useState<IViewPolicy[]>([]);
  const navigate = useNavigate();
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const columns = useMemo<MRT_ColumnDef<IViewPolicy>[]>(
    () => disputedCol.filter((column) => column.visible !== false),
    [userData.role]
  );

  const fetchData = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await GetAllDisputedPolicyService();
      setMotorPolicies(res.data);
    } catch (error: any) {
      const err = await error;
      setError(err.message || "error occur while fetching disputed policies");
    } finally {
      setLoading(false);
    }
  };
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
      "policyId",
      "id",
      "uuid",
      "brokerCode",
      "partnerId",
      "relationshipManagerId",
      "rcFront",
      "rcBack",
      "previousPolicy",
      "survey",
      "puc",
      "fitness",
      "proposal",
      "currentPolicy",
      "bookingDate",
      "bookingTimer",
      "leadDate",
      "leadTimer",
    ];
    const rowData = rows.map((row) => {
      const modifiedRow = { ...row.original };
      exclusiveCol.forEach((col) => {
        delete modifiedRow[col];
      });
      return modifiedRow;
    });
    const csv = Papa.unparse(rowData, { header: true });
    downloadCsv("motor-policy.csv", csv);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <PolicyDisputeWrapper title="Disputed Policies">
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
        state={{
          isLoading: loading,
        }}
        columns={columns}
        data={motorPolicies || []}
        enableRowActions
        enableGlobalFilter
        renderTopToolbarCustomActions={({ table }) => (
          <>
<Button
  className="btnGradient text-black px-4 py-2 rounded-sm w-full sm:w-auto text-[10px] md:text-xs md:m-2"
  disabled={table.getRowModel().rows.length === 0}
  onClick={() => handleExportRows(table.getFilteredRowModel().rows)}
>
  Export Filter Data
</Button>

          </>
        )}
        renderRowActions={({ row }) => {
          return (
            <div className="flex justify-center items-center">
              {(userData.role.toLowerCase() === "admin" ||
                userData.role.toLowerCase() === "account" ||
                userData.role.toLowerCase() === "partner") && (
                <Tooltip title={"Dispute"}>
                  <IconButton
                    color="primary"
                    aria-label={"Dispute"}
                    component="span"
                    onClick={() => {
                        
                      navigate(`/policy/policy-dispute`, {
                        state: row.original,
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              )}
            </div>
          );
        }}
      />
    </PolicyDisputeWrapper>
  );
};

export default DisputedPolicyPage;
