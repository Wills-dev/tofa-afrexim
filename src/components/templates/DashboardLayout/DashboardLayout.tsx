"use client";

import { useState } from "react";

import Navbar from "@/components/organisms/Navbar/Navbar";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";

import { MenuItems } from "@/lib/types";

const DashboardLayout = ({
  children,
  menuItems,
}: {
  children: React.ReactNode;
  menuItems: MenuItems[];
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        menuItems={menuItems}
      />
      <div className="flex">
        <div className="w-72 min-w-72 max-lg:hidden" />
        <div className="flex-1 flex flex-col min-h-screen lg:ml-0 max-w-full w-full overflow-x-hidden">
          <Navbar setIsMobileOpen={setIsMobileOpen} />
          <main className="flex-1 py-4 lg:py-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
