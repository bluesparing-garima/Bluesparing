export interface IGetMenu {
    header: any
    roleId?:string
}
export interface IGetMenuById {
    header: any;
    id: string;
}

export interface IMenu {
    _id: string;
    displayName: string;
    pageURL: string;
    parentOrder?: number | null;
    isActive: boolean;
    childOrder?: number | null;
    cssClass?: string;
    parentId: string;
    createdBy: string;
    role?:string;
    roleId?:string;
    createdOn: string;
    children?: IMenu[];
}


