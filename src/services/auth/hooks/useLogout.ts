import { useContext, useState } from "react";

import { AuthContext } from "@/contexts/AuthState";
import { axiosInstance } from "@/lib/axiosInstance";
import { ROUTES } from "@/lib/constants/routes";
import { clearCookie } from "@/lib/helpers/cookieHelper";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const [isOut, setIsOut] = useState(false);
  const { setCurrentUser } = useContext(AuthContext);

  const logout = async () => {
    try {
      await axiosInstance.post(`/auth/logout`);
      router.push(ROUTES.home);
      setCurrentUser(null);
      clearCookie("sessionToken");
    } catch (error) {
      console.log("error logginng out", error);
    } finally {
      setIsOut(false);
    }
  };

  return { isOut, logout };
};
