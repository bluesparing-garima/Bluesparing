import { useEffect, useMemo, useState } from "react";
import { SafeKaroUser } from "../../context/constant";
import { INotification } from "./INotification";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { IconButton, Paper, Tooltip, Typography } from "@mui/material";
import GetNotificationByRoleService from "../../api/Notification/GetNotificationByRole/GetNotificationByRoleService";
import { header } from "../../context/constant";

import { Link } from "react-router-dom";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import dayjs from "dayjs";
import EditNotificationViewService from "../../api/Notification/EditNotificationView/EditNotificationViewService";
import toast from "react-hot-toast";
const Notification = () => {
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [isLoading, setIsLoading] = useState(false);
  const [notificationData, setNotificationData] = useState<INotification[]>();

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const accessNotification = () => {
    const role = UserData.role.toLowerCase();
    switch (role) {
      case "booking":
        return ["operation"];
      case "operation":
        return ["booking","partner"];
      case "partner":
        return ["booking", "operation"];
      default:
        return ["booking"];
    }
  };
  const fetchNotification = async () => {
    setIsLoading(true);
    try {
      const res = await GetNotificationByRoleService({
        header,
        role: accessNotification(),
      });
      if (res.status === "success") {
        const filterData = res.data.filter(
          (ele: INotification) => ele.notificationFor === UserData.id
        );
        setNotificationData(filterData);
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotification();
    // eslint-disable-next-line
  }, []);
  const generateDashBoarding = () => {
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
      case "admin":
        return "/dashboard";
      default:
        return "/hr/dashboard";
    }
  };

  const columns = useMemo<MRT_ColumnDef<INotification>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 100,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 100,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 100,
      },
      {
        accessorKey: "isActive",
        header: "Status",
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
        accessorKey: "createdBy",
        header: "Created By",
        size: 150,
      },
      {
        accessorKey: "createdOn",
        header: "Date",
        size: 200,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue() as string;
          return dayjs(dateValue).format("DD/MM/YYYY");
        },
      },
    ],
    []
  );

  const handleEditView = async (notificationId: string) => {
    try {
      const res = await EditNotificationViewService({ header, notificationId });
      if (res.status === "success") {
        const id = res.data._id;
        const result = notificationData?.map((ele: INotification) => {
          if (ele._id === id) {
            return res.data;
          }
          return ele;
        });
        setNotificationData(result);
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Notification
          </Typography>

          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to={generateDashBoarding()}
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm"> Notification</span>
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
            data={notificationData || []}
            enableRowActions
            enablePagination
            onPaginationChange={setPagination}
            autoResetPageIndex={false}
            positionActionsColumn="last"
            renderRowActions={({ row }) => (
              <Tooltip title="Change Visibility" arrow>
                <IconButton
                  color="primary"
                  aria-label="Change Status"
                  component="span"
                  onClick={() => {
                    if (row.original.isView === false) {
                      const notificationId = row.original._id;
                      if (notificationId) {
                        handleEditView(notificationId);
                      }
                    }
                  }}
                >
                  {row.original.isView ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </IconButton>
              </Tooltip>
            )}
          />
        </Paper>
      </div>
    </>
  );
};

export default Notification;
