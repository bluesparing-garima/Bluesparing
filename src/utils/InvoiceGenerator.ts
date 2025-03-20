import jsPDF from "jspdf";
import "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface InvoiceDetails {
  taxInvoiceDate: string;
  taxInvoiceNo: string;
  supplierDetails: {
    name: string;
    address: string;
    GSTIN: string;
  };
  billTo: {
    name: string;
    address: string;
    state: string;
    email: string;
    mobileNo: string;
  };
  paymentMethod: string;
  orderId: string;
  paymentReferenceId: string;
  itemDescription: string;
  HSN: string;
  price: number;
}

export const generateInvoicePDF = async (invoiceDetails: InvoiceDetails): Promise<Blob> => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Tax Invoice", 14, 22);

  let finalY = 30; // Initial position for the first table

  // Invoice Table
  doc.autoTable({
    startY: finalY,
    head: [["Field", "Details"]],
    body: [
      ["Tax Invoice Date", invoiceDetails.taxInvoiceDate],
      ["Tax Invoice No", invoiceDetails.taxInvoiceNo],
      ["Created", new Date().toLocaleDateString()],
    ],
    theme: "grid",
  });
  finalY = (doc as any).lastAutoTable.finalY + 10;

  // Supplier Details Table
  doc.autoTable({
    startY: finalY,
    head: [["Supplier Details", "Information"]],
    body: [
      ["Name", invoiceDetails.supplierDetails.name],
      ["Address", invoiceDetails.supplierDetails.address],
      ["GSTIN", invoiceDetails.supplierDetails.GSTIN],
    ],
    theme: "grid",
  });
  finalY = (doc as any).lastAutoTable.finalY + 10;

  // Bill To Table
  doc.autoTable({
    startY: finalY,
    head: [["Bill To", "Information"]],
    body: [
      ["Name", invoiceDetails.billTo.name],
      ["Address", invoiceDetails.billTo.address],
      ["State", invoiceDetails.billTo.state],
      ["Email", invoiceDetails.billTo.email],
      ["Mobile No", invoiceDetails.billTo.mobileNo],
    ],
    theme: "grid",
  });
  finalY = (doc as any).lastAutoTable.finalY + 10;

  // Payment Details Table
  doc.autoTable({
    startY: finalY,
    head: [["Payment Details", "Information"]],
    body: [
      ["Payment Method", invoiceDetails.paymentMethod],
      ["Order ID", invoiceDetails.orderId],
      ["Payment Reference ID", invoiceDetails.paymentReferenceId],
    ],
    theme: "grid",
  });
  finalY = (doc as any).lastAutoTable.finalY + 10;

  // Item Details Table
  doc.autoTable({
    startY: finalY,
    head: [["Item Description", "HSN", "Price (INR)"]],
    body: [[invoiceDetails.itemDescription, invoiceDetails.HSN, invoiceDetails.price.toFixed(2)]],
    theme: "grid",
  });
  finalY = (doc as any).lastAutoTable.finalY + 20;

  // Signature Text
  doc.text("Signature", 14, finalY);

  // Get the PDF as a Blob
  const pdfBlob = doc.output("blob");

  // Create a URL for the Blob and trigger the download
  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "invoice.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return pdfBlob;
};