import Button from "@/components/atoms/Button/Button";
import NavigationLink from "@/components/atoms/NavigationLink/NavigationLink";

import { ROUTES } from "@/lib/constants/routes";
import { UserRole } from "@/lib/types";
import { LogOut, User } from "lucide-react";

const MobileMenu = ({
  isOpen,
  isLoggedIn,
  userRole,
  onLogout,
}: {
  isOpen: boolean;
  isLoggedIn: boolean;
  userRole?: UserRole | null;
  onLogout: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden py-4 border-t border-gray-100">
      <nav className="flex flex-col space-y-4">
        <NavigationLink href="#about">About</NavigationLink>
        <NavigationLink href="#partnership">Partnership</NavigationLink>

        <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
          {!isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start"
                href={ROUTES?.login}
              >
                Login
              </Button>
              <Button
                variant="primary"
                className="w-full"
                href={ROUTES?.signup}
              >
                Sign Up
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                href={ROUTES?.onboard}
              >
                Onboard Company
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start"
                icon={<User className="w-4 h-4" />}
                href={
                  userRole?.role === "user"
                    ? ROUTES?.dashboard
                    : ROUTES?.dashboard_admin
                }
              >
                Dashboard
              </Button>

              <Button
                variant="secondary"
                className="w-full"
                href={ROUTES?.onboard}
              >
                Onboard Company
              </Button>

              <Button
                variant="danger"
                className="w-full justify-start"
                onClick={onLogout}
                icon={<LogOut className="w-4 h-4" />}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
