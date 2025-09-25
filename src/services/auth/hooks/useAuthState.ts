import { useState } from "react";
import { LoginFormData, SignupFormData } from "../types";

export const useAuthState = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    supervisorId: "",
    password: "",
  });
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [otp, setOpt] = useState("");
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [errs, setErrs] = useState<Partial<SignupFormData>>({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const updateField = (field: keyof LoginFormData, value: string) => {
    setLoginFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleChange = (field: keyof SignupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errs[field]) {
      setErrs((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!loginFormData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!loginFormData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUpForm = (): boolean => {
    const newErrors: Partial<SignupFormData> = {};

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

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrs(newErrors);
    return Object.keys(newErrors).length === 0;
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
    setFormData,
    loginFormData,
    setLoginFormData,
    validateForm,
    updateField,
    handleChange,
    errs,
    otp,
    setOpt,
  };
};
