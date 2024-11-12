import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { getFilterPoliciesEndpoint as endpoint } from "../apiEndpoints";
import { GetFilterPoliciesTypeProps } from "../getCalculatationTypes";

const getFilterPoliciesAPI = async (
  props: GetFilterPoliciesTypeProps
) => {
  const url = endpoint(
    props.fuelType!,
    props.policyType!,
    props.companyName!,
    props.productType!,
    props.subCategory!,
    props.cc!,
    props.weight!,
    props.ncb!,
    props.rto!,
    props.broker!,
    props.seatingCapacity!,
    // props.insuredType!,
    props.caseType!,
    props.make!,
    props.model!,
    props.vehicleAge!
  )
  const options: FetchOptions = {
    method: "GET",
    headers: props.header,
  }

  return fetchInterceptor(url, options)

};

export default getFilterPoliciesAPI;
