import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";
import { usePaginationState } from "@/lib/hooks/usePaginationState";
import { DateRange } from "@/lib/types";
import { formatDateForCallback } from "@/lib/helpers/dateFormats";

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
  const [currentRange, setCurrentRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const handleDateRangeChange = (range: DateRange) => {
    setCurrentRange(range);
    if (range.startDate && range.endDate) {
      getAgents(range);
    }
  };

  const getAgents = async (dateRange?: DateRange) => {
    setLoading(true);
    try {
      const rangeToUse = dateRange || currentRange;

      let url = `/agent/all?page=${currentPage}&limit=${limit}${
        searchTerm ? `&search=${searchTerm}` : ""
      }${
        rangeToUse.startDate
          ? `&startDate=${formatDateForCallback(rangeToUse.startDate)}`
          : ""
      }${
        rangeToUse.endDate
          ? `&endDate=${formatDateForCallback(rangeToUse.endDate)}`
          : ""
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
    handleDateRangeChange,
    currentRange,
  };
};
