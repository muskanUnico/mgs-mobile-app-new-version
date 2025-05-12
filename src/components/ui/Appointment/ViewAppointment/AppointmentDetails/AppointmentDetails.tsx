import React from "react";
import { Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { styles as externalStyles } from "../../../../../assets/css";
import CustomHeading from "../../../../../components/elements/CustomHeading/CustomHeading";
import {
  iconColor1,
  iconColor12,
  iconColor4,
  iconColor5,
} from "../../../../../constants/COLORS";
import { Divider } from "react-native-paper";

const AppointmentDetails = ({ item }: any) => {
  return (
    <View>
      <View style={[externalStyles.card, styles.spacing]}>
        <View>
          <CustomHeading text="Appointment Details" />
        </View>
        <Divider style={styles.spacing2} />

        <View style={styles.field}>
          <FontAwesome
            name="list"
            style={[{ color: iconColor5 }, styles.bottomMargin]}
            size={12}
          />

          <View style={[styles.textContainer, styles.marginLeft2]}>
            <Text style={[externalStyles.label]}>Service</Text>
            <Text style={[externalStyles.content]}>{item.service}</Text>
          </View>
        </View>
        <Divider style={styles.verticalSpacing} />

        <View style={styles.field}>
          <FontAwesome
            name="user"
            style={[externalStyles.iconColorStyle, { color: iconColor1 }]}
          />
          <View style={styles.textContainer}>
            <Text style={[externalStyles.label]}>Team Member</Text>
            <Text style={[externalStyles.content]}>{item?.Team}</Text>
          </View>
        </View>
        <Divider style={styles.verticalSpacing} />

        <View style={styles.field}>
          <FontAwesome
            name="clock-o"
            style={[externalStyles.iconColorStyle, { color: iconColor5 }]}
          />
          <View style={styles.textContainer}>
            <Text style={[externalStyles.label]}>Time</Text>
            <Text style={[externalStyles.content]}>{item?.time}</Text>
          </View>
        </View>
        <Divider style={styles.verticalSpacing} />

        <View style={styles.rowLayout2}>
          <View style={styles.paddingTop}>
            <View style={styles.rowLayout}>
              <FontAwesome
                name="money"
                style={[externalStyles.iconColorStyle, { color: iconColor12 }]}
              />
              <Text style={[externalStyles.label]}>Price</Text>
            </View>
            <Text style={[styles.leftMargin, externalStyles.content]}>
              ${item.price}
            </Text>
          </View>
          <Divider style={styles.verticalSpacing} />

          <View style={styles.marginLeft}>
            <View style={styles.row}>
              <FontAwesome
                name="clock-o"
                style={[externalStyles.iconColorStyle, { color: iconColor4 }]}
              />
              <Text style={[externalStyles.label]}>Minutes</Text>
            </View>
            <Text style={[styles.leftSpacing, externalStyles.content]}>
              {item.minutes}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftSpacing: {
    marginLeft: 24,
  },
  bottomMargin: {
    marginBottom: 36,
  },
  row: {
    flexDirection: "row",
  },
  field: {
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
  },
  spacing: {
    paddingTop: 12,
  },
  spacing2: {
    marginTop: 4,
    marginBottom: 12,
  },
  marginLeft: {
    marginLeft: 28,
  },
  marginLeft2: {
    marginLeft: 8,
  },
  verticalSpacing: {
    marginTop: 8,
    marginBottom: 8,
  },
  rowLayout: {
    flexDirection: "row",
  },
  leftMargin: {
    marginLeft: 24,
  },
  rowLayout2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 4,
    marginRight: 20,
  },
  paddingTop: {
    paddingTop: 8,
  },
});

export default AppointmentDetails;
