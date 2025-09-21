"use client";

import AdminDashboardCardWrapper from "@/components/molecules/AdminDashboardCardWrapper/AdminDashboardCardWrapper";
import DashboardHeader from "@/components/molecules/DashboardHeader/DashboardHeader";
import AdminChartWrapper from "../AdminChartWrapper/AdminChartWrapper";
import Container from "@/components/atoms/Container/Container";
import { useAdminStat } from "@/lib/hooks/useAdminStat";
import { useAdminCompanyChart } from "@/services/auth/hooks/useAdminCompanyChart";
import { useState } from "react";
import { DateRange } from "@/lib/types";

const AdminOverview = () => {
  const { isFetching, adminStats, handleDateRangeChange } = useAdminStat();

  return (
    <Container>
      <div className="space-y-6">
        <DashboardHeader
          title="Admin Dashboard"
          description="Monitor platform performance and user activity"
          isAdmin
        />
        <AdminDashboardCardWrapper
          loading={isFetching}
          totalCompanies={adminStats?.totalCompanies || 0}
          totalPendingCompanies={adminStats?.totalPendingCompanies || 0}
          totalProcessingCompanies={adminStats?.totalProcessingCompanies || 0}
          totalAcceptedCompanies={adminStats?.totalAcceptedCompanies || 0}
          totalDeclinedCompanies={adminStats?.totalDeclinedCompanies || 0}
          handleDateRangeChange={handleDateRangeChange}
          totalUsers={adminStats.totalUsers || 0}
        />
        <AdminChartWrapper />
      </div>
    </Container>
  );
};

export default AdminOverview;
