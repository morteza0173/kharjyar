import { NextRequest, NextResponse } from "next/server";
import { CategoryType } from "@prisma/client";
import { createClient } from "@/lib/supabaseClient";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { success: false, error: "کاربر احراز نشد" },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();

    const description = formData.get("description") as string;
    const type = formData.get("type") as CategoryType;
    const id = formData.get("id") as string;
    const amount = Number(formData.get("amount"));
    const categoryId = formData.get("categoryId") as string;
    const accountId = formData.get("accountId") as string;

    await prisma.transaction.create({
      data: {
        id: id,
        userId: user.id,
        description,
        type,
        amount,
        categoryId,
        accountId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "خطایی در ثبت تراکنش رخ داد" },
      { status: 500 }
    );
  }
}
