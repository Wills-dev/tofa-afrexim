"use client";

import Container from "@/components/atoms/Container/Container";
import DashboardHeader from "@/components/molecules/DashboardHeader/DashboardHeader";
import TableSkeleton from "@/components/molecules/skeletonLoaders/TableSkeleton";
import DataTable from "@/components/organisms/DataTable/DataTable";

import { useGetSupervisorUsers } from "../../hooks/useGetSupervisorUsers";
import { Column } from "./Column";
import { useSupervisorStat } from "@/lib/hooks/useSupervisorStat";
import AdminDashboardCardWrapper from "@/components/molecules/AdminDashboardCardWrapper/AdminDashboardCardWrapper";

const SupervisorUserContent = () => {
  const { isFetching, supervisorStats, handleDateRangeChange } =
    useSupervisorStat();
  const {
    loading,
    allSupervisorAgents,
    currentPage,
    totalPages,
    limit,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    isFirstPage,
    isLastPage,
    searchTerm,
    handleSearch,
    getAllSupervisorAgents,
    setLimit,
  } = useGetSupervisorUsers();

  return (
    <Container>
      <div className="space-y-6 max-w-full w-full">
        <DashboardHeader
          title="All Agents"
          description="Monitor all registered agents on the platform"
          isAdmin
        />
        <AdminDashboardCardWrapper
          loading={isFetching}
          handleDateRangeChange={handleDateRangeChange}
          totalUsers={supervisorStats.totalUsers || 0}
          totalActiveUsers={supervisorStats?.totalActiveUsers}
          totalBlockedUsers={supervisorStats?.totalBlockedUsers}
        />

        <div className="w-full max-w-full pt-8">
          {loading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              columns={Column}
              data={allSupervisorAgents}
              totalPages={totalPages}
              currentPage={currentPage}
              prevPage={prevPage}
              nextPage={nextPage}
              goToLastPage={goToLastPage}
              goToFirstPage={goToFirstPage}
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
              limit={limit}
              setLimit={setLimit}
              handleChange={handleSearch}
              search={searchTerm}
              handleSubmitSearch={getAllSupervisorAgents}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default SupervisorUserContent;
