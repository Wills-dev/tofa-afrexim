"use client";

import Link from "next/link";

import Alert from "@/components/atoms/Alert/Alert";
import Button from "@/components/atoms/Button/Button";
import FormCard from "@/components/molecules/FormCard/FormCard";
import InputForm from "@/components/molecules/InputForm/InputForm";

import { ROUTES } from "@/lib/constants/routes";
import { useLogin } from "@/services/auth/hooks/useLogin";
import { Lock, Mail } from "lucide-react";

const LoginForm = () => {
  const {
    updateField,
    formData,
    errors,
    loading,
    alert,
    handleSubmit,
    setAlert,
  } = useLogin();

  return (
    <FormCard
      title="Welcome Back"
      subtitle="Sign in to your TOFA account"
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
          value={formData.email}
          onChange={(value) => updateField("email", value)}
          error={errors.email}
          icon={<Mail className="w-5 h-5" />}
          required
          disabled={loading}
        />

        <InputForm
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(value) => updateField("password", value)}
          error={errors.password}
          icon={<Lock className="w-5 h-5" />}
          required
          disabled={loading}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="ml-2 text-gray-600">Remember me</span>
          </label>
          <Link
            href={ROUTES?.forgot_password}
            className="text-green-600 hover:text-green-700"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={loading}
          disabled={loading}
        >
          Sign In
        </Button>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              href={ROUTES.signup}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </FormCard>
  );
};

export default LoginForm;
