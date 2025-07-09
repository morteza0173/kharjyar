import { createAccountSchema, CreateAccountSchema } from "@/types/schema";
import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import RHFTypeSelector from "./RHFTypeSelector";
import SubmitButton from "../ui/SubmitButton";
import { accountTypeOption } from "@/types/AccountTypeOption";
import z from "zod";
import RHFNumberInput from "./RHFNumberInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Account, AccountType } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import useUserAuth from "@/app/hooks/useUserAuth";

export function CreateAccountForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<CreateAccountSchema>();

  const { userData } = useUserAuth();

  const router = useRouter();

  const queryClient = useQueryClient();

  const CreateAccount = async (data: {
    name: string;
    description: string;
    type: AccountType;
    balance: number;
    id: string;
  }) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("balance", data.balance.toString());
    formData.append("id", data.id);

    console.log("FORM DATA:", [...formData.entries()]);

    const res = await fetch("/api/account/create", {
      method: "POST",
      body: formData,
    });

    const response = await res.json();
    if (!res.ok) throw new Error(response.error || "خطا در ساخت حساب");
    return response;
  };

  const mutate = useMutation({
    mutationKey: ["createAccount"],
    mutationFn: CreateAccount,
    onMutate: async (newAccount) => {
      await queryClient.cancelQueries({ queryKey: ["accounts", userData?.id] });

      const fakeAccount: Account = {
        ...newAccount,
        id: newAccount.id,
        userId: userData?.id as string,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const PrevAccounts = queryClient.getQueryData(["accounts", userData?.id]);
      queryClient.setQueryData<Account[]>(["accounts", userData?.id], (old) => [
        ...(old ?? []),
        fakeAccount,
      ]);

      router.push("/dashboard");

      return { PrevAccounts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    retry: 1,
  });

  const onSubmit = (data: z.infer<typeof createAccountSchema>) => {
    const newId = uuidv4();
    const newData = {
      ...data,
      id: newId,
    };
    mutate.mutate(newData);
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
        <RHFNumberInput label="موجودی اولیه" />
        <SubmitButton
          isPending={mutate.isPending}
          text="ساخت حساب"
          disabled={mutate.isPending}
        />
      </Stack>
    </form>
  );
}
