"use client";

import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import AdminUserContent from "@/services/users/components/AdminUserContent/AdminUserContent";

import { adminMenuItems } from "@/lib/constants";

const AdminUsersWrapper = () => {
  return (
    <DashboardLayout menuItems={adminMenuItems}>
      <AdminUserContent />
    </DashboardLayout>
  );
};

export default AdminUsersWrapper;
