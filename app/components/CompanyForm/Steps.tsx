import { Add } from "@mui/icons-material";
import { Button, Grid2, Stack, TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { MuiTelInput } from "mui-tel-input";
import React from "react";

const Steps = (props: FormStepsType) => {
  const {
    handleChange,
    name,
    address,
    city,
    state,
    slogan,
    zipCode,
    tel,
    logo,
    logoData,
    logoError,
    website,
    currentStep,
    handleImg,
    license,
    customField,
    customValue,
    special,
  } = props;
  const formSteps = [
    () => (
      <>
        <Grid2 size={12}>
          <TextField
            label="Company Name"
            type="text"
            name="name"
            fullWidth
            required
            onChange={handleChange}
            value={name}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="Street Address"
            type="text"
            name="address"
            fullWidth
            required
            onChange={handleChange}
            value={address}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="City"
            type="text"
            name="city"
            fullWidth
            required
            onChange={handleChange}
            value={city}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="State"
            type="text"
            name="state"
            fullWidth
            required
            slotProps={{ htmlInput: { maxLength: 2 } }}
            onChange={handleChange}
            value={state}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="ZipCode"
            type="string"
            name="zipcode"
            fullWidth
            required
            onChange={handleChange}
            value={zipCode}
          />
        </Grid2>
        <Grid2 size={12}>
          <MuiTelInput
            label="Company Number"
            name="tel"
            fullWidth
            required
            defaultCountry="US"
            onChange={handleChange}
            value={tel}
            forceCallingCode
          />
        </Grid2>
      </>
    ),
    () => (
      <>
        <Grid2
          size={12}
          display={logo !== null ? "revert" : "none"}
          textAlign="center"
        >
          <img src={logoData} style={{ maxWidth: "100%" }} />
        </Grid2>
        <Grid2 size={12}>
          <MuiFileInput
            placeholder="Upload Logo"
            inputProps={{ accepts: ".png, .jpeg, .webp, .jpg" }}
            fullWidth
            error={logoError !== ""}
            helperText={logoError}
            onChange={handleImg}
            value={logo}
          />
        </Grid2>
        <Grid2 size={12}>
          <MuiTelInput
            label="Company Number"
            name="tel"
            fullWidth
            required
            defaultCountry="US"
            onChange={handleChange}
            value={tel}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="Website"
            name="website"
            type="string"
            fullWidth
            onChange={handleChange}
            value={website}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="Slogan"
            name="slogan"
            type="text"
            fullWidth
            onChange={handleChange}
            value={slogan}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="License"
            name="license"
            type="text"
            fullWidth
            onChange={handleChange}
            value={license}
          />
        </Grid2>
      </>
    ),
    // () => (
    //   <>
    //     <Grid2 container></Grid2>
    //     <Stack width={"100%"} direction="row" spacing={3}>
    //       <TextField
    //         label="Custom Field"
    //         name="customField"
    //         type="string"
    //         fullWidth
    //         onChange={handleChange}
    //         value={customField}
    //       />
    //       <TextField
    //         label="Value"
    //         name="customValue"
    //         type="string"
    //         fullWidth
    //         onChange={handleChange}
    //         value={customValue}
    //       />
    //     </Stack>
    //     <Grid2>
    //       <Button endIcon={<Add />}>Custom Field</Button>
    //     </Grid2>
    //   </>
    // ),
  ];

  return <>{formSteps[currentStep]()}</>;
};
type FormStepsType = {
  handleChange: any;
  handleImg: any;
  name: string;
  address: string;
  city: string;
  state: string;
  slogan: string;
  zipCode: string;
  tel: string;
  logo: File | null;
  logoData: string | undefined;
  logoError: string;
  website: string;
  license: string;
  currentStep: number;
  special: any;
  customField: string;
  customValue: string;
};
export default Steps;
