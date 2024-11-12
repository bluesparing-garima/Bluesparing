import { Typography, Paper, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PayOutUploadByExcelData from "./payOutUploadByExcelData";
import PayInUploadByExcelData from "./PayInUploadByExcelData";
const ViewPercentage = () => {
  const title = "View Percentage";
  const [isLoading, setIsLoading] = useState(true);
  const [excelUploaded, setExcelUploaded] = useState(false);
  const handleClickPayIn = () => {
    setIsLoading(true);
  };
  const handleClickPayOut = () => {
    setIsLoading(false);
  };
  const handleChangeUploadExcel = () => {
    setExcelUploaded(true);
  };
  useEffect(() => {
    if (excelUploaded) {
      setExcelUploaded(false);
    }
  }, [excelUploaded]);
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography
            variant="h5"
            className="text-safekaroDarkOrange"
            gutterBottom
            display="inline"
          >
            {title}
          </Typography>
          <Typography variant="h5" mb={2}>
            <Link to="/dashboard" className="text-addButton font-bold text-sm">
              Dashboard {" / "}
            </Link>
            <span className="text-grey-600 text-sm">{title}</span>
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <Grid container>
            <Button
              type="button"
              className="w-26 h-8 ml-4 bg-addButton text-white p-3 text-xs rounded-sm"
              onClick={handleClickPayIn}
            >
              PayIn
            </Button>
            <Button
              type="button"
              className="w-26 h-8 ml-4 bg-addButton text-white p-3 text-xs rounded-sm"
              onClick={handleClickPayOut}
            >
              Pay Out
            </Button>
          </Grid>
          {isLoading ? (
            <PayInUploadByExcelData onExcelUploaded={handleChangeUploadExcel} />
          ) : (
            <PayOutUploadByExcelData
              onExcelUploaded={handleChangeUploadExcel}
            />
          )}
        </Paper>
      </div>
    </>
  );
};
export default ViewPercentage;
