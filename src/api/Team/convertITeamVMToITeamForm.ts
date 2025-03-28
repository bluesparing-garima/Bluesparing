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
    userCode: team.userCode!,
    name: team.name!,
    phoneNumber: team.phoneNumber!,
    password: team.password!,
    originalPassword: team.originalPassword!,
    email: team.email!,
    dateOfBirth: dayjs(team?.dateOfBirth).format(DAYJS_DISPLAY_FORMAT),
    gender: team.gender!,
    address: team.address!,
    pincode: team.pincode!,

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
    isActive: !!team.isActive,
  };
  return teamForm;
};
