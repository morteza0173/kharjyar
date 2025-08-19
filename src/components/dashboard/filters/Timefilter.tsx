"use client";
import { filterTimeLabels } from "@/lib/dataLabel";
import { setFilterTime } from "@/lib/store/filterTimeReducer";
import { RootState } from "@/lib/store/store";
import theme from "@/Providers/theme";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { quarterlyFilter } from "./quarterlyFilter";
import { monthlyFilter } from "./monthlyFilter";
import { weeklyFilter } from "./weeklyFilter";

const Timefilter = () => {
  const filterTimeLabel = useSelector(
    (state: RootState) => state.filterTime.label
  );
  const dispatch = useDispatch();

  const filters = [
    {
      label: "هفتگی",
      onClick: () => dispatch(setFilterTime(weeklyFilter())),
    },
    {
      label: "ماهانه",
      onClick: () => dispatch(setFilterTime(monthlyFilter())),
    },
    {
      label: "فصلی",
      onClick: () => dispatch(setFilterTime(quarterlyFilter())),
    },
    {
      label: "زمان دلخواه",
      onClick: () => {},
    },
  ];

  return (
    <Box padding={2} paddingTop={0}>
      <Box
        display="flex"
        gap={1}
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          overflowX: "auto",
          scrollbarWidth: "none", // برای Firefox
          msOverflowStyle: "none", // برای IE و Edge
          "&::-webkit-scrollbar": {
            display: "none", // برای Chrome و Safari
          },
        }}
        pb={1}
      >
        <Box>
          <Typography
            variant="caption"
            color="text.primary"
            fontSize={{ xs: 10, md: 14 }}
            fontWeight="bold"
            sx={{ textWrap: "nowrap" }}
          >
            فیلتر براساس:
          </Typography>
        </Box>

        {filters.map((filter) => {
          const { label, onClick } = filter;
          return (
            <Button
              key={label}
              onClick={onClick}
              variant="contained"
              color={
                filterTimeLabel === filterTimeLabels[label]
                  ? "primary"
                  : "inherit"
              }
              disabled={label == "زمان دلخواه"}
              sx={{
                flex: "1 1 auto",
                minWidth: "80px",
                bgcolor:
                  filterTimeLabel === filterTimeLabels[label]
                    ? theme.palette.primary.main
                    : "white",
                px: 2,
                py: 1,
                fontSize: { xs: 10, md: 14 },

                borderRadius: 2,
                textWrap: "nowrap",
              }}
            >
              {label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default Timefilter;
