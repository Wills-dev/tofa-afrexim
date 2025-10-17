"use client";

import Alert from "@/components/atoms/Alert/Alert";
import Button from "@/components/atoms/Button/Button";
import FormCard from "@/components/molecules/FormCard/FormCard";
import InputForm from "@/components/molecules/InputForm/InputForm";

import { useRestPassword } from "@/services/auth/hooks/useRestPassword";
import { Lock } from "lucide-react";

const ResetPasswordForm = () => {
  const {
    handleSubmit,
    password,
    setPassword,
    laoding,
    alert,
    setAlert,
    error,
  } = useRestPassword();

  return (
    <FormCard title="Reset Password" subtitle="Enter your new password">
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
          disabled={laoding}
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={laoding}
          disabled={laoding || !password}
        >
          Reset Password
        </Button>
      </form>
    </FormCard>
  );
};

export default ResetPasswordForm;
