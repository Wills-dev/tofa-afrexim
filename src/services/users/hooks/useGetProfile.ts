import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";
import { usePaginationState } from "@/lib/hooks/usePaginationState";
import { UserData } from "@/services/users/types";

export const useGetProfile = () => {
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
  const [profile, setProfile] = useState<UserData | null>(null);

  const getProfileInfo = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/agent/profile?page=${currentPage}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      const { data: profileDetails, pagination } = data;
      setProfile(profileDetails);
      setTotalPages(pagination?.totalPages || 1);
      setLimit(pagination?.itemsPerPage || 10);
      setCurrentPage(pagination?.currentPage || 1);
      setTotalItems(pagination?.totalItems || 0);
    } catch (error) {
      console.log("error gettinng profile info", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, [currentPage, limit]);

  return {
    profile,
    loading,
    getProfileInfo,
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
