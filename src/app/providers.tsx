"use client";

import AuthState from "@/contexts/AuthState";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AuthState>{children}</AuthState>;
};

export default Providers;
