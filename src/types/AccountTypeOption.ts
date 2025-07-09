import {
  AccountBalance,
  AccountBalanceWallet,
  Savings,
  Wallet,
} from "@mui/icons-material";
import { CreateAccountSchema } from "./schema";

export const accountTypeOption: {
  value: CreateAccountSchema["type"];
  title: string;
  description: string;
  icon: typeof AccountBalance;
}[] = [
  {
    value: "BANK",
    title: "کارت بانکی",
    description: "حساب‌های بانکی رسمی",
    icon: AccountBalance,
  },
  {
    value: "CASH",
    title: "کیف پول",
    description: "پول‌های نقدی که دارید",
    icon: AccountBalanceWallet,
  },
  {
    value: "SAVINGS",
    title: "پس‌انداز",
    description: "مخصوص اهداف بلندمدت",
    icon: Savings,
  },
  {
    value: "OTHER",
    title: "سایر",
    description: "سایر حساب های متفرقه",
    icon: Wallet,
  },
];

export type AccountTypeOption = (typeof accountTypeOption)[number];
