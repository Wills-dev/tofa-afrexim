import Link from "next/link";

import { X } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import Logo from "@/components/atoms/Logo/Logo";

import { SidebarProps } from "@/lib/types";
import { useActivePath } from "@/lib/hooks/useActivePath";

const Sidebar = ({
  isMobileOpen,
  setIsMobileOpen,
  menuItems,
}: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 
          w-72 min-w-72 
          bg-white border-r border-gray-200 
          flex flex-col
          transform ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 
          transition-transform duration-300 ease-in-out
          h-screen
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Logo size="lg" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = item?.link ? useActivePath(item?.link) : false;
              return (
                <Link
                  key={item.id}
                  href={item.link || "#"}
                  onClick={() => {
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                    isActive
                      ? "bg-green-50 text-green-700 border border-green-100 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 transition-colors ${
                      isActive
                        ? "text-green-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Partnership Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-green-50 to-orange-50 p-4 rounded-xl border border-green-100">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                Afrexim/ATG
              </span>
            </div>
            <p className="text-xs text-gray-600">Partnership Program</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
