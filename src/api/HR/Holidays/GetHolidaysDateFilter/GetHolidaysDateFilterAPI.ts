import fetchInterceptor, { FetchOptions } from "../../../../utils/fetchInterceptor ";
import { holidaysDateFilterEndpoint as endpoint } from "../../ApiEndpoints";
import { IGetHolidaysPayload } from "../../getHrTypes";


const GetHolidaysDateFilterAPI = async ({ header ,startDate,endDate}: IGetHolidaysPayload) => {
  const url = endpoint(startDate!,endDate!)
  const options: FetchOptions= {
    method: "GET",
    headers: header,
  }

  return fetchInterceptor(url, options)
 
};

export default GetHolidaysDateFilterAPI;