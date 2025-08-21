import {
  AccountBalance,
  CreditCard,
  LocalAtm,
  ShoppingCart,
} from "@mui/icons-material";
import { AddTransactionSchema } from "./schema";

export const TransactionType: {
  value: AddTransactionSchema["type"];
  title: string;
  icon: typeof AccountBalance;
}[] = [
  {
    value: "EXPENSE",
    title: "هزینه",
    icon: ShoppingCart,
  },
  {
    value: "INCOME",
    title: "درآمد",
    icon: LocalAtm,
  },
  {
    value: "TOACCOUNT",
    title: "انتقال به خودم",
    icon: CreditCard,
  },
];

export type TransactionTypeOption = (typeof TransactionType)[number];
