"use client";

import { useState } from "react";

import { SelectFormProps } from "@/lib/types";
import { AlertCircle } from "lucide-react";

const SelectForm = ({
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  placeholder = "Select an option",
  disabled = false,
}: SelectFormProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
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
            error
              ? "border-red-300 focus:border-red-500"
              : isFocused
              ? "border-green-500 focus:border-green-500"
              : "border-gray-300 hover:border-gray-400"
          }    
          disabled:bg-gray-50 disabled:cursor-not-allowed
        `}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default SelectForm;
