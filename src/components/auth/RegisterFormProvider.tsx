"use client";
import {
  DefaultValuesRegisterSchema,
  registerSchema,
  RegisterSchema,
} from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterForm from "./RegisterForm";
import { FormProvider, useForm } from "react-hook-form";

function RegisterFormProvider() {
  const method = useForm<RegisterSchema>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: DefaultValuesRegisterSchema,
  });
  return (
    <FormProvider {...method}>
      <RegisterForm />
    </FormProvider>
  );
}
export default RegisterFormProvider;
