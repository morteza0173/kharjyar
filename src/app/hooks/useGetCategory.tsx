"use client";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import { indexeddb } from "@/lib/indexeddb";
import { useEffect, useState } from "react";
import useUserAuth from "./useUserAuth";

export async function getCategory(): Promise<Category[]> {
  const category = await indexeddb.category.toArray();
  const pendingCategory = await indexeddb.pendingCategory.toArray();
  return [...category, ...pendingCategory];
}

export async function saveCategory(category: Category[]) {
  await indexeddb.category.clear();
  await indexeddb.category.bulkAdd(category);
}

const useGetCategory = () => {
  const [offlineData, setOfflineData] = useState<Category[]>([]);
  const [userIdLocal, setUserIdLocal] = useState<string | null>(null);

  useEffect(() => {
    setUserIdLocal(localStorage.getItem("userId"));
    getCategory().then((data) => setOfflineData(data));
  }, []);

  const { userData } = useUserAuth();
  const userId = userIdLocal ?? userData?.id;
  const {
    data: serverData,
    isPending,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["category", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");
      const res = await fetch(`/api/category?userId=${userId}`);
      const data = await res.json();
      await saveCategory(data);
      return data as Category[];
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

export default useGetCategory;
