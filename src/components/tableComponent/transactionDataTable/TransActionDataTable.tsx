"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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
import { Fragment, useEffect, useState } from "react";
import type { Table as ReactTableInstance } from "@tanstack/react-table";
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { WarningAmber } from "@mui/icons-material";
import { DataTablePagination } from "../DataTablePagination";
import { motion, AnimatePresence } from "framer-motion";

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
export function TransActionDataTable<TData, TValue>({
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
  const [expanded, setExpanded] = useState({});

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
      expanded,
    },
    defaultColumn: {
      size: 200, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
    columnResizeDirection: "rtl",
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
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
  });

  return (
    <div className="space-y-2">
      <TableContainer>
        {children?.(table)}
        <div className="overflow-y-auto">
          <Table sx={{ minWidth: 50 }} size="small" aria-label="a dense table">
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      className="px-1  md:px-2 lg:px-4 py-2 text-xs md:text-sm"
                      key={header.id}
                      colSpan={header.colSpan}
                      sx={{
                        width: header.getSize()
                          ? `${header.getSize()}px`
                          : "auto",
                      }}
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
                  <Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      className="even:bg-gray-50 odd:bg-[#ffffff]"
                      onClick={() => row.toggleExpanded()}
                      sx={{ cursor: "pointer" }}
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

                    <AnimatePresence initial={false} mode="wait">
                      {row.getIsExpanded() && (
                        <TableRow className="bg-gray-100">
                          <TableCell
                            colSpan={row.getVisibleCells().length}
                            sx={{ padding: 0 }}
                          >
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              style={{ overflow: "hidden" }}
                            >
                              <div className="p-3 text-xs md:text-sm text-gray-700">
                                <strong>جزئیات بیشتر:</strong> اطلاعات اضافی این بخش قرار میگیرد
                                <span className="font-bold px-1"></span>
                                است.
                              </div>
                            </motion.div>
                          </TableCell>
                        </TableRow>
                      )}
                    </AnimatePresence>
                  </Fragment>
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
