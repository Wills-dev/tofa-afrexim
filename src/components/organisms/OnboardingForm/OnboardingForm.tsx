"use client";

import Alert from "@/components/atoms/Alert/Alert";
import BackButton from "@/components/atoms/BackButton/BackButton";
import Button from "@/components/atoms/Button/Button";
import SuccessState from "@/components/molecules/SuccessState/SuccessState";
import AboutCompany from "./AboutCompany";
import BusinessProfile from "./BusinessProfile";
import ClientFinancialProfile from "./ClientFinancialProfile";
import Document from "./Document";

import { useCompanyOnboarding } from "@/services/companies/hooks/useCompanyOnboarding";

const OnboardingForm = () => {
  const {
    handleSubmit,
    isLoading,
    errors,
    isSubmitted,
    alert,
    setAlert,
    handleReset,
    fileInputRef,
    additionalDocsRef,
    companyData,
    handleInputChange,
    handleCheckboxChange,
    handleFileChange,
  } = useCompanyOnboarding();

  const firstError = Object.values(errors).find((error) => error);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8 justify-center items-center flex">
        <SuccessState handleReset={handleReset} />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-green-600 to-orange-500 px-4 sm:px-8 py-6 flex justify-between max-sm:flex-col-reverse">
            <div className="">
              <h1 className="text-3xl font-bold text-gray-50">
                Africa Trade Gateway
              </h1>
              <p className="text-gray-200 mt-2">
                Client Onboarding Form - 2025
              </p>
            </div>
            <BackButton />
          </div>

          <form onSubmit={handleSubmit} className="p-8 max-sm:px-4 space-y-8">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            <AboutCompany
              companyData={companyData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
            <BusinessProfile
              companyData={companyData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
            <ClientFinancialProfile
              companyData={companyData}
              handleInputChange={handleInputChange}
              errors={errors}
              handleCheckboxChange={handleCheckboxChange}
            />
            <Document
              handleFileChange={handleFileChange}
              fileInputRef={fileInputRef}
              additionalDocsRef={additionalDocsRef}
              errors={errors}
            />
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                className="flex-1 flex items-center justify-center"
              >
                Submit Application
              </Button>
              <Button variant="ghost" type="button" onClick={handleReset}>
                Reset Form
              </Button>
            </div>

            {firstError ? (
              <p className="text-sm text-red-500 text-center">* {firstError}</p>
            ) : (
              <p className="text-sm text-gray-500 text-center">
                * Required fields
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
