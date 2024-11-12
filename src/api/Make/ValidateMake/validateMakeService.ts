import validateMakeAPI from "./validateMakeAPI";
import { ValidateMakeDetailsProps } from "../getMakesTypes";

const validateMakeService = async ({
  header,
  makeName,
}: ValidateMakeDetailsProps): Promise<any> => {
  try {
    const res = await validateMakeAPI({
      header: header,
      makeName: makeName,
    })
    return res
  } catch (error) {
    throw error
  }

};

export default validateMakeService;
