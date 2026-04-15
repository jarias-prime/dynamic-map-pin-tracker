export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "error";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};
