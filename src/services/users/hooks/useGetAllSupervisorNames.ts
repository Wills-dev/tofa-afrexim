import { useEffect, useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";

export const useGetAllSupervisorNames = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [allSupervisors, setAllSupervisor] = useState([]);

  const getAllSupervisor = async () => {
    try {
      const { data } = await axiosInstance.get(`/agent/supervisors/all`);
      setAllSupervisor(data?.data);
    } catch (error) {
      console.log("error fetching all supervisor", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getAllSupervisor();
  }, []);

  return {
    allSupervisors,
    isFetching,
  };
};
