import { Dispatch, FormEvent, SetStateAction } from "react";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  password: string;
  supervisorId: string;
}
export interface SupervisorSelectOption {
  id: string;
  firstName: string;
  lastName: string;
}

export interface VerificationFormData {
  code: string;
}

export interface adminFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  role: string;
}

export interface BankInfoFormData {
  bankName: string;
  accountName: string;
  accountNumber: string;
  password: string;
}

export interface AdminFormProps {
  alert: { type: "success" | "error"; message: string } | null;
  setAlert: Dispatch<
    SetStateAction<{ type: "success" | "error"; message: string } | null>
  >;
  handleSubmit: (e: FormEvent) => void;
  formData: adminFormData;
  loading: boolean;
  updateField: (field: keyof adminFormData, value: string) => void;
  errors: Partial<adminFormData>;
}
