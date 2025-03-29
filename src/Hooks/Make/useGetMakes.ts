import { useEffect, useRef, useState } from "react";
import { IMakes } from "../../components/Admin/Make/IMake";
import { GetMakeProps } from "../../api/Make/getMakesTypes";
import getMakesService from "../../api/Make/GetMakes/getMakesService";

export const defaultMake: IMakes[] = [];

const useGetMakes = ({ header }: GetMakeProps) => {
  const [makes, setMakes] = useState<IMakes[]>(defaultMake);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getMakesService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          const makes = apiResponse.data.filter(
            (make: IMakes) => make.isActive === true
          );
          setMakes(makes);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header, isLoading]);

  return [makes];
};

export default useGetMakes;
