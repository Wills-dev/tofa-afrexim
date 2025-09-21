import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { axiosInstance } from "@/lib/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ROUTES } from "@/lib/constants/routes";

export const useSetPassword = (token: string) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      return;
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        token,
        password,
      };
      const { data } = await axiosInstance.post(`/auth/set-password`, payload, {
        withCredentials: true,
      });
      setAlert({ type: "success", message: "Set password successful!" });
      router.push(ROUTES?.login);
      console.log("data", data);
    } catch (error) {
      console.log("error setting password", error);
      const errMsg = promiseErrorFunction(error);
      setAlert({ type: "error", message: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return {
    alert,
    setAlert,
    handleSubmit,
    error,
    loading,
    setPassword,
    password,
  };
};
