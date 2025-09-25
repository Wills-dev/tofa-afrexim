"use client";

import { useParams } from "next/navigation";

import AdminSupervisorInfo from "@/components/organisms/AdminSupervisorInfo/AdminSupervisorInfo";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import { adminMenuItems } from "@/lib/constants";

const page = () => {
  const params = useParams();
  const userId = params.id as string;

  return (
    <DashboardLayout menuItems={adminMenuItems}>
      <AdminSupervisorInfo userId={userId} />
    </DashboardLayout>
  );
};

export default page;
