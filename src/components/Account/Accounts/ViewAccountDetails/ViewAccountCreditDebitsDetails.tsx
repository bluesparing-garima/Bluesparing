import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { creditDebitsAddPath } from "../../../../sitemap";
import { DAYJS_DISPLAY_FORMAT, header } from "../../../../context/constant";
import {
  ICreditDebits,
  ICreditDebitsVM,
} from "../../CreditDebit/ICreditDebits";
import getAccountManageByAccountIdService from "../../../../api/CreditDebit/GetAccountManageByAccountId/getAccountManageByAccountIdService";
import toast, { Toaster } from "react-hot-toast";
import AddCircleIcon from "@mui/icons-material/AddRounded";
import RemoveCircleIcon from "@mui/icons-material/RemoveRounded";
const ViewAccountCreditDebitsDetails = () => {
  const { accountId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [creditDebits, setCreditDebits] = useState<ICreditDebits[]>([]);
  const [filteredCreditDebits, setFilteredCreditDebits] = useState<
    ICreditDebits[]
  >([]);
  const navigate = useNavigate();
  const GetCreditDebits = useCallback(() => {
    setIsLoading(true);
    getAccountManageByAccountIdService({ header, accountId: accountId! })
      .then((creditDebitsDetails) => {
        setCreditDebits(creditDebitsDetails.data);
        setFilteredCreditDebits(creditDebitsDetails.data);
        setIsLoading(false);
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
        setIsLoading(false);
      });
  }, [accountId]);
  useEffect(() => {
    GetCreditDebits();
  }, [GetCreditDebits]);
  const columns = useMemo<MRT_ColumnDef<ICreditDebits>[]>(
    () => [
      {
        accessorKey: "transactionCode",
        header: "Transactions Code",
        size: 200,
      },
      {
        accessorKey: "accountType",
        header: "Account Type",
        size: 200,
      },
      {
        accessorKey: "type",
        header: "Credit/Debit",
        size: 200,
      },
      {
        accessorKey: "combinedName",
        header: "Partner /Broker/ Employee /other",
        size: 200,
      },
      {
        header: "Amount",
        accessorKey: "amount",
        size: 200,
        Cell: ({ row }) => {
          const { type, amount } = row.original;
          return (
            <div>
              {type === "credit" ? (
                <>
                  <AddCircleIcon color="success" style={{ marginRight: 5 }} />
                  {amount}
                </>
              ) : (
                <>
                  <RemoveCircleIcon style={{ color: "red", marginRight: 5 }} />
                  {amount}
                </>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "accountBalance",
        header: "Account Balance",
        size: 100,
      },
      {
        header: "Payment Start Date",
        accessorKey: "startDate",
        size: 50,
      },
      {
        header: "Payment End Date",
        accessorKey: "endDate",
        size: 50,
      },
      {
        header: "Payment Distributed Date",
        accessorKey: "distributedDate",
        size: 50,
      },
    ],
    []
  );
  const parsedData = useMemo<ICreditDebitsVM[]>(() => {
    return filteredCreditDebits.map((creditDebit: ICreditDebits) => {
      let combinedName = "";
      if (creditDebit.accountType === "PayIn" && creditDebit.brokerName) {
        combinedName = creditDebit.brokerName;
      } else if (
        creditDebit.accountType === "PayOut" &&
        creditDebit.partnerName
      ) {
        combinedName = creditDebit.partnerName;
      } else if (creditDebit.employeeName) {
        combinedName = creditDebit.employeeName;
      } else {
        combinedName = "Other";
      }
      return {
        id: creditDebit._id,
        accountType: creditDebit.accountType,
        type: creditDebit.type,
        accountId: creditDebit.accountId,
        accountCode: creditDebit.accountCode,
        transactionCode: creditDebit.transactionCode,
        combinedName,
        accountBalance: creditDebit.accountBalance || 0,
        amount: creditDebit.amount,
        startDate: dayjs(creditDebit.startDate).format(DAYJS_DISPLAY_FORMAT),
        endDate: dayjs(creditDebit.endDate).format(DAYJS_DISPLAY_FORMAT),
        distributedDate: dayjs(creditDebit.distributedDate).format(
          DAYJS_DISPLAY_FORMAT
        ),
        isActive: creditDebit.isActive,
        createdOn: dayjs(creditDebit.createdOn).format(DAYJS_DISPLAY_FORMAT),
        updatedOn: dayjs(creditDebit.updatedOn).format(DAYJS_DISPLAY_FORMAT),
      };
    });
  }, [filteredCreditDebits]);
  const handleClickCreditDebit = () => {
    setFilteredCreditDebits(creditDebits);
  };
  const handleClickDebit = () => {
    const debits = creditDebits.filter(
      (cb) => cb.type?.toLowerCase() === "debit"
    );
    setFilteredCreditDebits(debits);
  };
  const handleClickCredit = () => {
    const credits = creditDebits.filter(
      (cb) => cb.type?.toLowerCase() === "credit"
    );
    setFilteredCreditDebits(credits);
  };
  const handleAddCreditDebitClick = () => {
    navigate(creditDebitsAddPath());
  };
  return (
    <div className="bg-blue-200 md:p-7 p-2">
      <Paper elevation={3} style={{ padding: 30 }}>
       
        <Typography className="text-safekaroDarkOrange" variant="h5">
          Account Credit Debit Table of {creditDebits[0]?.accountCode}
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
              <span className="text-grey-600 text-sm">Transaction</span>
            </div>
            <Button
              type="button"
              className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
              onClick={handleAddCreditDebitClick}
            >
              Add Transaction
            </Button>
          </div>
         
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>
       
        <Grid container>
          <Button
            type="button"
            className="w-26 h-8 bg-safekaroDarkOrange text-white p-3 text-xs rounded-sm"
            onClick={handleClickCreditDebit}
          >
            All
          </Button>
          <Button
            type="button"
            className="w-26 h-8 ml-4 bg-addButton text-white p-3 text-xs rounded-sm"
            onClick={handleClickCredit}
          >
            Credit
          </Button>
          <Button
            type="button"
            className="w-26 h-8 ml-4 bg-addButton text-white p-3 text-xs rounded-sm"
            onClick={handleClickDebit}
          >
            Debit
          </Button>
        </Grid>
       
        <MaterialReactTable
          state={{ isLoading }}
          columns={columns}
          data={parsedData}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};
export default ViewAccountCreditDebitsDetails;
