import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import { DAY_FORMAT, header, SafeKaroUser } from "../../../../context/constant";
import { IAttendance } from "../IAttendnace";
import * as yup from "yup";
import { setIn } from "final-form";
import { Field, Form } from "react-final-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GetAttendanceByEmployeeService from "../../../../api/HR/Attendance/GetAttendanceByEmployeeId/GetAttendanceByEmployeeService";
import DeleteAttendanceService from "../../../../api/HR/Attendance/DeleteAttendance/DeleteHolidayService";
import AttendanceByDateFilterService from "../../../../api/HR/Attendance/AttendanceByDateFilter/AttendanceByDateFilterService";

const EmployeeAttendance: React.FC = () => {
  const { employeeId } = useParams();
  const [attendanceRecords, setAttendanceRecords] = useState<IAttendance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [hasTodayRecord, setHasTodayRecord] = useState(false);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const navigate = useNavigate();

  const handleAddAttendanceClick = () => {
    const attendance: IAttendance = {
      employeeId: employeeId,
      employeeName: attendanceRecords[0]?.employeeName,
    };
    navigate("/hr/add-attendance", { state: { attendance } });
  };

  const columns = useMemo<MRT_ColumnDef<IAttendance>[]>(
    () => [
      {
        accessorKey: "attendanceType",
        header: "Attendance Type",
        size: 100,
      },
      {
        accessorKey: "inTime",
        header: "In Time",
        size: 100,
      },
      {
        accessorKey: "outTime",
        header: "Out Time",
        size: 100,
      },
      {
        accessorKey: "totalHours",
        header: "Total Hours",
        size: 150,
      },
      {
        accessorKey: "createdOn",
        header: "Date",
        size: 200,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue() as string;
          return dayjs(dateValue).format("DD/MM/YYYY");
        },
      },
      {
        accessorKey: "isActive",
        header: "Active",
        size: 100,
        Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
      },
      {
        accessorKey: "remarks",
        header: "Remarks",
        size: 100,
      },
    ],
    []
  );

  const checkIsTodayRecord = (recordDate: string): boolean => {
    const now = dayjs().startOf("day");
    const attendanceDate = dayjs(recordDate).startOf("day");
    if (UserData.role.toLowerCase() !== "hr") {
      return now.isSame(attendanceDate);
    }
    return true;
  };

  const fetchAllAttendanceRecords = async () => {
    setIsLoading(true);
    if (employeeId) {
      try {
        const res = await GetAttendanceByEmployeeService({
          header,
          employeeId,
        });
        setAttendanceRecords(res.data);
        const now = dayjs().format("DD/MM/YYYY");
        const isIn = res.data.some(
          (ele: IAttendance) =>
            dayjs(ele.createdOn).format("DD/MM/YYYY") === now
        );
        setHasTodayRecord(isIn);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const onSubmit = async (filterForm: any) => {
    const startDate = dayjs(filterForm.startDate).format(DAY_FORMAT);
    const endDate = dayjs(filterForm.endDate).format(DAY_FORMAT);
    try {
      const res = await AttendanceByDateFilterService({
        header,
        startDate,
        endDate,
        emId: employeeId!,
      });
      if (res.status === "success") {
        setAttendanceRecords(res.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const validateFormValues = (schema: any) => async (values: any) => {
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (err: any) {
      const errors = err.inner.reduce((formError: any, innerError: any) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {});
      return errors;
    }
  };

  const validationSchema = yup.object().shape({
    startDate: yup.string().nullable().required("Start Date is required"),
    endDate: yup.string().nullable().required("End Date is required"),
  });

  const validate = validateFormValues(validationSchema);

  const handleClickDeleteAttendance = async (attendance: IAttendance) => {
    setIsLoading(true);
    try {
      await DeleteAttendanceService({ header, id: attendance._id! });
      setAttendanceRecords((prev) =>
        prev.filter((a) => a._id !== attendance._id)
      );
      toast.success("Attendance deleted successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickEditAttendance = (attendance: IAttendance) => {
    navigate(`/hr/edit-attendance/${attendance._id}`, {
      state: { attendance },
    });
  };
  useEffect(() => {
    fetchAllAttendanceRecords();
    // eslint-disable-next-line
  }, []);

  const generateDashBoardlink = () => {
    const role = UserData.role.toLowerCase();
    switch (role) {
      case "hr":
        return "/hr/dashboard";
      case "booking":
        return "/bookingdashboard";
      case "account":
        return "/accountdashboard";
      case "operation":
        return "/operationdashboard";
      case "rm":
        return "/rm/dashboard";
      default:
        return "/hr/dashboard";
    }
  };
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Attendance Records of {attendanceRecords[0]?.employeeName}
          </Typography>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to={generateDashBoardlink()}
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm"> Attendance</span>
              </div>
              {(!hasTodayRecord || attendanceRecords.length <= 0) && (
                <Button
                  type="button"
                  className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                  onClick={handleAddAttendanceClick}
                >
                  Add Attendance
                </Button>
              )}
            </div>
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>

          <div className="mb-2">
            <Form
              validate={validate}
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, errors }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    {/* Start Date Field */}
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Field name="startDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="Start Date"
                              value={input.value ? dayjs(input.value) : null}
                              onChange={(newValue) => {
                                input.onChange(
                                  newValue ? newValue.toISOString() : null
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  {...params}
                                  error={meta.touched && !!meta.error}
                                  helperText={meta.touched && meta.error}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        )}
                      </Field>
                    </Grid>

                    {/* End Date Field */}
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Field name="endDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="End Date"
                              value={input.value ? dayjs(input.value) : null}
                              onChange={(newValue) => {
                                input.onChange(
                                  newValue ? newValue.toISOString() : null
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  {...params}
                                  error={meta.touched && !!meta.error}
                                  helperText={meta.touched && meta.error}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        )}
                      </Field>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Button
                        type="submit"
                        disabled={submitting}
                        variant="contained"
                        color="primary"
                        className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                      >
                        Get Records
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </div>

          {/* Attendance Records Table */}
          <MaterialReactTable
            state={{ isLoading, pagination }}
            columns={columns}
            data={attendanceRecords}
            enableRowActions={UserData.role.toLowerCase() === "hr"}
            onPaginationChange={setPagination}
            autoResetPageIndex={false}
            positionActionsColumn="last"
            renderRowActions={({ row }) => {
              const isTodayRecord = checkIsTodayRecord(row.original.createdOn!);
              return isTodayRecord ? (
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <Tooltip title="Edit Attendance">
                    <IconButton
                      color="primary"
                      onClick={() => handleClickEditAttendance(row.original)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 text-addButton"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Attendance">
                    <IconButton
                      color="secondary"
                      onClick={() => handleClickDeleteAttendance(row.original)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 text-red-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </IconButton>
                  </Tooltip>
                </div>
              ) : null;
            }}
          />
        </Paper>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default EmployeeAttendance;
