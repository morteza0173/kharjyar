"use client";

import useGetTransaction from "@/app/hooks/useGetTransaction";
import CategoryChart from "@/components/dashboard/categoryChart/CategoryChart";
import Timefilter from "@/components/dashboard/filters/Timefilter";
import MonthlyReportChart from "@/components/dashboard/MonthlyReportChart/MonthlyReportChart";
import SummaryCards from "@/components/dashboard/summeryCard/SummaryCards";
import { useTransactionColumns } from "@/components/tableComponent/transactionDataTable/TransactionListColumns";
import { TransActionDataTable } from "@/components/tableComponent/transactionDataTable/TransActionDataTable";
import { TransActionToolbar } from "@/components/tableComponent/transactionDataTable/TransActionToolbar";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import AddFloatButton from "@/components/dashboard/AddFloatButton";

function Page() {
  const queryTransaction = useGetTransaction();

  const columns = useTransactionColumns();

  return (
    <Box>
      <AddFloatButton />
      <Grid container spacing={2} sx={{ padding: { xs: 0, md: 0 } }}>
        <Grid size={{ xs: 12, md: 12, lg: 8 }}>
          <Timefilter />
          <SummaryCards />
          <MonthlyReportChart />
        </Grid>
        <Grid size={{ xs: 12, md: 12, lg: 4 }}>
          <CategoryChart />
        </Grid>
      </Grid>
      <Box sx={{ paddingTop: 2 }}>
        <Card sx={{ borderRadius: 5 }}>
          <CardContent sx={{ padding: 0 }}>
            <Typography sx={{ padding: 2 }}>لیست تراکنش های اخیر</Typography>
            <TransActionDataTable query={queryTransaction} columns={columns}>
              {(tabel) => <TransActionToolbar table={tabel} />}
            </TransActionDataTable>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
export default Page;
