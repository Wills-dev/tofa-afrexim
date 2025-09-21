import { goBack } from "@/lib/helpers/goBack";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  return (
    <button
      onClick={goBack}
      className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
