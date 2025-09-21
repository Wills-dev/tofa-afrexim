import { FormEventHandler } from "react";
import { useRouter } from "next/navigation";

import { useAuthState } from "./useAuthState";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { axiosInstance } from "@/lib/axiosInstance";
import { createAuthCookie } from "@/lib/helpers/cookieHelper";
import { ROUTES } from "@/lib/constants/routes";

export const useSignup = () => {
  const router = useRouter();
  const {
    validateSignUpForm,
    errs,
    loading,
    setLoading,
    alert,
    setAlert,
    formData,
    setFormData,
    handleChange,
  } = useAuthState();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!validateSignUpForm()) return;
    setLoading(true);
    setAlert(null);

    try {
      await axiosInstance.post("/auth/register", formData);
      setAlert({ type: "success", message: "Registration successful!" });
      createAuthCookie("agentEmail", formData?.email);
      router.push(ROUTES?.verify);
      setFormData({
        email: "",
        password: "",
        phoneNumber: "",
        country: "",
        firstName: "",
        lastName: "",
      });
    } catch (error) {
      const errMsg = promiseErrorFunction(error);
      setAlert({ type: "error", message: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    formData,
    errs,
    loading,
    alert,
    handleSubmit,
    setAlert,
  };
};
