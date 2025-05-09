import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  BRANCH_STORAGE_KEY,
  DAYJS_DISPLAY_FORMAT,
  header,
} from "../../../../context/constant";
import { IRankForm, IRanks, IRanksVM } from "../IRank";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { rankEditPath, rankAddPath } from "../../../../sitemap";
import dayjs from "dayjs";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import toast, { Toaster } from "react-hot-toast";
import {
  getPaginationState,
  savePaginationState,
} from "../../../../utils/PaginationHandler";
import { convertIRankVMToIRankForm } from "../../../../api/Rank/convertIRankVMToIRankForm";
import editRankService from "../../../../api/Rank/EditRank/editRankService";
import getRankService from "../../../../api/Rank/GetRank/getRankService";
const Ranks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ranks, setRanks] = useState<IRanks[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const handleAddRankClick = () => {
    savePaginationState(pagination, BRANCH_STORAGE_KEY);
    navigate(rankAddPath());
  };
  const GetRanks = useCallback(
    () =>
      getRankService({ header })
        .then((ranksDetails) => {
          setRanks(ranksDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        }),
    []
  );
  useEffect(() => {
    GetRanks();
  }, [GetRanks]);
  useEffect(() => {
    const p = getPaginationState(BRANCH_STORAGE_KEY);
    setPagination(p);
  }, []);
  const forcedRenderCount =0;
  
  const columns = useMemo<MRT_ColumnDef<IRanks>[]>(
    () => [
      {
        accessorKey: "rank",
        header: "Rank Name",
        size: 200,
      },
      {
        accessorKey: "count",
        header: "Policy Count",
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
      ranks.map(
        (rank: IRanks) =>
          ({
            id: rank._id,
            rank: rank.rank,
            count: rank.count,
            isActive: rank.isActive,
            createdOn: dayjs(rank.createdOn).format(DAYJS_DISPLAY_FORMAT),
            updatedOn: dayjs(rank.updatedOn).format(DAYJS_DISPLAY_FORMAT),
            forceUpdate: forcedRenderCount,
          } as IRanksVM)
      ) ?? [],
    [ranks, forcedRenderCount]
  );
  const updateLoading = useCallback(async () => {
    setIsLoading(ranks.length >= 0 ? false : true);
  }, [ranks]);
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);

  const handleClickEditRank = (rank: IRanksVM) => {
    savePaginationState(pagination, BRANCH_STORAGE_KEY);
    navigate(rankEditPath(rank.id!));
  };
 
  const callUpdateRankAPI = async (rank: IRanksVM) => {
    var convertRankVMToRankForm = convertIRankVMToIRankForm(rank);
    const rankData: IRankForm = {
      id: convertRankVMToRankForm.id,
      rank: convertRankVMToRankForm.rank,
      count: convertRankVMToRankForm.count,
      isActive: !convertRankVMToRankForm.isActive,
    };
    editRankService({ header, rank: rankData })
      .then((updatedRank) => {
        GetRanks();
      })
      .catch(async (error: any) => {
        const err = await error;
        toast.error(err.message);
      })
      .finally(() => {
        updateLoading();
      });
  };
  const handleClickChangeStatus = (rank: IRanksVM) => {
    callUpdateRankAPI(rank);
  };
  return (
    <>
      <div className="h-screen md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Rank Table
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
                <span className="text-grey-600 text-sm"> Rank</span>
              </div>
              {/* <Button
                type="button"
                className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                onClick={handleAddRankClick}
              >
                Add Rank
              </Button> */}
            </div>
            {}
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
            // enableRowActions
            // positionActionsColumn="last"
            onPaginationChange={setPagination}
            autoResetPageIndex={false}
            // renderRowActions={({ row }) => (
            //   <div style={{ display: "flex", flexWrap: "nowrap" }}>
            //     <Tooltip title={"Edit Rank"}>
            //       <IconButton
            //         color="primary"
            //         aria-label={"Edit Rank"}
            //         component="span"
            //         onClick={() => {
            //           handleClickEditRank(row.original as IRanksVM);
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
            //           handleClickChangeStatus(row.original as IRanksVM)
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
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};
export default Ranks;
