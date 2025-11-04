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
  columnHelper.accessor("id", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Supervisor Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("firstName", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      const supervisor = row.original;

      return (
        <div className="font-medium text-center capitalize">
          {supervisor?.firstName} {supervisor?.lastName}
        </div>
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
  columnHelper.accessor("totalCompanies", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Companies
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const totalCompanies = parseFloat(row.getValue("totalCompanies"));

      return (
        <div className="font-medium text-center">
          {totalCompanies ? numberWithCommas(totalCompanies) : "0"}
        </div>
      );
    },
  }),
  columnHelper.accessor("totalAccepted", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Accepted companies
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const totalAccepted = parseFloat(row.getValue("totalAccepted"));

      return (
        <div className="font-medium text-center">
          {totalAccepted ? numberWithCommas(totalAccepted) : "0"}
        </div>
      );
    },
  }),
  columnHelper.accessor("totalAgents", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Agents
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const totalAgents = parseFloat(row.getValue("totalAgents"));

      return (
        <div className="font-medium text-center">
          {totalAgents ? numberWithCommas(totalAgents) : "0"}
        </div>
      );
    },
  }),

  {
    id: "actions",
    cell: ({ row }: any) => {
      const supervisor = row.original;

      return (
        <div className="space-y-1 flex flex-col">
          <Link
            href={ROUTES?.dashboard_admin_supervisors_info(supervisor?.id)}
            className="text-blue-500 hover:underline transition-all duration-300"
          >
            View Supervisor Info
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
