"use client";

import { useState } from "react";
import InputGroup from "./inputGroup";
import Label from "./label";
import UploadFile from "./uploadFile";
import { IconFileEarmarkArrowDown, IconFileEarmarkRuled } from "./icons";
import Button from "./button";

function ReactionInfo() {
  const [fileTitle, setFileTitle] = useState(
    "Click here to upload an excel file"
  );
  const [icon, setIcon] = useState<React.ReactNode>(null);
  let files: FileList;
  const setFiles = (e: any) => {
    files = e.target.files;
    setFileTitle(files[0]?.name);
    setIcon(<IconFileEarmarkRuled className="w-10 h-10" />);
    console.log({ files });
  };
  return (
    <>
      <div className="flex justify-end">
        <Button>
          <div className="flex items-center justify-center gap-2">
            <IconFileEarmarkArrowDown /> Excel Upload Template
          </div>
        </Button>
      </div>
      <InputGroup>
        <div className="flex flex-col gap-1.5">
          <Label>Excel File Upload</Label>
          <UploadFile title={fileTitle} change={setFiles} icon={icon} />
        </div>
      </InputGroup>
    </>
  );
}

export default ReactionInfo;
