import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import AddBlogForm from "./AddBlogForm";
import toast, { Toaster } from "react-hot-toast";
import { IBlogForm } from "../Blogs/IBlogs";
import getBlogDetailsService from "../../../../api/Website/Blog/GetBlogDetails/getBlogDetailsService";
import { convertIBlogVMToIBlogForm } from "../../../../api/Website/Blog/convertIBlogVMToIBlogForm";

const AddBlog = () => {
  const { blogId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editBlogDetails, setEditBlogDetails] = useState<IBlogForm | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isAdd && blogId) {
      getBlogDetailsService({ header, blogId })
        .then((categoryDetails) => {
          const categoryBlogVMToBlogForm =
            convertIBlogVMToIBlogForm(categoryDetails);
          setEditBlogDetails(categoryBlogVMToBlogForm);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        });
    }
  }, [isAdd, blogId]);

  const title = isAdd ? "Add Blog " : "Update Blog ";

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
          <Link
            to="/website/blogs"
            className="text-addButton font-bold text-sm"
          >
            Blogs /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <AddBlogForm
          initialValues={{
            id: isAdd ? "0" : editBlogDetails?.id || "",
            category: isAdd ? "" : editBlogDetails?.category || "",
            categoryId: isAdd ? "" : editBlogDetails?.categoryId || "",
            title: isAdd ? "" : editBlogDetails?.title || "",
            author: isAdd ? "" : editBlogDetails?.author || "",
            image: isAdd ? "" : editBlogDetails?.image || "",
            description: isAdd ? "" : editBlogDetails?.description || "",
            website: isAdd ? "" : editBlogDetails?.website || "",
            date: isAdd ? "" : editBlogDetails?.date || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AddBlog;
