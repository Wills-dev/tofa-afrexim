import Card from "@/components/atoms/Card/Card";
import InfoItem from "@/components/molecules/InfoItem/InfoItem";

import {
  Briefcase,
  Building2,
  Factory,
  FileText,
  Globe,
  Package,
  Shield,
} from "lucide-react";

import { CompanyType } from "../types";

const BusinessLicensing = ({ companyData }: { companyData: CompanyType }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Business Licensing & Registration
      </h3>
      <div className="space-y-1 divide-y divide-gray-100">
        <InfoItem
          icon={Shield}
          label="Officially Registered"
          value={companyData?.isOfficiallyRegistered}
          type="boolean"
        />
        <InfoItem
          icon={FileText}
          label="Has Valid License"
          value={companyData?.hasValidLicense}
          type="boolean"
        />
        <InfoItem
          icon={Globe}
          label="Engages in Cross-Border Trade"
          value={companyData?.engagesInCrossBorderTrade}
          type="boolean"
        />
        <InfoItem
          icon={Package}
          label="Has Import/Export License"
          value={companyData?.hasImportExportLicense}
          type="boolean"
        />
        <InfoItem
          icon={Building2}
          label="Works with International Partners"
          value={companyData?.worksWithInternationalPartners}
          type="boolean"
        />
        <InfoItem
          icon={Factory}
          label="List of trade partners"
          value={companyData?.listTradePartners}
        />
      </div>
    </Card>
  );
};

export default BusinessLicensing;
