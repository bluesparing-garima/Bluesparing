import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  DAYJS_DISPLAY_FORMAT,
  DAYJS_DISPLAY_FORMAT_TABLES,
  header,
  imagePath,
  SafeKaroUser,
  TEAM_STORAGE_KEY,
} from "../../../../context/constant";
import { IAppUser, ITeamForm, ITeams, ITeamsVM } from "../ITeam";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { teamEditPath, teamAddPath } from "../../../../sitemap";
import dayjs from "dayjs";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { convertITeamVMToITeamForm } from "../../../../api/Team/convertITeamVMToITeamForm";
import getTeamService from "../../../../api/Team/GetTeams/getTeamsService";
import editTeamService from "../../../../api/Team/EditTeam/editTeamService";
import {
  getPaginationState,
  savePaginationState,
} from "../../../../utils/PaginationHandler";
import generateFormData from "../../../../utils/generateFromData";

const Teams = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<IAppUser[]>([]);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  useEffect(() => {
    const p = getPaginationState(TEAM_STORAGE_KEY);
    setPagination(p);
  }, []);
  const GetTeams = useCallback(
    () =>
      getTeamService({ header })
        .then((teamDetails) => {
          const newTeamData = teamDetails.data.filter((ele: any) => {
            return ele.role.toLowerCase() !== "superadmin";
          });
          setTeams(newTeamData);
        })
        .catch((error) => {
          console.error("Failed to fetch product details", error);
        }),
    []
  );
  useEffect(() => {
    GetTeams();
  }, [GetTeams]);
  const navigate = useNavigate();
  const handleAddTeamClick = () => {
    savePaginationState(pagination, TEAM_STORAGE_KEY);
    navigate(teamAddPath());
  };
  const columns = useMemo<MRT_ColumnDef<IAppUser>[]>(
    () => [
      {
        accessorKey: "branchName",
        header: "Branch",
        size: 200,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 200,
      },
      {
        accessorKey: "userCode",
        header: "User Code",
        size: 200,
      },
      {
        accessorKey: "name",
        header: "Full Name",
        size: 200,
      },
      {
        accessorKey: "phoneNumber",
        header: "Mobile Number",
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
        size: 200,
        Cell: ({ cell }) => {
          const dateValue = cell.getValue<Date>();
          return dateValue
            ? dayjs(dateValue).format(DAYJS_DISPLAY_FORMAT_TABLES)
            : "-";
        },
      },
    ],
    []
  );

  const parsedData = useMemo(() => {
    const filteredTeams =
      UserData.role.toLowerCase() === "hr"
        ? teams.filter((team) => team.role?.toLowerCase() !== "partner")
        : teams;

    return filteredTeams;
  }, [teams, UserData.role]);

  const updateLoading = useCallback(async () => {
    setIsLoading(false);
  }, []);
  useEffect(() => {
    updateLoading();
  }, [updateLoading]);
  const callUpdateTeamAPI = async (team: IAppUser) => {
    const formData = generateFormData(team);

    editTeamService({ team: formData, teamId: team._id })
      .then((updatedTeam) => {
        GetTeams();
      })
      .catch((response) => {})
      .finally(() => {
        updateLoading();
      });
  };
  const handleClickDeActiveTeam = (team: IAppUser) => {
    const formData = generateFormData({ isActive: !team.isActive });
    editTeamService({ team: formData, teamId: team._id })
      .then((updatedTeam) => {
        GetTeams();
      })
      .catch((response) => {})
      .finally(() => {
        updateLoading();
      });
  };
  const handleClickEditTeam = (team: IAppUser) => {
    savePaginationState(pagination, TEAM_STORAGE_KEY);
    navigate(teamEditPath(team._id!));
  };
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
  const handleClickDownloadDocument = (team: IAppUser) => {
    if (team.profileImage) {
      downloadFile(`${imagePath}/${team?.profileImage!}`, "profileImage");
    }
    if (team.image) {
      downloadFile(`${imagePath}/${team?.image!}`, "image");
    }
    if (team.adharCardBack) {
      downloadFile(`${imagePath}/${team?.adharCardBack!}`, "adharCardBack");
    }
    if (team.adharCardFront) {
      downloadFile(`${imagePath}/${team?.adharCardFront!}`, "adharCardFront");
    }
    if (team.panCard) {
      downloadFile(`${imagePath}/${team?.panCard!}`, "panCard");
    }
    if (team.qualification) {
      downloadFile(`${imagePath}/${team?.qualification!}`, "qualification");
    }
    if (team.experience) {
      downloadFile(`${imagePath}/${team?.experience!}`, "experience");
    }
    if (team.bankProof) {
      downloadFile(`${imagePath}/${team?.bankProof!}`, "bankProof");
    }
    if (team.other) {
      downloadFile(`${imagePath}/${team?.other!}`, "other");
    }
  };
  return (
    <>
      <div className="bg-blue-200 h-screen md:p-7 p-2 ">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Team Table
          </Typography>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to={
                    UserData.role.toLowerCase() === "hr"
                      ? "/hr/dashboard"
                      : "/dashboard"
                  }
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm"> Team</span>
              </div>
              <Button
                type="button"
                className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                onClick={handleAddTeamClick}
              >
                Add Team
              </Button>
            </div>
            {}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          {/* <Tooltip title={"Download Excel"}>
            <Button
              aria-label={"Download"}
              className="size-5 text-white bg-safekaroDarkOrange m-2 p-4"
            >
              <CSVLink
                data={teams}
                style={{ height: "20px", paddingBottom: "20px" }}
              >
                CSV
              </CSVLink>
            </Button>
          </Tooltip> */}
          <MaterialReactTable
            state={{ isLoading, pagination }}
            columns={columns}
            data={parsedData}
            enableRowActions
            enablePagination
            onPaginationChange={setPagination}
            autoResetPageIndex={false}
            positionActionsColumn="last"
            renderRowActions={({ row }) => (
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Tooltip title={"Download Documents"}>
                  <IconButton
                    color="primary"
                    aria-label={"Download Documents"}
                    component="span"
                    onClick={() => {
                      handleClickDownloadDocument(row.original as IAppUser);
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
                        d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Edit Team"}>
                  <IconButton
                    color="primary"
                    aria-label={"Edit Team"}
                    component="span"
                    onClick={() => {
                      handleClickEditTeam(row.original as IAppUser);
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
                      handleClickDeActiveTeam(row.original as IAppUser)
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
                {/* <Tooltip title={"Delete"}>
                  <IconButton
                    color="primary"
                    aria-label={"Delete Team"}
                    component="span"
                    onClick={() =>
                      handleClickDeleteTeam(row.original as ITeamsVM)
                    }
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </IconButton>
                </Tooltip> */}
              </div>
            )}
          />
        </Paper>
      </div>
    </>
  );
};
export default Teams;
