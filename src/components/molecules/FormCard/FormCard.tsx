import BackButton from "@/components/atoms/BackButton/BackButton";
import Logo from "@/components/atoms/Logo/Logo";

import { FormCardProps } from "@/lib/types";

const FormCard = ({
  title,
  subtitle,
  children,
  showBackButton = false,
  isAdmin,
}: FormCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-sm:px-3 w-full max-w-md mx-auto">
      {showBackButton && <BackButton />}

      <div className="text-center mb-8">
        {!isAdmin && (
          <div className="flex items-center justify-center pb-4">
            <Logo size="lg" />
          </div>
        )}

        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
      </div>

      {children}
    </div>
  );
};

export default FormCard;
