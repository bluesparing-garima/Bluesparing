import { Header } from "../../Auth/IAuth";
import { IRankForm, IRanks } from "../../components/Admin/Rank/IRank";

export interface AddEditRankProps {
  header: Header;
  rank: IRankForm;
}

export interface GetRankProps {
  header?: Header;
}

export interface GetRankDetailsProps {
  header?: Header;
  rankId?: string;
}
export interface GetRankBadgeDetailsProps {
  header?: Header;
  partnerId?: string;
}

export interface DeleteRankProps {
  header?: Header;
  rankId?: string;
  ranks: IRanks[];
}
