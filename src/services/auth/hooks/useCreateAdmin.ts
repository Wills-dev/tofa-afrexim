import { FormEvent } from "react";
import { useAdminState } from "./useAdminState";
import { axiosInstance } from "@/lib/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useCreateAdmin = () => {
  const {
    validateSignUpForm,
    errors,
    loading,
    setLoading,
    alert,
    setAlert,
    formData,
    handleReset,
    updateField,
    onSuccess,
    setOnSuccess,
  } = useAdminState();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateSignUpForm()) return;
    setLoading(true);
    setAlert(null);

    try {
      await axiosInstance.post("/agent/create", formData, {
        withCredentials: true,
      });
      setOnSuccess(true);
    } catch (error) {
      const errMsg = promiseErrorFunction(error);
      setAlert({ type: "error", message: errMsg });
      console.log("error creating admin", error);
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
    onSuccess,
    handleReset,
  };
};
