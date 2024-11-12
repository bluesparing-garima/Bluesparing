import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import { IBrokers, IBrokersVM } from "../../components/Admin/Broker/IBroker";

const convertIBrokerToIBrokerVM = (data: IBrokers): IBrokersVM => {
  const brokerViewModel: IBrokersVM = {
    id: data._id ? data._id : "",
    brokerName: data.brokerName ? data.brokerName : "",
    createdBy: data.createdBy ? data.createdBy : "",
    updatedBy: data.updatedBy ? data.updatedBy : "",
    isActive: data.isActive ? data.isActive : true,
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return brokerViewModel;
};

export default convertIBrokerToIBrokerVM;
