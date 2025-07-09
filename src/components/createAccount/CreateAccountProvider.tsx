"use client";

import {
  createAccountSchema,
  CreateAccountSchema,
  DefaultValuesCreateAccount,
} from "@/types/schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAccountForm } from "./CreateAccountForm";

export function CreateAccountProvider() {
  const method = useForm<CreateAccountSchema>({
    mode: "onBlur",
    resolver: zodResolver(createAccountSchema),
    defaultValues: DefaultValuesCreateAccount,
  });

  return (
    <FormProvider {...method}>
      <CreateAccountForm />
    </FormProvider>
  );
}
