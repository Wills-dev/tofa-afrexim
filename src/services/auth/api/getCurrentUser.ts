import { axiosInstance } from "@/lib/axiosInstance";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const getCurrentUser = async () => {
  try {
    const { data } = await axiosInstance.get("/agent/me", {
      withCredentials: true,
    });
    return data?.data;
  } catch (error) {
    const apiError = promiseErrorFunction(error);
    console.error("Failed to fetch user:", apiError);
    throw new Error(apiError);
  }
};
