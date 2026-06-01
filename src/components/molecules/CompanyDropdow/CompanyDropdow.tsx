import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/contexts/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { useUpdateCompanyStatus } from "@/services/companies/hooks/useUpdateCompanyStatus";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

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
  const { updateStatus, setDeclineReason } = useUpdateCompanyStatus(companyId);

  const handleDecline = (reason: string) => {
    setDeclineReason(reason);
    updateStatus("Declined", refetchCompanies);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 text-right">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuItem>
          <Link
            href={ROUTES?.dashboard_admin_company_info(companyId)}
            className="text-blue-500 hover:underline transition-all duration-300"
          >
            View info
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={ROUTES?.dashboard_admin_users_info(agentId)}
            className="text-blue-500 hover:underline transition-all duration-300"
          >
            View Agent Info
          </Link>
        </DropdownMenuItem>
        {currentUser?.id === "AF000001" && (
          <>
            <DropdownMenuItem>
              <button
                onClick={() => updateStatus("Accepted", refetchCompanies)}
                className="text-green-500 hover:text-green-600 transition-all duration-300"
              >
                Accept company
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={() => handleDecline("No feedback from company")}
                className="text-red-500 hover:text-red-600 transition-all duration-300"
              >
                Decline company (No feedback)
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={() => handleDecline("Duplicate email contact details")}
                className="text-red-500 hover:text-red-600 transition-all duration-300"
              >
                Decline company (Duplicate email)
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={() => handleDecline("Not involve in trade")}
                className="text-red-500 hover:text-red-600 transition-all duration-300"
              >
                Decline company (Not involve in trade)
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={() => handleDecline("Revenue below threshold")}
                className="text-red-500 hover:text-red-600 transition-all duration-300"
              >
                Decline company (Revenue below threshold)
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                onClick={() => handleDecline("Irrelevant sector")}
                className="text-red-500 hover:text-red-600 transition-all duration-300"
              >
                Decline company (Irrelevant sector)
              </button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CompanyDropdow;
