import theme from "@/Providers/theme";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";

interface ResponsiveModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: React.ReactNode;
  title: string;
  description?: string;
  formId?: string;
  submitName?: string;
}

const ResponsiveModal = ({
  open,
  setOpen,
  children,
  title,
  description,
  formId,
  submitName,
}: ResponsiveModalProps) => {
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!open) return;
    if (!formId) return;

    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) return;

    const handleSubmit = () => {
      setTimeout(() => setOpen(false), 0);
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, [open, formId, setOpen]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      onClose={() => setOpen(false)}
      disableScrollLock
      fullWidth
      maxWidth={"xl"}
    >
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Close />
      </IconButton>
      <DialogContent dividers>
        {description && (
          <DialogContentText sx={{ mb: 2 }}>{description}</DialogContentText>
        )}
        {children}
      </DialogContent>

      {formId && (
        <DialogActions sx={{ justifyContent: "space-between", px: 2 }}>
          <Button
            variant="contained"
            type="submit"
            form={formId}
            size="large"
            fullWidth
            sx={{ maxWidth: "400px" }}
          >
            {submitName ? submitName : "ثبت"}
          </Button>
          <Button
            onClick={() => setOpen(false)}
            size="large"
            fullWidth
            sx={{ maxWidth: "400px" }}
          >
            انصراف
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ResponsiveModal;
