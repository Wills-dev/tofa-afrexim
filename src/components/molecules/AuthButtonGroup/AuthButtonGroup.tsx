import Button from "@/components/atoms/Button/Button";

import { UserRole } from "@/lib/types";
import { LogOut, User } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

const AuthButtonGroup = ({
  isLoggedIn,
  userRole,
}: {
  isLoggedIn: boolean;
  userRole?: UserRole | null;
}) => {
  if (!isLoggedIn) {
    return (
      <div className="flex items-center space-x-4">
        <Button variant="ghost" href={ROUTES?.login}>
          Login
        </Button>
        <Button variant="primary" href={ROUTES?.signup}>
          Sign Up
        </Button>
        <Button variant="secondary" href={ROUTES?.onboard}>
          Onboard Company
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Button variant="secondary" href={ROUTES?.onboard}>
        Onboard Company
      </Button>
      <Button
        variant="ghost"
        href={
          userRole?.role === "user"
            ? ROUTES?.dashboard
            : ROUTES?.dashboard_admin
        }
        icon={<User className="w-4 h-4 ml-2" />}
      >
        Dashboard
      </Button>
    </div>
  );
};

export default AuthButtonGroup;
