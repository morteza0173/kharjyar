import useGetTransaction from "@/app/hooks/useGetTransaction";
import { iconMap } from "@/lib/dataLabel";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Category } from "@prisma/client";
import dayjs from "@/lib/dayjs";
import { formatPrice } from "@/lib/formatPrice";
import { Delete, EditSharp } from "@mui/icons-material";

type categoryProps = {
  category: Category;
};
const CategoryItem = ({ category }: categoryProps) => {
  const { data: transactionData } = useGetTransaction();

  const theme = useTheme();

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { name, description, buget, icon, type, id } = category;
  const Icon = iconMap[icon];

  const now = new Date();

  const monthName = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    month: "long",
  }).format(now);

  const transactionMonth = transactionData?.filter(
    (transaction) =>
      new Date(dayjs().startOf("month").toISOString()) <=
      new Date(transaction.date)
  );

  const expenseTransaction = transactionMonth
    ?.filter((transaction) => transaction.type == "EXPENSE")
    .reduce((prev, transaction) => prev + transaction.amount, 0);

  const incomeTransaction = transactionMonth
    ?.filter((transaction) => transaction.type == "INCOME")
    .reduce((prev, transaction) => prev + transaction.amount, 0);

  const totalExpenseMonth = transactionMonth
    ?.filter((transaction) => transaction.type == "EXPENSE")
    .filter((transaction) => transaction.categoryId == id)
    .reduce((prev, transaction) => prev + transaction.amount, 0);
  const totalIncomeMonth = transactionMonth
    ?.filter((transaction) => transaction.type == "INCOME")
    .filter((transaction) => transaction.categoryId == id)
    .reduce((prev, transaction) => prev + transaction.amount, 0);

  const expensePercent = totalExpenseMonth
    ? expenseTransaction
      ? (totalExpenseMonth / expenseTransaction) * 100
      : 0
    : 0;
  const incomePercent = totalIncomeMonth
    ? incomeTransaction
      ? (totalIncomeMonth / incomeTransaction) * 100
      : 0
    : 0;

  const bugetPercent = buget
    ? totalExpenseMonth
      ? (totalExpenseMonth / buget) * 100
      : 0
    : 0;

  return (
    <Card
      sx={{
        borderRadius: 5,
        borderLeft: "4px solid",
        borderColor: type === "EXPENSE" ? "error.light" : "success.light",
      }}
    >
      <CardContent>
        <Box position="relative">
          <Box
            sx={{
              position: "absolute",
              left: isSmall ? 100 : 200,
              top: isSmall ? 0 : -40,
              opacity: 0.05,
              fontSize: isSmall ? 100 : 200,
              zIndex: 0,
              pointerEvents: "none",
              transform: "translateX(50%) rotate(-25deg)",
            }}
          >
            <Icon fontSize="inherit" />
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"} gap={1}>
                <Icon
                  fontSize="small"
                  color={type === "EXPENSE" ? "error" : "success"}
                />
                <Typography variant="subtitle2">{name}</Typography>
              </Box>
              <Box display={"flex"} gap={1}>
                <EditSharp
                  color="secondary"
                  sx={{ opacity: 0.6 }}
                  fontSize="small"
                />
                <Delete
                  color="secondary"
                  sx={{ opacity: 0.6 }}
                  fontSize="small"
                />
              </Box>
            </Box>
            <Typography variant="caption">{description}</Typography>
            <Grid container spacing={2} width={"100%"}>
              <Grid size={6}>
                <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                  <Typography variant="caption" fontWeight={"bold"}>
                    {type == "EXPENSE"
                      ? `هزینه ${monthName} ماه : ${formatPrice(
                          totalExpenseMonth ? totalExpenseMonth : 0
                        )}`
                      : `درآمد ${monthName} ماه : ${formatPrice(
                          totalIncomeMonth ? totalIncomeMonth : 0
                        )}`}
                  </Typography>
                  {type === "EXPENSE" && (
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      mt={1}
                      gap={1}
                    >
                      <Typography variant="caption" fontWeight={"bold"}>
                        بودجه ماهانه : {formatPrice(buget ? buget : 0)}
                      </Typography>
                      <Box display={"flex"} gap={1}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            width: "100%",
                            fontSize: { xs: 8, md: 15 },
                          }}
                        >
                          ویرایش بودجه
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            width: "100%",
                            fontSize: { xs: 8, md: 15 },
                          }}
                        >
                          حذف بودجه
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid size={6}>
                <Box
                  display={"flex"}
                  justifyContent="flex-end"
                  gap={1}
                  sx={{ marginBottom: 2 }}
                  width={"100%"}
                >
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size={isSmall ? 60 : 100}
                      thickness={5}
                      sx={{
                        color: "lightgray",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        zIndex: 1,
                      }}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={type == "EXPENSE" ? expensePercent : incomePercent}
                      size={isSmall ? 60 : 100}
                      thickness={5}
                      color={type == "EXPENSE" ? "error" : "success"}
                      sx={{
                        position: "relative",
                        zIndex: 2,
                        "& .MuiCircularProgress-circle": {
                          strokeLinecap: "round",
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      component="div"
                      fontWeight={"bold"}
                      fontSize={{ xs: "0.5rem", sm: "0.75rem" }}
                      sx={{
                        color: "text.secondary",
                        position: "absolute",
                        right: isSmall ? 30 : 50,
                        top: isSmall ? 25 : 42,
                        transform: "translateX(50%)",
                      }}
                    >{`${Math.round(
                      type == "EXPENSE" ? expensePercent : incomePercent
                    )}%`}</Typography>
                    <Typography
                      variant="caption"
                      fontWeight={"bold"}
                      sx={{
                        color: "text.secondary",
                        position: "absolute",
                        right: isSmall ? 18 : 35,
                        top: isSmall ? 65 : 105,
                      }}
                    >
                      {type == "EXPENSE" ? "هزینه" : "درآمد"}
                    </Typography>
                  </Box>
                  {type == "EXPENSE" && buget && buget > 0 && (
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                      <CircularProgress
                        variant="determinate"
                        value={100}
                        size={isSmall ? 60 : 100}
                        thickness={5}
                        sx={{
                          color: "lightgray",
                          position: "absolute",
                          left: 0,
                          top: 0,
                          zIndex: 1,
                        }}
                      />
                      <CircularProgress
                        variant="determinate"
                        value={bugetPercent <= 100 ? bugetPercent : 100}
                        size={isSmall ? 60 : 100}
                        thickness={5}
                        color={
                          bugetPercent
                            ? bugetPercent < 30
                              ? "success"
                              : bugetPercent < 70
                              ? "warning"
                              : "error"
                            : "success"
                        }
                        sx={{
                          position: "relative",
                          zIndex: 2,
                          "& .MuiCircularProgress-circle": {
                            strokeLinecap: "round",
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        component="div"
                        fontWeight={"bold"}
                        fontSize={{ xs: "0.5rem", sm: "0.75rem" }}
                        sx={{
                          color: "text.secondary",
                          position: "absolute",
                          right: isSmall ? 30 : 50,
                          top: isSmall ? 25 : 42,
                          transform: "translateX(50%)",
                        }}
                      >{`${Math.round(bugetPercent)}%`}</Typography>
                      <Typography
                        variant="caption"
                        fontWeight={"bold"}
                        sx={{
                          color: "text.secondary",
                          position: "absolute",
                          right: isSmall ? 18 : 35,
                          top: isSmall ? 65 : 105,
                        }}
                      >
                        بودجه
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default CategoryItem;
