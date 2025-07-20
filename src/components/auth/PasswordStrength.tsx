"use client";

import { LinearProgress, Box } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

function calculateStrength(password: string) {
  let strength = 0;

  const conditions = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  conditions.forEach((cond) => {
    if (cond) strength += 1;
  });

  return strength;
}

export default function PasswordStrength() {
  const { control } = useFormContext();
  const password = useWatch({ control, name: "password" });

  const strength = calculateStrength(password || "");
  const percent = (strength / 4) * 100;

  const getColor = () => {
    switch (strength) {
      case 0:
      case 1:
        return "error";
      case 2:
        return "warning";
      case 3:
        return "secondary";
      case 4:
        return "success";
      default:
        return "inherit";
    }
  };

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        value={percent}
        color={getColor()}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  );
}
