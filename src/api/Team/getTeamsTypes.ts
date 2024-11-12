import { Header } from "../../Auth/IAuth";
import { ITeams } from "../../components/Admin/Team/ITeam";

export interface AddEditTeamProps {
  header?: Header;
  team: any;
  teamId?: string;
}

export interface GetTeamProps {
  header?: Header;
  headRMId?: string;
  signal?: AbortSignal
}
export interface GetEmployeesProps {
  header?: Header;
}
export interface GetTeamDetailsProps {
  header?: Header;
  teamId?: string;
}

export interface DeleteTeamProps {
  header?: Header;
  teamId?: string;
  teams: ITeams[];
}
export interface GetRMListProps {
  header?: Header;
  role: string;
}

export interface ValidateEmailProps {
  header?: Header;
  email: string;
}