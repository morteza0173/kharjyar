"use client";

import { Button, Card, CardContent, Divider } from "@mui/material";
import Image from "next/image";
import React from "react";
import { loginWithGoogle } from "../../actions/loginAction";
import LoginCardHeader from "@/components/login/LoginCardHeader";
import LoginForm from "@/components/login/LoginForm";
import AuthSideInfo from "@/components/login/AuthSideInfo";

function LoginPage() {
  return (
    <div className="h-full mt-10 lg:mt-0 lg:h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-10 relative">
      <div className="rounded-full w-96 h-96 xl:w-[1200px] xl::h-[1200px] bg-[#7babd3] opacity-15 absolute top-auto left-auto -z-10 blur-3xl "></div>
      <Card variant="elevation">
        <LoginCardHeader />
        <CardContent>
          <div className="flex flex-col gap-4">
            <LoginForm />
            <Divider>یا اینکه</Divider>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              startIcon={
                <Image src="google.svg" alt="Google" width={24} height={24} />
              }
              onClick={() => loginWithGoogle()}
            >
              ورود از طریق اکانت گوگل
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4">
        <AuthSideInfo />
      </div>
    </div>
  );
}
export default LoginPage;
