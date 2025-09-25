export const ROUTES = {
  home: "/",
  login: "/auth/login",
  signup: "/auth/signup",
  verify: "/auth/verify",
  dashboard: "/dashboard/overview",
  dashboard_admin: "/dashboard/admin/overview",
  dashboard_admin_company: "/dashboard/admin/companies",
  dashboard_admin_company_info: (id: string) =>
    `/dashboard/admin/companies/${id}`,
  dashboard_admin_users: "/dashboard/admin/users",
  dashboard_admin_users_info: (id: string) => `/dashboard/admin/users/${id}`,
  dashboard_admin_supervisors: "/dashboard/admin/supervisors",
  dashboard_admin_supervisors_info: (id: string) =>
    `/dashboard/admin/supervisors/${id}`,
  dashboard_admin_register: "/dashboard/admin/register",
  dashboard_companies: "/dashboard/companies",
  dashboard_company_info: (id: string) => `/dashboard/companies/${id}`,
  dashboard_supervisor: "/dashboard/supervisor/overview",
  dashboard_supervisor_company: "/dashboard/supervisor/companies",
  dashboard_supervisor_company_info: (id: string) =>
    `/dashboard/supervisor/companies/${id}`,
  dashboard_supervisor_users: "/dashboard/supervisor/users",
  dashboard_supervisor_users_info: (id: string) =>
    `/dashboard/supervisor/users/${id}`,
  dashboard_profile: "/dashboard/profile",
  onboard: "/onboard",
  edit_company: (id: string) => `/onboard/edit/${id}`,
  settings: "/dashboard/settings",
};
