"use client";

import { useSearchParams } from "next/navigation";

import { Lock } from "lucide-react";

import { useSetPassword } from "@/services/auth/hooks/useSetPassword";

import FormCard from "../molecules/FormCard/FormCard";
import Alert from "../atoms/Alert/Alert";
import InputForm from "../molecules/InputForm/InputForm";
import Button from "../atoms/Button/Button";

const SetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const {
    alert,
    setAlert,
    handleSubmit,
    error,
    loading,
    setPassword,
    password,
  } = useSetPassword(token);

  return (
    <FormCard
      title="Set Password"
      subtitle="Set your password to access dashboard"
    >
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputForm
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(value) => setPassword(value)}
          error={error}
          icon={<Lock className="w-5 h-5" />}
          required
          disabled={loading}
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={loading}
          disabled={loading || !password}
        >
          Submit
        </Button>
      </form>
    </FormCard>
  );
};

export default SetPasswordForm;
