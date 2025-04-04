import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import dayjs from "dayjs";
import { ICreditDebits, ICreditDebitsVM } from "../ICreditDebits";
import { DAYJS_DISPLAY_FORMAT, header } from "../../../../context/constant";
import getAccountManageService from "../../../../api/CreditDebit/GetAccountManage/getAccountManageService";
import toast, { Toaster } from "react-hot-toast";
const AllCreditDebits = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [creditDebits, setCreditDebits] = useState<ICreditDebits[]>([]);
  const GetCreditDebits = useCallback(() => {
    setIsLoading(true);
    getAccountManageService({ header })
      .then((creditDebitsDetails) => {
        setCreditDebits(creditDebitsDetails.data);
        setIsLoading(false);
      })
      .catch(async (error) => {
        setIsLoading(false);
        const err = await error;
        toast.error(err.message);
      });
  }, []);
  useEffect(() => {
    GetCreditDebits();
  }, [GetCreditDebits]);
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
      {
        header: "Payment Remarks",
        accessorKey: "remarks",
        size: 50,
      },
    ],
    []
  );

  function getCombinedName(creditDebit: ICreditDebits) {
    let combinedName = "";

    switch (creditDebit.accountType?.toLowerCase()) {
      case "payin":
        if (creditDebit.brokerName) {
          combinedName = creditDebit.brokerName;
        }
        break;

      case "payout":
        if (creditDebit.partnerName) {
          combinedName = creditDebit.partnerName;
        }
        break;

      case "tds":
        if (creditDebit.partnerName) {
          combinedName = creditDebit.partnerName;
        } else {
          combinedName = creditDebit.brokerName || "";
        }

        break;

      default:
        if (creditDebit.employeeName) {
          combinedName = creditDebit.employeeName;
        } else {
          combinedName = "other";
        }
        break;
    }

    return combinedName;
  }
  const parsedData = useMemo<ICreditDebitsVM[]>(() => {
    return creditDebits.map((creditDebit: ICreditDebits) => {
      let combinedName = getCombinedName(creditDebit);

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
        amount: creditDebit.amount || creditDebit.tdsAmount,
        startDate: dayjs(creditDebit.startDate).format(DAYJS_DISPLAY_FORMAT),
        endDate: dayjs(creditDebit.endDate).format(DAYJS_DISPLAY_FORMAT),
        distributedDate: dayjs(creditDebit.distributedDate).format(
          DAYJS_DISPLAY_FORMAT
        ),
        isActive: creditDebit.isActive,
        remarks: creditDebit.remarks,
        createdOn: dayjs(creditDebit.createdOn).format(DAYJS_DISPLAY_FORMAT),
        updatedOn: dayjs(creditDebit.updatedOn).format(DAYJS_DISPLAY_FORMAT),
      };
    });
  }, [creditDebits]);
  return (
    <div className="p-7 mt-3">
      <MaterialReactTable
        state={{ isLoading }}
        columns={columns}
        data={parsedData}
      />
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};
export default AllCreditDebits;
