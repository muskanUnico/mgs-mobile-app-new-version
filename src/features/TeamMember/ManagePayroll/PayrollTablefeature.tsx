import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import { styles as externalStyles } from "../../../assets/css";
import CustomDropDown from "../../../components/elements/CustomDropDown/CustomDropDown";
import LongMenu from "../../../components/elements/LongMenu/LongMenu";
import {
  greenColor,
  iconColor1,
  iconColor11,
  iconColor4,
  iconEmailColor,
  iconPhoneColor,
} from "../../../constants/COLORS";
import { TotalTip } from "../../../utils/functions";
import { formatMinutesToHoursAndMinutes } from "../../../utils/tools";

const PayrollTablefeature = ({
  item,
  handleUpdateStatus,
  index,
  handleOptions,
  option,
  setSelectedStatus,
  selectedStatus,
}: any) => {
  const items = [
    { label: "Completed", value: "completed", color: "green" },
    { label: "Pending", value: "pending", color: "red" },
  ];

  let hoursSum = item.hours.reduce((accumulator: any, currentValue: any) => {
    return accumulator + currentValue.amount;
  }, 0);

  let duration = item.hours.reduce((accumulator: any, currentValue: any) => {
    return accumulator + currentValue.duration;
  }, 0);

  const router = useRouter();

  //  function
  const handleDataChange = (value: any, rowIndex: number, items: any) => {
    setSelectedStatus({
      ...selectedStatus,
      [rowIndex]: items.status == "completed" ? "pending" : "completed",
    });

    if (items.status == "pending") {
      handleUpdateStatus(item.id, { status: "completed" });
    } else {
      handleUpdateStatus(item.id, { status: "pending" });
    }
  };

  return (
    <View
      style={[
        externalStyles.card,
        { paddingBottom: 16, paddingTop: 8, marginHorizontal: 20 },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.row}>
          <FontAwesome
            name="user"
            style={[externalStyles.iconColorStyle, { color: iconColor1 }]}
          />
          <Text style={[styles.value]}>{item?.teamMemberId?.name}</Text>
        </View>
        <View>
          {item.status != "completed" && (
            <LongMenu
              options={option}
              handleOptions={(selectedOption: any) =>
                handleOptions(selectedOption, item)
              }
            />
          )}
        </View>
      </View>

      <Divider style={{ marginBottom: 8 }} />

      <View style={styles.row}>
        <FontAwesome
          name="calendar"
          style={[externalStyles.iconColorStyle, { color: iconEmailColor }]}
        />
        <Text style={[externalStyles.content, styles.value]}>
          {moment(item.date).format("DD MMM YYYY")}
        </Text>
      </View>

      <Divider style={{ marginBottom: 8 }} />

      <View style={{ flexDirection: "row", marginTop: 12 }}>
        <FontAwesome
          name="check-circle"
          style={[externalStyles.iconColorStyle, { color: iconColor11 }]}
        />
        <Text style={[externalStyles.label, styles.value]}>Status</Text>
      </View>

      <CustomDropDown
        items={items}
        value={selectedStatus[index] || ""}
        setValue={(value: any) => handleDataChange(value, index, item)}
        placeholder="Select an option"
      />

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
              onPress={() =>
                // navigate("WorkedHours", { item: item })
                router.push({
                  pathname: "/(stack)/workedHours",
                  params: { item: JSON.stringify(item) },
                })
              }
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
              onPress={() => 
                  router.push({
                  pathname: "/(stack)/tipCollected",
                  params: { item: JSON.stringify(item) },
                })
              }
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
    fontFamily: "Regular",
  },
});

export default PayrollTablefeature;
