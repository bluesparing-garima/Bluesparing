import { FC, useEffect } from "react";

import { Button, Paper, Tooltip, Typography } from "@mui/material";
import { PolicyDisputeWrapperProps } from "./IPolicyDispute";

const PolicyDisputeWrapper: FC<PolicyDisputeWrapperProps> = ({
  children,
  title,
  btnHandler,
  btnTxt,
  isDispute,
}) => {
  const btnText = "Close Dispute";
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  className="text-safekaroDarkOrange font-satoshi"
                  gutterBottom
                  display="inline"
                >
                  {title}
                </Typography>
              </div>
              {isDispute && (
                <Tooltip title={`${btnText}`}>
                  <Button
                    variant="outlined"
                    color={`${isDispute ? "error" : "primary"}`}
                    onClick={btnHandler}
                  >
                    {btnText}
                  </Button>
                </Tooltip>
              )}
            </div>

            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          {children}
        </Paper>
      </div>
    </>
  );
};

export default PolicyDisputeWrapper;
