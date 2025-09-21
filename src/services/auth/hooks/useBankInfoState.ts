import { useState } from "react";
import { BankInfoFormData } from "../types";

export const useBankInfoState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errs, setErrs] = useState<Partial<BankInfoFormData>>({});
  const [bankInfo, setBankInfo] = useState<BankInfoFormData>({
    bankName: "",
    accountName: "",
    accountNumber: "",
    password: "",
  });
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (field: keyof BankInfoFormData, value: string) => {
    setBankInfo((prev) => ({ ...prev, [field]: value }));
    if (errs[field]) {
      setErrs((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BankInfoFormData> = {};

    if (!bankInfo.accountName) {
      newErrors.accountName = "Account Name is required";
    }

    if (!bankInfo.accountNumber) {
      newErrors.accountNumber = "Account Number is required";
    }
    if (!bankInfo.bankName) {
      newErrors.bankName = "Bank Name is required";
    }
    if (!bankInfo.password) {
      newErrors.password = "Password is required";
    }
    setErrs(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    alert,
    setAlert,
    bankInfo,
    setBankInfo,
    handleChange,
    errs,
    setErrs,
    isLoading,
    setIsLoading,
    isOpen,
    setIsOpen,
    validateForm,
    toggleModal,
  };
};
