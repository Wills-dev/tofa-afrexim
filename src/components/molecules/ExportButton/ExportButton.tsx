import { Download } from "lucide-react";

interface ExportButtonProps {
  onClick: () => void;
}

const ExportButton = ({ onClick }: ExportButtonProps) => {
  return (
    <div className="max-sm:hidden flex items-center gap-6">
      <span>|</span>
      <button
        onClick={onClick}
        className="flex items-center gap-2 text-gray-600 text-sm"
      >
        <Download className="h-4 w-4" />
        Export to Excel{" "}
      </button>
    </div>
  );
};

export default ExportButton;
