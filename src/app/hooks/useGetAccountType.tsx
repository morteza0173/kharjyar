"use client";
import { useMemo } from "react";
import useGetAccount from "./useGetAccount";

const useGetAccountType = () => {
  const { data: accounts, isPending } = useGetAccount();

  const accountTypes = useMemo(() => {
    if (!accounts) return [];

    const uniqueTypes = Array.from(new Set(accounts.map((acc) => acc.type)));
    return uniqueTypes;
  }, [accounts]);

  return { accountTypes, isPending };
};
export default useGetAccountType;
