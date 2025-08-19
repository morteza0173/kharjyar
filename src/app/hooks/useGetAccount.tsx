"use client";
import { useQuery } from "@tanstack/react-query";
import { getAccountByUserId } from "../actions/accountAction";
import { Account } from "@prisma/client";
import { indexeddb } from "@/lib/indexeddb";
import { useEffect, useState } from "react";
import useUserAuth from "./useUserAuth";

export async function getAccount(): Promise<Account[]> {
  const account = await indexeddb.account.toArray();
  const pendingAccount = await indexeddb.pendingAccount.toArray();
  return [...account, ...pendingAccount];
}

export async function saveAccount(account: Account[]) {
  await indexeddb.account.clear();
  await indexeddb.account.bulkAdd(account);
}

const useGetAccount = () => {
  const [offlineData, setOfflineData] = useState<Account[]>([]);
  const [userIdLocal, setUserIdLocal] = useState<string | null>(null);

  useEffect(() => {
    setUserIdLocal(localStorage.getItem("userId"));
    getAccount().then((accounts) => setOfflineData(accounts));
  }, []);

  const { userData } = useUserAuth();
  const userId = userIdLocal ?? userData?.id;
  const {
    data: serverData,
    isPending,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["accounts", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");
      const data = await getAccountByUserId(userId);
      await saveAccount(data);
      return data;
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
export default useGetAccount;
