"use client";

import { FormEvent } from "react";

import Container from "@/components/atoms/Container/Container";
import DataTable from "../DataTable/DataTable";
import DashboardHeader from "@/components/molecules/DashboardHeader/DashboardHeader";
import TableSkeleton from "@/components/molecules/skeletonLoaders/TableSkeleton";

import { Column } from "./Column";
import { useGetAllSupervisors } from "@/services/users/hooks/useGetAllSupervisors";
import DateRangePicker from "@/components/molecules/DateRangePicker/DateRangePicker";

const SupervisorWrapper = () => {
  const {
    loading,
    allSupervisors,
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
    getSupervisors,
    setLimit,
    handleDateRangeChange,
  } = useGetAllSupervisors();

  const handleSubmitSearch = (e: FormEvent) => {
    e.preventDefault();
    getSupervisors();
  };
  return (
    <Container>
      <div className="space-y-6 max-w-full w-full">
        <DashboardHeader
          title="Supervisors"
          description="Monitor all registered supervisors on the platform"
          isAdmin
        />
        <div className="w-full max-w-full pt-8">
          <div className="flex justify-end">
            <DateRangePicker onDateRangeChange={handleDateRangeChange} />
          </div>
          {loading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              columns={Column}
              data={allSupervisors}
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
      </div>{" "}
    </Container>
  );
};

export default SupervisorWrapper;
