import Link from "next/link";

import { ButtonProps } from "@/lib/types";
import { Loader2 } from "lucide-react";

const Button = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  className = "",
  disabled = false,
  icon,
  asChild = false,
  href,
  type = "button",
  loading = false,
}: ButtonProps) => {
  const baseClasses =
    "font-semibold rounded-lg transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed h-11";

  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-orange-500 text-white hover:bg-orange-600",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-green-500",
    ghost: "text-gray-600 hover:text-green-600 hover:bg-green-50",
    danger: "text-red-600 hover:text-red-700 hover:bg-red-50",
  };

  const sizes = {
    sm: "px-3 text-sm",
    md: "px-4",
    lg: "px-8 text-lg",
  };

  const Element = asChild ? "span" : "button";

  const buttonElement = (
    <Element
      {...(!asChild ? { type, onClick } : { onClick })}
      {...(!asChild ? { disabled: disabled || loading } : {})}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}  ${
        icon ? "flex items-center space-x-2" : ""
      } ${className} ${
        disabled || loading ? "cursor-not-allowed opacity-65" : "cursor-pointer"
      }`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
        </span>
      ) : (
        <>
          {children}
          {icon && <span>{icon}</span>}
        </>
      )}
    </Element>
  );

  return href ? <Link href={href}>{buttonElement}</Link> : buttonElement;
};

export default Button;
