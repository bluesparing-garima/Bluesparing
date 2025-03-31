import { useEffect, useRef, useState } from "react";
import { header } from "../../context/constant";
import { ISubscription } from "../../api/Subscriptions/subscriptionType";
import GetSubscriptionByIdService from "../../api/Subscriptions/GetSubscriptionById/GetSubscriptionByIdService";


const useGetSubsById = (id:string) => {
  const [subsData, setSubsData] = useState<ISubscription>();
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      GetSubscriptionByIdService({ header,id })
        .then((apiResponse) => {
          isLoading.current = false;
          const subscriptions = apiResponse.data;
          setSubsData(subscriptions);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header, isLoading]);

  return [subsData];
};

export default useGetSubsById;
