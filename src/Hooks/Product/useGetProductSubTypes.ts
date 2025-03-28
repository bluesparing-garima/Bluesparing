import { useEffect, useRef, useState } from "react";
import getProductSubTypeService from "../../api/ProductSubType/GetProductSubType/getProductSubTypeService";
import { GetProductSubTypeProps } from "../../api/ProductSubType/getProductSubTypes";
import { IProductSubTypes } from "../../components/Admin/ProductSubType/IProductSubTypes";

export const defaultProductSubTypes: IProductSubTypes[] = [];

const useGetProductSubTypes = ({ header }: GetProductSubTypeProps) => {
  const [productSubTypes, setProductSubTypes] = useState<IProductSubTypes[]>(
    defaultProductSubTypes
  );
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      getProductSubTypeService({ header })
        .then((apiResponse) => {
          isLoading.current = false;
          const productSubList = apiResponse.data.filter(
            (product: IProductSubTypes) => product.isActive === true
          );
          setProductSubTypes(productSubList);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header, isLoading]);

  return [productSubTypes];
};

export default useGetProductSubTypes;
