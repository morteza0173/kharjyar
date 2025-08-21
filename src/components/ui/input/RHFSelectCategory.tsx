import useGetCategory from "@/app/hooks/useGetCategory";
import { iconMap } from "@/lib/dataLabel";
import {
  Autocomplete,
  Avatar,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type RHFSelectCategoryProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export default function RHFSelectCategory<T extends FieldValues>({
  name,
  label,
}: RHFSelectCategoryProps<T>) {
  const { watch, control } = useFormContext<T>();
  const { data, isPending } = useGetCategory();

  const selectedType = watch("type" as Path<T>);

  const filteredCategories =
    data?.filter((c) => !selectedType || c.type === selectedType) || [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          options={filteredCategories}
          fullWidth
          getOptionLabel={(option) => option.name}
          value={filteredCategories.find((c) => c.id === field.value) || null}
          onChange={(_, newValue) => {
            field.onChange(newValue ? newValue.id : null);
          }}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            const IconComponent = iconMap[option.icon];
            return (
              <ListItem key={key} {...optionProps} divider>
                <ListItemText
                  primary={
                    <Typography variant="body1">{option.name}</Typography>
                  }
                />
                <ListItemAvatar>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <IconComponent />
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
            );
          }}
          loading={isPending}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                ...params.InputProps,
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
