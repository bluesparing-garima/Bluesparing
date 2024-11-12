import { Header } from "../../../Auth/IAuth";
import { INews } from "../../../components/Website/News/News/INews";
export interface AddEditNewsProps {
  header: Header;
  news: any;
  newsId?: string;
}

export interface GetNewsProps {
  header?: Header;
}

export interface GetNewsDetailsProps {
  header?: Header;
  newsId?: string;
}

export interface DeleteNewsProps {
  header?: Header;
  newsId?: string;
  news: INews[];
}
