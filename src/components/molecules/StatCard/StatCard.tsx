import Card from "@/components/atoms/Card/Card";

import { StatCardProps } from "@/lib/types";

const StatCard = ({
  icon,
  title,
  description,
  variant = "green",
}: StatCardProps) => {
  const variants = {
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-500",
  };
  return (
    <Card>
      <div
        className={`w-12 h-12 ${variants[variant]} rounded-lg flex items-center justify-center mb-6`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
};

export default StatCard;
