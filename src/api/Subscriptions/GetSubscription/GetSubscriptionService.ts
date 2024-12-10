import GetSubscriptionAPI from "./GetSubscriptionAPI";

const GetSubscriptionService = async ( { header }:{header:any} ): Promise<any> => {

 try {
    const res = await GetSubscriptionAPI({
        header: header
      })
      return res;
 } catch (error) {
    throw error;
 }

};

export default GetSubscriptionService;
