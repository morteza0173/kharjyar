import { CloseOutlined} from "@mui/icons-material";
import { Button } from "@mui/material";
import { Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function ResetFilterButton<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <>
      {isFiltered && (
        <Button
          variant="text"
          onClick={() => table.resetColumnFilters()}
          endIcon={<CloseOutlined sx={{ height: 18, width: 18 }} />}
        >
          پاک کردن فیلتر
        </Button>
      )}
    </>
  );
}
export default ResetFilterButton;
