"use client";

import { dataLabels } from "@/lib/dataLabel";
import { formatPriceWithCommaFa } from "@/lib/formatPrice";
import { Badge, Checkbox } from "@mui/material";
import { Account, AccountType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

// type Account = {
//   name: string;
//   type: "CASH" | "BANK" | "SAVINGS" | "OTHER";
//   balance: number;
//   id: string;
//   userId: string;
//   createdAt: Date;
//   updatedAt: Date;
//   description: string | null;
// };

export const AccountListColumns: ColumnDef<Account>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
        }
        onChange={(event) =>
          table.toggleAllPageRowsSelected(event.target.checked)
        }
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(event) => row.toggleSelected(event.target.checked)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <p>نام حساب</p>,
    cell: ({ row }) => (
      <div className="max-w-[200px] md:w-auto capitalize  flex gap-2 items-center">
        <div>
          <p>{row.getValue("name")}</p>
        </div>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      const title = row.getValue(id) as string;
      return title.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "type",
    header: () => <p>نوع حساب</p>,
    cell: ({ row }) => {
      return (
        <div className="flex xl:w-full items-center gap-1 flex-wrap">
          <Badge className="capitalize text-xs">
            {dataLabels[row.getValue("type") as AccountType]}
          </Badge>
        </div>
      );
    },
    filterFn: (row, _id, value) => {
      const type = row.getValue("type");
      return value.includes(type);
    },
  },
  {
    accessorKey: "balance",
    header: () => <p>موجودی</p>,
    cell: ({ row }) => {
      return (
        <div className="flex xl:w-full items-center gap-1 flex-wrap">
          <Badge className="capitalize text-xs">
            {formatPriceWithCommaFa(row.getValue("balance"))}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as number;
      const [min, max] = value;
      return rowValue >= min && rowValue <= max;
    },
  },
];
