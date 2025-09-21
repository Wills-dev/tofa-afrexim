import { useState } from "react";
import { adminFormData } from "../types";

export const useAdminState = () => {
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [errors, setErrors] = useState<Partial<adminFormData>>({});
  const [onSuccess, setOnSuccess] = useState(false);
  const [formData, setFormData] = useState<adminFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    role: "admin",
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof adminFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateSignUpForm = (): boolean => {
    const newErrors: Partial<adminFormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setOnSuccess(false);
    setFormData({
      email: "",
      phoneNumber: "",
      country: "",
      firstName: "",
      lastName: "",
      role: "admin",
    });
  };

  return {
    validateSignUpForm,
    errors,
    setErrors,
    loading,
    setLoading,
    alert,
    setAlert,
    formData,
    updateField,
    onSuccess,
    setOnSuccess,
    handleReset,
  };
};
