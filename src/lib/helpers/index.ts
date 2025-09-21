import { CheckCircle, Clock, RefreshCw, XCircle } from "lucide-react";
import { StatusType } from "../types";

export function numberWithCommas(x: number | string) {
  const num = parseFloat(x.toString());
  return Number.isInteger(num)
    ? num.toLocaleString()
    : num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
}

export const getInitials = (firstName: string, lastName?: string) => {
  return `${firstName.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();
};

export const getAccountStatus = (isEmailVerified: boolean) => {
  if (isEmailVerified) {
    return {
      status: "Active",
      variant: "success" as const,
      icon: CheckCircle,
    };
  }
  return {
    status: "Pending Verification",
    variant: "warning" as const,
    icon: Clock,
  };
};

export const getStatusVariant = (status: StatusType) => {
  switch (status) {
    case "Accepted":
      return "success";
    case "Pending":
      return "warning";
    case "Processing":
      return "processing";
    case "Declined":
      return "danger";
    default:
      return "default";
  }
};

export const getStatusIcon = (status: StatusType) => {
  switch (status) {
    case "Accepted":
      return CheckCircle;
    case "Pending":
      return Clock;
    case "Processing":
      return RefreshCw;
    case "Declined":
      return XCircle;
    default:
      return Clock;
  }
};

export function convertStringToBoolean(
  value: string | boolean
): boolean | string | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}
