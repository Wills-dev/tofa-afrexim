import { ChartConfig } from "@/components/ui/chart";
import {
  CompanyOnboardingFormData,
  FormErrors,
} from "@/services/companies/types";

export interface AuthContextInterface {
  user: UserRole | null;
  isLoggedIn: boolean;
  login: (userType: UserRole, userData?: any) => void;
  logout: () => void;
}

export interface UserRole {
  role: "user" | "admin";
  id: string;
  name: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  country?: string;
}

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  asChild?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

export interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "green" | "orange";
}

export interface MetricCardProps {
  value: string;
  label: string;
  variant?: "light" | "dark";
}

export interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "7xl";
  className?: string;
}

export interface InputFormProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectFormProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

export interface FormCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  isAdmin?: boolean;
}

export interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: "green" | "orange" | "red" | "blue";
  trend?: string;
}

export interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  menuItems: MenuItems[];
}

export interface NavbarProps {
  setIsMobileOpen: (open: boolean) => void;
}

export interface ChartsProps {
  chartData: any[];
  chartConfig: ChartConfig;
  dataKey: string;
  dataKey2: string;
}

export interface MenuItems {
  id: string;
  label: string;
  icon: any;
  link: string;
}

export interface SortOptionsType {
  label: string;
  value: string;
}

export interface BusinessProps {
  errors: FormErrors;
  companyData: CompanyOnboardingFormData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleCheckboxChange?: (paymentOption: string, checked: boolean) => void;
}

export type StatusType = "Pending" | "Processing" | "Accepted" | "Declined";

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangePickerProps {
  onDateRangeChange?: (dateRange: DateRange) => void;
  maxRangeDays?: number;
  className?: string;
  placeholder?: string;
}

export interface AdminChartProps {
  isFetching: boolean;
  data: { value: number; period: string }[];
  setSortBy: (sortBy: string) => void;
  sortBy: string;
}
