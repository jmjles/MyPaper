"use client";
import { AlertColor, Container } from "@mui/material";
import Home from "./screens/home";
import { Dispatch, SetStateAction, useState } from "react";
import AddCompany from "./screens/AddCompany";
import Notification from "./components/Notification/Notification";
import { ConfirmProvider } from "material-ui-confirm";
import PaperLayout from "./screens/PaperLayout";
import MyPaper from "./screens/MyPaper";

export default function Index() {
  const [screen, setScreen] = useState<Screens>("home");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [open, setOpen] = useState(false);
  const [notifText, setNotifText] = useState("");
  const [notifType, setNotifType] = useState<AlertColor>("success");
  const [selectedPaper, setSelectedPaper] = useState("");
  const [customPaper, setCustomPaper] = useState("");

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
    setSelectedPaper,
  };

  const CurrentScreen = () => {
    switch (screen) {
      case "home":
        return <Home {...defaultProps} />;
      case "addCompany":
        return <AddCompany {...defaultProps} />;
      case "paperLayouts":
        return <PaperLayout {...defaultProps} />;
      case "paper":
        return <MyPaper {...defaultProps} />;
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
      <ConfirmProvider>
        <CurrentScreen />
      </ConfirmProvider>
    </Container>
  );
}

export type Screens = "home" | "addCompany" | "paperLayouts" | "paper";

export interface DefaultScreenProps {
  useScreen: Dispatch<SetStateAction<Screens>>;
  selectedCompany: string;
  setSelectedPaper: Dispatch<SetStateAction<string>>;
  setSelectedCompany: Dispatch<SetStateAction<string>>;
  sendNotification: (text: string, severity: AlertColor) => void;
}
