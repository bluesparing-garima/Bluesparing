import { IGetMenuById } from "../IMenuType";
import GetMenuByIdApi from "./GetMenuByIdApi";

const GetMenuByIdService = async ( { header,id }:IGetMenuById): Promise<any> => {

 try {
    const res = await GetMenuByIdApi({
        header: header,id
      })
      return res;
 } catch (error) {
    throw error;
 }

};

export default GetMenuByIdService;
