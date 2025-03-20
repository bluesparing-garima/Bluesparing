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

export const generateInvoicePDF = (invoiceDetails: InvoiceDetails) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Tax Invoice", 14, 22);

  doc.setFontSize(12);
  doc.text(`Tax Invoice Date: ${invoiceDetails.taxInvoiceDate}`, 14, 32);
  doc.text(`Tax Invoice No: ${invoiceDetails.taxInvoiceNo}`, 14, 40);
  doc.text(`Created: ${new Date().toLocaleDateString()}`, 14, 48);

  doc.text("Supplier Details:", 14, 56);
  doc.text(`Address: ${invoiceDetails.supplierDetails.address}`, 14, 64);
  doc.text(`GSTIN: ${invoiceDetails.supplierDetails.GSTIN}`, 14, 72);

  doc.text("Bill To:", 14, 80);
  doc.text(`Name: ${invoiceDetails.billTo.name}`, 14, 88);
  doc.text(`Address: ${invoiceDetails.billTo.address}`, 14, 96);
  doc.text(`State: ${invoiceDetails.billTo.state}`, 14, 104);
  doc.text(`Email: ${invoiceDetails.billTo.email}`, 14, 112);
  doc.text(`Mobile No: ${invoiceDetails.billTo.mobileNo}`, 14, 120);

  doc.text(`Payment Method: ${invoiceDetails.paymentMethod}`, 14, 128);
  doc.text(`Order ID: ${invoiceDetails.orderId}`, 14, 136);
  doc.text(`Payment Reference ID: ${invoiceDetails.paymentReferenceId}`, 14, 144);

  doc.text("Item Description of Service:", 14, 152);
  doc.text(`HSN: ${invoiceDetails.HSN}`, 14, 160);
  doc.text(`Price: ₹${invoiceDetails.price}`, 14, 168);

  doc.text("Signature", 14, 176);

  doc.save("invoice.pdf");
};