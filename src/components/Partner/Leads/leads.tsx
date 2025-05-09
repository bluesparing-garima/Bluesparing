import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  DAYJS_DISPLAY_FORMAT,
  SafeKaroUser,
  header,
  imagePath,
} from "../../../context/constant";
import { ILeads, ILeadsVM } from "../IPartner";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  QuotationAddPath,
  QuotationViewPath,
  leadEditPath,
  leadsAddPath,
  bookingRequestNewPath,
} from "../../../sitemap";
import dayjs from "dayjs";
import getLeadService from "../../../api/Leads/GetLead/getLeadService";
import CountdownTimer from "../../../utils/CountdownTimer";
import getLeadByPartnerIdService from "../../../api/Leads/GetLeadByPartnerId/getLeadByPartnerIdService";
import getLeadByUserIdService from "../../../api/Leads/GetLeadByUserId/getLeadByUserIdService";
import toast, { Toaster } from "react-hot-toast";
const Leads = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<ILeads[]>([]);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const GetLeads = useCallback(
    () =>
      getLeadService({ header })
        .then((leadDetails) => {
          setLeads(leadDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        }),
    []
  );
  const GetLeadByIdRequests = useCallback(
    () =>
      getLeadByUserIdService({ header, userId: userData.profileId })
        .then((leadDetails) => {
          setLeads(leadDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        }),
    [userData.profileId]
  );
  const GetLeadByPartnerIdRequests = useCallback(
    () =>
      getLeadByPartnerIdService({ header, partnerId: userData.profileId })
        .then((leadDetails) => {
          setLeads(leadDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        }),
    [userData.profileId]
  );
  useEffect(() => {
    if (userData.role.toLowerCase() === "operation") {
      GetLeadByIdRequests();
    } else if (userData.role.toLowerCase() === "partner") {
      GetLeadByPartnerIdRequests();
    } else {
      GetLeads();
    }
  }, [
    GetLeadByIdRequests,
    GetLeadByPartnerIdRequests,
    GetLeads,
    userData.role,
  ]);
  const navigate = useNavigate();
  const handleAddLeadClick = () => {
    navigate(leadsAddPath());
  };

  const checkViewDisplay = (status: string) => {
    const comingStatus = status.toLowerCase().trim();

    if (
      comingStatus === "payment verified" ||
      comingStatus === "booking pending" ||
      comingStatus === "booked"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const parsedData = useMemo(
    () =>
      leads
        .map(
          (lead: ILeads) =>
            ({
              id: lead._id,
              category: lead.category,
              policyType: lead.policyType,
              caseType: lead.caseType,
              companyName: lead.companyName,
              partnerId: lead.partnerId,
              partnerName: lead.partnerName,
              relationshipManagerId: lead.relationshipManagerId,
              relationshipManagerName: lead.relationshipManagerName,
              rcFront: lead.rcFront,
              rcBack: lead.rcBack,
              previousPolicy: lead.previousPolicy,
              survey: lead.survey,
              puc: lead.puc,
              fitness: lead.fitness,
              proposal: lead.proposal,
              currentPolicy: lead.currentPolicy,
              other: lead.other,
              remarks: lead.remarks,
              status: lead.status,
              isActive: lead.isActive,
              createdOn: lead.createdOn,
              updatedOn: lead.updatedOn,
              timer: lead.timer,
              isPolicyPdfUploaded: lead.isPolicyPdfUploaded,
              policyNumber: lead.policyNumber,
              policyPdf: lead.policyPdf,
            } as ILeadsVM)
        )
        .sort(
          (a, b) => dayjs(b.createdOn).valueOf() - dayjs(a.createdOn).valueOf()
        ) ?? [],
    [leads]
  );
  const columns = useMemo<MRT_ColumnDef<ILeads>[]>(
    () => [
      {
        header: "Timer",
        accessorKey: "timer",
        size: 100,
        Cell: ({ row }) => {
          return (
            <CountdownTimer
              registerDate={row.original.updatedOn || row.original.createdOn}
              status={row.original.status}
              timer={row.original.timer}
            />
          );
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 100,
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
        header: "Lead Status",
        accessorKey: "status",
        size: 50,
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
  const updateLoading = useCallback(async () => {
    setIsLoading(false);
  }, []);
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);
  const handleClickSendLead = (lead: ILeadsVM) => {
    navigate(bookingRequestNewPath(lead.id!));
  };
  const handleClickEditLead = (lead: ILeadsVM) => {
    navigate(leadEditPath(lead.id!));
  };
  const handleClickAddQuotation = (lead: ILeadsVM) => {
    navigate(QuotationAddPath(lead.id!));
  };
  const handleClickViewQuotation = (lead: ILeadsVM) => {
    navigate(QuotationViewPath(lead.id!));
  };
  const handleNavigateToUpload = (lead: ILeadsVM) => {
    const { policyNumber, id } = lead;
    navigate("upload-policy-pdf", { state: { policyNumber, leadId: id } });
  };
  const handleDownload = (url: string, fileName: string) => {
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

  return (
    <>
      <div className="md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Lead Table
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
                <span className="text-grey-600 text-sm"> Lead</span>
              </div>
              {userData.role.toLowerCase() !== "admin" && (
        <Button
        type="button"
        className="w-28 h-10 btnGradient text-black px-4 py-2 text-xs rounded-md"
        onClick={handleAddLeadClick}
      >
        Add Lead
      </Button>
      

              )}
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
            enableRowActions={userData.role.toLowerCase() !== "admin"}
            positionActionsColumn="last"
            renderRowActions={({ row }) => {
              if (
                row.original.status === "Payment Verified" &&
                userData.role.toLowerCase() === "operation"
              ) {
                return (
                  <>
                    <div style={{ display: "flex", flexWrap: "nowrap" }}>
                      <Tooltip title={"Send For Booking"}>
                        <IconButton
                          color="primary"
                          aria-label={"Send For Booking"}
                          component="span"
                          onClick={() => {
                            handleClickSendLead(row.original as ILeadsVM);
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
                              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                            />
                          </svg>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"View Comment"}>
                        <IconButton
                          color="primary"
                          aria-label={"View Comment"}
                          component="span"
                          onClick={() => {
                            handleClickViewQuotation(row.original as ILeadsVM);
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
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </IconButton>
                      </Tooltip>
                    </div>
                  </>
                );
              }

              if (
                (row.original.status === "Booking Pending" ||
                  row.original.status === "Booked") &&
                userData.role.toLowerCase() === "operation"
              ) {
                return (
                  <>
                    <div style={{ display: "flex", flexWrap: "nowrap" }}>
                      <Tooltip title={"View Comment"}>
                        <IconButton
                          color="primary"
                          aria-label={"View Comment"}
                          component="span"
                          onClick={() => {
                            handleClickViewQuotation(row.original as ILeadsVM);
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
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </IconButton>
                      </Tooltip>

                      {row.original.status?.toLowerCase() === "booked" &&
                        row.original.isPolicyPdfUploaded === false && (
                          <Tooltip title={"Upload Policy PDF"}>
                            <IconButton
                              color="primary"
                              aria-label={"Upload Policy PDF"}
                              component="span"
                              onClick={() => {
                                handleNavigateToUpload(
                                  row.original as ILeadsVM
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
                                  d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                                />
                              </svg>
                            </IconButton>
                          </Tooltip>
                        )}
                      {row.original.status?.toLowerCase() === "booked" &&
                        row.original.isPolicyPdfUploaded && (
                          <Tooltip title={"Download Policy PDF"}>
                            <IconButton
                              color="primary"
                              aria-label={"Download Policy PDF"}
                              component="span"
                              onClick={() => {
                                handleDownload(
                                  `${imagePath}${row.original.policyPdf}`,
                                  `policy_${row.original.policyNumber}`
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
                        )}
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <div style={{ display: "flex", flexWrap: "nowrap" }}>
                      {checkViewDisplay(row.original.status!) ? (
                        <>
                          <Tooltip title={"View Comment"}>
                            <IconButton
                              color="primary"
                              aria-label={"View Comment"}
                              component="span"
                              onClick={() => {
                                handleClickViewQuotation(
                                  row.original as ILeadsVM
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
                                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            </IconButton>
                          </Tooltip>
                          {row.original.status?.toLowerCase() === "booked" &&
                            row.original.isPolicyPdfUploaded && (
                              <Tooltip title={"Download Policy PDF"}>
                                <IconButton
                                  color="primary"
                                  aria-label={"Download Policy PDF"}
                                  component="span"
                                  onClick={() => {
                                    handleDownload(
                                      `${imagePath}${row.original.policyPdf}`,
                                      `policy_${row.original.policyNumber}`
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
                            )}
                        </>
                      ) : (
                        <>
                          <Tooltip title={"Add Comment"}>
                            <IconButton
                              color="primary"
                              aria-label={"Add Comment"}
                              component="span"
                              onClick={() => {
                                handleClickAddQuotation(
                                  row.original as ILeadsVM
                                );
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                />
                              </svg>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={"Edit Lead"}>
                            <IconButton
                              color="primary"
                              aria-label={"Edit Lead"}
                              component="span"
                              onClick={() => {
                                handleClickEditLead(row.original as ILeadsVM);
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
                        </>
                      )}
                    </div>
                  </>
                );
              }
            }}
          />
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
export default Leads;
