import { formatPrice } from "@/lib/formatPrice";
import { Slider } from "@mui/material";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface DataTableFacetedFilterProps<TData> {
  table: Table<TData>;
  column: string;
  min: number;
  max: number;
  isPending: boolean;
}

function DataTablePriceRangeFilter<TData>({
  column,
  max = 100000,
  min = 0,
  table,
  isPending,
}: DataTableFacetedFilterProps<TData>) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  const step = (max - min) / 100;

  useEffect(() => {
    if (max > 0) {
      setPriceRange([0, max]);
    }
  }, [max]);

  const columnFilters = table.getState().columnFilters;

  useEffect(() => {
    const filterValue = table.getColumn(column)?.getFilterValue();
    if (!filterValue && typeof max === "number" && isFinite(max)) {
      setPriceRange([0, max]);
    }
  }, [columnFilters, max, column, table]);

  const handleChange = (_: Event, newValue: number | number[]) => {
    const range = newValue as [number, number];
    setPriceRange(range);
    table.getColumn(column)?.setFilterValue(range);
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <Slider
        value={priceRange}
        onChange={handleChange}
        valueLabelFormat={(value) => `${value.toLocaleString()} تومان`}
        min={min}
        max={max}
        step={step}
        sx={{ width: 300 }}
        disabled={max == min ? true : isPending}
      />
      <div className="flex justify-between content-center">
        <p className="text-xs">{`از قیمت ${formatPrice(priceRange[0])}`}</p>
        <p className="text-xs">{`تا ${formatPrice(priceRange[1])}`}</p>
      </div>
    </div>
  );
}

export default DataTablePriceRangeFilter;
