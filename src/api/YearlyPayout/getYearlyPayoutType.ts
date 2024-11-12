import { Header } from "../../Auth/IAuth";

export interface getTotalProps {
  header?: Header;
  category: string;
}

export interface getTotalCompanyProps {
  header?: Header;
  partnerId: string;
  category: string;
}
