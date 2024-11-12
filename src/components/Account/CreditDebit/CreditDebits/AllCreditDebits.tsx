import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { creditDebitEditPath } from "../../../../sitemap";
import { ICreditDebits, ICreditDebitsVM } from "../ICreditDebits";
import { DAYJS_DISPLAY_FORMAT, header } from "../../../../context/constant";
import getAccountManageService from "../../../../api/CreditDebit/GetAccountManage/getAccountManageService";
import toast, { Toaster } from "react-hot-toast";

const AllCreditDebits = () => {
  // State and hooks initialization
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [creditDebits, setCreditDebits] = useState<ICreditDebits[]>([]); // State for all credit debits
  const navigate = useNavigate(); // React Router's navigation hook

  // Function to fetch credit debits from API
  const GetCreditDebits = useCallback(() => {
    setIsLoading(true); // Set loading state to true
    getAccountManageService({ header }) // Call API to fetch credit debits
      .then((creditDebitsDetails) => {
        // On successful API call
        setCreditDebits(creditDebitsDetails.data); // Set all credit debits
        setIsLoading(false); // Set loading state to false
      })
      .catch(async (error) => {
        setIsLoading(false); // Set loading state to false
        const err = await error;
        toast.error(err.message);
      });
  }, []);

  // Call GetCreditDebits on component mount
  useEffect(() => {
    GetCreditDebits();
  }, [GetCreditDebits]);

  // Define columns for MaterialReactTable using useMemo for optimization
  const columns = useMemo<MRT_ColumnDef<ICreditDebits>[]>(
    () => [
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
        accessorKey: "accountCode",
        header: "Account",
        size: 200,
      },
      {
        accessorKey: "transactionCode",
        header: "Transaction Code",
        size: 200,
      },
      {
        accessorKey: "combinedName",
        header: "Partner /Broker/ Employee /other",
        size: 200,
        visible: (data: any) => data.accountType === "PayOut",
      },
      {
        accessorKey: "amount",
        header: "Amount",
        size: 200,
      },
      // {
      //   accessorKey: "accountBalance",
      //   header: "Account Balance",
      //   size: 50,
      // },
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

  // Transform creditDebits data for rendering using useMemo for optimization
  const parsedData = useMemo<ICreditDebitsVM[]>(() => {
    return creditDebits.map((creditDebit: ICreditDebits) => {
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
        combinedName = "other";
      }

      return {
        id: creditDebit._id,
        accountType: creditDebit.accountType,
        type: creditDebit.type,
        accountId: creditDebit.accountId,
        accountCode: creditDebit.accountCode,
        transactionCode: creditDebit.transactionCode,
        accountBalance: creditDebit.accountBalance,
        combinedName,
        partnerBalance: creditDebit.partnerBalance!,
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
  }, [creditDebits]);

  // JSX rendering
  return (
    <div className="bg-blue-200 p-7 mt-3">
      <MaterialReactTable
        state={{ isLoading }} // Loading state
        columns={columns} // Columns configuration
        data={parsedData} // Data to be displayed
      />
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AllCreditDebits;
