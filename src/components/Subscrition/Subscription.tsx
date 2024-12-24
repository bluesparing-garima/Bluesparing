import { FC, useEffect, useMemo, useState } from "react";
import { ITransaction } from "./ITransction";
import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import GetAdminSubscriptionService from "../../api/Subscriptions/GetAdminSubscription/GetAdminSubscriptionService";
import {
  DAYJS_DISPLAY_FORMAT,
  header,
  SafeKaroUser,
} from "../../context/constant";
import dayjs from "dayjs";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const Subscription = () => {
  const [subscriptionData, setSubscriptionData] = useState<ITransaction[]>();
  const storedUser = localStorage.getItem("user");
  const userData: SafeKaroUser | null = storedUser
    ? JSON.parse(storedUser)
    : null;
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useMemo<MRT_ColumnDef<ITransaction>[]>(
    () => [
      { accessorKey: "fullName",
        header: "Full Name",
        size: 200,},
      { accessorKey: "email",
        header: "Email",
        size: 200,},
      { accessorKey: "phoneNumber",
        header: "Phone Number",
        size: 200,},
      { accessorKey: "users",
        header: "User Limit",
        size: 200,},
      { accessorKey: "policyCount",
        header: "Policy Limit",
        size: 200,},
      { accessorKey: "monthlyAmount",
        header: "Monthly Amount",
        size: 200,},
      { accessorKey: "annualAmount",
        header: "Annual Amount",
        size: 200,},
      {
        accessorKey: "planType",
        header: "Plan Name",
        size: 200,
      },
      {
        accessorKey: "transactionId",
        header: "Transaction Id",
        size: 200,
      },
      {
        accessorKey: "planStartDate",
        header: "Plan Start Date",
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return <span>{dayjs(value).format(DAYJS_DISPLAY_FORMAT)}</span>;
        },
      },
      {
        accessorKey: "planEndDate",
        header: "Plan End Date",
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return <span>{dayjs(value).format(DAYJS_DISPLAY_FORMAT)}</span>;
        },
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
        header: " Created By",
        accessorKey: "createdBy",
        size: 50,
      },
    ],
    []
  );
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await GetAdminSubscriptionService({
        header,
        id: userData?.profileId || "",
      });

      if (res.status === "success") {
        setSubscriptionData(res.data);
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  console.log(subscriptionData);
  return (
    <div className="bg-blue-200 md:p-7 p-2">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography
          variant="h5"
          className="text-safekaroDarkOrange"
          gutterBottom
          display="inline"
        >
          Subscription
        </Typography>
        <Typography variant="h5" mb={2}>
          <Link to="/dashboard" className="text-addButton font-bold text-sm">
            Dashboard {" / "}
          </Link>
          <span className="text-grey-600 text-sm">{"View Subscription"}</span>
          <hr
            className="mt-4 mb-2"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>
        <MaterialReactTable
          state={{ isLoading, pagination }}
          columns={columns}
          data={subscriptionData || []}
          onPaginationChange={setPagination}
          autoResetPageIndex={false}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default Subscription;
