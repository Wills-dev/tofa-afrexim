import { MetricCardProps } from "@/lib/types";

const MetricCard = ({ value, label, variant = "light" }: MetricCardProps) => {
  const textColor = variant === "light" ? "text-green-600" : "text-white";
  const labelColor = variant === "light" ? "text-gray-600" : "text-green-100";

  return (
    <div className="text-center">
      <div className={`text-3xl font-bold mb-2 ${textColor}`}>{value}</div>
      <div className={labelColor}>{label}</div>
    </div>
  );
};

export default MetricCard;
