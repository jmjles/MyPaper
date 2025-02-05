import { Screens } from "@/app/page";
import { Add, Delete, Edit, ImageNotSupported } from "@mui/icons-material";
import { Stack, Typography as Font, Button, IconButton } from "@mui/material";
import React, { Dispatch, SetStateAction, useRef } from "react";

const Company = (props: CompanyPropType) => {
  const backdrop = useRef<HTMLDivElement>(null);
  const editButtons = useRef<HTMLDivElement>(null);
  const action = () =>
    props.add ? props.add("addCompany") : props.action(props.id);

  const Logo = () => {
    if (!props.logo)
      return (
        <ImageNotSupported
          style={
            props.layoutType === "grid"
              ? { fontSize: 112, justifySelf: "start" }
              : { fontSize: 112, marginRight: 48 }
          }
          htmlColor="#000"
        />
      );

    if (typeof props.logo !== "string")
      return (
        <props.logo
          style={
            props.layoutType === "grid"
              ? { fontSize: 112 }
              : { fontSize: 112, marginRight: 48 }
          }
          htmlColor="#000"
        />
      );

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
    const isGrid = props.layoutType === "grid";

    if (!props.edit)
      return (
        <Button onClick={action} color="primary" sx={{ width: "100%" }}>
          <Stack
            direction={isGrid ? "column" : "row"}
            minHeight={136}
            justifyContent="end"
            alignItems={"center"}
          >
            <Logo />
            <Font align="center" variant="body1">
              {props.name}
            </Font>
          </Stack>
        </Button>
      );
    return (
      <Stack
        direction={isGrid ? "column" : "row"}
        minHeight={136}
        justifyContent="center"
        position="relative"
        alignItems="center"
        onMouseOver={handleEditControls}
        onMouseLeave={handleHideEditControls}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.25)",
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
            width: "100%",
          }}
          direction="row"
          zIndex={10}
          ref={editButtons}
        >
          <div style={{ width: "50%", textAlign: "center" }}>
            <IconButton
              color="error"
              onClick={() => props.deleteCompany(props.id)}
            >
              <Delete fontSize="large" />
            </IconButton>
          </div>
          <div style={{ width: "50%", textAlign: "center" }}>
            <IconButton
              color="primary"
              onClick={() => props.editCompany(props.id)}
            >
              <Edit fontSize="large" />
            </IconButton>
          </div>
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
  layoutType: "grid" | "list";
};
export default Company;
