import React, { FC, ReactNode } from "react";
interface FileViewProps {
  fileName: string;
  children: ReactNode;
  index:number;
}
const FileView: FC<FileViewProps> = ({ fileName, children,index }) => {
  return (
    <div className="relative w-full  ">
      <div className="border border-[#c4c4c4] flex items-center justify-start gap-x-2 p-1 rounded w-full">
        <span className=" border-black  border  p-[2px] px-2 rounded bg-white pointer-events-none">
          Choose File
        </span>
        <label htmlFor={`fileName-${index}`} className="  text-center cursor-pointer">
          {fileName}
        </label>
      </div>

      {children}
    </div>
  );
};

export default FileView;
