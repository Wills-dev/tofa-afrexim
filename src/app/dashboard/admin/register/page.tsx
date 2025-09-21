"use client";

import RegisterAdmin from "@/components/organisms/RegisterAdmin/RegisterAdmin";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import { adminMenuItems } from "@/lib/constants";

const page = () => {
  return (
    <DashboardLayout menuItems={adminMenuItems}>
      <RegisterAdmin />
    </DashboardLayout>
  );
};

export default page;
