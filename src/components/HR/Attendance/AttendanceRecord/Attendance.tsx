import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IAttendanceData, IEmployee } from "../IAttendance";

import toast from "react-hot-toast";
import GetEmployeeDepartmentService from "../../../../api/HR/Attendance/GetEmpolyeeDepartment/GetEmployeeDepartmentService";
import { header, SafeKaroUser } from "../../../../context/constant";
import GetAttendanceDashboardService from "../../../../api/HR/Attendance/GetAttendanceDashboard/GetAttendanceDashboardService";
import AttendanceCard from "./AttendanceCard";
import { Link } from "react-router-dom";
const Attendance: React.FC = () => {
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [attendanceData, setAttendanceData] = useState<IAttendanceData>();
  const handleCategoryClick = (index: number, category: string) => {
    setSelectedCategoryIndex(index);
  };
  const fetchDepartments = async () => {
    try {
      const res = await GetEmployeeDepartmentService({ header });
      const data = res.roles?.filter(
        (ele: string) => ele.toLowerCase() !== "partner"
      );

      setDepartments(data);
    } catch (error) {
      toast.error("");
    }
  };
  const fetchEmployeeData = async () => {
    try {
      const res = await GetAttendanceDashboardService({ header });
      setAttendanceData(res.data);
      setEmployees(res.data["Account"]?.employees);
      setSelectedCategoryIndex(0);
    } catch (error) {
      toast.error("error");
    }
  };
  useEffect(() => {
    fetchEmployeeData();
    fetchDepartments();
  }, []);

  useEffect(() => {
    const filter: string = departments[selectedCategoryIndex];
    if (attendanceData) {
      const data = attendanceData[filter as keyof IAttendanceData]?.employees;
      setEmployees(data);
    }
  }, [selectedCategoryIndex, departments, attendanceData]);

  const calculateWidth = () => {
    const n = departments.length;
    const percentage = Math.floor(100 / n);
    return `${percentage}%`;
  };
  return (
    <Container className="bg-blue-200">
      {UserData.role.toLowerCase() === "hr" ||
      UserData.role.toLowerCase() === "admin" ? (
        <div className="bg-blue-200 h-screen">
          <div className="bg-blue-200 w-full mt-1">
            <div className="flex md:hidden flex-col  my-2 w-1/2 justify-start items-start">
              <span className="text-sm font-semibold font-satoshi">
                Select Department
              </span>
              <FormControl fullWidth>
                <Select
                  value={selectedCategoryIndex}
                  onChange={(e) => {
                    const selectedIndex = e.target.value as number; // Ensure it's treated as a number
                    handleCategoryClick(
                      selectedIndex,
                      departments[selectedIndex]
                    );
                  }}
                >
                  {departments.map((category, catIndex) => (
                    <MenuItem key={category} value={catIndex}>
                      <Tooltip title={`View ${category} Data`}>
                        <h2
                          className={`font-satoshi font-semibold text-center ${
                            catIndex === selectedCategoryIndex
                              ? "text-[#0095FF]"
                              : "text-black"
                          }`}
                        >
                          {category || "Unnamed Category"}
                        </h2>
                      </Tooltip>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Typography variant="h5" mb={2} ml={2}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <Link
                    to="/hr/dashboard"
                    className="text-addButton font-bold text-sm"
                  >
                    Dashboard /
                  </Link>
                  <span className="text-grey-600 text-sm"> Attendance</span>
                </div>
              </div>
            </Typography>
            <div className=" mb-3 hidden md:flex  w-full justify-between items-center bg-white">
              {departments.map((category, catIndex) => (
                <Grid
                  item
                  md={4}
                  key={category}
                  className={`p-1  flex items-center justify-center gap-x-3 w-[${calculateWidth()}]   ${
                    catIndex === selectedCategoryIndex
                      ? "bg-[#0095FF] shadow-md "
                      : "bg-white text-black"
                  }`}
                >
                  <Button
                    type="button"
                    onClick={() => handleCategoryClick(catIndex, category)}
                  >
                    <Tooltip title={`View ${category} Data`}>
                      <h2
                        className={` font-satoshi font-semibold text-center ${
                          catIndex === selectedCategoryIndex
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        {category || "Unnamed Category"}
                      </h2>
                    </Tooltip>
                  </Button>
                </Grid>
              ))}
            </div>
          </div>
          <Grid container spacing={4} justifyContent="center" mx="auto">
            {employees.map((employee) => {
              return <AttendanceCard employee={employee} />;
            })}
          </Grid>
        </div>
      ) : (
        <div>Access denied</div>
      )}
    </Container>
  );
};

export default Attendance;
