import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { styles as externalStyles } from "../../../../assets/css";
import {
  iconCalenderColor,
  iconColor11,
  iconColor3,
  iconPhoneColor,
} from "../../../../constants/COLORS";
import { TotalTip } from "../../../../utils/functions";

interface RevenueTableProps {
  item: any;
  action: boolean;
}

const RevenueTable: React.FC<RevenueTableProps> = ({ item, action }) => {
  const router = useRouter();
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
              router.push({
                pathname: "/revenueReportAction",  
                params: {
                  data: JSON.stringify(item),
                  action: action.toString(),
                },
              })
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
