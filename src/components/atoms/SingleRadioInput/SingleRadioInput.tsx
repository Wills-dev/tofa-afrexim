import { InputHTMLAttributes } from "react";

interface SingleRadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputLabel: string;
  className?: string;
}

const SingleRadioInput = ({
  inputLabel,
  className = "rounded-full",
  ...props
}: SingleRadioInputProps) => {
  return (
    <label className="flex items-center">
      <input
        className={`appearance-none h-5 w-5 border-2 border-gray-300 checked:bg-green-500 checked:border-green-500 checked:ring-4 checked:ring-green-200 focus:outline-none cursor-pointer ${className}`}
        style={{ fontSize: "16px" }}
        {...props}
      />
      <span className="ml-2 text-gray-500 text-sm">{inputLabel}</span>
    </label>
  );
};

export default SingleRadioInput;
