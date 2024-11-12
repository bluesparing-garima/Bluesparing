
export const addNewsEndpoint = () =>
(`/api/news-letter`);

export const editNewsEndpoint = (blogId: string) =>
(`/api/news-letter/${blogId}`);

export const getNewsEndpoint = () =>
(`/api/news-letter`);

export const getNewstDetailsEndpoint = (blogId: string) =>
(`/api/news-letter/${blogId}`);

export const deleteNewsEndpoint = (blogId: string) =>
(`/api/news-letter/${blogId}`);
