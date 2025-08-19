"use client";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@prisma/client";
import { indexeddb } from "@/lib/indexeddb";
import { useEffect, useState } from "react";
import useUserAuth from "./useUserAuth";

export async function getTransactions(): Promise<Transaction[]> {
  const transactions = await indexeddb.transactions.toArray();
  const pendingTransactions = await indexeddb.pendingTransactions.toArray();
  return [...transactions, ...pendingTransactions];
}

export async function saveTransactions(transactions: Transaction[]) {
  await indexeddb.transactions.clear();
  await indexeddb.transactions.bulkAdd(transactions);
}

const useGetTransaction = () => {
  const [offlineData, setOfflineData] = useState<Transaction[]>([]);
  const [userIdLocal, setUserIdLocal] = useState<string | null>(null);

  useEffect(() => {
    setUserIdLocal(localStorage.getItem("userId"));
    getTransactions().then(setOfflineData);
  }, []);

  const { userData } = useUserAuth();
  const userId = userIdLocal ?? userData?.id;
  const {
    data: serverData,
    isPending,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["transaction", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");
      const res = await fetch(`/api/transactions?userId=${userId}`);
      const data = await res.json();
      await saveTransactions(data);
      return data as Transaction[];
    },
    enabled: !!userId,
  });

  const mergedData = serverData
    ? [
        ...serverData,
        ...offlineData.filter((p) => !serverData.some((s) => s.id === p.id)),
      ]
    : offlineData;

  return { data: mergedData, isPending, refetch, isError };
};
export default useGetTransaction;
