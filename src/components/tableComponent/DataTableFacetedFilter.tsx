import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Badge,
  Divider,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Table } from "@tanstack/react-table";

interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface DataTableFacetedFilterProps<TData> {
  table: Table<TData>;
  column: string;
  title?: string;
  options: Option[];
}

export function DataTableFacetedFilter<TData>({
  table,
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData>) {
  const columnRef = table.getColumn(column);
  const filterValue = columnRef?.getFilterValue() as string[] | undefined;
  const selectedValues = new Set(filterValue ?? []);
  const facets = columnRef?.getFacetedUniqueValues();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleToggle = (value: string) => {
    const updated = new Set(selectedValues);
    if (updated.has(value)) {
      updated.delete(value);
    } else {
      updated.add(value);
    }

    const newValues = Array.from(updated);
    columnRef?.setFilterValue(newValues.length > 0 ? newValues : undefined);
  };
  const handleClear = () => {
    columnRef?.setFilterValue(undefined);
    setAnchorEl(null);
  };

  return (
    <>
      {columnRef && (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ height: 32, borderStyle: "dashed" }}
            startIcon={<AddCircleOutlineIcon fontSize="small" />}
          >
            {title}
            {selectedValues?.size > 0 && (
              <>
                <Divider orientation="vertical" sx={{ mx: 2 }} />
                <div className="flex md:hidden space-x-1 lg:flex">
                  {selectedValues.size > 2 ? (
                    <Badge
                      variant="standard"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedValues.size} مورد انتخاب شده
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValues.has(option.value))
                      .map((option) => (
                        <Badge
                          variant="standard"
                          key={option.value}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            {options.map((option) => {
              const isSelected = selectedValues.has(option.value);
              const IconComponent = option.icon;

              return (
                <MenuItem
                  key={option.value}
                  onClick={() => handleToggle(option.value)}
                >
                  <ListItemIcon>
                    <Checkbox edge="start" checked={isSelected} />
                  </ListItemIcon>
                  {IconComponent && <IconComponent className="mr-2" />}
                  <ListItemText
                    primary={option.label}
                    secondary={
                      facets?.get(option.value)
                        ? `${facets.get(option.value)} مورد`
                        : undefined
                    }
                  />
                </MenuItem>
              );
            })}

            {selectedValues.size > 0 && [
              <Divider key="divider" />,
              <MenuItem
                key="clear"
                onClick={handleClear}
                sx={{ justifyContent: "center" }}
              >
                <Typography variant="body2" color="error">
                  پاک کردن فیلتر
                </Typography>
              </MenuItem>,
            ]}
          </Menu>
        </>
      )}
    </>
  );
}
