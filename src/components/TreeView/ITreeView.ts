

export interface TreeNodePayIn {
    name: string;
    amount: number;
    children?: any;
}

export interface BrokerPayInCommissionProps {
    brokerId: string;
    brokerName: string;
    brokerCode: string
    totalPayInCommission: number;
}

export interface BrokerPayInCommissionCompanyProps {
    companyName: string;
    totalPayInCommission: number;
}

export interface BrokerReceivedPayInProps {
    brokerId: string;
    brokerName: string;
    brokerCode: string
    totalPayInAmount: number;
}

export interface PartnerPayment {
    partnerId: string;
    partnerName: string;
    userCode: string;
    totalPayOutCommission: number;
}
export interface BrokerPayInLeftDistributedCompanyProps {
    companyName: string;
    brokerBalance: number;
}
export interface BrokerBalancePayInCompanyProps {
    companyName: string;
    payInAmount: number;
}
export interface BrokerPayInLeftDistributedProps {
    brokerId: string;
    brokerName: string;
    brokerCode: string
    brokerBalance: number;
}
export interface BrokerReceivedPayInCompanyProps {
    companyName: string;
    totalPayInAmount: number;
}
export interface FolderLikeStructureForPayInProps {
    data: TreeNodePayIn;
    api: string;
    startDate?: string;
    endDate?: string;
}

export interface IPartnerView {
    partnerId: string;
    partnerName: string;
    userCode: string;
    totalPayOutCommission: number;
    children?: ICompanyView[];
}

export interface ICompanyView {
    companyName: string;
    totalPayOutCommission: number;
}

export interface FolderLikeStructureForPayoutProps {
    data: TreeNodePayOut;
    api: string;
    startDate?: string;
    endDate?: string;
}

export interface ICompanyPaid {
    companyName: string;
    totalPayOutAmount: number;
}

export interface ICompanyLeftDis {
    companyName: string;
    totalPartnerBalance: number;
}

export interface IPartnerBalance {
    partnerId: string;
    partnerName: string;
    userCode: string;
    totalPartnerBalance: number;
}

export interface IPartnerPaid {
    partnerId: string;
    partnerName: string;
    userCode: string;
    totalPayOutAmount: string;
}
export interface TreeNodePayOut {
    name: string;
    amount: number;
    children?: IPartnerView[] | IPartnerPaid[] | IPartnerBalance[];
}

//net premium type
export interface TreeNodeNetPremium {
    name: string;
    amount: number;
    children?: any;
}
export interface IFolderLikeStructureForNetPremium {
    data: TreeNodeNetPremium;
    api: string;
    startDate?: string;
    endDate?: string;
}
export interface INetPremiumPartner {
    partnerId: string;
    partnerName: string;
    userCode: string;
    netPremium: string;
}

export interface INetPremiumCompany {
    netPremium: number;
    companyName: string
}

export interface INetPremiumBroker {
    brokerId: string;
    brokerName: string;
    brokerCode: string;
    netPremium: string;
}


// final net premium type
export interface IFinalNetPremiumPartner {
    partnerId: string;
    partnerName: string;
    userCode: string;
    finalPremium: string;
}

export interface IFinalNetPremiumCompany {
    finalPremium: number;
    companyName: string
}

export interface IFinalNetPremiumBroker {
    brokerId: string;
    brokerName: string;
    brokerCode: string;
    finalPremium: string;
}

