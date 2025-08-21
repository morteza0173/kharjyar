import { TextField } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type RHFTextInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export default function RHFTextInput<T extends FieldValues>({
  name,
  label,
}: RHFTextInputProps<T>) {
  const {
    formState: { errors },
    control,
  } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          error={!!errors[name]}
          helperText={(errors[name]?.message as string) || ""}
        />
      )}
    />
  );
}
