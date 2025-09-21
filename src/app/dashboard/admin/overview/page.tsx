"use client";

import AdminOverview from "@/components/organisms/AdminOverview/AdminOverview";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import { adminMenuItems } from "@/lib/constants";

const page = () => {
  return (
    <DashboardLayout menuItems={adminMenuItems}>
      <AdminOverview />
    </DashboardLayout>
  );
};

export default page;
