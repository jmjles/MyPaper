import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const Table = (props: TableProps) => {
  const title = props.title ? props.title : "";
  const quantity = props.quantity
    ? props.unit
      ? `${props.quantity} ${props.unit}`
      : props.quantity
    : "";
  const price = props.price ? `$${props.price}` : "";
  let items = 0;
  if (quantity) items += 1;
  if (price) items += 1;

  const style = StyleSheet.create({
    hidden: {
      display: "none",
    },
    table: {
      width: "100%",
      marginBottom: 12,
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "row",
    },
    itemNum: {
      width: 32,
      textAlign: "center",
    },
    item: {
      flexShrink: 0,
      width: 325,
    },
    fields: {
      flexGrow: 1,
      width: `${75 / items}px`,
    },
  });
  return (
    <View style={style.table}>
      <Text style={style.itemNum}>{!props.header ? props.num + "." : "#"}</Text>
      <Text style={style.item}>
        {!props.header ? title : "Service/Product"}
      </Text>
      <Text style={style.fields}>{!props.header ? quantity : "Quantity"}</Text>
      <Text style={style.fields}>{!props.header ? price : "Price"}</Text>
    </View>
  );
};

export type TableProps = {
  header: boolean;
  num?: number;
  title?: string;
  quantity?: string;
  unit?: string;
  price?: string;
};
export default Table;
