import getPolicyTypeDetailsAPI from "./getPolicyTypeDetailsAPI";
import { GetPolicyTypeDetailsProps } from "../getPolicyTypes";
import convertIPolicyTypeToIPolicyTypeVM from "../convertIPolicyTypeToIPolicyTypeVM";
import { IPolicyTypes, IPolicyTypesVM } from "../../../components/Admin/PolicyType/IPolicyType";
import { IResponse } from "../../IResponse";

const getPolicyTypeDetailsService = async ({
  header,
  policyTypeId,
}: GetPolicyTypeDetailsProps): Promise<IPolicyTypesVM> => {

  try {
    const res = await getPolicyTypeDetailsAPI({
      header: header,
      policyTypeId: policyTypeId,
    })as IResponse<IPolicyTypes>
    return convertIPolicyTypeToIPolicyTypeVM(res.data)
  } catch (error) {
    throw error
  }

};

export default getPolicyTypeDetailsService;
