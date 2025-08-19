import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import CategoryList from "./CategoryList";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useState } from "react";
import ResponsiveModal from "../ui/ResponsiveModal";

const Category = () => {
  const [open, setOpen] = useState(false);

  const now = new Date();

  const monthName = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    month: "long",
  }).format(now);
  const year = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
  }).format(now);

  return (
    <Box>
      <Box
        sx={{ marginX: 2, marginBottom: 1 }}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <ResponsiveModal
          open={open}
          setOpen={setOpen}
          title="افزودن دسته بندی"
          formId="test"
          description="تست توضیحات"
        >
          <form id="test">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
            facere perspiciatis culpa saepe aliquam excepturi libero magnam?
            Explicab
          </form>
        </ResponsiveModal>
        <Button
          variant="contained"
          sx={{ fontSize: { xs: 8, md: 15 } }}
          onClick={() => setOpen(true)}
        >
          افزودن دسته‌بندی
        </Button>
        <Box display={"flex"} gap={1}>
          <Button
            variant="contained"
            sx={{ fontSize: { xs: 8, md: 15 } }}
            disabled
            startIcon={<ArrowRight />}
          >
            اطلاعات ماه بعد
          </Button>
          <Typography
            sx={{ marginTop: { xs: 1, md: 0.5 }, fontSize: { xs: 8, md: 15 } }}
          >{`${monthName} ${year}`}</Typography>
          <Button
            variant="contained"
            sx={{ fontSize: { xs: 8, md: 15 } }}
            disabled
            endIcon={<ArrowLeft />}
          >
            اطلاعات ماه قبل
          </Button>
        </Box>
      </Box>
      <Divider sx={{ marginY: 2 }} />
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {/* درآمد */}
        <Grid size={{ xs: 12, md: 12, lg: 6 }}>
          <CategoryList label="دسته بندی‌درامد‌ها" type="INCOME" />
        </Grid>
        {/* هزینه */}
        <Grid size={{ xs: 12, md: 12, lg: 6 }}>
          <CategoryList label="دسته بندی‌هزینه‌ها" type="EXPENSE" />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Category;
