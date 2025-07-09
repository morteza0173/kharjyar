"use client";

import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { mobileMenuItems } from "@/items/mobileMenuItems";

const MobileMenu = () => {
  const [bottomNavValue, setBottomNavValue] = useState(0);

  return (
    <BottomNavigation
      value={bottomNavValue}
      onChange={(event, newValue) => setBottomNavValue(newValue)}
      showLabels
      sx={{
        display: { md: "none" },
        height: 56,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {mobileMenuItems.map((item, index) => (
        <BottomNavigationAction
          key={index}
          label={item.label}
          icon={item.icon}
          LinkComponent={Link}
          href={item.link}
        />
      ))}
    </BottomNavigation>
  );
};
export default MobileMenu;
