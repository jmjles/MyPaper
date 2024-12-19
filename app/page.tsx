"use client";
import { Container } from "@mui/material";
import Home from "./screens/home";
import { useState } from "react";
import AddCompany from "./screens/AddCompany";

export default function Index() {
  const [screen, setScreen] = useState("home");
  const [selectedCompany, setSelectedCompany] = useState("");
  const defaultProps = {
    useScreen: setScreen,
    selectedCompany,
    setSelectedCompany,
  };

  const CurrentScreen = () => {
    switch (screen) {
      case "home":
        return <Home {...defaultProps} />;
      case "addCompany":
        return <AddCompany />;
    }
  };
  return (
    <Container component="main" maxWidth="lg">
      <CurrentScreen />
    </Container>
  );
}
