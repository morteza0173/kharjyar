import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { lazy, LazyExoticComponent } from "react";
export const accountTypeLabels: Record<string, string> = {
  CASH: "نقدی",
  BANK: "بانک",
  CRYPTO: "رمز ارز",
  STOCK: "سهام",
  WALLET: "کیف پول مجازی",
  SAVINGS: "پس انداز",
  OTHER: "سایر",
};

export const transactionTypeLabels: Record<string, string> = {
  EXPENSE: "هزینه‌ها",
  INCOME: "درآمدها",
  TOACCOUNT: "به حساب خودم",
};

export const filterTimeLabels: Record<string, string> = {
  ماهانه: "month",
  هفتگی: "week",
  فصلی: "quarter",
  "زمان دلخواه": "custom",
};

export function translateErrors(message: string): string {
  const normalized = message.toLowerCase();

  if (
    normalized.includes(
      "a user with this email address has already been registered"
    )
  ) {
    return "این ایمیل قبلا ثبت شده است.";
  }

  if (normalized.includes("password should be at least 6 characters")) {
    return "رمز عبور باید حداقل ۶ کاراکتر باشد.";
  }

  if (normalized.includes("invalid login credentials")) {
    return "ایمیل یا رمز عبور اشتباه است.";
  }

  if (normalized.includes("email is invalid")) {
    return "ایمیل وارد شده معتبر نیست.";
  }

  return "خطایی رخ داده است. لطفاً دوباره تلاش کنید.";
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MuiIconType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};
export type LazyMuiIcon = LazyExoticComponent<MuiIconType>;

export const iconMap: Record<string, LazyMuiIcon> = {
  AccountBalanceWallet: lazy(
    () => import("@mui/icons-material/AccountBalanceWallet")
  ),
  AddShoppingCart: lazy(() => import("@mui/icons-material/AddShoppingCart")),
  Agriculture: lazy(() => import("@mui/icons-material/Agriculture")),
  AirportShuttle: lazy(() => import("@mui/icons-material/AirportShuttle")),
  Attractions: lazy(() => import("@mui/icons-material/Attractions")),
  AutoStories: lazy(() => import("@mui/icons-material/AutoStories")),
  BatteryCharging80: lazy(
    () => import("@mui/icons-material/BatteryCharging80")
  ),
  Bed: lazy(() => import("@mui/icons-material/Bed")),
  BeachAccess: lazy(() => import("@mui/icons-material/BeachAccess")),
  Blender: lazy(() => import("@mui/icons-material/Blender")),
  Blind: lazy(() => import("@mui/icons-material/Blind")),
  Bolt: lazy(() => import("@mui/icons-material/Bolt")),
  Build: lazy(() => import("@mui/icons-material/Build")),
  BusinessCenter: lazy(() => import("@mui/icons-material/BusinessCenter")),
  Cabin: lazy(() => import("@mui/icons-material/Cabin")),
  CameraAlt: lazy(() => import("@mui/icons-material/CameraAlt")),
  Campaign: lazy(() => import("@mui/icons-material/Campaign")),
  CarRepair: lazy(() => import("@mui/icons-material/CarRepair")),
  Carpenter: lazy(() => import("@mui/icons-material/Carpenter")),
  Casino: lazy(() => import("@mui/icons-material/Casino")),
  CatchingPokemon: lazy(() => import("@mui/icons-material/CatchingPokemon")),
  Category: lazy(() => import("@mui/icons-material/Category")),
  Celebration: lazy(() => import("@mui/icons-material/Celebration")),
  Chair: lazy(() => import("@mui/icons-material/Chair")),
  ChildFriendly: lazy(() => import("@mui/icons-material/ChildFriendly")),
  Checkroom: lazy(() => import("@mui/icons-material/Checkroom")),
  ChildCare: lazy(() => import("@mui/icons-material/ChildCare")),
  Church: lazy(() => import("@mui/icons-material/Church")),
  CleanHands: lazy(() => import("@mui/icons-material/CleanHands")),
  Coffee: lazy(() => import("@mui/icons-material/Coffee")),
  CurrencyBitcoin: lazy(() => import("@mui/icons-material/CurrencyBitcoin")),
  CurrencyExchange: lazy(() => import("@mui/icons-material/CurrencyExchange")),
  DateRange: lazy(() => import("@mui/icons-material/DateRange")),
  DeliveryDining: lazy(() => import("@mui/icons-material/DeliveryDining")),
  DirectionsTransit: lazy(
    () => import("@mui/icons-material/DirectionsTransit")
  ),
  FavoriteBorder: lazy(() => import("@mui/icons-material/FavoriteBorder")),
  FitnessCenter: lazy(() => import("@mui/icons-material/FitnessCenter")),
  Flatware: lazy(() => import("@mui/icons-material/Flatware")),
  Forest: lazy(() => import("@mui/icons-material/Forest")),
  Paid: lazy(() => import("@mui/icons-material/Paid")),
  ShoppingCart: lazy(() => import("@mui/icons-material/ShoppingCart")),
  Shower: lazy(() => import("@mui/icons-material/Shower")),
  Star: lazy(() => import("@mui/icons-material/Star")),
  Fastfood: lazy(() => import("@mui/icons-material/Fastfood")),
  Redeem: lazy(() => import("@mui/icons-material/Redeem")),
};
