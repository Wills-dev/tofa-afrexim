import Card from "@/components/atoms/Card/Card";
import InfoItem from "@/components/molecules/InfoItem/InfoItem";

import { Mail, MapPin, Phone, User } from "lucide-react";

import { CompanyType } from "../types";

const AdminContactInfo = ({ companyData }: { companyData: CompanyType }) => {
  const fullAddress = [
    companyData.streetAddress,
    companyData.city,
    companyData.country,
    companyData.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Admin Contact Information
      </h3>

      <div className="space-y-1 divide-y divide-gray-100">
        <InfoItem
          icon={User}
          label="Admin Name"
          value={`${companyData.adminFirstName} ${companyData.adminLastName}`}
        />

        <InfoItem
          icon={Mail}
          label="Email Address"
          value={companyData.adminEmail}
        />

        <InfoItem
          icon={Phone}
          label="Phone Number"
          value={`${companyData.adminCountryCode} ${companyData.adminPhoneNumber}`}
        />

        <InfoItem icon={MapPin} label="Business Address" value={fullAddress} />
      </div>
    </Card>
  );
};

export default AdminContactInfo;
