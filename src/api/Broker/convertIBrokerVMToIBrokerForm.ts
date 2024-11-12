// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

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
    // points: broker.points
    //   ? convertLocaleStringToNumber(broker.points!)
    //   : 0,
  };
  return brokerForm;
};
