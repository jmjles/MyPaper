import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  Grid2,
  Typography,
  Checkbox,
  TextField,
  Divider,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TableProps } from "../Table/Table";
import Entry from "./Entry";

const InvoiceForm = (props: InvoiceFormProps) => {
  const [step, setStep] = useState(1);
  const [lastStep, setLastStep] = useState(false);
  const [title, setTitle] = useState("");
  const [quantityEnable, setQuantityEnable] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [unitEnable, setUnitEnable] = useState(false);
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [subTotalEnable, setSubTotalEnable] = useState(false);
  const [totalEnable, setTotalEnable] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editEntry, setEditEntry] = useState(0);
  const [defaultSubTotal, setDefaultSubTotal] = useState("");
  const [defaultTotal, setDefaultTotal] = useState("");
  const fields: FieldType[] = [
    {
      name: "Table Title",
      value: props.table.title,
      state: props.table.setTitle,
    },
    { name: "Entry Title", value: title, state: setTitle },
    { name: "Quantity?", value: quantityEnable, state: setQuantityEnable },
    { name: "Quantity", value: quantity, state: setQuantity },
    { name: "Unit?", value: unitEnable, state: setUnitEnable },
    { name: "Unit", value: unit, state: setUnit },
    { name: "Price", value: price, state: setPrice },
    {
      name: "Subtotal",
      value: props.table.subtotal,
      state: props.table.setSubTotal,
    },
    { name: "Total", value: props.table.total, state: props.table.setTotal },
    {
      name: "Edit Subtotal",
      value: subTotalEnable,
      state: setSubTotalEnable,
    },
    { name: "Edit Total", value: totalEnable, state: setTotalEnable },
  ];
  useEffect(() => {
    setLastStep(step == 3);
  }, [step]);
  useEffect(() => {
    setStep(1);
  }, [props.open]);
  const next = () => {
    setStep((s) => s + 1);
  };
  const back = () => {
    setStep((s) => s - 1);
  };
  useEffect(() => {
    if (!quantityEnable) setQuantity("");
  }, [quantityEnable]);

  useEffect(() => {
    if (!unitEnable) setUnit("");
  }, [unitEnable]);

  useEffect(() => {
    if (!subTotalEnable) props.table.setSubTotal("");
  }, [subTotalEnable]);

  useEffect(() => {
    if (!totalEnable) props.table.setTotal("");
  }, [totalEnable]);

  useEffect(() => {
    let myTotal = 0;
    props.table.fields.forEach(
      (f) => (myTotal += Number.parseFloat(f.price || ""))
    );
    setDefaultSubTotal(`${myTotal.toFixed(2)}`);
    setDefaultTotal(`${myTotal.toFixed(2)}`);
  }, [props.table.fields]);

  useEffect(() => {
    props.table.setTotal(defaultTotal);
    props.table.setSubTotal(defaultSubTotal);
  }, [defaultSubTotal, defaultTotal]);

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    const f = fields.filter((f) => f.name === name)[0];
    const isBoolean = typeof f.value === "boolean";
    if (isBoolean && value === "on" && !f.value) {
      f.state(true);
    } else if (isBoolean) f.state(false);
    else f.state(value);
  };
  const clear = () => {
    setTitle("");
    setQuantityEnable(false);
    setQuantity("");
    setUnitEnable(false);
    setUnit("");
    setPrice("");
    setSubTotalEnable(false);
    setTotalEnable(false);
    setEdit(false);
  };
  useEffect(() => {
    if (edit) {
      const e = props.table.fields[editEntry];
      setTitle(e.title || "");
      if (e.unit) {
        setUnitEnable(true);
        setUnit(e.unit);
      } else {
        setUnitEnable(false);
      }
      if (e.quantity) {
        setQuantityEnable(true);
        setQuantity(`${e.quantity}`);
      } else {
        setQuantityEnable(false);
      }
      if (e.price) {
        setPrice(e.price);
      }
      if (e.unit) {
        setUnitEnable(true);
        setUnit(e.unit);
      } else {
        setUnitEnable(false);
      }
    } else {
      clear();
    }
  }, [edit, editEntry]);
  const handleEdit = (i: number) => {
    setEdit(true);
    setEditEntry(i);
  };
  const handleCancel = () => {
    setEdit(false);
  };
  const handleDelete = () => {
    props.table.setFields((f) => f.filter((l, i) => i !== editEntry));
    setEdit(false);
  };

  const handleSave = () => {
    props.table.setFields((f) =>
      f.map((l, i) => {
        if (i === editEntry) {
          return {
            ...l,
            title,
            quantity,
            unit,
            price,
          };
        }
        return l;
      })
    );
    setEdit(false);
  };
  const Step = [
    () => (
      <>
        <Typography variant="h2" align="center" marginBottom={2}>
          Invoice Data
        </Typography>
        <FormControlLabel
          control={
            <Checkbox checked={props.sample} onChange={props.sampleData} />
          }
          label="Sample Data"
          labelPlacement="start"
        />
        <Grid2 container direction={"row"} spacing={2} minWidth={600}>
          <Grid2 width={"45%"}>
            <TextField
              label="Project #"
              name="projectNum"
              fullWidth
              required
              onChange={props.handleForm}
              value={props.invoiceData.projectNum.value}
            />
          </Grid2>
          <Grid2 width={"45%"}>
            <TextField
              type="date"
              name="date"
              fullWidth
              required
              onChange={props.handleForm}
              value={props.invoiceData.date.value}
            />
          </Grid2>
        </Grid2>
      </>
    ),
    () => (
      <>
        <Typography variant="h2" align="center" marginBottom={2}>
          {props.title}
        </Typography>
        <Grid2
          container
          justifyContent="space-evenly"
          spacing={2}
          textAlign={"center"}
        >
          {props.fields.map((f) => (
            <Grid2 width="45%">
              <TextField
                variant="outlined"
                label={f.name}
                name={f.name}
                value={f.value}
                onChange={props.handleForm}
                fullWidth
              />
            </Grid2>
          ))}
        </Grid2>
      </>
    ),
    () => (
      <>
        <Typography variant="h2" align="center" marginBottom={2}>
          Table Entries
        </Typography>
        <TextField
          value={props.table.title}
          fullWidth
          label="Table Title"
          name="Table Title"
          onChange={handleChange}
        />
        <Divider />
        <Entry
          type={edit ? "Edit Entry" : "New Entry"}
          {...{
            edit,
            handleCancel,
            handleChange,
            handleDelete,
            handleSave,
            price,
            quantity,
            quantityEnable,
            title,
            unit,
            unitEnable,
          }}
        />
        <Typography variant="h4">Entries</Typography>
        <Grid2 container maxHeight={300} overflow={"scroll"}>
          <Grid2 container wrap="nowrap" width="100%">
            <Grid2 width="70%">
              <Typography>Service/Product</Typography>
            </Grid2>
            <Grid2 width="15%">
              <Typography>Quantity</Typography>
            </Grid2>
            <Grid2 width="15%">
              <Typography>Price</Typography>
            </Grid2>
          </Grid2>
          {props.table.fields.map((f, i) => (
            <Grid2
              container
              wrap="nowrap"
              width="100%"
              paddingTop={1}
              paddingBottom={1}
              component="div"
              style={style.entry}
              onClick={() => handleEdit(i)}
            >
              <Grid2 width="70%">
                <Typography>{f.title}</Typography>
              </Grid2>
              <Grid2 width="15%">
                <Typography>
                  {f.quantity} {f.unit}
                </Typography>
              </Grid2>
              <Grid2 width="15%">
                <Typography>{f.price}</Typography>
              </Grid2>
            </Grid2>
          ))}
        </Grid2>
        <Typography variant="h4">Total</Typography>
        <Grid2 container justifyContent="space-between">
          <Grid2 width="45%" container>
            <FormControlLabel
              label="Edit Subtotal"
              labelPlacement="start"
              control={
                <Checkbox
                  checked={subTotalEnable}
                  onChange={handleChange}
                  name="Edit Subtotal"
                />
              }
            />
            <TextField
              value={props.table.subtotal || defaultSubTotal}
              fullWidth
              label="Subtotal"
              name="Subtotal"
              disabled={!subTotalEnable}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 width="45%" container>
            <FormControlLabel
              label="Edit Total"
              labelPlacement="start"
              control={
                <Checkbox
                  checked={totalEnable}
                  onChange={handleChange}
                  name="Edit Total"
                />
              }
            />
            <TextField
              value={props.table.total || defaultTotal}
              fullWidth
              label="Total"
              name="Total"
              disabled={!totalEnable}
              onChange={handleChange}
            />
          </Grid2>
        </Grid2>
      </>
    ),
  ];
  const style = {
    entry: {
      cursor: "pointer",
    },
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step !== 3) {
      setStep((s) => s + 1);
      return;
    }
    props.handlePaper();
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.handlePaper}
      component={"form"}
      onSubmit={handleSubmit}
    >
      <DialogTitle>{props.header}</DialogTitle>
      <Container style={{ overflowX: "hidden", minWidth: 600, minHeight: 250 }}>
        {Step[step - 1]()}
      </Container>
      <DialogActions>
        <Button onClick={props.handlePaper} color="error">
          Cancel
        </Button>
        <Button
          color="secondary"
          startIcon={<ArrowBack />}
          disabled={step <= 1}
          onClick={back}
        >
          Back
        </Button>
        {!lastStep && (
          <Button color="primary" endIcon={<ArrowForward />} onClick={next}>
            Next
          </Button>
        )}

        {lastStep && (
          <Button color="primary" type="submit">
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
type InvoiceFormProps = {
  open: boolean;
  sample: boolean;
  sampleData: any;
  handlePaper: any;
  handleForm: any;
  fields: FieldType[];
  header: string;
  title: string;
  table: TableFieldType;
  invoiceData: { date: FieldType; projectNum: FieldType };
};
export type TableFieldType = {
  title: string;
  subtotal: string;
  setSubTotal: React.Dispatch<React.SetStateAction<string>>;
  total: string;
  setTotal: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  fields: TableProps[];
  setFields: React.Dispatch<React.SetStateAction<TableProps[]>>;
};
export type FieldType = {
  state: React.Dispatch<React.SetStateAction<any>>;
  value: string | boolean;
  name: string;
};
export default InvoiceForm;
