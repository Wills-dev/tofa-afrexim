"use client";

import Link from "next/link";
import { useContext, useState } from "react";

import {
  Bell,
  ChevronDown,
  Loader2,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";

import { NavbarProps } from "@/lib/types";
import { ROUTES } from "@/lib/constants/routes";
import { AuthContext } from "@/contexts/AuthState";
import { getInitials } from "@/lib/helpers";

import Button from "@/components/atoms/Button/Button";
import { useLogout } from "@/services/auth/hooks/useLogout";

const Navbar = ({ setIsMobileOpen }: NavbarProps) => {
  const { currentUser } = useContext(AuthContext);
  const { isOut, logout } = useLogout();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationCount] = useState(3);

  const userRole = currentUser?.role;

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden sm:block">
            <h2 className="text-xl font-semibold text-gray-900">
              {userRole === "user" ? "Dashboard" : "Admin Dashboard"}
            </h2>
            <p className="text-sm text-gray-500">
              {userRole !== "user"
                ? "Manage platform operations"
                : "Manage your company onboarding"}
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {currentUser?.firstName
                    ? getInitials(currentUser?.firstName, currentUser?.lastName)
                    : "T"}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {currentUser?.firstName}
                </p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <Link
                  href={ROUTES?.settings}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </Link>
                <Link
                  href={ROUTES?.settings}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </Link>
                <hr className="my-1" />
                <button
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={logout}
                >
                  {isOut ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4 mr-3" />
                  )}
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
