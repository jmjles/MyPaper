import React from "react";
import { DefaultScreenProps } from "../page";
import CenterCard from "../Layouts/CenterCard";
import { Grid2, Typography as Font, Button, Divider } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const PaperLayout = (props: DefaultScreenProps) => {
  const handleSelect = (name: string) => {
    props.setSelectedPaper(name);
    props.useScreen("paper");
  };
  return (
    <CenterCard>
      <Button startIcon={<ArrowBack />} onClick={() => props.useScreen("home")}>
        Back
      </Button>
      <Grid2 container size={12} justifyContent="center">
        <Grid2 size={12}>
          <Font variant="h1" align="center">
            Choose your Paper
          </Font>
        </Grid2>
        <Grid2 container size={10} spacing={2}>
          <Grid2 size={12}>
            <Font variant="h2">Invoices</Font>
            <Divider />
          </Grid2>
          <Grid2 container direction="row">
            <Button variant="contained" onClick={() => handleSelect("default")}>
              Default
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </CenterCard>
  );
};

export default PaperLayout;
