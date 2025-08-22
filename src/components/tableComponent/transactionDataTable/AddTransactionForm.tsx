"use client";
import CustomDialog from "@/components/ui/CustomDialog";
import RHFNumberInput from "@/components/ui/input/RHFNumberInput";
import {
  addTransactionSchema,
  AddTransactionSchema,
  defaultValuesAddTransaction,
} from "@/types/schema";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import RHFDatepicker from "../../ui/input/RHFDatepicker";
import { zodResolver } from "@hookform/resolvers/zod";
import RHFSelectTransactionType from "@/components/ui/input/RHFSelectTransactionType";
import { TransactionType } from "@/types/TransactionType";
import RHFTextInput from "@/components/ui/input/RHFTextInput";
import RHFSelectCategory from "@/components/ui/input/RHFSelectCategory";
import RHFSelectAccount from "@/components/ui/input/RHFSelectAccount";
import { Transaction } from "@prisma/client";
import { indexeddb } from "@/lib/indexeddb";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface AddTransactionFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export async function savePendingAccount(transaction: Transaction[]) {
  await indexeddb.pendingTransactions.bulkAdd(transaction);
}

const AddTransactionForm = ({ open, setOpen }: AddTransactionFormProps) => {
  const methods = useForm<AddTransactionSchema>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: defaultValuesAddTransaction,
  });

  const [userId, setUserId] = useState("0");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    }
  }, []);

  const queryClient = useQueryClient();

  const onSubmit = async (data: z.infer<typeof addTransactionSchema>) => {
    const newId = uuidv4();

    const indexeddbData: Transaction = {
      ...data,
      id: newId,
      userId: userId,
      date: dayjs(data.date).utc().toDate(),
    };

    await savePendingAccount([indexeddbData]);

    queryClient.setQueryData<Transaction[]>(
      ["transaction", userId],
      (old = []) => [...old, indexeddbData]
    );

    setOpen(false);
  };
  return (
    <CustomDialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>افزودن تراکنش</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DialogContent sx={{ minHeight: 500 }}>
            <Box display={"flex"} flexDirection={"column"} gap={6}>
              <RHFSelectTransactionType<AddTransactionSchema>
                name="type"
                label="نوع تراکنش"
                options={TransactionType}
              />
              <Box
                display={"flex"}
                py={1}
                gap={{ xs: 6, md: 1 }}
                flexDirection={{ xs: "column", md: "row" }}
              >
                <RHFNumberInput<AddTransactionSchema>
                  label="مبلغ تراکنش"
                  name="amount"
                />
                <RHFDatepicker<AddTransactionSchema>
                  name="date"
                  label="تاریخ تراکنش"
                />
              </Box>
              <RHFTextInput<AddTransactionSchema>
                name="description"
                label="توضیحات تراکنش"
              />

              <RHFSelectCategory<AddTransactionSchema>
                name="categoryId"
                label="انتخاب دسته بندی"
              />
              <RHFSelectAccount<AddTransactionSchema>
                name="accountId"
                label="انتخاب حساب"
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "space-around", px: 2 }}>
            <Button type="submit" variant="contained" fullWidth size="large">
              ثبت
            </Button>
            <Button onClick={() => setOpen(false)} fullWidth size="large">
              انصراف
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </CustomDialog>
  );
};
export default AddTransactionForm;
