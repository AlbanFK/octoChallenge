import React from "react";
import { IconBxError, IconExclamationCircle } from "./icons";

interface InputGroupProps {
  children: React.ReactElement;
  /**
   * the description of the input.
   * @type {string}
   */
  description?: string;

  /**
   * the message to display when the input value is not valid.
   * @type {string}
   */
  errorMessage?: string;
}
function InputGroup({ children, description, errorMessage }: InputGroupProps) {
  return (
    <div>
      {children}
      {description ? (
        <div className="flex items-center gap-x-1.5 mt-1.5 text-sm text-primary">
          <IconExclamationCircle className="w-4 h-4 flex-none" />
          {description}
        </div>
      ) : (
        <div />
      )}

      {errorMessage ? (
        <div className="flex items-center gap-x-1.5 mt-1.5 text-sm text-destructive">
          <IconBxError className="w-4 h-4 flex-none" />
          {errorMessage}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default InputGroup;
