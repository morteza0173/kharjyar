import {
  ChevronLeftSharp,
  ChevronRightTwoTone,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Button, MenuItem, Select } from "@mui/material";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col items-center justify-between space-y-4 p-2 lg:flex-row lg:space-y-0">
      <div className="flex flex-col items-center gap-0 space-y-2 sm:flex-row sm:space-x-6 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className="pl-8">
              {table.getFilteredSelectedRowModel().rows.length} از{" "}
              {table.getFilteredRowModel().rows.length} ردیف انتخاب شده است.
            </div>
          )}
        </div>
        <div className="flex items-center ">
          <p className="text-sm font-medium pl-2">ردیف در هر صفحه</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onChange={(event) => {
              table.setPageSize(Number(event.target.value));
            }}
            sx={{ height: 32 }}
          >
            {[6, 10, 20, 30, 40, 50].map((pageSize) => (
              <MenuItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2 space-x-2">
        <div className="flex items-center gap-2">
          <Button
            variant="text"
            className="h-8 w-8 p-0"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">صفحه اول</span>
            <KeyboardDoubleArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="text"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">صفحه قبلی</span>
            <ChevronRightTwoTone className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center text-xs font-medium">
            صفحه {table.getState().pagination.pageIndex + 1} از{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="text"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">صفحه بعدی</span>
            <ChevronLeftSharp className="h-4 w-4" />
          </Button>
          <Button
            variant="text"
            className="h-8 w-8 p-0"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">اخرین صفحه</span>
            <KeyboardDoubleArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
