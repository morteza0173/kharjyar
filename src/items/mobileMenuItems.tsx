import {
  AnalyticsRounded,
  CategorySharp,
  HomeFilled,
  PeopleRounded,
  ViewCompact,
} from "@mui/icons-material";

export const mobileMenuItems = [
  { label: "خانه", icon: <HomeFilled />, link: "/dashboard" },
  { label: "حساب‌ها", icon: <PeopleRounded />, link: "/dashboard/accounts" },
  {
    label: "تراکنش‌ها",
    icon: <AnalyticsRounded />,
    link: "/dashboard/transactions",
  },
  {
    label: "بودجه",
    icon: <CategorySharp />,
    link: "/dashboard/category",
  },
  { label: "سایر", icon: <ViewCompact />, link: "/test2" },
];
