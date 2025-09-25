"use client";

import { FormEvent } from "react";

import Container from "@/components/atoms/Container/Container";
import DashboardHeader from "@/components/molecules/DashboardHeader/DashboardHeader";
import TableSkeleton from "@/components/molecules/skeletonLoaders/TableSkeleton";
import DataTable from "../DataTable/DataTable";

import { useGetAllSupervisorCompanies } from "@/services/companies/hooks/useGetAllSupervisorCompanies";
import { statusOptions } from "@/lib/constants";
import { Column } from "./Column";
import { useSupervisorStat } from "@/lib/hooks/useSupervisorStat";
import AdminDashboardCardWrapper from "@/components/molecules/AdminDashboardCardWrapper/AdminDashboardCardWrapper";

const SupervisorCompanyWrapper = () => {
  const { isFetching, supervisorStats, handleDateRangeChange } =
    useSupervisorStat();
  const {
    loading,
    allSupervisorCompanies,
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
    getAllSupervisorCompanies,
    status,
    setStatus,
    setLimit,
  } = useGetAllSupervisorCompanies();

  const handleSubmitSearch = (e: FormEvent) => {
    e.preventDefault();
    getAllSupervisorCompanies();
  };

  return (
    <Container>
      <div className="space-y-6 max-w-full w-full">
        <DashboardHeader
          title="Companies"
          description="Monitor all agents registered companies on the platform"
          isAdmin
        />
        <AdminDashboardCardWrapper
          totalCompanies={supervisorStats?.totalCompanies || 0}
          totalPendingCompanies={supervisorStats?.totalPendingCompanies || 0}
          totalProcessingCompanies={
            supervisorStats?.totalProcessingCompanies || 0
          }
          totalAcceptedCompanies={supervisorStats?.totalAcceptedCompanies || 0}
          totalDeclinedCompanies={supervisorStats?.totalDeclinedCompanies || 0}
          handleDateRangeChange={handleDateRangeChange}
          loading={isFetching}
        />

        <div className="w-full max-w-full pt-8">
          {loading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              columns={Column}
              data={allSupervisorCompanies}
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
              filter={status}
              setFilter={setStatus}
              filterOptions={statusOptions}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default SupervisorCompanyWrapper;
