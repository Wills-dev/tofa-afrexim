import { SupervisorSelectOption } from "@/services/auth/types";
import { useState } from "react";

interface SupervisorSelectFormProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SupervisorSelectOption[];
  disabled: boolean;
  loading: boolean;
}

const SupervisorSelectForm = ({
  label,
  value,
  onChange,
  options,
  disabled,
  loading,
}: SupervisorSelectFormProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          block w-full rounded-lg border transition-all duration-200
          px-3 h-11 text-gray-900 outline-none
          ${
            isFocused
              ? "border-green-500 focus:border-green-500"
              : "border-gray-300 hover:border-gray-400"
          }    
          disabled:bg-gray-50 disabled:cursor-not-allowed
        `}
      >
        {loading ? (
          <option value="">Loading supervisors...</option>
        ) : (
          <>
            <option value="">Select option</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {`${option.firstName} ${option.lastName}`}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default SupervisorSelectForm;
