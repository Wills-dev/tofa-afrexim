import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";
import { usePaginationState } from "@/lib/hooks/usePaginationState";

export const useGetSupervisorAgents = (agentId: string) => {
  const {
    loading,
    setLoading,
    currentPage,
    totalPages,
    setTotalPages,
    limit,
    setLimit,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    isFirstPage,
    isLastPage,
    setCurrentPage,
    setTotalItems,
  } = usePaginationState();

  const [agents, setAgents] = useState([]);

  const getSupervisorAgents = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/agent/supervisor/${agentId}?page=${currentPage}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      const { data: supervisorAgents, pagination } = data;
      setAgents(supervisorAgents);
      setTotalPages(pagination?.totalPages || 1);
      setLimit(pagination?.itemsPerPage || 10);
      setCurrentPage(pagination?.currentPage || 1);
      setTotalItems(pagination?.totalItems || 0);
    } catch (error) {
      console.log("error gettinng supervisor agents", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSupervisorAgents();
  }, [agentId, currentPage, limit]);

  return {
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
  };
};
