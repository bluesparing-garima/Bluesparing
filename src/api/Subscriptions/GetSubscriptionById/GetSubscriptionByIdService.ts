import GetSubscriptionByIdApi from "./GetSubscriptionByIdApi";

const GetSubscriptionByIdService = async ( { header,id }:{header:any,id:string} ): Promise<any> => {

 try {
    const res = await GetSubscriptionByIdApi({
        header: header,id
      })
      return res;
 } catch (error) {
    throw error;
 }

};

export default GetSubscriptionByIdService;
