export const dataLabels: Record<string, string> = {
  CASH: "نقدی",
  BANK: "بانک",
  CRYPTO: "رمز ارز",
  STOCK: "سهام",
  WALLET: "کیف پول مجازی",
  SAVINGS: "پس انداز",
  OTHER: "سایر",
};

export function translateErrors(message: string): string {
  const normalized = message.toLowerCase();

  if (
    normalized.includes(
      "a user with this email address has already been registered"
    )
  ) {
    return "این ایمیل قبلا ثبت شده است.";
  }

  if (normalized.includes("password should be at least 6 characters")) {
    return "رمز عبور باید حداقل ۶ کاراکتر باشد.";
  }

  if (normalized.includes("invalid login credentials")) {
    return "ایمیل یا رمز عبور اشتباه است.";
  }

  if (normalized.includes("email is invalid")) {
    return "ایمیل وارد شده معتبر نیست.";
  }

  return "خطایی رخ داده است. لطفاً دوباره تلاش کنید.";
}
