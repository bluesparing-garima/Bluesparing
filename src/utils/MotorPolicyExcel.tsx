import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const MotorPolicyExcel: React.FC = () => {
  const handleDownload = () => {
    // Create a new workbook and a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheetData = [
      [
        "category",
        "policyType",
        "productType",
        "subCategory",
        "caseType",
        "companyName",
        "broker",
        "brokerId",
        "vehicleAge",
        "make",
        "model",
        "fuelType",
        "rto",
        "vehicleNumber",
        "weight",
        "seatingCapacity",
        "cc",
        "ncb",
        "PolicyNumber",
        "fullName",
        "emailId",
        "phoneNumber",
        "mfgYear",
        "tenure",
        "registrationDate",
        "issueDate",
        "endDate",
        "idv",
        "od",
        "tp",
        "policyStatus",
        "netPremium",
        "finalPremium",
        "paymentMode",
        "policyCreatedBy",
        "partnerId",
        "partnerName",
        "relationshipManagerId",
        "relationshipManagerName",
        "policyCompletedBy",
        "paymentDetails",
        "currentPolicy",
        "createdBy",
        "updatedBy",
        "isActive",
      ],
      [
        "motor",
        "Comprehensive/ Package",
        "Goods carrying vehicle",
        "GCCV public (2500-3000 kg)",
        "Rollover",
        "Universal Sompo General Insurance Company",
        "SQUARE INSURANCE BROKER PVT LTD",
        "66868d74d9ff47965ecca94f",
        ">5 year",
        "MAHINDRA",
        "BOLERO",
        "diesel",
        "PB03",
        "PB03BD1147",
        "2345",
        "0",
        "2523",
        "yes",
        "AVO/2315/11468411",
        "HIMANSHU GARG",
        "asd",
        "1234567890",
        "2020",
        "1",
        "01-01-2019",
        "2024-07-27",
        "2025-08-28",
        "350000",
        "1764",
        "16099",
        "booked",
        "17863",
        "20115",
        "Cash",
        "policyCreatedBy",
        "66a24f9b0d0ee69e00baa81b",
        "SIMRAN JEET",
        "6698b2cba54843d84317921f",
        "Manish",
        "669518800fa02145487be687",
        "paymentDetails",
        "PolicyPDF-20240729114417.pdf",
        "excel@safekaro.com",
        "updatedBy",
        "TRUE",
      ],
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate the Excel file and trigger the download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "sample.xlsx");
  };

  return <button onClick={handleDownload}>Download Excel Sample</button>;
};

export default MotorPolicyExcel;
