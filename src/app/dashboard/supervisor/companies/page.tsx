"use client";

import SupervisorCompanyWrapper from "@/components/organisms/SupervisorCompanyWrapper/SupervisorCompanyWrapper";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";

import { supervisorMenuItems } from "@/lib/constants";

const page = () => {
  return (
    <DashboardLayout menuItems={supervisorMenuItems}>
      <SupervisorCompanyWrapper />
    </DashboardLayout>
  );
};

export default page;
