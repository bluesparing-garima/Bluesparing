import { useEffect, useMemo, useRef, useState } from "react";
import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  type MRT_ColumnDef,
} from "material-react-table";
import * as yup from "yup";
import Papa from "papaparse";
import {

  SafeKaroUser,

} from "../../../context/constant";
import {
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IHealthPolicy } from "../IHealth";
import { HealthColumns } from "./HealthColumns";
import GetHealthPolicyService from "../../../api/Health/GetHealthPolicy/GetHealthPolicyService";
import { FilterTypes } from "../../../api/Health/Endpoints";
import SearchHealthPolicyService from "../../../api/Health/SearchHealthPolicy/SearchHealthPolicyService";
import DynamicDateField from "../../../utils/ui/DynamicDateField";
import { Form } from "react-final-form";
import { setIn } from "final-form";
import dayjs from "dayjs";
import GetAllFilteredPolicyService from "../../../api/Health/GetAllFilteredPolicy/GetAllFilteredPolicyService";



// interface MenuIconButtonProps {
//   row: { original: IViewPolicy };
//   isAdmin?: boolean;
//   isAdminAction?: boolean;
//   onEdit?: () => void;
//   onDownload?: () => void;
//   onAdminView?: () => void;
//   onView?: () => void;
//   onDelete?: () => void;
//   onEditCommission?: () => void;
//   onViewCommission?: () => void;
//   onPayIn?: () => void;
//   onPayOut?: () => void;
//   onPublish?: () => void;
//   addRemark?: () => void;
// }

const GetHealthPolicies = () => {
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const startTime = sessionStorage.getItem("startDate");
  const endTime = sessionStorage.getItem("endDate");
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [data, setData] = useState<IHealthPolicy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const columns = useMemo<MRT_ColumnDef<IHealthPolicy>[]>(
    () => HealthColumns,
    [columnFilters, globalFilter, pagination, sorting],
  );

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
  const handleExportRows = async () => {
    const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
    const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
    const res = await GetAllFilteredPolicyService(startDate ?? startOfMonth, endDate ?? endOfMonth);
    if (res.status === "success") {

      const csv = Papa.unparse(res.data, { header: true });
      downloadCsv("health-policy.csv", csv);
    }

  };

  const validationSchema = yup.object().shape({
    startDate: yup.string().nullable().required("Start Date is required"),
    endDate: yup.string().nullable().required("End Date is required"),
  });
  const validate = validateFormValues(validationSchema);
  const fetchData = async (q: FilterTypes, sortBy?: string, order?: string) => {
    try {
      setIsLoading(true);
      const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
      const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
      const limit = pagination.pageSize;
      const page = pagination.pageIndex + 1;
      sortBy = sortBy ?? "createdBy";
      order = order ?? "desc";
      if (!startDate) {
        q['issueDate'] = startOfMonth;
      } else {
        q['issueDate'] = dayjs(startDate).format('YYYY-MM-DD');
      }

      if (!endDate) {
        q['endDate'] = endOfMonth;
      } else {
        q['endDate'] = dayjs(endDate).format('YYYY-MM-DD');
      }
      const res = await GetHealthPolicyService(limit, page, sortBy, q, order);
      setData(res.data);
    } catch (error: any) {
      toast.error(error.message || "Error while fetching data")
    } finally {
      setIsLoading(false);
    }
  }


  const callSearchApi = async (q: string) => {
    try {
      setIsLoading(true)
      const res = await SearchHealthPolicyService(q);
      setData(res.data);
    } catch (error: any) {
      toast.error(error.message || "Error while searching data")
    } finally {
      setIsLoading(false);
    }
  }
  const onSubmit = async () => {
    fetchData({})
  }
  useEffect(() => {
    const colFilter: { [key: string]: any } = {};
    columnFilters.forEach((ele) => {
      colFilter[ele.id as string] = ele.value;
    });

    fetchData(colFilter)
  }, [columnFilters, pagination, sorting])

  useEffect(() => {
    if (globalFilter) {
      callSearchApi(globalFilter)
    } else {
      fetchData({})
    }
  }, [globalFilter])
  const handleStartDateChange = (startDate: any) => {
    setStartDate(startDate);
  }
  const handleEndDateChange = (endDate: any) => {
    setEndDate(endDate);
  }
  const handleClearDateFilter = (form: any) => {
    form.change('startDate', undefined);
    form.change('endDate', undefined);
    fetchData({})
  };

  return (
    <>
      <div className=" md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Health Policies Table
          </Typography>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to="/dashboard"
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm"> Health Policies</span>
              </div>
              {userData.role.toLowerCase() === "admin" ||
                userData.role.toLowerCase() === "booking" ||
                userData.role.toLowerCase() === "account" ? (
                <Link
                to={"/policy/health/add"}
                  type="button"
                

                  className="btnGradient text-black px-4 py-3 rounded-md w-full sm:w-auto"
                >
                  <span className="text-[10px] md:text-xs ">
                    Add Health Policies
                  </span>
                </Link>
              ) : (
                ""
              )}
            </div>
            <Form
              validate={validate}
              onSubmit={onSubmit}
              render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <DynamicDateField
                      name="startDate"
                      label="Start Date"
                      disableFuture
                      onChangeDate={(date) => {
                        handleStartDateChange(date);
                      }}
                      gridProps={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                    />
                    <DynamicDateField
                      name="endDate"
                      label="End Date"
                      onChangeDate={(date) => {
                        handleEndDateChange(date);
                      }}
                      gridProps={{ lg: 3, md: 3, sm: 6, xs: 12 }}
                    />
                    <Grid item lg={2} md={2} sm={6} xs={12}>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        variant="contained"
                        color="primary"
                        className="btnGradient text-black px-4 py-2.5 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
                      >
                        {isLoading ? "Getting..." : "Get Records"}
                      </Button>

                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                      <Button
                        disabled={isLoading}
                        variant="contained"
                        onClick={() => handleClearDateFilter(form)}
                        color="primary"
                        className="btnGradient text-black px-4 py-2.5 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
                      >
                        Clear Filter
                      </Button>

                    </Grid>
                  </Grid>
                </form>
              )}
            />
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <MaterialReactTable
            columns={columns}
            data={data}
            state={{
              isLoading,
              globalFilter: globalFilter?.trim(),
              pagination, columnFilters
            }}
            onPaginationChange={setPagination}
            manualFiltering
            manualPagination
            manualSorting
            onColumnFiltersChange={setColumnFilters}
            onGlobalFilterChange={setGlobalFilter}
            onSortingChange={setSorting}
            renderTopToolbarCustomActions={({ table }) => (
              <>
                <Button
                  className="btnGradient text-black px-4 py-2.5 m-2 rounded-md w-full sm:w-auto text-[10px] md:text-xs"
                  disabled={table.getRowModel().rows.length === 0}
                  onClick={() => handleExportRows()}
                >
                  Export Filter Data
                </Button>
              </>
            )}
          />
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />

    </>
  );
};
export default GetHealthPolicies;
