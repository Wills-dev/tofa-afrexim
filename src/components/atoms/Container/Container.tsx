import { ContainerProps } from "@/lib/types";

const Container = ({
  children,
  maxWidth = "7xl",
  className = "",
}: ContainerProps) => {
  const maxWidths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "7xl": "max-w-7xl",
  };

  return (
    <div
      className={`${maxWidths[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
