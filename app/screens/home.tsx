"use client";
import {
  Grid2,
  Switch,
  Typography as Font,
  Button,
  Stack,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import Companies from "../components/Companies/Companies";
import CenterCard from "../Layouts/CenterCard";
import { DefaultScreenProps } from "../page";

export default function Home(props: DefaultScreenProps) {
  const [layoutType, setLayoutType] = useState("grid");
  const [edit, setEdit] = useState(false);

  const handleLayout = () => {
    setLayoutType(layoutType === "grid" ? "list" : "grid");
  };

  const editMode = () => setEdit((e) => !e);

  const handleCompany = (name: string) => {};

  const editCompany = (name: string) => {};

  return (
    <CenterCard>
      <Grid2 container size={12} spacing={2}>
        <Grid2 size={12}>
          <Stack direction="row" alignItems="center" justifyContent="end">
            <Font>Grid</Font>
            <Switch
              color="primary"
              value={layoutType}
              onChange={handleLayout}
            />
            <Font>List</Font>
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <Font align="center" variant="h1">
            Company Selection
          </Font>
        </Grid2>
        <Grid2
          size={12}
          justifyContent="center"
          height="50vh"
          overflow="scroll"
        >
          <Companies
            companies={[
              {
                name: "test",
                logo: "https://pngimg.com/uploads/google/google_PNG19630.png",
                action: edit ? () => editCompany : () => handleCompany,
              },
            ]}
            useScreen={props.useScreen}
          />
        </Grid2>
        <Grid2 size={12} textAlign="right">
          <Button
            variant="contained"
            color={edit ? "warning" : "primary"}
            startIcon={<Edit />}
            onClick={editMode}
          >
            <Font variant="button">Edit</Font>
          </Button>
        </Grid2>
      </Grid2>
    </CenterCard>
  );
}
