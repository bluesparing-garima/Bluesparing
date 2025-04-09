import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {  IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {  bookingRequestsPath } from "../../../sitemap";
import dayjs from "dayjs";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { IBookingRequests, IBookingRequestsVM } from "../IBookingRequests";
import {
  DAYJS_DISPLAY_FORMAT,
  SafeKaroUser,
  header,
} from "../../../context/constant";
import CountdownTimer from "../../../utils/CountdownTimer";
import acceptBookingRequestService from "../../../api/BookingRequest/AcceptBookingRequest/acceptBookingRequestService";
import GetRejectedBookingRequestService from "../../../api/BookingRequest/GetRejectedBookingRequest/GetRejectedBookingRequestService";
import toast, { Toaster } from "react-hot-toast";
import RejectedBookingPartnerService from "../../../api/BookingRequest/RejectedBookingPartner/RejectedBookingPartnerService";
const RejectionPolicies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingRequests, setBookingRequests] = useState<IBookingRequests[]>(
    []
  );
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const GetBookingRequests = useCallback(() => {
    if (userData.role === "Partner") {
      const partnerId = userData.profileId;
      RejectedBookingPartnerService({ header, partnerId })
        .then((bookingRequestDetails) => {
          setBookingRequests([...bookingRequestDetails.data]);
        })
        .catch(async (error: any) => {
          const err = await error;
          toast.error(err.message);
        });
    } else {
      GetRejectedBookingRequestService({ header })
        .then((bookingRequestDetails) => {
          setBookingRequests([...bookingRequestDetails.data]);
        })
        .catch(async (error: any) => {
          const err = await error;
          toast.error(err.message);
        });
    }
     // eslint-disable-next-line 
  }, [userData.role]);
  useEffect(() => {
    GetBookingRequests();
  }, [GetBookingRequests]);
  const navigate = useNavigate();
  const columns = useMemo<MRT_ColumnDef<IBookingRequests>[]>(
    () => [
      {
        header: "Timer",
        accessorKey: "timer",
        Cell: ({ row }) => (
          <CountdownTimer
            registerDate={row.original.updatedOn || row.original.createdOn}
            status="Rejected"
            timer={row.original.timer}
          />
        ),
        size: 200,
      },
      {
        accessorKey: "policyNumber",
        header: "Policy Number",
        size: 200,
      },
      {
        accessorKey: "policyType",
        header: "Policy Type",
        size: 100,
      },
      {
        accessorKey: "caseType",
        header: "Case Type",
        size: 100,
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 100,
      },
      {
        accessorKey: "productType",
        header: "Product",
        size: 100,
      },
      {
        accessorKey: "subCategory",
        header: "Sub Category",
        size: 100,
      },
      {
        accessorKey: "companyName",
        header: "Company Name",
        size: 100,
      },
      {
        accessorKey: "bookingStatus",
        header: "Booking Status",
        size: 100,
      },
      {
        accessorKey: "partnerName",
        header: "Partner Name",
        size: 200,
      },
      {
        accessorKey: "rejectionReason",
        header: "Rejection Reason",
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
        Cell: ({ row }) => {
          return (
            <span>
              {dayjs(row.original.createdOn).format(DAYJS_DISPLAY_FORMAT)}
            </span>
          );
        },
      },
    ],
    []
  );
  const parsedData = useMemo(
    () =>
      bookingRequests.map(
        (bookingRequest: IBookingRequests) =>
          ({
            id: bookingRequest._id,
            policyNumber: bookingRequest.policyNumber,
            category: bookingRequest.category,
            policyType: bookingRequest.policyType,
            caseType: bookingRequest.caseType,
            productType: bookingRequest.productType,
            subCategory: bookingRequest.subCategory,
            companyName: bookingRequest.companyName,
            partnerId: bookingRequest.partnerId,
            partnerName: bookingRequest.partnerName,
            rcFront: bookingRequest.rcFront,
            rcBack: bookingRequest.rcBack,
            previousPolicy: bookingRequest.previousPolicy,
            survey: bookingRequest.survey,
            puc: bookingRequest.puc,
            fitness: bookingRequest.fitness,
            proposal: bookingRequest.proposal,
            currentPolicy: bookingRequest.currentPolicy,
            other: bookingRequest.other,
            bookingStatus: bookingRequest.bookingStatus,
            bookingCreatedBy: bookingRequest.bookingCreatedBy,
            bookingAcceptedBy: bookingRequest.bookingAcceptedBy,
            relationshipManagerName: bookingRequest.relationshipManagerName,
            relationshipManagerId: bookingRequest.relationshipManagerId,
            isActive: bookingRequest.isActive,
            createdOn: bookingRequest.createdOn,
            updatedOn: bookingRequest.updatedOn,
            rejectionReason: bookingRequest.rejectionReason,
            timer: bookingRequest.timer,
          } as IBookingRequestsVM)
      ) ?? [],
    [bookingRequests]
  );
  const updateLoading = useCallback(async () => {
    setIsLoading(false);
  }, []);
  const handleRestore = (bookingForm: IBookingRequestsVM) => {
    const id = bookingForm.id;
    bookingForm.createdOn = dayjs().toISOString();
    bookingForm.bookingStatus = "accepted";
    bookingForm.isRejected = false;
    bookingForm.updatedBy = userData.role;
    bookingForm.rejectionReason = "";
    bookingForm.bookingAcceptedBy = userData.profileId;
    bookingForm.timer = "";
    if (id) {
      callEditLeadAPI(bookingForm, id);
    }
  };
  const callEditLeadAPI = async (bookingForm: any, bookingId: string) => {
    try {
      const newBooking = await acceptBookingRequestService({
        header,
        bookingRequest: bookingForm,
        bookingId,
      });
      if (newBooking.status === "success") {
        navigate(bookingRequestsPath());
      }
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);
  return (
    <>
      <div className=" md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Rejected Booking Request Table
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
                <span className="text-grey-600 text-sm">
                  Rejected Booking Request
                </span>
              </div>
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
            state={{ isLoading }}
            columns={columns}
            data={parsedData}
            enableRowActions={userData.role === "Booking"}
            enablePagination
            autoResetPageIndex={false}
             renderRowActions={
              userData.role === "Booking"
                ? ({ row }) => (
                    <div style={{ display: "flex", flexWrap: "nowrap" }}>
                      <Tooltip title={"send for booking"}>
                        <IconButton
                          color="primary"
                          aria-label={"Accept"}
                          component="span"
                          onClick={() => {
                            handleRestore(row.original as IBookingRequestsVM);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                            />
                          </svg>
                        </IconButton>
                      </Tooltip>
                    </div>
                  )
                : undefined
            }
          />
        </Paper>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};
export default RejectionPolicies;
