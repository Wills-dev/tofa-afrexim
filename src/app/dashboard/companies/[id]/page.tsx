"use client";

import { useParams } from "next/navigation";

import CompanyInfoWrapper from "@/services/companies/components/CompanyInfoWrapper";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import ProtectedRoute from "@/components/templates/ProtectedRoute/ProtectedRoute";

import { userMenuItems } from "@/lib/constants";

const page = () => {
  const params = useParams();
  const companyId = params.id as string;

  return (
    <DashboardLayout menuItems={userMenuItems}>
      <CompanyInfoWrapper companyId={companyId} />
    </DashboardLayout>
  );
};

export default page;
