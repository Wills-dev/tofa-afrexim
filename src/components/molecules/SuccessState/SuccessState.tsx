import Button from "@/components/atoms/Button/Button";
import { AuthContext } from "@/contexts/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { useContext } from "react";

const SuccessState = ({
  handleReset,
  title = "Thank You!",
  description = "  Your client onboarding form has been submitted successfully. We'll review your application and get back to you within 2-3 business days.",
  buttonLabel = "Submit Another Form",
}: {
  handleReset: () => void;
  title?: string;
  description?: string;
  buttonLabel?: string;
}) => {
  const { currentUser } = useContext(AuthContext);
  const userRole = currentUser?.role;
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <Button variant="primary" onClick={handleReset}>
          {buttonLabel}
        </Button>
        <Button
          variant="outline"
          href={
            userRole === "user" ? ROUTES?.dashboard : ROUTES?.dashboard_admin
          }
        >
          Dashboard
        </Button>
      </div>
    </div>
  );
};

export default SuccessState;
