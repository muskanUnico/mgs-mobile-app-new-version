import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { styles as externalStyles } from "../../../../assets/css";
import {
  dividerColor,
  iconColor1,
  iconColor5,
  iconColor6,
  iconPhoneColor,
  labelColor,
} from "../../../../constants/COLORS";
import LongMenu from "../../../../components/elements/LongMenu/LongMenu";
import {
  formatMinutesToHoursAndMinutes,
  formatTime,
} from "../../../../utils/tools";

const WorkedHoursCard = ({ item, handleOptions, options }: any) => {
  return (
    <>
      <View style={[externalStyles.card, { backgroundColor: "white" }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.row}>
            <FontAwesome
              name="calendar"
              style={[externalStyles.iconColorStyle, { color: iconColor6 }]}
            />
            <Text style={[externalStyles.label, { marginLeft: 4 }]}>
              TIME : {formatTime(item.startTime)} to {formatTime(item.endTime)}
            </Text>
          </View>
          <View style={styles.row}>
            <LongMenu
              options={options}
              handleOptions={(selectedOption: any) =>
                handleOptions(selectedOption.id, item)
              }
            />
          </View>
        </View>

        <Divider style={{ backgroundColor: dividerColor }} />
        <View style={styles.row}>
          <FontAwesome
            name="clock-o"
            style={[externalStyles.iconColorStyle, { color: iconColor1 }]}
          />
          <Text style={[externalStyles.label, { marginLeft: 4 }]}>
            HOURS WORKED :
          </Text>
          <Text style={[externalStyles.content, styles.value]}>
            {formatMinutesToHoursAndMinutes(item.duration)}
          </Text>
        </View>
        <Divider style={{ backgroundColor: dividerColor }} />

        <View style={styles.row}>
          <FontAwesome
            name="dollar"
            style={[externalStyles.iconColorStyle, { color: iconPhoneColor }]}
          />
          <Text style={[externalStyles.label, { marginLeft: 8 }]}>
            TOTAL BILLABLE AMOUNT :
          </Text>
          <Text style={[externalStyles.content, styles.value]}>
            {" "}
            ${item.amount}{" "}
          </Text>
        </View>
        <View style={styles.row}>
          <FontAwesome
            name="list"
            style={[externalStyles.iconColorStyle, { color: iconColor5 }]}
          />
          <Text style={[externalStyles.label, { marginLeft: 8 }]}>
            WORK TYPE :
          </Text>
          <Text style={[externalStyles.content, styles.value]}>
            {item.workedType}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 8,
  },
  indexContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    marginLeft: 8,
    color: labelColor,
  },
});

export default WorkedHoursCard;
