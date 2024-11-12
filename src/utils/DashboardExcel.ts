import * as XLSX from "xlsx";
import { IAccountData, IBookingData, IData, IPartnerData } from "../components/Dashboard/IDashboard";
import { BrokerPayInCommissionCompanyProps, BrokerPayInCommissionProps, BrokerPayInLeftDistributedCompanyProps, BrokerPayInLeftDistributedProps, BrokerReceivedPayInCompanyProps, BrokerReceivedPayInProps, ICompanyLeftDis, ICompanyPaid, ICompanyView, IFinalNetPremiumBroker, IFinalNetPremiumCompany, IFinalNetPremiumPartner, INetPremiumBroker, INetPremiumCompany, INetPremiumPartner, IPartnerBalance, IPartnerPaid, PartnerPayment } from "../components/TreeView/ITreeView";

export const rmGenerateExcel = (dataArray: IData[]) => {
    const workbook = XLSX.utils.book_new();
    dataArray.forEach((data, index) => {
        const sheetData: any[][] = [];
        // Add title
        sheetData.push([`Report #${index + 1}`]);

        // Add Role Counts section
        if (data.roleCounts && Object.keys(data.roleCounts).length > 0) {
            sheetData.push([]);
            sheetData.push(["Role Counts"]);
            sheetData.push(["Role", "Count"]);
            Object.entries(data.roleCounts).forEach(([role, count]) => {
                sheetData.push([role, count]);
            });
        }


        if (data.categories && Object.keys(data.categories).length > 0) {
            Object.keys(data.categories).forEach((category) => {
                sheetData.push([]);
                sheetData.push([`${category} Categories`]);
                sheetData.push(["Description", "Value"]);
                Object.entries(data.categories[category]).forEach(([key, value]) => {
                    sheetData.push([key, value]);
                });
            });
        }

        // Add Premiums
        if (data.premiums && Object.keys(data.premiums).length > 0) {
            sheetData.push([]);
            sheetData.push(["Premiums"]);
            sheetData.push(["Type", "Amount"]);
            Object.entries(data.premiums).forEach(([type, amount]) => {
                sheetData.push([type, amount]);
            });
        }

        // Add Commissions
        if (data.commissions && Object.keys(data.commissions).length > 0) {
            sheetData.push([]);
            sheetData.push(["Commissions"]);
            sheetData.push(["Type", "Amount"]);
            Object.entries(data.commissions).forEach(([type, amount]) => {
                sheetData.push([type, amount]);
            });
        }

        // Add Booking Requests
        if (data.bookingRequests && Object.keys(data.bookingRequests).length > 0) {
            sheetData.push([]);
            sheetData.push(["Booking Requests"]);
            sheetData.push(["Booking Type", "Count"]);
            Object.entries(data.bookingRequests).forEach(([type, count]) => {
                sheetData.push([type, count]);
            });
        }

        // Add Lead Counts
        if (data.leadCounts && Object.keys(data.leadCounts).length > 0) {
            sheetData.push([]);
            sheetData.push(["Lead Counts"]);
            sheetData.push(["Lead Type", "Count"]);
            Object.entries(data.leadCounts).forEach(([leadType, count]) => {
                sheetData.push([leadType, count]);
            });
        }

        // Add Admin Counts
        if (data.adminCounts && Object.keys(data.adminCounts).length > 0) {
            sheetData.push([]);
            sheetData.push(["Admin Counts"]);
            sheetData.push(["Admin Type", "Count"]);
            Object.entries(data.adminCounts).forEach(([adminType, count]) => {
                sheetData.push([adminType, count]);
            });
        }

        // Add Accounts
        if (data.accounts && Object.keys(data.accounts).length > 0) {
            sheetData.push([]);
            sheetData.push(["Total Accounts"]);
            sheetData.push(["Account", "Details"]);
            Object.entries(data.accounts).forEach(([account, details]) => {
                sheetData.push([account, JSON.stringify(details)]);
            });
        }

        // Add the sheet to the workbook
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, `Report_${index + 1}`);
    });

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "dashboard_report.xlsx");
};





export const partnerGenerateExcel = (dataArray: IPartnerData[]) => {
    const workbook = XLSX.utils.book_new();
    dataArray.forEach((data, index) => {
        const sheetData: any[][] = [];
        // Add title
        sheetData.push([`Report #${index + 1}`]);

        // Add Policy Counts
        if (data.policyCounts && Object.keys(data.policyCounts).length > 0) {
            sheetData.push([]);
            sheetData.push(["Policy Counts"]);
            sheetData.push(["Type", "Count"]);
            Object.entries(data.policyCounts).forEach(([type, count]) => {
                sheetData.push([type, count]);
            });
        }

        // Add Premiums
        if (data.premiums && Object.keys(data.premiums).length > 0) {
            sheetData.push([]);
            sheetData.push(["Premiums"]);
            sheetData.push(["Type", "Amount"]);
            Object.entries(data.premiums).forEach(([type, amount]) => {
                sheetData.push([type, amount]);
            });
        }

        // Add Commissions
        if (data.commissions && Object.keys(data.commissions).length > 0) {
            sheetData.push([]);
            sheetData.push(["Commissions"]);
            sheetData.push(["Type", "Amount"]);
            Object.entries(data.commissions).forEach(([type, amount]) => {
                sheetData.push([type, amount]);
            });
        }

        // Add Booking Requests
        if (data.bookingRequests && Object.keys(data.bookingRequests).length > 0) {
            sheetData.push([]);
            sheetData.push(["Booking Requests"]);
            sheetData.push(["Booking Type", "Count"]);
            Object.entries(data.bookingRequests).forEach(([type, count]) => {
                sheetData.push([type, count]);
            });
        }

        // Add Lead Counts
        if (data.leadCounts && Object.keys(data.leadCounts).length > 0) {
            sheetData.push([]);
            sheetData.push(["Lead Counts"]);
            sheetData.push(["Lead Type", "Count"]);
            Object.entries(data.leadCounts).forEach(([leadType, count]) => {
                sheetData.push([leadType, count]);
            });
        }

        // Add the sheet to the workbook
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, `Report_${index + 1}`);
    });

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "partner_dashboard.xlsx");
};


export const bookingGenerateExcel = (dataArray: IBookingData[]) => {
    const workbook = XLSX.utils.book_new();
    dataArray.forEach((data, index) => {
        const sheetData: any[][] = [];
        // Add title
        sheetData.push([`Report #${index + 1}`]);

        // Add Policy Counts
        if (data.policyCounts && Object.keys(data.policyCounts).length > 0) {
            sheetData.push([]);
            sheetData.push(["Policy Counts"]);
            sheetData.push(["Type", "Count"]);
            Object.entries(data.policyCounts).forEach(([type, count]) => {
                sheetData.push([type, count]);
            });
        }

        // Add Premiums
        if (data.premiums && Object.keys(data.premiums).length > 0) {
            sheetData.push([]);
            sheetData.push(["Premiums"]);
            sheetData.push(["Type", "Amount"]);
            Object.entries(data.premiums).forEach(([type, amount]) => {
                sheetData.push([type, amount]);
            });
        }

        // Add Booking Requests
        if (data.bookingRequests && Object.keys(data.bookingRequests).length > 0) {
            sheetData.push([]);
            sheetData.push(["Booking Requests"]);
            sheetData.push(["Booking Type", "Count"]);
            Object.entries(data.bookingRequests).forEach(([type, count]) => {
                sheetData.push([type, count]);
            });
        }

        // Add the sheet to the workbook
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, `Report_${index + 1}`);
    });

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "booking_dashboard.xlsx");
};

export const accountGenerateExcel = (dataArray: IAccountData[]) => {
    const workbook = XLSX.utils.book_new();
    dataArray.forEach((data, index) => {
        const sheetData: any[][] = [];
        // Add title
        sheetData.push([`Report #${index + 1}`]);

        // Add Policy Counts
        if (data.policyCounts && Object.keys(data.policyCounts).length > 0) {
            sheetData.push([]);
            sheetData.push(["Policy Counts"]);
            sheetData.push(["Type", "Count"]);
            Object.entries(data.policyCounts).forEach(([type, count]) => {
                sheetData.push([type, count]);
            });
        }

        // Add Premiums
        if (data.premiums && Object.keys(data.premiums).length > 0) {
            sheetData.push([]);
            sheetData.push(["Premiums"]);
            sheetData.push(["Type", "Amount"]);
            Object.entries(data.premiums).forEach(([type, amount]) => {
                sheetData.push([type, amount]);
            });
        }

        // Add Commissions
        if (data.commissions && Object.keys(data.commissions).length > 0) {
            sheetData.push([]);
            sheetData.push(["Commissions"]);
            sheetData.push(["Type", "Amount"]);
            Object.entries(data.commissions).forEach(([type, amount]) => {
                sheetData.push([type, amount]);
            });
        }

        // Add Total Accounts and Amount
        sheetData.push([]);
        sheetData.push(["Total Accounts", data.totalAccounts]);
        sheetData.push(["Total Amount", data.totalAmount]);

        // Add Transactions
        if (data.transactions && Object.keys(data.transactions).length > 0) {
            sheetData.push([]);
            sheetData.push(["Transactions"]);
            sheetData.push(["Type", "Amount"]);
            Object.entries(data.transactions).forEach(([type, amount]) => {
                sheetData.push([type, amount]);
            });
        }

        // Add Accounts
        if (data.accounts && data.accounts.length > 0) {
            sheetData.push([]);
            sheetData.push(["Accounts"]);
            sheetData.push(["Account Code", "Account ID", "Account Number", "Amount", "Credit", "Debit"]);
            data.accounts.forEach(account => {
                sheetData.push([
                    account.accountCode,
                    account.accountId,
                    account.accountNumber,
                    account.amount,
                    account.credit,
                    account.debit,
                ]);
            });
        }

        // Add the sheet to the workbook
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, `Report_${index + 1}`);
    });

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "account_dashboard.xlsx");
};


export const generateExcelForNetPremium = <T extends INetPremiumBroker | INetPremiumPartner>(
    dataArray: T[],
    reportType: "broker" | "partner"
) => {
    const workbook = XLSX.utils.book_new();
    const sheetData: any[][] = [];
    const title = reportType === "broker" ? "Brokers Premium Report" : "Partners Premium Report";
    sheetData.push([title]);

    if (reportType === "broker") {
        sheetData.push([]);
        sheetData.push(["Broker ID", "Broker Name", "Broker Code", "Net Premium"]);
        (dataArray as INetPremiumBroker[]).forEach((broker) => {
            sheetData.push([
                broker.brokerId,
                broker.brokerName,
                broker.brokerCode,
                broker.netPremium,
            ]);
        });
    } else if (reportType === "partner") {
        sheetData.push([]);
        sheetData.push(["Partner ID", "Partner Name", "Partner Code", "Net Premium"]);
        (dataArray as INetPremiumPartner[]).forEach((partner) => {
            sheetData.push([
                partner.partnerId,
                partner.partnerName,
                partner.partnerCode,
                partner.netPremium,
            ]);
        });
    }

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, `${title.replace(" ", "_")}`);
    XLSX.writeFile(workbook, `${reportType}_premium_report.xlsx`);
};

export const generateExcelFinalPremium = <T extends IFinalNetPremiumBroker | IFinalNetPremiumPartner>(
    dataArray: T[],
    reportType: "broker" | "partner"
) => {
    const workbook = XLSX.utils.book_new();
    const sheetData: any[][] = [];
    const title = reportType === "broker" ? "Brokers Final Premium Report" : "Partners Final Premium Report";
    sheetData.push([title]);

    if (reportType === "broker") {
        sheetData.push([]);
        sheetData.push(["Broker ID", "Broker Name", "Broker Code", "Final Net Premium"]);
        (dataArray as IFinalNetPremiumBroker[]).forEach((broker) => {
            sheetData.push([
                broker.brokerId,
                broker.brokerName,
                broker.brokerCode,
                broker.finalPremium,
            ]);
        });
    } else if (reportType === "partner") {
        sheetData.push([]);
        sheetData.push(["Partner ID", "Partner Name", "Partner Code", "Final Net Premium"]);
        (dataArray as IFinalNetPremiumPartner[]).forEach((partner) => {
            sheetData.push([
                partner.partnerId,
                partner.partnerName,
                partner.partnerCode,
                partner.finalPremium,
            ]);
        });
    }

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, `${title.replace(" ", "_")}`);
    XLSX.writeFile(workbook, `${reportType}_premium_report.xlsx`);
};

export const generateExcelCompanyNetPremium = (data: INetPremiumCompany[]) => {
    const workbook = XLSX.utils.book_new();
    const sheetData: any[][] = [];
    const title = "company_report";
    sheetData.push([title]);
    sheetData.push([]);
    sheetData.push(["Company Name", "Net Premium"]);
    data.forEach(element => {
        sheetData.push([element.companyName, element.netPremium])
    });
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, `${title.replace(" ", "_")}`);
    XLSX.writeFile(workbook, `net_premium_report.xlsx`);
}

export const generateExcelCompanyFinalNetPremium = (data: IFinalNetPremiumCompany[]) => {
    const workbook = XLSX.utils.book_new();
    const sheetData: any[][] = [];
    const title = "company_report";
    sheetData.push([title]);
    sheetData.push([]);
    sheetData.push(["Company Name", "Final Net Premium"]);
    data.forEach(element => {
        sheetData.push([element.companyName, element.finalPremium])
    });
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, `${title.replace(" ", "_")}`);
    XLSX.writeFile(workbook, `finalNet_premium_report.xlsx`);
}


export const generateBrokerPayInCommissionExcel = (brokers: BrokerPayInCommissionProps[]) => {
    const workbook = XLSX.utils.book_new();
    if (brokers && brokers.length > 0) {
        const brokerSheetData: any[][] = [];
        brokerSheetData.push(["Brokers Pay-In Commission Report"]);
        brokerSheetData.push([]);
        brokerSheetData.push(["Broker ID", "Broker Name", "Broker Code", "Total Pay-In Commission"]);

        brokers.forEach((broker) => {
            brokerSheetData.push([
                broker.brokerId,
                broker.brokerName,
                broker.brokerCode,
                broker.totalPayInCommission,
            ]);
        });

        const brokerWorksheet = XLSX.utils.aoa_to_sheet(brokerSheetData);
        XLSX.utils.book_append_sheet(workbook, brokerWorksheet, "Broker Pay-In Commission Report");
    }

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "broker_pay_in_commission_report.xlsx");
};

export const generateBrokerCompanyPayInCommissionExcel = (
    companies: BrokerPayInCommissionCompanyProps[]
) => {
    const workbook = XLSX.utils.book_new();
    if (companies && companies.length > 0) {
        const companySheetData: any[][] = [];
        companySheetData.push(["Companies Pay-In Commission Report"]);
        companySheetData.push([]);
        companySheetData.push(["Company Name", "Total Pay-In Commission"]);
        companies.forEach((company) => {
            companySheetData.push([company.companyName, company.totalPayInCommission]);
        });

        const companyWorksheet = XLSX.utils.aoa_to_sheet(companySheetData);

        // Shortened sheet name
        XLSX.utils.book_append_sheet(workbook, companyWorksheet, "Pay-In Commission Report");
    }

    // Generate Excel file and download
    XLSX.writeFile(workbook, "company_pay_in_commission_report.xlsx");
};

export const generateBrokerReceivedPayInExcel = (
    brokers: BrokerReceivedPayInProps[]
) => {
    const workbook = XLSX.utils.book_new();
    if (brokers && brokers.length > 0) {
        const brokerSheetData: any[][] = [];
        brokerSheetData.push(["Broker Pay-In Report"]);
        brokerSheetData.push([]);
        brokerSheetData.push(["Broker ID", "Broker Name", "Broker Code", "Total Pay-In Amount"]);
        brokers.forEach((broker) => {
            brokerSheetData.push([
                broker.brokerId,
                broker.brokerName,
                broker.brokerCode,
                broker.totalPayInAmount
            ]);
        });

        const brokerWorksheet = XLSX.utils.aoa_to_sheet(brokerSheetData);
        XLSX.utils.book_append_sheet(workbook, brokerWorksheet, "Broker Pay-In Report");
    }
    XLSX.writeFile(workbook, "broker_pay_in_report.xlsx");
};

export const generateBrokerReceivedPayInCompanyExcel = (
    companies: BrokerReceivedPayInCompanyProps[]
) => {
    const workbook = XLSX.utils.book_new();

    if (companies && companies.length > 0) {
        const companySheetData: any[][] = [];

        // Add title and headers
        companySheetData.push(["Company Pay-In Report"]);
        companySheetData.push([]);
        companySheetData.push(["Company Name", "Total Pay-In Amount"]);
        companies.forEach((company) => {
            companySheetData.push([
                company.companyName,
                company.totalPayInAmount
            ]);
        });
        const companyWorksheet = XLSX.utils.aoa_to_sheet(companySheetData);

        XLSX.utils.book_append_sheet(workbook, companyWorksheet, "Pay-In Report");
    }

    XLSX.writeFile(workbook, "company_pay_in_report.xlsx");
};
export const generateBrokerPayInLeftDistributedExcel = (
    brokers: BrokerPayInLeftDistributedProps[]
) => {
    const workbook = XLSX.utils.book_new();

    if (brokers && brokers.length > 0) {
        const brokerSheetData: any[][] = [];
        brokerSheetData.push(["Broker Pay-In Left Distributed Report"]);
        brokerSheetData.push([]);
        brokerSheetData.push(["Broker ID", "Broker Name", "Broker Code", "Broker Balance"]);


        brokers.forEach((broker) => {
            brokerSheetData.push([
                broker.brokerId,
                broker.brokerName,
                broker.brokerCode,
                broker.brokerBalance
            ]);
        });


        const brokerWorksheet = XLSX.utils.aoa_to_sheet(brokerSheetData);

        XLSX.utils.book_append_sheet(workbook, brokerWorksheet, "Pay-In Left Report");
    }

    XLSX.writeFile(workbook, "broker_pay_in_left_distributed_report.xlsx");
};
export const generateBrokerPayInLeftDistributedCompanyExcel = (
    companies: BrokerPayInLeftDistributedCompanyProps[]
) => {
    const workbook = XLSX.utils.book_new();
    if (companies && companies.length > 0) {
        const companySheetData: any[][] = [];
        companySheetData.push(["Company Pay-In Left Distributed Report"]);  // Title row
        companySheetData.push([]);                                          // Blank row
        companySheetData.push(["Company Name", "Broker Balance"]);          // Header row
        companies.forEach((company) => {
            companySheetData.push([
                company.companyName,
                company.brokerBalance
            ]);
        });

        const companyWorksheet = XLSX.utils.aoa_to_sheet(companySheetData);
        XLSX.utils.book_append_sheet(workbook, companyWorksheet, "Pay-In Left Report");
    }

    XLSX.writeFile(workbook, "company_pay_in_left_distributed_report.xlsx");
};

export const generatePartnerPaidExcel = (
    partners: IPartnerPaid[]
) => {
    const workbook = XLSX.utils.book_new();

    if (partners && partners.length > 0) {
        const partnerSheetData: any[][] = [];

        // Add title and headers
        partnerSheetData.push(["Partner Paid Report"]);
        partnerSheetData.push([]);
        partnerSheetData.push([
            "Partner ID",
            "Partner Name",
            "Partner Code",
            "Total Payout Amount"
        ]);

        // Loop through partners to add their data
        partners.forEach((partner) => {
            partnerSheetData.push([
                partner.partnerId,
                partner.partnerName,
                partner.partnerCode,
                partner.totalPayOutAmount
            ]);
        });

        // Convert data to worksheet
        const partnerWorksheet = XLSX.utils.aoa_to_sheet(partnerSheetData);

        // Add worksheet to workbook with a shorter sheet name
        XLSX.utils.book_append_sheet(workbook, partnerWorksheet, "Partner Paid Report");
    }

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "partner_paid_report.xlsx");
};

export const generateCompanyPaidExcel = (
    companies: ICompanyPaid[]
) => {
    const workbook = XLSX.utils.book_new();

    if (companies && companies.length > 0) {
        const companySheetData: any[][] = [];

        companySheetData.push(["Company Paid Report"]);
        companySheetData.push([]);
        companySheetData.push([
            "Company Name",
            "Total Payout Amount"
        ]);

        companies.forEach((company) => {
            companySheetData.push([
                company.companyName,
                company.totalPayOutAmount
            ]);
        });

        const companyWorksheet = XLSX.utils.aoa_to_sheet(companySheetData);
        XLSX.utils.book_append_sheet(workbook, companyWorksheet, "Company Paid Report");
    }

    XLSX.writeFile(workbook, "company_paid_report.xlsx");
};

export const generatePartnerBalanceExcel = (
    partners: IPartnerBalance[]
) => {
    const workbook = XLSX.utils.book_new();

    if (partners && partners.length > 0) {
        const partnerSheetData: any[][] = [];

        partnerSheetData.push(["Partner Balance Report"]);
        partnerSheetData.push([]);
        partnerSheetData.push([
            "Partner ID",
            "Partner Name",
            "Partner Code",
            "Total Partner Balance"
        ]);

        partners.forEach((partner) => {
            partnerSheetData.push([
                partner.partnerId,
                partner.partnerName,
                partner.partnerCode,
                partner.totalPartnerBalance
            ]);
        });

        const partnerWorksheet = XLSX.utils.aoa_to_sheet(partnerSheetData);
        XLSX.utils.book_append_sheet(workbook, partnerWorksheet, "Partner Balance Report");
    }

    XLSX.writeFile(workbook, "partner_balance_report.xlsx");
};
export const generateCompanyLeftDisExcel = (
    companies: ICompanyLeftDis[]
) => {
    const workbook = XLSX.utils.book_new();

    if (companies && companies.length > 0) {
        const companySheetData: any[][] = [];

        companySheetData.push(["Company Left Distribution Report"]);
        companySheetData.push([]);
        companySheetData.push([
            "Company Name",
            "Total Partner Balance"
        ]);

        companies.forEach((company) => {
            companySheetData.push([
                company.companyName,
                company.totalPartnerBalance
            ]);
        });

        const companyWorksheet = XLSX.utils.aoa_to_sheet(companySheetData);
        XLSX.utils.book_append_sheet(workbook, companyWorksheet, "Company Left Dis Report");
    }

    XLSX.writeFile(workbook, "company_left_distribution_report.xlsx");
};

export const generatePartnerPaymentExcel = (
    payments: PartnerPayment[]
) => {
    const workbook = XLSX.utils.book_new();

    if (payments && payments.length > 0) {
        const paymentSheetData: any[][] = [];

        paymentSheetData.push(["Partner Payment Report"]);
        paymentSheetData.push([]);
        paymentSheetData.push([
            "Partner ID",
            "Partner Name",
            "Partner Code",
            "Total Payout Commission"
        ]);

        payments.forEach((payment) => {
            paymentSheetData.push([
                payment.partnerId,
                payment.partnerName,
                payment.partnerCode,
                payment.totalPayOutCommission
            ]);
        });

        const paymentWorksheet = XLSX.utils.aoa_to_sheet(paymentSheetData);
        XLSX.utils.book_append_sheet(workbook, paymentWorksheet, "Partner Payment Report");
    }

    XLSX.writeFile(workbook, "partner_payment_report.xlsx");
};
export const generateCompanyViewExcel = (
    companies: ICompanyView[]
) => {
    const workbook = XLSX.utils.book_new();

    if (companies && companies.length > 0) {
        const companySheetData: any[][] = [];

        companySheetData.push(["Company View Report"]);
        companySheetData.push([]);
        companySheetData.push([
            "Company Name",
            "Total Payout Commission"
        ]);

        companies.forEach((company) => {
            companySheetData.push([
                company.companyName,
                company.totalPayOutCommission
            ]);
        });

        const companyWorksheet = XLSX.utils.aoa_to_sheet(companySheetData);
        XLSX.utils.book_append_sheet(workbook, companyWorksheet, "Company View Report");
    }

    XLSX.writeFile(workbook, "company_view_report.xlsx");
};