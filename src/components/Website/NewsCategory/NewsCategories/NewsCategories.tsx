import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  NEWS_CATEGORY_STORAGE_KEY,
  DAYJS_DISPLAY_FORMAT,
  header,
} from "../../../../context/constant";
import {
  INewsCategories,
  INewsCategoriesVM,
  INewsCategoryForm,
} from "../INewsCategory";
//import dayjs from "dayjs";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { newsCategoryEditPath, newsCategoryAddPath } from "../../../../sitemap";
import dayjs from "dayjs";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import toast, { Toaster } from "react-hot-toast";
import {
  getPaginationState,
  savePaginationState,
} from "../../../../utils/PaginationHandler";
import { convertINewsCategoryVMToINewsCategoryForm } from "../../../../api/Website/NewsCategory/convertINewsCategoryVMToINewsCategoryForm";
import editNewsCategoryService from "../../../../api/Website/NewsCategory/EditNewsCategory/editNewsCategoryService";
import getNewsCategoriesService from "../../../../api/Website/NewsCategory/GetNewsCategory/getNewsCategoriesService";

const NewsCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsCategories, setNewsCategories] = useState<INewsCategories[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const handleAddNewsCategoryClick = () => {
    savePaginationState(pagination, NEWS_CATEGORY_STORAGE_KEY);
    navigate(newsCategoryAddPath());
  };
  const GetNewsCategories = useCallback(
    () =>
      getNewsCategoriesService({ header })
        .then((categoryDetails) => {
          setNewsCategories(categoryDetails.data);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        }),
    []
  );
  useEffect(() => {
    GetNewsCategories();
  }, [GetNewsCategories]);

  useEffect(() => {
    const p = getPaginationState(NEWS_CATEGORY_STORAGE_KEY);
    setPagination(p);
  }, []);
  const callUpdateBranchAPI = async (branch: INewsCategoriesVM) => {
    var convertCategoryVMToCategoryForm =
      convertINewsCategoryVMToINewsCategoryForm(branch);

    const branchData: INewsCategoryForm = {
      ...convertCategoryVMToCategoryForm,
      isActive: !convertCategoryVMToCategoryForm.isActive,
    };

    editNewsCategoryService({ header, category: branchData })
      .then(() => {
        GetNewsCategories();
      })
      .catch(async (error: any) => {
        const err = await error;
        toast.error(err.message);
      })
      .finally(() => {
        updateLoading();
      });
  };

  const handleClickChangeStatus = (branch: INewsCategoriesVM) => {
    callUpdateBranchAPI(branch);
  };
  const [forcedRenderCount, setForcedRenderCount] = useState(0);
  const forceRender = useCallback(
    () => setForcedRenderCount(forcedRenderCount + 1),
    [forcedRenderCount]
  );
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<INewsCategories>[]>(
    () => [
      {
        accessorKey: "category", //normal accessorKey
        header: "Category Name",
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
      newsCategories.map(
        (category: INewsCategories) =>
          ({
            id: category._id,
            category: category.category,
            isActive: category.isActive,
            createdOn: dayjs(category.createdOn).format(DAYJS_DISPLAY_FORMAT),
            updatedOn: dayjs(category.updatedOn).format(DAYJS_DISPLAY_FORMAT),
            forceUpdate: forcedRenderCount,
          } as INewsCategoriesVM)
      ) ?? [],
    [newsCategories, forcedRenderCount]
  );

  const updateLoading = useCallback(async () => {
    // setIsLoading(true) when newsCategories.length is 0, and setIsLoading(false) when newsCategories.length is > 0
    setIsLoading(newsCategories.length >= 0 ? false : true);
  }, [newsCategories]);

  useEffect(() => {
    updateLoading();
  }, [updateLoading]);

  const handleClickEditCategory = (category: INewsCategoriesVM) => {
    savePaginationState(pagination, NEWS_CATEGORY_STORAGE_KEY);
    navigate(newsCategoryEditPath(category.id!));
  };


  return (
    <>
      <div className="bg-blue-200 md:p-7 p-2">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            News Category Table
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
                <span className="text-grey-600 text-sm"> News Categories</span>
              </div>
              <Button
                type="button"
                className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                onClick={handleAddNewsCategoryClick}
              >
                Add News Category
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
                <Tooltip title={"Edit Category"}>
                  <IconButton
                    color="primary"
                    aria-label={"Edit Category"}
                    component="span"
                    onClick={() => {
                      handleClickEditCategory(
                        row.original as INewsCategoriesVM
                      );
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
                      handleClickChangeStatus(row.original as INewsCategoriesVM)
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
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default NewsCategories;
