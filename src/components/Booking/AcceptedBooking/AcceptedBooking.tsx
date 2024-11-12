import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motorPolicyCreatePath } from "../../../sitemap";
import dayjs from "dayjs";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { IBookingRequests, IBookingRequestsVM } from "../IBookingRequests";
import {
  DAYJS_DISPLAY_FORMAT,
  SafeKaroUser,
  header,
  imagePath,
} from "../../../context/constant";
import CountdownTimer from "../../../utils/CountdownTimer";
import Papa from "papaparse";

import toast, { Toaster } from "react-hot-toast";
import GetBookingRequestByAdminService from "../../../api/BookingRequest/GetBookingRequestByAdmin/GetBookingRequestByAdminService";
const AcceptedBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingRequests, setBookingRequests] = useState<IBookingRequests[]>(
    []
  );

  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

  const GetBookingByAdminRequests = async () => {
    try {
      const res = await GetBookingRequestByAdminService({ header });
      setBookingRequests(res.data);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  useEffect(() => {
    GetBookingByAdminRequests();
  }, []);
  const navigate = useNavigate();

  //should be memoized or stable
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
        accessorKey: "policyNumber", //normal accessorKey
        header: "Policy Number",
        size: 200,
      },
      {
        accessorKey: "policyType", //normal accessorKey
        header: "Policy Type",
        size: 100,
      },
      {
        accessorKey: "caseType", //normal accessorKey
        header: "Case Type",
        size: 100,
      },

      {
        accessorKey: "category", //normal accessorKey
        header: "Category",
        size: 100,
      },
      {
        accessorKey: "productType", //normal accessorKey
        header: "Product",
        size: 100,
      },
      {
        accessorKey: "subCategory", //normal accessorKey
        header: "Sub Category",
        size: 100,
      },
      {
        accessorKey: "companyName", //normal accessorKey
        header: "Company Name",
        size: 100,
      },
      {
        accessorKey: "bookingStatus", //normal accessorKey
        header: "Booking Status",
        size: 100,
      },
      {
        accessorKey: "acceptedByName", //normal accessorKey
        header: "AcceptedBy",
        size: 100,
      },
      {
        accessorKey: "partnerName", //normal accessorKey
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
            timer: bookingRequest.timer,
            // documents: bookingRequest.documents,
            bookingAcceptedBy: bookingRequest.bookingAcceptedBy,
            bookingCreatedBy: bookingRequest.bookingCreatedBy,
            bookingStatus: bookingRequest.bookingStatus,
            isActive: bookingRequest.isActive,
            createdOn: bookingRequest.createdOn,
            updatedOn: bookingRequest.updatedOn,
            acceptedByName:bookingRequest.acceptedByName,
          } as IBookingRequestsVM)
      ) ?? [],
    [bookingRequests]
  );

  const updateLoading = useCallback(async () => {
    // setIsLoading(true) when bookingRequests.length is 0, and setIsLoading(false) when bookingRequests.length is > 0
    setIsLoading(false);
  }, []);
  // Function to handle file download
  const downloadFile = (url: string, fileName: string) => {
    // Extract file extension from the original URL
    const urlFileName = url.substring(url.lastIndexOf("/") + 1);
    const fileExtension = urlFileName.split(".").pop()?.toLowerCase();

    // Validate file extension
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
      //alert("Unsupported file type. Only PDF and PNG files are supported.");
    }
  };
  // Function to handle click events
  const handleClickDownloadDocument = (booking: IBookingRequestsVM) => {
    // Example usage
    if (booking.rcBack) {
      downloadFile(`${imagePath}${booking?.rcBack!}`, "rcBack");
    }
    if (booking.rcFront) {
      downloadFile(`${imagePath}${booking?.rcFront!}`, "rcFront");
    }
    if (booking.puc) {
      downloadFile(`${imagePath}${booking?.puc!}`, "puc");
      // openFileInNewTab(`${imagePath}${booking?.puc!}`, "puc");
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
    // downloadFile('https://api.safekaro.com/uploads/Manish_668919929794ffa14999dc82.png', 'Manish_668919929794ffa14999dc82.png');
  };
  const handleClickCreatePolicy = (booking: IBookingRequestsVM) => {
    navigate(motorPolicyCreatePath(booking.id!));
  };
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);

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
    const rowData = rows.map((row) => row.original); // Adjust based on your actual row structure
    const csv = Papa.unparse(rowData, { header: true });
    downloadCsv("exported-rows.csv", csv);
  };

  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Accepted Booking Request Table
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
                  Accepted Booking Request
                </span>
              </div>
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
            renderTopToolbarCustomActions={({ table }) => (
              <>
                <Button
                  className="text-white bg-safekaroDarkOrange md:m-2 md:p-2 md:text-xs text-[10px]"
                  disabled={table.getRowModel().rows.length === 0}
                  onClick={() =>
                    handleExportRows(table.getFilteredRowModel().rows)
                  }
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
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 text-safekaroDarkOrange"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
                {userData.role.toLowerCase() === "booking" &&
                  row.original.bookingStatus.toLowerCase() === "accepted" && (
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
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-5 text-addButton"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
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

      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default AcceptedBooking;
