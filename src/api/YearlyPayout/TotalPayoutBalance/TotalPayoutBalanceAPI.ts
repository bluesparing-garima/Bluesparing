import fetchInterceptor, { FetchOptions } from '../../../utils/fetchInterceptor ';
import { TotalPayoutBalanceEndpoint as endpoint } from '../apiEndpoints'
import { getTotalProps } from "../getYearlyPayoutType";


const TotalPayoutBalanceAPI = async ({ header,category }: getTotalProps) => {
    const url = endpoint( category)
    const options: FetchOptions = {
      method: "GET",
      headers: header,
    }
  
    return fetchInterceptor(url, options)    
};

export default TotalPayoutBalanceAPI;