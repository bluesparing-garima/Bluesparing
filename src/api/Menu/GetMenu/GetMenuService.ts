import { IGetMenu } from "../IMenuType";
import GetMenuAPI from "./GetMenuAPI";


const GetMenuService = async ( { header,roleId }:IGetMenu ): Promise<any> => {

 try {
    const res = await GetMenuAPI({
        header: header,roleId
      })
      return res;
 } catch (error) {
    throw error;
 }

};

export default GetMenuService;
