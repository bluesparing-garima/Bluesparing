import getCalculatePayOutAPI from "./getCalculatePayOutAPI";
import { GetCalculateTypeProps } from "../geCalculateTypes";

const getCalculatePayOutService = async (props: GetCalculateTypeProps): Promise<any> => {
  try {
    const resData = await getCalculatePayOutAPI(props)
    return resData
  } catch (error) {
    throw error;}

};

export default getCalculatePayOutService;
