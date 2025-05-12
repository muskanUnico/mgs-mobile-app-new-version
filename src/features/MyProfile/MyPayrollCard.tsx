import React from "react";
import { Divider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import {
  greenColor,
  iconColor1,
  iconColor11,
  iconColor4,
  iconEmailColor,
  iconPhoneColor,
} from "../../constants/COLORS";
import { styles as externalStyles } from "../../assets/css";
import { navigate } from "../../utils/navigationServices";
import moment from "moment";
import { formatMinutesToHoursAndMinutes } from "../../utils/tools";
import { TotalTip } from "../../utils/functions";

const MyPayrollCard = ({ item, index }: any) => {
  let hoursSum = item.hours.reduce((accumulator: any, currentValue: any) => {
    return accumulator + currentValue.amount;
  }, 0);

  let duration = item.hours.reduce((accumulator: any, currentValue: any) => {
    return accumulator + currentValue.duration;
  }, 0);

  return (
    <View style={[externalStyles.card, { paddingBottom: 16, paddingTop: 8 }]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <View style={styles.row}>
            <FontAwesome
              name="user"
              style={[externalStyles.iconColorStyle, { color: iconColor1 }]}
            />
            <Text style={[externalStyles.content, styles.value]}>
              {item.teamMemberId.name}{" "}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.row}>
            <FontAwesome
              name="calendar"
              style={[externalStyles.iconColorStyle, { color: iconEmailColor }]}
            />
            <Text style={[externalStyles.content, styles.value]}>
              {moment(item.date).format("DD MMM YYYY")}
            </Text>
          </View>
        </View>
      </View>

      <Divider style={{ marginBottom: 8 }} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <View style={styles.row}>
            <FontAwesome
              name="clock-o"
              style={[externalStyles.iconColorStyle, { color: iconColor4 }]}
            />
            <Text style={[externalStyles.label, styles.value]}>
              HOURS WORKED
            </Text>
          </View>
          <Text style={[externalStyles.content, styles.value]}>
            {formatMinutesToHoursAndMinutes(duration)}
            <Text
              style={[externalStyles.BlueText]}
              onPress={() => navigate("WorkedHours", { item: item })}
            >
              (view)
            </Text>
          </Text>
        </View>
        <View>
          <View style={styles.row}>
            <FontAwesome
              name="dollar"
              style={[externalStyles.iconColorStyle, { color: iconPhoneColor }]}
            />
            <Text style={[externalStyles.label, styles.value]}>
              TIP COLLECTED
            </Text>
          </View>
          <Text style={[externalStyles.content, styles.value]}>
            {TotalTip(item.tips).toFixed(2)}
            <Text
              style={[externalStyles.BlueText]}
              onPress={() => navigate("TipCollected", { item: item })}
            >
              (view)
            </Text>
          </Text>
        </View>
      </View>
      <Divider style={{ marginBottom: 8, marginTop: 16 }} />

      <View style={styles.row}>
        <FontAwesome
          name="money"
          style={[externalStyles.iconColorStyle, { color: greenColor }]}
        />
        <Text style={[externalStyles.label, styles.value]}>
          TOTAL BILLABLE AMOUNT :
        </Text>
        <Text style={[externalStyles.content, styles.value]}>
          ${(hoursSum + TotalTip(item.tips)).toFixed(2)}
        </Text>
      </View>
      <Divider style={{ marginTop: 8 }} />

      <View style={{ flexDirection: "row", marginTop: 12 }}>
        <FontAwesome
          name="check-circle"
          style={[externalStyles.iconColorStyle, { color: iconColor11 }]}
        />
        <Text style={[externalStyles.label, styles.value]}>Status : </Text>

        <Text style={{ marginLeft: 24 }}>
          {item.status == "completed" ? (
            <Text style={{ color: "#16A34A", fontFamily: "BoldText" }}>
              Completed{" "}
            </Text>
          ) : (
            <Text style={{ color: "#DC2626", fontFamily: "BoldText" }}>
              Pending
            </Text>
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
  },
  value: {
    marginLeft: 2,
  },
});

export default MyPayrollCard;
