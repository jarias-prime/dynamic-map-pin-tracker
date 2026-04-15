import { useState } from "react";

import clsx from "clsx";
import { Icon } from "@iconify/react";

import type { BannerProps } from "./Banner.types";

export function Banner({
  variant = "info",
  className,
  title,
  description,
}: BannerProps) {
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(true);

  const iconMap: Record<
    string,
    { icon: string; color: { main: string; sub: string } }
  > = {
    info: {
      icon: "ph:info-fill",
      color: {
        main: "text-txt-primary",
        sub: "text-txt-primary-secondary",
      },
    },
    success: {
      icon: "ph:check-circle-fill",
      color: {
        main: "text-txt-success",
        sub: "text-txt-success-secondary",
      },
    },
    warning: {
      icon: "ph:warning-fill",
      color: {
        main: "text-txt-warning-secondary",
        sub: "text-txt-warning-secondary",
      },
    },
    error: {
      icon: "ph:x-circle-fill",
      color: {
        main: "text-txt-error-secondary",
        sub: "text-txt-error-secondary",
      },
    },
  };

  const handleClose = () => {
    setClosing(true);

    setTimeout(() => {
      setVisible(false);
    }, 150);
  };

  if (!visible) return null;

  return (
    <div
      className={clsx(
        "flex gap-3 justify-between h-19.25 w-full px-4 py-6",
        "border border-l-4 border-r-0 border-y-0",
        "transition-all duration-150 ease-out",
        closing && "opacity-0 -translate-y-1 scale-95",

        variant === "info" &&
          "bg-background-primary-subdued border-border-primary",
        variant === "success" &&
          "bg-background-success-subdued border-border-success",
        variant === "warning" &&
          "bg-background-warning-subdued border-border-warning",
        variant === "error" &&
          "bg-background-error-subdued border-border-error",

        className,
      )}
    >
      <div className="flex gap-3 items-start">
        <Icon
          className={clsx("mt-0.5 text-[20px]", iconMap[variant]?.color.main)}
          icon={iconMap[variant]?.icon || "ph:info"}
        />
        <div>
          <h5
            className={clsx("font-medium text-sm", iconMap[variant]?.color.sub)}
          >
            {title}
          </h5>
          <p className={clsx("text-sm", iconMap[variant]?.color.main)}>
            {description}
          </p>
        </div>
      </div>

      <div
        onClick={handleClose}
        className={clsx(
          "flex gap-3 items-start cursor-pointer",
          "duration-150 ease-in-out",
          "hover:scale-105",
          "active:scale-95",
          iconMap[variant]?.color.main,
        )}
      >
        <Icon icon="ph:x" />
      </div>
    </div>
  );
}
