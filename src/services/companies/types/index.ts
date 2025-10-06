export interface ActivityLogType {
  userName: string;
  activity: string;
  timestamp: string;
}

export interface CompanyType {
  id: string;
  agentId: string;
  companyName: string;
  companyDescription: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminCountryCode: string;
  adminPhoneNumber: string;
  tradeRole: string;
  tradeRoleOther: string;
  businessSector: string;
  productsServices: string;
  streetAddress: string;
  streetAddressLine2: string;
  city: string;
  country: string;
  postalCode: string;
  isOfficiallyRegistered: boolean;
  hasValidLicense: boolean;
  engagesInCrossBorderTrade: boolean;
  hasImportExportLicense: boolean;
  worksWithInternationalPartners: boolean;
  localBankPartners: string;
  annualTurnoverUSD: string;
  totalAssetsUSD: string;
  currentLiquidityUSD: string;
  preferredPaymentOptions: string[];
  preferredPaymentOther: string;
  maintainsSufficientLiquidity: boolean;
  hasTradeFinanceFacilities: boolean;
  transactsInAfricanCurrencies: boolean;
  africanCurrenciesOfInterest: string;
  registrationDocumentUrl: string;
  otherDocumentsUrl: string[];
  status: "Pending" | "Processing" | "Accepted" | "Declined";
  createdAt: string;
  updatedAt: string;
  activity: ActivityLogType[];
}

export interface CompanyOnboardingFormData {
  companyName: string;
  companyDescription: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminCountryCode: string;
  adminPhoneNumber: string;
  tradeRole: string;
  businessSector: string;
  productsServices: string;
  streetAddress: string;
  city: string;
  country: string;
  postalCode: string;
  isOfficiallyRegistered: string;
  hasValidLicense: string;
  engagesInCrossBorderTrade: string;
  hasImportExportLicense: string;
  listTradePartners: string;
  localBankPartners: string;
  annualTurnoverUSD: string;
  preferredPaymentOptions: string[];
  transactsInAfricanCurrencies: string;
  specifyAfricanCurrencies: string;
  registrationDocument: File | null;
  otherDocuments: File[];
}

export interface FormErrors {
  [key: string]: string;
}
