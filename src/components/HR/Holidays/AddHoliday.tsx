import { Typography, Paper } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {  SafeKaroUser } from "../../../context/constant";
import { HolidayLocationState } from "./IHolidayForm";
import AddHolidayForm from "./AddHolidayForm";
const AddHoliday = () => {
  const location = useLocation();
  const state = location.state as HolidayLocationState;
  const holiday = state?.holiday;
  const isAdd = !holiday;
  const title = isAdd ? "Add Holiday" : "Update Holiday";
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  return (
    <>
      {UserData.role.toLowerCase() === "hr" ? (
        <div className="bg-blue-200 md:p-7 p-2">
          <Paper
            elevation={3}
            style={{ padding: 20, margin: 30, borderRadius: 10 }}
          >
            <Typography className="text-safekaroDarkOrange" variant="h5">
              {title}
            </Typography>
            <Typography variant="h5" mb={2}>
              <Link
                to="/hr/dashboard"
                className="text-addButton font-bold text-sm"
              >
                Dashboard {" / "}
              </Link>
              <Link
                to="/hr/holidays"
                className="text-addButton font-bold text-sm"
              >
                Holidays /
              </Link>
              <span className="text-grey-600 text-sm"> {title}</span>
              <hr
                className="mt-4"
                style={{ width: "100%", borderColor: "grey-800" }}
              />
            </Typography>
            <AddHolidayForm
              initialValues={{
                id: isAdd ? "" : holiday._id || "",
                name: isAdd ? "" : holiday.name || "",
                date: isAdd ? "" : holiday.date || "",
                day: isAdd ? "" : holiday.day || "",
                createdBy: "HR",
              }}
            />
          </Paper>
        </div>
      ) : (
        <div>Access denied</div>
      )}
    </>
  );
};
export default AddHoliday;
