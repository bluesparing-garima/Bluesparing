export interface IBrokerForm {
  id?: string;
  brokerName?: string;
  brokerCode?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

export interface IBrokersVM {
  id?: string;
  brokerName?: string;
  brokerCode?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}
export interface IBrokers {
  _id?: string;
  brokerName?: string;
  brokerCode?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface IBroker {
  status: string;
  data: IBrokers[];
  message: string;
}
