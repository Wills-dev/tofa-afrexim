"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { useUpdateCompanyStatus } from "@/services/companies/hooks/useUpdateCompanyStatus";

import { useContext } from "react";
import Alert from "@/components/atoms/Alert/Alert";

const CompanyDropdow = ({
  companyId,
  agentId,
  refetchCompanies,
}: {
  companyId: string;
  agentId: string;
  refetchCompanies: () => void;
}) => {
  const { currentUser } = useContext(AuthContext);
  const { updateStatus, alert, setAlert, updating } =
    useUpdateCompanyStatus(companyId);

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggle = () => setOpen((prev) => !prev);

  const handleDecline = (reason: string) => {
    updateStatus("Declined", refetchCompanies, reason);
    setOpen(false);
  };

  const handleAccept = () => {
    updateStatus("Accepted", refetchCompanies);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {updating && (
        <div className="fixed top-0 left-0 w-full h-screen min-h-full flex items-center justify-center z-40">
          <span className="text-red-500">Updating...</span>
        </div>
      )}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      {/* Trigger */}
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={toggle}
        type="button"
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg z-50">
          <div className="py-1 flex flex-col gap-2 text-sm">
            <Link
              href={ROUTES?.dashboard_admin_company_info(companyId)}
              className="block px-4 py-2 hover:bg-gray-50 text-blue-500"
              onClick={() => setOpen(false)}
            >
              View info
            </Link>

            <Link
              href={ROUTES?.dashboard_admin_users_info(agentId)}
              className="block px-4 py-2 hover:bg-gray-50 text-blue-500"
              onClick={() => setOpen(false)}
            >
              View Agent Info
            </Link>

            {/* Admin Actions */}
            {currentUser?.id === "AF000001" && (
              <>
                <button
                  onClick={handleAccept}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-green-600 truncate"
                >
                  Accept company
                </button>

                <button
                  onClick={() => handleDecline("No feedback from company")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500"
                >
                  Decline (No feedback)
                </button>

                <button
                  onClick={() =>
                    handleDecline("Duplicate email contact details")
                  }
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500"
                >
                  Decline (Duplicate email)
                </button>

                <button
                  onClick={() => handleDecline("Not involve in trade")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500 truncate"
                >
                  Decline (Not involved in trade)
                </button>

                <button
                  onClick={() => handleDecline("Revenue below threshold")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500 truncate"
                >
                  Decline (Revenue below threshold)
                </button>

                <button
                  onClick={() => handleDecline("Irrelevant sector")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500 truncate"
                >
                  Decline (Irrelevant sector)
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDropdow;
