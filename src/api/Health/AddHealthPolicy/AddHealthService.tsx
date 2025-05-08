
import { IAddHealth } from "../IHealth";
import AddHealthApi from "./AddHealthApi";

const AddHealthService = async ({healthData}:IAddHealth): Promise<any> => {
  try {
    const res = await AddHealthApi({
      healthData,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default AddHealthService;
