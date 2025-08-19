import { Box, Button, Divider } from "@mui/material";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "../DataTableFacetedFilter";
import useGetTransaction from "@/app/hooks/useGetTransaction";
import { transactionTypeLabels } from "@/lib/dataLabel";
import useGetAccount from "@/app/hooks/useGetAccount";
import theme from "@/Providers/theme";
import { AddCircleOutline } from "@mui/icons-material";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function TransActionToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { data: transActionData } =
    useGetTransaction();
  const { data: AccountData } = useGetAccount();

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
        flexDirection={{ xs: "column-reverse", lg: "row" }}
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
          flexDirection={{ xs: "column-reverse", lg: "row" }}
          sx={{ width: "100%" }}
          justifyContent={"end"}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "white",
              color: theme.palette.text.primary,
              border: "1px solid black",
              boxShadow: "none",
              width: { xs: "100%", lg: "auto" },
            }}
            endIcon={<AddCircleOutline />}
          >
            افزودن تراکنش
          </Button>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}
