import clsx from "clsx";
import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

function Label({ children, className, ...rest }: LabelProps) {
  return (
    <label
      {...rest}
      className={clsx([
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      ])}
    >
      {children}
    </label>
  );
}

export default Label;
