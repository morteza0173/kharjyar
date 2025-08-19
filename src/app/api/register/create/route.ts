import { translateErrors } from "@/lib/dataLabel";
import { prisma } from "@/lib/db";
import { createClientWithServiceRole } from "@/lib/supabaseClient";
import { CategoryType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const supabase = await createClientWithServiceRole();

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "همه فیلدها الزامی هستند" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    const errorMessage = translateErrors(error.message);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  const userId = data.user?.id;

  if (!userId) {
    return NextResponse.json(
      { error: "ایجاد کاربر ناموفق بود" },
      { status: 500 }
    );
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: userId,
          email,
          name,
          CompleteRegistration: true,
        },
      });
      const defaultCategories = [
        { name: "حقوق", type: CategoryType.INCOME, userId: userId },
        { name: "هدیه", type: CategoryType.INCOME, userId: userId },
        { name: "خرید", type: CategoryType.EXPENSE, userId: userId },
        { name: "غذا", type: CategoryType.EXPENSE, userId: userId },
        { name: "حمل‌ونقل", type: CategoryType.EXPENSE, userId: userId },
      ];
      await tx.category.createMany({
        data: defaultCategories,
      });

      return user;
    });

    return NextResponse.json({ result }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "خطا در ذخیره در دیتابیس" },
      { status: 500 }
    );
  }
}
