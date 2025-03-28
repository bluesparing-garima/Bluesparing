import { useEffect, useRef, useState } from "react";
import getFuelTypeService from "../../api/FuelType/GetFuelTypes/getFuelTypesService";
import { GetFuelTypeProps, IFuelTypes } from "../../components/Admin/FuelType/IFuelTypes";

export const defaultFuelType: IFuelTypes[] = [];

const useGetFuelTypes = ({ header }: GetFuelTypeProps) => {
  const [fuelTypes, setFuelType] = useState<IFuelTypes[]>(defaultFuelType);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getFuelTypeService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          const fuelTypes = apiResponse.data.filter(
            (fuelType: IFuelTypes) => fuelType.isActive === true
          );
          setFuelType(fuelTypes);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header, isLoading]);

  return [fuelTypes];
};

export default useGetFuelTypes;
