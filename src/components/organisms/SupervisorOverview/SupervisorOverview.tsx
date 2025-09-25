"use client";

import AdminDashboardCardWrapper from "@/components/molecules/AdminDashboardCardWrapper/AdminDashboardCardWrapper";
import Container from "@/components/atoms/Container/Container";
import DashboardHeader from "@/components/molecules/DashboardHeader/DashboardHeader";
import SupervisorChartWrapper from "../SupervisorChartWrapper/SupervisorChartWrapper";

import { useSupervisorStat } from "@/lib/hooks/useSupervisorStat";

const SupervisorOverview = () => {
  const { isFetching, supervisorStats, handleDateRangeChange } =
    useSupervisorStat();

  return (
    <Container>
      <div className="space-y-6">
        <DashboardHeader
          title="Supervisor Dashboard"
          description="Monitor your performance and user activity"
          isAdmin
        />
        <AdminDashboardCardWrapper
          loading={isFetching}
          totalCompanies={supervisorStats?.totalCompanies || 0}
          totalPendingCompanies={supervisorStats?.totalPendingCompanies || 0}
          totalProcessingCompanies={
            supervisorStats?.totalProcessingCompanies || 0
          }
          totalAcceptedCompanies={supervisorStats?.totalAcceptedCompanies || 0}
          totalDeclinedCompanies={supervisorStats?.totalDeclinedCompanies || 0}
          handleDateRangeChange={handleDateRangeChange}
          totalUsers={supervisorStats.totalUsers || 0}
        />
        <SupervisorChartWrapper />
      </div>
    </Container>
  );
};

export default SupervisorOverview;
