const PartnershipInfo = ({
  title,
  subtitle,
  description,
  icon,
  variant,
}: {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  variant: "green" | "orange";
}) => {
  const variants = {
    green: "bg-green-50",
    orange: "bg-orange-50",
  };

  const iconVariants = {
    green: "bg-green-600",
    orange: "bg-orange-500",
  };

  const textVariants = {
    green: "text-green-600",
    orange: "text-orange-500",
  };

  return (
    <div className={`${variants[variant]} p-8 rounded-2xl`}>
      <div className="flex items-center space-x-4 mb-4">
        <div
          className={`w-16 h-16 ${iconVariants[variant]} rounded-lg flex items-center justify-center`}
        >
          <span className="text-white">{icon}</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <p className={`${textVariants[variant]} font-semibold`}>{subtitle}</p>
        </div>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default PartnershipInfo;
