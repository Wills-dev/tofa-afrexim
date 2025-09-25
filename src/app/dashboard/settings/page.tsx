"use client";

import { useContext } from "react";

import SettingsWrapper from "@/components/organisms/SettingsWrapper/SettingsWrapper";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";

import { AuthContext } from "@/contexts/AuthState";
import {
  adminMenuItems,
  supervisorMenuItems,
  userMenuItems,
} from "@/lib/constants";

const page = () => {
  const { currentUser, refreshUser } = useContext(AuthContext);
  const role = currentUser?.role;
  const user = role === "user";
  const supervisor = role === "supervisor";

  return (
    <DashboardLayout
      menuItems={
        user ? userMenuItems : supervisor ? supervisorMenuItems : adminMenuItems
      }
    >
      <SettingsWrapper currentUser={currentUser} refreshUser={refreshUser} />
    </DashboardLayout>
  );
};

export default page;
