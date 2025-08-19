"use client";

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import Link from "next/link";
import { mobileMenuItems } from "@/items/mobileMenuItems";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <Box sx={{ display: { md: "none" } }}>
      <BottomNavigation
        value={pathname}
        showLabels
        sx={{
          height: 56,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {mobileMenuItems.map((item, index) => {
          return (
            <BottomNavigationAction
              key={index}
              label={item.label}
              icon={item.icon}
              component={Link}
              href={item.link}
              value={item.link}
            />
          );
        })}
      </BottomNavigation>
    </Box>
  );
};
export default MobileMenu;
