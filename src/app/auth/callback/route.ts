import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseClient";
import { prisma } from "@/lib/db";
import { CategoryType } from "@prisma/client";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("OAuth error:", error.message);
      return NextResponse.redirect(new URL("/auth/error", request.url));
    }

    const user = data?.user;

    if (!user?.id || !user.email) {
      return NextResponse.redirect(new URL("/auth/error", request.url));
    }

    const userId = user.id;
    const userEmail = user.email;
    const userName = user.user_metadata?.name || "کاربر";

    const dbUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!dbUser) {
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
    }

    if (dbUser && !dbUser.CompleteRegistration) {
      await prisma.$transaction(async (tx) => {
        await tx.category.createMany({
          data: getDefaultCategories(userId),
        });

        await tx.user.update({
          where: { id: userId },
          data: { CompleteRegistration: true },
        });
      });
    }

    const accountCount = await prisma.account.count({
      where: { userId },
    });

    const redirectUrl = new URL(
      accountCount === 0 ? "/dashboard/create-account" : next,
      request.url
    );

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.redirect(new URL("/auth/error", request.url));
}

function getDefaultCategories(userId: string) {
  return [
    { name: "حقوق", type: CategoryType.INCOME, userId },
    { name: "هدیه", type: CategoryType.INCOME, userId },
    { name: "خرید", type: CategoryType.EXPENSE, userId },
    { name: "غذا", type: CategoryType.EXPENSE, userId },
    { name: "حمل‌ونقل", type: CategoryType.EXPENSE, userId },
  ];
}
