import { useEffect, useRef, useState } from "react";
import { IMenu } from "../../api/Menu/IMenuType";
import { header } from "../../context/constant";
import GetMenuService from "../../api/Menu/GetMenu/GetMenuService";
export const defaultMenu: IMenu[] = [];

const useGetMenuByRoleId = (roleId:string) => {
  const [menuData, setMenuData] = useState<IMenu[]>(defaultMenu);
  const isLoading = useRef(true);
  useEffect(() => {
    if (isLoading.current) {
      GetMenuService({ header,roleId })
        .then((apiResponse) => {
          isLoading.current = false;
          const menu = apiResponse.data.filter(
            (branch: IMenu) => branch.isActive === true
          );
          setMenuData(menu);
        })
        .catch((res) => {
          throw new Error(res.status);
        });
    }
  }, [header, isLoading]);

  return [menuData];
};



export default useGetMenuByRoleId;;