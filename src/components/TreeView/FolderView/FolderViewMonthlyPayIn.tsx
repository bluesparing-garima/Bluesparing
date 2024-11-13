import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  CircularProgress,
} from "@mui/material";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { endOfMonth, startOfMonth, format } from "date-fns";
import { header } from "../../../context/constant";
import { useLocation } from "react-router-dom";
import {
  BrokerPayInCommissionCompanyProps,
  BrokerPayInCommissionProps,
  BrokerReceivedPayInCompanyProps,
  BrokerReceivedPayInProps,
  FolderLikeStructureForPayInProps,
  BrokerPayInLeftDistributedCompanyProps,
  BrokerPayInLeftDistributedProps,
  TreeNodePayIn,
  BrokerBalancePayInCompanyProps,
} from "../ITreeView";
import GetMonthlyBrokerPaymentWithCompanyService from "../../../api/Dashboard/GetMonthlyBrokerWithCompanyPayment/GetMonthlyBrokerPaymentWithCompanyService";
import GetMonthlyBrokerWithReceivedCompanyPaymentService from "../../../api/Dashboard/GetMonthlyBrokerWithRecievedCompanyPayment/GetMonthlyBrokerWithRecievedCompanyPaymentService";
import GetMonthlyBrokerWithLeftDistributedCompanyPaymentService from "../../../api/Dashboard/GetMonthlyBrokerWithLeftDistributedCompanyPayment/GetMonthlyBrokerWithLeftDistributedCompanyPaymentService";
import GetMonthlyBrokerWithBalanceCompanyPaymentService from "../../../api/Dashboard/GetMonthlyBrokerWithBalanceCompanyPayment/GetMonthlyBrokerWithBalanceCompanyPaymentService";
const FolderView: React.FC<{
  node:
    | TreeNodePayIn
    | BrokerPayInCommissionProps
    | BrokerPayInCommissionCompanyProps
    | BrokerBalancePayInCompanyProps
    | BrokerReceivedPayInProps
    | BrokerReceivedPayInCompanyProps
    | BrokerPayInLeftDistributedProps
    | BrokerPayInLeftDistributedProps;
  api: string;
  startDate: string;
  endDate: string;
}> = ({ node, api, startDate, endDate }) => {
  const location = useLocation();
  const selectedCategory = location.state as string;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [childrenData, setChildrenData] = useState<
    | BrokerPayInCommissionProps[]
    | BrokerPayInCommissionCompanyProps[]
    | BrokerReceivedPayInCompanyProps[]
    | BrokerReceivedPayInProps[]
    | BrokerPayInLeftDistributedProps[]
    | BrokerPayInLeftDistributedProps[]
    | BrokerBalancePayInCompanyProps[]
    | null
  >();
  const [error, setError] = useState<string | null>(null);
  const handleClick = async () => {
    setOpen(!open);
    if (!open && !childrenData) {
      setLoading(true);
      setError(null);
      console.log(api);
      try {
        if (api === "monthly_payin") {
          if ("name" in node) {
            if (node.children) {
              setChildrenData(node.children);
            }
          } else if ("brokerId" in node) {
            const brokerId = node.brokerId;
            const res = await GetMonthlyBrokerPaymentWithCompanyService({
              header,
              startDate,
              endDate,
              brokerId,
              category: selectedCategory,
            });
            setChildrenData(res.data);
          }
        } else if (api === "monthly_paid_payin") {
          if ("name" in node) {
            if (node.children) {
              setChildrenData(node.children);
            }
          } else if ("brokerId" in node) {
            const brokerId = node.brokerId;
            const res = await GetMonthlyBrokerWithReceivedCompanyPaymentService(
              {
                header,
                startDate,
                endDate,
                brokerId,
                category: selectedCategory,
              }
            );
            setChildrenData(res.data);
          }
        } else if (api === "monthly_payin_balance") {
          if ("name" in node) {
            if (node.children) {
              setChildrenData(node.children);
            }
          } else if ("brokerId" in node) {
            const brokerId = node.brokerId;
            const res = await GetMonthlyBrokerWithBalanceCompanyPaymentService({
              header,
              startDate: startDate,
              endDate: endDate,
              brokerId,
              category: selectedCategory,
            });
            setChildrenData(res.data);
          }
        } else if (api === "monthly_left_dis_amount") {
          if ("name" in node) {
            if (node.children) {
              setChildrenData(node.children);
            }
          } else if ("brokerId" in node) {
            const brokerId = node.brokerId;
            const res =
              await GetMonthlyBrokerWithLeftDistributedCompanyPaymentService({
                header,
                startDate,
                endDate,
                brokerId,
                category: selectedCategory,
              });
            setChildrenData(res.data);
          }
        }
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
  };
  if ("name" in node) {
    const treeNode = node as TreeNodePayIn;
    return (
      <>
        <ListItem button onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2 text-safekaroDarkOrange"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
          <ListItemText
            className="text-safekaroDarkOrange"
            primary={`${treeNode.name} (₹ ${treeNode.amount})`}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {childrenData?.map((child, index) => (
              <FolderView
                key={index}
                node={child}
                api={api}
                startDate={startDate}
                endDate={endDate}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }
  if ("totalPayInCommission" in node && "brokerId" in node) {
    let partnerNode = node as BrokerPayInCommissionProps;
    return (
      <>
        <ListItem button onClick={handleClick} sx={{ pl: 4 }}>
          <PersonOutlineOutlinedIcon className="text-safekaroDarkBlue" />
          <ListItemText
            className="text-safekaroDarkBlue"
            primary={`${partnerNode.brokerName} - ${partnerNode.brokerCode}  (₹${partnerNode.totalPayInCommission})`}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {childrenData?.map((child, index) => (
              <FolderView
                key={index}
                node={child}
                api={api}
                startDate={startDate}
                endDate={endDate}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }
  if ("brokerBalance" in node && "brokerId" in node) {
    let partnerNode = node as BrokerPayInLeftDistributedProps;
    return (
      <>
        <ListItem button onClick={handleClick} sx={{ pl: 4 }}>
          <PersonOutlineOutlinedIcon className="text-safekaroDarkBlue" />
          <ListItemText
            className="text-safekaroDarkBlue"
            primary={`${partnerNode.brokerName} - ${partnerNode.brokerCode}  (₹${partnerNode.brokerBalance})`}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {childrenData?.map((child, index) => (
              <FolderView
                key={index}
                node={child}
                api={api}
                startDate={startDate}
                endDate={endDate}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }
  if ("totalPayInAmount" in node && "brokerId" in node) {
    let partnerNode = node as BrokerReceivedPayInProps;
    return (
      <>
        <ListItem button onClick={handleClick} sx={{ pl: 4 }}>
          <PersonOutlineOutlinedIcon className="text-safekaroDarkBlue" />
          <ListItemText
            className="text-safekaroDarkBlue"
            primary={`${partnerNode.brokerName} - ${partnerNode.brokerCode}  (₹${partnerNode.totalPayInAmount})`}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {childrenData?.map((child, index) => (
              <FolderView
                key={index}
                node={child}
                api={api}
                startDate={startDate}
                endDate={endDate}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }
  if ("companyName" in node && "totalPayInCommission" in node) {
    const companyNode = node as BrokerPayInCommissionCompanyProps;
    return (
      <ListItem sx={{ pl: 8 }}>
        <BusinessOutlinedIcon />
        <ListItemText
          primary={`${companyNode.companyName} - ₹${companyNode.totalPayInCommission}`}
        />
      </ListItem>
    );
  }
  if ("companyName" in node && "totalPayInAmount" in node) {
    const companyNode = node as BrokerReceivedPayInCompanyProps;
    return (
      <ListItem sx={{ pl: 8 }}>
        <BusinessOutlinedIcon />
        <ListItemText
          primary={`${companyNode.companyName} - ₹${companyNode.totalPayInAmount}`}
        />
      </ListItem>
    );
  }
  if ("companyName" in node && "brokerBalance" in node) {
    const companyNode = node as BrokerPayInLeftDistributedCompanyProps;
    return (
      <ListItem sx={{ pl: 8 }}>
        <BusinessOutlinedIcon />
        <ListItemText
          primary={`${companyNode.companyName} - ₹${companyNode.brokerBalance}`}
        />
      </ListItem>
    );
  }
  if ("companyName" in node && "payInAmount" in node) {
    const companyNode = node as BrokerBalancePayInCompanyProps;
    return (
      <ListItem sx={{ pl: 8 }}>
        <BusinessOutlinedIcon />
        <ListItemText
          primary={`${companyNode.companyName} - ₹${companyNode.payInAmount}`}
        />
      </ListItem>
    );
  }
  return null;
};
const FolderViewMonthlyPayIn: React.FC<FolderLikeStructureForPayInProps> = ({
  data,
  api,
  startDate,
  endDate,
}) => {
  const [sd, setsD] = useState<string>(startDate ? startDate : "");
  const [ed, setEd] = useState<string>(endDate ? endDate : "");
  useEffect(() => {
    if (!sd && !ed) {
      const currentDate = new Date();
      const firstDayOfMonth = startOfMonth(currentDate);
      const lastDayOfMonth = endOfMonth(currentDate);
      const formattedFirstDay = format(firstDayOfMonth, "yyyy-MM-dd");
      const formattedLastDay = format(lastDayOfMonth, "yyyy-MM-dd");
      setEd(formattedLastDay);
      setsD(formattedFirstDay);
    }
  }, []);
  return (
    <List sx={{ bgcolor: "#fafafa", borderRadius: 2 }}>
      <FolderView node={data} api={api} startDate={sd} endDate={ed} />
    </List>
  );
};
export default FolderViewMonthlyPayIn;
