import { axiosInstance } from "@/lib/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { FormEvent, useState } from "react";

export const useForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await axiosInstance.post(
        "/auth/forgot-password",
        { email },
        {
          withCredentials: true,
        }
      );
      setAlert({
        type: "success",
        message: "Password reset link sent to your email.",
      });
      setEmail("");
    } catch (error) {
      console.log("error", error);
      const errMsg = promiseErrorFunction(error);
      setAlert({ type: "error", message: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    email,
    setEmail,
    loading,
    alert,
    setAlert,
    error,
  };
};
