import { AlertCircle } from "lucide-react";

const DeclinedReason = ({
  reason,
  title,
}: {
  reason: string;
  title: string;
}) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-yellow-800">{title}</p>
          <p className="text-sm text-yellow-700 mt-1">{reason}</p>
        </div>
      </div>
    </div>
  );
};

export default DeclinedReason;
