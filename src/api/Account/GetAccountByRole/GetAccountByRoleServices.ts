
import {  GetAccountByRoleProps } from "../getAccountTypes";
import GetAccountByRoleAPI from "./GetAccountByRoleAPI";

const GetAccountByRoleServices = async ({
  header,
  partnerId,role
}: GetAccountByRoleProps): Promise<any> => {
  try {
    const resData = await GetAccountByRoleAPI({
      header: header,
      partnerId,role
    })

    return resData;
  } catch (error) {

    throw error;
  }

};

export default GetAccountByRoleServices;
