"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import GetUserInfo from "../actions/user";
import { useEffect, useState } from "react";

const useUserAuth = () => {
  const router = useRouter();
  const [localUserId, setLocalUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setLocalUserId(storedId);
  }, []);

  const {
    isPending: isUserPending,
    isError: isUserError,
    data: userData,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => GetUserInfo(),
  });

  useEffect(() => {
    if (userData?.id) {
      localStorage.setItem("userId", userData.id);
      setLocalUserId(userData.id);
    }
  }, [userData]);

  useEffect(() => {
    if (!isUserPending) {
      if (!localUserId && !userData) {
        router.push("/login");
      }
    }
  }, [isUserPending, localUserId, userData, router]);

  return { isUserPending, isUserError, userData, localUserId };
};

export default useUserAuth;
