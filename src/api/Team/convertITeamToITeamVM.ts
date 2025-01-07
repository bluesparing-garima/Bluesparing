import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import { ITeams, ITeamsVM } from "../../components/Admin/Team/ITeam";

const convertITeamToITeamVM = (data: ITeams): ITeamsVM => {
  const teamViewModel: ITeamsVM = {
    id: data._id ? data._id : "",
    branchName: data.branchName ? data.branchName : "",
    role: data.role ? data.role : "",
    partnerId: data.partnerId ? data.partnerId : "",
    headRMId: data.headRMId ? data.headRMId : "",
    headRM: data.headRM ? data.headRM : "",
    name: data.name ? data.name : "",
    phoneNumber: data.phoneNumber ? data.phoneNumber : "",
    email: data.email ? data.email : "",
    password: data.password ? data.password : "",
    originalPassword: data.originalPassword ? data.originalPassword : "",
    dateOfBirth: data.dateOfBirth
      ? dayjs(data?.dateOfBirth).format(DAYJS_DISPLAY_FORMAT)
      : "",
    gender: data.gender ? data.gender : "",
    address: data.address ? data.address : "",
    pincode: data.pincode ? data.pincode : "",
    bankName: data.bankName ? data.bankName : "",
    IFSC: data.IFSC ? data.IFSC : "",
    accountHolderName: data.accountHolderName ? data.accountHolderName : "",
    accountNumber: data.accountNumber ? data.accountNumber : "",
    salary: data.salary ? data.salary : 0,
    image: data.image ? data.image! : "",
    profileImage: data.profileImage ? data.profileImage! : "",
    adharCardBack: data.adharCardBack ? data.adharCardBack! : "",
    adharCardFront: data.adharCardFront ? data.adharCardFront! : "",
    panCard: data.panCard ? data.panCard! : "",
    qualification: data.qualification ? data.qualification! : "",
    bankProof: data.bankProof ? data.bankProof! : "",
    joiningDate: data.joiningDate ? data.joiningDate! : "",
    experience: data.experience ? data.experience! : "",
    other: data.other ? data.other! : "",
    isActive: data.isActive ? data.isActive : true,
    createdBy: data.createdBy ? data.createdBy : "",
    updatedBy: data.updatedBy ? data.updatedBy : "",
    companyLogo:data.companyLogo?data.companyLogo:"",
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    planName:data.planName?data.planName:"",
    transactionStatus:data.transactionStatus?data.transactionStatus:false
  };
  return teamViewModel;
};

export default convertITeamToITeamVM;
