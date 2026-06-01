import Link from "next/link";

import { createColumnHelper } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { convertDateFormat } from "@/lib/helpers/dateFormats";
import { ROUTES } from "@/lib/constants/routes";
import { numberWithCommas, statusStyles } from "@/lib/helpers";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthState";
import { useUpdateCompanyStatus } from "@/services/companies/hooks/useUpdateCompanyStatus";
import CompanyDropdow from "@/components/molecules/CompanyDropdow/CompanyDropdow";

const columnHelper = createColumnHelper();

export const Column = (getCompaines: () => void) => [
  {
    id: "serialNumber",
    header: "S/N",
    cell: ({ row }: any) => {
      return <div className="text-center font-medium">{row.index + 1}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  columnHelper.accessor("createdAt", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");
      const formatted = date ? convertDateFormat(date) : "";
      return <div className="">{formatted}</div>;
    },
  }),
  columnHelper.accessor("companyName", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),

  columnHelper.accessor("agent.firstName", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Agent Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      const comapny = row.original;
      const agent = comapny.agent;

      return (
        <div className="font-medium text-center capitalize">
          {agent?.firstName} {agent?.lastName}
        </div>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div
          className={`rounded-full px-3 py-1 text-center w-32 ${
            statusStyles[status] || "text-yellow-400 bg-yellow-50"
          }`}
        >
          {status}
        </div>
      );
    },
  }),
  // columnHelper.accessor("declineReason", {
  //   header: ({ column }) => {
  //     return <div>Decline reason</div>;
  //   },
  //   cell: ({ row }: any) => {
  //     const comapny = row.original;

  //     return (
  //       <div className="font-medium text-center capitalize">
  //         {comapny?.declineReason || "N/A"}
  //       </div>
  //     );
  //   },
  // }),
  {
    id: "actions",
    cell: ({ row }: any) => {
      const comapny = row.original;

      return (
        <CompanyDropdow
          companyId={comapny.id}
          agentId={comapny?.agent?.id}
          refetchCompanies={getCompaines}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
