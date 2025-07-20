"use client";

import { Table } from "@tanstack/react-table";
import useGetAccount from "@/app/hooks/useGetAccount";
import { TextField } from "@mui/material";
import { DataTableFacetedFilter } from "../DataTableFacetedFilter";
import ResetFilterButton from "../ResetFilterButton";
import DataTablePriceRangeFilter from "../DataTablePriceRangeFilter";
import { dataLabels } from "@/lib/dataLabel";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function AccountToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const { data: accountData, isPending } = useGetAccount();

  const accountType = [
    ...new Map(
      accountData?.map((account) => [
        account.type,
        {
          value: account.type,
          label: dataLabels[account.type],
        },
      ])
    ).values(),
  ];

  const balances = accountData?.map((item) => item.balance) ?? [];

  const minBalance = Math.min(...balances);
  const maxBalance = Math.max(...balances);

  //   const selectedIds = table
  //     .getFilteredSelectedRowModel()
  //     .rows.map((row) => (row.original as { id: number }).id);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between m-4">
        <div className="flex w-full md:w-auto flex-wrap items-center gap-2 flex-col md:flex-row">
          <TextField
            size="small"
            placeholder="جستجو بر اساس عنوان"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              table.getColumn("name")?.setFilterValue(event.target.value);
            }}
          />
          <DataTableFacetedFilter
            table={table}
            column="type"
            title="نوع حساب"
            options={accountType || []}
          />
          <DataTablePriceRangeFilter
            column="balance"
            table={table}
            min={minBalance}
            max={maxBalance}
            isPending={accountData?.length === 0 ? true : isPending}
          />
          <ResetFilterButton table={table} />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
          {/* <AssignmentDataTableViewOptions table={table} /> */}
        </div>
      </div>
    </>
  );
}
