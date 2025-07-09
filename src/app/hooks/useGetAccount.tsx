"use client";
import { useQuery } from "@tanstack/react-query";
import useUserAuth from "./useUserAuth";
import { getAccountByUserId } from "../actions/accountAction";

const useGetAccount = () => {
  const { userData } = useUserAuth();
  const { data, isPending, refetch } = useQuery({
    queryKey: ["accounts", userData?.id],
    queryFn: async () => {
      if (!userData?.id) throw new Error("User ID not found");
      return getAccountByUserId(userData?.id);
    },
    enabled: !!userData?.id,
  });

  return { data, isPending, refetch };
};
export default useGetAccount;
