import Link from "next/link";

import { createColumnHelper } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { convertDateFormat } from "@/lib/helpers/dateFormats";
import { ROUTES } from "@/lib/constants/routes";
import { numberWithCommas } from "@/lib/helpers";

const columnHelper = createColumnHelper();

export const Column = [
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
  columnHelper.accessor("country", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("businessSector", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Business Sector
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("annualTurnoverUSD", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Annual Turn Over
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("annualTurnoverUSD"));

      return (
        <div className="font-medium text-center">
          ${amount ? numberWithCommas(amount) : "0.00"}
        </div>
      );
    },
  }),
  columnHelper.accessor("currentLiquidityUSD", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Current Liquidity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("currentLiquidityUSD"));

      return (
        <div className="font-medium text-center">
          ${amount ? numberWithCommas(amount) : "0.00"}
        </div>
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

      const statusStyles: Record<string, string> = {
        Accepted: "text-green-400 bg-green-50",
        Pending: "text-yellow-400 bg-yellow-50",
        Processing: "text-blue-400 bg-blue-50",
        Declined: "text-blue-400 bg-blue-50",
      };

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
  {
    id: "actions",
    cell: ({ row }: any) => {
      const comapny = row.original;

      return (
        <div className="space-y-1 flex flex-col">
          <Link
            href={ROUTES?.dashboard_supervisor_company_info(comapny.id)}
            className="text-blue-500 hover:underline transition-all duration-300"
          >
            View Info
          </Link>
          <Link
            href={ROUTES?.dashboard_supervisor_users_info(comapny?.agent?.id)}
            className="text-blue-500 hover:underline transition-all duration-300"
          >
            View Agent Info
          </Link>
          {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-right">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={ROUTES?.dashboard_admin_company_info(comapny.id)}>
                View Info
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={ROUTES?.dashboard_admin_users_info(comapny?.agent?.id)}
              >
                View Agent Info
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
