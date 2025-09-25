"use client";

import { Building } from "lucide-react";

import { Column } from "./Column";
import { useGetSupervisorAgents } from "@/services/users/hooks/useGetSupervisorAgents";

import DataTable from "../DataTable/DataTable";
import TableSkeleton from "@/components/molecules/skeletonLoaders/TableSkeleton";

const AdminSupervisorAgents = ({ userId }: { userId: string }) => {
  const {
    agents,
    loading,
    getSupervisorAgents,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    isFirstPage,
    isLastPage,
    limit,
    setLimit,
  } = useGetSupervisorAgents(userId);

  return (
    <div className="py-6">
      <div className="flex sm:items-center justify-between max-sm:flex-col gap-2 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Supervisor's Agents
          </h3>
          <p className="text-sm text-gray-600">
            {agents?.length || 0} agents onboarded
          </p>
        </div>
      </div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          {agents.length === 0 ? (
            <div className="text-center py-12 flex justify-center items-center flex-col">
              <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                No Agents
              </h4>
              <p className="text-gray-600 mb-4">
                This supervisor hasn't onboarded any agents yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <DataTable
                columns={Column}
                data={agents}
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
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminSupervisorAgents;
