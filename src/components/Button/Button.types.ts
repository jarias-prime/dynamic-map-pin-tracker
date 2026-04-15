export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "error";

export type ButtonProps = {
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  icon?: string;
  children: React.ReactNode;
};
