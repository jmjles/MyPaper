"use client";
import {
  Alert,
  AlertProps,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";

export default function Notification(props: NotificationProps) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      open={props.open}
      onClose={handleClose}
      autoHideDuration={props.timeout}
    >
      <Alert severity={props.type}>{props.text}</Alert>
    </Snackbar>
  );
}

export type NotificationProps = {
  type: AlertProps["severity"];
  text: string;
  setOpen: React.Dispatch<boolean>;
  open: boolean;
  timeout: number;
};
