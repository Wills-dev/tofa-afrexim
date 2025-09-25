import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";
import { usePaginationState } from "@/lib/hooks/usePaginationState";

export const useGetAllSupervisors = () => {
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
    setSearchTerm,
    handleSearch,
    setCurrentPage,
    totalItems,
    setTotalItems,
  } = usePaginationState();
  const [allSupervisors, setAllSupervisors] = useState([]);

  const getSupervisors = async () => {
    try {
      let url = `/agent/supervisors/details?page=${currentPage}&limit=${limit}${
        searchTerm ? `&search=${searchTerm}` : ""
      }`;
      const { data } = await axiosInstance.get(url, {
        withCredentials: true,
      });

      const { data: supervisors, pagination } = data;
      setAllSupervisors(supervisors);
      setTotalPages(pagination?.totalPages || 1);
      setLimit(pagination?.itemsPerPage || 10);
      setCurrentPage(pagination?.currentPage || 1);
      setTotalItems(pagination?.totalItems || 0);
    } catch (error) {
      console.log("error getting all companies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSupervisors();
  }, [currentPage, limit]);

  return {
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
    setSearchTerm,
    handleSearch,
    getSupervisors,
    totalItems,
    setLimit,
  };
};
