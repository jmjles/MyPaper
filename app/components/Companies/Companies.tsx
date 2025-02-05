import { Grid2 } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import Company from "./Company";
import { Add } from "@mui/icons-material";
import { CompanyListType } from "@/app/screens/home";
import { Screens } from "@/app/page";

const Companies = (props: CompaniesPropType) => {
  const isGrid = props.layoutType === "grid";
  return (
    <Grid2
      container
      justifyContent="center"
      spacing={2}
    >
      {props.companies.map((c) => (
        <Grid2 key={c.id} width={isGrid ? "revert" : "45%"}>
          <Company
            {...c}
            edit={props.edit}
            editCompany={props.editCompany}
            deleteCompany={props.deleteCompany}
            layoutType={props.layoutType}
          />
        </Grid2>
      ))}
      {!props.edit && (
        <Grid2 width={isGrid ? "revert" : "45%"}>
          <Company
            name="Add Company"
            logo={Add}
            add={props.useScreen}
            layoutType={props.layoutType}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
type CompaniesPropType = {
  companies: CompanyListType[];
  useScreen: Dispatch<SetStateAction<Screens>>;
  edit: boolean;
  deleteCompany: any;
  editCompany: any;
  layoutType: "grid" | "list";
};
export default Companies;
