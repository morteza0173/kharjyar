import theme from "@/Providers/theme";
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const MonthlyReportChart = () => {
  return (
    <Card sx={{ marginTop: 2, borderRadius: 5 }}>
      <CardContent>
        <Typography>نسبت هزینه ها به درآمد در یک سال اخیر</Typography>
        <BarChart
          margin={{ top: 0, bottom: 0, left: -30, right: 0 }}
          xAxis={[
            {
              data: [
                "شهریور 1403",
                "مهر 1403",
                "آبان 1403",
                "آذر 1403",
                "بهمن 1403",
                "دی 1403",
                "اسفند 1403",
                "فروردین 1404",
                "اردیبهشت 1404",
                "خرداد 1404",
                "تیر 1404",
                "مرداد 1404",
              ],
              categoryGapRatio: 0.6,
              barGapRatio: 0.2,
            },
          ]}
          series={[
            {
              data: [4, 3, 5, 1, 1, 4, 7, 8, 5, 1, 3, 4],
              color: theme.palette.success.light,
            },
            {
              data: [1, 6, 3, 4, 7, 5, 6, 9, 2, 1, 5, 4],
              color: theme.palette.error.light,
            },
          ]}
          height={300}
        />
      </CardContent>
    </Card>
  );
};
export default MonthlyReportChart;
