import { useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { creditDebitsAddPath } from "../../../../sitemap";
import AllCreditDebits from "./AllCreditDebits";
import ViewCreditDebitByBrokerCard from "../ViewCreditDebitByBroker/ViewCreditDebitByBrokerCard";
import ViewCreditDebitByPartnerCard from "../ViewCreditDebitByPartner/ViewCreditDebitByPartnerCard";

const CreditDebits = () => {
  // State and hooks initialization
  const navigate = useNavigate(); // React Router's navigation hook

  // State to manage visibility of components
  const [showAllCreditDebits, setShowAllCreditDebits] = useState(true);
  const [showCreditByBroker, setShowCreditByBroker] = useState(false);
  const [showDebitByPartner, setShowDebitByPartner] = useState(false);
  // Event handlers for filtering creditDebits
  const handleClickCreditDebit = () => {
    setShowAllCreditDebits(true);
    setShowCreditByBroker(false);
    setShowDebitByPartner(false);
  };

  const handleClickCredit = () => {
    setShowAllCreditDebits(false);
    setShowCreditByBroker(true);
    setShowDebitByPartner(false);
  };

  const handleClickDebit = () => {
    setShowAllCreditDebits(false);
    setShowCreditByBroker(false);
    setShowDebitByPartner(true);
  };

  // Navigate to add creditDebit page
  const handleAddCreditDebitClick = () => {
    navigate(creditDebitsAddPath()); // Navigate to add creditDebit page
  };

  // JSX rendering
  return (
    <div className="bg-blue-200 md:p-7 p-2">
      <Paper elevation={3} style={{ padding: 30 }}>
        {/* Title */}
        <Typography className="text-safekaroDarkOrange" variant="h5">
          Transaction Table
        </Typography>
        {/* Breadcrumb and add button */}
        <Typography variant="h5" mb={2}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <Link
                to="/dashboard"
                className="text-addButton font-bold text-sm"
              >
                Dashboard /
              </Link>
              <span className="text-grey-600 text-sm"> Transactions</span>
            </div>
            <Button
              type="button"
              className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
              onClick={handleAddCreditDebitClick}
            >
              Add Transaction
            </Button>
          </div>
          {/* Divider */}
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>
        {/* Buttons for filtering creditDebits */}
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
        {/* Render components based on state */}
        {showAllCreditDebits && <AllCreditDebits />}
        {showCreditByBroker && <ViewCreditDebitByBrokerCard />}
        {showDebitByPartner && <ViewCreditDebitByPartnerCard />}
      </Paper>
    </div>
  );
};

export default CreditDebits;
