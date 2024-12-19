"use client"
import { Alert, AlertProps, Fade } from "@mui/material";
import { useLayoutEffect, useState } from "react";

export default function Notification(props: NotificationProps) {
  const timerStarted = false;

  const [showAlert, setShowAlert] = useState(true);
  useLayoutEffect(() => {
    if (!timerStarted) {
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  });
  return (
    <Fade in={showAlert} timeout={props.timeout}>
      <Alert severity={props.type}>{props.text}</Alert>
    </Fade>
  );
}

export type NotificationProps = {
  type: AlertProps["severity"];
  text: string;
  timeout: number;
};
