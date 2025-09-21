import { SortOptionsType } from "@/lib/types";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  error?: string;
  placeHolder?: string;
  options: SortOptionsType[];
}

const Select = ({
  className,
  error,
  placeHolder = "Select...",
  options,
  ...props
}: SelectProps) => {
  return (
    <div
      className={`w-full px-2 h-11 border rounded-lg focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent flex items-center ${
        error ? "border-red-300" : "border-gray-300"
      } ${className}`}
    >
      <select style={{ fontSize: "16px" }} {...props} className="outline-none">
        <option defaultValue="">{placeHolder}</option>
        {options?.map((item) => (
          <option value={item?.value} key={item?.label}>
            {item?.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
