"use server"
import { createClient } from "@/lib/supabaseClient";

const GetUserInfo = async() => {

     const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

  return user;
}
export default GetUserInfo
