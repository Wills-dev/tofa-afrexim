import InputError from "@/components/atoms/InputError/InputError";
import Label from "@/components/atoms/Label/Label";
import SingleRadioInput from "@/components/atoms/SingleRadioInput/SingleRadioInput";

interface CheckboxWrapperProps {
  onChange: (paymentOption: string, checked: boolean) => void;
  value: string[];
  name: string;
  className?: string;
  required?: boolean;
  inputClassName?: string;
  label: string;
  error?: string;
  options: string[];
}

const CheckboxWrapper = ({
  name,
  onChange,
  value = [],
  label,
  className,
  required,
  error,
  options,
}: CheckboxWrapperProps) => {
  return (
    <div className={` ${className}`}>
      <Label title={label} required={required} id={name} />
      <div className="space-y-4 mb-4">
        {options?.map((option) => (
          <SingleRadioInput
            key={option}
            inputLabel={option}
            type="checkbox"
            checked={value.includes(option)}
            onChange={(e) => onChange(option, e.target.checked)}
            className=""
          />
        ))}
      </div>
      {error && <InputError error={error} />}
    </div>
  );
};

export default CheckboxWrapper;
