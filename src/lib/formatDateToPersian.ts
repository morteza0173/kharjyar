export function formatPersianDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
