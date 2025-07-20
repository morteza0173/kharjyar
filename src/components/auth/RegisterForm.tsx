"use client";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import SubmitButton from "../ui/SubmitButton";
import { useFormContext } from "react-hook-form";
import { registerSchema, RegisterSchema } from "@/types/schema";
import z from "zod";
import PasswordStrength from "./PasswordStrength";
import { PasswordStrengthChecker } from "./PasswordStrengthChecker";
import { useState } from "react";
import RHFEmailInputWithCheckExist from "../ui/input/RHFEmailInputWithCheckExist";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<RegisterSchema>();
  const router = useRouter();

  const [showPasswordHints, setShowPasswordHints] = useState(false);
  const [formError, setFormError] = useState("");

  const handlerRegister = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await fetch("/api/register/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    if (!res.ok) throw new Error(response.error || "خطا در عضویت");
    return response;
  };

  const mutate = useMutation({
    mutationKey: ["register"],
    mutationFn: handlerRegister,
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error) => {
      setFormError(error.message);
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    mutate.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <TextField
          {...register("name")}
          label="نام"
          type="name"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <RHFEmailInputWithCheckExist />
        <div className="flex flex-col gap-1">
          <TextField
            {...register("password")}
            label="پسورد"
            type="password"
            error={!!errors.password}
            onFocus={() => setShowPasswordHints(true)}
            color={!errors.password ? "success" : undefined}
          />
          {errors.password || showPasswordHints ? (
            <>
              <PasswordStrength />
              <PasswordStrengthChecker />
            </>
          ) : (
            <></>
          )}
        </div>
        {formError && <Alert severity="error">{formError}</Alert>}
        <SubmitButton
          text="ثبت نام"
          size="large"
          isPending={mutate.isPending}
        />
        <div className="flex gap-1 justify-center">
          <p className="text-sm">از قبل حساب کاربری دارید ؟</p>
          <Link href="/login">
            <p className="underline text-sm">ورود</p>
          </Link>
        </div>
      </div>
    </form>
  );
}
export default RegisterForm;
