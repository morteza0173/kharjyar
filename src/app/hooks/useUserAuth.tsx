"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import GetUserInfo from "../actions/user";
import { useEffect } from "react";

const useUserAuth = () => {
  const router = useRouter();

  const {
    isPending: isUserPending,
    isError: isUserError,
    data: userData,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => GetUserInfo(),
  });

  useEffect(() => {
    if (!isUserPending) {
      if (!userData) {
        return router.push("/login");
      }
    }
  }, [isUserPending, userData, router]);

  return { isUserPending, isUserError, userData };
};
export default useUserAuth;
