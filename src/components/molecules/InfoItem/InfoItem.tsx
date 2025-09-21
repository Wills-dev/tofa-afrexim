import Badge from "@/components/atoms/Badge/Badge";
import { CheckCircle, XCircle } from "lucide-react";

const InfoItem = ({
  icon: Icon,
  label,
  value,
  type = "text",
  className = "",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number | boolean | string[] | null;
  type?: "text" | "currency" | "boolean" | "list";
  className?: string;
}) => {
  const formatValue = () => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400">N/A</span>;
    }

    if (type === "currency") {
      return (
        <span className="font-semibold text-green-600">
          ${Number(value).toLocaleString()}
        </span>
      );
    }

    if (type === "boolean") {
      return (
        <Badge variant={value ? "success" : "danger"}>
          {value ? (
            <>
              <CheckCircle className="h-3 w-3 mr-1" />
              Yes
            </>
          ) : (
            <>
              <XCircle className="h-3 w-3 mr-1" />
              No
            </>
          )}
        </Badge>
      );
    }

    if (type === "list" && Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-gray-400">None specified</span>;
      }
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((item, index) => (
            <Badge key={index} variant="info" size="sm">
              {item}
            </Badge>
          ))}
        </div>
      );
    }

    return <span>{value?.toString()}</span>;
  };

  return (
    <div className={`flex items-start gap-3 py-4 ${className}`}>
      <div className="flex-shrink-0 mt-1">
        <Icon className="h-4 w-4 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
        <div className="text-sm text-gray-700">{formatValue()}</div>
      </div>
    </div>
  );
};

export default InfoItem;
