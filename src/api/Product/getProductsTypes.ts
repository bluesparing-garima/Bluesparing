import { Header } from "../../Auth/IAuth";
import { IProductForm, IProducts } from "../../components/Admin/Product/IProduct";

export interface AddEditProductProps {
  header: Header;
  product: IProductForm;
}

export interface GetProductProps {
  header?: Header;
}

export interface GetProductDetailsProps {
  header?: Header;
  productId?: string;
}

export interface DeleteProductProps {
  header?: Header;
  productId?: string;
  products: IProducts[];
}
