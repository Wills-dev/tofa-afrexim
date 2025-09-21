"use client";

import UserCompanyWrapper from "@/components/organisms/UserCompanyWrapper/UserCompanyWrapper";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import ProtectedRoute from "@/components/templates/ProtectedRoute/ProtectedRoute";
import { userMenuItems } from "@/lib/constants";

const page = () => {
  return (
    <DashboardLayout menuItems={userMenuItems}>
      <UserCompanyWrapper />
    </DashboardLayout>
  );
};

export default page;
