import { Alert, TextField } from "@mui/material";
import ActionForm from "../ui/ActionForm";
import { loginAction } from "@/app/actions/loginAction";
import Link from "next/link";
import SubmitButton from "../ui/SubmitButton";

const LoginForm = () => {
  return (
    <ActionForm action={loginAction}>
      {(state) => (
        <div className="flex flex-col gap-4">
          <TextField
            label="ایمیل"
            variant="outlined"
            type="email"
            name="email"
          />
          <div className="flex flex-col gap-2">
            <TextField
              label="پسورد"
              variant="outlined"
              type="password"
              name="password"
            />
            {state.message && <Alert severity="error">{state.message}</Alert>}
            <Link href="/login/forgetpassword">
              <p className="underline text-sm">رمز خود را فراموش کرده اید ؟</p>
            </Link>
          </div>
          <SubmitButton text="ورود" size="large" />
          <div className="flex gap-1 justify-center">
            <p className="text-sm">حساب کاربری از قبل ندارید ؟</p>
            <Link href="/register">
              <p className="underline text-sm">ثبت نام</p>
            </Link>
          </div>
        </div>
      )}
    </ActionForm>
  );
}
export default LoginForm
