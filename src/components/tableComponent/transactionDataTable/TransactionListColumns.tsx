"use client";

import { formatPersianDate } from "@/lib/formatDateToPersian";
import { formatPriceWithCommaFa } from "@/lib/formatPrice";
import { Chip } from "@mui/material";
import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useMemo } from "react";
import useGetAccount from "@/app/hooks/useGetAccount";

export const useTransactionColumns = (): ColumnDef<Transaction>[] => {
  const { data: AccountData } = useGetAccount();

  const accountIdToNameMap = useMemo(() => {
    const map = new Map();
    AccountData?.forEach((account) => {
      map.set(account.id, account.name);
    });
    return map;
  }, [AccountData]);

  return useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        id: "expand",
        header: () => null,
        cell: ({ row }) => {
          const isExpanded = row.getIsExpanded();
          return (
            <span
              onClick={row.getToggleExpandedHandler()}
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                paddingLeft: "6px",
                userSelect: "none",
              }}
              aria-label={isExpanded ? "Collapse row" : "Expand row"}
            >
              {isExpanded ? (
                <KeyboardArrowDownIcon fontSize="small" />
              ) : (
                <KeyboardArrowLeftIcon fontSize="small" />
              )}
            </span>
          );
        },
        size: 30,
        minSize: 30,
        maxSize: 30,
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
      },
      {
        accessorKey: "description",
        header: () => <p>عنوان تراکنش</p>,
        cell: ({ row }) => (
          <div className="max-w-[200px] md:w-auto capitalize  flex gap-2 items-center">
            <div>
              <p>{row.getValue("description")}</p>
            </div>
          </div>
        ),
        enableSorting: true,
        enableHiding: true,
        filterFn: (row, id, value) => {
          const title = row.getValue(id) as string;
          return title.toLowerCase().includes(value.toLowerCase());
        },
      },
      {
        accessorKey: "type",
        header: () => <p>نوع تراکنش</p>,
        cell: ({ row }) => {
          return (
            <div className="flex xl:w-full items-center gap-1 flex-wrap">
              <Chip
                label={row.getValue("type") === "EXPENSE" ? "هزینه" : "درآمد"}
                size="small"
                color={row.getValue("type") === "INCOME" ? "success" : "error"}
                sx={{
                  width: "fit-content",
                  fontSize: "0.6rem",
                  borderRadius: 1,
                  opacity: 0.6,
                  ".MuiChip-label": { pt: 0.3 },
                }}
              />
            </div>
          );
        },
        size: 150,
        minSize: 100,
        maxSize: 200,
        filterFn: (row, _id, value) => {
          const type = row.getValue("type");
          return value.includes(type);
        },
      },
      {
        accessorKey: "accountId",
        header: () => <p>نام حساب</p>,
        cell: ({ row }) => {
          const accountId = row.getValue("accountId");
          const accountName = accountIdToNameMap.get(accountId) || "نامشخص";

          return (
            <p className="text-sm opacity-70 whitespace-nowrap">
              {accountName}
            </p>
          );
        },
        size: 150,
        minSize: 100,
        maxSize: 200,
        filterFn: (row, _id, value) => {
          const type = row.getValue("accountId");
          return value.includes(type);
        },
      },
      {
        accessorKey: "amount",
        header: () => <p>مقدار تراکنش</p>,
        cell: ({ row }) => {
          return (
            <div className="flex xl:w-full items-center gap-1 flex-wrap">
              {formatPriceWithCommaFa(row.getValue("amount"))}
            </div>
          );
        },
        size: 150,
        minSize: 100,
        maxSize: 200,
        filterFn: (row, id, value) => {
          const rowValue = row.getValue(id) as number;
          const [min, max] = value;
          return rowValue >= min && rowValue <= max;
        },
      },
      {
        accessorKey: "date",
        header: () => <p>تاریخ</p>,
        cell: ({ row }) => {
          return (
            <div className="flex xl:w-full items-center gap-1 flex-wrap">
              {formatPersianDate(row.getValue("date"))}
            </div>
          );
        },
        size: 150,
        minSize: 100,
        maxSize: 200,
        filterFn: (row, id, value) => {
          const rowValue = row.getValue(id) as number;
          const [min, max] = value;
          return rowValue >= min && rowValue <= max;
        },
      },
    ],
    [accountIdToNameMap]
  );
};
