"use client";

import { useEffect } from "react";
import { indexeddb } from "@/lib/indexeddb";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Account, Transaction } from "@prisma/client";

async function createAccountApi(account: Account) {
  const formData = new FormData();
  formData.append("name", account.name);
  formData.append("description", account.description ?? "");
  formData.append("type", account.type);
  formData.append("balance", account.balance.toString());
  formData.append("id", account.id);

  const res = await fetch("/api/account/create", {
    method: "POST",
    body: formData,
  });
  const response = await res.json();
  if (!res.ok) throw new Error(response.error || "خطا در ساخت حساب");
  return response;
}

async function createTransactionApi(transaction: Transaction) {
  const formData = new FormData();
  formData.append("accountId", transaction.accountId);
  formData.append("description", transaction.description ?? "");
  formData.append("type", transaction.type);
  formData.append("balance", transaction.amount.toString());
  formData.append("id", transaction.id);
  formData.append("categoryId", transaction.categoryId);
  formData.append("date", transaction.date.toLocaleDateString());
  formData.append("userId", transaction.userId);

  const res = await fetch("/api/transactions/create", {
    method: "POST",
    body: formData,
  });
  const response = await res.json();
  if (!res.ok) throw new Error(response.error || "خطا در ساخت تراکنش");
  return response;
}

export default function SyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();

  const mutationAccount = useMutation({
    mutationKey: ["syncAccount"],
    mutationFn: createAccountApi,
    onSuccess: async (_data, variables) => {
      await indexeddb.pendingAccount.delete(variables.id);
      queryClient.invalidateQueries({
        queryKey: ["accounts", variables.userId],
      });
    },
  });

  const mutationTransaction = useMutation({
    mutationKey: ["syncTransaction"],
    mutationFn: createTransactionApi,
    onSuccess: async (_data, variables) => {
      await indexeddb.pendingTransactions.delete(variables.id);
      queryClient.invalidateQueries({
        queryKey: ["transaction", variables.userId],
      });
    },
  });

  const syncPendingAccounts = async () => {
    const pending = await indexeddb.pendingAccount.toArray();
    for (const account of pending) {
      mutationAccount.mutate(account);
    }
  };

  const syncPendingTransaction = async () => {
    const pending = await indexeddb.pendingTransactions.toArray();
    for (const transaction of pending) {
      mutationTransaction.mutate(transaction);
    }
  };

  useEffect(() => {
    syncPendingAccounts();
    syncPendingTransaction();
    window.addEventListener("online", syncPendingAccounts);
    return () => window.removeEventListener("online", syncPendingAccounts);
  }, []);

  return <>{children}</>;
}
