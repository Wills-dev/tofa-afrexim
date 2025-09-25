"use client";

import { useParams } from "next/navigation";

import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CompanyInfoWrapper from "@/services/companies/components/CompanyInfoWrapper";

import { supervisorMenuItems } from "@/lib/constants";

const page = () => {
  const params = useParams();
  const companyId = params.id as string;

  return (
    <DashboardLayout menuItems={supervisorMenuItems}>
      <CompanyInfoWrapper companyId={companyId} />
    </DashboardLayout>
  );
};

export default page;
