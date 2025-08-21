import { Account, Category, Transaction } from "@prisma/client";
import Dexie, { type EntityTable } from "dexie";

export const indexeddb = new Dexie("FriendsDatabase") as Dexie & {
  transactions: EntityTable<Transaction, "id">;
  account: EntityTable<Account, "id">;
  category: EntityTable<Category, "id">;
  pendingAccount: EntityTable<Account, "id">;
  pendingTransactions: EntityTable<Transaction, "id">;
  pendingCategory: EntityTable<Category, "id">;
};

indexeddb.version(1).stores({
  transactions: "++id, amount, description , type , date , categoryId",
  account: "++id , type",
  category: "++id ,type",
  pendingAccount: "++id , type",
  pendingTransactions: "++id, amount, description , type , date , categoryId",
  pendingCategory: "++id , type",
});
