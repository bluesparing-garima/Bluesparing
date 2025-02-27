import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  DAYJS_DISPLAY_FORMAT,
  header,
  ROLE_STORAGE_KEY,
  SafeKaroUser,
} from "../../../../context/constant";
import {  IRoles, IRolesVM } from "../IRole";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { roleEditPath, rolesAddPath } from "../../../../sitemap";
import dayjs from "dayjs";
import getRoleService from "../../../../api/Role/GetRoles/getRolesService";
import toast, { Toaster } from "react-hot-toast";
import {
  getPaginationState,
  savePaginationState,
} from "../../../../utils/PaginationHandler";
const Roles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState<IRoles[]>([]);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const GetRoles = useCallback(
    () =>
      getRoleService({ header })
        .then((roleDetails) => {
          setRoles(roleDetails.data);
        })
        .catch(async (error: any) => {
          const err = await error;
          toast.error(err.message);
        }),
    []
  );
  useEffect(() => {
    GetRoles();
  }, [GetRoles]);
  useEffect(() => {
    const p = getPaginationState(ROLE_STORAGE_KEY);
    setPagination(p);
  }, []);
  const navigate = useNavigate();
  const handleAddRoleClick = () => {
    savePaginationState(pagination, ROLE_STORAGE_KEY);
    navigate(rolesAddPath());
  };
  const forcedRenderCount = 0;
  const columns = useMemo<MRT_ColumnDef<IRoles>[]>(
    () => [
      {
        accessorKey: "roleName",
        header: "Role Name",
        size: 200,
      },
      {
        header: "Created On",
        accessorKey: "createdOn",
        size: 50,
      },
    ],
    []
  );
  const parsedData = useMemo(() => {
    const filteredRoles =
      UserData.role.toLowerCase() === "hr"
        ? roles.filter(
            (role: IRoles) => role.roleName?.toLowerCase() !== "partner"
          )
        : roles;
    return filteredRoles.map(
      (role: IRoles) =>
        ({
          id: role._id,
          roleName: role.roleName,
          isActive: role.isActive,
          createdOn: dayjs(role.createdOn).format(DAYJS_DISPLAY_FORMAT),
          updatedOn: dayjs(role.updatedOn).format(DAYJS_DISPLAY_FORMAT),
          forceUpdate: forcedRenderCount,
        } as IRolesVM)
    );
     // eslint-disable-next-line
  }, [roles, forcedRenderCount]);
  const updateLoading = useCallback(async () => {
    setIsLoading(false);
  }, []);
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);
  const handleClickEditRole = (role: IRolesVM) => {
    savePaginationState(pagination, ROLE_STORAGE_KEY);
    navigate(roleEditPath(role.id!));
  };
  const generateDashBoardLink = () => {
    const role = UserData.role.toLowerCase();
    switch (role) {
      case "hr":
        return "/hr/dashboard";
      case "booking":
        return "/booking-dashboard";
      case "account":
        return "/accountdashboard";
      case "operation":
        return "/operationdashboard";
      case "rm":
        return "/rm/dashboard";
      default:
        return "/hr/dashboard";
    }
  };
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Role Table
          </Typography>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to={generateDashBoardLink()}
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm"> Role</span>
              </div>
              {/* <Button
                type="button"
                className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                onClick={handleAddRoleClick}
              >
                Add Role
              </Button> */}
            </div>
           
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <MaterialReactTable
            state={{ isLoading, pagination }}
            columns={columns}
            data={parsedData}
            // enableRowActions
            onPaginationChange={setPagination}
            autoResetPageIndex={false}
            paginateExpandedRows={false}
            // positionActionsColumn="last"
            // renderRowActions={({ row }) => (
            //   <div style={{ display: "flex", flexWrap: "nowrap" }}>
            //     <Tooltip title={"Edit Role"}>
            //       <IconButton
            //         color="primary"
            //         aria-label={"Edit Role"}
            //         component="span"
            //         onClick={() => {
            //           handleClickEditRole(row.original as IRolesVM);
            //         }}
            //       >
            //         <svg
            //           xmlns="http://www.w3.org/2000/svg"
            //           fill="none"
            //           viewBox="0 0 24 24"
            //           strokeWidth="1.5"
            //           stroke="currentColor"
            //           className="size-5 text-addButton"
            //         >
            //           <path
            //             strokeLinecap="round"
            //             strokeLinejoin="round"
            //             d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            //           />
            //         </svg>
            //       </IconButton>
            //     </Tooltip>
            //   </div>
            // )}
          />
        </Paper>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};
export default Roles;
