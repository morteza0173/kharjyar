import { z } from "zod";

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(1, "نام نمیتواند خالی باشد")
    .max(12, "نام نمیتواند بیشتر از 12 حرف باشد"),
  description: z
    .string()
    .min(1, "توضیحات نمیتواند خالی باشد")
    .max(50, "توضیحات نمیتواند بیشتر از 50 حرف باشد"),
  type: z.enum(
    ["CASH", "BANK", "CRYPTO", "STOCK", "WALLET", "SAVINGS", "OTHER"],
    {
      errorMap: () => ({
        message: "حداقل باید یک مورد از دسته بندی ها را انتخاب کنید",
      }),
    }
  ),
  balance: z.number().min(0, "موجودی نمیتواند منفی باشد"),
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;

export const DefaultValuesCreateAccount: Partial<CreateAccountSchema> = {
  name: "",
  description: "",
  type: undefined,
  balance: 0,
};
