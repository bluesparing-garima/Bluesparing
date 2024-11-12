/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import {
  ADD,
  ALLOWED_BLOG_FILE_TYPES,
  DAY_FORMAT,
  header,
  MAX_FILE_SIZE,
} from "../../../../context/constant";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { blogPath } from "../../../../sitemap";
import toast, { Toaster } from "react-hot-toast";
import { IBlogForm } from "../Blogs/IBlogs";
import addBlogServices from "../../../../api/Website/Blog/AddBlog/addBlogServices";
import editBlogService from "../../../../api/Website/Blog/EditBlog/editBlogService";
import useGetBlogCategories from "../../../../Hooks/website/Category/useGetBlogCategories";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export interface addPolicyTypeFormProps {
  initialValues: IBlogForm;
}
// Custom Toolbar for ReactQuill
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option value="" />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-link" />
    <button className="ql-image" /> {/* Image button */}
  </div>
);
const AddBlogForm = (props: addPolicyTypeFormProps) => {
  const { initialValues } = props;
  let { blogId } = useParams();
  let [categories] = useGetBlogCategories({ header: header });
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation() as any;
  const pathName = location.pathname.split("/");
  const isAddEdit = pathName[pathName.length - 1] as string;
  const isAdd = isAddEdit === ADD;
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for file upload
  const [editorContent, setEditorContent] = useState<string>("");
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    if (initialValues.description) {
      setEditorContent(initialValues.description);
    }
  }, [initialValues.description]);
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();

      // Use MutationObserver instead of deprecated events
      const observer = new MutationObserver(() => {
        console.log("DOM changed");
      });

      const editorContainer = editor.root;
      observer.observe(editorContainer, {
        childList: true,
        subtree: true,
      });

      // Cleanup the observer when the component unmounts
      return () => {
        observer.disconnect();
      };
    }
  }, [quillRef]);
  // To be passed to React Final Form
  const validateFormValues = (schema: any) => async (values: any) => {
    if (typeof schema === "function") {
      schema = schema();
    }
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (err: any) {
      const errors = err.inner.reduce((formError: any, innerError: any) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {});

      return errors;
    }
  };

  const validationSchema = yup.object().shape({
    date: yup.string().required("Date is required").nullable(),
    website: yup.string().nullable().required("Website is required"),
    category: yup.string().nullable().required("Category is required"),
    title: yup
      .string()
      .required("Title Name is required")
      .min(1, "Title must be at least 1 character")
      .max(100, "Title cannot exceed 100 characters"),
    author: yup
      .string()
      .required("Author Name is required")
      .min(1, "Author must be at least 1 character")
      .max(100, "Author cannot exceed 100 characters"),
  });

  const validate = validateFormValues(validationSchema);

  const onSubmit = async (blogForm: IBlogForm) => {
    const isRegDateValid = dayjs(blogForm.date).isValid();
    if (!isRegDateValid) {
      toast.error("Invalid Publish Date");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile!); // Append the selected file to form data
    let blogFormDate = dayjs(blogForm.date).format(DAY_FORMAT);
    formData.append("date", blogFormDate!);
    formData.append("categoryId", selectedCategoryId!);
    formData.append("title", blogForm.title!);
    formData.append("author", blogForm.author!);
    formData.append("website", blogForm.website!);
    formData.append("description", editorContent);
    formData.append("category", blogForm.category!);
    formData.append("createdBy", "Admin");

    if (isAdd) {
      callAddBlogAPI(formData);
    } else {
      callEditBlogAPI(formData);
    }
  };

  const navigateToBlogs = (message: string) => {
    navigate(blogPath(), {
      state: message,
    });
  };

  const callAddBlogAPI = async (blogForm: any) => {
    try {
      const blog = await addBlogServices({ header, blog: blogForm });
      navigateToBlogs(`${blog.message}`);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };

  const callEditBlogAPI = async (blogForm: any) => {
    try {
      const blog = await editBlogService({ header, blog: blogForm, blogId });
      navigateToBlogs(`${blog.message}`);
    } catch (error: any) {
      const err = await error;
      toast.error(err.message);
    }
  };
  // Handle file input for image upload
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (
      file &&
      ALLOWED_BLOG_FILE_TYPES.includes(file.type) &&
      file.size <= MAX_FILE_SIZE
    ) {
      setSelectedFile(file);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid file type or file size exceeds the limit.");
    }
  };

  // Handle content change from the editor
  const handleEditorChange = (content: string) => {
    setEditorContent(content); // Set the content safely
  };

  // // Custom image handler to upload and insert images
  // const imageHandler = () => {
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  //   input.onchange = async () => {
  //     const file = input.files ? input.files[0] : null;
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const quillEditor = quillRef.current?.getEditor();
  //         const range = quillEditor?.getSelection(true); // Safe selection
  //         quillEditor?.insertEmbed(range?.index || 0, "image", reader.result); // Insert image
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };
  // };

  // Define custom toolbar and handler for the image upload
  // const modules = {
  //   toolbar: {
  //     container: "#toolbar",
  //     handlers: {
  //       image: imageHandler, // Attach custom image handler
  //     },
  //   },
  // };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit, submitting, errors }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Field name="category">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="category"
                          value={
                            input.value !== undefined
                              ? input.value
                              : initialValues.category || null
                          }
                          options={categories} // Replace with your options array
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.category || ""
                          }
                          //getOptionLabel={(option) => option.category}
                          onChange={(event, newValue) => {
                            input.onChange(newValue.category);
                            setSelectedCategoryId(newValue._id);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Select Category"
                              className="rounded-sm w-full"
                              size="small"
                              variant="outlined"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        />
                      </FormControl>
                    </div>
                  )}
                </Field>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Field name="website">
                  {({ input, meta }) => {
                    let defaultValue = "";
                    defaultValue = initialValues.website || "";
                    return (
                      <div>
                        <FormControl fullWidth size="small">
                          <Autocomplete
                            {...input}
                            id="website"
                            value={input.value ? input.value : defaultValue}
                            getOptionLabel={(option) =>
                              typeof option === "string"
                                ? option
                                : option.label || ""
                            }
                            onChange={(event, newValue) => {
                              input.onChange(
                                newValue ? newValue.value : defaultValue
                              );
                            }}
                            options={[
                              { label: "Safekaro", value: "safekaro" },
                              { label: "BlueSparing", value: "bluesparing" },
                            ]} // Replace with your options array
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select Website"
                                className="rounded-sm w-full"
                                size="small"
                                variant="outlined"
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                              />
                            )}
                          />
                        </FormControl>
                      </div>
                    );
                  }}
                </Field>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Field name="title">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Title"
                      size="small"
                      type="text"
                      variant="outlined"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Field name="author">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Author"
                      type="text"
                      variant="outlined"
                      size="small"
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Field name="date">
                  {({ input, meta }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disableFuture
                        label="Publish Date"
                        value={input.value || null} // Initialize the value if it's undefined
                        onChange={(date) => input.onChange(date)}
                        renderInput={(params: any) => (
                          <TextField
                            variant="outlined"
                            size="small"
                            id="date"
                            fullWidth
                            {...params}
                            error={meta.touched && !!meta.error}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                </Field>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <input
                  id="image"
                  type="file"
                  onChange={handleFileInputChange}
                  style={{
                    border: "1px solid #c4c4c4",
                    padding: "5px",
                    width: "100%",
                    borderRadius: "5px",
                  }}
                />
                {errors?.file && (
                  <span style={{ color: "red" }}>{errorMessage}</span>
                )}
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {/* <Field name="description">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Enter Description"
                      type="text"
                      variant="outlined"
                      size="small"
                      rows={4}
                      multiline
                      className="rounded-sm w-full"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field> */}
                <CustomToolbar />
                <ReactQuill
                  ref={quillRef} // Attach the ref to the Quill instance
                  value={editorContent} // Bind the editor content
                  onChange={handleEditorChange} // Handle content changes
                  //modules={modules} // Attach custom toolbar and image handler
                  theme="snow" // Use the "snow" theme
                  placeholder="Write something amazing..."
                />
                {/* <div>
                  <div dangerouslySetInnerHTML={{ __html: editorContent }} />{" "}
                </div> */}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  disabled={submitting}
                  variant="contained"
                  color="primary"
                  className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                >
                  {isAdd ? "Add Blog" : "Update Blog"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default AddBlogForm;