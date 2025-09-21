import { useEffect, useState } from "react";

import { DateRange } from "../types";
import { axiosInstance } from "../axiosInstance";
import { formatDateForCallback } from "../helpers/dateFormats";

export const useUserStat = (userId: string) => {
  const [isFetching, setIsFetching] = useState(true);
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    totalActiveUsers: 0,
    totalBlockedUsers: 0,
    totalCompanies: 0,
    totalPendingCompanies: 0,
    totalProcessingCompanies: 0,
    totalAcceptedCompanies: 0,
    totalDeclinedCompanies: 0,
  });

  const [currentRange, setCurrentRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const handleDateRangeChange = (range: DateRange) => {
    setCurrentRange(range);
    if (range.startDate && range.endDate) {
      getUserStats(range);
    }
  };

  const getUserStats = async (dateRange?: DateRange) => {
    setIsFetching(true);
    try {
      const rangeToUse = dateRange || currentRange;

      let url = `/agent/stats/${userId}`;
      const params = [];

      if (rangeToUse.startDate) {
        params.push(`startDate=${formatDateForCallback(rangeToUse.startDate)}`);
      }

      if (rangeToUse.endDate) {
        params.push(`endDate=${formatDateForCallback(rangeToUse.endDate)}`);
      }

      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const { data } = await axiosInstance.get(url, {
        withCredentials: true,
      });
      setUserStats(data?.data);
    } catch (error) {
      console.log("error fetching User stat", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getUserStats();
  }, []);

  return {
    isFetching,
    userStats,
    currentRange,
    handleDateRangeChange,
    getUserStats,
  };
};
