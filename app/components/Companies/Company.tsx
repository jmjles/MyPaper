import { Screens } from "@/app/page";
import { Add, Delete, Edit, ImageNotSupported } from "@mui/icons-material";
import { Stack, Typography as Font, Button, IconButton } from "@mui/material";
import React, { Dispatch, SetStateAction, useRef } from "react";

const Company = (props: CompanyPropType) => {
  const backdrop = useRef<HTMLDivElement>(null);
  const editButtons = useRef<HTMLDivElement>(null);
  const action = () =>
    props.add ? props.add("addCompany") : props.action(props.name);

  const Logo = () => {
    if (!props.logo)
      return <ImageNotSupported style={{ fontSize: 112 }} htmlColor="#000" />;

    if (typeof props.logo !== "string")
      return <props.logo style={{ fontSize: 112 }} htmlColor="#000" />;

    return <img src={props.logo} width={112} alt={`${props.name} Logo`} />;
  };

  const handleEditControls = () => {
    backdrop.current?.style.setProperty("opacity", "1");
    editButtons.current?.style.setProperty("opacity", "1");
  };
  const handleHideEditControls = () => {
    backdrop.current?.style.setProperty("opacity", "0");
    editButtons.current?.style.setProperty("opacity", "0");
  };
  const ButtonCompany = () => {
    if (!props.edit)
      return (
        <Button onClick={action} color="primary">
          <Stack direction="column" minHeight={136} justifyContent="end">
            <Logo />
            <Font align="center" variant="body1">
              {props.name}
            </Font>
          </Stack>
        </Button>
      );
    return (
      <Stack
        direction="column"
        minHeight={136}
        justifyContent="end"
        position="relative"
        onMouseOver={handleEditControls}
        onMouseLeave={handleHideEditControls}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.5)",
            zIndex: 5,
            borderRadius: 10,
            padding: 5,
            transition: "all .3s",
            opacity: 0,
          }}
          ref={backdrop}
        />
        <Stack
          position="absolute"
          top="50%"
          left="50%"
          style={{
            transform: "translate(-50%,-50%)",
            transition: "all .3s",
            opacity: 0,
          }}
          direction="row"
          zIndex={10}
          ref={editButtons}
        >
          <IconButton
            color="error"
            onClick={() => props.deleteCompany(props.id)}
          >
            <Delete fontSize="large" />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => props.editCompany(props.id)}
          >
            <Edit fontSize="large" />
          </IconButton>
        </Stack>
        <Logo />
        <Font align="center" variant="body1" color="primary">
          {props.name.toUpperCase()}
        </Font>
      </Stack>
    );
  };
  return <ButtonCompany />;
};
export type CompanyPropType = {
  id?: string;
  name: string;
  logo?: string | typeof Add;
  action?: any;
  add?: Dispatch<SetStateAction<Screens>>;
  edit?: boolean;
  deleteCompany?: any;
  editCompany?: any;
};
export default Company;
