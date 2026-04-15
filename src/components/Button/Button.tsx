import clsx from "clsx";
import { Icon } from "@iconify/react";

import type { ButtonProps } from "./Button.types";

export function Button({
  variant = "default",
  disabled,
  className,
  icon,
  children,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "max-h-8 flex gap-3 items-center px-3.5 py-6 font-semibold rounded-md cursor-pointer",
        "duration-150 ease-in-out",
        "active:scale-95",
        variant === "default" && "bg-background-default text-white",
        variant === "secondary" && "bg-background-secondary text-white",
        variant === "tertiary" && "bg-background-tertiary text-txt-primary",
        variant === "primary" &&
          "bg-background-primary text-white hover:bg-background-primary-hover",
        variant === "success" &&
          "bg-background-success text-white hover:bg-background-success-hover",
        variant === "warning" &&
          "bg-background-warning text-white hover:bg-background-warning-hover",
        variant === "error" &&
          "bg-background-error text-white hover:bg-background-error-hover",
        disabled &&
          "disabled:bg-background-primary-disabled disabled:cursor-not-allowed",
        className,
      )}
    >
      {icon && <Icon icon={icon} />}
      {children && <span>{children}</span>}
    </button>
  );
}
