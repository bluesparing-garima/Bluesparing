export interface IMakeForm {
  id?: string;
  makeName?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

export interface IMakesVM {
  id?: string;
  makeName?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
  forceUpdate?: number;
}
export interface IMakes {
  _id?: string;
  makeName?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface IMake {
  status: string;
  data: IMakes[];
  message: string;
}
