import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { IBlogCategoryForm } from "../IBlogCategory";
import AddCategoryForm from "./AddBlogCategoryForm";
import toast, { Toaster } from "react-hot-toast";
import { convertIBlogCategoryVMToIBlogCategoryForm } from "../../../../api/Website/Category/convertIBlogCategoryVMToIBlogCategoryForm";
import getBlogCategoryDetailsService from "../../../../api/Website/Category/GetBlogCategoryDetails/getBlogCategoryDetailsService";

const AddBlogCategory = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editCategoryDetails, setEditCategoryDetails] = useState<
    IBlogCategoryForm | undefined
  >(undefined);

  useEffect(() => {
    if (!isAdd && categoryId) {
      getBlogCategoryDetailsService({ header, categoryId })
        .then((categoryDetails) => {
          const categoryVMToCategoryForm =
            convertIBlogCategoryVMToIBlogCategoryForm(categoryDetails);
          setEditCategoryDetails(categoryVMToCategoryForm);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        });
    }
  }, [isAdd, categoryId]);

  const title = isAdd ? "Add Blog Category" : "Update Blog Category";

  return (
    <div className="bg-blue-200 md:p-7 p-2">
      <Paper
        elevation={3}
        style={{ padding: 20, margin: 30, borderRadius: 10 }}
      >
        <Typography className="text-safekaroDarkOrange" variant="h5">
          {title}
        </Typography>
        <Typography variant="h5" mb={2}>
          <Link to="/dashboard" className="text-addButton font-bold text-sm">
            Dashboard {" / "}
          </Link>
          <Link to="/website/blogcategories" className="text-addButton font-bold text-sm">
            Blog Categories /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <AddCategoryForm
          initialValues={{
            id: isAdd ? "0" : editCategoryDetails?.id || "",
            category: isAdd ? "" : editCategoryDetails?.category || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AddBlogCategory;
