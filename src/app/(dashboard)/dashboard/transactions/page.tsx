"use client";
import useGetTransaction from "@/app/hooks/useGetTransaction";
import CategoryList from "@/components/categoryList/Category";
import { TransActionDataTable } from "@/components/tableComponent/transactionDataTable/TransActionDataTable";
import { useTransactionColumns } from "@/components/tableComponent/transactionDataTable/TransactionListColumns";
import { TransActionToolbar } from "@/components/tableComponent/transactionDataTable/TransActionToolbar";
import theme from "@/Providers/theme";
import { Box, Button, Card, CardContent } from "@mui/material";
import { useState } from "react";

const Transactions = () => {
  const [index, setIndex] = useState(1);
  const queryTransaction = useGetTransaction();

  const columns = useTransactionColumns();

  return (
    <div className="mt-10">
      <Card
        sx={{
          overflow: "visible",
          borderRadius: "0 20px 20px 20px",
        }}
      >
        <CardContent
          sx={{ position: "relative", overflow: "visible", padding: 0 }}
        >
          <Box
            position={"absolute"}
            className="testsvg"
            style={{ zIndex: index == 1 ? 5 : 1 }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: "20px 0 0 0",
                width: { xs: 120, md: 200 },
                height: { xs: 30, md: 41 },
                top: { xs: -30, md: -41 },
                fontSize: { xs: "0.5rem", md: "0.75rem" },
                position: "relative",
                bgcolor:
                  index == 1
                    ? theme.palette.background.paper
                    : theme.palette.grey[300],
                color:
                  index == 1
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                WebkitMaskImage:
                  'url("/svgtest.svg"), linear-gradient(black, black)',
                maskComposite: "exclude",
                maskRepeat: "no-repeat",
                maskPosition: "right center",
              }}
              onClick={() => setIndex(1)}
            >
              تراکنش ها
            </Button>
          </Box>
          <Box
            position={"absolute"}
            left={{ xs: "120px", md: "200px" }}
            className="testsvg"
            style={{ zIndex: index == 2 ? 5 : 2 }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                width: { xs: 120, md: 200 },
                height: { xs: 30, md: 41 },
                top: { xs: -30, md: -41 },
                fontSize: { xs: "0.5rem", md: "0.75rem" },
                borderRadius: "10px 0 0 0",
                bgcolor:
                  index == 2
                    ? theme.palette.background.paper
                    : theme.palette.grey[300],
                color:
                  index == 2
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                position: "relative",
                left: "-15px",
                WebkitMaskImage:
                  'url("/svgtest.svg"), linear-gradient(black, black)',
                maskComposite: "exclude",
                maskRepeat: "no-repeat",
                maskPosition: "right center",
                overflow: "visible",
              }}
              onClick={() => setIndex(2)}
            >
              دسته بندی ها
            </Button>
          </Box>
          <Box
            position={"absolute"}
            left={{ xs: "240px", md: "400px" }}
            className="testsvg"
            style={{ zIndex: index == 3 ? 5 : 1 }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                width: { xs: 120, md: 200 },
                height: { xs: 30, md: 41 },
                top: { xs: -30, md: -41 },
                fontSize: { xs: "0.5rem", md: "0.75rem" },
                borderRadius: "10px 0 0 0",
                position: "relative",
                left: "-25px",
                bgcolor:
                  index == 3
                    ? theme.palette.background.paper
                    : theme.palette.grey[300],
                color:
                  index == 3
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                WebkitMaskImage:
                  'url("/svgtest.svg"), linear-gradient(black, black)',
                maskComposite: "exclude",
                maskRepeat: "no-repeat",
                maskPosition: "right center",
              }}
              onClick={() => setIndex(3)}
            >
              حساب ها
            </Button>
          </Box>
          <Box sx={{ paddingX: { xs: 0, md: 2 }, width: "100%" }}>
            {index == 1 && (
              <Box sx={{ paddingY: 3 }}>
                <TransActionDataTable
                  query={queryTransaction}
                  columns={columns}
                >
                  {(tabel) => <TransActionToolbar table={tabel} />}
                </TransActionDataTable>
              </Box>
            )}
            {index == 2 && (
              <Box sx={{ paddingY: 3, width: "100%" }}>
                <CategoryList />
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
export default Transactions;
