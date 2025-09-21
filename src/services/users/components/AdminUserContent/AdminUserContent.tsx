import { FormEvent, useCallback } from "react";

import Container from "@/components/atoms/Container/Container";
import AdminDashboardCardWrapper from "@/components/molecules/AdminDashboardCardWrapper/AdminDashboardCardWrapper";
import DashboardHeader from "@/components/molecules/DashboardHeader/DashboardHeader";
import TableSkeleton from "@/components/molecules/skeletonLoaders/TableSkeleton";
import DataTable from "@/components/organisms/DataTable/DataTable";

import { Column } from "../Column";
import { useGetAllUsers } from "../../hooks/useGetAllUsers";
import { useAdminStat } from "@/lib/hooks/useAdminStat";

const AdminUserContent = () => {
  const { isFetching, adminStats, handleDateRangeChange } = useAdminStat();
  const {
    loading,
    allAgents,
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
    getAgents,
    setLimit,
  } = useGetAllUsers();

  const handleSubmitSearch = useCallback((e: FormEvent) => {
    e.preventDefault();
    getAgents();
  }, []);

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
          totalUsers={adminStats.totalUsers || 0}
          totalActiveUsers={adminStats?.totalActiveUsers}
          totalBlockedUsers={adminStats?.totalBlockedUsers}
        />

        <div className="w-full max-w-full pt-8">
          {loading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              columns={Column}
              data={allAgents}
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
              handleSubmitSearch={handleSubmitSearch}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default AdminUserContent;
