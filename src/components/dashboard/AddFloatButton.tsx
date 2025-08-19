"use client";

import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaidIcon from "@mui/icons-material/Paid";
import CategoryIcon from "@mui/icons-material/Category";
import { useRouter } from "next/navigation";

const actions = [
  {
    icon: <CategoryIcon />,
    name: "افزودن دسته‌بندی",
    to: "addCategory",
  },
  { icon: <PaidIcon />, name: "افزودن تراکنش", to: "addTransaction" },
  {
    icon: <AccountBalanceWalletIcon />,
    name: "افزودن حساب",
    to: "create-account",
  },
];

const AddFloatButton = () => {
  const router = useRouter();
  const clickHandler = (to: string) => {
    router.push(`/dashboard/${to}`);
  };

  return (
    <SpeedDial
      ariaLabel="add button"
      sx={{
        position: "fixed",
        bottom: { xs: 70, sm: 70, md: 16 },
        right: { xs: 16, sm: 16, lg: 16 },
      }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          onClick={() => clickHandler(action.to)}
          slotProps={{
            tooltip: {
              title: action.name,
            },
          }}
          FabProps={{
            disabled:
              action.name === "افزودن تراکنش" ||
              action.name === "افزودن دسته‌بندی",
          }}
        />
      ))}
    </SpeedDial>
  );
};
export default AddFloatButton;
