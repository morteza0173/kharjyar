"use client";

import { useEffect, useState } from "react";
import { Typography, CircularProgress, IconButton, Stack } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { useQueryClient } from "@tanstack/react-query";

export default function SyncBar() {
  const [status, setStatus] = useState<"idle" | "syncing" | "error">("idle");
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = queryClient.getMutationCache().subscribe(() => {
      const mutations = queryClient.getMutationCache().getAll();

      const isSyncing = mutations.some((m) => m.state.status === "pending");
      const hasError = mutations.some((m) => m.state.status === "error");

      if (isSyncing) {
        setStatus("syncing");
      } else if (hasError) {
        setStatus("error");
      } else {
        setStatus("idle");
      }
    });

    return () => unsubscribe();
  }, [queryClient]);

  if (status === "idle") return null;

  return (
    <Stack
      position={"fixed"}
      bottom={0}
      left={240}
      width="calc(100% - 230px)"
      zIndex={10}
      bgcolor="background.paper"
      borderTop="1px solid #ccc"
      flexDirection={"row"}
      alignItems={"center"}
      px={2}
      py={1}
    >
      <Typography variant="caption">
        {status === "syncing"
          ? "در حال همگام‌سازی..."
          : "خطا در همگام‌سازی. لطفاً دوباره تلاش کنید."}
      </Typography>
      {status === "syncing" ? (
        <CircularProgress size={12} sx={{ ml: "auto" }} />
      ) : (
        <IconButton
          sx={{ width: 16, height: 16, ml: "auto" }}
          onClick={() => {
            const mutations = queryClient.getMutationCache().findAll();

            console.log("Found mutations:", mutations.length);

            mutations.forEach(async (m) => {
              try {
                console.log("🔁 Retrying mutation...");
                await m.execute(m.state.variables);
              } catch (err) {
                console.error("❌ Mutation retry failed:", err);
              }
            });
          }}
        >
          <ReplayIcon color="error" />
        </IconButton>
      )}
    </Stack>
  );
}
