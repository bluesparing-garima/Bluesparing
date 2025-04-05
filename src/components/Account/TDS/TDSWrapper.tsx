import { FC } from "react";
import { TdsWrapper } from "./ITDS";
import { Paper, Typography } from "@mui/material";

const TDSWrapper: FC<TdsWrapper> = ({ children, title }) => {
  return (
    <>
      <div className=" md:p-7 p-2">
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

export default TDSWrapper;
