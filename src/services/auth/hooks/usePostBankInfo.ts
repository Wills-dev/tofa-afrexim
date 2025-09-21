import { FormEvent } from "react";

import { axiosInstance } from "@/lib/axiosInstance";
import { useBankInfoState } from "./useBankInfoState";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const usePostBankInfo = () => {
  const {
    alert,
    setAlert,
    bankInfo,
    setBankInfo,
    handleChange,
    errs,
    isLoading,
    setIsLoading,
    isOpen,
    setIsOpen,
    validateForm,
    toggleModal,
  } = useBankInfoState();

  const handleSubmit = async (e: FormEvent, onSuccess: () => void) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setAlert(null);
    try {
      await axiosInstance.put(`/agent/profile`, bankInfo, {
        withCredentials: true,
      });
      setIsOpen(false);
      setBankInfo({
        bankName: "",
        accountName: "",
        accountNumber: "",
        password: "",
      });
      setAlert({
        type: "success",
        message: "Bank details uploaded successfully!",
      });
      onSuccess();
    } catch (error) {
      console.log("error posting bank", error);
      const errMsg = promiseErrorFunction(error);
      setAlert({ type: "error", message: errMsg });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    alert,
    setAlert,
    bankInfo,
    handleChange,
    toggleModal,
    errs,
    isLoading,
    isOpen,
    handleSubmit,
  };
};
