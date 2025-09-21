import { CardProps } from "@/lib/types";

const Card = ({ children, className = "", padding = "md" }: CardProps) => {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-50 ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
