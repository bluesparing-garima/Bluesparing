export interface IAdmin {
    _id: string;
    branchName: string;
    role: string;
    originalPassword: string;
    wallet: number;
    partnerId: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    gender: "male" | "female" | "other";
    isActive: boolean;
    joiningDate: string;
    updatedBy: string | null;
    updatedOn: string | null;
    createdOn: string;
    __v: number;
}
