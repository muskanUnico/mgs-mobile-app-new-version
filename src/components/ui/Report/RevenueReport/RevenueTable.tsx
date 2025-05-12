import moment from "moment";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import {
  iconCalenderColor,
  iconColor11,
  iconColor3,
  iconPhoneColor,
} from "../../../../constants/COLORS";
import { styles as externalStyles } from "../../../../assets/css";
import { TotalTip } from "../../../../utils/functions";
import { navigate } from "../../../../utils/navigationServices";

interface RevenueTableProps {
  item: any;
  action: boolean;
}

const RevenueTable: React.FC<RevenueTableProps> = ({ item, action }) => {
  return (
    <View style={[externalStyles.card]}>
      <View>
        <View style={styles.row}>
          <FontAwesome
            name="calendar"
            style={[externalStyles.iconColorStyle, { color: iconColor3 }]}
          />
          <Text style={[externalStyles.label]}>DATE : </Text>
          <Text style={[externalStyles.content]}>
            {" "}
            {moment(item.date).format("DD MMM YYYY ")}
          </Text>
        </View>
        <Divider style={{ marginBottom: 12, marginTop: 4 }} />

        <View style={styles.row}>
          <FontAwesome
            name="dollar"
            style={[externalStyles.iconColorStyle, { color: iconPhoneColor }]}
          />
          <Text style={[externalStyles.label]}>AMOUNT : </Text>
          <Text style={[externalStyles.content]}>
            ${TotalTip(item.entries).toFixed(2)}
          </Text>
        </View>
        <Divider style={{ marginBottom: 12, marginTop: 4 }} />

        <View style={styles.row}>
          <FontAwesome
            name="file-text-o"
            style={[
              externalStyles.iconColorStyle,
              { color: iconCalenderColor },
            ]}
          />
          <Text style={[externalStyles.label]}>DESCRIPTION : </Text>
          <Text style={[externalStyles.content]}>
            {item.description || "----"}
          </Text>
        </View>
        <Divider style={{ marginBottom: 12, marginTop: 4 }} />

        <View style={styles.row}>
          <FontAwesome
            name="cog"
            style={[externalStyles.iconColorStyle, { color: iconColor11 }]}
          />
          <Text style={[externalStyles.label]}>ACTION : </Text>
          <TouchableOpacity
            onPress={() =>
              navigate("RevenueReportAction", { data: item, action: action })
            }
          >
            <Text style={[externalStyles.content, externalStyles.BlueText]}>
              View
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default RevenueTable;
