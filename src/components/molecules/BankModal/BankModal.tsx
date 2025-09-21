"use client";

import { Lock } from "lucide-react";

import { BankInfoFormData } from "@/services/auth/types";
import { Dispatch, FormEvent, memo, SetStateAction } from "react";

import Modal from "../Modal/Modal";
import InputForm from "../InputForm/InputForm";
import Button from "@/components/atoms/Button/Button";
import Alert from "@/components/atoms/Alert/Alert";

interface BankModalProps {
  onSubmit: (e: FormEvent) => void;
  bankInfo: BankInfoFormData;
  handleChange: (field: keyof BankInfoFormData, value: string) => void;
  isOpen: boolean;
  toggleModal: () => void;
  isLoading: boolean;
  errs: Partial<BankInfoFormData>;
  alert: { type: "success" | "error"; message: string } | null;
  setAlert: Dispatch<
    SetStateAction<{ type: "success" | "error"; message: string } | null>
  >;
}

const BankModal = ({
  bankInfo,
  handleChange,
  toggleModal,
  isOpen,
  onSubmit,
  isLoading,
  errs,
  alert,
  setAlert,
}: BankModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={toggleModal}>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <form onSubmit={onSubmit}>
        <h3 className="text-lg font-semibold text-gray-900">
          Upload bank details
        </h3>
        <div className="space-y-4 mt-6">
          <InputForm
            label="Account Name"
            type="text"
            placeholder="Enter your account name"
            value={bankInfo.accountName}
            onChange={(value) => handleChange("accountName", value)}
            error={errs.accountName}
            required
            disabled={isLoading}
          />
          <InputForm
            label="Account Number"
            type="number"
            placeholder="Enter your account number"
            value={bankInfo.accountNumber}
            onChange={(value) => handleChange("accountNumber", value)}
            error={errs.accountNumber}
            required
            disabled={isLoading}
          />
          <InputForm
            label="Bank Name"
            type="text"
            placeholder="Enter your bank name"
            value={bankInfo.bankName}
            onChange={(value) => handleChange("bankName", value)}
            error={errs.bankName}
            required
            disabled={isLoading}
          />
          <InputForm
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={bankInfo.password}
            onChange={(value) => handleChange("password", value)}
            error={errs.password}
            icon={<Lock className="w-5 h-5" />}
            required
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BankModal;
