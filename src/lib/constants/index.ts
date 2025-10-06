import {
  BarChart3,
  Users,
  Building2,
  Settings,
  Clock,
  RefreshCw,
  CheckCircle,
  XCircle,
  UserPlus,
  UserLock,
} from "lucide-react";
import { ROUTES } from "./routes";
import { StatusType } from "../types";

export const userMenuItems = [
  {
    id: "overview",
    label: "Overview",
    icon: BarChart3,
    link: ROUTES?.dashboard,
  },
  {
    id: "companies",
    label: "My Companies",
    icon: Building2,
    link: ROUTES?.dashboard_companies,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    link: ROUTES?.settings,
  },
];

export const adminMenuItems = [
  {
    id: "overview",
    label: "Overview",
    icon: BarChart3,
    link: ROUTES?.dashboard_admin,
  },
  {
    id: "companies",
    label: "Companies",
    icon: Building2,
    link: ROUTES?.dashboard_admin_company,
  },
  {
    id: "users",
    label: "Manage Users",
    icon: Users,
    link: ROUTES?.dashboard_admin_users,
  },
  {
    id: "supervisors",
    label: "Manage Supervisors",
    icon: UserLock,
    link: ROUTES?.dashboard_admin_supervisors,
  },
  {
    id: "register",
    label: "Register Admin",
    icon: UserPlus,
    link: ROUTES?.dashboard_admin_register,
  },
  { id: "settings", label: "Settings", icon: Settings, link: ROUTES?.settings },
];

export const supervisorMenuItems = [
  {
    id: "overview",
    label: "Overview",
    icon: BarChart3,
    link: ROUTES?.dashboard_supervisor,
  },
  {
    id: "companies",
    label: "Companies",
    icon: Building2,
    link: ROUTES?.dashboard_supervisor_company,
  },
  {
    id: "users",
    label: "Manage Users",
    icon: Users,
    link: ROUTES?.dashboard_supervisor_users,
  },
  { id: "settings", label: "Settings", icon: Settings, link: ROUTES?.settings },
];

export const statusOptions: {
  value: StatusType;
  label: string;
  icon: any;
  color: string;
}[] = [
  {
    value: "Pending",
    label: "Pending",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    value: "Processing",
    label: "Processing",
    icon: RefreshCw,
    color: "text-purple-600",
  },
  {
    value: "Accepted",
    label: "Accepted",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    value: "Declined",
    label: "Declined",
    icon: XCircle,
    color: "text-red-600",
  },
];
