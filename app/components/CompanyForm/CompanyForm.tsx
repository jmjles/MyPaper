import { ArrowBack, ArrowForward, Cancel, Done } from "@mui/icons-material";
import { Button, Container, Grid2 } from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Steps from "./Steps";
import { v4 } from "uuid";
import { DefaultScreenProps } from "@/app/page";

const CompanyForm = (props: DefaultScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [slogan, setSlogan] = useState("");
  const [tel, setTel] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoData, setLogoData] = useState<string | undefined>(undefined);
  const [logoError, setLogoError] = useState("");
  const [license, setLicense] = useState("");
  const [special, setSpecial] = useState({});
  const [customField, setCustomField] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [company, setCompany] = useState<CompanyType>();
  const formLength = 2;
  useEffect(() => {
    if (props.screen === "editCompany") {
      const selectedCompany = props.companies.filter(
        (c) => props.selectedCompany === c.id
      )[0];
      setCompany(selectedCompany);
    }
  }, [props.screen]);

  useEffect(() => {
    if (company) {
      setName(company.name);
      setAddress(company.address);
      setCity(company.city);
      setZipCode(company.zipCode);
      setState(company.state);
      setSlogan(company.slogan);
      setTel(company.tel);
      setWebsite(company.website);
      if (company.logo) {
        setLogo(new File([new Blob([company.logo])], `${company.name} Logo`));
        setLogoData(company.logo);
      }
      setLicense(company.license);
    }
  }, [company]);

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
      case "state":
        setState(value);
        break;
      case "slogan":
        setSlogan(value);
        break;
      case "license":
        setLicense(value);
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

    const companyData: CompanyType = {
      id: company?.id || v4(),
      name,
      address,
      city,
      zipCode,
      state,
      slogan,
      website,
      license,
      tel,
      logo: logoData,
    };

    const companies = localStorage.getItem("companies");
    if (companies !== null) {
      let parsed: CompanyType[] = JSON.parse(companies);
      if (props.screen === "editCompany" && parsed.length > 0) {
        parsed = parsed.map((p) => {
          if (p.id === companyData.id) return companyData;
          return p;
        });
      } else {
        parsed.push(companyData);
      }
      localStorage.setItem("companies", JSON.stringify(parsed));
    } else {
      localStorage.setItem("companies", JSON.stringify([companyData]));
    }
    props.sendNotification(
      `${name} has successfully been ${
        props.screen === "editCompany" ? "updated" : "created"
      }!`,
      "success"
    );
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
              state,
              slogan,
              logoData,
              logoError,
              license,
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

export type CompanyType = {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  slogan: string;
  website: string;
  license: string;
  tel: string;
  logo?: string;
};

export default CompanyForm;
