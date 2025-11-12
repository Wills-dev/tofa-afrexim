import { useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { StatusType } from "@/lib/types";

export const useUpdateCompanyStatus = (companyId: string) => {
  const [updating, setUpdating] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const updateStatus = async (status: StatusType, onSuccess: () => void) => {
    setUpdating(true);
    const payload =
      status === "Declined" ? { status, declineReason } : { status };
    try {
      await axiosInstance.put(`/company/${companyId}/status`, payload, {
        withCredentials: true,
      });
      setAlert({ type: "success", message: "Status Updated!" });
      onSuccess();
    } catch (error) {
      console.log("error updating status", error);
      const errMsg = promiseErrorFunction(error);
      setAlert({ type: "error", message: errMsg });
    } finally {
      setUpdating(false);
    }
  };

  return {
    updateStatus,
    alert,
    updating,
    setAlert,
    declineReason,
    setDeclineReason,
  };
};
