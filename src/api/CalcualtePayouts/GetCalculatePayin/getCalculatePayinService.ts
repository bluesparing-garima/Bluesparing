import getCalculatePayinAPI from "./getCalculatePayinAPI";
import { GetCalculateTypeProps } from "../geCalculateTypes";

const getCalculatePayinService = async (props: GetCalculateTypeProps): Promise<any> => {
  try {
    const resData = await getCalculatePayinAPI(props)
    return resData
  } catch (error) {
    throw error;}

};

export default getCalculatePayinService;
