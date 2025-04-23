import { useEffect, useRef, useState } from "react";
import { IPartners } from "../../components/Partner/IPartner";
import GetOccupancyServices from "../../api/Occupancy/GetOccupancy/GetOccupancyServices";

export interface IOccupancy {
    _id:string;
    occupancyCode:string;
    occupancyDescription:string;
    lossCost:number;
}
export const defaultPartner: IOccupancy[] = [];
const useGetOccupancy = () => {
  const [data, setData] = useState<IOccupancy[]>(defaultPartner);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      GetOccupancyServices()
        .then((apiResponse) => {
          isLoading.current = false;
          const partners = apiResponse.data.filter(
            (partner: IPartners) => partner.isActive === true
          );
          setData(partners);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [ isLoading]);

  return [data];
};

export default useGetOccupancy;
