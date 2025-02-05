import React, { ChangeEvent, useEffect, useState } from "react";
import { DefaultScreenProps } from "../page";
import InvoiceDefault from "../components/pdf/presets/invoiceDefault/InvoiceDefault";
import { PDFViewer } from "@react-pdf/renderer";
import { CompanyType } from "../components/CompanyForm/CompanyForm";
import {
  Button,
  CircularProgress,
  Container,
  Grid2,
  IconButton,
} from "@mui/material";
import { ArrowBack, Description } from "@mui/icons-material";
import { TableProps } from "../components/pdf/Table/Table";
import InvoiceForm, {
  FieldType,
} from "../components/pdf/InvoiceForm/InvoiceForm";

const MyPaper = (props: DefaultScreenProps) => {
  const [company, setCompany] = useState<CompanyType>();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [jobAddress, setJobAddress] = useState("");
  const [owner, setOwner] = useState("");
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [fax, setFax] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [subtotal, setSubTotal] = useState("");
  const [total, setTotal] = useState("");
  const [sample, setSample] = useState(false);
  const [entries, setEntries] = useState<TableProps[]>([]);
  const fields: FieldType[] = [
    { state: setJobAddress, value: jobAddress, name: "Job Address" },
    { state: setOwner, value: owner, name: "Owner Name" },
    { state: setClient, value: client, name: "Client Name" },
    { state: setPhone, value: phone, name: "Phone" },
    { state: setAddress, value: address, name: "Address" },
    { state: setFax, value: fax, name: "Fax" },
    { state: setCity, value: city, name: "City" },
    { state: setState, value: state, name: "State" },
    { state: setZipcode, value: zipcode, name: "Zipcode" },
    { state: setEmail, value: email, name: "Email" },
    // { state: setTitle, value: title, name: "Title" },
  ];

  useEffect(() => {
    setCompany(
      props.companies.filter((c) => c.id === props.selectedCompany)[0]
    );
  }, [props.selectedCompany]);

  const SelectedPaper = () => {
    if (!company) {
      return (
        <CircularProgress
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
          size="64px"
        />
      );
    }
    let Paper;
    switch (props.selectedPaper) {
      default:
        Paper = InvoiceDefault;
    }
    const paperFields = {
      jobAddress,
      name: client,
      owner,
      phone,
      address,
      fax,
      place: [city, state, zipcode].filter((p) => p).join(", "),
      email,
    };
    return (
      <Container style={{ height: "100vh" }}>
        <PDFViewer showToolbar={false} width={"100%"} height={"100%"}>
          <Paper
            company={company}
            client={paperFields}
            table={{ title, entries, total, subtotal }}
          />
        </PDFViewer>
      </Container>
    );
  };

  const sampleData = () => {
    if (sample) {
      setSample(false);
      fields.forEach((f, i) => f.state(""));
      setTitle("");
      setTotal("");
      setSubTotal("");
      setEntries([]);
      return;
    }
    const fieldData = [
      "877 8th St.",
      "The Big Bank",
      "Liam M.",
      "888 888-8888",
      "4356 Main St.",
      "",
      "Manhattan",
      "NYC",
      "10256",
      "example@email.com",
    ];
    fields.forEach((f, i) => f.state(fieldData[i]));
    setTitle("Roof Repair");
    setEntries([
      {
        header: false,
        title: "Remove old roof and discard waste",
        price: "1800.00",
      },
      {
        header: false,
        title: "Repair roof where needed with plywood or rafters",
        price: "1000.00",
      },
      {
        header: false,
        title: "Install the client selected shingles",
        price: "5000.00",
      },
    ]);
    setSample(true);
  };

  const handleForm = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    fields.filter((f) => f.name === name)[0].state(value);
  };
  const handleBack = () => {
    props.useScreen("paperLayouts");
  };
  const handlePaper = () => {
    setOpen((p) => !p);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Grid2 container alignItems="center" justifyContent="space-between">
          <Grid2>
            <IconButton color="primary" onClick={handleBack}>
              <ArrowBack />
            </IconButton>
          </Grid2>
          <Grid2>
            <Button endIcon={<Description />} onClick={handlePaper}>
              Fill Out Form
            </Button>
          </Grid2>
        </Grid2>
      </Container>
      <InvoiceForm
        title="Client Info"
        header="Paper Form"
        handleForm={handleForm}
        handlePaper={handlePaper}
        open={open}
        sample={sample}
        fields={fields}
        table={{
          title,
          fields: entries,
          setTitle,
          setFields: setEntries,
          total,
          subtotal,
          setSubTotal,
          setTotal,
        }}
        sampleData={sampleData}
      />
      <SelectedPaper />
    </div>
  );
};
export default MyPaper;
