"use client";
import { Grid } from "@mui/material";
import StatCard from "./StatCard";
import useGetAccount from "@/app/hooks/useGetAccount";
import useGetTransaction from "@/app/hooks/useGetTransaction";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

const SummaryCards = () => {
  const { data: accounts = [] } = useGetAccount();
  const { data: transactions = [] } = useGetTransaction();

  const { startDate, endDate, label, compareStartDate } = useSelector(
    (state: RootState) => state.filterTime
  );

  const totalBalance =
    accounts?.reduce((acc, curr) => acc + curr.balance, 0) ?? 0;

  const startOfCurrentTime = dayjs(startDate);
  const startOfCompareTime = dayjs(compareStartDate);

  const totalExpenceSelectedTime = transactions
    .filter(
      (tx) =>
        tx.type === "EXPENSE" &&
        dayjs(tx.date).isAfter(startDate) &&
        dayjs(tx.date).isBefore(endDate)
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  const compareExpense = transactions
    .filter(
      (tx) =>
        tx.type === "EXPENSE" &&
        dayjs(tx.date).isAfter(startOfCompareTime) &&
        dayjs(tx.date).isBefore(startOfCurrentTime)
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalIncomeSelectedTime = transactions
    .filter(
      (tx) =>
        tx.type === "INCOME" &&
        dayjs(tx.date).isAfter(startDate) &&
        dayjs(tx.date).isBefore(endDate)
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  const compareIncome = transactions
    .filter(
      (tx) =>
        tx.type === "INCOME" &&
        dayjs(tx.date).isAfter(startOfCompareTime) &&
        dayjs(tx.date).isBefore(startOfCurrentTime)
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  const currentMonthTransactions = transactions.filter((tx) =>
    dayjs(tx.date).isAfter(startOfCurrentTime)
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
          transactionCount={2}
          categoryCount={1}
          label={label}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
        <StatCard
          type="expense"
          amount={totalExpenceSelectedTime}
          lastAmount={compareExpense}
          transactionCount={15}
          categoryCount={5}
          label={label}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: "grow", md: "grow", lg: 4 }}>
        <StatCard
          type="balance"
          amount={totalBalance}
          lastAmount={lastMonthBalance}
          transactionCount={17}
          categoryCount={6}
          label={label}
        />
      </Grid>
    </Grid>
  );
};
export default SummaryCards;
