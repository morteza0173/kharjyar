"use client";
import useGetTransaction from "@/app/hooks/useGetTransaction";
import { TransActionDataTable } from "@/components/tableComponent/transactionDataTable/TransActionDataTable";
import { useTransactionColumns } from "@/components/tableComponent/transactionDataTable/TransactionListColumns";
import { TransActionToolbar } from "@/components/tableComponent/transactionDataTable/TransActionToolbar";
import { Box, Card, CardContent } from "@mui/material";

const Transactions = () => {
  const queryTransaction = useGetTransaction();

  const columns = useTransactionColumns();

  const mobileVisibility = {
    description: false,
    type: false,
  };
  return (
    <Card
      sx={{
        borderRadius: 5,
      }}
    >
      <CardContent sx={{ padding: { xs: 0 } }}>
        <Box sx={{ paddingX: { xs: 0, md: 2 }, width: "100%" }}>
          <Box>
            <TransActionDataTable
              query={queryTransaction}
              columns={columns}
              mobileVisibility={mobileVisibility}
            >
              {(tabel) => <TransActionToolbar table={tabel} />}
            </TransActionDataTable>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default Transactions;
