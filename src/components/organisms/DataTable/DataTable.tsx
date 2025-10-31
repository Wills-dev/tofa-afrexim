"use client";

import { FormEvent, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";
import PaginationComponent from "@/components/molecules/PaginationComponent";
import ColumnSorting from "@/components/molecules/ColumnSorting";
import SearchForm from "@/components/molecules/SearchForm/SearchForm";
import { SortOptionsType } from "@/lib/types";
import SortDropdown from "@/components/molecules/SortDropdown/SortDropdown";
import { exportToExcel } from "@/lib/helpers/exportToExcel";
import ExportButton from "@/components/molecules/ExportButton/ExportButton";

interface DataTableProps<TData = any> {
  columns: any;
  data: TData[];
  totalPages: number;
  currentPage: number;
  prevPage: () => void;
  nextPage: () => void;
  goToLastPage: () => void;
  goToFirstPage: () => void;
  isFirstPage: () => boolean;
  isLastPage: () => boolean;
  limit: number;
  setLimit: (limit: number) => void;
  search?: string;
  handleChange?: (search: string) => void;
  handleSubmitSearch?: (e: FormEvent) => void;
  filter?: string;
  setFilter?: (filter: string) => void;
  filterOptions?: SortOptionsType[];
  exportFilename?: string;
}

const DataTable = ({
  columns,
  data,
  totalPages,
  currentPage,
  prevPage,
  nextPage,
  goToLastPage,
  goToFirstPage,
  isFirstPage,
  isLastPage,
  limit,
  setLimit,
  search,
  handleChange,
  handleSubmitSearch,
  filter,
  setFilter,
  filterOptions,
  exportFilename = "table_data",
}: DataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: 0,
        pageSize: limit || 10,
      },
    },
  });

  const showSortDropdown =
    filter !== undefined &&
    setFilter !== undefined &&
    filterOptions !== undefined;

  const showSearchInput =
    search !== undefined &&
    handleChange !== undefined &&
    handleSubmitSearch !== undefined;

  const handleExport = () => {
    // Get visible rows from the table
    const visibleRows = table
      .getFilteredRowModel()
      .rows.map((row) => row.original);

    // If you want to export only visible columns, you can transform the data
    const exportData = visibleRows.map((row: any) => ({
      "S/N": visibleRows.indexOf(row) + 1,
      Joined: row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "",
      "Agent ID": row.id,
      "First Name": row.firstName,
      "Last Name": row.lastName,
      "Phone Number": row.phoneNumber,
      Email: row.email,
      "Total Companies": row.totalCompanies,
      "Total Accepted Companies": row.totalAcceptedCompanies,
      Country: row.country,
      "Bank Name": row.bankName,
      "Account Number": row.accountNumber,
      "Account Name": row.accountName,
    }));

    exportToExcel(exportData, exportFilename);
  };

  return (
    <div className="space-y-2 pt-2 max-w-full w-full overflow-x-hidden">
      <div className="flex items-center justify-between gap-6">
        {showSearchInput && (
          <SearchForm
            value={search}
            onChange={handleChange}
            onSubmit={handleSubmitSearch}
          />
        )}
        <div className="flex items-center justify-end text-gray-300 dark:text-gray-600 gap-6">
          {showSortDropdown && (
            <SortDropdown
              value={filter}
              onChange={setFilter}
              options={filterOptions}
            />
          )}
          <ExportButton onClick={handleExport} />
          <ColumnSorting table={table} />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow dark:bg-secondary-dark-bg w-full  overflow-x-auto">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup?.headers?.map((header) => {
                  return (
                    <TableHead
                      key={header?.id}
                      className="bg-gray-100 dark:bg-black"
                    >
                      {header?.isPlaceholder
                        ? null
                        : flexRender(
                            header?.column?.columnDef.header,
                            header?.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row) => (
                <TableRow
                  key={row?.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={row.getIsSelected() ? "bg-blue-50" : ""}
                >
                  {row?.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>{" "}
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        goToLastPage={goToLastPage}
        goToFirstPage={goToFirstPage}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
};

export default DataTable;
