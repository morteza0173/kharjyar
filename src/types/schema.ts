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
