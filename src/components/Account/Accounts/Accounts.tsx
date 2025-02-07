import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { accountsAddPath, accountCreditDebitViewPath } from "../../../sitemap";
import { IAccounts, IAccountsVM } from "../IAccounts";
import getAccountService from "../../../api/Account/GetAccount/getAccountService";
import { DAYJS_DISPLAY_FORMAT, header } from "../../../context/constant";
import toast, { Toaster } from "react-hot-toast";
const Accounts = () => {
  const [accounts, setAccounts] = useState<IAccounts[]>([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const handleAddAccountClick = () => {
    navigate(accountsAddPath());
  };
  const GetAccounts = useCallback(() => {
    getAccountService({ header })
      .then((accountsDetails) => {
        setAccounts(accountsDetails.data || []);
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
        console.error("Failed to fetch account details", error);
      });
  }, []);
  useEffect(() => {
    GetAccounts();
  }, [GetAccounts]);
  const columns = useMemo<MRT_ColumnDef<IAccounts>[]>(
    () => [
      {
        accessorKey: "bankName",
        header: "Bank Name",
        size: 200,
      },
      {
        accessorKey: "accountCode",
        header: "Account Detail",
        size: 200,
      },
      {
        accessorKey: "amount",
        header: "Amount",
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
    if (!accounts || accounts.length === 0) {
      return [];
    }
    return accounts.map(
      (account: IAccounts) =>
        ({
          id: account._id,
          bankName: account.bankName,
          accountCode: account.accountCode,
          accountNumber: account.accountNumber,
          accountHolderName: account.accountHolderName,
          amount: account.amount,
          IFSCCode: account.IFSCCode,
          isActive: account.isActive,
          createdOn: dayjs(account.createdOn).format(DAYJS_DISPLAY_FORMAT),
          updatedOn: dayjs(account.updatedOn).format(DAYJS_DISPLAY_FORMAT),
        } as IAccountsVM)
    );
  }, [accounts]);

  const handleClickViewCreditDebit = (account: IAccountsVM) => {
    navigate(accountCreditDebitViewPath(account.id!));
  };
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Accounts Table
          </Typography>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to="/dashboard"
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm"> Account</span>
              </div>
              <Button
                type="button"
                className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                onClick={handleAddAccountClick}
              >
                Add Account
              </Button>
            </div>
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <MaterialReactTable
            state={{ pagination }}
            columns={columns}
            data={parsedData}
            enableRowActions
            onPaginationChange={setPagination}
            positionActionsColumn="last"
            renderRowActions={({ row }) => (
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Tooltip title={"View Account Details"}>
                  <IconButton
                    color="primary"
                    aria-label={"View Account Details"}
                    component="span"
                    onClick={() => {
                      handleClickViewCreditDebit(row.original as IAccountsVM);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-safekaroDarkOrange"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
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
export default Accounts;
