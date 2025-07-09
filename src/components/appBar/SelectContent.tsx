"use client";

import MuiAvatar from "@mui/material/Avatar";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import Select, { SelectChangeEvent, selectClasses } from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import useGetAccountType from "@/app/hooks/useGetAccountType";
import useGetAccount from "@/app/hooks/useGetAccount";
import { Skeleton, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

const typeLabels: Record<string, string> = {
  CASH: "نقدی",
  BANK: "کارت بانکی",
  CRYPTO: "رمزارز",
  STOCK: "سهام",
  WALLET: "کیف پول",
  SAVINGS: "پس‌انداز",
  OTHER: "سایر",
};

export default function SelectContent() {
  const pathname = usePathname();

  const [company, setCompany] = useState("overall"); // مقدار اولیه

  useEffect(() => {
    if (pathname === "/dashboard/create-account") {
      setCompany("create-account");
    } else if (pathname.startsWith("/dashboard/")) {
      const pathParts = pathname.split("/");
      const accountId = pathParts[2];
      if (accountId) setCompany(accountId);
      else setCompany("overall");
    } else {
      setCompany("overall");
    }
  }, [pathname]);
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    setCompany(event.target.value as string);
    const value = event.target.value;

    if (value === "overall") {
      router.push("/dashboard");
    } else if (value === "create-account") {
      router.push("/dashboard/create-account");
    } else {
      router.push(`/dashboard/${value}`);
    }
  };

  const { data: accounts, isPending } = useGetAccount();
  const { accountTypes } = useGetAccountType();

  if (isPending) {
    return (
      <Select
        value=""
        displayEmpty
        fullWidth
        disabled
        renderValue={() => "در حال دریافت حساب‌ها..."}
        sx={{ width: 215 }}
      >
        <MenuItem value="">در حال دریافت حساب‌ها...</MenuItem>
      </Select>
    );
  }

  return (
    <Select
      labelId="company-select"
      id="company-simple-select"
      value={company}
      onChange={handleChange}
      displayEmpty
      inputProps={{ "aria-label": "Select company" }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        "&.MuiList-root": {
          p: "8px",
        },
        [`& .${selectClasses.select}`]: {
          display: "flex",
          alignItems: "center",
          gap: "2px",
          pl: 1,
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            mt: 1,
            maxHeight: 560,
          },
        },
      }}
    >
      <MenuItem value={"overall"}>
        <ListItemAvatar>
          <Avatar alt="overall view">
            <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="همه حساب‌ها" secondary="نمایش خرج و مخارج" />
      </MenuItem>
      {isPending ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={200}
          height={56}
          sx={{ m: 1, borderRadius: 1 }}
        />
      ) : (
        accountTypes.map((type) => {
          return [
            <ListSubheader key={`subHeader-${type}`} sx={{ pt: 0 }}>
              {typeLabels[type]}
            </ListSubheader>,
            ...(accounts?.length === 0
              ? []
              : accounts?.map((account) => {
                  if (account.type === type) {
                    return (
                      <MenuItem key={account.id} value={account.id}>
                        <ListItemAvatar>
                          <Avatar alt={account.name}>
                            <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1">
                              {account.name}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {account.balance.toLocaleString()} تومان
                            </Typography>
                          }
                        />
                      </MenuItem>
                    );
                  }
                  return null;
                }) || []),
          ];
        })
      )}
      <Divider sx={{ mx: -1, my: 1 }} />
      <MenuItem value={"create-account"}>
        <ListItemIcon>
          <AddRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="حساب جدید" secondary="" />
      </MenuItem>
    </Select>
  );
}
