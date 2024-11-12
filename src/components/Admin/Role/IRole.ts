export interface IRoleForm {
  id?: string;
  roleName?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

export interface IRolesVM {
  id?: string;
  roleName?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
  forceUpdate?: number;
}
export interface IRoles {
  _id?: string;
  roleName?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface IRole {
  status: string;
  data: IRoles[];
  message: string;
}
