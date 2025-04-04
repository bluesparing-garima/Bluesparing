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
import GetMonthlyPartnerPaymentWithCompanyService from "../../../api/Dashboard/GetMonthlyPartnerWithCompanyPayment/GetMonthlyPartnerPaymentWithCompanyService";
import GetMonthlyPartnerWithCompanyPaidService from "../../../api/Dashboard/GetMonthlyPartnerWithCompanyPaid/GetMonthlyPartnerWithCompanyPaidService";
import GetMonthlyPayOutBalWithCompanyService from "../../../api/Dashboard/GetMonthlyPayOutBalWithCompanyService/GetMonthlyPayOutBalWithCompanyService";
import GetMonthlyLeftDistributionCompanyService from "../../../api/Dashboard/GetMonthlyLeftDistributionCompany/GetMonthlyLeftDistributionCompanyService";
import { useLocation } from "react-router-dom";
import { FolderLikeStructureForPayoutProps, ICompanyLeftDis, ICompanyPaid, ICompanyView, IPartnerBalance, IPartnerPaid, IPartnerView, TreeNodePayOut } from "../ITreeView";

const FolderView: React.FC<{
  node:
    | TreeNodePayOut
    | IPartnerView
    | ICompanyView
    | IPartnerPaid
    | ICompanyPaid
    | IPartnerBalance
    | ICompanyLeftDis;
  api: string;
  startDate: string;
  endDate: string;
}> = ({ node, api, startDate, endDate }) => {
  const location = useLocation();
  const selectedCategory = location.state as string;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [childrenData, setChildrenData] = useState<
    | IPartnerView[]
    | ICompanyView[]
    | IPartnerPaid[]
    | ICompanyPaid[]
    | IPartnerBalance[]
    | ICompanyLeftDis[]
    | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setOpen(!open);
    if (!open && !childrenData) {
      setLoading(true);
      setError(null);
      try {
        if (api === "monthly_payout") {
          if ("name" in node) {
            if (node.children) {
              setChildrenData(node.children);
            }
          } else if ("partnerId" in node) {
            const partnerId = node.partnerId;
            const res = await GetMonthlyPartnerPaymentWithCompanyService({
              header,
              partnerId: partnerId,
              startDate: startDate,
              endDate: endDate,
              category:selectedCategory
            });
            setChildrenData(res.data);
          }
        } else if (api === "monthly_paid_payout") {
          if ("name" in node) {
            if (node.children) {
              setChildrenData(node.children);
            }
          } else if ("partnerId" in node) {
            const partnerId = node.partnerId;
            const res = await GetMonthlyPartnerWithCompanyPaidService({
              header,
              startDate: startDate,
              endDate: endDate,
              partnerId: partnerId,
              category:selectedCategory
            });
            setChildrenData(res.data);
          }
        } else if (api === "monthly_payout_balance") {
          if ("name" in node) {
            if (node.children) {
              setChildrenData(node.children);
            }
          } else if ("partnerId" in node) {
            const partnerId = node.partnerId;
            const res = await GetMonthlyPayOutBalWithCompanyService({
              header,
              startDate: startDate,
              endDate: endDate,
              partnerId: partnerId,
              category:selectedCategory
            });
            setChildrenData(res.data);
          }
        } else if (api === "monthly_left_dis_amount") {
          if ("name" in node) {
            if (node.children) {
              setChildrenData(node.children);
            }
          } else if ("partnerId" in node) {
            const partnerId = node.partnerId;
            const res = await GetMonthlyLeftDistributionCompanyService({
              header,
              startDate: startDate,
              endDate: endDate,
              partnerId: partnerId,
              category:selectedCategory
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
    const treeNode = node as TreeNodePayOut;

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

  if ("totalPayOutCommission" in node && "partnerId" in node) {
    let partnerNode = node as IPartnerView;
    return (
      <>
        <ListItem button onClick={handleClick} sx={{ pl: 4 }}>
          <PersonOutlineOutlinedIcon className="text-safekaroDarkBlue" />
          <ListItemText
            className="text-safekaroDarkBlue"
            primary={`${partnerNode.partnerName} - ${partnerNode.userCode}  (₹${partnerNode.totalPayOutCommission})`}
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

  if ("totalPayOutAmount" in node && "partnerId" in node) {
    let partnerNode = node as IPartnerPaid;
    return (
      <>
        <ListItem button onClick={handleClick} sx={{ pl: 4 }}>
          <PersonOutlineOutlinedIcon className="text-safekaroDarkBlue" />
          <ListItemText
            className="text-safekaroDarkBlue"
            primary={`${partnerNode.partnerName} - ${partnerNode.userCode}  (₹${partnerNode.totalPayOutAmount})`}
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

  if ("totalPartnerBalance" in node && "partnerId" in node) {
    let partnerNode = node as IPartnerBalance;
    return (
      <>
        <ListItem button onClick={handleClick} sx={{ pl: 4 }}>
          <PersonOutlineOutlinedIcon className="text-safekaroDarkBlue" />
          <ListItemText
            className="text-safekaroDarkBlue"
            primary={`${partnerNode.partnerName} - ${partnerNode.userCode}  (₹${partnerNode.totalPartnerBalance})`}
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

  if ("companyName" in node && "totalPayOutCommission" in node) {
    const companyNode = node as ICompanyView;
    return (
      <ListItem sx={{ pl: 8 }}>
        <BusinessOutlinedIcon />
        <ListItemText
          primary={`${companyNode.companyName} - ₹${companyNode.totalPayOutCommission}`}
        />
      </ListItem>
    );
  }
  if ("companyName" in node && "totalPayOutAmount" in node) {
    const companyNode = node as ICompanyPaid;
    return (
      <ListItem sx={{ pl: 8 }}>
        <BusinessOutlinedIcon />
        <ListItemText
          primary={`${companyNode.companyName} - ₹${companyNode.totalPayOutAmount}`}
        />
      </ListItem>
    );
  }
  if ("companyName" in node && "totalPartnerBalance" in node) {
    const companyNode = node as ICompanyLeftDis;
    return (
      <ListItem sx={{ pl: 8 }}>
        <BusinessOutlinedIcon />
        <ListItemText
          primary={`${companyNode.companyName} - ₹${companyNode.totalPartnerBalance}`}
        />
      </ListItem>
    );
  }
  return null;
};

const FolderLikeStructureForPayout: React.FC<
  FolderLikeStructureForPayoutProps
> = ({ data, api, startDate, endDate }) => {
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
    // eslint-disable-next-line
  }, []);
  return (
    <List sx={{ bgcolor: "#fafafa", borderRadius: 2 }}>
      <FolderView node={data} api={api} startDate={sd} endDate={ed} />
    </List>
  );
};

export default FolderLikeStructureForPayout;
