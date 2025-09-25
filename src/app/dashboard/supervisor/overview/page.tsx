"use client";

import SupervisorOverview from "@/components/organisms/SupervisorOverview/SupervisorOverview";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import { supervisorMenuItems } from "@/lib/constants";

const page = () => {
  return (
    <DashboardLayout menuItems={supervisorMenuItems}>
      <SupervisorOverview />
    </DashboardLayout>
  );
};

export default page;
