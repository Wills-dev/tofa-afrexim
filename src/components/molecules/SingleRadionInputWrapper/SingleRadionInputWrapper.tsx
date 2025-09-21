import InputError from "@/components/atoms/InputError/InputError";
import Label from "@/components/atoms/Label/Label";
import SingleRadioInput from "@/components/atoms/SingleRadioInput/SingleRadioInput";
import { SortOptionsType } from "@/lib/types";

interface SingleRadionInputWrapperProps {
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  value: string;
  name: string;
  className?: string;
  required?: boolean;
  inputClassName?: string;
  label: string;
  error?: string;
  options: SortOptionsType[];
}

const SingleRadionInputWrapper = ({
  name,
  onChange,
  value,
  label,
  className,
  required,
  error,
  options,
}: SingleRadionInputWrapperProps) => {
  return (
    <div className={` ${className}`}>
      <Label title={label} required={required} id={name} />
      <div className="space-y-4 mb-4">
        {options?.map((option) => (
          <SingleRadioInput
            key={option?.label}
            inputLabel={option?.label}
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
          />
        ))}
      </div>
      {error && <InputError error={error} />}
    </div>
  );
};

export default SingleRadionInputWrapper;
