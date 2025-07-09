"use server";

import { createClient } from "@/lib/supabaseClient";
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

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  console.log(error?.code);

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
  redirect("/dashboard");
};

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
