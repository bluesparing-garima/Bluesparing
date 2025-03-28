export interface IPaginationProps {
    pageIndex: number;
    pageSize: number;
  }
export const getPaginationState = (STORAGE_KEY:string): IPaginationProps => {
    try {
      const savedState = sessionStorage.getItem(STORAGE_KEY);
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      throw error
    }
    return { pageIndex: 0, pageSize: 5 };
  };
 export  const savePaginationState = (pagination: IPaginationProps,STORAGE_KEY:string) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pagination));
    } catch (error) {
      throw error
    }
  };