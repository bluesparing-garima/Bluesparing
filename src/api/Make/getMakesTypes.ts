import { Header } from "../../Auth/IAuth";
import { IMakeForm, IMakes } from "../../components/Admin/Make/IMake";

export interface AddEditMakeProps {
  header: Header;
  make: IMakeForm;
}

export interface GetMakeProps {
  header?: Header;
}

export interface GetMakeDetailsProps {
  header?: Header;
  makeId?: string;
}
export interface ValidateMakeDetailsProps {
  header?: Header;
  makeName?: string;
}
export interface DeleteMakeProps {
  header?: Header;
  makeId?: string;
  makes: IMakes[];
}
