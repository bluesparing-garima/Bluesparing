/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import MaterialReactTable from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { IViewPolicy } from "../../Policy/IPolicy";
import { motorPolicyEditCommissionPath } from "../../../sitemap";
import { useNavigate } from "react-router-dom";
import { header } from "../../../context/constant";
import { FORM_ERROR } from "final-form";
import updateFilterPaymentsService from "../../../api/UpdatePayment/updateFilterPayments/updateFilterPaymentsService";
import toast, { Toaster } from "react-hot-toast";
import addCreditDebitService from "../../../api/CreditDebit/AddCreditDebit/addCreditDebitService";
import { AddEditCreditDebitProps } from "../../../api/CreditDebit/getCreditDebitTypes";
import BrokerCreditColumns from "./ManageBrokerPayment/BrokerCreditColumns";

interface PoliciesDetailsProps {
  policies: IViewPolicy[];
  brokerBalance?: number;
  remarks?: string;
  brokerId?: string;
  brokerName?: string;
  distributedDate?: string;
  endDate?: string;
  startDate?: string;
  brokerAmount?: number;
}

interface PoliciesProps {
  policyNumber?: string;
  payInCommission?: number;
  payInAmount?: number;
  payInPaymentStatus?: string;
  payInBalance?: number;
  errorMessage?: string;
}

function BrokerPaymentPoliciesDetails({
  policies,
  brokerBalance = 0,
  remarks = "",
  brokerId = "",
  distributedDate = "",
  brokerName = "",
  endDate = "",
  startDate = "",
  brokerAmount = 0,
}: PoliciesDetailsProps) {
  const navigate = useNavigate();
  const [oldPolicies, setOldPolicies] = useState<IViewPolicy[]>([]);
  const [updatePolicy, setUpdatePolicy] = useState<PoliciesProps[]>([]);
  const [paymentTextboxVisibility, setPaymentTextboxVisibility] =
    useState<boolean>(false);
  const [selectAllUnPaid, setSelectAllUnPaid] = useState<boolean>(false);
  const [isVisibleTable, setIsVisibleTable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (policies && brokerAmount != null) {
      setOldPolicies(policies);
    }
  }, [policies, brokerAmount]);

  const createCreditDebitForm = (
    creditAmount: number,
    finalBalance: number
  ): AddEditCreditDebitProps => {
    return {
      header: header,
      creditDebit: {
        accountId: "",
        partnerId: "",
        accountType: "PayIn",
        type: "credit",
        accountCode: "",
        credit: creditAmount,
        remarks: remarks,
        brokerName: "",
        brokerId: brokerId,
        partnerName: "",
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
        brokerBalance: finalBalance,
      },
      creditDebitId: "",
    };
  };

  function addKeyValueToObjects<T extends Record<string, any>>(
    policyData: T[],
    key: string,
    value: string
  ): (T & { [key: string]: string })[] {
    const data = policyData.filter((ele: T) => ele.payInCommission !== 0);
    return data.map((obj: T) => ({
      ...obj,
      [key]: value,
    }));
  }
  const calculateTotalPolicyPaidAmount = () => {
    return updatePolicy.reduce((total, p) => {
      return total + (p.payInCommission ?? 0);
    }, 0);
  };
  const findPolicyByNumber = (policyNumber: string) => {
    return oldPolicies.find((p) => p.policyNumber === policyNumber);
  };

  const handleStatusChange = (policy: IViewPolicy, newStatus: string) => {
    // Handle status change to "UnPaid"
    let newUpdatedPolicy: PoliciesProps = {};
    if (newStatus === "UnPaid") {
      const newPolicy = findPolicyByNumber(policy.policyNumber);
      if (newPolicy) {
        setPaymentTextboxVisibility(true);
        newUpdatedPolicy = {
          policyNumber: policy.policyNumber,
          payInPaymentStatus: newStatus,
          payInCommission: policy.payInCommission,
          payInAmount: 0,
          payInBalance: 0,
        };

        newPolicy.payInPaymentStatus = newStatus;
        newPolicy.errorMessage = "";
        newPolicy.payInAmount = 0;
        newPolicy.payInBalance = 0;
      }

      setUpdatePolicy((prevPolicies) => {
        return [...prevPolicies, newUpdatedPolicy];
      });
      setOldPolicies([...oldPolicies]);
    } else {
      setPaymentTextboxVisibility(false);
    }
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

  const handleSelectAllUnPaidChange = async (event: any) => {
    const newValue = event.target.value;
    setSelectAllUnPaid(newValue);
    let policyStatus = "";
    let payInAmount = 0;
    let balance = 0;

    const updatedPolicies = oldPolicies.map((policy) => {
      policyStatus = "UnPaid";
      payInAmount = 0;
      balance = 0;

      return {
        ...policy,
        payInPaymentStatus: policyStatus,
        payInAmount: payInAmount,
        payInBalance: balance,
      };
    });
    setOldPolicies([...updatedPolicies]);
    setUpdatePolicy(updatedPolicies);
    setPaymentTextboxVisibility(true);
  };

  const handleClickSubmit = async () => {
    let policyData: any[] = [];
    setIsLoading(true)
    try {
      let CreditAmount = 0;
      let finalBalance = 0;
      if (selectAllUnPaid) {
        const Balance = brokerAmount + Math.abs(brokerBalance);
        CreditAmount = brokerAmount;
        finalBalance = Balance;
      } else {
        CreditAmount = calculateTotalPolicyPaidAmount();
        let Balance = Math.abs(brokerBalance) + CreditAmount;
        finalBalance = Balance;
      }

      const postData = createCreditDebitForm(CreditAmount, finalBalance);
      const res = await toast.promise(addCreditDebitService(postData), {
        loading: "Adding to partner account...",
        success: "Balance updated in partner account!",
        error: "Error while adding balance to partner account.",
      });
      if (res.status === "success") {
        policyData = updatePolicy;
        policyData = addKeyValueToObjects(
          policyData,
          "transactionCode",
          res.data.transactionCode
        );

        policyData = addKeyValueToObjects(
          policyData,
          "distributedDate",
          distributedDate
        )

        const chunks = splitDataIntoChunks(policyData)
        const promises = chunks?.map((ele)=>{
          let policyData = ele
          return   updateFilterPaymentsService({
            header,
            policyData,
          })
        })
        try {
       
          const accountResponse = await Promise.all(promises);
          const s = accountResponse.length
          if(accountResponse[s-1].status ==="success"){
            setIsVisibleTable(false);
          }
        
         
       
        } catch (error: any) {
          const err = await error
          toast.error(err.message)
        }
       
      }
    } catch (error:any) {
      const err = await error
      toast.error(err.message)
      return { [FORM_ERROR]: "error" };
    }finally{
      setIsLoading(false)
    }
  };

  if (!isVisibleTable) {
    return (
      <Paper elevation={3} style={{ padding: 30 }}>
        <Grid item lg={12} md={12} sm={12} xs={12} mt={2} ml={3}>
          <Typography
            variant="subtitle1"
            gutterBottom
            display="inline"
            align="center"
          >
            Data updated successfully
          </Typography>
        </Grid>
      </Paper>
    );
  }
  if (isLoading) {
    return <CircularProgress />
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
              <span className="text-safekaroDarkOrange">{brokerAmount}</span>
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
          columns={BrokerCreditColumns}
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
              {row.original.payInCommission !== 0 && (
                <Grid container mt={2}>
                  <Grid item lg={12}>
                    <FormControl
                      fullWidth
                      size="small"
                      style={{ marginLeft: 10 }}
                    >
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={row.original.payInPaymentStatus}
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

export default BrokerPaymentPoliciesDetails;
