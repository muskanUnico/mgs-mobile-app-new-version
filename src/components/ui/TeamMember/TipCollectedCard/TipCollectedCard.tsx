import React from "react";
import { Divider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { styles as externalStyles } from "../../../../assets/css";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  dividerColor,
  iconColor1,
  iconColor6,
  iconPhoneColor,
  labelColor,
} from "../../../../constants/COLORS";
import { navigate } from "../../../../utils/navigationServices";

const TipCollectedCard = ({ item }: any) => {
  return (
    <>
      <View style={[externalStyles.card]}>
        <View style={styles.row}>
          <FontAwesome
            name="calendar"
            style={[externalStyles.iconColorStyle, { color: iconColor6 }]}
          />
          <Text style={[externalStyles.label, { marginLeft: 4 }]}>
            APPOINTMENT
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigate("ViewAppointment", { id: item?.appointmentId })
          }
        >
          <Text style={[externalStyles.BlueText, { marginLeft: 24 }]}>
            {item.appointmentId}
          </Text>
        </TouchableOpacity>

        <Divider style={[{ backgroundColor: dividerColor, marginTop: 8 }]} />
        <View style={styles.row}>
          <FontAwesome
            name="user"
            style={[externalStyles.iconColorStyle, { color: iconColor1 }]}
          />
          <Text style={[externalStyles.label, { marginLeft: 8 }]}>
            CUSTOMER NAME :
          </Text>
          <Text style={[externalStyles.content, styles.value]}>
            {item.customerName}
          </Text>
        </View>
        <Divider style={{ backgroundColor: dividerColor }} />

        <View style={styles.row}>
          <FontAwesome
            name="dollar"
            style={[externalStyles.iconColorStyle, { color: iconPhoneColor }]}
          />
          <Text style={[externalStyles.label, { marginLeft: 8 }]}>
            TIP AMOUNT :
          </Text>
          <Text style={[externalStyles.content, styles.value]}>
            ${item.amount}
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

export default TipCollectedCard;
