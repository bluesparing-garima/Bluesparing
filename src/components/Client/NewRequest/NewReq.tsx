import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { header } from "../../../context/constant";

import { IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import toast, { Toaster } from "react-hot-toast";
import { AddEditRoleProps } from "../../../api/Role/getRolesTypes";
import editRoleService from "../../../api/Role/EditRole/editRoleService";
import getPartnersService from "../../../api/Partner/GetPartner/getPartnersService";
import { IAdmin } from "../IAdmin";

const NewReq = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [adminData, setAdminData] = useState<IAdmin[]>();

  const fetchData = async () => {
    try {
      const res = await getPartnersService({ header, role: "admin" });

      setAdminData(res.data);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo<MRT_ColumnDef<IAdmin>[]>(
    () => [
      {
        accessorKey: "fullName",
        header: "Full Name",
        size: 200,
      },
      {
        accessorKey: "branchName",
        header: "Branch Name",
        size: 150,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 100,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        size: 150,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        size: 100,
      },
      {
        header: "Status",
        accessorKey: "isActive",
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue<boolean>();
          return value ? (
            <CheckCircleOutlineIcon color="success" />
          ) : (
            <CancelOutlinedIcon color="error" />
          );
        },
      },
      {
        accessorKey: "wallet",
        header: "Wallet",
        size: 100,
        Cell: ({ cell }) => `₹${cell.getValue<number>()}`,
      },
      {
        accessorKey: "partnerId",
        header: "Partner ID",
        size: 150,
      },
      {
        accessorKey: "joiningDate",
        header: "Joining Date",
        size: 150,
        Cell: ({ cell }) =>
          new Date(cell.getValue<string>()).toLocaleDateString("en-IN"),
      },
      {
        accessorKey: "createdOn",
        header: "Created On",
        size: 150,
        Cell: ({ cell }) =>
          new Date(cell.getValue<string>()).toLocaleDateString("en-IN"),
      },
      {
        accessorKey: "updatedOn",
        header: "Updated On",
        size: 150,
        Cell: ({ cell }) => {
          const value = cell.getValue<string | null>();
          return value
            ? new Date(value).toLocaleDateString("en-IN")
            : "Not Updated";
        },
      },
    ],
    []
  );

  const changeStatus = async (row: IAdmin) => {
    try {
      let payload: AddEditRoleProps = {
        header,
        role: { id: row._id, isActive: !row.isActive,roleName:row.role },
      };

      const res = await editRoleService(payload);
      if (res.status === "success") {
        fetchData();
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const updateLoading = useCallback(async () => {
    setIsLoading(false);
  }, []);
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);

  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Admin Table
          </Typography>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to="/super-admin/dashboard"
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm"> Admin</span>
              </div>
            </div>
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <MaterialReactTable
            state={{ isLoading, pagination }}
            columns={columns}
            data={adminData || []}
            enableRowActions
            positionActionsColumn="last"
            onPaginationChange={setPagination}
            autoResetPageIndex={false}
            renderRowActions={({ row }) => (
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Tooltip title={"Change Status"}>
                  <IconButton
                    color="primary"
                    aria-label={"Change Status"}
                    component="span"
                    onClick={() => changeStatus(row.original)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 text-addButton"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              </div>
            )}
          />
        </Paper>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default NewReq;
