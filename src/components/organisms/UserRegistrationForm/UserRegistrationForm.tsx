"use client";

import Link from "next/link";

import Alert from "@/components/atoms/Alert/Alert";
import Button from "@/components/atoms/Button/Button";
import FormCard from "@/components/molecules/FormCard/FormCard";
import InputForm from "@/components/molecules/InputForm/InputForm";
import SelectForm from "@/components/molecules/SelectForm/SelectForm";

import { ROUTES } from "@/lib/constants/routes";
import { AFRICAN_COUNTRIES } from "@/services/auth/constants";
import { useSignup } from "@/services/auth/hooks/useSignup";
import { Lock, Mail, Phone } from "lucide-react";
import { useGetAllSupervisorNames } from "@/services/users/hooks/useGetAllSupervisorNames";
import SupervisorSelectForm from "@/components/molecules/SpervisorSelectForm/SpervisorSelectForm";

const UserRegistrationForm = () => {
  const { allSupervisors, isFetching } = useGetAllSupervisorNames();

  const {
    handleChange,
    formData,
    errs,
    loading,
    alert,
    handleSubmit,
    setAlert,
  } = useSignup();

  return (
    <FormCard title="Create Account" showBackButton>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputForm
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(value) => handleChange("firstName", value)}
          error={errs.firstName}
          required
          disabled={loading}
        />
        <InputForm
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={(value) => handleChange("lastName", value)}
          error={errs.lastName}
          required
          disabled={loading}
        />
        <InputForm
          label="Phone Number"
          type="number"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onChange={(value) => handleChange("phoneNumber", value)}
          error={errs.phoneNumber}
          icon={<Phone className="w-5 h-5" />}
          required
          disabled={loading}
        />
        <InputForm
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          error={errs.email}
          icon={<Mail className="w-5 h-5" />}
          required
          disabled={loading}
        />
        <SupervisorSelectForm
          label="Supervisor"
          value={formData.supervisorId}
          onChange={(value) => handleChange("supervisorId", value)}
          options={allSupervisors}
          disabled={loading || isFetching}
          loading={isFetching}
        />
        <SelectForm
          label="Country"
          value={formData.country}
          onChange={(value) => handleChange("country", value)}
          options={AFRICAN_COUNTRIES}
          error={errs.country}
          placeholder="Select your country"
          required
          disabled={loading}
        />
        <InputForm
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(value) => handleChange("password", value)}
          error={errs.password}
          icon={<Lock className="w-5 h-5" />}
          required
          disabled={loading}
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={loading}
          disabled={loading}
        >
          Sign Up
        </Button>
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Have an account?{" "}
            <Link
              href={ROUTES.login}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </FormCard>
  );
};

export default UserRegistrationForm;
