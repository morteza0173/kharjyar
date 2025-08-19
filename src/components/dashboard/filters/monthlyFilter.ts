import dayjs from "@/lib/dayjs";

export function monthlyFilter() {
  return {
    label: "month",
    startDate: new Date(dayjs().startOf("month").toDate()).toISOString(),
    endDate: new Date().toISOString(),
    compareToLabel: "lastMonth",
    compareStartDate: new Date(
      dayjs().startOf("month").subtract(1, "month").toDate()
    ).toISOString(),
    compareEndDate: new Date(
      dayjs().startOf("month").subtract(1, "day").toDate()
    ).toISOString(),
  };
}
