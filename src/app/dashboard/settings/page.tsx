"use client";

import { useContext } from "react";

import SettingsWrapper from "@/components/organisms/SettingsWrapper/SettingsWrapper";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";

import { AuthContext } from "@/contexts/AuthState";
import { adminMenuItems, userMenuItems } from "@/lib/constants";

const page = () => {
  const { currentUser, refreshUser } = useContext(AuthContext);
  const role = currentUser?.role;
  const user = role === "user";

  return (
    <DashboardLayout menuItems={user ? userMenuItems : adminMenuItems}>
      <SettingsWrapper currentUser={currentUser} refreshUser={refreshUser} />
    </DashboardLayout>
  );
};

export default page;
