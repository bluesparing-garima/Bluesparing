import getPolicyTypeAPI from "./getPolicyTypeAPI";
import { GetPolicyTypeProps } from "../getPolicyTypes";

const getPolicyTypeService = async ({ header }: GetPolicyTypeProps): Promise<any> => {

  try {
    const res = await getPolicyTypeAPI({
      header: header,
    })
    return res;
  } catch (error) {
    throw error
  }

};

export default getPolicyTypeService;
