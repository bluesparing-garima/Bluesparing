import { Header } from "../../Auth/IAuth";
import { IPolicyPayment } from "../../components/Policy/IPolicy";

export interface EditPolicyPaymentProps {
  header: Header;
  policyPayment: IPolicyPayment;
}
