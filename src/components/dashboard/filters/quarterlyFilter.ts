import dayjs from "@/lib/dayjs";

export function quarterlyFilter() {
  return {
    label: "quarter",
    startDate: new Date(dayjs().startOf("quarter").toDate()).toISOString(),
    endDate: new Date().toISOString(),
    compareToLabel: "lastQuarter",
    compareStartDate: new Date(
      dayjs().startOf("quarter").subtract(1, "quarter").toDate()
    ).toISOString(),
    compareEndDate: new Date(
      dayjs().startOf("quarter").subtract(1, "day").toDate()
    ).toISOString(),
  };
}
