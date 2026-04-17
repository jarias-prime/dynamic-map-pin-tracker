"use client";

import clsx from "clsx";
import { Icon } from "@iconify/react";

import type { ButtonProps } from "./Button.types";

export const Button = ({
  variant = "default",
  size = "md",
  disabled,
  className,
  icon,
  type,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "flex gap-3 items-center justify-center font-semibold rounded-md cursor-pointer",
        "transition duration-150 ease-in-out",
        "active:scale-95",
        size === "sm" && "px-1 py-1 text-sm",
        size === "md" && "px-3.5 py-2 text-base",
        size === "lg" && "px-4 py-3 text-lg",
        variant === "default" && "bg-background-default text-white",
        variant === "secondary" && "bg-background-secondary text-white",
        variant === "tertiary" &&
          "bg-background-tertiary text-txt-primary hover:bg-background-primary-hover hover:text-white",
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
      type={type}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} />}
      {children && <span>{children}</span>}
    </button>
  );
};
