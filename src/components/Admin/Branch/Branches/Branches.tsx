import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  BRANCH_STORAGE_KEY,
  DAYJS_DISPLAY_FORMAT,
  header,
} from "../../../../context/constant";
import { IBranchForm, IBranches, IBranchesVM } from "../IBranch";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { branchEditPath, branchAddPath } from "../../../../sitemap";
import dayjs from "dayjs";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import getBranchesService from "../../../../api/Branch/GetBranches/getBranchesService";
import editBranchService from "../../../../api/Branch/EditBranch/editBranchService";
import { convertIBranchVMToIBranchForm } from "../../../../api/Branch/convertIBranchVMToIBranchForm";
import {
  getPaginationState,
  savePaginationState,
} from "../../../../utils/PaginationHandler";
import OverlayError from "../../../../utils/ui/OverlayError";
import OverlayLoader from "../../../../utils/ui/OverlayLoader";
const Branches = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState<IBranches[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const handleAddBranchClick = () => {
    savePaginationState(pagination, BRANCH_STORAGE_KEY);
    navigate(branchAddPath());
  };
  const GetBranches = () => {
    setIsLoading(true);
    getBranchesService({ header })
      .then((branchesDetails) => {
        setBranches(branchesDetails.data);
      })
      .catch(async (error) => {
        const err = await error;
        setErrMsg(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onClose = () => {
    setErrMsg("")
  }
  useEffect(() => {
    GetBranches();
    const p = getPaginationState(BRANCH_STORAGE_KEY);
    setPagination(p);
  }, []);


  const forcedRenderCount = 0;

  const columns = useMemo<MRT_ColumnDef<IBranches>[]>(
    () => [
      {
        accessorKey: "branchName",
        header: "Branch Name",
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return <span className="capitalize">{value}</span>
        },
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
    ],
    []
  );
  const parsedData = useMemo(
    () =>
      branches.map(
        (branch: IBranches) =>
        ({
          id: branch._id,
          branchName: branch.branchName,
          isActive: branch.isActive,
          createdOn: dayjs(branch.createdOn).format(DAYJS_DISPLAY_FORMAT),
          updatedOn: dayjs(branch.updatedOn).format(DAYJS_DISPLAY_FORMAT),
          forceUpdate: forcedRenderCount,
        } as IBranchesVM)
      ) ?? [],
    [branches, forcedRenderCount]
  );

  const handleClickEditBranch = (branch: IBranchesVM) => {
    savePaginationState(pagination, BRANCH_STORAGE_KEY);
    navigate(branchEditPath(branch.id!));
  };

  const callUpdateBranchAPI = async (branch: IBranchesVM) => {
    var convertBranchVMToBranchForm = convertIBranchVMToIBranchForm(branch);
    const branchData: IBranchForm = {
      id: convertBranchVMToBranchForm.id,
      branchName: convertBranchVMToBranchForm.branchName,
      isActive: !convertBranchVMToBranchForm.isActive,
    };
    setIsLoading(true);
    editBranchService({ header, branch: branchData })
      .then((updatedBranch) => {
        GetBranches();
      })
      .catch(async (error: any) => {
        const err = await error;
        setErrMsg(err.message)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleClickChangeStatus = (branch: IBranchesVM) => {
    callUpdateBranchAPI(branch);
  };
  return (
    <>
      <div className="h-screen md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Branch Table
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
                <span className="text-grey-600 text-sm"> Branch</span>
              </div>
              <Button
                type="button"
                className="btnGradient text-black px-4 py-2 text-xs sm:text-sm rounded-sm w-full sm:w-auto"
                onClick={handleAddBranchClick}
              >
                Add Branch
              </Button>

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
            enableRowActions
            positionActionsColumn="last"
            onPaginationChange={setPagination}
            autoResetPageIndex={false}
            renderRowActions={({ row }) => (
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Tooltip title={"Edit Branch"}>
                  <IconButton
                    color="primary"
                    aria-label={"Edit Branch"}
                    component="span"
                    onClick={() => {
                      handleClickEditBranch(row.original as IBranchesVM);
                    }}
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
                <Tooltip title={"Change Status"}>
                  <IconButton
                    color="primary"
                    aria-label={"Change Status"}
                    component="span"
                    onClick={() =>
                      handleClickChangeStatus(row.original as IBranchesVM)
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
                </Tooltip>
              </div>
            )}
          />
        </Paper>
        {
          errMsg && <OverlayError title="Failed" onClose={onClose} msg={errMsg} />
        }
        {
          isLoading && <OverlayLoader />
        }

      </div>
    </>
  );
};
export default Branches;
