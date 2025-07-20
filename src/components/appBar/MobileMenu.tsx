"use client";

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Fab,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { mobileMenuItems } from "@/items/mobileMenuItems";
import AddIcon from "@mui/icons-material/Add";

const MobileMenu = () => {
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const middleIndex = Math.floor(mobileMenuItems.length / 2);

  return (
    <Box sx={{ display: { md: "none" } }}>
      <Box
        sx={{
          position: "fixed",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1400,
        }}
      >
        <Fab
          color="success"
          aria-label="add"
          sx={{ width: 56, height: 56 }}
          href="/add-transaction"
          component={Link}
        >
          <AddIcon />
        </Fab>
      </Box>
      <BottomNavigation
        value={bottomNavValue}
        onChange={(event, newValue) => setBottomNavValue(newValue)}
        showLabels
        sx={{
          height: 56,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {mobileMenuItems.map((item, index) => {
          if (index === middleIndex)
            return (
              <BottomNavigationAction
                key={index}
                icon={null}
                label=""
                disabled
                sx={{ width: 56 }}
              />
            );
          return (
            <BottomNavigationAction
              key={index}
              label={item.label}
              icon={item.icon}
              component={Link}
              href={item.link}
            />
          );
        })}
      </BottomNavigation>
    </Box>
  );
};
export default MobileMenu;
