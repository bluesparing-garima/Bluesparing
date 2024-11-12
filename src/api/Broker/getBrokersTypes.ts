import { Header } from "../../Auth/IAuth";
import { IBrokerForm, IBrokers } from "../../components/Admin/Broker/IBroker";

export interface AddEditBrokerProps {
  header: Header;
  broker: IBrokerForm;
}

export interface GetBrokerProps {
  header?: Header;
}

export interface GetBrokerDetailsProps {
  header?: Header;
  brokerId?: string;
}

export interface DeleteBrokerProps {
  header?: Header;
  brokerId?: string;
  brokers: IBrokers[];
}
