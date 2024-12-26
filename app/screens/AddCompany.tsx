import React, { ChangeEvent, FormEvent, useState } from "react";
import CenterCard from "../Layouts/CenterCard";
import {
  Grid2,
  Typography as Font,
  Divider,
  TextField,
  Container,
  Button,
} from "@mui/material";
import { Add, ArrowBack, ArrowForward, Done } from "@mui/icons-material";
import { MuiFileInput } from "mui-file-input";
import { MuiTelInput } from "mui-tel-input";

const AddCompany = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [tel, setTel] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoData, setLogoData] = useState<string | undefined>(undefined);
  const [logoError, setLogoError] = useState("");
  const [special, setSpecial] = useState({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => {
    if (typeof e === "string") {
      setTel(e);
      return;
    }
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "address":
        setAddress(e.target.value);
        break;
      case "city":
        setCity(e.target.value);
        break;
      case "zipcode":
        setZipCode(e.target.value);
        break;
      case "website":
        setWebsite(e.target.value);
        break;
      case "special":
        setName(e.target.value);
        break;
    }
  };

  const handleImg = async (e: File | null) => {
    if (e === null) {
      setLogo(e);
      setLogoData(undefined);
      return;
    }

    setLogo(e);
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        if (reader.result.includes("image")) {
          setLogoData(reader.result);
          setLogoError("");
          return;
        }
        setLogoData(undefined);
        setLogoError("Logo must be a .png, .jpg, .jpeg, or .webp");
        return;
      }
      setLogoData(undefined);
      setLogoError(
        "Error processing logo, please verify file extension and try again."
      );
    });

    reader.readAsDataURL(e);
  };

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
          <TextField
            label="Website"
            name="website"
            type="url"
            fullWidth
            onChange={handleChange}
            value={website}
          />
        </Grid2>
      </>
    ),
    () => (
      <>
        <Grid2>
          <Button endIcon={<Add />}>Custom Field</Button>
        </Grid2>
      </>
    ),
  ];

  const lastStep = currentStep + 1 === formSteps.length;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formSteps.length !== currentStep) {
      setCurrentStep((p) => (p += 1));
      return;
    }
    const company = {
      name,
      address,
      city,
      zipCode,
      website,
      logoData,
    };
  };
  const handleBack = () => setCurrentStep((p) => (p -= 1));
  return (
    <CenterCard>
      <Grid2 container size={12} spacing={2}>
        <Grid2 size={12}>
          <Font variant="h1" align="center">
            Create Company
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
          <Container maxWidth={"sm"}>
            <Grid2>
              <Grid2
                container
                size={12}
                spacing={4}
                component="form"
                onSubmit={handleSubmit}
                justifyContent="center"
              >
                {formSteps[currentStep]()}

                <Grid2
                  size={12}
                  justifyContent={currentStep === 0 ? "end" : "space-between"}
                  container
                >
                  {currentStep !== 0 && (
                    <Grid2>
                      <Button
                        variant="contained"
                        startIcon={<ArrowBack />}
                        size="large"
                        onClick={handleBack}
                      >
                        back
                      </Button>
                    </Grid2>
                  )}

                  <Grid2>
                    <Button
                      variant="contained"
                      endIcon={lastStep ? <Done /> : <ArrowForward />}
                      type="submit"
                      size="large"
                    >
                      {lastStep ? "Done" : "Next"}
                    </Button>
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>
          </Container>
        </Grid2>
      </Grid2>
    </CenterCard>
  );
};

export default AddCompany;
