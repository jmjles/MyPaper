import React from "react";
import CenterCard from "../Layouts/CenterCard";
import { Grid2, Typography as Font, Divider } from "@mui/material";
import CompanyForm from "../components/CompanyForm/CompanyForm";
import { DefaultScreenProps } from "../page";

const EditCompany = (props: DefaultScreenProps) => {
  const company = props.companies.filter(
    (c) => c.id === props.selectedCompany
  )[0];
  return (
    <CenterCard>
      <Grid2 container size={12} spacing={2}>
        <Grid2 size={12}>
          <Font variant="h1" align="center">
            Edit {company.name}
          </Font>
        </Grid2>
        <Grid2 size={12}>
          <Divider />
        </Grid2>
        <Grid2 size={12}>
          <Font variant="h3" align="center">
            General Information
          </Font>
        </Grid2>
        <Grid2 size={12}>
          <CompanyForm {...props} />
        </Grid2>
      </Grid2>
    </CenterCard>
  );
};

export default EditCompany;
