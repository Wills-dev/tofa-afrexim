"use client";

import UserOverview from "@/components/organisms/UserOverview/UserOverview";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import { userMenuItems } from "@/lib/constants";

const page = () => {
  return (
    <DashboardLayout menuItems={userMenuItems}>
      <UserOverview />
    </DashboardLayout>
  );
};

export default page;
