import clsx from "clsx";

export type ButtonVariants =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  /**
   * the button's type.
   * @type {ButtonVariants}
   * @default default
   */
  variant?: ButtonVariants;

  /**
   * the button's size.
   * @type {ButtonVariants}
   *  @default default
   */
  size?: ButtonSize;
}

function Button({
  variant = "default",
  size = "default",
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx({
        "bg-primary text-primary-foreground hover:bg-primary/90":
          variant === "default",
        "bg-destructive text-destructive-foreground hover:bg-destructive/90":
          variant === "destructive",
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
          variant === "outline",
        "bg-secondary text-secondary-foreground hover:bg-secondary/80":
          variant === "secondary",
        "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
        "text-primary underline-offset-4 hover:underline": variant === "link",
        "h-10 px-4 py-2 rounded-lg": size === "default",
        "h-9 rounded-lg px-3": size === "sm",
        "h-11 rounded-lg px-8": size === "lg",
        "h-10 w-10 rounded-lg flex items-center justify-center":
          size === "icon",
        className: true,
      })}
    >
      {children}
    </button>
  );
}

export default Button;
