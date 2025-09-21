import { FormEventHandler, useContext } from "react";

import { axiosInstance } from "@/lib/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useAuthState } from "./useAuthState";
import { AuthContext } from "@/contexts/AuthState";
import { useRouter } from "next/navigation";
import {
  createAuthCookie,
  getCookie,
  readAuthCookie,
} from "@/lib/helpers/cookieHelper";
import { ROUTES } from "@/lib/constants/routes";

export const useLogin = () => {
  const router = useRouter();

  const { setCurrentUser } = useContext(AuthContext);
  const {
    errors,
    loading,
    setLoading,
    alert,
    setAlert,
    loginFormData: formData,
    setLoginFormData: setFormData,
    validateForm,
    updateField,
  } = useAuthState();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setAlert(null);

    try {
      const { data } = await axiosInstance.post("/auth/login", formData, {
        withCredentials: true,
      });
      setCurrentUser(data?.agent);
      createAuthCookie("sessionToken", data?.token);
      if (data?.agent?.role === "admin" || data?.agent?.role === "superadmin") {
        router.push(ROUTES?.dashboard_admin);
      } else {
        router.push(ROUTES?.dashboard);
      }
      setAlert({ type: "success", message: "Login successful!" });
      setFormData({ email: "", password: "" });
    } catch (error: any) {
      const errMsg = promiseErrorFunction(error);
      setAlert({ type: "error", message: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return {
    updateField,
    formData,
    errors,
    loading,
    alert,
    handleSubmit,
    setAlert,
  };
};
