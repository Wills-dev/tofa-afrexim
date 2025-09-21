"use client";

import Link from "next/link";

import Container from "@/components/atoms/Container/Container";
import DashboardHeader from "@/components/molecules/DashboardHeader/DashboardHeader";
import UserDashboardCardWrapper from "@/components/molecules/UserDashboardCardWrapper/UserDashboardCardWrapper";
import UserActivityWrapper from "../UserActivityWrapper/UserActivityWrapper";

import { ROUTES } from "@/lib/constants/routes";
import { BarChart3, Plus, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthState";
import { useUserStat } from "@/lib/hooks/useUserStat";

const UserOverview = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    isFetching,
    userStats,
    currentRange,
    handleDateRangeChange,
    getUserStats,
  } = useUserStat(currentUser?.id);

  return (
    <Container>
      <div className="space-y-6">
        <DashboardHeader
          title={`Welcome back, ${currentUser?.firstName}! 👋`}
          description="Here's what's happening with your company onboarding"
        />
        <UserDashboardCardWrapper />
        <UserActivityWrapper />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Quick Onboard</h4>
                <Link href={ROUTES?.onboard} className="text-sm text-gray-500">
                  Add a new company
                </Link>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">View Reports</h4>
                <p className="text-sm text-gray-500">Detailed analytics</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Settings</h4>
                <p className="text-sm text-gray-500">Account preferences</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default UserOverview;
