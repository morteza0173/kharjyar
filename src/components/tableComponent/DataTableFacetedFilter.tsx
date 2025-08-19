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
import { Table } from "@tanstack/react-table";
import theme from "@/Providers/theme";
import { KeyboardArrowDown } from "@mui/icons-material";

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
            variant="contained"
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              height: 32,
              border: "1px solid gray",
              boxShadow: "none",
              bgcolor: "white",
              color: theme.palette.text.primary,
              width: { xs: "100%", lg: "auto" },
            }}
            startIcon={<KeyboardArrowDown fontSize="small" />}
          >
            {title}
            {selectedValues?.size > 0 && (
              <>
                <Divider orientation="vertical" sx={{ mx: 2 }} />
                <div className="flex space-x-1 lg:flex">
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
            disableScrollLock
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  borderRadius: 2,
                  "& .MuiMenu-list": {
                    padding: "5px 0",
                  },
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
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
