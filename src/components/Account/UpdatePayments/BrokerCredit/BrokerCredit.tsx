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
      <div className="bg-blue-200 md:p-7 p-2">
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
                className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
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
