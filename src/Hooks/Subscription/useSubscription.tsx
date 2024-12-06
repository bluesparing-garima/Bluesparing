import { useEffect, useRef, useState } from "react";
import { header } from "../../context/constant";
import GetSubscriptionService from "../../api/Subscriptions/GetSubscription/GetSubscriptionService";
import { ISubscription } from "../../api/Subscriptions/subscriptionType";
export const defaultMenu: ISubscription[] = [];

const useSubscription = () => {
  const [subsData, setSubsData] = useState<ISubscription[]>(defaultMenu);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      GetSubscriptionService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          const subscriptions = apiResponse.data.filter(
            (subs: ISubscription) => subs.isActive === true
          );
          setSubsData(subscriptions);
        })
        .catch((res) => {
          console.error(res.status);
        });
    }
  }, [header, isLoading]);

  return [subsData];
};

export default useSubscription;
