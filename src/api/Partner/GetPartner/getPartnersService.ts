import getPartnersAPI from "./getPartnersAPI";
import { GetPartnerProps } from "../getPartnersTypes";

const getPartnersService = async ({ header, role }: GetPartnerProps): Promise<any> => {
  try {
    const res = await getPartnersAPI({
      header: header,
      role: role,
    })

    return res;
  } catch (error) {
    throw error
  }


};

export default getPartnersService;
