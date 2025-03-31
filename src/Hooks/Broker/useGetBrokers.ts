import { useEffect, useRef, useState } from "react";
import getBrokersService from "../../api/Broker/GetBrokers/getBrokersService";
import { GetBrokerProps } from "../../api/Broker/getBrokersTypes";
import { IBrokers } from "../../components/Admin/Broker/IBroker";

export const defaultBroker: IBrokers[] = [];

const useGetBrokers = ({ header }: GetBrokerProps) => {
  const [brokers, setBrokers] = useState<IBrokers[]>(defaultBroker);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getBrokersService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          const brokers = apiResponse.data.filter(
            (broker: IBrokers) => broker.isActive === true
          );
          setBrokers(brokers);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header, isLoading]);

  return [brokers];
};

export default useGetBrokers;
