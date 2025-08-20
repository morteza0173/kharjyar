import theme from "@/Providers/theme";
import { Close } from "@mui/icons-material";
import { Dialog, IconButton, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CustomDialog = ({ open, onClose, children }: CustomDialogProps) => {
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      onClose={onClose}
      disableScrollLock
      fullWidth
      maxWidth={"lg"}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Close />
      </IconButton>
      {children}
    </Dialog>
  );
};
export default CustomDialog;
