import { AlertCircle } from "lucide-react";

const InputError = ({ error }: { error: string }) => {
  return (
    <p className="text-sm text-red-600 flex items-center space-x-1">
      <AlertCircle className="w-4 h-4" />
      <span>{error}</span>
    </p>
  );
};

export default InputError;
