import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  DAYJS_DISPLAY_FORMAT,
  header,
  PRODUCT_STORAGE_KEY,
} from "../../../../context/constant";
import { IProductForm, IProducts, IProductsVM } from "../IProduct";
//import dayjs from "dayjs";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  productAddPath,
  productEditPath,
  productSubTypesDirectAddPath,
} from "../../../../sitemap";
import deleteProductService from "../../../../api/Product/DeleteProduct/deleteProductService";
import dayjs from "dayjs";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import getProductsService from "../../../../api/Product/GetProducts/getProductsService";
import { convertIProductVMToIProductForm } from "../../../../api/Product/convertIProductVMToIProductForm";
import editProductService from "../../../../api/Product/EditProduct/editProductService";
import toast, { Toaster } from "react-hot-toast";
import {
  getPaginationState,
  savePaginationState,
} from "../../../../utils/PaginationHandler";
const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProducts] = useState<IProducts[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    savePaginationState(pagination, PRODUCT_STORAGE_KEY);
    navigate(productAddPath());
  };
  const GetProducts = useCallback(
    () =>
      getProductsService({ header })
        .then((productsDetails) => {
          setProducts(productsDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
          console.error("Failed to fetch product details", error);
        }),
    []
  );
  useEffect(() => {
    GetProducts();
  }, [GetProducts]);
  useEffect(() => {
    const p = getPaginationState(PRODUCT_STORAGE_KEY);
    setPagination(p);
  }, []);
  const callUpdateProductAPI = async (product: IProductsVM) => {
    var convertProductVMToProductForm =
      convertIProductVMToIProductForm(product);

    const productData: IProductForm = {
      ...convertProductVMToProductForm,
      isActive: !convertProductVMToProductForm.isActive,
    };

    editProductService({ header, product: productData })
      .then(() => {
        GetProducts();
      })
      .catch(async (error) => {
        const err = await error;
        toast.error(err.message);
      })
      .finally(() => {
        updateLoading();
      });
  };

  const handleClickChangeStatus = (product: IProductsVM) => {
    callUpdateProductAPI(product);
  };
  const [forcedRenderCount, setForcedRenderCount] = useState(0);
  const forceRender = useCallback(
    () => setForcedRenderCount(forcedRenderCount + 1),
    [forcedRenderCount]
  );
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<IProducts>[]>(
    () => [
      {
        accessorKey: "categoryName", //normal accessorKey
        header: "Category Name",
        size: 200,
      },
      {
        accessorKey: "productName", //normal accessorKey
        header: "Product Name",
        size: 200,
      },
      {
        header: "Status",
        accessorKey: "isActive",
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue<boolean>();
          return value ? (
            <CheckCircleOutlineIcon color="success" />
          ) : (
            <CancelOutlinedIcon color="error" />
          );
        },
      },

      {
        header: "Created On",
        accessorKey: "createdOn",
        size: 50,
      },
    ],
    []
  );

  const parsedData = useMemo(
    () =>
      productData.map(
        (product: IProducts) =>
          ({
            id: product._id,
            categoryId: product.categoryId,
            categoryName: product.categoryName,
            productName: product.productName,
            isActive: product.isActive,
            createdOn: dayjs(product.createdOn).format(DAYJS_DISPLAY_FORMAT),
            updatedOn: dayjs(product.updatedOn).format(DAYJS_DISPLAY_FORMAT),
            forceUpdate: forcedRenderCount,
          } as IProductsVM)
      ) ?? [],
    [productData, forcedRenderCount]
  );

  const updateLoading = useCallback(async () => {
    // setIsLoading(true) when products.length is 0, and setIsLoading(false) when products.length is > 0
    setIsLoading(productData.length >= 0 ? false : true);
  }, [productData]);

  useEffect(() => {
    updateLoading();
  }, [updateLoading]);

  const handleClickDeleteProduct = (product: IProductsVM) => {
    productDeleteApiCall(product.id!);
  };
  const handleClickEditProduct = (product: IProductsVM) => {
    savePaginationState(pagination, PRODUCT_STORAGE_KEY);
    navigate(productEditPath(product.id!));
  };
  const handleClickAddProductSubCategory = (product: IProductsVM) => {
    savePaginationState(pagination, PRODUCT_STORAGE_KEY);
    navigate(productSubTypesDirectAddPath(product.id!), {
      state: product,
    });
  };

  const productDeleteApiCall = async (productId: string) => {
    setIsLoading(true);
    deleteProductService({ header, productId, products: productData })
      .then((refreshedProducts) => {
        setProducts(refreshedProducts);
        forceRender();
      })
      .catch(async (error: any) => {
        const err = await error;
        toast.error(err.message);
      })
      .finally(() => {
        updateLoading();
      });
  };
  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Product Table
          </Typography>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to="/dashboard"
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm"> Product</span>
              </div>
              <Button
                type="button"
                className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                onClick={handleAddProductClick}
              >
                Add Product
              </Button>
            </div>
            {/* Add a full-width grey line here */}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <MaterialReactTable
            state={{ isLoading, pagination }}
            columns={columns}
            data={parsedData}
            enableRowActions
            positionActionsColumn="last"
            onPaginationChange={setPagination}
            autoResetPageIndex={false}
            renderRowActions={({ row }) => (
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Tooltip title={"Edit Product"}>
                  <IconButton
                    color="primary"
                    aria-label={"Edit Product"}
                    component="span"
                    onClick={() => {
                      handleClickEditProduct(row.original as IProductsVM);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 text-addButton"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Change Status"}>
                  <IconButton
                    color="primary"
                    aria-label={"Change Status"}
                    component="span"
                    onClick={() =>
                      handleClickChangeStatus(row.original as IProductsVM)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 text-addButton"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              </div>
            )}
          />
        </Paper>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default Products;