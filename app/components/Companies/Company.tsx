import { Add } from "@mui/icons-material";
import { Stack, Typography as Font, Button } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

const Company = (props: CompanyPropType) => {
  const action = () =>
    props.add ? props.add("addCompany") : props.action(props.name);

  return (
    <Button onClick={action} color="primary">
      <Stack direction={"column"}>
        {typeof props.logo !== "string" && (
          <props.logo style={{ fontSize: 112 }} />
        )}
        {typeof props.logo === "string" && (
          <img
            src={props.logo}
            width={112}
            height={112}
            alt={`${props.name} Logo`}
          />
        )}
        <Font align="center" variant="body1">
          {props.name}
        </Font>
      </Stack>
    </Button>
  );
};
export type CompanyPropType = {
  name: String;
  logo: string | typeof Add;
  action?: any;
  add?: Dispatch<SetStateAction<string>>;
};
export default Company;
