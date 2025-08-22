"use client";
import { Grid } from "@mui/material";
import StatCard from "./StatCard";
import useGetTransaction from "@/app/hooks/useGetTransaction";
import dayjs from "@/lib/dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { useGetTotalBalance } from "@/app/hooks/useGetTotalBalance";

const SummaryCards = () => {
  const { data: transactions } = useGetTransaction();
  const totalBalance = useGetTotalBalance();

  const { startDate, endDate, label, compareStartDate } = useSelector(
    (state: RootState) => state.filterTime
  );

  const startOfCurrentTime = dayjs(startDate);
  const startOfCompareTime = dayjs(compareStartDate);

  const totalExpenceSelectedTime = transactions
    .filter(
      (tx) =>
        tx.type === "EXPENSE" &&
        dayjs(tx.date).isAfter(dayjs(startDate)) &&
        dayjs(tx.date).isBefore(dayjs(endDate))
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  const compareExpense = transactions
    .filter(
      (tx) =>
        tx.type === "EXPENSE" &&
        dayjs(tx.date).isAfter(dayjs(startOfCompareTime)) &&
        dayjs(tx.date).isBefore(dayjs(startOfCurrentTime))
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalIncomeSelectedTime = transactions
    .filter(
      (tx) =>
        tx.type === "INCOME" &&
        dayjs(tx.date).isAfter(dayjs(startDate)) &&
        dayjs(tx.date).isBefore(dayjs(endDate))
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  const compareIncome = transactions
    .filter(
      (tx) =>
        tx.type === "INCOME" &&
        dayjs(tx.date).isAfter(dayjs(startOfCompareTime)) &&
        dayjs(tx.date).isBefore(dayjs(startOfCurrentTime))
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  const currentMonthTransactions = transactions.filter((tx) =>
    dayjs(tx.date).isAfter(dayjs(startOfCurrentTime))
  );
  const totalChangeThisMonth = currentMonthTransactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  const lastMonthBalance = totalBalance - totalChangeThisMonth;

  return (
    <Grid container spacing={2} columns={12} sx={{ width: "100%" }}>
      <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
        <StatCard
          type="income"
          amount={totalIncomeSelectedTime}
          lastAmount={compareIncome}
          label={label}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
        <StatCard
          type="expense"
          amount={totalExpenceSelectedTime}
          lastAmount={compareExpense}
          label={label}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: "grow", md: "grow", lg: 4 }}>
        <StatCard
          type="balance"
          amount={totalBalance}
          lastAmount={lastMonthBalance}
          label={label}
        />
      </Grid>
    </Grid>
  );
};
export default SummaryCards;
