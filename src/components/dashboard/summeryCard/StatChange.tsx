import theme from "@/Providers/theme";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { memo } from "react";
import CountUp from "react-countup";

const StatChange = ({
  percentageChange,
  numberChange,
  type,
  startPercentageChange,
}: {
  percentageChange: number;
  numberChange: number;
  type: "income" | "expense" | "balance";
  startPercentageChange: number;
}) => {
  return (
    <Chip
      label={
        <CountUp
          key={percentageChange}
          start={startPercentageChange}
          end={percentageChange}
          duration={3}
          separator=","
          formattingFn={(num) =>
            typeof num === "number" ? num.toLocaleString("fa-IR") + "٪" : "۰٪"
          }
        />
      }
      icon={
        numberChange >= 0 ? (
          <ArrowUpward color="success" />
        ) : (
          <ArrowDownward color="error" />
        )
      }
      size="small"
      color={numberChange >= 0 ? "success" : "error"}
      sx={{
        width: "fit-content",
        fontSize: "0.75rem",
        backgroundColor:
          type === "expense"
            ? numberChange >= 0
              ? theme.palette.error.light
              : theme.palette.success.light
            : numberChange >= 0
            ? theme.palette.success.light
            : theme.palette.error.light,
        ".MuiChip-label": { pt: 0.3 },
      }}
    />
  );
};
export default memo(StatChange);
