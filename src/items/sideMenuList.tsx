import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { CategorySharp } from "@mui/icons-material";

export const mainListItems = [
  { text: "صفحه اصلی", icon: <HomeRoundedIcon />, href: "/dashboard" },
  {
    text: "حساب‌ها",
    icon: <PeopleRoundedIcon />,
    href: "/dashboard/accounts",
  },
  {
    text: "تراکنش‌ها",
    icon: <AnalyticsRoundedIcon />,
    href: "/dashboard/transactions",
  },
  {
    text: "بودجه",
    icon: <CategorySharp />,
    href: "/dashboard/category",
  },
  {
    text: "هزینه های ثابت",
    icon: <AssignmentRoundedIcon />,
    href: "/",
  },
];

export const secondaryListItems = [
  { text: "تنظیمات", icon: <SettingsRoundedIcon />, href: "/" },
  { text: "درباره ی من", icon: <InfoRoundedIcon />, href: "/" },
  { text: "امکانات سرویس", icon: <HelpRoundedIcon />, href: "/" },
];
