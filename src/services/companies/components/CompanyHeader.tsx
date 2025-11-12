import { StatusType } from "@/lib/types";
import { CompanyType } from "../types";
import { getStatusIcon, getStatusVariant } from "@/lib/helpers";
import { convertDateFormat } from "@/lib/helpers/dateFormats";
import { Building2, Calendar, Edit, MapPin } from "lucide-react";

import Card from "@/components/atoms/Card/Card";
import Badge from "@/components/atoms/Badge/Badge";
import StatusUpdateDropdown from "@/components/molecules/StatusUpdateDropdown/StatusUpdateDropdown";
import Button from "@/components/atoms/Button/Button";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthState";
import { ROUTES } from "@/lib/constants/routes";

const CompanyHeader = ({
  companyData,
  onStatusUpdate,
  loading = false,
  declineReason,
  setDeclineReason,
}: {
  companyData: CompanyType;
  onStatusUpdate: (newStatus: StatusType) => void;
  loading?: boolean;
  declineReason: string;
  setDeclineReason: (reason: string) => void;
}) => {
  const { currentUser } = useContext(AuthContext);
  const StatusIcon = getStatusIcon(companyData.status);

  const role = currentUser?.role;
  const isAdmin = role === "superadmin" || role === "admin";
  const companyOwner = currentUser?.id === companyData?.agentId;

  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-6 flex-1">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="space-y-3 flex-1">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {companyData.companyName}
              </h1>
              {/* <p className="text-gray-600 mt-1">
                {companyData.companyDescription}
              </p> */}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Badge
                variant={getStatusVariant(companyData.status)}
                size="default"
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {companyData.status}
              </Badge>

              <div className="flex items-center gap-1 text-gray-600">
                <span className="font-medium">ID:</span>
                <span>#{companyData.id}</span>
              </div>

              <div className="flex items-center gap-1 text-gray-600">
                <span className="font-medium">Agent:</span>
                <span>{companyData.agentId}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>
                  Onboarded{" "}
                  {companyData.createdAt &&
                    convertDateFormat(companyData.createdAt)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>
                  {companyData.city}, {companyData.country}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          {isAdmin && (
            <StatusUpdateDropdown
              currentStatus={companyData.status}
              onStatusUpdate={onStatusUpdate}
              loading={loading}
              setDeclineReason={setDeclineReason}
              declineReason={declineReason}
            />
          )}
          {companyOwner && (
            <Button
              href={ROUTES?.edit_company(companyData?.id)}
              variant="outline"
              icon={<Edit className="h-4 w-4 ml-2" />}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CompanyHeader;
