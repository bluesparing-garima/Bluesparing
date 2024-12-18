import { ILeadForm, ILeadsVM } from "../../components/Partner/IPartner";
export const convertILeadVMToILeadForm = (lead: ILeadsVM): ILeadForm => {
  const leadForm: ILeadForm = {
    id: lead.id!,
    category: lead.category!,
    policyType: lead.policyType!,
    caseType: lead.caseType!,
    companyName: lead.companyName!,
    partnerId: lead.partnerId!,
    partnerName: lead.partnerName!,
    relationshipManagerId: lead.relationshipManagerId!,
    relationshipManagerName: lead.relationshipManagerName!,
    rcFront: lead.rcFront!,
    rcBack: lead.rcBack!,
    previousPolicy: lead.previousPolicy!,
    survey: lead.survey!,
    puc: lead.puc!,
    fitness: lead.fitness!,
    proposal: lead.proposal!,
    currentPolicy: lead.currentPolicy!,
    other: lead.other!,
    leadCreatedBy: lead.leadCreatedBy!,
    remarks: lead.remarks!,
    status: lead.status!,
    updatedBy: lead.updatedBy!,
    createdBy: lead.createdBy!,
    createdOn:lead.createdOn!,
    updatedOn:lead.updatedOn,
    isActive: !!lead.isActive,
    timer:lead.timer||""
  };
  return leadForm;
};
