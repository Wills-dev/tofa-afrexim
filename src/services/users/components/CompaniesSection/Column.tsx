"use client";

import Link from "next/link";
import { useContext } from "react";

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
import { numberWithCommas, statusStyles } from "@/lib/helpers";
import { AuthContext } from "@/contexts/AuthState";

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
  {
    id: "actions",
    cell: ({ row }: any) => {
      const comapny = row.original;
      const { currentUser } = useContext(AuthContext);
      const role = currentUser?.role;

      return (
        <div>
          {" "}
          <Link
            href={
              role === "user"
                ? ROUTES?.dashboard_company_info(comapny.id)
                : role === "supervisor"
                ? ROUTES?.dashboard_supervisor_company_info(comapny.id)
                : ROUTES?.dashboard_admin_company_info(comapny.id)
            }
            className="text-blue-500 hover:underline transition-all duration-300"
          >
            View Info
          </Link>
        </div>
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0 text-right">
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuItem>

        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
