"use client";

import { useParams } from "next/navigation";

import { adminMenuItems } from "@/lib/constants";

import AdminAgentInfo from "@/services/users/components/AdminAgentInfo/AdminAgentInfo";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";

const page = () => {
  const params = useParams();
  const userId = params.id as string;

  return (
    <DashboardLayout menuItems={adminMenuItems}>
      <AdminAgentInfo userId={userId} />
    </DashboardLayout>
  );
};

export default page;
