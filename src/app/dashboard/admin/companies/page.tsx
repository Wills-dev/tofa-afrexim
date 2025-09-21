"use client";

import CompaniesWrapper from "@/components/organisms/CompaniesWrapper/CompaniesWrapper";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";

import { adminMenuItems } from "@/lib/constants";

const page = () => {
  return (
    <DashboardLayout menuItems={adminMenuItems}>
      <CompaniesWrapper />
    </DashboardLayout>
  );
};

export default page;
