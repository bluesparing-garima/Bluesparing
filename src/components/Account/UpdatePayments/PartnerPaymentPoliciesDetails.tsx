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
    useState<boolean>(false); // State to manage textbox visibility
  const [isLoading, setIsLoading] = useState(false);
  const [selectAllUnPaid, setSelectAllUnPaid] = useState<boolean>(false); // State to manage selecting all as Paid

  useEffect(() => {
    if (policies && partnerAmount != null) {
      setOldPolicies(policies);
    }
  }, [policies, partnerAmount]);

  const columns = useMemo<MRT_ColumnDef<IViewPolicy>[]>(
    () => [
      {
        accessorKey: "payOutCommission", //normal accessorKey
        header: "PayOut ",
        size: 100,
      },
      {
        accessorKey: "payOutAmount", //normal accessorKey
        header: "Paid Amount",
        size: 100,
      },
      {
        accessorKey: "payOutBalance", //normal accessorKey
        header: "balance",
        size: 100,
      },
      {
        accessorKey: "fullName", //normal accessorKey
        header: "Full Name",
        size: 100,
      },
      {
        accessorKey: "policyNumber", //normal accessorKey
        header: "Policy Number",
        size: 100,
      },
      {
        accessorKey: "od", //normal accessorKey
        header: "OD",
        size: 100,
      },
      {
        accessorKey: "tp", //normal accessorKey
        header: "TP",
        size: 100,
      },
      {
        accessorKey: "netPremium", //normal accessorKey
        header: "Net Premium",
        size: 100,
      },
      {
        accessorKey: "finalPremium", //normal accessorKey
        header: "Final Premium",
        size: 100,
      },
      {
        accessorKey: "payOutODPercentage", //normal accessorKey
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
        accessorKey: "issueDate", //normal accessorKey
        header: "Issue Date",
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
        accessorKey: "category", //normal accessorKey
        header: "Category",
        size: 100,
      },
      {
        accessorKey: "subCategory", //normal accessorKey
        header: "sub Category",
        size: 100,
      },
      {
        accessorKey: "companyName", //normal accessorKey
        header: "Company Name",
        size: 100,
      },
      {
        accessorKey: "vehicleNumber", //normal accessorKey
        header: "Vehicle Number",
        size: 100,
      },
      {
        accessorKey: "partnerName", //normal accessorKey
        header: "Partner Name",
        size: 100,
      },
      {
        accessorKey: "make", //normal accessorKey
        header: "Make",
        size: 100,
      },
      {
        accessorKey: "model", //normal accessorKey
        header: "Model",
        size: 100,
      },
      {
        accessorKey: "fuelType", //normal accessorKey
        header: "Fuel Type",
        size: 100,
      },
      {
        accessorKey: "rto", //normal accessorKey
        header: "RTO",
        size: 100,
      },
      {
        accessorKey: "cc", //normal accessorKey
        header: "cc",
        size: 100,
      },
      {
        accessorKey: "seatingCapacity", //normal accessorKey
        header: "Seating Capacity",
        size: 100,
      },
      {
        accessorKey: "ncb", //normal accessorKey
        header: "ncb",
        size: 100,
      },
      {
        accessorKey: "emailId", //normal accessorKey
        header: "Email",
        size: 100,
      },
      {
        accessorKey: "phoneNumber", //normal accessorKey
        header: "Phone Number",
        size: 100,
      },
      {
        accessorKey: "vehicleAge", //normal accessorKey
        header: "Vehicle Age",
        size: 100,
      },
      {
        accessorKey: "mfgYear", //normal accessorKey
        header: "MFG Year",
        size: 100,
      },
      {
        accessorKey: "tenure", //normal accessorKey
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
      return total + (p.payOutCommission ?? 0); // Use nullish coalescing operator to handle undefined or null payOutAmount
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
        // setDebitAmount(partnerAmount);
        // setFinalBalance(Balance);
      } else {
        DebitAmount = calculateTotalPolicyPaidAmount();
        let Balance = Math.abs(partnerBalance) + DebitAmount;
        finalBalance = Balance;

        // setDebitAmount(payOutCommission);
        // setFinalBalance(Balance);
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
        console.log(chunks);
        const promises = chunks.map((ele) => {
          let policyData = ele;
          return updateFilterPaymentsService({
            header,
            policyData,
          });
        });
        try {
          const accountResponse = await Promise.all(promises);
          console.log("accountResponse", accountResponse);
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

  // Function to find a policy by policyNumber
  const findPolicyByNumber = (policyNumber: string) => {
    return oldPolicies.find((p) => p.policyNumber === policyNumber);
  };

  const handleStatusChange = (policy: IViewPolicy, newStatus: string) => {
    // Handle status change to "UnPaid"
    let newUpdatedPolicy: PoliciesProps = {};
    if (newStatus === "UnPaid") {
      // Find the policy in oldPolicies array by policyNumber
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
        // Add the new policy to the existing array
        return [...prevPolicies, newUpdatedPolicy];
      });

      // Trigger re-render by updating oldPolicies state
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
          //state={{ isLoading }}
          columns={columns}
          data={oldPolicies}
          enableRowActions
          renderRowActions={({ row }) => (
            <div>
              {/* Display error message if it exists */}
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
              {/* Status dropdown */}
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
