"use client";

import Alert from "@/components/atoms/Alert/Alert";
import Button from "@/components/atoms/Button/Button";
import FormCard from "@/components/molecules/FormCard/FormCard";
import InputForm from "@/components/molecules/InputForm/InputForm";

import { readAuthCookie } from "@/lib/helpers/cookieHelper";
import { useResendOtp } from "@/services/auth/hooks/useResendOtp";
import { useVerifyEmail } from "@/services/auth/hooks/useVerifyEmail";

const VerifyForm = () => {
  const email = readAuthCookie("agentEmail") || "";
  const { handleSubmit, otp, setOpt, loading, alert, setAlert } =
    useVerifyEmail(email);
  const {
    isLoading,
    handleResend,
    alert: toast,
    setAlert: setToast,
  } = useResendOtp();

  return (
    <FormCard
      title="Email Verification"
      subtitle={`A verification code has been sent to ${email}`}
      showBackButton
    >
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      {toast && (
        <Alert
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputForm
          label="OTP Code"
          type="text"
          placeholder="Enter the OTP code"
          value={otp}
          onChange={(value) => setOpt(value)}
          required
          disabled={loading}
        />
        <div className="flex items-center justify-end text-sm">
          {isLoading ? (
            <p>Resending...</p>
          ) : (
            <>
              <p>Didn't see code?</p>{" "}
              <button
                type="button"
                onClick={() => handleResend(email)}
                className="text-green-600 hover:text-green-700 pl-1"
              >
                Resend
              </button>
            </>
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={loading}
          disabled={loading}
        >
          Submit
        </Button>
      </form>
    </FormCard>
  );
};

export default VerifyForm;
