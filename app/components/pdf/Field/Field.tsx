import { StyleSheet, Text, View } from "@react-pdf/renderer";

export default (props: FieldTypes) => {
  return (
    <View style={style.field}>
      <Text style={style.fieldLabel}>{props.fieldName}:</Text>
      <Text style={props.client ? style.clientInfo : style.fieldValue}>
        {props.fieldValue}
      </Text>
    </View>
  );
};
type FieldTypes = {
  fieldName: string;
  fieldValue: string;
  client?: boolean;
};
const style = StyleSheet.create({
  field: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  fieldLabel: { fontSize: 12 },
  fieldValue: {
    borderBottom: "1px solid #000",
    flexGrow: 2,
    fontSize: 12,
    paddingLeft: 5,
  },
  clientInfo: {
    borderBottom: "1px solid #000",
    fontSize: 12,
    flexGrow: 2,
    marginLeft: 5,
    paddingLeft: 5,
  },
});
