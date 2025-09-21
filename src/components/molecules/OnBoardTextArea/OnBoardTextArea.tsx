import InputDescription from "@/components/atoms/InputDescription/InputDescription";
import InputError from "@/components/atoms/InputError/InputError";
import Label from "@/components/atoms/Label/Label";
import TextArea from "@/components/atoms/TextArea/TextArea";

interface OnBoardTextAreaProps {
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
  rows?: number;
}

const OnBoardTextArea = ({
  className,
  name,
  onChange,
  value,
  label,
  description,
  placeholder,
  error,
  rows = 4,
  required,
  inputClassName,
}: OnBoardTextAreaProps) => {
  return (
    <div className={` ${className}`}>
      <Label title={label} required={required} id={name} />
      <TextArea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        className={inputClassName}
        rows={rows}
      />
      {description && <InputDescription description={description} />}
      {error && <InputError error={error} />}
    </div>
  );
};

export default OnBoardTextArea;
