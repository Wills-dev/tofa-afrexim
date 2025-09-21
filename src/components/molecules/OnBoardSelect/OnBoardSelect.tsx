import InputDescription from "@/components/atoms/InputDescription/InputDescription";
import InputError from "@/components/atoms/InputError/InputError";
import Label from "@/components/atoms/Label/Label";
import Select from "@/components/atoms/Select/Select";
import { SortOptionsType } from "@/lib/types";

interface OnBoardSelectProps {
  name: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  value: string;
  label: string;
  description?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  required?: boolean;
  inputClassName?: string;
  options: SortOptionsType[];
}

const OnBoardSelect = ({
  className,
  name,
  onChange,
  value,
  label,
  description,
  placeholder,
  error,
  required,
  inputClassName,
  options,
}: OnBoardSelectProps) => {
  return (
    <div className={` ${className}`}>
      <Label title={label} required={required} id={name} />
      <Select
        options={options}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={inputClassName}
        placeHolder={placeholder}
      />
      {description && <InputDescription description={description} />}
      {error && <InputError error={error} />}
    </div>
  );
};

export default OnBoardSelect;
