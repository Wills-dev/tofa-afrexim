import Input from "@/components/atoms/Input/Input";
import InputDescription from "@/components/atoms/InputDescription/InputDescription";
import InputError from "@/components/atoms/InputError/InputError";
import Label from "@/components/atoms/Label/Label";
import { Ref } from "react";

interface OnBoardInputProps {
  name: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  value?: string;
  label: string;
  description?: string;
  placeholder?: string;
  error?: string;
  type?: string;
  className?: string;
  required?: boolean;
  inputClassName?: string;
  accept?: string;
  ref?: Ref<HTMLInputElement>;
}
const OnBoardInput = ({
  className,
  name,
  onChange,
  value,
  label,
  description,
  placeholder,
  error,
  type = "text",
  required,
  inputClassName,
  accept,
  ref,
}: OnBoardInputProps) => {
  return (
    <div className={` ${className}`}>
      <Label title={label} required={required} id={name} />
      <Input
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        error={error}
        className={inputClassName}
        accept={accept}
        ref={ref}
      />
      {description && <InputDescription description={description} />}
      {error && <InputError error={error} />}
    </div>
  );
};

export default OnBoardInput;
