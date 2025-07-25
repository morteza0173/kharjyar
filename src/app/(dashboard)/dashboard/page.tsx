"use client";

import useGetAccount from "@/app/hooks/useGetAccount";
import { AccountListColumns } from "@/components/tableComponent/columns/AccountListColumns";
import { ReusableDataTable } from "@/components/tableComponent/ReusableDataTable";
import { AccountToolbar } from "@/components/tableComponent/toolbar/AccountToolbar";
import {
  Box,
  Card,
  Chip,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

function Page() {
  const query = useGetAccount();

  const { data, isPending } = query;

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center ">
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Grid
          container
          spacing={2}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            {isPending ? (
              <Skeleton variant="rectangular" height={120} width="100%" />
            ) : data ? (
              <Card
                variant="outlined"
                sx={{ height: "100%", flexGrow: 1, p: 2 }}
              >
                <Typography component="h2" variant="subtitle1" gutterBottom>
                  حساب مالی
                </Typography>
                <Stack
                  direction="column"
                  sx={{
                    justifyContent: "space-between",
                    flexGrow: "1",
                    gap: 1,
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography variant="subtitle2" component="p">
                      موجودی حساب :
                    </Typography>
                    <Chip
                      size="small"
                      color="success"
                      label={"2,000,000 تومان"}
                      sx={{
                        width: "fit-content",
                        bgcolor: "#E6F4EA",
                        color: "#2E7D32",
                      }}
                    />
                  </Stack>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    توضیحات اضافی
                  </Typography>
                </Stack>
              </Card>
            ) : (
              <Card
                variant="outlined"
                sx={{ height: "100%", flexGrow: 1, p: 2 }}
              >
                <Typography component="p" variant="subtitle1" gutterBottom>
                  حسابی ندارید
                </Typography>
              </Card>
            )}
          </Grid>
        </Grid>
        <ReusableDataTable
          query={query || []}
          columns={AccountListColumns}
          mobileVisibility={{ lessonName: false, remainingTime: false }}
          desktopVisibility={{ lessonName: true, remainingTime: true }}
        >
          {(table) => <AccountToolbar table={table} />}
        </ReusableDataTable>
      </Box>
    </div>
  );
}
export default Page;
