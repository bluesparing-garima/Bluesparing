import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IAccountData, IBookingData, IData, IPartnerData } from "../components/Dashboard/IDashboard";

export const rmGeneratePDF = (dataArray: IData[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(16);
  doc.text("Dashboard Report", pageWidth / 2, 10, { align: "center" });

  let finalY = 25; // Track the Y position

  dataArray.forEach((data, index) => {
    doc.setFontSize(14);
    doc.text(`Report #${index + 1}`, 14, finalY);
    finalY += 10;

    // Section: Role Counts

    if (data.roleCounts && Object.keys(data.roleCounts).length > 0) {
      doc.setFontSize(12);
      doc.text("Role Counts", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Role", "Count"]],
        body: Object.entries(data.roleCounts).map(([role, count]) => [role, count]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10; // Update finalY after table
    }

    // Section: Motor and Non-Motor Categories (Dynamic keys)
    if (data.categories && Object.keys(data.categories).length > 0) {
      Object.keys(data.categories).forEach((category) => {
        doc.setFontSize(12);
        doc.text(`${category} Categories`, 14, finalY);
        autoTable(doc, {
          startY: finalY + 5,
          head: [["Description", "Value"]],
          body: Object.entries(data.categories[category]).map(([key, value]) => [
            key,
            value,
          ]),
        });
        finalY = (doc as any).lastAutoTable.finalY + 10;
      });
    }

    // Section: Premiums
    if (data.premiums && Object.keys(data.premiums).length > 0) {
      doc.setFontSize(12);
      doc.text("Premiums", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Type", "Amount"]],
        body: Object.entries(data.premiums).map(([key, value]) => [key, value]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Section: Commissions
    if (data.commissions && Object.keys(data.commissions).length > 0) {
      doc.setFontSize(12);
      doc.text("Commissions", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Type", "Amount"]],
        body: Object.entries(data.commissions).map(([key, value]) => [key, value]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Section: Booking Requests
    if (data.bookingRequests && Object.keys(data.bookingRequests).length > 0) {
      doc.setFontSize(12);
      doc.text("Booking Requests", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Booking Type", "Count"]],
        body: Object.entries(data.bookingRequests).map(([key, value]) => [key, value]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Section: Lead Counts
    if (data.leadCounts && Object.keys(data.leadCounts).length > 0) {
      doc.setFontSize(12);
      doc.text("Lead Counts", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Lead Type", "Count"]],
        body: Object.entries(data.leadCounts).map(([key, value]) => [key, value]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Section: Admin Counts
    if (data.adminCounts && Object.keys(data.adminCounts).length > 0) {
      doc.setFontSize(12);
      doc.text("Admin Counts", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Admin Type", "Count"]],
        body: Object.entries(data.adminCounts).map(([key, value]) => [key, value]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Section: Accounts
    if (data.accounts && Object.keys(data.accounts).length > 0) {
      doc.setFontSize(12);
      doc.text("Total Accounts", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Account", "Details"]],
        body: Object.entries(data.accounts).map(([key, value]) => [key, JSON.stringify(value)]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Add a space between reports if multiple data entries
    finalY += 10;
  });

  // Footer
  doc.setFontSize(10);
  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    14,
    doc.internal.pageSize.height - 10
  );

  // Save the PDF
  doc.save("dashboard_report.pdf");
};


export const partnerGeneratePDF = (dataArray: IPartnerData[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(16);
  doc.text(" Partner Dashboard ", pageWidth / 2, 10, { align: "center" });

  let finalY = 25; // Track the Y position

  dataArray.forEach((data, index) => {
    doc.setFontSize(14);
    doc.text(`Report #${index + 1}`, 14, finalY);
    finalY += 10;

    // Section: Policy Counts
    if (data.policyCounts && Object.keys(data.policyCounts).length > 0) {
      doc.setFontSize(12);
      doc.text("Policy Counts", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Type", "Count"]],
        body: Object.entries(data.policyCounts).map(([type, count]) => [type, count]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Section: Premiums
    if (data.premiums && Object.keys(data.premiums).length > 0) {
      doc.setFontSize(12);
      doc.text("Premiums", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Type", "Amount"]],
        body: Object.entries(data.premiums).map(([key, value]) => [key, value]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Section: Commissions
    if (data.commissions && Object.keys(data.commissions).length > 0) {
      doc.setFontSize(12);
      doc.text("Commissions", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Type", "Amount"]],
        body: Object.entries(data.commissions).map(([key, value]) => [key, value]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Section: Booking Requests
    if (data.bookingRequests && Object.keys(data.bookingRequests).length > 0) {
      doc.setFontSize(12);
      doc.text("Booking Requests", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Booking Type", "Count"]],
        body: Object.entries(data.bookingRequests).map(([key, value]) => [key, value]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Section: Lead Counts
    if (data.leadCounts && Object.keys(data.leadCounts).length > 0) {
      doc.setFontSize(12);
      doc.text("Lead Counts", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Lead Type", "Count"]],
        body: Object.entries(data.leadCounts).map(([key, value]) => [key, value]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Add a space between reports if multiple data entries
    finalY += 10;
  });

  // Footer
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, doc.internal.pageSize.height - 10);

  // Save the PDF
  doc.save("dashboard_partner.pdf");
};


export const bookingGeneratePDF = (dataArray: IBookingData[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(16);
  doc.text("Booking Dashboard Report", pageWidth / 2, 10, { align: "center" });

  let finalY = 25; // Track the Y position

  dataArray.forEach((data, index) => {
    doc.setFontSize(14);
    doc.text(`Report #${index + 1}`, 14, finalY);
    finalY += 10;

    // Section: Policy Counts
    if (data.policyCounts && Object.keys(data.policyCounts).length > 0) {
      doc.setFontSize(12);
      doc.text("Policy Counts", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Type", "Count"]],
        body: Object.entries(data.policyCounts).map(([type, count]) => [type, count]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Section: Premiums
    if (data.premiums && Object.keys(data.premiums).length > 0) {
      doc.setFontSize(12);
      doc.text("Premiums", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Type", "Amount"]],
        body: Object.entries(data.premiums).map(([key, value]) => [key, value]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Section: Booking Requests
    if (data.bookingRequests && Object.keys(data.bookingRequests).length > 0) {
      doc.setFontSize(12);
      doc.text("Booking Requests", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Booking Type", "Count"]],
        body: Object.entries(data.bookingRequests).map(([key, value]) => [key, value]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Add a space between reports if multiple data entries
    finalY += 10;
  });

  // Footer
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, doc.internal.pageSize.height - 10);

  // Save the PDF
  doc.save("dashboard_booking.pdf");
};



export const accountGeneratePDF = (dataArray: IAccountData[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(16);
  doc.text("Dashboard Report", pageWidth / 2, 10, { align: "center" });

  let finalY = 25;

  dataArray.forEach((data, index) => {
    doc.setFontSize(14);
    doc.text(`Report #${index + 1}`, 14, finalY);
    finalY += 10;

    // Policy Counts
    if (data.policyCounts && Object.keys(data.policyCounts).length > 0) {
      doc.setFontSize(12);
      doc.text("Policy Counts", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Type", "Count"]],
        body: Object.entries(data.policyCounts).map(([type, count]) => [type, count !== undefined ? count : ""]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Premiums
    if (data.premiums && Object.keys(data.premiums).length > 0) {
      doc.setFontSize(12);
      doc.text("Premiums", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Type", "Amount"]],
        body: Object.entries(data.premiums).map(([key, value]) => [key, value !== undefined ? value : ""]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Commissions
    if (data.commissions && Object.keys(data.commissions).length > 0) {
      doc.setFontSize(12);
      doc.text("Commissions", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Type", "Amount"]],
        body: Object.entries(data.commissions).map(([key, value]) => [key, value !== undefined ? value : ""]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Total Accounts and Amount
    doc.setFontSize(12);
    doc.text(`Total Accounts: ${data.totalAccounts !== undefined ? data.totalAccounts : ""}`, 14, finalY);
    finalY += 10;
    doc.text(`Total Amount: ${data.totalAmount !== undefined ? data.totalAmount : ""}`, 14, finalY);
    finalY += 10;

    // Transactions
    if (data.transactions && Object.keys(data.transactions).length > 0) {
      doc.setFontSize(12);
      doc.text("Transactions", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Type", "Amount"]],
        body: Object.entries(data.transactions).map(([key, value]) => [key, value !== undefined ? value : ""]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    // Accounts
    if (data.accounts && data.accounts.length > 0) {
      doc.setFontSize(12);
      doc.text("Accounts", 14, finalY);
      autoTable(doc, {
        startY: finalY + 5,
        head: [["Account Code", "Account ID", "Account Number", "Amount", "Credit", "Debit"]],
        body: data.accounts.map(account => [
          account.accountCode || "",
          account.accountId || "",
          account.accountNumber || "",
          account.amount !== undefined ? account.amount : "",
          account.credit !== undefined ? account.credit : "",
          account.debit !== undefined ? account.debit : "",
        ]),
      });
      finalY = (doc as any).lastAutoTable.finalY + 10;
    }

    finalY += 10;
  });

  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, doc.internal.pageSize.height - 10);

  doc.save("dashboard_report.pdf");
};




