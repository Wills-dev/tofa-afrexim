import { AlertProps } from "@/lib/types";
import { AlertCircle, CheckCircle } from "lucide-react";

const Alert = ({ type, message, onClose }: AlertProps) => {
  const types = {
    success: {
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      iconColor: "text-green-600",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    error: {
      bgColor: "bg-red-50",
      textColor: "text-red-800",
      iconColor: "text-red-600",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    warning: {
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-600",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    info: {
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      iconColor: "text-blue-600",
      icon: <AlertCircle className="w-5 h-5" />,
    },
  };

  const config = types[type];

  return (
    <div className={`p-4 fixed bottom-4 right-0 z-50 max-w-sm w-full`}>
      <div
        className={`border border-gray-300 max-w-sm w-full shadow-lg p-4 rounded-lg ${config.bgColor}`}
      >
        <div className="flex">
          <div className={`flex-shrink-0 ${config.iconColor}`}>
            {config.icon}
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${config.textColor}`}>
              {message}
            </p>
          </div>
          {onClose && (
            <div className="ml-auto pl-3">
              <button
                onClick={onClose}
                className={`-mx-1.5 -my-1.5 rounded-lg p-1.5 ${config.textColor} hover:bg-opacity-20 hover:${config.bgColor}`}
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
