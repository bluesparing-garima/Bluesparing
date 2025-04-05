import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  bookingRequestsAddPath,
  motorPolicyCreatePath,
} from "../../../sitemap";
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
import getBookingRequestByPartnerIdService from "../../../api/BookingRequest/GetBookingRequestByPartnerId/getBookingRequestByPartnerIdService";
import getBookingRequestByBookingIdService from "../../../api/BookingRequest/GetBookingRequestByBookingId/getBookingRequestByBookingIdService";
import getBookingRequestByOperationIdService from "../../../api/BookingRequest/GetBookingRequestByOperationId/getBookingRequestByOperationIdService";
import Papa from "papaparse";
import InputDialog from "../../../utils/InputDialog";
import toast, { Toaster } from "react-hot-toast";
import getPolicyByNumberService from "../../../api/Policies/GetPolicyByNumber/getPolicyByNumberService";
const BookingRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingRequests, setBookingRequests] = useState<IBookingRequests[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [bookingData, setBookingData] = useState<IBookingRequestsVM>();
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const GetBookingRequests = useCallback(
    () =>
      getBookingRequestService({ header })
        .then((bookingRequestDetails) => {
          setBookingRequests(bookingRequestDetails.data);
        })
        .catch(async (error: any) => {
          const err = await error;
          toast.error(err.message);
        }),
    []
  );
  const GetBookingByOperationIdRequests = useCallback(
    () =>
      getBookingRequestByOperationIdService({ header, userId: userData.profileId })
        .then((bookingRequestDetails) => {
          setBookingRequests(bookingRequestDetails.data);
        })
        .catch(async (error: any) => {
          const err = await error;
          toast.error(err.message);
        }),
    [userData.profileId]
  );
  const GetBookingByPartnerIdRequests = useCallback(
    () =>
      getBookingRequestByPartnerIdService({
        header,
        partnerId: userData.profileId,
      })
        .then((bookingRequestDetails) => {
          setBookingRequests(bookingRequestDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        }),
    [userData.profileId]
  );
  const GetBookingByBookingIdRequests = useCallback(
    () =>
      getBookingRequestByBookingIdService({
        header,
        bookingRequestId: userData.profileId,
      })
        .then((bookingRequestDetails) => {
          setBookingRequests(bookingRequestDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        }),
    [userData.profileId]
  );
  const handlePublishPolicy = async (row: IBookingRequestsVM) => {
    const payload = {
      policyId: row.motorPolicyId||"",
      partnerName:row.partnerName ||"",
      partnerId:row.partnerId||"",
      policyNumber:row.policyNumber||"",
      bookingId:row.id||"",
      leadId:row?.leadId,
      bookingCreated:row.createdOn
    };
    if(!payload.policyId){
      toast.error("policyId not found")
      return;
    }
    if(!payload.partnerName){
      toast.error("partnerName not found")
      return;
    }
    if(!payload.partnerId){
      toast.error("partnerId not found")
      return;
    }
    if(!payload.policyNumber){
      toast.error("Policy number not found")
      return;
    }
    navigate("publish",{state:payload});
  };
  useEffect(() => {
    if (userData.role.toLowerCase() === "operation") {
      GetBookingByOperationIdRequests();
    } else if (userData.role.toLowerCase() === "partner") {
      GetBookingByPartnerIdRequests();
    } else if (userData.role.toLowerCase() === "booking") {
      GetBookingByBookingIdRequests();
    } else {
      GetBookingRequests();
    }
  }, [
    GetBookingRequests,
    GetBookingByBookingIdRequests,
    GetBookingByPartnerIdRequests,
    GetBookingByOperationIdRequests,
    userData.role,
  ]);
  const navigate = useNavigate();
  const handleAddBookingRequestClick = () => {
    navigate(bookingRequestsAddPath());
  };
  const handleChangePolicyNumber = async (policyNumber: string) => {
    try {
      const newPolicy = await getPolicyByNumberService({
        header,
        policyNumber,
      });
      if (newPolicy.exist) {
        return false;
      } else {
        return true;
      }
    } catch (error: any) {
      return false;
    }
  };
  const columns = useMemo<MRT_ColumnDef<IBookingRequests>[]>(
    () => [
      {
        header: "Timer",
        accessorKey: "timer",
        Cell: ({ row }) => (
          <CountdownTimer
            registerDate={row.original.updatedOn || row.original.createdOn}
            status={row.original.bookingStatus}
            timer={row.original.timer!}
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
        visible:
        userData.role.toLowerCase() !== "partner"
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
    [userData]
  );
  function capitalizeFirstLetter(val:string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
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
            timer: bookingRequest.timer,
            bookingAcceptedBy: bookingRequest.bookingAcceptedBy,
            bookingCreatedBy: bookingRequest.bookingCreatedBy,
            bookingStatus: capitalizeFirstLetter(bookingRequest.bookingStatus),
            isActive: bookingRequest.isActive,
            createdOn: bookingRequest.createdOn,
            updatedOn: bookingRequest.updatedOn,
            acceptedByName: bookingRequest.acceptedByName,
            isPublished: bookingRequest.isPublished || false,
            motorPolicyId:bookingRequest.motorPolicyId||""
          } as IBookingRequestsVM)
      ) ?? [],
    [bookingRequests]
  );
  const updateLoading = useCallback(async () => {
    setIsLoading(false);
  }, []);
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
        .catch((error) => {throw error});
    } else {
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
  const handleClickCreatePolicy = async (booking: IBookingRequestsVM) => {
    const res = await handleChangePolicyNumber(booking.policyNumber);
    if (res) {
      navigate(motorPolicyCreatePath(booking.id!));
    } else {
      toast.error(`${booking.policyNumber} is already exist`);
    }
  };
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);
  const handleReject = (bookingForm: IBookingRequestsVM) => {
    setSelectedBookingId(bookingForm.id!);
    bookingForm.isRejected = true;
    setBookingData(bookingForm);
    setOpen(true);
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
  return (
    <>
      <div className=" md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Booking Request Table
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
              className="btnGradient text-black px-4 py-2 rounded-sm w-full sm:w-auto text-[10px] md:text-xs"
              onClick={handleAddBookingRequestClick}
            >
              Add Booking Request
            </Button>
            
              ) : (
                ""
              )}
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
            state={{ isLoading }}
            columns={columns}
            data={parsedData}
            enableRowActions
            enablePagination
            autoResetPageIndex={false}
            renderTopToolbarCustomActions={({ table }) => (
              <>
                <Button
  className="btnGradient text-black px-4 py-2 rounded-sm w-full sm:w-auto text-[10px] md:text-xs md:m-2"
  disabled={table.getRowModel().rows.length === 0}
  onClick={() => handleExportRows(table.getFilteredRowModel().rows)}
>
  Export Filter Data
</Button>

              </>
            )}
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
                {userData.role.toLowerCase() === "booking" &&
                  row.original.bookingStatus.toLowerCase() === "accepted" && (
                    <>
                      {row.original.isPublished ? (
                        <Tooltip title={"Publish to Partner"}>
                          <IconButton
                            color="primary"
                            aria-label={"Publish to Partner"}
                            component="span"
                            onClick={() => {
                              handlePublishPolicy(
                                row.original as IBookingRequestsVM
                              );
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                              />
                            </svg>
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title={"Create Policy"}>
                          <IconButton
                            color="primary"
                            aria-label={"Create Policy"}
                            component="span"
                            onClick={() => {
                              handleClickCreatePolicy(
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
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  )}
                {userData.role.toLowerCase() === "booking" && (
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
                )}
              </div>
            )}
          />
        </Paper>
      </div>
      <InputDialog
        open={open}
        setOpen={setOpen}
        BookingId={selectedBookingId}
        bookingData={bookingData}
      />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default BookingRequests;
