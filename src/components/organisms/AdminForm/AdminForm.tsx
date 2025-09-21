import Alert from "@/components/atoms/Alert/Alert";
import Button from "@/components/atoms/Button/Button";
import FormCard from "@/components/molecules/FormCard/FormCard";
import InputForm from "@/components/molecules/InputForm/InputForm";
import SelectForm from "@/components/molecules/SelectForm/SelectForm";

import { AFRICAN_COUNTRIES } from "@/services/auth/constants";
import { AdminFormProps } from "@/services/auth/types";
import { Mail, Phone } from "lucide-react";

const AdminForm = ({
  alert,
  setAlert,
  handleSubmit,
  formData,
  loading,
  updateField,
  errors,
}: AdminFormProps) => {
  return (
    <FormCard title="Register Admin" isAdmin>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputForm
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(value) => updateField("firstName", value)}
          error={errors.firstName}
          required
          disabled={loading}
        />

        <InputForm
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={(value) => updateField("lastName", value)}
          error={errors.lastName}
          required
          disabled={loading}
        />
        <InputForm
          label="Phone Number"
          type="number"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onChange={(value) => updateField("phoneNumber", value)}
          error={errors.phoneNumber}
          icon={<Phone className="w-5 h-5" />}
          required
          disabled={loading}
        />
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
        <SelectForm
          label="Country"
          value={formData.country}
          onChange={(value) => updateField("country", value)}
          options={AFRICAN_COUNTRIES}
          error={errors.country}
          placeholder="Select your country"
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
          Register
        </Button>
      </form>
    </FormCard>
  );
};

export default AdminForm;
