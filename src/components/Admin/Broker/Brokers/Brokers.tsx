import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  BROKER_STORAGE_KEY,
  DAYJS_DISPLAY_FORMAT,
  header,
} from "../../../../context/constant";
import { IBrokerForm, IBrokers, IBrokersVM } from "../IBroker";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { brokerEditPath, brokerAddPath } from "../../../../sitemap";
import dayjs from "dayjs";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import getBrokersService from "../../../../api/Broker/GetBrokers/getBrokersService";
import editBrokerService from "../../../../api/Broker/EditBroker/editBrokerService";
import { convertIBrokerVMToIBrokerForm } from "../../../../api/Broker/convertIBrokerVMToIBrokerForm";
import toast, { Toaster } from "react-hot-toast";
import {
  getPaginationState,
  savePaginationState,
} from "../../../../utils/PaginationHandler";
const Brokers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [brokers, setBrokers] = useState<IBrokers[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  useEffect(() => {
    const p = getPaginationState(BROKER_STORAGE_KEY);
    setPagination(p);
  }, []);
  const navigate = useNavigate();
  const handleAddBrokerClick = () => {
    savePaginationState(pagination, BROKER_STORAGE_KEY);
    navigate(brokerAddPath());
  };
  const GetBrokers = useCallback(
    () =>
      getBrokersService({ header })
        .then((brokersDetails) => {
          setBrokers(brokersDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        }),
    []
  );
  useEffect(() => {
    GetBrokers();
  }, [GetBrokers]);
  const callUpdateBrokerAPI = async (broker: IBrokersVM) => {
    var convertBrokerVMToBrokerForm = convertIBrokerVMToIBrokerForm(broker);
    const brokerData: IBrokerForm = {
      id: convertBrokerVMToBrokerForm.id,
      brokerName: convertBrokerVMToBrokerForm.brokerName,
      brokerCode: convertBrokerVMToBrokerForm.brokerCode,
      isActive: !convertBrokerVMToBrokerForm.isActive,
    };
    editBrokerService({ header, broker: brokerData })
      .then((updatedBroker) => {
        GetBrokers();
      })
      .catch(async (error: any) => {
        const err = await error;
        toast.error(err.message);
      })
      .finally(() => {
        updateLoading();
      });
  };
  const handleClickChangeStatus = (broker: IBrokersVM) => {
    callUpdateBrokerAPI(broker);
  };
  const forcedRenderCount = 0;

  const columns = useMemo<MRT_ColumnDef<IBrokers>[]>(
    () => [
      {
        accessorKey: "brokerName",
        header: "Broker Name",
        size: 200,
      },
      {
        accessorKey: "brokerCode",
        header: "Broker Code",
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
      brokers.map(
        (broker: IBrokers) =>
        ({
          id: broker._id,
          brokerName: broker.brokerName,
          brokerCode: broker.brokerCode,
          isActive: broker.isActive,
          createdOn: dayjs(broker.createdOn).format(DAYJS_DISPLAY_FORMAT),
          updatedOn: dayjs(broker.updatedOn).format(DAYJS_DISPLAY_FORMAT),
          forceUpdate: forcedRenderCount,
        } as IBrokersVM)
      ) ?? [],
    [brokers, forcedRenderCount]
  );
  const updateLoading = useCallback(async () => {
    setIsLoading(false);
  }, []);
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);

  const handleClickEditBroker = (broker: IBrokersVM) => {
    savePaginationState(pagination, BROKER_STORAGE_KEY);
    navigate(brokerEditPath(broker.id!));
  };

  return (
    <>
      <div className="h-screen md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Broker Table
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
                <span className="text-grey-600 text-sm"> Broker</span>
              </div>
              <Button
                type="button"
                className="btnGradient text-black px-4 py-2 text-xs sm:text-sm rounded-sm w-full sm:w-auto"
                onClick={handleAddBrokerClick}
              >
                Add Broker
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
                <Tooltip title={"Edit Broker"}>
                  <IconButton
                    color="primary"
                    aria-label={"Edit Broker"}
                    component="span"
                    onClick={() => {
                      handleClickEditBroker(row.original as IBrokersVM);
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
                      handleClickChangeStatus(row.original as IBrokersVM)
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
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};
export default Brokers;
