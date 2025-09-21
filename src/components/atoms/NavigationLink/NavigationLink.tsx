import { NavigationLinkProps } from "@/lib/types";

const NavigationLink = ({
  href,
  children,
  className = "",
}: NavigationLinkProps) => {
  return (
    <a
      href={href}
      className={`text-gray-600 hover:text-green-600 transition-colors ${className}`}
    >
      {children}
    </a>
  );
};

export default NavigationLink;
