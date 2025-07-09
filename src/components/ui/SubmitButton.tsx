"use client";
import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  text = "ثبت",
  isPending,
  disabled,
  size,
}: {
  text?: string;
  isPending?: boolean;
  disabled?: boolean;
  size?: "large" | "medium" | "small";
}) => {
  const { pending } = useFormStatus();
  const isLoading = isPending ?? pending;

  return (
    <Button
      type="submit"
      loading={isLoading}
      variant="contained"
      loadingPosition="start"
      disabled={isLoading || disabled}
      size={size ? size : "large"}
    >
      {text}
    </Button>
  );
};
export default SubmitButton;
