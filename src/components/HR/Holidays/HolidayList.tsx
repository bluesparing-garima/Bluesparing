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
import { Link, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import { toast, Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import { DAY_FORMAT, header, SafeKaroUser } from "../../../context/constant";
import GetHolidaysYearlyService from "../../../api/HR/Holidays/GetHolidaysYearly/GetHolidaysYearlyService";
import { Holiday } from "./IHolidayForm";
import DeleteHolidayService from "../../../api/HR/Holidays/DeleteHoliday/DeleteHolidayService";
import { setIn } from "final-form";
import * as yup from "yup";
import { Field, Form } from "react-final-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GetHolidaysDateFilterService from "../../../api/HR/Holidays/GetHolidaysDateFilter/GetHolidaysDateFilterService";
const HolidaysList: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const navigate = useNavigate();
  const handleAddHolidayClick = () => {
    navigate("/hr/add-holiday");
  };
  const isAccessAction = () => {
    const role = UserData.role.toLowerCase();
    if (role === "hr") {
      return true;
    } else {
      return false;
    }
  };
  const generateDashBoardLink = () => {
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
      case "it":
        return "/it/dashboard";
      default:
        return "/hr/dashboard";
    }
  };
  const downloadCsv = (filename: string, csv: string) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const handleExportRows = (rows: any[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = Papa.unparse(rowData, { header: true });
    downloadCsv("exported-rows.csv", csv);
  };
  const columns = useMemo<MRT_ColumnDef<Holiday>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Holiday Name",
        size: 200,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 100,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue() as string;
          return dayjs(dateValue).format("MM/DD/YYYY");
        },
      },
      {
        accessorKey: "day",
        header: " Day",
        size: 200,
      },
    ],
    []
  );
  const handleClickEditHoliday = (holiday: Holiday) => {
    navigate(`/hr/edit-holiday/${holiday._id}`, { state: { holiday } });
  };
  const fetchAllHolidays = async () => {
    try {
      const res = await GetHolidaysYearlyService({ header });
      setHolidays(res.formattedHolidays);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  const handleClickDeleteHoliday = async (holiday: Holiday) => {
    setIsLoading(true);
    try {
      await DeleteHolidayService({ header, id: holiday._id });
      setHolidays((prev) => prev.filter((h) => h._id !== holiday._id));
      toast.success("Holiday deleted successfully");
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllHolidays();
  }, []);
  const validateFormValues = (schema: any) => async (values: any) => {
    if (typeof schema === "function") {
      schema = schema();
    }
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
  const onSubmit = async (filterForm: any) => {
    const startDate = dayjs(filterForm.startDate).format(DAY_FORMAT);
    const endDate = dayjs(filterForm.endDate).format(DAY_FORMAT);
    try {
      const res = await GetHolidaysDateFilterService({
        header,
        startDate,
        endDate,
      });
      if (res) {
        setHolidays(res.formattedHolidays);
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err);
    }
  };
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Holiday Table
          </Typography>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to={generateDashBoardLink()}
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm"> Holidays</span>
              </div>
              {isAccessAction() && (
                <Button
                  type="button"
                  className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                  onClick={handleAddHolidayClick}
                >
                  Add Holiday
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
                    {}
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
                    {}
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
                    {}
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
          <MaterialReactTable
            state={{ isLoading, pagination }}
            columns={columns}
            data={holidays}
            enableRowActions={isAccessAction()}
            onPaginationChange={setPagination}
            autoResetPageIndex={false}
            positionActionsColumn="last"
            renderRowActions={({ row }) => (
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Tooltip title={"Edit Holiday"}>
                  <IconButton
                    color="primary"
                    onClick={() => handleClickEditHoliday(row.original)}
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Delete Holiday"}>
                  <IconButton
                    color="secondary"
                    onClick={() => handleClickDeleteHoliday(row.original)}
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
            )}
            renderTopToolbarCustomActions={({ table }) => (
              <>
                <Button
                  className="text-white bg-safekaroDarkOrange m-2 p-2"
                  disabled={table.getRowModel().rows.length === 0}
                  onClick={() =>
                    handleExportRows(table.getFilteredRowModel().rows)
                  }
                >
                  Export Filter Data
                </Button>
              </>
            )}
          />
        </Paper>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};
export default HolidaysList;
