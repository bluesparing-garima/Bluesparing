import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getCalculatePayInEndpoint as endpoint } from "../apiEndpoints";
import { GetCalculateTypeProps } from "../geCalculateTypes";

const getCalculatePayinAPI = async (props: GetCalculateTypeProps) => {
  const url = endpoint(
    props.fuelType!,
    props.policyType!,
    props.companyName!,
    props.productType!,
    props.subCategory!,
    props.engine!,
    props.weight!,
    props.ncb!,
    props.rto!,
    props.caseType!,
    props.make!,
    props.model!,
    props.vehicleAge!
  );
  const options: FetchOptions = {
    method: "GET",
    headers: props.header,
  }

  return fetchInterceptor(url, options)

};

export default getCalculatePayinAPI;
