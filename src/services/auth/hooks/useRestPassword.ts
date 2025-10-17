import { useState } from "react";

import { axiosInstance } from "@/lib/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

export const useRestPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [laoding, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post(
        "/auth/reset-password",
        { password, token },
        {
          withCredentials: true,
        }
      );
      setAlert({ type: "success", message: "Password has been reset." });
      setPassword("");
      router.push(ROUTES?.login);
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
    password,
    setPassword,
    laoding,
    alert,
    setAlert,
    error,
  };
};
