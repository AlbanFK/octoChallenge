import clsx from "clsx";
import { IconBxError, IconExclamationCircle } from "./icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Defines if the input is disabled or not.
   * @type {boolean}
   * @default true
   */
  isValid?: boolean;
}

function Input({ isValid = true, className, type, ...rest }: InputProps) {
  return (
    <>
      <input
        {...rest}
        type={type}
        className={clsx({
          "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50":
            true,
          "border-destructive focus-visible:ring-destructive": !isValid,
          className: true,
        })}
      />
    </>
  );
}

export default Input;
