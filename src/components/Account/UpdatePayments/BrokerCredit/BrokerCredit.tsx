import { Typography, Paper, Button } from "@mui/material";
import BrokerCreditForm from "./BrokerCreditForm";
import { accountsBrokerPaymentPath } from "../../../../sitemap";
import { useNavigate } from "react-router-dom";
const BrokerCredit = () => {
  const title = "Broker PayIn Distribution";
  const navigate = useNavigate();
  const handleClickDistribution = () => {
    navigate(accountsBrokerPaymentPath());
  };
  return (
    <>
      <div className="md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  className="text-safekaroDarkOrange"
                  gutterBottom
                  display="inline"
                >
                  {title}
                </Typography>
              </div>
              <Button
  type="button"
  className="btnGradient text-black px-4 py-2 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
  onClick={handleClickDistribution}
>
  Distribution Change
</Button>

            </div>
            {/* Divider */}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>

          <BrokerCreditForm
            initialValues={{
              id: "",
              accountCode: "",
              accountId: "",
              accountType: "PayIn",
              type: "Credit",
              amount: 0,
              brokerId: "",
              brokerName: "",
              partnerId: "",
              partnerName: "",
              startDate: "",
              distributedDate: "",
              endDate: "",
              policyNumber: "",
              remarks: "",
              isActive: true,
              createdBy: "",
            }}
          />
        </Paper>
      </div>
    </>
  );
};

export default BrokerCredit;
