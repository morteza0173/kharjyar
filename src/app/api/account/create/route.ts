import { NextRequest, NextResponse } from "next/server";
import { AccountType } from "@prisma/client";
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

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as AccountType;
    const balance = Number(formData.get("balance"));
    const id = formData.get("id") as string;

    await prisma.account.create({
      data: {
        id: id,
        userId: user.id,
        name,
        description,
        type,
        balance,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "خطایی در ثبت حساب رخ داد" },
      { status: 500 }
    );
  }
}
