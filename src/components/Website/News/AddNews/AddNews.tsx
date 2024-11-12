import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import AddNewsForm from "./AddNewsForm";
import toast, { Toaster } from "react-hot-toast";
import getNewsDetailsService from "../../../../api/Website/News/GetNewsDetails/getNewsDetailsService";
import { convertINewsVMToINewsForm } from "../../../../api/Website/News/convertINewsVMToINewsForm";
import { INewsForm } from "../News/INews";

const AddNews = () => {
  const { newsId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editNewsDetails, setEditNewsDetails] = useState<INewsForm | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isAdd && newsId) {
      getNewsDetailsService({ header, newsId })
        .then((categoryDetails) => {
          const categoryNewsVMToNewsForm =
            convertINewsVMToINewsForm(categoryDetails);
          setEditNewsDetails(categoryNewsVMToNewsForm);
        })
        .catch(async (error) => {
          const err = await error;
          toast.error(err.message);
        });
    }
  }, [isAdd, newsId]);

  const title = isAdd ? "Add News " : "Update News ";

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
            to="/website/news"
            className="text-addButton font-bold text-sm"
          >
            News /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <AddNewsForm
          initialValues={{
            id: isAdd ? "0" : editNewsDetails?.id || "",
            category: isAdd ? "" : editNewsDetails?.category || "",
            categoryId: isAdd ? "" : editNewsDetails?.categoryId || "",
            title: isAdd ? "" : editNewsDetails?.title || "",
            author: isAdd ? "" : editNewsDetails?.author || "",
            image: isAdd ? "" : editNewsDetails?.image || "",
            description: isAdd ? "" : editNewsDetails?.description || "",
            website: isAdd ? "" : editNewsDetails?.website || "",
            date: isAdd ? "" : editNewsDetails?.date || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AddNews;
