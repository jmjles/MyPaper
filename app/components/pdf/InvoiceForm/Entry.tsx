import { Cancel, Delete, Save } from "@mui/icons-material";
import {
  Grid2,
  Typography,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React from "react";

const Entry = (props: EntryProps) => {
  return (
    <div>
      <Grid2
        container
        justifyContent={"space-between"}
        marginTop={2}
        marginBottom={2}
      >
        <Grid2>
          <Typography variant="h4">{props.type}</Typography>
        </Grid2>
        <Grid2 display={props.edit ? "revert" : "none"}>
          <IconButton color="warning" onClick={props.handleCancel}>
            <Cancel />
          </IconButton>
          <IconButton color="error" onClick={props.handleDelete}>
            <Delete />
          </IconButton>
          <IconButton color="primary" onClick={props.handleSave}>
            <Save />
          </IconButton>
        </Grid2>
      </Grid2>
      <TextField
        value={props.title}
        fullWidth
        label="Entry Title"
        name="Entry Title"
        onChange={props.handleChange}
      />
      <Grid2 container justifyContent="space-between">
        <Grid2 width="45%" container marginBottom={2}>
          <FormControlLabel
            label="Quantity?"
            labelPlacement="start"
            control={
              <Checkbox
                checked={props.quantityEnable}
                onChange={props.handleChange}
                name="Quantity?"
              />
            }
          />
          <TextField
            value={props.quantity}
            fullWidth
            label="Quantity"
            name="Quantity"
            disabled={!props.quantityEnable}
            onChange={props.handleChange}
          />
        </Grid2>
        <Grid2 width="45%" container marginBottom={2}>
          <FormControlLabel
            label="Unit?"
            labelPlacement="start"
            control={
              <Checkbox
                checked={props.unitEnable}
                onChange={props.handleChange}
                name="Unit?"
              />
            }
          />
          <TextField
            value={props.unit}
            fullWidth
            label="Unit"
            name="Unit"
            disabled={!props.unitEnable}
            onChange={props.handleChange}
          />
        </Grid2>
        <Grid2 width="45%" marginLeft="auto">
          <TextField
            value={props.price}
            fullWidth
            label="Price"
            name="Price"
            onChange={props.handleChange}
          />
        </Grid2>
      </Grid2>
    </div>
  );
};
type EntryProps = {
  edit: boolean;
  handleCancel: any;
  handleDelete: any;
  handleSave: any;
  handleChange: any;
  title: string;
  quantity: string;
  quantityEnable: boolean;
  unit: string;
  unitEnable: boolean;
  price: string;
  type: string;
};
export default Entry;
