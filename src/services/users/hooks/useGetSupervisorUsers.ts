import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";
import { usePaginationState } from "@/lib/hooks/usePaginationState";

export const useGetSupervisorUsers = () => {
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
    searchTerm,
    handleSearch,
    setCurrentPage,
    totalItems,
    setTotalItems,
  } = usePaginationState();
  const [allSupervisorAgents, setAllSupervisorAgents] = useState([]);

  const getAllSupervisorAgents = async () => {
    try {
      let url = `/agent/supervisor/users?page=${currentPage}&limit=${limit}${
        searchTerm ? `&search=${searchTerm}` : ""
      }`;
      const { data } = await axiosInstance.get(url, {
        withCredentials: true,
      });
      const { data: agents, pagination } = data;
      setAllSupervisorAgents(agents);
      setTotalPages(pagination?.totalPages || 1);
      setLimit(pagination?.itemsPerPage || 10);
      setCurrentPage(pagination?.currentPage || 1);
      setTotalItems(pagination?.totalItems || 0);
    } catch (error) {
      console.log("error getting all agents", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSupervisorAgents();
  }, [currentPage, limit]);

  return {
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
    totalItems,
    setLimit,
  };
};
