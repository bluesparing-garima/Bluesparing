

export const getMenuEndpoint = (roleId?: string) => {
  if (roleId) {
    return (`/api/menus?roleId=${roleId}`)
  } else {
    return (`/api/menus`);
  }
}

export const getMenuByIdEndpoint = (menuId: string) =>
  (`/api/menus/${menuId}`);


