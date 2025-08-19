"use client";
import theme from "@/Providers/theme";
import {
  AccountBalanceWallet,
  AttachMoney,
  MoneyOff,
} from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import StatAmount from "./StatAmount";
import StatChange from "./StatChange";
import StatDescription from "./StatDescription";

type StatType = "income" | "expense" | "balance";

interface StatCardProps {
  type: StatType;
  amount: number;
  lastAmount: number;
  transactionCount: number;
  categoryCount: number;
  label: string;
}

const config = {
  income: {
    title: "درآمد",
    color: theme.palette.success.main,
    bg: theme.palette.success.light,
    icon: <AttachMoney sx={{ fontSize: 24, color: "white" }} />,
  },
  expense: {
    title: "هزینه‌ها",
    color: theme.palette.error.main,
    bg: theme.palette.error.light,
    icon: <MoneyOff sx={{ fontSize: 24, color: "white" }} />,
  },
  balance: {
    title: "مانده حساب",
    color: theme.palette.info.main,
    bg: theme.palette.info.light,
    icon: <AccountBalanceWallet sx={{ fontSize: 24, color: "white" }} />,
  },
};

const StatCard = ({ type, amount, lastAmount, label }: StatCardProps) => {
  const { title, color, bg, icon } = config[type];

  const change = amount - lastAmount;
  const percentageChange = ((amount - lastAmount) / amount) * 100;

  const prevAmountRef = useRef(amount);
  const [startAmount, setStartAmount] = useState(amount);

  const prevPercentChangeRef = useRef(percentageChange);
  const [startPercentChange, setStartPercentChange] =
    useState(percentageChange);

  useEffect(() => {
    if (amount !== prevAmountRef.current) {
      setStartAmount(prevAmountRef.current);
      prevAmountRef.current = amount;
    }
  }, [amount]);

  useEffect(() => {
    if (percentageChange !== prevPercentChangeRef.current) {
      setStartPercentChange(prevPercentChangeRef.current);
      prevPercentChangeRef.current = percentageChange;
    }
  }, [percentageChange]);

  return (
    <Card sx={{ borderRadius: 5, height: "100%" }}>
      <CardContent sx={{ position: "relative", height: "100%" }}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          gap={2}
        >
          {/* بخش توضیحات */}
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              {title}
            </Typography>
            <StatAmount
              amount={amount}
              startAmount={startAmount}
              color={color}
            />
            <StatChange
              startPercentageChange={startPercentChange}
              percentageChange={percentageChange}
              numberChange={change}
              type={type}
            />
          </Box>

          {/* آیکون بالای کارت */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: { xs: " 150px", lg: "clamp(75px, 8vw, 150px)" },
              height: { xs: " 150px", lg: "clamp(75px, 8vw, 150px)" },
              backgroundColor: bg,
              opacity: 0.3,
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              zIndex: 2,
              backgroundColor: color,
              borderRadius: "50%",
              padding: "clamp(6px, 1.2vw, 12px)",
            }}
          >
            {icon}
          </Box>
        </Box>
        <Box sx={{ minHeight: 60, mt: 2 }}>
          <StatDescription label={label} change={change} type={type} />
        </Box>
      </CardContent>
    </Card>
  );
};
export default memo(StatCard);
