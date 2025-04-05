import { useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { creditDebitsAddPath } from "../../../../sitemap";
import AllCreditDebits from "./AllCreditDebits";
import ViewCreditDebitByBrokerCard from "../ViewCreditDebitByBroker/ViewCreditDebitByBrokerCard";
import ViewCreditDebitByPartnerCard from "../ViewCreditDebitByPartner/ViewCreditDebitByPartnerCard";
const CreditDebits = () => {
  const navigate = useNavigate();
  const [showAllCreditDebits, setShowAllCreditDebits] = useState(true);
  const [showCreditByBroker, setShowCreditByBroker] = useState(false);
  const [showDebitByPartner, setShowDebitByPartner] = useState(false);
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
  const handleAddCreditDebitClick = () => {
    navigate(creditDebitsAddPath());
  };
  return (
    <div className="md:p-7 p-2">
      <Paper elevation={3} style={{ padding: 30 }}>
        <Typography className="text-safekaroDarkOrange" variant="h5">
          Transaction Table
        </Typography>

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
  className="btnGradient text-black px-4 py-3 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
  onClick={handleAddCreditDebitClick}
>
  Add Transaction
</Button>

          </div>

          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <Grid container spacing={1}>
  <Grid item>
    <Button
      type="button"
      className="btnGradient text-black px-4 py-1.5 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
      onClick={handleClickCreditDebit}
    >
      All
    </Button>
  </Grid>

  <Grid item>
    <Button
      type="button"
      className="btnGradient text-black px-4 py-1.5 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
      onClick={handleClickCredit}
    >
      Credit
    </Button>
  </Grid>

  <Grid item>
    <Button
      type="button"
      className="btnGradient text-black px-4 py-1.5 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
      onClick={handleClickDebit}
    >
      Debit
    </Button>
  </Grid>
</Grid>



        {showAllCreditDebits && <AllCreditDebits />}
        {showCreditByBroker && <ViewCreditDebitByBrokerCard />}
        {showDebitByPartner && <ViewCreditDebitByPartnerCard />}
      </Paper>
    </div>
  );
};
export default CreditDebits;
