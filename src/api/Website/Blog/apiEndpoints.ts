export const addBlogEndpoint = () => (`/api/blogs`);

export const editBlogEndpoint = (blogId: string) =>
  (`/api/blogs/${blogId}`);

export const getBlogEndpoint = () => (`/api/blogs`);

export const getBlogDetailsEndpoint = (blogId: string) =>
  (`/api/blogs/${blogId}`);

export const deleteBlogEndpoint = (blogId: string) =>
  (`/api/blogs/${blogId}`);
