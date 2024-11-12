import addPercentageAPI from "./addPercenatgeAPI";
import { AddEditPercentageProps } from "../getPercentageTypes";

const addPercentageService = async ({
  header,
  policy,
}: AddEditPercentageProps): Promise<any> => {
  try {
    const res = await addPercentageAPI({
      header: header,
      policy: policy,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default addPercentageService;
