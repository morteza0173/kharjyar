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

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "ایمیل را وارد کنید")
    .email({ message: "ایمیل صحیح نمیباشد" }),
  password: z
    .string()
    .min(8, { message: "رمز عبور باید حداقل ۸ حرف باشد" })
    .refine((val) => /[A-Z]/.test(val), {
      message: "باید حداقل یک حرف بزرگ داشته باشد",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "باید حداقل یک عدد داشته باشد",
    })
    .refine((val) => /[@$!%*?&]/.test(val), {
      message: "باید حداقل یک علامت خاص (مثل @ یا ! یا ...) داشته باشد",
    }),
  name: z.string().min(3, "نام باید حداقل 3 حرف باشد").max(12, "حداکثر 12 حرف"),
});
export type RegisterSchema = z.infer<typeof registerSchema>;

export const DefaultValuesRegisterSchema: Partial<RegisterSchema> = {
  name: "",
  email: "",
  password: "",
};

export const addTransactionSchema = z.object({
  amount: z.number().min(1, "حداقل مقدار تراکنش 1 میباشد"),
  date: z.date({ required_error: "تاریخ الزامی است" }),
  type: z.enum(["INCOME", "EXPENSE", "TOACCOUNT"], {
    errorMap: () => ({
      message: "نوع تراکنش را باید انتخاب کنید",
    }),
  }),
  description: z
    .string()
    .min(5, "حداقل 5 حرف باشد")
    .max(20, "نباید بیشتر از 20 حرف باشد"),
  categoryId: z
    .string({
      required_error: "انتخاب دسته‌بندی الزامی است",
      invalid_type_error: "دسته‌بندی معتبر نیست",
    })
    .min(1, "یک دسته بندی انتخاب کنید"),
  accountId: z
    .string({
      required_error: "انتخاب دسته‌بندی الزامی است",
      invalid_type_error: "دسته‌بندی معتبر نیست",
    })
    .min(1, "یک دسته بندی انتخاب کنید"),
});

export type AddTransactionSchema = z.infer<typeof addTransactionSchema>;

export const defaultValuesAddTransaction: Partial<AddTransactionSchema> = {
  amount: 0,
  date: new Date(),
  type: "EXPENSE",
  description: "",
  categoryId: "",
  accountId: "",
};
