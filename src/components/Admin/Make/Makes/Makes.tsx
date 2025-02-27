import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  DAYJS_DISPLAY_FORMAT,
  header,
  MAKE_STORAGE_KEY,
} from "../../../../context/constant";
import { IMakeForm, IMakes, IMakesVM } from "../IMake";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { makeAddPath, makeEditPath } from "../../../../sitemap";
import dayjs from "dayjs";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import getMakesService from "../../../../api/Make/GetMakes/getMakesService";
import { convertIMakeVMToIMakeForm } from "../../../../api/Make/convertIMakeVMToIMakeForm";
import editMakeService from "../../../../api/Make/EditMake/editMakeService";
import toast, { Toaster } from "react-hot-toast";
import {
  getPaginationState,
  savePaginationState,
} from "../../../../utils/PaginationHandler";
const Makes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [makeData, setMakes] = useState<IMakes[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const handleAddMakeClick = () => {
    savePaginationState(pagination, MAKE_STORAGE_KEY);
    navigate(makeAddPath());
  };
  const GetMakes = useCallback(
    () =>
      getMakesService({ header })
        .then((makesDetails) => {
          setMakes(makesDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        }),
    []
  );
  useEffect(() => {
    const p = getPaginationState(MAKE_STORAGE_KEY);
    setPagination(p);
  }, []);
  useEffect(() => {
    GetMakes();
  }, [GetMakes]);
  const callUpdateMakeAPI = async (make: IMakesVM) => {
    var convertMakeVMToMakeForm = convertIMakeVMToIMakeForm(make);
    const makeData: IMakeForm = {
      ...convertMakeVMToMakeForm,
      isActive: !convertMakeVMToMakeForm.isActive,
    };
    editMakeService({ header, make: makeData })
      .then(() => {
        GetMakes();
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      })
      .finally(() => {
        updateLoading();
      });
  };
  const handleClickChangeStatus = (make: IMakesVM) => {
    callUpdateMakeAPI(make);
  };
  const forcedRenderCount = 0;
  const columns = useMemo<MRT_ColumnDef<IMakes>[]>(
    () => [
      {
        accessorKey: "makeName",
        header: "Make Name",
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
    ],
    []
  );
  const parsedData = useMemo(
    () =>
      makeData.map(
        (make: IMakes) =>
          ({
            id: make._id,
            makeName: make.makeName,
            isActive: make.isActive,
            createdOn: dayjs(make.createdOn).format(DAYJS_DISPLAY_FORMAT),
            updatedOn: dayjs(make.updatedOn).format(DAYJS_DISPLAY_FORMAT),
            forceUpdate: forcedRenderCount,
          } as IMakesVM)
      ) ?? [],
    [makeData, forcedRenderCount]
  );
  const updateLoading = useCallback(async () => {
    setIsLoading(makeData.length >= 0 ? false : true);
  }, [makeData]);
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);
  const handleClickEditMake = (make: IMakesVM) => {
    savePaginationState(pagination, MAKE_STORAGE_KEY);
    navigate(makeEditPath(make.id!));
  };
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Make Table
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
                <span className="text-grey-600 text-sm"> Make</span>
              </div>
              {/* <Button
                type="button"
                className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                onClick={handleAddMakeClick}
              >
                Add Make
              </Button> */}
            </div>
           
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <MaterialReactTable
            state={{ isLoading, pagination }}
            columns={columns}
            data={parsedData}
            // enableRowActions
            // positionActionsColumn="last"
            onPaginationChange={setPagination}
            autoResetPageIndex={false}
            // renderRowActions={({ row }) => (
            //   <div style={{ display: "flex", flexWrap: "nowrap" }}>
            //     <Tooltip title={"Edit Make"}>
            //       <IconButton
            //         color="primary"
            //         aria-label={"Edit Make"}
            //         component="span"
            //         onClick={() => {
            //           handleClickEditMake(row.original as IMakesVM);
            //         }}
            //       >
            //         <svg
            //           xmlns="http://www.w3.org/2000/svg"
            //           fill="none"
            //           viewBox="0 0 24 24"
            //           strokeWidth="1.5"
            //           stroke="currentColor"
            //           className="size-5 text-addButton"
            //         >
            //           <path
            //             strokeLinecap="round"
            //             strokeLinejoin="round"
            //             d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            //           />
            //         </svg>
            //       </IconButton>
            //     </Tooltip>
            //     <Tooltip title={"Change Status"}>
            //       <IconButton
            //         color="primary"
            //         aria-label={"Change Status"}
            //         component="span"
            //         onClick={() =>
            //           handleClickChangeStatus(row.original as IMakesVM)
            //         }
            //       >
            //         <svg
            //           xmlns="http://www.w3.org/2000/svg"
            //           fill="none"
            //           viewBox="0 0 24 24"
            //           strokeWidth="1.5"
            //           stroke="currentColor"
            //           className="size-5 text-addButton"
            //         >
            //           <path
            //             strokeLinecap="round"
            //             strokeLinejoin="round"
            //             d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            //           />
            //         </svg>
            //       </IconButton>
            //     </Tooltip>
            //   </div>
            // )}
          />
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default Makes;
