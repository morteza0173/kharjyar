import dayjs from "@/lib/dayjs";

export function weeklyFilter() {
  return {
    label: "week",
    startDate: new Date(dayjs().startOf("week").toDate()).toISOString(),
    endDate: new Date().toISOString(),
    compareToLabel: "lastWeek",
    compareStartDate: new Date(
      dayjs().startOf("week").subtract(1, "week").toDate()
    ).toISOString(),
    compareEndDate: new Date(
      dayjs().startOf("week").subtract(1, "day").toDate()
    ).toISOString(),
  };
}
