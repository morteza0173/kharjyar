"use client";
import { RegisterSchema } from "@/types/schema";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";

function RHFEmailInputWithCheckExist() {
  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<RegisterSchema>();

  const email = watch("email");
  const [debouncedEmail] = useDebounce(email, 500);

  const [checking, setChecking] = useState(false);
  const [emailExists, setEmailExists] = useState<null | boolean>(null);

  useEffect(() => {
    const checkEmail = async () => {
      if (!debouncedEmail || errors.email) return;

      setChecking(true);
      setEmailExists(null);

      try {
        const res = await fetch(
          `/api/register/check-email?email=${debouncedEmail}`
        );
        if (!res.ok) throw new Error("خطا در ارتباط با سرور");

        const data = await res.json();
        setEmailExists(data.exists);
        if (data.exists) {
          setError("email", {
            type: "manual",
            message: "این ایمیل قبلاً ثبت شده است.",
          });
        } else {
          clearErrors("email");
          setEmailExists(false);
        }
      } catch (err) {
        console.error("خطا در بررسی ایمیل:", err);
        setError("email", {
          type: "manual",
          message: "خطا در بررسی",
        });
      } finally {
        setChecking(false);
      }
    };

    checkEmail();
  }, [debouncedEmail, setError, clearErrors, errors.email]);

  const getStatusIcon = () => {
    if (!email) return;
    if (checking)
      return (
        <InputAdornment position="end">
          <CircularProgress size={16} />
        </InputAdornment>
      );
    if (errors.email)
      return (
        <InputAdornment position="end">
          <Cancel color="error" sx={{ width: 16, height: 16 }} />
        </InputAdornment>
      );
    if (emailExists === false)
      return (
        <InputAdornment position="end">
          <CheckCircle color="success" sx={{ width: 16, height: 16 }} />
        </InputAdornment>
      );
    if (emailExists === true)
      return (
        <InputAdornment position="end">
          <Cancel color="error" sx={{ width: 16, height: 16 }} />
        </InputAdornment>
      );
    return null;
  };

  const isValidEmail = emailExists === false && !checking;
  const isInvalidEmail = emailExists === true && !checking;

  return (
    <TextField
      {...register("email")}
      label="ایمیل"
      type="email"
      fullWidth
      error={!!errors.email || isInvalidEmail}
      helperText={
        checking ? (
          <>
            <CircularProgress size={14} sx={{ mr: 1 }} />
            در حال بررسی ایمیل...
          </>
        ) : isInvalidEmail ? (
          "ایمیل وجود دارد یک ایمیل دیگر انتخاب کنید"
        ) : (
          errors.email?.message ??
          (email && emailExists === false ? "این ایمیل برای ثبت آزاد است" : "")
        )
      }
      InputProps={{
        endAdornment: getStatusIcon(),
        style: isValidEmail
          ? errors.email
            ? { borderColor: "red", color: "red" }
            : { borderColor: "green", color: "green" }
          : isInvalidEmail
          ? { borderColor: "red", color: "red" }
          : undefined,
      }}
      FormHelperTextProps={{
        style: isValidEmail
          ? errors.email
            ? { color: "red" }
            : { color: "green" }
          : isInvalidEmail
          ? { color: "red" }
          : undefined,
      }}
    />
  );
}
export default RHFEmailInputWithCheckExist;
