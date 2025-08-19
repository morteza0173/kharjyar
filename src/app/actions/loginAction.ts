"use server";

import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabaseClient";
import { CategoryType } from "@prisma/client";
import { redirect } from "next/navigation";

type LoginState = {
  message: string;
};
export const loginAction = async (
  prevState: LoginState,
  formData: FormData
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error?.code) {
    switch (error?.code) {
      case "email_not_confirmed":
        return {
          message: "ایمیل خود را تایید کنید تا بتوانید وارد سایت شوید.",
        };
      case "user_not_found	":
        return {
          message: "کاربری با این ایمیل یافت نشد",
        };
      case "invalid_credentials":
        return {
          message: "نام کاربری یا پسورد اشتباه است",
        };
      case "over_request_rate_limit":
        return { message: "رمز اشتباه زیادی زدید و باید مدتی صبر کنید" };

      default:
        return { message: "خطایی در ورود رخ داد. لطفاً دوباره تلاش کنید." };
    }
  }
  const userId = data?.user?.id;
  const userEmail = data?.user?.email;
  const userName = data?.user?.user_metadata?.name || "کاربر";

  if (!userId || !userEmail) {
    return { message: "کاربری یافت نشد" };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user?.id) {
    await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: {
          id: userId,
          email: userEmail,
          name: userName,
          CompleteRegistration: true,
        },
      });

      await tx.category.createMany({
        data: getDefaultCategories(userId),
      });
    });

    const accountCount = await prisma.account.count({
      where: { userId },
    });

    return redirect(
      accountCount === 0 ? "/dashboard/create-account" : "/dashboard"
    );
  }

  if (user.id && !user.CompleteRegistration) {
    await prisma.$transaction(async (tx) => {
      await tx.category.createMany({
        data: getDefaultCategories(userId),
      });

      await tx.user.update({
        where: { id: userId },
        data: { CompleteRegistration: true },
      });
    });

    const accountCount = await prisma.account.count({
      where: { userId },
    });

    return redirect(
      accountCount === 0 ? "/dashboard/create-account" : "/dashboard"
    );
  }

  return redirect("/dashboard");
};

function getDefaultCategories(userId: string) {
  return [
    { name: "حقوق", type: CategoryType.INCOME, userId },
    { name: "هدیه", type: CategoryType.INCOME, userId },
    { name: "خرید", type: CategoryType.EXPENSE, userId },
    { name: "غذا", type: CategoryType.EXPENSE, userId },
    { name: "حمل‌ونقل", type: CategoryType.EXPENSE, userId },
  ];
}

export const loginWithGoogle = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  redirect(data?.url || "/dashboard");
};
