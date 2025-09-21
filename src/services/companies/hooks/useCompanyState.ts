import { useCallback, useRef, useState } from "react";
import { CompanyOnboardingFormData, FormErrors } from "../types";

export const useCompanyState = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalDocsRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [formData, setFormData] = useState<CompanyOnboardingFormData>({
    companyName: "",
    companyDescription: "",
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminCountryCode: "",
    adminPhoneNumber: "",
    tradeRole: "",
    businessSector: "",
    productsServices: "",
    streetAddress: "",
    city: "",
    country: "",
    postalCode: "",
    isOfficiallyRegistered: "",
    hasValidLicense: "",
    engagesInCrossBorderTrade: "",
    hasImportExportLicense: "",
    listTradePartners: "",
    localBankPartners: "",
    annualTurnoverUSD: "",
    preferredPaymentOptions: [],
    transactsInAfricanCurrencies: "",
    specifyAfricanCurrencies: "",
    registrationDocument: null,
    otherDocuments: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (paymentOption: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preferredPaymentOptions: checked
        ? [...prev.preferredPaymentOptions, paymentOption]
        : prev.preferredPaymentOptions.filter((m) => m !== paymentOption),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      if (name === "registrationDocument") {
        setFormData((prev) => ({
          ...prev,
          registrationDocument: files[0] || null,
        }));
      } else if (name === "otherDocuments") {
        setFormData((prev) => ({
          ...prev,
          otherDocuments: Array.from(files),
        }));
      }
    }
  };

  const resetForm = useCallback(() => {
    setIsSubmitted(false);
    setErrors({});
    setIsLoading(false);
  }, []);

  const handleReset = () => {
    setFormData({
      companyName: "",
      companyDescription: "",
      adminFirstName: "",
      adminLastName: "",
      adminEmail: "",
      adminCountryCode: "",
      adminPhoneNumber: "",
      tradeRole: "",
      businessSector: "",
      productsServices: "",
      streetAddress: "",
      city: "",
      country: "",
      postalCode: "",
      isOfficiallyRegistered: "",
      hasValidLicense: "",
      engagesInCrossBorderTrade: "",
      hasImportExportLicense: "",
      listTradePartners: "",
      localBankPartners: "",
      annualTurnoverUSD: "",
      preferredPaymentOptions: [],
      transactsInAfricanCurrencies: "",
      specifyAfricanCurrencies: "",
      registrationDocument: null,
      otherDocuments: [],
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
    if (additionalDocsRef.current) additionalDocsRef.current.value = "";

    resetForm();
  };

  return {
    fileInputRef,
    additionalDocsRef,
    formData,
    setFormData,
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
  };
};
