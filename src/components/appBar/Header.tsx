"use client";

import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import MenuButton from "./MenuButton";
import Search from "../ui/Search";
import HeaderBreadcrumbs from "./HeaderBreadcrumbs";
import { AppBar, Toolbar } from "@mui/material";

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        width: "100%",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          sx={{
            display: { xs: "flex", md: "flex" },
            width: "100%",
            alignItems: { xs: "center", md: "center" },
            justifyContent: "space-between",
            maxWidth: { sm: "100%", md: "1700px" },
          }}
          spacing={2}
        >
          <HeaderBreadcrumbs />
          <Stack direction="row" sx={{ gap: 1 }}>
            <Search />
            <MenuButton
              showBadge
              aria-label="Open notifications"
              sx={{
                width: 40,
                height: 40,
              }}
            >
              <NotificationsRoundedIcon />
            </MenuButton>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
