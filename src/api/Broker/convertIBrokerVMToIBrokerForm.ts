import { IBrokerForm, IBrokersVM } from "../../components/Admin/Broker/IBroker";
export const convertIBrokerVMToIBrokerForm = (
  broker: IBrokersVM
): IBrokerForm => {
  const brokerForm: IBrokerForm = {
    id: broker.id!,
    brokerName: broker.brokerName!,
    updatedBy: broker.updatedBy!,
    isActive: !!broker.isActive,
    createdBy: broker.createdBy!,
  };
  return brokerForm;
};
