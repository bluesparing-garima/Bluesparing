import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { bookingRequestsAddPath, bookingRequestsPath } from "../../../sitemap";
import dayjs from "dayjs";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import getBookingRequestService from "../../../api/BookingRequest/GetBookingRequest/getBookingRequestService";
import { IBookingRequests, IBookingRequestsVM } from "../IBookingRequests";
import {
  DAYJS_DISPLAY_FORMAT,
  SafeKaroUser,
  header,
  imagePath,
} from "../../../context/constant";
import CountdownTimer from "../../../utils/CountdownTimer";
import acceptBookingRequestService from "../../../api/BookingRequest/AcceptBookingRequest/acceptBookingRequestService";
import InputDialog from "../../../utils/InputDialog";
import toast, { Toaster } from "react-hot-toast";
const NewBookingRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingRequests, setBookingRequests] = useState<IBookingRequests[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [bookingData, setBookingData] = useState<IBookingRequestsVM>();
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const GetBookingRequests = useCallback(
    () =>
      getBookingRequestService({ header })
        .then((bookingRequestDetails) => {
          const newBookings = bookingRequestDetails.data.filter(
            (booking: any) => booking.bookingAcceptedBy === ""
          );
          setBookingRequests(newBookings);
        })
        .catch(async(error) => {
          const err = await error
          toast.error(err.message)
        }),
    []
  );
  useEffect(() => {
    GetBookingRequests();
  }, [GetBookingRequests]);
  const navigate = useNavigate();
  const handleAddBookingRequestClick = () => {
    navigate(bookingRequestsAddPath());
  };
  const columns = useMemo<MRT_ColumnDef<IBookingRequests>[]>(
    () => [
      {
        header: "Timer",
        accessorKey: "createdOn",
        Cell: ({ row }) => (
          <CountdownTimer
            registerDate={row.original.updatedOn || row.original.createdOn}
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
        } as IBookingRequestsVM)
      ) ?? [],
    [bookingRequests]
  );
  const updateLoading = useCallback(async () => {
    setIsLoading(false);
  }, []);
  const handleReject = (bookingForm: IBookingRequestsVM) => {
    setSelectedBookingId(bookingForm.id!);
    bookingForm.isRejected = true;
    bookingForm.bookingAcceptedBy = userData.id;
    setBookingData(bookingForm);
    setOpen(true);
  };
  const handleClickAcceptBooking = (bookingForm: IBookingRequestsVM) => {
    bookingForm.bookingAcceptedBy = userData.id;
    bookingForm.bookingStatus = "accepted";
    bookingForm.updatedBy = userData.role;
    bookingForm.updatedOn = "";
    callEditLeadAPI(bookingForm, bookingForm.id!);
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
    } catch (error:any) {
      const err = await error
      toast.error(err.message)
    }
  };
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);
   const downloadFile = (url: string, fileName: string) => {
    const urlFileName = url.substring(url.lastIndexOf("/") + 1);
    const fileExtension = urlFileName.split(".").pop()?.toLowerCase();
    if (
      fileExtension === "pdf" ||
      fileExtension === "png" ||
      fileExtension === "jpg" ||
      fileExtension === "jpeg"
    ) {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const href = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = href;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch((error) => console.error("Error downloading file:", error));
    } else {
      console.error("Unsupported file type:", fileExtension);
    }
  };
  const handleClickDownloadDocument = (booking: IBookingRequestsVM) => {
    if (booking.rcBack) {
      downloadFile(`${imagePath}${booking?.rcBack!}`, "rcBack");
    }
    if (booking.rcFront) {
      downloadFile(`${imagePath}${booking?.rcFront!}`, "rcFront");
    }
    if (booking.puc) {
      downloadFile(`${imagePath}${booking?.puc!}`, "puc");
    }
    if (booking.currentPolicy) {
      downloadFile(`${imagePath}${booking?.currentPolicy!}`, "currentPolicy");
    }
    if (booking.previousPolicy) {
      downloadFile(`${imagePath}${booking?.previousPolicy!}`, "previousPolicy");
    }
    if (booking.survey) {
      downloadFile(`${imagePath}${booking?.survey!}`, "survey");
    }
    if (booking.fitness) {
      downloadFile(`${imagePath}${booking?.fitness!}`, "fitness");
    }
    if (booking.proposal) {
      downloadFile(`${imagePath}${booking?.proposal!}`, "proposal");
    }
    if (booking.other) {
      downloadFile(`${imagePath}${booking?.other!}`, "other");
    }
  };
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
           New Booking Request Table
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
                <span className="text-grey-600 text-sm"> Booking Request</span>
              </div>
              {userData.role.toLowerCase() !== "booking" ? (
                <Button
                  type="button"
                  className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                  onClick={handleAddBookingRequestClick}
                >
                  Add Booking Request
                </Button>
              ) : (
                ""
              )}
            </div>
            
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <MaterialReactTable
            state={{ isLoading }}
            columns={columns}
            data={parsedData}
            enableRowActions
            enablePagination
            autoResetPageIndex={false}
            renderRowActions={({ row }) => (
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Tooltip title={"Download Documents"}>
                  <IconButton
                    color="primary"
                    aria-label={"Download Documents"}
                    component="span"
                    onClick={() => {
                      handleClickDownloadDocument(
                        row.original as IBookingRequestsVM
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-safekaroDarkOrange"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Accept"}>
                  <IconButton
                    color="primary"
                    aria-label={"Accept"}
                    component="span"
                    onClick={() => {
                      handleClickAcceptBooking(
                        row.original as IBookingRequestsVM
                      );
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
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Reject"}>
                  <IconButton
                    color="primary"
                    aria-label={"reject"}
                    component="span"
                    onClick={() => {
                      handleReject(row.original as IBookingRequestsVM);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-[red]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              </div>
            )}
          />
        </Paper>
      </div>
      <InputDialog open={open} setOpen={setOpen} BookingId={selectedBookingId} bookingData={bookingData} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default NewBookingRequests;
