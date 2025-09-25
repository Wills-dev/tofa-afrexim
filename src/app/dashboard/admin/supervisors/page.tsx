"use client";

import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import SupervisorWrapper from "@/components/organisms/SupervisorWrapper/SupervisorWrapper";

import { adminMenuItems } from "@/lib/constants";

const page = () => {
  return (
    <DashboardLayout menuItems={adminMenuItems}>
      <SupervisorWrapper />
    </DashboardLayout>
  );
};

export default page;
