import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: string;
}

const TextArea = ({ className, error, ...props }: TextAreaProps) => {
  return (
    <textarea
      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
        error ? "border-red-300" : "border-gray-300"
      } ${className}`}
      style={{ fontSize: "16px" }}
      {...props}
    />
  );
};

export default TextArea;
