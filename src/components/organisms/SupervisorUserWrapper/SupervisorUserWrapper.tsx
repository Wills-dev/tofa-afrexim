"use client";

import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import SupervisorUserContent from "@/services/users/components/SupervisorUserContent/SupervisorUserContent";

import { supervisorMenuItems } from "@/lib/constants";

const SupervisorUserWrapper = () => {
  return (
    <DashboardLayout menuItems={supervisorMenuItems}>
      <SupervisorUserContent />
    </DashboardLayout>
  );
};

export default SupervisorUserWrapper;
