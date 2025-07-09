"use client";

import AccountInfoSection from "@/components/createAccount/AccountInfoSection";
import { CreateAccountProvider } from "@/components/createAccount/CreateAccountProvider";
import { Card, Typography } from "@mui/material";

const createAccount = () => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <Typography
          variant="subtitle1"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          ساخت حساب جدید
        </Typography>
      </div>
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="w-full">
          <Card sx={{ padding: 4 }}>
            <div>
              <CreateAccountProvider />
            </div>
          </Card>
        </div>
        <AccountInfoSection />
      </div>
    </div>
  );
};
export default createAccount;
