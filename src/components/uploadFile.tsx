import clsx from "clsx";
import React, { ChangeEventHandler, Dispatch } from "react";
import { IconFileEarmarkArrowUp } from "./icons";

interface UploadProps {
  multiple?: boolean;
  accept?: keyof typeof AcceptFileType;
  title?: string;
  disabled?: boolean;
  icon?: React.ReactNode | null;
  change: ChangeEventHandler<HTMLInputElement>;
}

export enum AcceptFileType {
  image = "image/*",
  any = "*",
  document = ".pdf, .txt",
  tableFile = ".csv, .xlsx",
  excelFile = ".xlsx",
}

function UploadFile({
  multiple = false,
  accept = "excelFile",
  title = "Excel file upload",
  disabled = false,
  icon,
  change,
}: UploadProps) {
  return (
    <label className="flex flex-col justify-center items-center cursor-pointer gap-2 overflow-clip rounded-md bg-secondary p-8">
      {icon ? icon : <IconFileEarmarkArrowUp className="w-10 h-10" />}

      <span
        className={clsx(
          "tracking-wider text-xs font-light text-center line-clamp-2"
        )}
      >
        {title}
      </span>

      <input
        className="hidden"
        multiple={multiple}
        type="file"
        disabled={disabled}
        accept={AcceptFileType[accept]}
        onChange={change}
      />
    </label>
  );
}

export default UploadFile;
