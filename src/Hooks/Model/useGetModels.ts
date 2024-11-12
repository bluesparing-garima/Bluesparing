import { useEffect, useRef, useState } from "react";
import { GetModelProps } from "../../api/Model/getModelsTypes";
import { IModels } from "../../components/Admin/Model/IModel";
import getModelsService from "../../api/Model/GetModels/getModelsService";

export const defaultModel: IModels[] = [];

const useGetModels = ({ header }: GetModelProps) => {
  const [models, setModels] = useState<IModels[]>(defaultModel);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getModelsService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          const models = apiResponse.data.filter(
            (model: IModels) => model.isActive === true
          );
          setModels(models);
        })
        .catch((res) => {
          console.error(res.status);
        });
    }
  }, [header, isLoading]);

  return [models];
};

export default useGetModels;
