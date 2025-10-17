"use client";

import Link from "next/link";

import Alert from "@/components/atoms/Alert/Alert";
import Button from "@/components/atoms/Button/Button";
import FormCard from "@/components/molecules/FormCard/FormCard";
import InputForm from "@/components/molecules/InputForm/InputForm";
import { ROUTES } from "@/lib/constants/routes";

import { useForgotPassword } from "@/services/auth/hooks/useForgotPassword";
import { Mail } from "lucide-react";

const ForgotPasswordForm = () => {
  const { handleSubmit, email, setEmail, loading, alert, setAlert, error } =
    useForgotPassword();

  return (
    <FormCard
      title="Forgot Password"
      subtitle="Please enter your email to reset your password"
      showBackButton
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
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(value) => setEmail(value)}
          error={error}
          icon={<Mail className="w-5 h-5" />}
          required
          disabled={loading}
        />
        <div className="flex items-center justify-end text-sm">
          Remember password?
          <Link
            href={ROUTES?.login}
            className="text-green-600 hover:text-green-700 pl-1"
          >
            Login
          </Link>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={loading}
          disabled={loading || !email}
        >
          Submit
        </Button>
      </form>
    </FormCard>
  );
};

export default ForgotPasswordForm;
