import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  CASE_TYPE_STORAGE_KEY,
  DAYJS_DISPLAY_FORMAT,
  header,
} from "../../../../context/constant";
import { ICaseTypeForm, ICaseTypes, ICaseTypesVM } from "../ICaseTypes";
import dayjs from "dayjs";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { caseTypesEditPath, caseTypesAddPath } from "../../../../sitemap";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import getCaseTypesService from "../../../../api/CaseType/GetCaseTypes/getCaseTypesService";
import editCaseTypeService from "../../../../api/CaseType/EditCaseType/editCaseTypeService";
import { convertICaseTypeVMToICaseTypeForm } from "../../../../api/CaseType/convertICaseTypeVMToICaseTypeForm";
import toast, { Toaster } from "react-hot-toast";
import {
  getPaginationState,
  savePaginationState,
} from "../../../../utils/PaginationHandler";
const CaseTypes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [caseTypes, setCaseTypes] = useState<ICaseTypes[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const handleAddCaseTypeClick = () => {
    savePaginationState(pagination, CASE_TYPE_STORAGE_KEY);
    navigate(caseTypesAddPath());
  };
  const forcedRenderCount =0;
 
  useEffect(() => {
    const p = getPaginationState(CASE_TYPE_STORAGE_KEY);
    setPagination(p);
  }, []);
  const columns = useMemo<MRT_ColumnDef<ICaseTypes>[]>(
    () => [
      {
        accessorKey: "caseType",
        header: "Case Type",
        size: 200,
      },
      {
        header: "Status",
        accessorKey: "isActive",
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue<boolean>();
          return value ? (
            <CheckCircleOutlineIcon color="success" />
          ) : (
            <CancelOutlinedIcon color="error" />
          );
        },
      },
      {
        header: "Created On",
        accessorKey: "createdOn",
        size: 50,
      },
      {
        header: "Updated On",
        accessorKey: "updatedOn",
        size: 50,
      },
    ],
    []
  );
  const parsedData = useMemo(
    () =>
      caseTypes.map(
        (caseType: ICaseTypes) =>
          ({
            id: caseType._id,
            caseType: caseType.caseType,
            isActive: caseType.isActive,
            createdOn: dayjs(caseType.createdOn).format(DAYJS_DISPLAY_FORMAT),
            updatedOn: dayjs(caseType.updatedOn).format(DAYJS_DISPLAY_FORMAT),
            forceUpdate: forcedRenderCount,
          } as ICaseTypesVM)
      ) ?? [],
    [caseTypes, forcedRenderCount]
  );
  const updateLoading = useCallback(async () => {
    setIsLoading(caseTypes.length >= 0 ? false : true);
  }, [caseTypes]);
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);
 
  const handleClickEditCaseType = (caseType: ICaseTypesVM) => {
    savePaginationState(pagination, CASE_TYPE_STORAGE_KEY);
    navigate(caseTypesEditPath(caseType.id!));
  };
 
  const GetCaseTypes = useCallback(
    () =>
      getCaseTypesService({ header })
        .then((caseTypesDetails) => {
          setCaseTypes(caseTypesDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        }),
    []
  );
  useEffect(() => {
    GetCaseTypes();
  }, [GetCaseTypes]);
  const callUpdateCaseTypeAPI = async (caseType: ICaseTypesVM) => {
    var convertCaseTypeVMToCaseTypeForm =
      convertICaseTypeVMToICaseTypeForm(caseType);
    const caseTypeData: ICaseTypeForm = {
      id: convertCaseTypeVMToCaseTypeForm.id,
      caseType: convertCaseTypeVMToCaseTypeForm.caseType,
      isActive: !convertCaseTypeVMToCaseTypeForm.isActive,
    };
    editCaseTypeService({ header, caseType: caseTypeData })
      .then((updatedCaseType) => {
        GetCaseTypes();
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      })
      .finally(() => {
        updateLoading();
      });
  };
  const handleClickChangeStatus = (caseType: ICaseTypesVM) => {
    callUpdateCaseTypeAPI(caseType);
  };
  return (
    <>
      <div className="h-full md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Case Type Table
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
                <span className="text-grey-600 text-sm"> Case Type</span>
              </div>
              {/* <Button
                type="button"
                className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                onClick={handleAddCaseTypeClick}
              >
                Add Case Type
              </Button> */}
            </div>
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <MaterialReactTable
           muiTablePaperProps={{
            sx: {
              boxShadow: "none", 
              backgroundColor: "transparent", 
            
            },
          }}
    
          muiTableContainerProps={{
            sx: {
              boxShadow: "none", 
              backgroundColor: "transparent", 
            },
          }}
            state={{ isLoading, pagination }}
            columns={columns}
            data={parsedData}
            onPaginationChange={setPagination}
            autoResetPageIndex={false}
            renderRowActions={({ row }) => (
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                {/* <Tooltip title={"Edit Case Type"}>
                  <IconButton
                    color="primary"
                    aria-label={"Edit Case Type"}
                    component="span"
                    onClick={() => {
                      handleClickEditCaseType(row.original as ICaseTypesVM);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-caseTypeButton"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </IconButton>
                </Tooltip> */}
                {/* <Tooltip title={"Change Status"}>
                  <IconButton
                    color="primary"
                    aria-label={"Change Status"}
                    component="span"
                    onClick={() =>
                      handleClickChangeStatus(row.original as ICaseTypesVM)
                    }
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
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </IconButton>
                </Tooltip> */}
              </div>
            )}
          />
        </Paper>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};
export default CaseTypes;
