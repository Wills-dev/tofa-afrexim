import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";
import { usePaginationState } from "@/lib/hooks/usePaginationState";

export const useGetAllUsers = () => {
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
  const [allAgents, setAllAgents] = useState([]);

  const getAgents = async () => {
    try {
      let url = `/agent/all?page=${currentPage}&limit=${limit}${
        searchTerm ? `&search=${searchTerm}` : ""
      }`;
      const { data } = await axiosInstance.get(url, {
        withCredentials: true,
      });
      const { data: agents, pagination } = data;
      setAllAgents(agents);
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
    getAgents();
  }, [currentPage, limit]);

  return {
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
    totalItems,
    setLimit,
  };
};
