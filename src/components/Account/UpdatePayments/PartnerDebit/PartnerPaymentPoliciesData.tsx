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
import { CSVLink } from "react-csv";
import PartnerDebitColumns from "./PartnerDebitColumns";
interface PoliciesDetailsProps {
  policies: IViewPolicy[];
  totalPaidAmount: number;
  partnerBalance: number;
  accountId: string;
  partnerId: string;
  endDate: string;
  startDate: string;
  accountCode: string;
  distributedDate: string;
  partnerName: string;
  balanceInAccount: number;
  remarks: string;
}
interface PartialPaidProps {
  policyNumber?: string;
  payOutAmount?: number;
  payOutBalance?: number;
  payOutCommission?: number;
}
function PartnerPaymentPoliciesData({
  policies,
  totalPaidAmount,
  partnerBalance = 0,
  accountId,
  partnerId,
  startDate,
  endDate,
  accountCode,
  distributedDate,
  partnerName,
  remarks,
  balanceInAccount,
}: PoliciesDetailsProps) {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [updatePolicies, setUpdatePolicies] = useState<IViewPolicy[]>(
    policies.map((a: IViewPolicy) => ({ ...a }))
  );
  const [partialPaidList, setPartialPaidList] = useState<PartialPaidProps[]>(
    []
  );
  const [paymentTextboxVisibility, setPaymentTextboxVisibility] =
    useState<boolean>(false);
  const [selectAllPaid, setSelectAllPaid] = useState<boolean>(false);
  const [partnerAmount, setPartnerAmount] = useState(0);
  const [isVisibleTable, setIsVisibleTable] = useState<boolean>(true);
  const columns = useMemo(() => PartnerDebitColumns, []);
  const [CurrPaidAmount, setCurrPaidAmount] = useState(0);
  const [CurrLeftDisAmount, setCurrLeftDisAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const policiesData = deepCopyIViewPolicyArray(policies);
  useEffect(() => {
    let totalPaidAmount = 0;
    let leftAmount = Math.abs(Number(partnerBalance)) + Number(partnerAmount);
    const hasChanges = updatePolicies.some((p, index) => {
      const originPolicyData = policiesData[index];
      return (
        p.payOutPaymentStatus !== originPolicyData?.payOutPaymentStatus ||
        p.payOutAmount !== originPolicyData?.payOutAmount ||
        p.payOutBalance !== originPolicyData?.payOutBalance
      );
    });
    if (!hasChanges) {
      setCurrLeftDisAmount(leftAmount);
      setCurrPaidAmount(0);
      return;
    }
    updatePolicies.forEach((p) => {
      const originPolicyData = findPolicyByNumber(p.policyNumber, policiesData);
      const preStatus = originPolicyData?.payOutPaymentStatus;
      const newStatus = p.payOutPaymentStatus;
      if (preStatus === "Partial") {
        if (newStatus === "Paid") {
          totalPaidAmount += originPolicyData?.payOutBalance!;
          leftAmount -= originPolicyData?.payOutBalance!;
        } else if (newStatus === "Partial") {
          const diff = p.payOutAmount! - originPolicyData?.payOutAmount!;
          totalPaidAmount += diff;
          leftAmount -= diff;
        } else {
          leftAmount += originPolicyData?.payOutAmount!;
        }
      } else if (preStatus === "UnPaid") {
        if (newStatus === "Paid") {
          totalPaidAmount += p.payOutCommission;
          leftAmount -= p.payOutCommission;
        } else {
          totalPaidAmount += p.payOutAmount!;
          leftAmount -= p.payOutAmount!;
        }
      } else {
        if (newStatus === "Partial") {
          leftAmount += originPolicyData?.payOutAmount! - p.payOutAmount!;
        } else {
          leftAmount += p.payOutCommission;
        }
      }
    });
    setCurrLeftDisAmount(leftAmount);
    setCurrPaidAmount(totalPaidAmount);
     // eslint-disable-next-line
  }, [updatePolicies, partnerAmount]);
  useEffect(() => {
    const partialData = policiesData.filter((p) => {
      return p.payOutPaymentStatus === "Partial";
    });
    let data: PartialPaidProps[] = [];
    partialData?.forEach((p) => {
      let dataObj: PartialPaidProps = {};
      dataObj.payOutAmount = p.payOutAmount;
      dataObj.payOutBalance = p.payOutBalance;
      dataObj.policyNumber = p.policyNumber;
      dataObj.payOutCommission = p.payOutCommission;
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
  const payloadForDebit = (b: Number): AddEditCreditDebitProps => {
    return {
      header: header,
      creditDebit: {
        accountId: accountId,
        partnerId: partnerId,
        accountType: "PayOut",
        type: "debit",
        accountCode: accountCode,
        debit: Number(partnerAmount),
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
        partnerBalance: Number(-b),
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
        partnerId: partnerId,
        accountType: "PayOut",
        type: "credit",
        accountCode: accountCode,
        credit: Number(paidPolicyAmount),
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
        partnerBalance: Number(-balance),
      },
      creditDebitId: "",
    };
  };
  const payLoadForAccountManage = (tCode: string): AddEditCreditDebitProps => {
    const payloadData: AddEditCreditDebitProps = {
      header: header,
      creditDebit: {
        accountId: accountId,
        partnerId: partnerId,
        accountType: "PayOut",
        type: "debit",
        accountCode: accountCode,
        amount: Number(partnerAmount),
        remarks: "",
        brokerName: "",
        brokerId: "",
        partnerName: partnerName,
        startDate: startDate,
        endDate: endDate,
        policyNumber: "",
        employeeName: "",
        employeeId: "",
        distributedDate: distributedDate,
        partnerBalance: Number(-CurrLeftDisAmount),
        isActive: false,
        updatedOn: null,
        createdOn: null,
        createdBy: "",
        updatedBy: "",
        transactionCode: tCode,
      },
      creditDebitId: "",
    };
    return payloadData;
  };
  const updateAllPolicies = (
    status: string,
    payoutAmount: number,
    payOutBalance: number,
    policyNumber: string
  ) => {
    const updateData = updatePolicies.map((policy) => {
      if (policy.policyNumber === policyNumber) {
        policy.payOutPaymentStatus = status;
        policy.payOutAmount = payoutAmount;
        policy.payOutBalance = payOutBalance;
        policy.updatedOn = distributedDate;
      }
      return policy;
    });
    setUpdatePolicies(updateData.map((a: IViewPolicy) => ({ ...a })));
  };
  useEffect(() => {
    partialPaidList.forEach((p) => {
      let status;
      if (Number(p.payOutAmount!) >= Number(p.payOutCommission!)) {
        status = "Paid";
      } else {
        status = "Partial";
      }
      updateAllPolicies(
        status,
        p.payOutAmount!,
        p.payOutBalance!,
        p.policyNumber!
      );
    });
    
  }, [partialPaidList]);
  const splitDataIntoChunks = (data: any) => {
    const chunks = [];
    if (data.length > 0) {
      for (let i = 0; i < data?.length; i += 60) {
        chunks.push(data.slice(i, i + 60));
      }
    }
    return chunks;
  };
  function addKeyValueToObjects<T extends Record<string, any>>(
    policyData: T[],
    key: string,
    value: string | number
  ): (T & { [key: string]: string })[] {
    const data = policyData.filter((ele: T) => ele.payOutCommission !== 0);
    return data.map((obj: T) => ({
      ...obj,
      [key]: value,
    }));
  }
  const handleClickSubmit = async () => {
    if (isClicked) return;
    setIsLoading(true);
    let policyData = updatePolicies.filter((p: IViewPolicy) => {
      if (p.payOutPaymentStatus === "Partial") {
        const originalP = findPolicyByNumber(p.policyNumber, policiesData);
        if (originalP?.payOutBalance !== p.payOutBalance) {
          return true;
        } else {
          return false;
        }
      }
      return p.payOutPaymentStatus !== "UnPaid";
    });
    policyData = addKeyValueToObjects(
      policyData,
      "distributedDate",
      distributedDate
    );
    policyData = addKeyValueToObjects(
      policyData,
      "partnerBalance",
      CurrLeftDisAmount
    );
    const allBalance = Math.abs(Number(partnerBalance)) + Number(partnerAmount);
    try {
      if (partnerAmount > 0) {
        const resData = await toast.promise(
          AddCreditDebitService(payloadForDebit(allBalance)),
          {
            loading: "Reducing amount from partner account...",
            success: "Balance credited from partner account!",
            error: "Error while crediting amount from partner account.",
          }
        );
        if (resData.status === "success") {
          const tCode = resData.data.transactionCode;
          addAccountManageService(payLoadForAccountManage(tCode));
        }
      }
      if (policyData.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const postData = createCreditDebitForm(CurrLeftDisAmount);
        const res = await toast.promise(AddCreditDebitService(postData), {
          loading: "Adding to partner account...",
          success: "Balance updated in partner account!",
          error: "Error while adding balance to partner account.",
        });
        if (res.status === "success") {
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
      setIsClicked(true);
      setIsLoading(false);
    }
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
    let payOutAmount, payOutBalance, status;
    if (newStatus === "UnPaid") {
      payOutAmount = 0;
      payOutBalance = 0;
      status = "UnPaid";
    } else if (newStatus === "Paid") {
      if (CurrLeftDisAmount <= 0) {
        toast.error("No left amount");
        return;
      }
      let existPartialData = findFromPartialList(policy.policyNumber);
      if (existPartialData) {
        if (CurrLeftDisAmount >= existPartialData.payOutBalance!) {
          status = "Paid";
          payOutAmount = existPartialData.payOutCommission;
          payOutBalance = 0;
        } else {
          toast.error("no enough money to do paid");
          return;
        }
      } else {
        if (CurrLeftDisAmount < policy.payOutCommission) {
          setPartialPaidList([
            ...partialPaidList,
            {
              policyNumber: policy.policyNumber,
              payOutAmount: Number(CurrLeftDisAmount),
              payOutBalance:
                Number(policy.payOutCommission) - Number(CurrLeftDisAmount),
              payOutCommission: policy.payOutCommission,
            },
          ]);
          status = "Partial";
          payOutAmount = Number(CurrLeftDisAmount);
          payOutBalance = Number(policy.payOutCommission) - payOutAmount;
        } else {
          status = "Paid";
          payOutAmount = policy.payOutCommission;
          payOutBalance = 0;
        }
      }
    } else {
      let existPartialData = findFromPartialList(policy.policyNumber);
      if (existPartialData) {
        status = "Partial";
        payOutBalance = existPartialData.payOutBalance;
        payOutAmount = existPartialData.payOutAmount;
        updatePartialPaid({
          policyNumber: policy.policyNumber,
          payOutAmount,
          payOutBalance,
        });
      } else {
        status = "Partial";
        payOutBalance = policy.payOutCommission;
        payOutAmount = 0;
        setPartialPaidList([
          ...partialPaidList,
          {
            policyNumber: policy.policyNumber,
            payOutBalance,
            payOutAmount,
            payOutCommission: policy.payOutCommission,
          },
        ]);
      }
    }
    updateAllPolicies(
      status,
      payOutAmount!,
      payOutBalance!,
      policy.policyNumber
    );
    setPaymentTextboxVisibility(true);
  };
  const handleAmountChange = (policy: IViewPolicy, e: any) => {
    let amount = Number(e.target.value) || 0;
    if (CurrLeftDisAmount === 0) {
      toast.error("Please enter an amount");
      return;
    }
    const policyAmount = policy.payOutBalance || policy.payOutCommission;
    let maxAllowableAmount = Math.min(policyAmount, CurrLeftDisAmount);
    if (amount < 0) {
      amount = 0;
    } else if (amount >= maxAllowableAmount) {
      amount = maxAllowableAmount;
    }
    const existData = findFromPartialList(policy.policyNumber);
    if (existData) {
      let balance = existData?.payOutBalance ?? 0;
      let payOutBalance = balance ? balance - amount : amount;
      let payOutAmount = policy.payOutCommission - payOutBalance;
      updatePartialPaid({
        policyNumber: policy.policyNumber,
        payOutAmount,
        payOutBalance,
        payOutCommission: policy.payOutCommission,
      });
      setPaymentTextboxVisibility(true);
    }
  };
  const findFromPartialList = (pNo: string) => {
    return partialPaidList?.find((p) => p.policyNumber === pNo);
  };
  const handleClickPolicyEditCommission = async (policy: IViewPolicy) => {
    navigate(motorPolicyEditCommissionPath(policy?.policyId!));
  };
  const handleEnterAmount = (e: any) => {
    let enterValue = e.target.value;
    if (enterValue > balanceInAccount) {
      e.target.value = balanceInAccount;
      enterValue = balanceInAccount;
    }
    setSelectAllPaid(false);
    setUpdatePolicies(policiesData.map((a: IViewPolicy) => ({ ...a })));
    setPartnerAmount(enterValue > 0 ? enterValue : 0);
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
      let policyStatus = policy.payOutPaymentStatus;
      let payOutAmount = policy.payOutAmount ?? 0;
      let balance = policy.payOutBalance ?? 0;
      if (policy.payOutCommission === 0 || totalAmount === 0) {
        return policy;
      } else {
        if (policy.payOutPaymentStatus === "Partial") {
          if (totalAmount >= balance) {
            policyStatus = "Paid";
            payOutAmount = policy.payOutCommission!;
            totalAmount -= balance;
            balance = 0;
          } else {
            policyStatus = "Partial";
            payOutAmount += totalAmount;
            balance = policy.payOutCommission - payOutAmount;
            totalAmount = 0;
          }
        } else if (policy.payOutCommission <= totalAmount) {
          policyStatus = "Paid";
          payOutAmount = policy.payOutCommission!;
          totalAmount -= payOutAmount;
          balance = 0;
        } else if (totalAmount > 0) {
          policyStatus = "Partial";
          payOutAmount = totalAmount;
          balance = policy.payOutCommission - payOutAmount;
          totalAmount = 0;
        }
      }
      return {
        ...policy,
        payOutPaymentStatus: policyStatus,
        payOutAmount: payOutAmount,
        payOutBalance: balance,
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
              {Number(partnerAmount) + Math.abs(partnerBalance) === 0 &&
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
                disabled={isClicked}
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
              min={1}
              value={partnerAmount}
              debounceTimeout={500}
              onChange={(e) => handleEnterAmount(e)}
            />
          </Grid>
        </Grid>
        <Grid container mt={2} mb={2}>
          <Tooltip title={"Download Excel"}>
            <Button
              aria-label={"Download"}
              className="size-5 text-white bg-safekaroDarkOrange mr-2 p-4"
            >
              <CSVLink
                data={policies}
                style={{ height: "20px", width: "100%", paddingBottom: "20px" }}
              >
                CSV
              </CSVLink>
            </Button>
          </Tooltip>
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
             
              {row.original.payOutCommission === 0 && (
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
                        <MenuItem value="Partial">Partial</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
             
              {row.original.payOutPaymentStatus === "Partial" && (
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
export default PartnerPaymentPoliciesData;
