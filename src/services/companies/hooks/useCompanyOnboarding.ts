import { validateForm } from "../helpers";
import { axiosInstance } from "@/lib/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useCompanyState } from "./useCompanyState";

export const useCompanyOnboarding = () => {
  const {
    fileInputRef,
    additionalDocsRef,
    formData: companyData,
    handleInputChange,
    handleCheckboxChange,
    handleFileChange,
    handleReset,
    isLoading,
    setIsLoading,
    errors,
    setErrors,
    isSubmitted,
    setIsSubmitted,
    resetForm,
    alert,
    setAlert,
  } = useCompanyState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(companyData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return { success: false, errors: validationErrors };
    }

    setIsLoading(true);
    setErrors({});

    try {
      const formData = new FormData();

      Object.entries(companyData).forEach(([key, value]) => {
        if (key === "preferredPaymentOptions") {
          (value as string[]).forEach((paymentOption, index) => {
            formData.append(`preferredPaymentOptions[${index}]`, paymentOption);
          });
        } else if (key === "registrationDocument" && value) {
          formData.append(key, value as File);
        } else if (key === "otherDocuments") {
          (value as File[]).forEach((file) => {
            formData.append(`otherDocuments`, file);
          });
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      await axiosInstance.post("/company/onboard", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      const errMsg = promiseErrorFunction(error);
      setAlert({ type: "error", message: errMsg });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading,
    errors,
    isSubmitted,
    resetForm,
    validateForm,
    alert,
    setAlert,
    handleReset,
    fileInputRef,
    additionalDocsRef,
    companyData,
    handleInputChange,
    handleCheckboxChange,
    handleFileChange,
  };
};
