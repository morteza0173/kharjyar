import { TextField, InputAdornment } from "@mui/material";
import { useFormContext, Controller, FieldValues, Path } from "react-hook-form";
import { useState } from "react";

const toEnglishDigits = (str: string) =>
  str.replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]);

const formatPersianNumber = (numStr: string) => {
  const withCommas = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return withCommas.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
};

type RHFNumberInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export default function RHFNumberInput<T extends FieldValues>({
  name,
  label,
}: RHFNumberInputProps<T>) {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<T>();

  const value = watch(name);

  const [displayValue, setDisplayValue] = useState<string | number>(value);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <TextField
          value={displayValue?.toLocaleString("fa-IR")}
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
          error={!!errors[name]}
          helperText={(errors[name]?.message as string) || ""}
        />
      )}
    />
  );
}
