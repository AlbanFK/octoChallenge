import clsx from "clsx";
import { IconStop } from "./icons";

type EmptyBlockBorderStyle = "solid" | "dashed" | "none";
type EmptyBlockSize = "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";

interface EmptyBlockProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  borderStyle?: EmptyBlockBorderStyle;
  title?: string;
  description?: string;
  size?: EmptyBlockSize;
  onClick?: () => void;
}

function EmptyBlock({
  icon = <IconStop className="w-16 h-16 text-primary-400" />,
  borderStyle = "solid",
  title = "There is no content",
  description = "",
  size = "md",
  onClick = () => {},
  className,
}: EmptyBlockProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "relative w-full rounded-lg border-2 border-secondary p-12 text-center hover:border-primary focus:outline-none focus:ring-0 focus:ring-transparent flex flex-col items-center justify-center",
        className,
        "border-dashed" && borderStyle === "dashed",
        "border-solid" && borderStyle === "solid",
        "border-none" && borderStyle === "none"
      )}
    >
      {icon}

      <span
        className={clsx("mt-12 block font-medium text-primary", {
          "text-sm": size === "sm",
          "text-md": size === "md",
          "text-lg": size === "lg",
          "text-2xl": size === "2xl",
          "text-4xl": size === "4xl",
        })}
      >
        {title}
      </span>

      {description && (
        <span className="mt-4 max-w-2xl block text-sm ">{description}</span>
      )}
    </button>
  );
}

export default EmptyBlock;
