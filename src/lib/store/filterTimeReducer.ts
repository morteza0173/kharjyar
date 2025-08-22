import { createSlice } from "@reduxjs/toolkit";
import dayjs from "@/lib/dayjs";

export interface FilterTime {
  label: "week" | "month" | "quarter" | "custom";
  startDate: string;
  endDate: string;
  compareToLabel?: "lastWeek" | "lastMonth" | "lastQuarter" | "custom";
  compareStartDate?: string;
  compareEndDate?: string;
}

const initialState: FilterTime = {
  label: "month",
  startDate: new Date(dayjs().startOf("month").toDate()).toISOString(),
  endDate: dayjs().endOf("month").endOf("day").toISOString(),
  compareToLabel: "lastMonth",
  compareStartDate: new Date(
    dayjs().startOf("month").subtract(1, "month").toDate()
  ).toISOString(),
  compareEndDate: new Date(
    dayjs().startOf("month").subtract(1, "day").toDate()
  ).toISOString(),
};

export const filterTimeSlice = createSlice({
  name: "filterTime",
  initialState,
  reducers: {
    setFilterTime: (state, action) => {
      const {
        label,
        startDate,
        endDate,
        compareToLabel,
        compareStartDate,
        compareEndDate,
      } = action.payload;
      state.label = label;
      state.startDate = startDate;
      state.endDate = endDate;
      state.compareToLabel = compareToLabel;
      state.compareStartDate = compareStartDate;
      state.compareEndDate = compareEndDate;
    },
  },
});

export const { setFilterTime } = filterTimeSlice.actions;

export default filterTimeSlice.reducer;
