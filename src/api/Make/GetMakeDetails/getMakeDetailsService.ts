import getMakeDetailsAPI from "./getMakeDetailsAPI";
import { GetMakeDetailsProps } from "../getMakesTypes";
import convertIMakeToIMakeVM from "../convertIMakeToIMakeVM";
import { IMakes, IMakesVM } from "../../../components/Admin/Make/IMake";
import { IResponse } from "../../IResponse";

const getMakeDetailsService = async ({
  header,
  makeId,
}: GetMakeDetailsProps): Promise<IMakesVM> => {
  try {
    const res = await getMakeDetailsAPI({
      header: header,
      makeId: makeId,
    })as IResponse<IMakes>
    return convertIMakeToIMakeVM(res.data)
  } catch (error) {
    throw error
  }

};

export default getMakeDetailsService;
