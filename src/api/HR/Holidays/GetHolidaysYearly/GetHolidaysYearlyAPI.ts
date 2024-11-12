import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { holidaysYearEndpoint as endpoint } from "../../ApiEndpoints";
import { IGetHolidaysPayload } from "../../getHrTypes";


const GetHolidaysYearlyAPI = async ({ header }: IGetHolidaysPayload) => {
  const url = endpoint()
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
 
};

export default GetHolidaysYearlyAPI;