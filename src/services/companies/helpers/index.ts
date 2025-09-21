import { CompanyOnboardingFormData, FormErrors } from "../types";

export const validateForm = (data: CompanyOnboardingFormData): FormErrors => {
  const newErrors: FormErrors = {};

  // Required field validation
  if (!data.companyName.trim())
    newErrors.companyName = "Company name is required";
  if (!data.companyDescription.trim())
    newErrors.companyDescription = "company description is required";
  if (!data.adminFirstName)
    newErrors.adminFirstName = "Admin first name is required";
  if (!data.adminLastName)
    newErrors.adminLastName = "Admin last name is required";
  if (!data.adminEmail) newErrors.adminEmail = "Admin email is required";
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.adminEmail && !emailRegex.test(data.adminEmail)) {
    newErrors.adminEmail = "Please enter a valid email address";
  }
  if (!data.adminCountryCode) newErrors.adminCountryCode = "Required";
  if (!data.adminPhoneNumber)
    newErrors.adminPhoneNumber = "Admin phone number is required";
  // Phone validation
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  if (data.adminPhoneNumber && !phoneRegex.test(data.adminPhoneNumber)) {
    newErrors.adminPhoneNumber = "Please enter a valid phone number";
  }
  if (!data.tradeRole.trim())
    newErrors.tradeRole = "Your role in trade ecosystem is required";
  if (!data.businessSector.trim())
    newErrors.businessSector = "Business sector is required";
  if (!data.productsServices.trim())
    newErrors.productsServices = "Products or services is/are required";
  if (!data.streetAddress.trim())
    newErrors.streetAddress = "Business address is required";
  if (!data.city.trim()) newErrors.city = "City is required";
  if (!data.country) newErrors.country = "Country is required";
  if (!data.postalCode) newErrors.postalCode = "Postal code is required";
  if (!data.isOfficiallyRegistered.trim())
    newErrors.isOfficiallyRegistered = "Please provide to this";
  if (!data.hasValidLicense.trim())
    newErrors.hasValidLicense = "Please provide to this";
  if (!data.engagesInCrossBorderTrade.trim())
    newErrors.engagesInCrossBorderTrade = "Please provide to this";
  if (!data.hasImportExportLicense.trim())
    newErrors.hasImportExportLicense = "Please provide to this";
  if (!data.listTradePartners.trim())
    newErrors.worksWithInternationalPartners = "List trade partners";
  if (!data.localBankPartners.trim())
    newErrors.localBankPartners = "List local banks you have account with";
  if (!data.annualTurnoverUSD)
    newErrors.annualTurnoverUSD = "Provide Annual Turnover in USD";
  if (data.preferredPaymentOptions.length === 0)
    newErrors.preferredPaymentOptions =
      "At least one payment option is required";
  if (!data.transactsInAfricanCurrencies)
    newErrors.transactsInAfricanCurrencies = "Please provide to this";
  if (!data.specifyAfricanCurrencies)
    newErrors.specifyAfricanCurrencies = "Please provide to this";
  if (!data.registrationDocument)
    newErrors.registrationDocument = "Provide registration document";

  return newErrors;
};
