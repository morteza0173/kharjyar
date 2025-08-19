import { AccountTypeOption } from "@/types/AccountTypeOption";
import { CreateAccountSchema } from "@/types/schema";
import { Card, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function RHFTypeSelector({
  options,
}: {
  options: AccountTypeOption[];
}) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateAccountSchema>();
  const selected = watch("type");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {options.map((item) => {
        const Icon = item.icon;
        const isSelected = selected === item.value;

        return (
          <Card
            key={item.value}
            onClick={() => setValue("type", item.value)}
            sx={{
              cursor: "pointer",
              p: 2,
              border: "1px solid",
              borderColor: errors.type?.message
                ? "error.main"
                : isSelected
                ? "primary.main"
                : "grey.300",
              bgcolor: isSelected ? "primary.light" : "background.paper",
              transition: "all 0.3s",
              "&:hover": {
                borderColor: "primary.light",
              },
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon color={isSelected ? "primary" : "disabled"} />
              <Typography variant="subtitle1">{item.title}</Typography>
            </div>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </Card>
        );
      })}
      <Typography variant="caption" component={"p"} color="error">
        {errors.type?.message}
      </Typography>
    </div>
  );
}
