import { useRouter } from "next/navigation";

import { FormEventHandler } from "react";

import { useAuthState } from "./useAuthState";
import { axiosInstance } from "@/lib/axiosInstance";
import { clearCookie } from "@/lib/helpers/cookieHelper";
import { ROUTES } from "@/lib/constants/routes";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useVerifyEmail = (email: string) => {
  const router = useRouter();
  const { otp, setOpt, loading, setLoading, alert, setAlert } = useAuthState();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!otp) {
      setAlert({ type: "error", message: "OTP is required" });
      return;
    }
    setLoading(true);
    setAlert(null);

    try {
      const payload = { email, otp };
      await axiosInstance.post("/auth/verify-otp", payload);
      setAlert({ type: "success", message: "Email Verification successful!" });
      clearCookie("agentEmail");
      router.push(ROUTES?.login);
      setOpt("");
    } catch (error) {
      console.log("error verifying email", error);
      const errMsg = promiseErrorFunction(error);
      setAlert({ type: "error", message: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, otp, setOpt, loading, alert, setAlert };
};
