import GetAdminSubscriptionAPI from "./GetAdminSubscriptionAPI";


const GetAdminSubscriptionService = async ( { header ,id}:{header:any,id:string} ): Promise<any> => {

 try {
    const res = await GetAdminSubscriptionAPI({
        header: header,id
      })
      return res;
 } catch (error) {
    throw error;
 }

};

export default GetAdminSubscriptionService;