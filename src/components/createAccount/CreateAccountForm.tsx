"use client";
import { createAccountSchema, CreateAccountSchema } from "@/types/schema";
import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import RHFTypeSelector from "../ui/input/RHFTypeSelector";
import SubmitButton from "../ui/SubmitButton";
import { accountTypeOption } from "@/types/AccountTypeOption";
import z from "zod";
import RHFNumberInput from "../ui/input/RHFNumberInput";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Account } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { indexeddb } from "@/lib/indexeddb";
import { useEffect, useState } from "react";

export async function savePendingAccount(account: Account[]) {
  await indexeddb.pendingAccount.bulkAdd(account);
}

export async function removePendingAccount(id: string) {
  await indexeddb.pendingAccount.delete(id);
}

export function CreateAccountForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<CreateAccountSchema>();

  const [userId, setUserId] = useState("0");

  const router = useRouter();

  const queryClient = useQueryClient();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    }
  }, []);

  const onSubmit = async (data: z.infer<typeof createAccountSchema>) => {
    const newId = uuidv4();
    const indexeddbData: Account = {
      ...data,
      id: newId,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: data.description || null,
    };

    await savePendingAccount([indexeddbData]);

    queryClient.setQueryData<Account[]>(["accounts", userId], (old = []) => [
      ...old,
      indexeddbData,
    ]);

    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: 2 }}>
        <RHFTypeSelector options={accountTypeOption} />
        <TextField
          {...register("name")}
          label="نام حساب"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register("description")}
          label="توضیحات اضافی"
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <RHFNumberInput<CreateAccountSchema>
          label="موجودی اولیه"
          name="balance"
        />
        <SubmitButton text="ساخت حساب" />
      </Stack>
    </form>
  );
}
