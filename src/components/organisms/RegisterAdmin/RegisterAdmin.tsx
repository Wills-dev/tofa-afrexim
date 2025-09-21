"use client";

import Container from "@/components/atoms/Container/Container";
import AdminForm from "../AdminForm/AdminForm";
import SuccessState from "@/components/molecules/SuccessState/SuccessState";

import { useCreateAdmin } from "@/services/auth/hooks/useCreateAdmin";

const RegisterAdmin = () => {
  const {
    updateField,
    formData,
    errors,
    loading,
    alert,
    handleSubmit,
    setAlert,
    onSuccess,
    handleReset,
  } = useCreateAdmin();

  return (
    <Container>
      {onSuccess ? (
        <div className="flex items-center justify-center h-[70vh]">
          <SuccessState
            handleReset={handleReset}
            title="Registration Successful"
            description={`An email has been sent to your ${formData.email}. Please check your inbox and click the link provided to set your password.`}
            buttonLabel="Register new admin"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <AdminForm
            updateField={updateField}
            formData={formData}
            errors={errors}
            loading={loading}
            alert={alert}
            handleSubmit={handleSubmit}
            setAlert={setAlert}
          />
        </div>
      )}
    </Container>
  );
};

export default RegisterAdmin;
