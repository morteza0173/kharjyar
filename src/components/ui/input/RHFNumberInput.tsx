import { TextField, InputAdornment } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { CreateAccountSchema } from "@/types/schema";
import { useState } from "react";

const toEnglishDigits = (str: string) =>
  str.replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);

const formatPersianNumber = (numStr: string) => {
  const withCommas = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
};

export default function RHFNumberInput({ label }: { label: string }) {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<CreateAccountSchema>();

  const balance = watch("balance");

  const [displayValue, setDisplayValue] = useState<string | number>(balance);

  return (
    <Controller
      name="balance"
      control={control}
      render={({ field: { onChange } }) => (
        <TextField
          value={displayValue.toLocaleString("fa-IR")}
          onChange={(e) => {
            const input = e.target.value;
            const englishInput = toEnglishDigits(input).replace(/,/g, "");
            const numeric = Number(englishInput);
            onChange(numeric);
            setDisplayValue(formatPersianNumber(englishInput));
          }}
          label={label}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">تومان</InputAdornment>,
          }}
          inputProps={{
            inputMode: "numeric",
          }}
          error={!!errors.balance}
          helperText={errors.balance?.message}
        />
      )}
    />
  );
}
