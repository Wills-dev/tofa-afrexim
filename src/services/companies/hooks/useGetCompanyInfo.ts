import { useEffect, useState } from "react";
import { CompanyType } from "../types";
import { axiosInstance } from "@/lib/axiosInstance";

export const useGetCompanyInfo = (companyId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState<CompanyType | null>(null);

  const getCompanyInfo = async () => {
    try {
      const { data } = await axiosInstance.get(`/company/${companyId}`, {
        withCredentials: true,
      });
      setCompanyInfo(data?.data);
    } catch (error) {
      console.log("error fetching company info", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, [companyId]);

  return {
    companyInfo,
    isLoading,
    getCompanyInfo,
  };
};
