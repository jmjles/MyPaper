import { CompanyType } from "@/app/components/CompanyForm/CompanyForm";
import {
  Document,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import Field from "../../Field/Field";
import Table, { TableProps } from "../../Table/Table";

const InvoiceDefault = (props: PaperProps) => {
  const { table, client, company, invoiceData } = props;
  return (
    <Document>
      <Page size="A4" style={style.page}>
        <View style={style.header}>
          {/* <View style={style.LogoSection}>
            {company.logo && (
              <Image
                src={Buffer.from(company.logo, "utf-8")}
                style={{ width: 75, height: 75 }}
              />
            )}
          </View> */}
          <View style={style.headerMainSection}>
            <View style={style.container}>
              <Text>{company.name}</Text>
              <Text style={style.text}>{company.slogan}</Text>
            </View>
            <View style={style.container}>
              <Text style={style.text}>{company.address}</Text>
              <Text style={style.text}>{company.city}</Text>
              <Text style={style.text}>
                {company.state} {company.zipCode}
              </Text>
            </View>
            <View style={style.container}>
              <Text style={style.text}>{company.license}</Text>
            </View>
          </View>
          <View style={{ width: "33%" }}>
            <Field fieldName="Date" fieldValue={invoiceData.date} />
            <Field fieldName="Job Address" fieldValue={client.jobAddress} />
            <Field fieldName="Owner" fieldValue={client.owner} />
            <Field fieldName="Project#" fieldValue={invoiceData.projectNum} />
          </View>
        </View>
        <Link style={style.url}>{company.website}</Link>
        <View style={style.clientContainer}>
          <View style={{ width: "60%" }}>
            <Field fieldName="Client Name" fieldValue={client.name} client />
          </View>
          <View style={{ flexGrow: 1 }}>
            <Field fieldName="Phone" fieldValue={client.phone} client />
          </View>
        </View>
        <View style={style.clientContainer}>
          <View style={{ width: "60%" }}>
            <Field fieldName="Address" fieldValue={client.address} client />
          </View>
          <View style={{ flexGrow: 1 }}>
            <Field fieldName="Fax" fieldValue={client.fax} client />
          </View>
        </View>
        <View style={style.clientContainer}>
          <View style={{ width: "60%" }}>
            <Field
              fieldName="City, State, Zip"
              fieldValue={client.place}
              client
            />
          </View>
          <View style={{ flexGrow: 1 }}>
            <Field fieldName="Email" fieldValue={client.email} client />
          </View>
        </View>
        <Text style={{ textAlign: "center", margin: 18 }}>{table.title}</Text>
        <View>
          <Table header />
          {table.entries.map((e, i) => (
            <Table num={i + 1} {...e} />
          ))}
        </View>
        <View style={style.totalContainer}>
          <Text>SubTotal: ${table.subtotal}</Text>
          <Text style={style.total}>Total: ${table.total}</Text>
        </View>
      </Page>
    </Document>
  );
};
const style = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  LogoSection: {
    width: "30%",
  },
  headerMainSection: { width: "60%" },
  container: {
    marginBottom: 20,
    display: "flex",

    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 12,
  },
  url: {
    fontSize: 10,
  },
  page: {
    padding: ".5in",
  },
  clientContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 12,
    columnGap: 12,
  },
  totalContainer: {
    marginLeft: "auto",
  },
  total: {
    color: "red",
  },
});

export type PaperProps = {
  company: CompanyType;
  client: {
    jobAddress: string;
    owner: string;
    name: string;
    phone: string;
    address: string;
    fax: string;
    place: string;
    email: string;
  };
  table: {
    entries: TableProps[];
    title: string;
    subtotal: string;
    total: string;
  };
  invoiceData: {
    date: string;
    projectNum: string;
  };
};
export default InvoiceDefault;
