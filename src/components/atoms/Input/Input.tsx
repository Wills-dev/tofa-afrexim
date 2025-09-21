import { InputHTMLAttributes, Ref } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

const Input = ({ className, error, ref, ...props }: InputProps) => {
  return (
    <input
      className={`w-full px-2 h-11 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
        error ? "border-red-300" : "border-gray-300"
      } ${className}`}
      style={{ fontSize: "16px" }}
      ref={ref}
      {...props}
    />
  );
};

export default Input;
