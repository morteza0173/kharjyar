import {
  AnalyticsRounded,
  HomeFilled,
  PeopleRounded,
  ViewCompact,
} from "@mui/icons-material";

export const mobileMenuItems = [
  { label: "صفحه اصلی", icon: <HomeFilled />, link: "/dashboard" },
  { label: "حساب‌ها", icon: <PeopleRounded />, link: "/dashboard/accounts" },
  { label: "وسط برای افزودن تراکنش", icon: <PeopleRounded />, link: "/" },
  { label: "تراکنش‌ها", icon: <AnalyticsRounded />, link: "/test2" },
  { label: "سایر", icon: <ViewCompact />, link: "/test2" },
];
