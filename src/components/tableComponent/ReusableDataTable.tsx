"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { UseQueryResult } from "@tanstack/react-query";
// import { Loader2, TriangleAlert } from "lucide-react";
// import { DataTablePagination } from "../tableComponent/data-table-pagination";
import { useEffect, useState } from "react";
import type { Table as ReactTableInstance } from "@tanstack/react-table";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { WarningAmber } from "@mui/icons-material";
import { DataTablePagination } from "./DataTablePagination";
import theme from "@/Providers/theme";
import { lighten } from "@mui/material/styles";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  query: {
    data?: TData[];
    isError: boolean;
    isPending: boolean;
    refetch: UseQueryResult<TData[]>["refetch"];
  };
  mobileVisibility?: VisibilityState;
  desktopVisibility?: VisibilityState;
  children?: (table: ReactTableInstance<TData>) => React.ReactNode;
}
export function ReusableDataTable<TData, TValue>({
  columns,
  query,
  mobileVisibility,
  desktopVisibility,
  children,
}: DataTableProps<TData, TValue>) {
  const { data: queryData, isPending, isError, refetch } = query;
  const [data, setData] = useState<TData[]>([]);

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    setData(queryData || []);
  }, [queryData]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumnVisibility(mobileVisibility || {});
      } else {
        setColumnVisibility(desktopVisibility || {});
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileVisibility, desktopVisibility]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-2">
      <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
        {children?.(table)}
        <div className="overflow-y-auto rounded-md">
          <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  sx={{ bgcolor: lighten(theme.palette.primary.light, 0.8) }}
                >
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      className="px-1 md:px-2 lg:px-4 py-2 text-xs md:text-sm"
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="even:bg-gray-50 odd:bg-[#ffffff]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="px-1 md:px-2 lg:px-4 py-2 text-xs md:text-sm"
                        key={cell.id}
                      >
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
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div className="flex items-center justify-center h-full w-full">
                      {isPending ? (
                        <div className="flex gap-2 items-center">
                          <CircularProgress
                            size={24}
                            thickness={4}
                            color="primary"
                          />
                          <p>در حال دریافت اطلاعات</p>
                        </div>
                      ) : isError ? (
                        <div className="flex gap-2 items-center">
                          <WarningAmber />
                          <p>مشکلی در دریافت اطلاعات به وجود آمد</p>
                          <Button variant="contained" onClick={() => refetch()}>
                            تلاش مجدد
                          </Button>
                        </div>
                      ) : (
                        "نتیجه‌ای یافت نشد"
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TableContainer>

      <DataTablePagination table={table} />
    </div>
  );
}
