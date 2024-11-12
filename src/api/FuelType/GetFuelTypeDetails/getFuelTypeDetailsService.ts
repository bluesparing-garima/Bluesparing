import getFuelTypeDetailsAPI from "./getFuelTypeDetailsAPI";
import { GetFuelTypeDetailsProps } from "../getFuelTypes";
import convertIFuelTypeToIFuelTypeVM from "../convertIFuelTypeToIFuelTypeVM";
import { IFuelTypes, IFuelTypesVM } from "../../../components/Admin/FuelType/IFuelTypes";
import { IResponse } from "../../IResponse";

const getFuelTypeDetailsService = async ({
  header,
    fuelTypeId,
}: GetFuelTypeDetailsProps):Promise<IFuelTypesVM> => {

  try {
    const res = await getFuelTypeDetailsAPI({
      header: header,
      fuelTypeId: fuelTypeId,
    }) as IResponse<IFuelTypes>
    return convertIFuelTypeToIFuelTypeVM(res.data)
  } catch (error) {
    throw error
  }

};

export default getFuelTypeDetailsService;
