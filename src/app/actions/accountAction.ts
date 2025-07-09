"use server";

import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabaseClient";
import { AccountType } from "@prisma/client";

export async function getAccountByUserId(userId: string) {
  try {
    const account = await prisma.account.findMany({
      where: { userId: userId },
    });
    return account;
  } catch (error) {
    console.error("Error fetching account:", error);
    throw new Error("Failed to fetch account");
  }
}

export async function CreateAccountAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as AccountType;
  const balance = formData.get("balance");

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("کاربر احراز نشد");
  }

  try {
    await prisma.account.create({
      data: {
        userId: user.id,
        name,
        description,
        type,
        balance: Number(balance),
      },
    });
  } catch {
    throw new Error("خطایی در ثبت حساب رخ داد");
  }
}
