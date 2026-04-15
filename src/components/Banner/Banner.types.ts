export type BannerVariant = "info" | "success" | "warning" | "error";

export type BannerProps = {
  variant?: BannerVariant;
  className?: string;
  title?: string;
  description?: string;
  icon?: string;
};
