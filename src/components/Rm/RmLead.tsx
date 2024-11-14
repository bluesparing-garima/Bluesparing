import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

import {  Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

import toast, { Toaster } from "react-hot-toast";
import { ILeads, ILeadsVM } from "../Partner/IPartner";
import {
  DAYJS_DISPLAY_FORMAT,
  SafeKaroUser,
  header,
} from "../../context/constant";

import CountdownTimer from "../../utils/CountdownTimer";
import GetRmLeadService from "../../api/BookingRequest/GetRmLead/GetRmLeadService";

const RmLead = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<ILeads[]>([]);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const GetLeads = async (rmId: string, signal: AbortSignal) => {
    setIsLoading(true);
    GetRmLeadService({ header, rmId, signal })
      .then((leadDetails) => {
        setLeads(leadDetails.data);
      })
      .catch(async (error) => {
        if (error.name !== "AbortError") {
          const err = await error;
          toast.error(err.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const rmId = userData.id;
    const controller = new AbortController();
    const signal = controller.signal;
    GetLeads(rmId, signal);
    return () => {
      controller.abort();
    };
  }, [userData.id]);



  const parsedData = useMemo(
    () =>
      leads.map(
        (lead: ILeads) =>
          ({
            id: lead._id,
            category: lead.category,
            policyType: lead.policyType,
            caseType: lead.caseType,
            companyName: lead.companyName,
            partnerId: lead.partnerId,
            partnerName: lead.partnerName,
            relationshipManagerId: lead.relationshipManagerId,
            relationshipManagerName: lead.relationshipManagerName,
            rcFront: lead.rcFront,
            rcBack: lead.rcBack,
            previousPolicy: lead.previousPolicy,
            survey: lead.survey,
            puc: lead.puc,
            fitness: lead.fitness,
            proposal: lead.proposal,
            currentPolicy: lead.currentPolicy,
            other: lead.other,
            remarks: lead.remarks,
            status: lead.status,
            isActive: lead.isActive,
            createdOn: lead.createdOn,
            updatedOn: lead.updatedOn,
            timer: lead.timer,
          } as ILeadsVM)
      ) ?? [],
    [leads]
  );

  const columns = useMemo<MRT_ColumnDef<ILeads>[]>(
    () => [
      {
        header: "Timer",
        accessorKey: "timer",
        size: 100,
        Cell: ({ row }) => {
          return (
            <CountdownTimer
              registerDate={row.original.updatedOn || row.original.createdOn}
              status={row.original.status}
              timer={row.original.timer}
            />
          );
        },
      },
      {
        accessorKey: "category", //normal accessorKey
        header: "Category",
        size: 100,
      },
      {
        accessorKey: "policyType", //normal accessorKey
        header: "Policy Type",
        size: 100,
      },
      {
        accessorKey: "caseType", //normal accessorKey
        header: "Case Type",
        size: 100,
      },
      {
        header: "Lead Status",
        accessorKey: "status",
        size: 50,
      },
      {
        header: "Created On",
        accessorKey: "createdOn",
        size: 50,
        Cell: ({ row }) => {
          return (
            <span>
              {dayjs(row.original.createdOn).format(DAYJS_DISPLAY_FORMAT)}
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Lead Table
          </Typography>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to="/rm/dashboard"
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm"> Lead</span>
              </div>
              {/* {userData.role.toLowerCase() !== "admin" && (
                <Button
                  type="button"
                  className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                  onClick={handleAddLeadClick}
                >
                  Add Lead
                </Button>
              )} */}
            </div>
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <MaterialReactTable
            state={{ isLoading }}
            columns={columns}
            data={parsedData}
            positionActionsColumn="last"
          />
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
};

export default RmLead;
