import { TransactionTypeOption } from "@/types/TransactionType";
import { Box, Card, Typography } from "@mui/material";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";

type RHFSelectTransactionProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options: TransactionTypeOption[];
};

export default function RHFSelectTransactionType<T extends FieldValues>({
  name,
  label,
  options,
}: RHFSelectTransactionProps<T>) {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<T>();

  const value = watch(name);

  return (
    <Box>
      <Typography variant="caption">{label}</Typography>
      <Box display={"flex"} gap={1}>
        {options.map((item) => {
          const Icon = item.icon;
          const isSelected = value === item.value;
          const disabale = item.value === "TOACCOUNT";
          return (
            <Card
              key={item.value}
              onClick={() => {
                if (!disabale) {
                  setValue(name, item.value as PathValue<T, Path<T>>);
                }
              }}
              sx={{
                cursor: "pointer",
                p: 1,
                border: "1px solid",
                borderColor: errors.type?.message
                  ? "error.main"
                  : disabale
                  ? "gray"
                  : isSelected
                  ? "primary.main"
                  : "grey.300",
                bgcolor: disabale
                  ? "lightgray"
                  : isSelected
                  ? "primary.light"
                  : "background.paper",
                transition: "all 0.3s",
                "&:hover": {
                  borderColor: disabale ? "" : "primary.light",
                },
                flex: "1 1 0",
                opacity: disabale ? "40%" : "",
              }}
            >
              <div>
                <Icon
                  color={
                    disabale ? "disabled" : isSelected ? "primary" : "disabled"
                  }
                />
                <Typography
                  variant="subtitle1"
                  fontSize={{ xs: "0.75rem", md: "1rem" }}
                >
                  {item.title}
                </Typography>
              </div>
            </Card>
          );
        })}
      </Box>
      <Typography variant="caption" component={"p"} color="error">
        {typeof errors[name]?.message === "string" ? errors[name]?.message : ""}
      </Typography>
    </Box>
  );
}
