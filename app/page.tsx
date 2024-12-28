"use client";
import { AlertColor, Container } from "@mui/material";
import Home from "./screens/home";
import { Dispatch, SetStateAction, useState } from "react";
import AddCompany from "./screens/AddCompany";
import Notification from "./components/Notification/Notification";

export default function Index() {
  const [screen, setScreen] = useState("home");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [open, setOpen] = useState(false);
  const [notifText, setNotifText] = useState("");
  const [notifType, setNotifType] = useState<AlertColor>("success");

  const sendNotification = (text: string, severity: AlertColor) => {
    setNotifText(text);
    setNotifType(severity);
    setOpen(true);
  };
  const defaultProps = {
    useScreen: setScreen,
    selectedCompany,
    setSelectedCompany,
    sendNotification,
  };

  const CurrentScreen = () => {
    switch (screen) {
      case "home":
        return <Home {...defaultProps} />;
      case "addCompany":
        return <AddCompany {...defaultProps} />;
    }
  };
  return (
    <Container component="main" maxWidth="lg">
      <Notification
        text={notifText}
        timeout={5000}
        type={notifType}
        open={open}
        setOpen={setOpen}
      />
      <CurrentScreen />
    </Container>
  );
}

export interface DefaultScreenProps {
  useScreen: Dispatch<SetStateAction<string>>;
  selectedCompany: string;
  setSelectedCompany: Dispatch<SetStateAction<string>>;
  sendNotification: (text: string, severity: AlertColor) => void;
}
