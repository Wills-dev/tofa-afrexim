import Badge from "@/components/atoms/Badge/Badge";
import Card from "@/components/atoms/Card/Card";
import InfoItem from "@/components/molecules/InfoItem/InfoItem";

import { Briefcase, Building2, Factory, Package } from "lucide-react";

import { CompanyType } from "../types";

const CompanyOverview: React.FC<{ companyData: CompanyType }> = ({
  companyData,
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Company Overview
        </h3>
        <Badge variant="info" size="sm">
          {companyData?.businessSector}
        </Badge>
      </div>

      <div className="space-y-1 divide-y divide-gray-100">
        <InfoItem
          icon={Building2}
          label="Company Description"
          value={companyData?.companyDescription}
        />

        <InfoItem
          icon={Briefcase}
          label="Trade Role"
          value={companyData?.tradeRole}
        />

        {companyData.tradeRoleOther && (
          <InfoItem
            icon={Briefcase}
            label="Other Trade Role"
            value={companyData?.tradeRoleOther}
          />
        )}

        <InfoItem
          icon={Factory}
          label="Business Sector"
          value={companyData?.businessSector}
        />

        <InfoItem
          icon={Package}
          label="Products & Services"
          value={companyData?.productsServices}
        />
      </div>
    </Card>
  );
};

export default CompanyOverview;
