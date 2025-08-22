"use client";
import { Box, Button, Divider, useMediaQuery, useTheme } from "@mui/material";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "../DataTableFacetedFilter";
import useGetTransaction from "@/app/hooks/useGetTransaction";
import { transactionTypeLabels } from "@/lib/dataLabel";
import useGetAccount from "@/app/hooks/useGetAccount";
import { Add, FilterList } from "@mui/icons-material";
import AddTransactionForm from "./AddTransactionForm";
import { useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function TransActionToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { data: transActionData } = useGetTransaction();
  const { data: AccountData } = useGetAccount();
  const [openAddTransaction, setOpenAddTransaction] = useState(false);

  const theme = useTheme();

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const transactionType = [
    ...new Map(
      transActionData?.map((Transaction) => [
        Transaction.type,
        {
          value: Transaction.type,
          label: transactionTypeLabels[Transaction.type],
        },
      ])
    ).values(),
  ];

  const transactionAccount = [
    ...new Map(
      transActionData?.map((transaction) => {
        const account = AccountData?.find(
          (acc) => acc.id === transaction.accountId
        );

        return [
          transaction.accountId,
          {
            value: transaction.accountId,
            label: account?.name ? account?.name : "",
          },
        ];
      })
    ).values(),
  ];

  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={2}
        gap={2}
      >
        <Box display={"flex"} gap={2} sx={{ width: "100%" }}>
          <DataTableFacetedFilter
            table={table}
            column="type"
            title="نوع تراکنش"
            options={transactionType || []}
          />
          <DataTableFacetedFilter
            table={table}
            column="accountId"
            title="حساب"
            options={transactionAccount || []}
          />
        </Box>
        <Box
          display={"flex"}
          sx={{ width: "100%" }}
          justifyContent={"end"}
          gap={2}
        >
          <Button
            variant="contained"
            disableRipple
            disableElevation
            endIcon={isSmall ? null : <Add />}
            onClick={() => setOpenAddTransaction(true)}
          >
            {isSmall ? <Add /> : "افزودن تراکنش"}
          </Button>
          <Button
            variant="contained"
            disabled
            disableRipple
            disableElevation
            endIcon={isSmall ? null : <FilterList />}
          >
            {isSmall ? <FilterList /> : "فیلتر"}
          </Button>
          <AddTransactionForm
            open={openAddTransaction}
            setOpen={setOpenAddTransaction}
          />
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}
