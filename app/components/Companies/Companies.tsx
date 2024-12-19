import { Grid2 } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import Company, { CompanyPropType } from "./Company";
import { Add } from "@mui/icons-material";

const Companies = (props: CompaniesPropType) => {
  return (
    <Grid2 container justifyContent="center" spacing={2}>
      {props.companies.map((c) => (
        <Grid2 key={c.name}>
          <Company {...c} />
        </Grid2>
      ))}
      <Grid2>
        <Company name="Add Company" logo={Add} add={props.useScreen} />
      </Grid2>
    </Grid2>
  );
};
type CompaniesPropType = {
  companies: CompanyPropType[];
  useScreen: Dispatch<SetStateAction<string>>;
};
export default Companies;
