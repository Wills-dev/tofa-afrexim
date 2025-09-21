const Label = ({
  title,
  required = false,
  id,
}: {
  title: string;
  required?: boolean;
  id: string;
}) => {
  return (
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {title} {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
