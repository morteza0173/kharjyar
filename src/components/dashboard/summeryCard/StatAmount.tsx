import { Box, Typography } from "@mui/material";
import { memo } from "react";
import CountUp from "react-countup";

const StatAmount = ({
  amount,
  startAmount,
  color,
}: {
  amount: number;
  startAmount: number;
  color: string;
}) => {
  return (
    <Box display={"flex"} gap={2}>
      <CountUp
        key={amount}
        start={startAmount}
        end={amount}
        duration={3}
        separator=","
        formattingFn={(num) => num.toLocaleString("fa-IR")}
        style={{
          fontSize: "clamp(1rem, 1.4vw, 1.5rem)",
          fontWeight: "bold",
          color: color,
        }}
      />
      <Typography
        variant="h6"
        color={color}
        fontWeight="bold"
        fontSize={"clamp(1rem, 1.4vw, 1.5rem)"}
      >
        تومان
      </Typography>
    </Box>
  );
};
export default memo(StatAmount);
