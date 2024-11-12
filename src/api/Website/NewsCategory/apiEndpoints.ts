

export const addNewsCategoryEndpoint = () =>
(`/api/news-letter-category`);

export const editNewsCategoryEndpoint = (categoryId: string) =>
(`/api/news-letter-category/${categoryId}`);

export const getNewsCategoryEndpoint = () =>
(`/api/news-letter-category`);

export const getNewsCategoryDetailsEndpoint = (categoryId: string) =>
(`/api/news-letter-category/${categoryId}`);

export const deleteNewsCategoryEndpoint = (categoryId: string) =>
(`/api/news-letter-category/${categoryId}`);
