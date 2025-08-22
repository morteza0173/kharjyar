import useGetAccount from "@/app/hooks/useGetAccount";
import useGetTransaction from "@/app/hooks/useGetTransaction";
import { formatPrice } from "@/lib/formatPrice";
import {
  Autocomplete,
  CircularProgress,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Transaction } from "@prisma/client";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type RHFSelectAccountProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

function calculateBalance(accountId: string, transactions: Transaction[]) {
  return transactions
    .filter((tx) => tx.accountId === accountId)
    .reduce((total, tx) => {
      if (tx.type === "INCOME") return total + tx.amount;
      return total - tx.amount; // EXPENSE
    }, 0);
}

export default function RHFSelectAccount<T extends FieldValues>({
  name,
  label,
}: RHFSelectAccountProps<T>) {
  const { control } = useFormContext<T>();
  const { data, isPending } = useGetAccount();
  const { data: dataTransaction } = useGetTransaction();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          options={data}
          fullWidth
          getOptionLabel={(option) => option.name}
          value={data.find((c) => c.id === field.value) || null}
          onChange={(_, newValue) => {
            field.onChange(newValue ? newValue.id : null);
          }}
          loading={isPending}
          renderOption={(props, option) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { key, ...optionProps } = props;
            const balance = calculateBalance(option.id, dataTransaction);
            return (
              <ListItem key={option.id} {...optionProps} divider>
                <ListItemText
                  primary={
                    <Typography variant="body1" color="text.primary">
                      {option.name}
                    </Typography>
                  }
                />
                <Typography
                  variant="body2"
                  color={
                    balance < 1
                      ? "error.main"
                      : balance < 1000000
                      ? "warning.main"
                      : "success.main"
                  }
                >
                  {formatPrice(balance)}
                </Typography>
              </ListItem>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                ...params.InputProps,
                readOnly: true,
                endAdornment: (
                  <>
                    {isPending ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
}
