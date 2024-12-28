import { ArrowBack, ArrowForward, Cancel, Done } from "@mui/icons-material";
import { Button, Container, Grid2 } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Steps from "./Steps";
import { v4 } from "uuid";
import { DefaultScreenProps } from "@/app/page";

const CompanyForm = (props: DefaultScreenProps) => {
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
  const [customField, setCustomField] = useState("");
  const [customValue, setCustomValue] = useState("");

  const formLength = 2;
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => {
    if (typeof e === "string") {
      setTel(e);
      return;
    }
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "city":
        setCity(value);
        break;
      case "zipcode":
        setZipCode(value);
        break;
      case "website":
        setWebsite(value);
        break;
      case "special":
        setSpecial((s) => {
          return { ...s };
        });
        break;
      case "customField":
        setCustomField(value);
        break;
      case "customValue":
        setCustomValue(value);
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

  const lastStep = currentStep + 1 === formLength;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!lastStep) {
      setCurrentStep((p) => (p += 1));
      return;
    }

    const company = {
      id: v4(),
      name,
      address,
      city,
      zipCode,
      website,
      logoData,
    };

    const companies = localStorage.getItem("companies");
    if (companies !== null) {
      const parsed = JSON.parse(companies);
      parsed.push(company);
      localStorage.setItem("companies", JSON.stringify(parsed));
    } else {
      localStorage.setItem("companies", JSON.stringify([company]));
    }
    props.sendNotification(`${name} has successfully been created!`, "success");
    props.useScreen("home");
  };
  const handleBack = () => {
    if (currentStep === 0) {
      props.useScreen("home");
      return;
    }
    setCurrentStep((p) => (p -= 1));
  };

  return (
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
          <Steps
            {...{
              handleChange,
              handleImg,
              name,
              address,
              city,
              zipCode,
              currentStep,
              logo,
              logoData,
              logoError,
              tel,
              website,
              special,
              customField,
              customValue,
            }}
          />

          <Grid2 size={12} justifyContent="space-between" container>
            <Grid2>
              <Button
                variant="contained"
                startIcon={currentStep === 0 ? <Cancel /> : <ArrowBack />}
                size="large"
                onClick={handleBack}
              >
                {currentStep === 0 ? "Cancel" : "Back"}
              </Button>
            </Grid2>

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
  );
};

export default CompanyForm;
