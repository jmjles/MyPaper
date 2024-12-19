import { Grid2, Card, Container } from "@mui/material";
import React from "react";

const CenterCard = (props: React.PropsWithChildren) => {
  return (
    <Grid2
      container
      height="100vh"
      justifyContent="center"
      alignContent="center"
    >
      <Grid2>
        <Card elevation={6}>
          <Container sx={{ padding: 6 }}>{props.children}</Container>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default CenterCard;
