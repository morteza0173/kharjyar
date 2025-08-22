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
  Box,
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
import { CategoryType } from "@prisma/client";

interface TransactionRow {
  id: string;
  type: CategoryType;
  amount: number;
  description: string | null;
  date: Date;
  userId: string;
  categoryId: string;
  accountId: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  query: {
    data?: TData[];
    isError: boolean;
    isPending?: boolean;
    refetch: UseQueryResult<TData[]>["refetch"];
  };
  mobileVisibility?: VisibilityState;
  desktopVisibility?: VisibilityState;
  pagination?: boolean;
  children?: (table: ReactTableInstance<TData>) => React.ReactNode;
}
export function TransActionDataTable<TData extends TransactionRow, TValue>({
  columns,
  query,
  mobileVisibility,
  desktopVisibility,
  children,
  pagination = true,
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
      size: 200,
      minSize: 50,
      maxSize: 500,
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
    <div>
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
                table.getRowModel().rows.map((row) => {
                  const type = row.original.type;
                  const totalSize = table
                    .getVisibleLeafColumns()
                    .reduce((sum, col) => sum + col.getSize(), 0);
                  const colWidths = table
                    .getVisibleLeafColumns()
                    .map((col) => `${(col.getSize() / totalSize) * 100}%`);
                  return (
                    <Fragment key={row.id}>
                      <TableRow
                        data-state={row.getIsSelected() && "selected"}
                        onClick={() => row.toggleExpanded()}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell
                          colSpan={row.getVisibleCells().length}
                          sx={{
                            p: 0,
                          }}
                        >
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: colWidths.join(" "),
                              alignItems: "center",
                              borderRadius: "8px",
                              borderLeft:
                                type === "EXPENSE"
                                  ? "8px solid red"
                                  : "8px solid green",
                            }}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <Box
                                key={cell.id}
                                sx={{
                                  px: 2,
                                  py: 2,
                                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                                  textAlign: "left",
                                  minWidth: 0,
                                }}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </Box>
                            ))}
                          </Box>
                        </TableCell>
                      </TableRow>

                      <AnimatePresence initial={false} mode="wait">
                        {row.getIsExpanded() && (
                          <TableRow>
                            <TableCell
                              colSpan={row.getVisibleCells().length}
                              sx={{ padding: 0 }}
                            >
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.4,
                                  ease: "easeInOut",
                                }}
                                style={{ overflow: "hidden" }}
                              >
                                <Box
                                  sx={{
                                    p: 3,
                                    bgcolor:
                                      row.original.type === "EXPENSE"
                                        ? "rgb(255, 0, 0 , 0.1)"
                                        : "rgb(0, 255, 0 , 0.1)",
                                    borderRadius: 2,
                                  }}
                                >
                                  <strong>جزئیات بیشتر:</strong> اطلاعات اضافی
                                  این بخش قرار میگیرد
                                  <span className="font-bold px-1"></span>
                                  است.
                                </Box>
                              </motion.div>
                            </TableCell>
                          </TableRow>
                        )}
                      </AnimatePresence>
                    </Fragment>
                  );
                })
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
      {pagination && <DataTablePagination table={table} />}
    </div>
  );
}
