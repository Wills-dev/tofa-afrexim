import { CompanyType } from "@/services/companies/types";

export interface BankType {
  id?: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  isVerified?: boolean;
  createdAt?: string;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  isEmailVerified: boolean;
  emailVerificationToken: string | null;
  emailVerificationExpires: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  companies: CompanyType[];
  accountNumber: null | number;
  bankName: null | string;
  accountName: null | string;
}
