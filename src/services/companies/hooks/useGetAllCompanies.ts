import { useEffect, useState } from "react";

import { CompanyType } from "../types";
import { usePaginationState } from "@/lib/hooks/usePaginationState";
import { axiosInstance } from "@/lib/axiosInstance";

export const useGetAllCompanies = () => {
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
    status,
    setStatus,
  } = usePaginationState();

  const [allCompanies, setAllCompanies] = useState<CompanyType[]>([]);

  const getCompaines = async () => {
    try {
      let url = `/company?page=${currentPage}&limit=${limit}${
        status ? `&status=${status}` : ""
      }${searchTerm ? `&search=${searchTerm}` : ""}`;
      const { data } = await axiosInstance.get(url, {
        withCredentials: true,
      });
      const { data: companies, pagination } = data;
      setAllCompanies(companies);
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
    getCompaines();
  }, [currentPage, limit, status]);

  return {
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
    setSearchTerm,
    handleSearch,
    getCompaines,
    status,
    setStatus,
    totalItems,
    setLimit,
  };
};
