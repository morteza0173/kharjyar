"use client";

import { useEffect } from "react";
import { indexeddb } from "@/lib/indexeddb";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Account } from "@prisma/client";

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

export default function SyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["syncAccount"],
    mutationFn: createAccountApi,
    onSuccess: async (_data, variables) => {
      await indexeddb.pendingAccount.delete(variables.id);
      queryClient.invalidateQueries({
        queryKey: ["accounts", variables.userId],
      });
    },
  });

  const syncPendingAccounts = async () => {
    const pending = await indexeddb.pendingAccount.toArray();
    for (const account of pending) {
      mutation.mutate(account);
    }
  };

  useEffect(() => {
    syncPendingAccounts();
    window.addEventListener("online", syncPendingAccounts);
    return () => window.removeEventListener("online", syncPendingAccounts);
  }, []);

  return <>{children}</>;
}
