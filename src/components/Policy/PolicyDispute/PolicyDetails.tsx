import React, { FC } from "react";
import { PolicyDetailsProps } from "./IPolicyDispute";
import { Grid } from "@mui/material";
const PolicyDetails: FC<PolicyDetailsProps> = (p) => {
  function camelToTitleCase(camelCaseStr: string) {
    return camelCaseStr
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  }
  return (
    <div>
      <span className="text-safekaroDarkOrange font-satoshi font-medium">
        Policy Details
      </span>
      <hr />
      <Grid container spacing={2}>
        {Object.keys(p).map((ele) => {
          if (!p[ele as keyof PolicyDetailsProps]) return null;
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
                {p[ele as keyof PolicyDetailsProps]}
              </span>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
export default PolicyDetails;
