import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import MaterialReactTable from "material-react-table";
import { DebounceInput } from "react-debounce-input";
import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FORM_ERROR } from "final-form";
import { header } from "../../../../context/constant";
import { IViewPolicy } from "../../../Policy/IPolicy";
import updateFilterPaymentsService from "../../../../api/UpdatePayment/updateFilterPayments/updateFilterPaymentsService";
import { motorPolicyEditCommissionPath } from "../../../../sitemap";
import AddCreditDebitService from "../../../../api/CreditDebit/AddCreditDebit/addCreditDebitService";
import { AddEditCreditDebitProps } from "../../../../api/CreditDebit/getCreditDebitTypes";
import addAccountManageService from "../../../../api/CreditDebit/AddAccountManage/AddAccountManageService";
import BrokerCreditColumns from "./BrokerCreditColumns";
interface PoliciesDetailsProps {
  policies: IViewPolicy[];
  totalPaidAmount: number;
  brokerBalance: number;
  accountId: string;
  brokerId: string;
  endDate: string;
  startDate: string;
  accountCode: string;
  distributedDate: string;
  brokerName: string;
  balanceInAccount: number;
  remarks: string;
}
interface PartialPaidProps {
  policyNumber?: string;
  payInAmount?: number;
  payInBalance?: number;
  payInCommission?: number;
}
function BrokerPaymentPoliciesData({
  policies,
  totalPaidAmount,
  brokerBalance = 0,
  accountId,
  brokerId,
  startDate,
  endDate,
  accountCode,
  distributedDate,
  brokerName,
  remarks,
  balanceInAccount,
}: PoliciesDetailsProps) {
  const navigate = useNavigate();
  const [updatePolicies, setUpdatePolicies] = useState<IViewPolicy[]>(
    policies.map((a: IViewPolicy) => ({ ...a }))
  );
  const [partialPaidList, setPartialPaidList] = useState<PartialPaidProps[]>(
    []
  );
  const [paymentTextboxVisibility, setPaymentTextboxVisibility] =
    useState<boolean>(false);
  const [selectAllPaid, setSelectAllPaid] = useState<boolean>(false);
  const [brokerEnterAmount, setBrokerEnterAmount] = useState(0);
  const [isVisibleTable, setIsVisibleTable] = useState<boolean>(true);
  const columns = useMemo(() => BrokerCreditColumns, []);
  const [CurrPaidAmount, setCurrPaidAmount] = useState(0);
  const [CurrLeftDisAmount, setCurrLeftDisAmount] = useState(0);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const policiesData = deepCopyIViewPolicyArray(policies);
  useEffect(() => {
    let totalPaidAmount = 0;
    let leftAmount =
      Math.abs(Number(brokerBalance)) + Number(brokerEnterAmount);
    const hasChanges = updatePolicies.some((p, index) => {
      const originPolicyData = policiesData[index];
      return (
        p.payInPaymentStatus !== originPolicyData?.payInPaymentStatus ||
        p.payInAmount !== originPolicyData?.payInAmount ||
        p.payInBalance !== originPolicyData?.payInBalance
      );
    });
    if (!hasChanges) {
      setCurrLeftDisAmount(leftAmount);
      setCurrPaidAmount(0);
      return;
    }
    updatePolicies.forEach((p) => {
      const originPolicyData = findPolicyByNumber(p.policyNumber, policiesData);
      const preStatus = originPolicyData?.payInPaymentStatus;
      const newStatus = p.payInPaymentStatus;
      if (preStatus === "Partial") {
        if (newStatus === "Paid") {
          totalPaidAmount += originPolicyData?.payInBalance!;
          leftAmount -= originPolicyData?.payInBalance!;
        } else if (newStatus === "Partial") {
          const diff = p.payInAmount! - originPolicyData?.payInAmount!;
          totalPaidAmount += diff;
          leftAmount -= diff;
        } else {
          leftAmount += originPolicyData?.payInAmount!;
        }
      } else if (preStatus === "UnPaid") {
        if (newStatus === "Paid") {
          totalPaidAmount += p.payInCommission;
          leftAmount -= p.payInCommission;
        } else {
          totalPaidAmount += p.payInAmount!;
          leftAmount -= p.payInAmount!;
        }
      } else {
        if (newStatus === "Partial") {
          leftAmount += originPolicyData?.payInAmount! - p.payInAmount!;
        } else {
          leftAmount += p.payInCommission;
        }
      }
    });
    setCurrLeftDisAmount(leftAmount);
    setCurrPaidAmount(totalPaidAmount);
     // eslint-disable-next-line
  }, [updatePolicies, brokerEnterAmount]);
  useEffect(() => {
    const partialData = policiesData.filter((p) => {
      return p.payInPaymentStatus === "Partial";
    });
    let data: PartialPaidProps[] = [];
    partialData?.forEach((p) => {
      let dataObj: PartialPaidProps = {};
      dataObj.payInAmount = p.payInAmount;
      dataObj.payInBalance = p.payInBalance;
      dataObj.policyNumber = p.policyNumber;
      dataObj.payInCommission = p.payInCommission;
      data.push(dataObj);
    });
    setPartialPaidList([...data]);
     // eslint-disable-next-line
  }, []);
  function deepCopyIViewPolicyArray(policies: IViewPolicy[]): IViewPolicy[] {
    return policies.map((policy) => deepCopyIViewPolicy(policy));
  }
  function deepCopyIViewPolicy(policy: IViewPolicy): IViewPolicy {
    const copy: IViewPolicy = { ...policy };
    if (policy.rcFront) copy.rcFront = policy.rcFront;
    if (policy.rcBack) copy.rcBack = policy.rcBack;
    if (policy.previousPolicy) copy.previousPolicy = policy.previousPolicy;
    if (policy.survey) copy.survey = policy.survey;
    if (policy.puc) copy.puc = policy.puc;
    if (policy.fitness) copy.fitness = policy.fitness;
    if (policy.proposal) copy.proposal = policy.proposal;
    if (policy.currentPolicy) copy.currentPolicy = policy.currentPolicy;
    if (policy.other) copy.other = policy.other;
    if (policy.updatedOn) copy.updatedOn = deepCopyValue(policy.updatedOn);
    if (policy.createdOn) copy.createdOn = deepCopyValue(policy.createdOn);
    if (policy.createdBy) copy.createdBy = deepCopyValue(policy.createdBy);
    if (policy.updatedBy) copy.updatedBy = deepCopyValue(policy.updatedBy);
    if (policy.paymentUpdatedOn)
      copy.paymentUpdatedOn = deepCopyValue(policy.paymentUpdatedOn);
    if (policy.paymentCreatedOn)
      copy.paymentCreatedOn = deepCopyValue(policy.paymentCreatedOn);
    if (policy.paymentCreatedBy)
      copy.paymentCreatedBy = deepCopyValue(policy.paymentCreatedBy);
    if (policy.paymentUpdatedBy)
      copy.paymentUpdatedBy = deepCopyValue(policy.paymentUpdatedBy);
    return copy;
  }
  function deepCopyValue<T>(value: T): T {
    if (Array.isArray(value)) {
      return value.map(deepCopyValue) as any;
    } else if (value !== null && typeof value === "object") {
      return { ...value };
    } else {
      return value;
    }
  }
  const payloadForDebit = (): AddEditCreditDebitProps => {
    return {
      header: header,
      creditDebit: {
        accountId: accountId,
        brokerId: brokerId,
        accountType: "PayIn",
        type: "debit",
        accountCode: accountCode,
        debit: Number(brokerEnterAmount),
        remarks: remarks,
        partnerName: "",
        partnerId: "",
        brokerName: brokerName,
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
        brokerBalance:
          Math.abs(Number(brokerBalance)) + Number(brokerEnterAmount),
      },
      creditDebitId: "",
    };
  };
  const createCreditDebitForm = (balance: number): AddEditCreditDebitProps => {
    const paidPolicyAmount = CurrPaidAmount;
    return {
      header: header,
      creditDebit: {
        accountId: accountId,
        brokerId: brokerId,
        accountType: "PayIn",
        type: "credit",
        accountCode: accountCode,
        credit: Number(paidPolicyAmount),
        remarks: remarks,
        partnerName: "",
        partnerId: "",
        brokerName: brokerName,
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
        brokerBalance: Number(balance),
      },
      creditDebitId: "",
    };
  };
  const payLoadForAccountManage = (tCode: string): AddEditCreditDebitProps => {
    const payloadData: AddEditCreditDebitProps = {
      header: header,
      creditDebit: {
        accountId: accountId,
        brokerId: brokerId,
        accountType: "PayIn",
        type: "credit",
        accountCode: accountCode,
        amount: Number(brokerEnterAmount),
        remarks: "",
        partnerName: "",
        partnerId: "",
        brokerName: brokerName,
        startDate: startDate,
        endDate: endDate,
        policyNumber: "",
        employeeName: "",
        employeeId: "",
        distributedDate: distributedDate,
        brokerBalance: Number(CurrLeftDisAmount),
        isActive: false,
        updatedOn: null,
        createdOn: null,
        createdBy: "",
        transactionCode: tCode,
        updatedBy: "",
      },
      creditDebitId: "",
    };
    return payloadData;
  };
  const updateAllPolicies = (
    status: string,
    payInAmount: number,
    payInBalance: number,
    policyNumber: string
  ) => {
    const updateData = updatePolicies.map((policy) => {
      if (policy.policyNumber === policyNumber) {
        policy.payInPaymentStatus = status;
        policy.payInAmount = payInAmount;
        policy.payInBalance = payInBalance;
        policy.updatedOn = distributedDate;
      }
      return policy;
    });
    setUpdatePolicies(updateData.map((a: IViewPolicy) => ({ ...a })));
  };
  useEffect(() => {
    partialPaidList.forEach((p) => {
      let status;
      if (Number(p.payInAmount!) >= Number(p.payInCommission!)) {
        status = "Paid";
      } else {
        status = "Partial";
      }
      updateAllPolicies(
        status,
        p.payInAmount!,
        p.payInBalance!,
        p.policyNumber!
      );
    });
    // eslint-disable-next-line 
  }, [partialPaidList]);
  function addKeyValueToObjects<T extends Record<string, any>>(
    policyData: T[],
    key: string,
    value: string | number
  ): (T & { [key: string]: string })[] {
    const data = policyData.filter((ele: T) => ele.payInCommission !== 0);
    return data.map((obj: T) => ({
      ...obj,
      [key]: value,
    }));
  }
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
    if (isClick) return;
    setIsLoading(true);
    let policyData = updatePolicies.filter((p: IViewPolicy) => {
      if (p.payInPaymentStatus === "Partial") {
        const originalP = findPolicyByNumber(p.policyNumber, policiesData);
        if (originalP?.payInBalance !== p.payInBalance) {
          return true;
        } else {
          return false;
        }
      }
      return p.payInPaymentStatus !== "UnPaid";
    });
    try {
      if (brokerEnterAmount > 0) {
        const resData = await toast.promise(
          AddCreditDebitService(payloadForDebit()),
          {
            loading: "Reducing amount from broker account...",
            success: "Balance credited from broker account!",
            error: "Error while crediting amount from broker account.",
          }
        );
        if (resData.status === "success") {
          const tCode = resData.data.transactionCode;
          await addAccountManageService(payLoadForAccountManage(tCode));
        }
      }
      if (policyData.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const postData = createCreditDebitForm(CurrLeftDisAmount);
        const res = await toast.promise(AddCreditDebitService(postData), {
          loading: "Adding to broker account...",
          success: "Balance updated in broker account!",
          error: "Error while adding balance to broker account.",
        });
        if (res.status === "success") {
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
          policyData = addKeyValueToObjects(
            policyData,
            "brokerBalance",
            CurrLeftDisAmount
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
            const res = await Promise.all(promises);
            const s = res.length;
            if (res[s - 1].status === "success") {
              setIsVisibleTable(false);
            }
          } catch (error: any) {
            const err = await error;
            toast.error(err.message);
          }
        }
      } else {
        setIsVisibleTable(false);
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
      return { [FORM_ERROR]: "Error in processing request" };
    } finally {
      setIsClick(true);
      setIsLoading(false);
    }
  };
  const findFromPartialList = (pNo: string) => {
    return partialPaidList?.find((p) => p.policyNumber === pNo);
  };
  const findPolicyByNumber = (policyNumber: string, list: IViewPolicy[]) => {
    return list?.find((p) => p.policyNumber === policyNumber);
  };
  const updatePartialPaid = (data: PartialPaidProps) => {
    let updateList = partialPaidList.map((p) => {
      if (p.policyNumber !== data.policyNumber) {
        return p;
      } else {
        return data;
      }
    });
    setPartialPaidList([...updateList]);
  };
  const handleStatusChange = (policy: IViewPolicy, newStatus: string) => {
    let payInAmount, payInBalance, status;
    if (newStatus === "UnPaid") {
      payInAmount = 0;
      payInBalance = 0;
      status = "UnPaid";
    } else if (newStatus === "Paid") {
      if (CurrLeftDisAmount <= 0) {
        toast.error("No left amount");
        return;
      }
      let existPartialData = findFromPartialList(policy.policyNumber);
      if (existPartialData) {
        if (CurrLeftDisAmount >= existPartialData.payInBalance!) {
          status = "Paid";
          payInAmount = existPartialData.payInCommission;
          payInBalance = 0;
        } else {
          toast.error("no enough money to do paid");
          return;
        }
      } else {
        if (CurrLeftDisAmount < policy.payInCommission) {
          setPartialPaidList([
            ...partialPaidList,
            {
              policyNumber: policy.policyNumber,
              payInAmount: Number(CurrLeftDisAmount),
              payInBalance:
                Number(policy.payInCommission) - Number(CurrLeftDisAmount),
              payInCommission: policy.payInCommission,
            },
          ]);
          status = "Partial";
          payInAmount = Number(CurrLeftDisAmount);
          payInBalance = Number(policy.payInCommission) - payInAmount;
        } else {
          status = "Paid";
          payInAmount = policy.payInCommission;
          payInBalance = 0;
        }
      }
    } else {
      let existPartialData = findFromPartialList(policy.policyNumber);
      if (existPartialData) {
        status = "Partial";
        payInBalance = existPartialData.payInBalance;
        payInAmount = existPartialData.payInAmount;
        updatePartialPaid({
          policyNumber: policy.policyNumber,
          payInAmount,
          payInBalance,
        });
      } else {
        status = "Partial";
        payInBalance = policy.payInCommission;
        payInAmount = 0;
        setPartialPaidList([
          ...partialPaidList,
          {
            policyNumber: policy.policyNumber,
            payInBalance,
            payInAmount,
            payInCommission: policy.payInCommission,
          },
        ]);
      }
    }
    updateAllPolicies(status, payInAmount!, payInBalance!, policy.policyNumber);
    setPaymentTextboxVisibility(true);
  };
  const handleAmountChange = (policy: IViewPolicy, e: any) => {
    let amount = Number(e.target.value) || 0;
    if (CurrLeftDisAmount === 0) {
      toast.error("Please enter an amount");
      return;
    }
    const policyAmount = policy.payInBalance || policy.payInCommission;
    let maxAllowableAmount = Math.min(policyAmount, CurrLeftDisAmount);
    if (amount < 0) {
      amount = 0;
    } else if (amount >= maxAllowableAmount) {
      amount = maxAllowableAmount;
    }
    const existData = findFromPartialList(policy.policyNumber);
    if (existData) {
      let balance = existData?.payInBalance ?? 0;
      let payInBalance = balance ? balance - amount : amount;
      let payInAmount = policy.payInCommission - payInBalance;
      updatePartialPaid({
        policyNumber: policy.policyNumber,
        payInAmount,
        payInBalance,
        payInCommission: policy.payInCommission,
      });
      setPaymentTextboxVisibility(true);
    }
  };
  const handleClickPolicyEditCommission = async (policy: IViewPolicy) => {
    navigate(motorPolicyEditCommissionPath(policy?.policyId!));
  };
  const handleEnterAmount = (e: any) => {
    let enterValue = e.target.value;
    setSelectAllPaid(false);
    setUpdatePolicies(policiesData.map((a: IViewPolicy) => ({ ...a })));
    setBrokerEnterAmount(enterValue);
    setPaymentTextboxVisibility(true);
  };
  const handleSelectAllPaidChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setSelectAllPaid(isChecked);
    if (!isChecked) {
      setUpdatePolicies(policiesData.map((a: IViewPolicy) => ({ ...a })));
      setPaymentTextboxVisibility(true);
      return;
    }
    setSelectAllPaid(true);
    let totalAmount = CurrLeftDisAmount;
    const updatedPolicies = policiesData.map((policy) => {
      let policyStatus = policy.payInPaymentStatus;
      let payInAmount = policy.payInAmount ?? 0;
      let balance = policy.payInBalance ?? 0;
      if (policy.payInCommission === 0 || totalAmount === 0) {
        return policy;
      } else {
        if (policy.payInPaymentStatus === "Partial") {
          if (totalAmount >= balance) {
            policyStatus = "Paid";
            payInAmount = policy.payInCommission!;
            totalAmount -= balance;
            balance = 0;
          } else {
            policyStatus = "Partial";
            payInAmount += totalAmount;
            balance = policy.payInCommission - payInAmount;
            totalAmount = 0;
          }
        } else if (policy.payInCommission <= totalAmount) {
          policyStatus = "Paid";
          payInAmount = policy.payInCommission!;
          totalAmount -= payInAmount;
          balance = 0;
        } else if (totalAmount > 0) {
          policyStatus = "Partial";
          payInAmount = totalAmount;
          balance = policy.payInCommission - payInAmount;
          totalAmount = 0;
        }
      }
      return {
        ...policy,
        payInPaymentStatus: policyStatus,
        payInAmount: payInAmount,
        payInBalance: balance,
        updatedOn: distributedDate,
      };
    });
    setUpdatePolicies(updatedPolicies.map((a: IViewPolicy) => ({ ...a })));
    setPaymentTextboxVisibility(true);
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
              Total Polices Amount:{" "}
              <span className="text-safekaroDarkOrange">{totalPaidAmount}</span>
            </Typography>
          </Grid>
          <Grid item lg={12}>
            <Typography variant="subtitle1">
              Total Distributed Amount:{" "}
              <span className="text-safekaroDarkOrange">{CurrPaidAmount}</span>
            </Typography>
          </Grid>
          <Grid item lg={12}>
            <Typography variant="subtitle1">
              Left Distributed Amount:{" "}
              <span className="text-safekaroDarkOrange">
                {CurrLeftDisAmount}
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid container mt={2} mb={2}>
          <Grid item lg={6}>
            <FormControl fullWidth size="small">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectAllPaid}
                    onChange={handleSelectAllPaidChange}
                  />
                }
                label="Select All Paid"
              />
              {Number(brokerEnterAmount) + Math.abs(brokerBalance) === 0 &&
                totalPaidAmount !== 0 && (
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
                disabled={isClick}
              >
                Update Payment
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={2}>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <DebounceInput
              type="number"
              className="outline-none border rounded border-black p-1 my-3"
              placeholder="Enter Amount"
              minLength={1}
              value={brokerEnterAmount}
              debounceTimeout={500}
              onChange={(e) => handleEnterAmount(e)}
            />
          </Grid>
        </Grid>
        <MaterialReactTable
          columns={columns}
          data={updatePolicies}
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
             
              {row.original.payInCommission === 0 && (
                <Tooltip title={"Edit Commission"}>
                  <IconButton
                    color="primary"
                    aria-label={"Edit Commission"}
                    component="span"
                    onClick={() => {
                      handleClickPolicyEditCommission(
                        row.original as IViewPolicy
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-commission"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              )}
             
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
                        <MenuItem value="Partial">Partial</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
             
              {row.original.payInPaymentStatus === "Partial" && (
                <Grid container mt={2}>
                  <Grid item lg={12}>
                    <DebounceInput
                      type="number"
                      className="outline-none border rounded border-black p-1"
                      placeholder="Enter Amount"
                      minLength={1}
                      debounceTimeout={2000}
                      onChange={(event) =>
                        handleAmountChange(row.original, event)
                      }
                    />
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
export default BrokerPaymentPoliciesData;
