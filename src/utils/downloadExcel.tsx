import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Tooltip } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
const DownloadExcel: React.FC = () => {
  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [
      [
        "policyCategory",
        "caseType",
        "companyName",
        "engine",
        "weight",
        "fuelType",
        "make",
        "model",
        "ncb",
        "od",
        "tp",
        "policyType",
        "productType",
        "rto",
        "vehicleAge",
        "seatingCapacity",
        "subCategory",
        "startDate",
        "endDate",
        "createdBy",
      ],
      [
        "motor",
        "Renewal",
        "Cholamandalam MS General Insurance",
        "1500",
        "2",
        "Petrol",
        "A V AUTOMOTIVES PVT",
        "SUPRO / MAXI TRUCK",
        "yes",
        "100",
        "20",
        "Comprehensive/ Package",
        "Two-Wheeler",
        "RJ04",
        "<5",
        "2",
        "Car",
        "2016-10-28",
        "2025-07-28",
        "Excel",
      ],
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "sample.xlsx");
  };
  return (
    // <Tooltip title="Download Excel Sample">
    //   <button
    //     onClick={handleDownload}
    //     className="md:w-10 md:h-10 h-4 w-4 btnGradient shadow-sm rounded flex justify-center items-center text-white"
    //   >
    //     <FileDownloadOutlinedIcon className="md:w-6 md:h-6 h-3 w-3" />
    //   </button>
    // </Tooltip>
    <Tooltip title="Download Sample Excel">
      <button
        className="md:w-10 md:h-10 h-4 w-4 btnGradient shadow-sm rounded flex justify-center items-center text-white"
        onClick={handleDownload}
      >
        <FileDownloadOutlinedIcon className="md:w-6 md:h-6 h-3 w-3" />
      </button>
    </Tooltip>
  );
};
export default DownloadExcel;
