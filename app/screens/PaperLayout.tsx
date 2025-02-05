import React from "react";
import DefaultInvPng from "../assets/DefaultInvoice.png";
import { DefaultScreenProps } from "../page";
import CenterCard from "../Layouts/CenterCard";
import {
  Grid2,
  Typography as Font,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Image from "next/image";

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
              <Stack alignItems="center">
                <Image
                  src={DefaultInvPng}
                  height={100}
                  width={75}
                  alt="Default Invoice Preview"
                />
                <Typography variant="button">Default Invoice</Typography>
              </Stack>
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </CenterCard>
  );
};

export default PaperLayout;
