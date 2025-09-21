"use client";

import { useContext } from "react";

import Button from "@/components/atoms/Button/Button";
import Card from "@/components/atoms/Card/Card";
import { AuthContext } from "@/contexts/AuthState";

import { ROUTES } from "@/lib/constants/routes";
import { useLogout } from "@/services/auth/hooks/useLogout";
import { Loader2 } from "lucide-react";

const Shortcut = () => {
  const { currentUser } = useContext(AuthContext);
  const { isOut, logout } = useLogout();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="space-y-2" padding="sm">
        <div className="flex flex-col gap-2">
          {!currentUser ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                href={ROUTES?.login}
              >
                Login
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                href={ROUTES?.signup}
              >
                Sign up
              </Button>
            </>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-gray-600">
                Logged in as:{" "}
                <span className="capitalize">{currentUser?.role}</span>
              </p>
              <Button
                variant="danger"
                size="sm"
                className="w-full"
                icon={isOut && <Loader2 className="h-4 w-4 animate-spin" />}
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Shortcut;
