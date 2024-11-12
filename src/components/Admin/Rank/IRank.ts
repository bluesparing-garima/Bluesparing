export interface IRanks {
  _id?: string;
  rank?: string;
  count?: number;
  createdBy?: string;
  isActive?: boolean;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}
export interface IRanksVM {
  id?: string;
  rank?: string;
  count?: number;
  createdBy?: string;
  isActive?: boolean;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}
export interface IRankForm {
  id?: string;
  rank?: string;
  count?: number;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}
