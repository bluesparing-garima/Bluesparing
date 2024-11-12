// getFuelTypeService.ts

import getFuelTypesAPI from "./getFuelTypesAPI";
import { GetFuelTypeProps } from "../getFuelTypes";

const getFuelTypeService = async ({ header }: GetFuelTypeProps): Promise<any> => {
  try {
    const res = await getFuelTypesAPI({
      header
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getFuelTypeService;
