"use client";
import { AlertColor, Container } from "@mui/material";
import Home from "./screens/home";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddCompany from "./screens/AddCompany";
import Notification from "./components/Notification/Notification";
import { ConfirmProvider } from "material-ui-confirm";
import PaperLayout from "./screens/PaperLayout";
import MyPaper from "./screens/MyPaper";
import { CompanyType } from "./components/CompanyForm/CompanyForm";
import EditCompany from "./screens/EditCompany";

export default function Index() {
  const [screen, setScreen] = useState<Screens>("home");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [open, setOpen] = useState(false);
  const [notifText, setNotifText] = useState("");
  const [notifType, setNotifType] = useState<AlertColor>("success");
  const [companies, setCompanies] = useState<CompanyType[]>([]);
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
    companies,
    setCompanies,
    selectedPaper,
    screen,
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
      case "editCompany":
        return <EditCompany {...defaultProps} />;
    }
  };

  const getCompanies = (): CompanyType[] | null => {
    const companiesData = localStorage.getItem("companies");
    if (companiesData) {
      return JSON.parse(companiesData);
    }
    return null;
  };

  const sampleCompany: CompanyType = {
    id: "01",
    address: "5417 Main St.",
    city: "Los Angeles",
    state: "Ca",
    name: "WeBuild",
    slogan: "You think it, we build it",
    license: "BE-54682",
    website: "WeBuild.com",
    tel: "888 888-8888",
    zipCode: "99999",
  };

  useEffect(() => {
    const data = getCompanies();
    const hasSampleData = !data?.every((d) => sampleCompany.id !== d.id);
    if (data && screen === "home")
      if (hasSampleData) setCompanies(data);
      else setCompanies([...data, sampleCompany]);
  }, [screen]);

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

export type Screens =
  | "home"
  | "addCompany"
  | "paperLayouts"
  | "paper"
  | "editCompany";

export interface DefaultScreenProps {
  useScreen: Dispatch<SetStateAction<Screens>>;
  selectedCompany: string;
  setSelectedPaper: Dispatch<SetStateAction<string>>;
  setSelectedCompany: Dispatch<SetStateAction<string>>;
  sendNotification: (text: string, severity: AlertColor) => void;
  selectedPaper: string;
  companies: CompanyType[];
  setCompanies: Dispatch<SetStateAction<CompanyType[]>>;
  screen: Screens;
}
