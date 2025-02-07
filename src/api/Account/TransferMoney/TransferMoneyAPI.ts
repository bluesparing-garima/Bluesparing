import fetchInterceptor, { FetchOptions } from "../../../utils/fetchInterceptor ";
import { transferMoneyEp as endpoint } from "../apiEndpoints";
import { header } from "../../../context/constant";
import { IAccountTransfer } from "../../../components/Account/IAccounts";
const TransferMoneyAPI = async (payload: IAccountTransfer) => {
  const url = endpoint()
  const options: FetchOptions = {
    method: "PATCH",
    headers: header,
    body: JSON.stringify({ ...payload }),
  }
  return fetchInterceptor(url, options)
};

export default TransferMoneyAPI;
