import { useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useResendOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleResend = async (email: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/resend-otp", { email });
      setAlert({ type: "success", message: "Otp resent!" });
    } catch (error: any) {
      console.log("error resending otp", error);
      const errMsg = promiseErrorFunction(error);
      setAlert({ type: "error", message: errMsg });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleResend,
    alert,
    setAlert,
  };
};
