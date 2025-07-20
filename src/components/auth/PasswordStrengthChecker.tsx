import { Check, Close } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useFormContext } from "react-hook-form";

function getPasswordCriteriaStatus(password: string) {
  return {
    length: password.length >= 8,
    upperCase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
}

export function PasswordStrengthChecker() {
  const { watch } = useFormContext();
  const password = watch("password") || "";

  const criteria = getPasswordCriteriaStatus(password);

  return (
    <Box mt={1}>
      <CriteriaItem label="حداقل ۸ کاراکتر" isValid={criteria.length} />
      <CriteriaItem label="شامل حروف بزرگ" isValid={criteria.upperCase} />
      <CriteriaItem label="شامل عدد" isValid={criteria.number} />
      <CriteriaItem label="شامل کاراکتر خاص" isValid={criteria.specialChar} />
    </Box>
  );
}

type CriteriaItemProps = {
  label: string;
  isValid: boolean;
};

function CriteriaItem({ label, isValid }: CriteriaItemProps) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {isValid ? (
        <Check fontSize="small" sx={{ color: green[600] }} />
      ) : (
        <Close fontSize="small" sx={{ color: red[500] }} />
      )}
      <Typography
        variant="body2"
        color={isValid ? green[600] : red[500]}
        fontWeight={isValid ? "bold" : "normal"}
      >
        {label}
      </Typography>
    </Box>
  );
}
