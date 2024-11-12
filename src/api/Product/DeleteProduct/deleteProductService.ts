import deleteProductAPI from "./deleteProductAPI";
import { DeleteProductProps } from "../getProductsTypes";

const deleteProductService = async ({
  header,
  productId,
  products,
}: DeleteProductProps): Promise<any> => {

  try {
    await deleteProductAPI({
      header,
      productId,
      products,
    })
    const deletedProductIndex = products.findIndex((product) => product._id === productId);
    products.splice(deletedProductIndex, 1);
    return products;
  } catch (error) {
    throw error
  }

};

export default deleteProductService;
