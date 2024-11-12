import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

import { ITeamForm, ITeamsVM } from "../../components/Admin/Team/ITeam";

export const convertITeamVMToITeamForm = (team: ITeamsVM): ITeamForm => {
  const teamForm: ITeamForm = {
    id: team.id!,
    branchName: team.branchName!,
    role: team.role!,
    headRMId: team.headRMId!,
    headRM: team.headRM!,
    partnerId: team.partnerId!,
    fullName: team.fullName!,
    phoneNumber: team.phoneNumber!,
    password: team.password!,
    originalPassword: team.originalPassword!,
    email: team.email!,
    dateOfBirth: dayjs(team?.dateOfBirth).format(DAYJS_DISPLAY_FORMAT),
    gender: team.gender!,
    address: team.address!,
    pincode: team.pincode!,
    bankName: team.bankName!,
    IFSC: team.IFSC!,
    accountHolderName: team.accountHolderName!,
    accountNumber: team.accountNumber!,
    salary: team.salary!,
    image: team.image!,
    adharCardBack: team.adharCardBack!,
    adharCardFront: team.adharCardFront!,
    panCard: team.panCard!,
    joiningDate: team.joiningDate!,
    qualification: team.qualification!,
    bankProof: team.bankProof!,
    experience: team.experience!,
    other: team.other!,
    updatedBy: team.updatedBy!,
    createdBy: team.createdBy!,
    // points: team.points
    //   ? convertLocaleStringToNumber(team.points!)
    //   : 0,
    isActive: !!team.isActive,
    // createdOn: dayjs(team?.createdOn).format(DAYJS_DISPLAY_FORMAT),
  };
  return teamForm;
};
