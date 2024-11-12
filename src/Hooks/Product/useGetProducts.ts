import { useEffect, useRef, useState } from "react";
import getProductsService from "../../api/Product/GetProducts/getProductsService";
import { GetProductProps } from "../../api/Product/getProductsTypes";
import { IProducts } from "../../components/Admin/Product/IProduct";

export const defaultProduct: IProducts[] = [];

const useGetProducts = ({ header }: GetProductProps) => {
  const [products, setProducts] = useState<IProducts[]>(defaultProduct);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getProductsService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          const productList = apiResponse.data.filter(
            (product: IProducts) => product.isActive === true
          );
          setProducts(productList);
        })
        .catch((res) => {
          console.error(res.status);
        });
    }
  }, [header, isLoading]);

  return [products];
};

export default useGetProducts;
