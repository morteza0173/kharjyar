import { translateErrors } from "@/lib/dataLabel";
import { prisma } from "@/lib/db";
import { createClientWithServiceRole } from "@/lib/supabaseClient";
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
    const user = await prisma.user.create({
      data: {
        id: userId,
        email,
        name,
        CompleteRegistration: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "خطا در ذخیره در دیتابیس" },
      { status: 500 }
    );
  }
}
