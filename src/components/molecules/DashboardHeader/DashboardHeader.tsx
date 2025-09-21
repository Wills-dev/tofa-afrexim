import Button from "@/components/atoms/Button/Button";
import { ROUTES } from "@/lib/constants/routes";
import { Plus } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  description: string;
  isAdmin?: boolean;
}

const DashboardHeader = ({
  title,
  description,
  isAdmin = false,
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      {!isAdmin && (
        <Button
          variant="primary"
          icon={<Plus className="h-4 w-4 mr-2" />}
          href={ROUTES.onboard}
        >
          Onboard Company
        </Button>
      )}
    </div>
  );
};

export default DashboardHeader;
