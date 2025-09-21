"use client";

import { FormEvent } from "react";

import { Column } from "./Column";
import { useGetAllCompanies } from "@/services/companies/hooks/useGetAllCompanies";

import DataTable from "../DataTable/DataTable";
import Container from "@/components/atoms/Container/Container";
import AdminDashboardCardWrapper from "@/components/molecules/AdminDashboardCardWrapper/AdminDashboardCardWrapper";
import DashboardHeader from "@/components/molecules/DashboardHeader/DashboardHeader";
import TableSkeleton from "@/components/molecules/skeletonLoaders/TableSkeleton";
import { statusOptions } from "@/lib/constants";
import { useAdminStat } from "@/lib/hooks/useAdminStat";

const CompaniesWrapper = () => {
  const { isFetching, adminStats, handleDateRangeChange } = useAdminStat();
  const {
    loading,
    allCompanies,
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
    getCompaines,
    status,
    setStatus,
    setLimit,
  } = useGetAllCompanies();

  const handleSubmitSearch = (e: FormEvent) => {
    e.preventDefault();
    getCompaines();
  };

  return (
    <Container>
      <div className="space-y-6 max-w-full w-full">
        <DashboardHeader
          title="Companies"
          description="Monitor all registered companies on the platform"
          isAdmin
        />
        <AdminDashboardCardWrapper
          totalCompanies={adminStats?.totalCompanies || 0}
          totalPendingCompanies={adminStats?.totalPendingCompanies || 0}
          totalProcessingCompanies={adminStats?.totalProcessingCompanies || 0}
          totalAcceptedCompanies={adminStats?.totalAcceptedCompanies || 0}
          totalDeclinedCompanies={adminStats?.totalDeclinedCompanies || 0}
          handleDateRangeChange={handleDateRangeChange}
          loading={isFetching}
        />

        <div className="w-full max-w-full pt-8">
          {loading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              columns={Column}
              data={allCompanies}
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

export default CompaniesWrapper;
