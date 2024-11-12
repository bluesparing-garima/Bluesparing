

export const addBlogCategoryEndpoint = () => (`/api/blog-category`);

export const editBlogCategoryEndpoint = (categoryId: string) =>
  (`/api/blog-category/${categoryId}`);

export const getBlogCategoryEndpoint = () => (`/api/blog-category`);

export const getBlogCategorytDetailsEndpoint = (categoryId: string) =>
  (`/api/blog-category/${categoryId}`);

export const deleteBlogCategoryEndpoint = (categoryId: string) =>
  (`/api/blog-category/${categoryId}`);