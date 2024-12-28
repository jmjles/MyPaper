import { Grid2 } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import Company from "./Company";
import { Add } from "@mui/icons-material";
import { CompanyListType } from "@/app/screens/home";

const Companies = (props: CompaniesPropType) => {
  return (
    <Grid2 container justifyContent="center" spacing={2}>
      {props.companies.map((c) => (
        <Grid2 key={c.id}>
          <Company
            {...c}
            edit={props.edit}
            editCompany={props.editCompany}
            deleteCompany={props.deleteCompany}
          />
        </Grid2>
      ))}
      {!props.edit && (
        <Grid2>
          <Company name="Add Company" logo={Add} add={props.useScreen} />
        </Grid2>
      )}
    </Grid2>
  );
};
type CompaniesPropType = {
  companies: CompanyListType[];
  useScreen: Dispatch<SetStateAction<string>>;
  edit: boolean;
  deleteCompany: any;
  editCompany: any;
};
export default Companies;
