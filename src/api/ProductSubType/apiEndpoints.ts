


export const addProductSubTypeEndpoint = () => (`/api/product-type`);

export const editProductSubTypeEndpoint = (productSubTypeId: string) =>
  (`/api/product-type/${productSubTypeId}`);

export const getProductSubTypeEndpoint = () => (`/api/product-type`);

export const getProductSubTypeDetailsEndpoint = (productSubTypeId: string) =>
  (`/api/product-type/${productSubTypeId}`);

export const deleteProductSubTypeEndpoint = (productSubTypeId: string) =>
  (`/api/product-type/${productSubTypeId}`);
