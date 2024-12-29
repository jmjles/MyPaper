import React from "react";
import { DefaultScreenProps } from "../page";
import InvoiceDefault from "../components/pdf/presets/invoiceDefault/InvoiceDefault";

const MyPaper = (props: DefaultScreenProps) => {
  return (
    <div>
      <InvoiceDefault />
    </div>
  );
};

export default MyPaper;
