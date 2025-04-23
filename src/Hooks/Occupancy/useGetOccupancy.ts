import { useEffect, useRef, useState } from "react";
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
          
          setData(apiResponse);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [ isLoading]);

  return [data];
};

export default useGetOccupancy;
