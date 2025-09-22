import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";
import { formatDateForCallback } from "@/lib/helpers/dateFormats";
import { DateRange } from "@/lib/types";

export const useAdminCompanyChart = () => {
  const [companyChart, setCompanyChart] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [sortBy, setSortBy] = useState("");

  const getComanyChart = async (dateRange?: DateRange) => {
    let url = `/company/all/registered`;
    const params = [];
    if (sortBy) {
      params.push(`sortBy=${sortBy}`);
    }
    if (dateRange?.startDate) {
      params.push(`startDate=${formatDateForCallback(dateRange?.startDate)}`);
    }

    if (dateRange?.endDate) {
      params.push(`endDate=${formatDateForCallback(dateRange?.endDate)}`);
    }

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }
    setIsFetching(true);
    try {
      const { data } = await axiosInstance.get(url, {
        withCredentials: true,
      });
      setCompanyChart(data?.data);
    } catch (error) {
      console.log("error getting admin company chart", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getComanyChart();
  }, [sortBy]);

  return { getComanyChart, isFetching, companyChart, sortBy, setSortBy };
};
