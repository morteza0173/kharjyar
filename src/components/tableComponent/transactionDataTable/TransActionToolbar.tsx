"use client";
import { Box, Button, Divider } from "@mui/material";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "../DataTableFacetedFilter";
import useGetTransaction from "@/app/hooks/useGetTransaction";
import { transactionTypeLabels } from "@/lib/dataLabel";
import useGetAccount from "@/app/hooks/useGetAccount";
import { AddCircleOutline } from "@mui/icons-material";
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
        flexDirection={{ xs: "column-reverse", md: "row" }}
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
          flexDirection={{ xs: "column-reverse", md: "row" }}
          sx={{ width: "100%" }}
          justifyContent={"end"}
        >
          <Button
            variant="contained"
            disableRipple
            disableElevation
            endIcon={<AddCircleOutline />}
            onClick={() => setOpenAddTransaction(true)}
          >
            افزودن تراکنش
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
