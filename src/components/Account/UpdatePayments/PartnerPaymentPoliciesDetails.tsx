import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { IViewPolicy } from "../../Policy/IPolicy";
import { partnerDebitsPath } from "../../../sitemap";
import { useNavigate } from "react-router-dom";
import { header } from "../../../context/constant";
import { FORM_ERROR } from "final-form";
import updateFilterPaymentsService from "../../../api/UpdatePayment/updateFilterPayments/updateFilterPaymentsService";
import { AddEditCreditDebitProps } from "../../../api/CreditDebit/getCreditDebitTypes";
import toast, { Toaster } from "react-hot-toast";
import addCreditDebitService from "../../../api/CreditDebit/AddCreditDebit/addCreditDebitService";
interface PoliciesDetailsProps {
  policies: IViewPolicy[];
  partnerAmount: number;
  partnerBalance: number;
  remarks: string;
  partnerId: string;
  partnerName: string;
  distributedDate: string;
  endDate: string;
  startDate: string;
}
interface PoliciesProps {
  policyNumber?: string;
  payOutCommission?: number;
  payOutAmount?: number;
  payOutPaymentStatus?: string;
  payOutBalance?: number;
  errorMessage?: string;
}
function PartnerPaymentPoliciesDetails({
  policies,
  partnerAmount,
  partnerBalance,
  remarks,
  partnerId,
  partnerName,
  distributedDate,
  endDate,
  startDate,
}: PoliciesDetailsProps) {
  const navigate = useNavigate();
  const [oldPolicies, setOldPolicies] = useState<IViewPolicy[]>([]);
  const [updatePolicy, setUpdatePolicy] = useState<PoliciesProps[]>([]);
  const [paymentTextboxVisibility, setPaymentTextboxVisibility] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectAllUnPaid, setSelectAllUnPaid] = useState<boolean>(false);
  useEffect(() => {
    if (policies && partnerAmount != null) {
      setOldPolicies(policies);
    }
  }, [policies, partnerAmount]);
  const columns = useMemo<MRT_ColumnDef<IViewPolicy>[]>(
    () => [
      {
        accessorKey: "payOutCommission",
        header: "PayOut ",
        size: 100,
      },
      {
        accessorKey: "payOutAmount",
        header: "Paid Amount",
        size: 100,
      },
      {
        accessorKey: "payOutBalance",
        header: "balance",
        size: 100,
      },
      {
        accessorKey: "fullName",
        header: "Full Name",
        size: 100,
      },
      {
        accessorKey: "policyNumber",
        header: "Policy Number",
        size: 100,
      },
      {
        accessorKey: "od",
        header: "OD",
        size: 100,
      },
      {
        accessorKey: "tp",
        header: "TP",
        size: 100,
      },
      {
        accessorKey: "netPremium",
        header: "Net Premium",
        size: 100,
      },
      {
        accessorKey: "finalPremium",
        header: "Final Premium",
        size: 100,
      },
      {
        accessorKey: "payOutODPercentage",
        header: "PayOut OD%",
        size: 100,
        Cell: ({ cell }) => {
          const od = cell.getValue<number>();
          return <span>{od}%</span>;
        },
      },
      {
        accessorKey: "payOutTPPercentage",
        header: "PayOut TP%",
        size: 100,
        Cell: ({ cell }) => {
          const tp = cell.getValue<number>();
          return <span>{tp}%</span>;
        },
      },
      {
        accessorKey: "issueDate",
        header: "Issue Date",
        size: 100,
      },
      {
        accessorKey: "policyType",
        header: "Policy Type",
        size: 100,
      },
      {
        accessorKey: "caseType",
        header: "Case Type",
        size: 100,
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 100,
      },
      {
        accessorKey: "subCategory",
        header: "sub Category",
        size: 100,
      },
      {
        accessorKey: "companyName",
        header: "Company Name",
        size: 100,
      },
      {
        accessorKey: "vehicleNumber",
        header: "Vehicle Number",
        size: 100,
      },
      {
        accessorKey: "partnerName",
        header: "Partner Name",
        size: 100,
      },
      {
        accessorKey: "make",
        header: "Make",
        size: 100,
      },
      {
        accessorKey: "model",
        header: "Model",
        size: 100,
      },
      {
        accessorKey: "fuelType",
        header: "Fuel Type",
        size: 100,
      },
      {
        accessorKey: "rto",
        header: "RTO",
        size: 100,
      },
      {
        accessorKey: "cc",
        header: "cc",
        size: 100,
      },
      {
        accessorKey: "seatingCapacity",
        header: "Seating Capacity",
        size: 100,
      },
      {
        accessorKey: "ncb",
        header: "ncb",
        size: 100,
      },
      {
        accessorKey: "emailId",
        header: "Email",
        size: 100,
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        size: 100,
      },
      {
        accessorKey: "vehicleAge",
        header: "Vehicle Age",
        size: 100,
      },
      {
        accessorKey: "mfgYear",
        header: "MFG Year",
        size: 100,
      },
      {
        accessorKey: "tenure",
        header: "Tenure",
        size: 100,
      },
      {
        header: "Created On",
        accessorKey: "createdOn",
        size: 50,
      },
    ],
    []
  );
  const createCreditDebitForm = (
    debitAmount: number,
    finalBalance: number
  ): AddEditCreditDebitProps => {
    return {
      header: header,
      creditDebit: {
        accountId: "",
        partnerId: partnerId,
        accountType: "PayOut",
        type: "debit",
        accountCode: "",
        debit: debitAmount,
        remarks: remarks,
        brokerName: "",
        brokerId: "",
        partnerName: partnerName,
        startDate: startDate,
        endDate: endDate,
        policyNumber: "",
        employeeName: "",
        employeeId: "",
        distributedDate: distributedDate,
        isActive: false,
        updatedOn: null,
        createdOn: null,
        createdBy: "",
        updatedBy: "",
        partnerBalance: -finalBalance,
      },
      creditDebitId: "",
    };
  };
  function addKeyValueToObjects<T extends Record<string, any>>(
    policyData: T[],
    key: string,
    value: string
  ): (T & { [key: string]: string })[] {
    const data = policyData.filter((ele: T) => ele.payOutCommission !== 0);
    return data.map((obj: T) => ({
      ...obj,
      [key]: value,
    }));
  }
  const calculateTotalPolicyPaidAmount = () => {
    return updatePolicy.reduce((total, p) => {
      return total + (p.payOutCommission ?? 0);
    }, 0);
  };
  const splitDataIntoChunks = (data: any) => {
    const chunks = [];
    if (data.length > 0) {
      for (let i = 0; i < data?.length; i += 60) {
        chunks.push(data.slice(i, i + 60));
      }
    }
    return chunks;
  };
  const handleClickSubmit = async () => {
    let policyData: any[] = [];
    setIsLoading(true);
    try {
      let DebitAmount = 0;
      let finalBalance = 0;
      if (selectAllUnPaid) {
        const Balance = partnerAmount + Math.abs(partnerBalance);
        DebitAmount = partnerAmount;
        finalBalance = Balance;
      } else {
        DebitAmount = calculateTotalPolicyPaidAmount();
        let Balance = Math.abs(partnerBalance) + DebitAmount;
        finalBalance = Balance;
      }
      const postData = createCreditDebitForm(DebitAmount, finalBalance);
      const res = await toast.promise(addCreditDebitService(postData), {
        loading: "Adding to partner account...",
        success: "Balance updated in partner account!",
        error: "Error while adding balance to partner account.",
      });
      if (res.status === "success") {
        policyData = updatePolicy;
        policyData = addKeyValueToObjects(
          policyData,
          "distributedDate",
          distributedDate
        );
        policyData = addKeyValueToObjects(
          policyData,
          "transactionCode",
          res.data.transactionCode
        );
        const chunks = splitDataIntoChunks(policyData);
        const promises = chunks.map((ele) => {
          let policyData = ele;
          return updateFilterPaymentsService({
            header,
            policyData,
          });
        });
        try {
          const accountResponse = await Promise.all(promises);
          const s = accountResponse.length;
          if (accountResponse[s - 1].status === "success") {
            navigate(partnerDebitsPath());
          }
        } catch (error: any) {
          const err = await error;
          toast.error(err.message);
        }
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
      return { [FORM_ERROR]: "error" };
    } finally {
      setIsLoading(false);
    }
  };
  const findPolicyByNumber = (policyNumber: string) => {
    return oldPolicies.find((p) => p.policyNumber === policyNumber);
  };
  const handleStatusChange = (policy: IViewPolicy, newStatus: string) => {
    let newUpdatedPolicy: PoliciesProps = {};
    if (newStatus === "UnPaid") {
      const newPolicy = findPolicyByNumber(policy.policyNumber);
      if (newPolicy) {
        setPaymentTextboxVisibility(true);
        newUpdatedPolicy = {
          policyNumber: policy.policyNumber,
          payOutPaymentStatus: newStatus,
          payOutCommission: policy.payOutCommission,
          payOutAmount: 0,
          payOutBalance: 0,
        };
        newPolicy.payOutPaymentStatus = newStatus;
        newPolicy.errorMessage = "";
        newPolicy.payOutAmount = 0;
        newPolicy.payOutBalance = 0;
      }
      setUpdatePolicy((prevPolicies) => {
        return [...prevPolicies, newUpdatedPolicy];
      });
      setOldPolicies([...oldPolicies]);
    } else {
      setPaymentTextboxVisibility(false);
    }
  };
  const handleSelectAllUnPaidChange = async (event: any) => {
    const newValue = event.target.value;
    setSelectAllUnPaid(newValue);
    let policyStatus = "";
    let payOutAmount = 0;
    let balance = 0;
    const updatedPolicies = oldPolicies.map((policy) => {
      policyStatus = "UnPaid";
      payOutAmount = 0;
      balance = 0;
      return {
        ...policy,
        payOutPaymentStatus: policyStatus,
        payOutAmount: payOutAmount,
        payOutBalance: balance,
      };
    });
    setOldPolicies([...updatedPolicies]);
    setUpdatePolicy(updatedPolicies);
    setPaymentTextboxVisibility(true);
  };
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <div className="bg-blue-200 p-7 mt-4">
      <Paper elevation={3} style={{ padding: 30 }}>
        <Typography className="text-safekaroDarkOrange" variant="h5">
          Filter Motor Policies
        </Typography>
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12} mt={2}>
            <Typography
              variant="subtitle1"
              gutterBottom
              display="inline"
              align="center"
            >
              Total Polices Paid Amount:{" "}
              <span className="text-safekaroDarkOrange">{partnerAmount}</span>
            </Typography>
          </Grid>
        </Grid>
        <Grid container mt={2} mb={2}>
          <Grid item lg={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Select All UnPaid</InputLabel>
              <Select
                value={selectAllUnPaid}
                onChange={(e) => handleSelectAllUnPaidChange(e)}
              >
                <MenuItem value="UnPaid">UnPaid</MenuItem>
              </Select>
              {partnerAmount === 0 && (
                <p style={{ color: "red" }}>{"Insufficient Balance"}</p>
              )}
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            {paymentTextboxVisibility && (
              <Button
                type="button"
                variant="contained"
                onClick={handleClickSubmit}
              >
                Update Payment
              </Button>
            )}
          </Grid>
        </Grid>
        <MaterialReactTable
          columns={columns}
          data={oldPolicies}
          enableRowActions
          renderRowActions={({ row }) => (
            <div>
             
              {row.original.errorMessage && (
                <Grid container mb={2}>
                  <Grid item lg={12}>
                    <span
                      style={{ color: "red", marginLeft: 10, width: "100%" }}
                    >
                      {row.original.errorMessage}
                    </span>
                  </Grid>
                </Grid>
              )}
             
              {row.original.payOutCommission !== 0 && (
                <Grid container mt={2}>
                  <Grid item lg={12}>
                    <FormControl
                      fullWidth
                      size="small"
                      style={{ marginLeft: 10 }}
                    >
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={row.original.payOutPaymentStatus}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          handleStatusChange(row.original, newStatus);
                        }}
                      >
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="UnPaid">UnPaid</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
            </div>
          )}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}
export default PartnerPaymentPoliciesDetails;
