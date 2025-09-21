"use client";

import { useState } from "react";

import InputError from "@/components/atoms/InputError/InputError";
import { InputFormProps } from "@/lib/types";
import { Eye, EyeOff } from "lucide-react";

const InputForm = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  icon,
  disabled = false,
}: InputFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            block w-full rounded-lg h-11 border transition-all duration-200 outline-none
            ${icon ? "pl-10" : "pl-3"} 
            ${type === "password" ? "pr-10" : "pr-3"} 
            py-3 text-gray-900 placeholder-gray-400
            ${
              error
                ? "border-red-300 focus:border-red-500"
                : isFocused
                ? "border-green-500 focus:border-green-500"
                : "border-gray-300 hover:border-gray-400"
            }
           
            disabled:bg-gray-50 disabled:cursor-not-allowed
          `}
          style={{ fontSize: "16px" }}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>
      {error && <InputError error={error} />}
    </div>
  );
};

export default InputForm;
