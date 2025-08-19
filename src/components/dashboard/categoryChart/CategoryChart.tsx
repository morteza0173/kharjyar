import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import {
  pieArcClasses,
  PieChart,
  PieChartProps,
  pieClasses,
  rainbowSurgePalette,
} from "@mui/x-charts";

const CategoryChart = () => {
  const theme = useTheme();
  const palette = rainbowSurgePalette(theme.palette.mode);
  const data1 = [
    { label: "Group A", value: 400, color: palette[4] },
    { label: "Group B", value: 300, color: palette[4] },
    { label: "Group C", value: 300, color: palette[4] },
    { label: "Group D", value: 200, color: palette[4] },
  ];
  const data2 = [
    { label: "A1", value: 100, color: palette[2] },
    { label: "A2", value: 300, color: palette[2] },
    { label: "B1", value: 100, color: palette[2] },
    { label: "B2", value: 80, color: palette[2] },
    { label: "B3", value: 40, color: palette[2] },
    { label: "B4", value: 30, color: palette[2] },
    { label: "B5", value: 50, color: palette[2] },
    { label: "C1", value: 100, color: palette[2] },
    { label: "C2", value: 200, color: palette[2] },
    { label: "D1", value: 150, color: palette[2] },
    { label: "D2", value: 50, color: palette[2] },
  ];

  const settings = {
    series: [
      {
        innerRadius: 40,
        outerRadius: 80,
        data: data1,
        highlightScope: { fade: "global", highlight: "item" },
      },
      {
        id: "outer",
        innerRadius: 100,
        outerRadius: 120,
        data: data2,
        highlightScope: { fade: "global", highlight: "item" },
      },
    ],
    height: 300,
    hideLegend: true,
  } satisfies PieChartProps;

  return (
    <Card sx={{ borderRadius: 5, height: "100%" }}>
      <CardContent>
        <Typography>هزینه‌ها و درآمد‌ها در ماه تیر</Typography>
        <Grid
          container
          spacing={2}
          columns={10}
          sx={{ padding: { xs: 0, md: 0 } }}
        >
          <Grid size={{ xs: 10, md: 5, lg: 10 }}>
            <PieChart
              {...settings}
              sx={{
                [`.${pieClasses.series}[data-series="outer"] .${pieArcClasses.root}`]:
                  {
                    opacity: 0.6,
                  },
              }}
            />
          </Grid>
          <Grid size={{ xs: 10, md: 5, lg: 10 }}>
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              <Box display={"flex"} gap={2} justifyContent="space-evenly">
                <Box display={"flex"} gap={1}>
                  <Box
                    width={20}
                    height={20}
                    borderRadius={50}
                    bgcolor={theme.palette.error.main}
                    sx={{ opacity: 0.6 }}
                  />
                  <Typography variant="caption">هزینه‌ها</Typography>
                </Box>
                <Box display={"flex"} gap={1}>
                  <Box
                    width={20}
                    height={20}
                    borderRadius={50}
                    bgcolor={theme.palette.success.main}
                    sx={{ opacity: 0.6 }}
                  />
                  <Typography variant="caption">درآمد‌ها</Typography>
                </Box>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Typography variant="caption" fontWeight={"bold"}>
                  بیشترین هزینه‌ها و درآمدها در ماه تیر به شرح زیر است
                </Typography>
              </Box>
              <IncomeAndExpenceList
                label="حقوق"
                amount={2560000}
                persent={76}
                color="success"
              />
              <IncomeAndExpenceList
                label="سود سهام"
                amount={389560}
                persent={24}
                color="success"
              />
              <IncomeAndExpenceList
                label="مترو و کرایه"
                amount={1120000}
                persent={56}
                color="error"
              />
              <IncomeAndExpenceList
                label="خوراک"
                amount={756000}
                persent={36}
                color="error"
              />
              <IncomeAndExpenceList
                label="کرایه خانه"
                amount={500000}
                persent={20}
                color="error"
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default CategoryChart;

function IncomeAndExpenceList({
  label,
  amount,
  persent,
  color,
}: {
  label: string;
  amount: number;
  persent: number;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
}) {
  return (
    <Box
      display={"flex"}
      gap={1}
      justifyContent={"space-between"}
      alignItems={"baseline"}
    >
      <Box display={"flex"} gap={1} alignItems={"baseline"}>
        <Chip
          label={`% ${persent}`}
          size="small"
          color={color}
          sx={{
            width: "fit-content",
            fontSize: "0.6rem",
            opacity: 0.6,
            ".MuiChip-label": { pt: 0.3 },
          }}
        />
        <Typography variant="subtitle2">{label}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle2">
          {amount.toLocaleString("Fa")} تومان
        </Typography>
      </Box>
    </Box>
  );
}
