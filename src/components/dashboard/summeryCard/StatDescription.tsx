import { formatPrice } from "@/lib/formatPrice";
import { Box, Typography } from "@mui/material";

interface setDescriptionProps {
  label: string;
  change: number;
  type: "income" | "expense" | "balance";
}

const StatDescription = ({ label, change, type }: setDescriptionProps) => {
  const timeLabel =
    label === "month" ? "ماه" : label === "week" ? "هفته" : "فصل";

  if (label === "custom") {
    return (
      <Typography variant="caption" color="textSecondary">
        {`در این بازه زمانی نسبت به بازه زمانی قبل مبلغ `}
        {formatPrice(Math.abs(change))}{" "}
        <Box component="span" sx={{ fontWeight: "bold", display: "inline" }}>
          {change >= 0 ? "افزایش" : "کاهش"}{" "}
          {type === "balance"
            ? "موجودی"
            : type === "expense"
            ? "هزینه"
            : "درآمد"}
        </Box>{" "}
        داشته‌اید.
      </Typography>
    );
  }

  return (
    <Typography variant="caption" color="textSecondary">
      {`این ${timeLabel} نسبت به ${timeLabel} قبل مبلغ `}
      {formatPrice(Math.abs(change))}{" "}
      <Box component="span" sx={{ fontWeight: "bold", display: "inline" }}>
        {change >= 0 ? "افزایش" : "کاهش"}{" "}
        {type === "balance" ? "موجودی" : type === "expense" ? "هزینه" : "درآمد"}
      </Box>{" "}
      داشته‌اید.
    </Typography>
  );
};
export default StatDescription;
