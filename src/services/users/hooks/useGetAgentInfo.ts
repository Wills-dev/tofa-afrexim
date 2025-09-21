import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";
import { usePaginationState } from "@/lib/hooks/usePaginationState";
import { UserData } from "../types";

export const useGetAgentInfo = (agentId: string) => {
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
    totalItems,
    setTotalItems,
  } = usePaginationState();

  const [agentInfo, setAgentInfo] = useState<UserData | null>(null);

  const getAgentInfo = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/agent/${agentId}?page=${currentPage}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      const { data: agentDetails, pagination } = data;
      setAgentInfo(agentDetails);
      setTotalPages(pagination?.totalPages || 1);
      setLimit(pagination?.itemsPerPage || 10);
      setCurrentPage(pagination?.currentPage || 1);
      setTotalItems(pagination?.totalItems || 0);
    } catch (error) {
      console.log("error gettinng agent info", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAgentInfo();
  }, [agentId, currentPage, limit]);

  return {
    agentInfo,
    loading,
    getAgentInfo,
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
    totalItems,
  };
};
