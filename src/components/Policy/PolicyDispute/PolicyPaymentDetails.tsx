import React, { FC } from "react";
import { PolicyPaymentsProps } from "./IPolicyDispute";
import { Grid } from "@mui/material";

const PolicyPaymentDetails: FC<PolicyPaymentsProps> = (p) => {
  function camelToTitleCase(camelCaseStr: string) {
    return camelCaseStr
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  }
  return (
    <div className="my-2">
      <span className="text-safekaroDarkOrange font-satoshi font-medium">
        Policy Payment Details
      </span>
      <hr />
      <Grid container spacing={2}>
        {Object.keys(p).map((ele) => {
          if (!p[ele as keyof PolicyPaymentsProps] || ele === "policyType")
            return null;
          return (
            <Grid
              item
              lg={3}
              md={3}
              sm={6}
              xs={6}
              key={ele}
              className="flex flex-col justify-center items-start"
            >
              <span className="text-sm  font-medium">
                {camelToTitleCase(ele)}
              </span>
              <span className="text-sm">
                {p[ele as keyof PolicyPaymentsProps]}
              </span>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default PolicyPaymentDetails;
